import { NextResponse } from 'next/server'
import { stripeEnabled, STRIPE_PRICES, PRICE_DISPLAY } from '@/lib/stripe'
import type { PlanSlug } from '@/types'

export const runtime = 'nodejs'

const VALID_PLANS: PlanSlug[] = [
  'backyard-test',
  'first-night-camp',
  'first-weekend-camp',
  'easy-family-basecamp',
]

/**
 * POST /api/checkout — creates a Stripe Checkout session and returns its URL.
 * Falls back to a clean 503 when Stripe is not configured, so the UI can
 * gracefully revert to email-gate.
 */
export async function POST(req: Request) {
  if (!stripeEnabled()) {
    return NextResponse.json(
      { error: 'Stripe not configured. Email-gate mode is active.' },
      { status: 503 },
    )
  }

  const body = (await req.json().catch(() => null)) as {
    plan?: string
    adults?: number
    kids?: number
    nights?: number
    tier?: 'basic' | 'premium'
    email?: string
  } | null

  if (!body || !VALID_PLANS.includes(body.plan as PlanSlug)) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  const tier = body.tier === 'premium' ? 'premium' : 'basic'
  const priceId = STRIPE_PRICES[tier]
  if (!priceId) {
    return NextResponse.json({ error: `Stripe price ID for ${tier} not set` }, { status: 503 })
  }

  const Stripe = (await import('stripe')).default
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  const origin = req.headers.get('origin') || 'https://www.trailsteadguide.com'

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: body.email,
    metadata: {
      plan: String(body.plan),
      adults: String(body.adults ?? 2),
      kids: String(body.kids ?? 0),
      nights: String(body.nights ?? 1),
      tier,
      amount_cents: String(PRICE_DISPLAY[tier]),
    },
    success_url: `${origin}/trip-pack/${body.plan}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/trip-pack/${body.plan}?canceled=1`,
  })

  return NextResponse.json({ url: session.url })
}
