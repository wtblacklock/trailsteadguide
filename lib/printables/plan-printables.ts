import type { PlanSlug } from '@/types'
import { getPrintableBySlug } from './data'
import type { Printable } from './types'

/**
 * Curated plan → printable slug mapping. Powers the "Free printables for
 * this trip" section on each plan page. Unlike the skill/activity
 * companion pairings (which surface a printable only if you click into a
 * specific skill or activity), every printable here is placed directly on
 * at least one plan page, so all 15 are reachable without leaving the
 * plan a visitor lands on after the quiz.
 *
 * Curated from each plan's actual recommendedSkills / activitySchedule /
 * safetyNotes in lib/plan-templates.ts - not a generic "show everything"
 * list.
 */
export const PLAN_PRINTABLES: Record<PlanSlug, string[]> = {
  'backyard-test': [
    'backyard-test-checklist',
    'northern-hemisphere-constellation-wheel',
    'nature-scavenger-hunt-card',
    'shadow-puppet-hand-guide',
    'knot-reference-card',
  ],
  'first-night-camp': [
    'camp-cooking-conversion-card',
    'fire-starting-checklist',
    'kids-camping-packing-list',
    'bear-bag-food-storage-card',
    'camp-first-aid-quick-reference',
  ],
  'first-weekend-camp': [
    'northern-hemisphere-constellation-wheel',
    'animal-track-id-card',
    'weather-signs-field-card',
    'bear-bag-food-storage-card',
    'leave-no-trace-quick-reference',
  ],
  'easy-family-basecamp': [
    '3-day-camp-meal-planner',
    'night-sky-bingo',
    'animal-track-id-card',
    'nature-scavenger-hunt-card',
    'camp-first-aid-quick-reference',
  ],
}

/** Resolved printables for a plan, in curated order. Drops unknown slugs defensively. */
export function getPrintablesForPlan(planSlug: PlanSlug): Printable[] {
  const slugs = PLAN_PRINTABLES[planSlug] ?? []
  return slugs
    .map((slug) => getPrintableBySlug(slug))
    .filter((p): p is Printable => p !== null)
}

/**
 * Reverse lookup: every plan (slug + title) that lists the given printable.
 * Powers the "Plans that use this printable" section on /printables/[slug].
 */
export function getPlansLinkedToPrintable(printableSlug: string): PlanSlug[] {
  return (Object.keys(PLAN_PRINTABLES) as PlanSlug[]).filter((planSlug) =>
    PLAN_PRINTABLES[planSlug].includes(printableSlug),
  )
}

/** Every printable slug referenced by at least one plan - used only by the completeness test below. */
export function allPlanPrintableSlugs(): string[] {
  return Array.from(new Set(Object.values(PLAN_PRINTABLES).flat()))
}
