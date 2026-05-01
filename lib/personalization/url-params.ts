import type { PlanSlug } from '@/types'
import { partySizeToPeopleBucket } from './modifiers'
import type {
  ActivityType,
  ComfortLevel,
  GroupType,
  KidsAgeBucket,
  QuizOutput,
} from './types'

/**
 * URL params for /plans/[planId]:
 *   adults, kids                    — existing (numeric)
 *   group     ∈ solo|couple|family  — new
 *   kidsAge   ∈ under_5|5_10|10+    — new (only when family)
 *   activity  ∈ relaxing|balanced|active
 *   comfort   ∈ minimal|balanced|comfort-first
 *
 * Missing params resolve to safe defaults that produce the "balanced standard"
 * output, so legacy `?adults=2&kids=2` URLs continue to work.
 */
export type PlanSearchParams = {
  adults?: string
  kids?: string
  group?: string
  kidsAge?: string
  activity?: string
  comfort?: string
}

const VALID_GROUP: ReadonlySet<GroupType> = new Set(['solo', 'couple', 'family'])
const VALID_KIDS_AGE: ReadonlySet<KidsAgeBucket> = new Set(['under_5', '5_10', '10+'])
const VALID_ACTIVITY: ReadonlySet<ActivityType> = new Set(['relaxing', 'balanced', 'active'])
const VALID_COMFORT: ReadonlySet<ComfortLevel> = new Set(['minimal', 'balanced', 'comfort-first'])

function parsePartySize(params: PlanSearchParams): { adults: number; kids: number } {
  const a = Number.parseInt(params.adults ?? '', 10)
  const k = Number.parseInt(params.kids ?? '', 10)
  return {
    adults: Number.isFinite(a) && a >= 1 ? Math.min(a, 12) : 2,
    kids: Number.isFinite(k) && k >= 0 ? Math.min(k, 12) : 2,
  }
}

export function parseQuizOutput(planSlug: PlanSlug, params: PlanSearchParams): QuizOutput {
  const partySize = parsePartySize(params)
  const peopleBucket = partySizeToPeopleBucket(partySize.adults, partySize.kids)

  // Default groupType: kids > 0 → family, else couple/solo by adult count.
  const explicitGroup = params.group as GroupType | undefined
  const groupType: GroupType = VALID_GROUP.has(explicitGroup as GroupType)
    ? (explicitGroup as GroupType)
    : partySize.kids > 0
      ? 'family'
      : partySize.adults === 1
        ? 'solo'
        : 'couple'

  const hasKids = groupType === 'family' && partySize.kids > 0

  const explicitKidsAge = params.kidsAge as KidsAgeBucket | undefined
  const kidsAge: KidsAgeBucket | undefined =
    hasKids && VALID_KIDS_AGE.has(explicitKidsAge as KidsAgeBucket)
      ? (explicitKidsAge as KidsAgeBucket)
      : hasKids
        ? '5_10'
        : undefined

  const explicitActivity = params.activity as ActivityType | undefined
  const activityType: ActivityType = VALID_ACTIVITY.has(explicitActivity as ActivityType)
    ? (explicitActivity as ActivityType)
    : 'balanced'

  const explicitComfort = params.comfort as ComfortLevel | undefined
  const comfortLevel: ComfortLevel = VALID_COMFORT.has(explicitComfort as ComfortLevel)
    ? (explicitComfort as ComfortLevel)
    : 'balanced'

  return {
    planSlug,
    partySize,
    groupType,
    peopleBucket,
    hasKids,
    kidsAge,
    activityType,
    comfortLevel,
  }
}

/** Serialize to URL search-param string. Used by the quiz to redirect. */
export function serializeQuizOutput(out: QuizOutput): URLSearchParams {
  const sp = new URLSearchParams()
  sp.set('adults', String(out.partySize.adults))
  sp.set('kids', String(out.partySize.kids))
  sp.set('group', out.groupType)
  if (out.hasKids && out.kidsAge) sp.set('kidsAge', out.kidsAge)
  sp.set('activity', out.activityType)
  sp.set('comfort', out.comfortLevel)
  return sp
}
