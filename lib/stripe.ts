/**
 * Stripe scaffold — env-gated. To enable:
 *   1. npm i stripe
 *   2. Set STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET in env
 *   3. Set NEXT_PUBLIC_STRIPE_ENABLED=true (flips the paywall UI)
 *   4. Configure Stripe products and put their price IDs in env:
 *      STRIPE_PRICE_BASIC, STRIPE_PRICE_PREMIUM
 *
 * Until those are set, /api/checkout returns a clean error and the paywall
 * stays in email-gate mode.
 */

export function stripeEnabled(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY) && process.env.NEXT_PUBLIC_STRIPE_ENABLED === 'true'
}

export const STRIPE_PRICES = {
  basic: process.env.STRIPE_PRICE_BASIC || '',
  premium: process.env.STRIPE_PRICE_PREMIUM || '',
}

export const PRICE_DISPLAY = {
  basic: 1400, // cents — $14
  premium: 2400, // cents — $24
}
