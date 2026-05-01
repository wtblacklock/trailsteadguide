/**
 * Quiz personalization engine — types.
 *
 * The quiz produces a `QuizOutput` object which feeds two deterministic
 * pure builders:
 *   - `buildModifiers(out)` returns flag bag used by `applyModifiers`
 *   - `buildGearSystems(out, modifiers)` selects the 4 system tiers
 *
 * No types here are persisted; URL params (see `lib/personalization/url-params.ts`)
 * are the single source of truth on the results page.
 */

import type { PlanSlug, PartySize } from '@/types'

export type GroupType = 'solo' | 'couple' | 'family'
export type PeopleBucket = '1-2' | '3-4' | '5+'
export type KidsAgeBucket = 'under_5' | '5_10' | '10+'
export type ActivityType = 'relaxing' | 'balanced' | 'active'
export type ComfortLevel = 'minimal' | 'balanced' | 'comfort-first'

export type QuizOutput = {
  planSlug: PlanSlug
  partySize: PartySize
  groupType: GroupType
  peopleBucket: PeopleBucket
  hasKids: boolean
  /** Only meaningful when hasKids; undefined for solo/couple. */
  kidsAge?: KidsAgeBucket
  activityType: ActivityType
  comfortLevel: ComfortLevel
}

export type Modifiers = {
  isFamily: boolean
  hasKids: boolean
  kidsUnder5: boolean
  kids5to10: boolean
  kids10plus: boolean
  isLargeGroup: boolean
  isRelaxedTrip: boolean
  isActiveTrip: boolean
  isComfortFocused: boolean
  isMinimal: boolean
}

/**
 * Per-plan rule definition. Each modifier key may add or remove items in
 * the merged plan output.
 *
 * Authoring convention: only add fields that move the needle for that plan;
 * leave the rest undefined.
 */
export type PlanModifierRule = {
  /** Packing items appended (verbatim strings, prefixed in UI as additions). */
  addPacking?: string[]
  /** Packing item names to filter out of the base list (substring match). */
  removePacking?: string[]
  /** Timeline rows appended to a specific block. */
  addTimeline?: {
    block: 'preTrip' | 'arrival' | 'evening' | 'morning'
    items: { time: string; title: string; description: string }[]
  }
  /** Safety / framing notes appended to safetyNotes. */
  addNotes?: string[]
}

export type ModifierRules = Partial<Record<keyof Modifiers, PlanModifierRule>>

export type SleepSystemId = 'single' | 'shared' | 'flex' | 'split'
export type CookingSystemId = 'minimal' | 'standard' | 'comfort'
export type LightingSystemId = 'single_zone' | 'multi_zone'
export type ComfortSystemId = 'low' | 'medium' | 'high'

export type GearSystemSelection = {
  sleep: SleepSystemId
  cooking: CookingSystemId
  lighting: LightingSystemId
  comfort: ComfortSystemId
}
