import type { GearItem, PlanTemplate, TimelineItem } from '@/types'
import type { ModifierRules, Modifiers } from './types'

export type MergedPlan = PlanTemplate & {
  /** Diagnostic: which modifier keys actually fired during merge. */
  appliedModifiers: (keyof Modifiers)[]
}

/**
 * Deterministic merge engine.
 *
 * Clones the plan, then for each `true` modifier flag with a matching rule:
 *   - filters base packing by `removePacking` (substring match on item.name)
 *   - appends `addPacking` items as new GearItem rows (essential: false)
 *   - appends `addTimeline` rows to the named block
 *   - appends `addNotes` strings to safetyNotes
 *
 * Stable ordering: rules are applied in `MODIFIER_ORDER` so output is
 * predictable regardless of object key iteration.
 */
const MODIFIER_ORDER: (keyof Modifiers)[] = [
  'isFamily',
  'hasKids',
  'kidsUnder5',
  'kids5to10',
  'kids10plus',
  'isLargeGroup',
  'isRelaxedTrip',
  'isActiveTrip',
  'isComfortFocused',
  'isMinimal',
]

export function applyModifiers(
  plan: PlanTemplate,
  modifiers: Modifiers,
  rules: ModifierRules,
): MergedPlan {
  const merged: MergedPlan = {
    ...plan,
    preTrip: [...plan.preTrip],
    arrival: [...plan.arrival],
    evening: [...plan.evening],
    morning: [...plan.morning],
    gear: [...plan.gear],
    safetyNotes: [...plan.safetyNotes],
    appliedModifiers: [],
  }

  for (const key of MODIFIER_ORDER) {
    if (!modifiers[key]) continue
    const rule = rules[key]
    if (!rule) continue

    merged.appliedModifiers.push(key)

    if (rule.removePacking && rule.removePacking.length > 0) {
      const drop = rule.removePacking.map((s) => s.toLowerCase())
      merged.gear = merged.gear.filter(
        (g) => !drop.some((d) => g.name.toLowerCase().includes(d)),
      )
    }

    if (rule.addPacking && rule.addPacking.length > 0) {
      const additions: GearItem[] = rule.addPacking.map((name) => ({
        name,
        essential: false,
      }))
      merged.gear = [...merged.gear, ...additions]
    }

    if (rule.addTimeline) {
      const block = rule.addTimeline.block
      const additions: TimelineItem[] = rule.addTimeline.items
      merged[block] = [...merged[block], ...additions]
    }

    if (rule.addNotes && rule.addNotes.length > 0) {
      merged.safetyNotes = [...merged.safetyNotes, ...rule.addNotes]
    }
  }

  return merged
}
