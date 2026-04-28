import { NextResponse } from 'next/server'
import { stripeEnabled } from '@/lib/stripe'
import { signToken } from '@/lib/pdf/token'
import { sendTripPackEmail, sendTripPackAbandonEmail } from '@/lib/pdf/email'
import { subscribeToKit } from '@/lib/kit'
import { PLAN_TAG_IDS, BUYER_TAG_ID } from '@/lib/kit-tags'
import type { PlanSlug } from '@/types'

const VALID_PLANS: PlanSlug[] = [
  'backyard-test',
  'first-night-camp',
  'first-weekend-camp',
  'easy-family-basecamp',
]

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
      // Run email + Kit subscribe in parallel — the buyer should be added
      // to the Kit list whether or not the Resend send succeeds, and we
      // shouldn't slow PDF delivery on a Kit hiccup.
      const [emailResult, kitResult] = await Promise.all([
        sendTripPackEmail({ to: email, plan, downloadUrl, tier }),
        subscribeToKit({
          email,
          tagIds: [PLAN_TAG_IDS[plan], BUYER_TAG_ID],
        }),
      ])
      if (!emailResult.ok && !emailResult.skipped) {
        console.error('[stripe webhook] email send failed', emailResult.error)
      }
      if (!kitResult.ok && !kitResult.skipped) {
        console.error('[stripe webhook] kit subscribe failed', kitResult.error)
      }
    } else {
      console.warn('[stripe webhook] no email on session; cannot deliver trip pack', session.id)
    }
  } else if (event.type === 'checkout.session.expired') {
    // Cart-abandon recovery. One reminder per expired session — Stripe
    // emits this event exactly once when the session times out (default
    // 24h after creation), so we don't need a separate dedupe store.
    const session = event.data.object as import('stripe').Stripe.Checkout.Session
    const meta = session.metadata || {}
    const plan = meta.plan as PlanSlug
    const email = session.customer_email || meta.email || undefined

    if (!email) {
      console.log('[stripe webhook] expired session, no email — skipping abandon', session.id)
    } else if (!plan || !VALID_PLANS.includes(plan)) {
      console.warn('[stripe webhook] expired session, no valid plan slug — skipping abandon', session.id, plan)
    } else {
      const origin =
        req.headers.get('origin') ||
        process.env.NEXT_PUBLIC_SITE_URL ||
        'https://www.trailsteadguide.com'
      const retryUrl = `${origin}/trip-pack/${plan}?recover=1`
      const result = await sendTripPackAbandonEmail({ to: email, plan, retryUrl })
      if (!result.ok && !result.skipped) {
        console.error('[stripe webhook] abandon email failed', result.error)
      }
    }
  }

  return NextResponse.json({ received: true })
}
