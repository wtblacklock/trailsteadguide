/**
 * Gear Sets - curated, reusable bundles of affiliate products mapped to a
 * GearSetId. Plans reference a GearSetId rather than a flat list, so the same
 * bundle can power both the gear-guide page and the PDF Trip Pack.
 *
 * Categories drive PDF layout: tents, cooking, coolers, lighting, comfort,
 * sleep, fun-upgrades.
 *
 * Quality tiers: an entry can optionally declare a `slot` (the same
 * GearSlotId vocabulary the guide gear shelf uses) and a `tier`. Multiple
 * entries can share a `slot` - one per tier - and `resolveGearSet()` picks
 * the one matching the requested tier, falling back to 'standard' (or the
 * first entry for that slot) when a slot has no variant for the requested
 * tier. Entries with no `slot` are untiered and always included - most
 * comfort/fun-upgrade items don't have a meaningfully different budget or
 * premium version, so they're left constant across tiers.
 */

import type { AffiliateProduct } from '@/types'
import { AFFILIATE_PRODUCTS } from './affiliate-products'
import type { GearSlotId } from './affiliate/gear-slots'
import type { GearSetId } from './plan-content'

export type GearCategoryLabel =
  | 'Tent'
  | 'Sleep'
  | 'Cooking'
  | 'Cooler'
  | 'Lighting'
  | 'Comfort'
  | 'Fun upgrade'

export type GearTier = 'budget' | 'standard' | 'premium'

export const GEAR_TIERS: { id: GearTier; label: string }[] = [
  { id: 'budget', label: 'Budget' },
  { id: 'standard', label: 'Standard' },
  { id: 'premium', label: 'Premium' },
]

