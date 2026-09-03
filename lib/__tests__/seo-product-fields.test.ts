// @vitest-environment node
/**
 * Covers the two fields Search Console listed under Product snippets ->
 * "Improve item appearance": sku and priceValidUntil.
 *
 * The priceValidUntil assertions are the ones that matter long term. The
 * value is derived from build time, and a date in the PAST is worse than
 * no date at all - it can drop the offer from rich results - so these
 * tests pin that it is always in the future and correctly shaped, which a
 * hardcoded constant would eventually fail.
 */

import { describe, expect, it } from 'vitest'
import {
  priceValidUntil,
  productGraph,
  planProductGraph,
  tripPackProductGraph,
} from '@/lib/seo'

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

function inFuture(date: string): boolean {
  return new Date(`${date}T00:00:00Z`).getTime() > Date.now()
}

describe('priceValidUntil', () => {
  it('returns a future YYYY-MM-DD date', () => {
    const d = priceValidUntil()
    expect(d).toMatch(ISO_DATE)
    expect(inFuture(d)).toBe(true)
  })

  it('honours the horizon, and a shorter one is still in the future', () => {
    const short = priceValidUntil(3)
    const long = priceValidUntil(12)
    expect(inFuture(short)).toBe(true)
    expect(new Date(long).getTime()).toBeGreaterThan(new Date(short).getTime())
  })

  it('does not roll over into an invalid date near month end', () => {
    // setMonth on the 31st can overflow into the next month; the output
    // still has to be a real date, which toISOString guarantees.
    expect(priceValidUntil(1)).toMatch(ISO_DATE)
    expect(priceValidUntil(6)).toMatch(ISO_DATE)
  })
})

describe('planProductGraph', () => {
  const graph = planProductGraph({
    planSlug: 'first-night-camp',
    name: 'First Night Camp',
    description: 'A plan.',
    image: 'https://example.test/a.jpg',
    priceUsd: 14,
    breadcrumbs: [{ name: 'Home', url: 'https://example.test/' }],
  })
  const product = graph['@graph'].find(
    (n) => (n as { '@type'?: string })['@type'] === 'Product',
  ) as Record<string, unknown>

  it('carries a sku', () => {
    expect(product.sku).toBe('plan-first-night-camp')
  })

  it('carries a future priceValidUntil on the offer', () => {
    const offers = product.offers as Record<string, string>
    expect(offers.priceValidUntil).toMatch(ISO_DATE)
    expect(inFuture(offers.priceValidUntil)).toBe(true)
  })
})

describe('tripPackProductGraph', () => {
  const graph = tripPackProductGraph({
    planSlug: 'first-weekend-camp',
    name: 'First Weekend Camp Trip Pack',
    description: 'A pack.',
    tiers: [
      { tier: 'basic', name: 'Basic', priceUsd: 14 },
      { tier: 'premium', name: 'Premium', priceUsd: 24 },
    ],
    breadcrumbs: [{ name: 'Home', url: 'https://example.test/' }],
  })
  const product = graph['@graph'].find(
    (n) => (n as { '@type'?: string })['@type'] === 'Product',
  ) as Record<string, unknown>

  it('carries a product-level sku', () => {
    expect(product.sku).toBe('trip-pack-first-weekend-camp')
  })

  it('gives each tier its own sku and future priceValidUntil', () => {
    const agg = product.offers as { offers: Record<string, string>[] }
    expect(agg.offers).toHaveLength(2)
    expect(agg.offers.map((o) => o.sku)).toEqual([
      'trip-pack-first-weekend-camp-basic',
      'trip-pack-first-weekend-camp-premium',
    ])
    for (const offer of agg.offers) {
      expect(offer.priceValidUntil).toMatch(ISO_DATE)
      expect(inFuture(offer.priceValidUntil)).toBe(true)
    }
  })
})

describe('productGraph', () => {
  const base = {
    id: 'coleman-sundome-4p',
    name: 'Coleman Sundome 4P',
    description: 'A tent.',
    image: 'https://example.test/t.jpg',
    offerUrl: 'https://www.amazon.com/dp/B004J2GUK0',
  }

  it('prefers an explicit sku (the ASIN) over the registry id', () => {
    const g = productGraph({ ...base, sku: 'B004J2GUK0', priceRange: '~$120' }) as Record<
      string,
      unknown
    >
    expect(g.sku).toBe('B004J2GUK0')
  })

  it('falls back to the registry id when no ASIN is known', () => {
    const g = productGraph({ ...base, priceRange: '~$120' }) as Record<string, unknown>
    expect(g.sku).toBe('coleman-sundome-4p')
  })

  it('sets priceValidUntil only when a price was parsed', () => {
    const priced = productGraph({ ...base, priceRange: '~$120' }) as Record<string, unknown>
    const pricedOffer = priced.offers as Record<string, string>
    expect(pricedOffer.price).toBe('120')
    expect(inFuture(pricedOffer.priceValidUntil)).toBe(true)

    // No price means no validity window to assert.
    const unpriced = productGraph(base) as Record<string, unknown>
    const unpricedOffer = unpriced.offers as Record<string, string>
    expect(unpricedOffer.price).toBeUndefined()
    expect(unpricedOffer.priceValidUntil).toBeUndefined()
  })
})
