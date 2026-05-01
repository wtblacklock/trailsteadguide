/**
 * Canonical gear-recommendation slots used by the affiliate audit and the
 * coverage worksheet at data/affiliate-coverage.csv.
 *
 * Each guide gets a curated list of slots (BASE_SLOTS plus any matching
 * scenario slots). The audit script asks: "for guide X and slot Y, which
 * product in the registry — if any — currently fills it?" Empty cells in
 * the worksheet are the curation surface.
 *
 * Adding a new slot:
 *   1. Add it to GEAR_SLOTS with a label
 *   2. If the product has a `tags` entry that should infer this slot,
 *      add the mapping to TAG_TO_SLOT
 *   3. Update SCENARIO_RULES if the slot only applies to certain guides
 */

export type GearSlotId =
  | 'TENT'
  | 'SLEEP_BAG'
  | 'SLEEP_SURFACE'
  | 'STOVE'
  | 'COOKWARE'
  | 'COOLER'
  | 'LIGHTING'
  | 'CHAIR'
  | 'CANOPY'
  | 'RAIN_GEAR'
  | 'WINTER_GEAR'
  | 'HOT_GEAR'
  | 'DOG_GEAR'
  | 'KID_GEAR'
  | 'SAFETY'
  | 'POWER'
  | 'TRASH'

export type GearSlot = {
  id: GearSlotId
  label: string
  description: string
  /** Reddit search query template, used to bootstrap research. */
  researchQuery: string
}

export const GEAR_SLOTS: GearSlot[] = [
  { id: 'TENT', label: 'Tent', description: 'Primary shelter', researchQuery: 'best family tent first-time camping' },
  { id: 'SLEEP_BAG', label: 'Sleeping bag', description: '3-season bag, 20°F or warmer', researchQuery: 'best 3-season sleeping bag car camping' },
  { id: 'SLEEP_SURFACE', label: 'Sleep surface', description: 'Pad, air mattress, or cot', researchQuery: 'best sleeping pad family car camping' },
  { id: 'STOVE', label: 'Stove', description: '1- or 2-burner propane', researchQuery: 'best 2 burner propane stove car camping' },
  { id: 'COOKWARE', label: 'Cookware', description: 'Pots, pans, utensils', researchQuery: 'best camping cookware set family' },
  { id: 'COOLER', label: 'Cooler', description: 'Hard or rolling, 50-60qt range', researchQuery: 'best cooler for car camping family' },
  { id: 'LIGHTING', label: 'Lighting', description: 'Lantern + per-person headlamp', researchQuery: 'best camping lantern beginner' },
  { id: 'CHAIR', label: 'Chair', description: 'Per-adult seating', researchQuery: 'best camping chair family' },
  { id: 'CANOPY', label: 'Canopy / shade', description: 'Pop-up shade for hot or rainy sites', researchQuery: 'best pop up canopy camping shade' },
  { id: 'RAIN_GEAR', label: 'Rain gear', description: 'Tarp, ponchos, rainfly extras', researchQuery: 'best tarp setup rain camping' },
  { id: 'WINTER_GEAR', label: 'Cold-weather gear', description: '0°F bag, footprint, hand warmers', researchQuery: 'winter car camping sleeping bag 0 degree' },
  { id: 'HOT_GEAR', label: 'Hot-weather gear', description: 'Tent fan, cooling towels, electrolytes', researchQuery: 'best tent fan summer camping' },
  { id: 'DOG_GEAR', label: 'Dog gear', description: 'Tie-out, water bowl, paw protection', researchQuery: 'dog camping gear tie out water bowl' },
  { id: 'KID_GEAR', label: 'Kid-specific gear', description: 'Kid sleeping bag, headlamp, games', researchQuery: 'kids camping gear sleeping bag headlamp' },
  { id: 'SAFETY', label: 'Safety / first aid', description: 'First-aid kit, whistle, bear spray (where relevant)', researchQuery: 'best first aid kit camping family' },
  { id: 'POWER', label: 'Power / charging', description: 'Power bank, solar panel, battery box', researchQuery: 'best power bank camping' },
  { id: 'TRASH', label: 'Trash / cleanup', description: 'Collapsible can, bags, dish kit', researchQuery: 'collapsible camping trash can' },
]

/** Map product `tags` entries to the slot they fill. */
export const TAG_TO_SLOT: Record<string, GearSlotId> = {
  tent: 'TENT',
  'sleeping-bag': 'SLEEP_BAG',
  'sleeping-pad': 'SLEEP_SURFACE',
  'air-mattress': 'SLEEP_SURFACE',
  cot: 'SLEEP_SURFACE',
  stove: 'STOVE',
  cooler: 'COOLER',
  lantern: 'LIGHTING',
  headlamp: 'LIGHTING',
  'lantern-hanger': 'LIGHTING',
  chair: 'CHAIR',
  canopy: 'CANOPY',
  trash: 'TRASH',
  // No product types yet for: COOKWARE, RAIN_GEAR, WINTER_GEAR, HOT_GEAR,
  // DOG_GEAR, KID_GEAR, SAFETY, POWER. Those are the gap surface.
}

/** Slots every guide gets — the always-relevant baseline. */
export const BASE_SLOTS: GearSlotId[] = [
  'TENT', 'SLEEP_BAG', 'SLEEP_SURFACE', 'STOVE', 'COOLER', 'LIGHTING', 'CHAIR', 'SAFETY',
]

/**
 * Adds extra slots to a guide based on keywords in its slug.
 * One guide can match multiple rules.
 *
 * Pruned to match the curated CSV at `data/affiliate-coverage.csv` —
 * we only auto-add slots that the registry actually has products for
 * today. Restoring an auto-add (e.g. RAIN_GEAR, HOT_GEAR, WINTER_GEAR,
 * POWER, or keyword-based CANOPY) is a two-step change: add real
 * products to the registry, then add the rule back here AND in the
 * audit script `scripts/affiliate-audit.mjs`.
 */
export const SCENARIO_RULES: Array<{ keywords: string[]; addSlots: GearSlotId[] }> = [
  // Heatwave-only canopy — the rest of the hot-weather guides don't
  // currently have a CANOPY row in the CSV. Expand this list when those
  // guides gain a curated canopy.
  { keywords: ['heatwave'], addSlots: ['CANOPY'] },
  // Dogs
  { keywords: ['dogs'], addSlots: ['DOG_GEAR'] },
  // Kids — every guide on this site is family-focused, so include sitewide
  { keywords: [], addSlots: ['KID_GEAR'] },
]

/** Compute the slot list for a guide based on its slug. */
export function slotsForGuide(slug: string): GearSlotId[] {
  const set = new Set<GearSlotId>(BASE_SLOTS)
  const lower = slug.toLowerCase()
  for (const rule of SCENARIO_RULES) {
    const matches = rule.keywords.length === 0 || rule.keywords.some((k) => lower.includes(k))
    if (matches) {
      for (const s of rule.addSlots) set.add(s)
    }
  }
  // Stable display order — match GEAR_SLOTS declaration order
  return GEAR_SLOTS.map((s) => s.id).filter((id) => set.has(id))
}