export type GearSetEntry = {
  productId: string
  category: GearCategoryLabel
  /** Optional override for PDF blurb (else uses product.description). */
  pdfBlurb?: string
  /**
   * Which role this fills, for tier-swap grouping (e.g. 'TENT',
   * 'SLEEP_BAG'). Only set on entries that vary by quality tier - an entry
   * without a slot is always included, regardless of the selected tier.
   */
  slot?: GearSlotId
  /** Which quality tier this specific product represents for its slot. Omit for the 'standard' pick. */
  tier?: GearTier
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
      { productId: 'coleman-sundome-4p', category: 'Tent', slot: 'TENT' },
      { productId: 'tnf-wawona-6', category: 'Tent', slot: 'TENT', tier: 'premium' },
      { productId: 'coleman-brazos-bag', category: 'Sleep', slot: 'SLEEP_BAG' },
      { productId: 'fwc-sleeping-bag-mallome', category: 'Sleep', slot: 'SLEEP_BAG', tier: 'budget' },
      { productId: 'marmot-mad-river-0', category: 'Sleep', slot: 'SLEEP_BAG', tier: 'premium' },
      { productId: 'black-diamond-spot-400', category: 'Lighting', slot: 'LIGHTING' },
      { productId: 'fwc-lantern-consciot', category: 'Lighting', slot: 'LIGHTING', tier: 'budget' },
      { productId: 'luminaid-packlite-max', category: 'Lighting', slot: 'LIGHTING', tier: 'premium' },
    ],
  },
  FIRST_NIGHT_MINIMAL_GEAR: {
    id: 'FIRST_NIGHT_MINIMAL_GEAR',
    title: 'First Night Simple Kit',
    tagline: 'One tent, one sleep system, one light setup. Nothing extra.',
    entries: [
      { productId: 'coleman-sundome-4p', category: 'Tent', slot: 'TENT' },
      { productId: 'tnf-wawona-6', category: 'Tent', slot: 'TENT', tier: 'premium' },
      { productId: 'coleman-brazos-bag', category: 'Sleep', slot: 'SLEEP_BAG' },
      { productId: 'fwc-sleeping-bag-mallome', category: 'Sleep', slot: 'SLEEP_BAG', tier: 'budget' },
      { productId: 'marmot-mad-river-0', category: 'Sleep', slot: 'SLEEP_BAG', tier: 'premium' },
      { productId: 'big-agnes-divide', category: 'Sleep', slot: 'SLEEP_SURFACE' },
      { productId: 'sleeping-pad-air', category: 'Sleep', slot: 'SLEEP_SURFACE', tier: 'budget' },
      { productId: 'mondoking-3d-pad', category: 'Sleep', slot: 'SLEEP_SURFACE', tier: 'premium' },
      // Lantern is the tiered lighting item; the headlamp is untiered and
      // included at every tier - one per person is non-negotiable regardless of budget.
      { productId: 'luminaid-packlite-max', category: 'Lighting', slot: 'LIGHTING' },
      { productId: 'fwc-lantern-consciot', category: 'Lighting', slot: 'LIGHTING', tier: 'budget' },
      { productId: 'black-diamond-spot-400', category: 'Lighting' },
    ],
  },
  WEEKEND_BALANCED_GEAR: {
    id: 'WEEKEND_BALANCED_GEAR',
    title: 'Weekend Ready Kit',
    tagline: 'Two-night comfort without overpacking the car.',
    entries: [
      // Step up from the entry-level Sundome to a sturdier 4P with better
      // pole + fly quality - worth it once you know you'll go back out.
      { productId: 'alps-lynx-4p', category: 'Tent', slot: 'TENT' },
      { productId: 'coleman-sundome-4p', category: 'Tent', slot: 'TENT', tier: 'budget' },
      { productId: 'tnf-wawona-6', category: 'Tent', slot: 'TENT', tier: 'premium' },
      { productId: 'coleman-brazos-bag', category: 'Sleep', slot: 'SLEEP_BAG' },
      { productId: 'fwc-sleeping-bag-mallome', category: 'Sleep', slot: 'SLEEP_BAG', tier: 'budget' },
      { productId: 'marmot-mad-river-0', category: 'Sleep', slot: 'SLEEP_BAG', tier: 'premium' },
      { productId: 'big-agnes-divide', category: 'Sleep', slot: 'SLEEP_SURFACE' },
      { productId: 'sleeping-pad-air', category: 'Sleep', slot: 'SLEEP_SURFACE', tier: 'budget' },
      { productId: 'mondoking-3d-pad', category: 'Sleep', slot: 'SLEEP_SURFACE', tier: 'premium' },
      // Single-burner is the right call for a weekend - fewer parts, faster
      // setup, still cooks real food. Save the 2-burner for basecamp.
      { productId: 'coleman-1-burner', category: 'Cooking', slot: 'STOVE' },
      { productId: 'coleman-triton-2-burner', category: 'Cooking', slot: 'STOVE', tier: 'premium' },
      { productId: 'coleman-classic-rolling-cooler', category: 'Cooler', slot: 'COOLER' },
      { productId: 'coleman-xtreme-50-cooler', category: 'Cooler', slot: 'COOLER', tier: 'budget' },
      { productId: 'cooler-basic', category: 'Cooler', slot: 'COOLER', tier: 'premium' },
      { productId: 'luminaid-packlite-max', category: 'Lighting', slot: 'LIGHTING' },
      { productId: 'fwc-lantern-consciot', category: 'Lighting', slot: 'LIGHTING', tier: 'budget' },
      { productId: 'streamlight-protac-2', category: 'Lighting', slot: 'HEADLAMP' },
      { productId: 'black-diamond-spot-400', category: 'Lighting', slot: 'HEADLAMP', tier: 'budget' },
      // Rocker chair - the upgrade you remember after night one.
      { productId: 'gci-freestyle-rocker', category: 'Comfort', slot: 'CHAIR' },
      { productId: 'coleman-portable-chair-cooler', category: 'Comfort', slot: 'CHAIR', tier: 'budget' },
      { productId: 'camp-chairs', category: 'Comfort', slot: 'CHAIR', tier: 'premium' },
    ],
  },
  EASY_FAMILY_BASECAMP_GEAR: {
    id: 'EASY_FAMILY_BASECAMP_GEAR',
    title: 'Family Basecamp Kit',
    tagline: 'Three-night basecamp with real beds, real shade, real meals.',
    entries: [
      // 6+ person pop-up cabin - vertical walls, room for kids and gear.
      { productId: 'core-6p-instant-cabin', category: 'Tent', slot: 'TENT' },
      { productId: 'coleman-sundome-4p', category: 'Tent', slot: 'TENT', tier: 'budget' },
      { productId: 'tnf-wawona-6', category: 'Tent', slot: 'TENT', tier: 'premium' },
      // Queen mattress for the adults (the tiered slot) + a constant
      // self-inflating pad for the kids' side, regardless of tier.
      { productId: 'lost-horizon-air-foam-mattress', category: 'Sleep', slot: 'SLEEP_SURFACE' },
      { productId: 'sleeping-pad-air', category: 'Sleep', slot: 'SLEEP_SURFACE', tier: 'budget' },
      { productId: 'mondoking-3d-pad', category: 'Sleep' },
      // 2-burner stove - three nights = real meals, not just boiling water.
      { productId: 'coleman-triton-2-burner', category: 'Cooking', slot: 'STOVE' },
      { productId: 'coleman-1-burner', category: 'Cooking', slot: 'STOVE', tier: 'budget' },
      { productId: 'stove-2-burner', category: 'Cooking', slot: 'STOVE', tier: 'premium' },
      { productId: 'coleman-classic-rolling-cooler', category: 'Cooler', slot: 'COOLER' },
      { productId: 'coleman-xtreme-50-cooler', category: 'Cooler', slot: 'COOLER', tier: 'budget' },
      { productId: 'cooler-basic', category: 'Cooler', slot: 'COOLER', tier: 'premium' },
      // Chair with built-in cooler - kid-friendly, fits anywhere.
      { productId: 'gci-freestyle-rocker', category: 'Comfort', slot: 'CHAIR' },
      { productId: 'coleman-portable-chair-cooler', category: 'Comfort', slot: 'CHAIR', tier: 'budget' },
      { productId: 'camp-chairs', category: 'Comfort', slot: 'CHAIR', tier: 'premium' },
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

/**
 * Resolves a gear set to its item list for a given quality tier.
 *
 * For each `slot` that has multiple tier variants, picks the entry
 * matching `tier`, falling back to the 'standard' entry (or the first
 * variant) when this slot has no dedicated pick for the requested tier -
 * so requesting 'budget' on a set with no budget tent just shows the
 * standard tent rather than omitting it.
 */
export function resolveGearSet(id: GearSetId, tier: GearTier = 'standard'): ResolvedGearItem[] {
  const set = GEAR_SETS[id]

  const bySlot = new Map<GearSlotId, GearSetEntry[]>()
  for (const entry of set.entries) {
    if (!entry.slot) continue
    const list = bySlot.get(entry.slot) ?? []
    list.push(entry)
    bySlot.set(entry.slot, list)
  }

  const winnerForSlot = new Map<GearSlotId, GearSetEntry>()
  for (const [slot, variants] of bySlot) {
    const winner =
      variants.find((v) => v.tier === tier) ??
      variants.find((v) => v.tier === undefined || v.tier === 'standard') ??
      variants[0]
    winnerForSlot.set(slot, winner)
  }

  return set.entries
    .filter((entry) => !entry.slot || winnerForSlot.get(entry.slot) === entry)
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

/** True if this gear set has at least one slot with a dedicated entry for `tier`. */
export function gearSetHasTier(id: GearSetId, tier: GearTier): boolean {
  if (tier === 'standard') return true
  return GEAR_SETS[id].entries.some((e) => e.tier === tier)
}

/**
 * Derives a display tier label from a product's existing `tags` (which
 * already carry 'budget' | 'mid-range' | 'premium' on most of the catalog).
 * Used to badge the multiple options a guide gear-shelf slot already lists
 * (e.g. 3 tent choices) as Budget/Standard/Premium instead of an
 * unlabeled flat list. Returns null when the product has no tier tag.
 */
export function tierLabelForProduct(product: AffiliateProduct): string | null {
  if (product.tags?.includes('budget')) return 'Budget'
  if (product.tags?.includes('mid-range')) return 'Standard'
  if (product.tags?.includes('premium')) return 'Premium'
  return null
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
    // Curated short link already includes the tag - return as-is.
    return product.affiliateUrl
  }
  if (product.amazonAsin) {
    return `https://www.amazon.com/dp/${product.amazonAsin}?tag=${tag}`
  }
  // Fallback: keyword search
  const q = encodeURIComponent(product.name)
  return `https://www.amazon.com/s?k=${q}&tag=${tag}`
}
