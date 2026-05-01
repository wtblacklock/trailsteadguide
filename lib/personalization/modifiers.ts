import type { Modifiers, QuizOutput } from './types'

/**
 * Pure derivation of modifier flags from the quiz output. Same input always
 * produces the same flags; no side effects.
 */
export function buildModifiers(out: QuizOutput): Modifiers {
  return {
    isFamily: out.groupType === 'family',
    hasKids: out.hasKids,
    kidsUnder5: out.hasKids && out.kidsAge === 'under_5',
    kids5to10: out.hasKids && out.kidsAge === '5_10',
    kids10plus: out.hasKids && out.kidsAge === '10+',
    isLargeGroup: out.peopleBucket === '5+',
    isRelaxedTrip: out.activityType === 'relaxing',
    isActiveTrip: out.activityType === 'active',
    isComfortFocused: out.comfortLevel === 'comfort-first',
    isMinimal: out.comfortLevel === 'minimal',
  }
}

/**
 * Bucket a raw party size into the spec's coarse `peopleBucket`.
 * Used by the URL → QuizOutput parser.
 */
export function partySizeToPeopleBucket(adults: number, kids: number): QuizOutput['peopleBucket'] {
  const total = adults + kids
  if (total <= 2) return '1-2'
  if (total <= 4) return '3-4'
  return '5+'
}
