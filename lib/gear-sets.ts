/**
 * Gear Sets — curated, reusable bundles of affiliate products mapped to a
 * GearSetId. Plans reference a GearSetId rather than a flat list, so the same
 * bundle can power both the gear-guide page and the PDF Trip Pack.
 *
 * Categories drive PDF layout: tents, cooking, coolers, lighting, comfort,
 * sleep, fun-upgrades.
 */

import type { AffiliateProduct } from '@/types'
import { AFFILIATE_PRODUCTS } from './affiliate-products'
import type { GearSetId } from './plan-content'

export type GearCategoryLabel =
  | 'Tent'
  | 'Sleep'
  | 'Cooking'
  | 'Cooler'
  | 'Lighting'
  | 'Comfort'
  | 'Fun upgrade'

export type GearSetEntry = {
  productId: string
  category: GearCategoryLabel
  /** Optional override for PDF blurb (else uses product.description). */
  pdfBlurb?: string
}

export type GearSet = {
  id: GearSetId
  title: string
  tagline: string
  entries: GearSetEntry[]
}

export const GEAR_SETS: Record<GearSetId, GearSet> = {
  BACKYARD_TEST_GEAR: {
    id: 'BACKYARD_TEST_GEAR',
    title: 'Backyard Test Kit',
    tagline: 'The minimum to simulate a real campsite without leaving home.',
    entries: [
      { productId: 'coleman-sundome-4p', category: 'Tent' },
      { productId: 'coleman-brazos-bag', category: 'Sleep' },
      { productId: 'black-diamond-spot-400', category: 'Lighting' },
    ],
  },
  FIRST_NIGHT_MINIMAL_GEAR: {
    id: 'FIRST_NIGHT_MINIMAL_GEAR',
    title: 'First Night Simple Kit',
    tagline: 'One tent, one sleep system, one light setup. Nothing extra.',
    entries: [
      { productId: 'coleman-sundome-4p', category: 'Tent' },
      { productId: 'coleman-brazos-bag', category: 'Sleep' },
      { productId: 'big-agnes-divide', category: 'Sleep' },
      { productId: 'luminaid-packlite-max', category: 'Lighting' },
      { productId: 'black-diamond-spot-400', category: 'Lighting' },
    ],
  },
  WEEKEND_BALANCED_GEAR: {
    id: 'WEEKEND_BALANCED_GEAR',
    title: 'Weekend Ready Kit',
    tagline: 'Two-night comfort without overpacking the car.',
    entries: [
      { productId: 'coleman-sundome-4p', category: 'Tent' },
      { productId: 'coleman-brazos-bag', category: 'Sleep' },
      { productId: 'big-agnes-divide', category: 'Sleep' },
      { productId: 'coleman-triton-2-burner', category: 'Cooking' },
      { productId: 'coleman-classic-rolling-cooler', category: 'Cooler' },
      { productId: 'luminaid-packlite-max', category: 'Lighting' },
      { productId: 'coleman-portable-chair-cooler', category: 'Comfort' },
    ],
  },
  EASY_FAMILY_BASECAMP_GEAR: {
    id: 'EASY_FAMILY_BASECAMP_GEAR',
    title: 'Family Basecamp Kit',
    tagline: 'Three-night basecamp with real beds, real shade, real meals.',
    entries: [
      { productId: 'fanttik-zeta-c6-pro', category: 'Tent' },
      { productId: 'lost-horizon-air-foam-mattress', category: 'Sleep' },
      { productId: 'coleman-triton-2-burner', category: 'Cooking' },
      { productId: 'coleman-classic-rolling-cooler', category: 'Cooler' },
      { productId: 'coleman-portable-chair-cooler', category: 'Comfort' },
      { productId: 'core-10x10-canopy', category: 'Comfort' },
    ],
  },
}

const PRODUCT_BY_ID = new Map(AFFILIATE_PRODUCTS.map((p) => [p.id, p]))

export type ResolvedGearItem = {
  product: AffiliateProduct
  category: GearCategoryLabel
  pdfBlurb: string
}

export function resolveGearSet(id: GearSetId): ResolvedGearItem[] {
  const set = GEAR_SETS[id]
  return set.entries
    .map((entry) => {
      const product = PRODUCT_BY_ID.get(entry.productId)
      if (!product) return null
      return {
        product,
        category: entry.category,
        pdfBlurb: entry.pdfBlurb ?? product.description,
      }
    })
    .filter((x): x is ResolvedGearItem => x !== null)
}

/**
 * Build an Amazon affiliate URL for a product.
 * Tag is appended at render time, never stored.
 */
export function buildAffiliateUrl(
  product: AffiliateProduct,
  tag = 'trailsteadgui-20',
): string {
  if (product.affiliateUrl) {
    // Curated short link already includes the tag — return as-is.
    return product.affiliateUrl
  }
  if (product.amazonAsin) {
    return `https://www.amazon.com/dp/${product.amazonAsin}?tag=${tag}`
  }
  // Fallback: keyword search
  const q = encodeURIComponent(product.name)
  return `https://www.amazon.com/s?k=${q}&tag=${tag}`
}
