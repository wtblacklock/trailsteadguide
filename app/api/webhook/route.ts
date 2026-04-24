import { NextResponse } from 'next/server'
import { stripeEnabled } from '@/lib/stripe'
import { signToken } from '@/lib/pdf/token'
import { sendTripPackEmail } from '@/lib/pdf/email'
import type { PlanSlug } from '@/types'

export const runtime = 'nodejs'

/**
 * POST /api/webhook — Stripe webhook receiver.
 * On checkout.session.completed, mints a download token from session
 * metadata. The success page reads ?session_id and exchanges it for the
 * token via Stripe metadata lookup.
 *
 * Set STRIPE_WEBHOOK_SECRET in env and point Stripe to /api/webhook.
 */
export async function POST(req: Request) {
  if (!stripeEnabled()) {
    return NextResponse.json({ ok: false, reason: 'stripe_disabled' }, { status: 503 })
  }

  const sig = req.headers.get('stripe-signature')
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!sig || !secret) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  const Stripe = (await import('stripe')).default
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  const raw = await req.text()
  let event: import('stripe').Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(raw, sig, secret)
  } catch (err) {
    console.error('[stripe webhook] bad signature', err)
    return NextResponse.json({ error: 'Bad signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as import('stripe').Stripe.Checkout.Session
    const meta = session.metadata || {}
    const plan = meta.plan as PlanSlug
    const adults = Number(meta.adults || 2)
    const kids = Number(meta.kids || 0)
    const nights = Number(meta.nights || 1)
    const email = session.customer_email || meta.email || undefined

    const token = signToken({ plan, adults, kids, nights, email })
    const origin =
      req.headers.get('origin') ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      'https://www.trailsteadguide.com'
    const downloadUrl = `${origin}/api/generate-pdf?token=${encodeURIComponent(token)}`

    if (email) {
      const tier = (meta.tier === 'premium' ? 'premium' : 'basic') as 'basic' | 'premium'
      const result = await sendTripPackEmail({ to: email, plan, downloadUrl, tier })
      if (!result.ok && !result.skipped) {
        console.error('[stripe webhook] email send failed', result.error)
      }
    } else {
      console.warn('[stripe webhook] no email on session; cannot deliver trip pack', session.id)
    }
  }

  return NextResponse.json({ received: true })
}
