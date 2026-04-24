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
      { productId: 'tent-sundome-3', category: 'Tent' },
      { productId: 'sleeping-bag-family', category: 'Sleep' },
      { productId: 'headlamp-family', category: 'Lighting' },
    ],
  },
  FIRST_NIGHT_MINIMAL_GEAR: {
    id: 'FIRST_NIGHT_MINIMAL_GEAR',
    title: 'First Night Simple Kit',
    tagline: 'One tent, one sleep system, one light setup. Nothing extra.',
    entries: [
      { productId: 'tent-sundome-3', category: 'Tent' },
      { productId: 'sleeping-bag-family', category: 'Sleep' },
      { productId: 'fwc-lantern-consciot', category: 'Lighting' },
      { productId: 'fwc-lantern-hanger', category: 'Lighting' },
    ],
  },
  WEEKEND_BALANCED_GEAR: {
    id: 'WEEKEND_BALANCED_GEAR',
    title: 'Weekend Ready Kit',
    tagline: 'Two-night comfort without overpacking the car.',
    entries: [
      { productId: 'fwc-tent-sundome', category: 'Tent' },
      { productId: 'stove-2-burner', category: 'Cooking' },
      { productId: 'fwc-cooler-rolling', category: 'Cooler' },
      { productId: 'fwc-sleeping-bag-mallome', category: 'Sleep' },
      { productId: 'fwc-chair-gci-rocker', category: 'Comfort' },
      { productId: 'fwc-lantern-consciot', category: 'Lighting' },
    ],
  },
  EASY_FAMILY_BASECAMP_GEAR: {
    id: 'EASY_FAMILY_BASECAMP_GEAR',
    title: 'Family Basecamp Kit',
    tagline: 'Three-night basecamp with real beds, real shade, real meals.',
    entries: [
      { productId: 'tent-sundome-6', category: 'Tent' },
      { productId: 'air-mattress-queen', category: 'Sleep' },
      { productId: 'stove-2-burner', category: 'Cooking' },
      { productId: 'fwc-cooler-rolling', category: 'Cooler' },
      { productId: 'fwc-chair-gci-rocker', category: 'Comfort' },
      { productId: 'canopy-camp', category: 'Comfort' },
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
