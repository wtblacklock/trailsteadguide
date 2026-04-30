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
      // Step up from the entry-level Sundome to a sturdier 4P with better
      // pole + fly quality — worth it once you know you'll go back out.
      { productId: 'alps-lynx-4p', category: 'Tent' },
      { productId: 'coleman-brazos-bag', category: 'Sleep' },
      { productId: 'big-agnes-divide', category: 'Sleep' },
      // Single-burner is the right call for a weekend — fewer parts, faster
      // setup, still cooks real food. Save the 2-burner for basecamp.
      { productId: 'coleman-1-burner', category: 'Cooking' },
      { productId: 'coleman-classic-rolling-cooler', category: 'Cooler' },
      { productId: 'luminaid-packlite-max', category: 'Lighting' },
      { productId: 'streamlight-protac-2', category: 'Lighting' },
      // Rocker chair — the upgrade you remember after night one.
      { productId: 'gci-freestyle-rocker', category: 'Comfort' },
    ],
  },
  EASY_FAMILY_BASECAMP_GEAR: {
    id: 'EASY_FAMILY_BASECAMP_GEAR',
    title: 'Family Basecamp Kit',
    tagline: 'Three-night basecamp with real beds, real shade, real meals.',
    entries: [
      // 6+ person pop-up cabin — vertical walls, room for kids and gear.
      { productId: 'fanttik-zeta-c6-pro', category: 'Tent' },
      // Queen mattress for the adults + a luxury self-inflating pad for
      // the kids' side. Different from Weekend's pad-only sleep system.
      { productId: 'lost-horizon-air-foam-mattress', category: 'Sleep' },
      { productId: 'mondoking-3d-pad', category: 'Sleep' },
      // 2-burner stove — three nights = real meals, not just boiling water.
      { productId: 'coleman-triton-2-burner', category: 'Cooking' },
      { productId: 'coleman-classic-rolling-cooler', category: 'Cooler' },
      // Chair with built-in cooler — kid-friendly, fits anywhere.
      { productId: 'coleman-portable-chair-cooler', category: 'Comfort' },
      // Shade for a 3-day stay is worth its weight.
      { productId: 'core-10x10-canopy', category: 'Comfort' },
      // The differentiator: contained play space for the smallest campers.
      { productId: 'kidco-gopod', category: 'Fun upgrade' },
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
