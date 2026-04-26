import type { QuizOutput } from './types'

/**
 * Personalized opening line, used in the PlanHero hook and PDF cover subtitle.
 *
 * Variants in priority order:
 *   1. family + kids age  → tuned for the age group
 *   2. active trip        → frames the trip around the day's main activity
 *   3. comfort-first      → frames around relaxation
 *   4. default            → falls back to plan tagline (caller supplies)
 */
export function generateIntro(out: QuizOutput, fallback: string): string {
  if (out.hasKids && out.kidsAge === 'under_5') {
    return 'A calm, kid-paced plan that handles naps, snacks, and an early bedtime — built for families with toddlers and preschoolers.'
  }
  if (out.hasKids && out.kidsAge === '5_10') {
    return 'A trip tuned for school-age kids: enough adventure to hold their attention, simple enough that the adults still get to relax.'
  }
  if (out.hasKids && out.kidsAge === '10+') {
    return 'A plan that gives older kids space and a real role at camp — independence without losing the family rhythm.'
  }
  if (out.activityType === 'active') {
    return 'An active-first plan: the day centers on a hike, paddle, or trail run, with camp built around recovering well.'
  }
  if (out.comfortLevel === 'comfort-first') {
    return 'A deliberately comfortable trip — designed so nobody endures camping. Real meals, real beds, real chairs.'
  }
  if (out.activityType === 'relaxing') {
    return 'A slow-paced trip: low-effort meals, plenty of unstructured time, and nothing that has to happen on a schedule.'
  }
  return fallback
}
