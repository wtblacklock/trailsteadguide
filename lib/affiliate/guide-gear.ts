/**
 * Resolve a guide slug to its grouped gear list.
 *
 * Joins `data/guide-gear.ts` (slot + productId pairs) against the
 * affiliate registry and groups by slot. Used by the guide gear shelf
 * and by quiz results when mapping plan slugs back to a donor guide.
 */

import { GUIDE_GEAR, type GuideGearEntry } from '@/data/guide-gear'
import { getProductById } from '@/lib/affiliate-products'
import { GEAR_SLOTS, type GearSlotId } from '@/lib/affiliate/gear-slots'
import type { AffiliateProduct } from '@/types'

export type GuideGearGroup = {
  slot: GearSlotId
  /** Display label from `GEAR_SLOTS` (e.g. "Sleep surface"). */
  label: string
  products: AffiliateProduct[]
}

const SLOT_LABEL: Record<GearSlotId, string> = Object.fromEntries(
  GEAR_SLOTS.map((s) => [s.id, s.label]),
) as Record<GearSlotId, string>

/**
 * Plan slug → guide slug mapping. The 4 quiz outcome plans pull their
 * gear from a representative guide. Used by `getProductsForPlan()` and
 * by the trip-pack PDF bundle resolver.
 */
export const PLAN_TO_GUIDE: Record<string, string> = {
  'backyard-test': 'first-night-camping-guide',
  'first-night-camp': 'first-night-camping-guide',
  'first-weekend-camp': 'weekend-camping-packing-list',
  'easy-family-basecamp': 'camping-with-kids-first-time',
}

/**
 * Returns the gear list for a guide slug, grouped by slot in stable
 * display order. Returns an empty array if the slug isn't in the map.
 */
export function getGearForGuide(guideSlug: string): GuideGearGroup[] {
  const entries: GuideGearEntry[] = GUIDE_GEAR[guideSlug] ?? []
  if (entries.length === 0) return []

  const bySlot = new Map<GearSlotId, AffiliateProduct[]>()
  for (const entry of entries) {
    const product = getProductById(entry.productId)
    const list = bySlot.get(entry.slot) ?? []
    list.push(product)
    bySlot.set(entry.slot, list)
  }

  // Order by GEAR_SLOTS declaration so the shelf reads top-to-bottom
  // the same way on every page.
  return GEAR_SLOTS.flatMap((slot) => {
    const products = bySlot.get(slot.id)
    if (!products?.length) return []
    return [{ slot: slot.id, label: SLOT_LABEL[slot.id], products }]
  })
}

/**
 * Convenience: flat list of products for a guide (no slot grouping).
 * Use this when you want a "products in this guide's recommended set"
 * filter — for the quiz results AffiliateBlock or related-product blocks.
 */
export function getProductsForGuide(guideSlug: string): AffiliateProduct[] {
  return getGearForGuide(guideSlug).flatMap((g) => g.products)
}
