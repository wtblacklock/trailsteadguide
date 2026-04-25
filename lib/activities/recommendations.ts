import type { KidsAgeGroup, PartySize, PlanSlug } from '@/types'
import type { Activity, AgeRange } from './types'
import { ACTIVITIES } from './data'

/**
 * Map the project's existing kid age buckets onto the Activities System
 * age ranges. The activities system uses tighter buckets (3-5/6-8/9-12) than
 * the quiz (3-6/7-12) so we expand to cover the overlap.
 */
function mapKidAgeGroupToRanges(group: KidsAgeGroup): AgeRange[] {
  switch (group) {
    case '3-6':
      return ['3-5', '6-8', 'all-ages']
    case '7-12':
      return ['6-8', '9-12', 'all-ages']
    case 'teens':
      return ['13-17', 'all-ages']
    case 'none':
      return ['adults', 'all-ages']
  }
}

function fitsGroupSize(activity: Activity, total: number): boolean {
  switch (activity.groupSize) {
    case 'solo':
      return total >= 1
    case '2-4':
      return total >= 2
    case '5-10':
      return total >= 4
    case '10+':
      return total >= 8
  }
}

export type RecommendInput = {
  planSlug: PlanSlug
  kidsAgeGroups: KidsAgeGroup[]
  partySize: PartySize
  limit?: number
}

/**
 * Return up to `limit` activities that fit a given trip profile.
 *
 * Ranking:
 * 1. Activities explicitly tagged for this planSlug.
 * 2. Activities whose age range overlaps the kids in the group.
 * 3. Activities whose group size fits the party.
 *
 * Ties are broken by `recommendedFor` count (broader fit ranks lower) so that
 * plan-specific activities surface first.
 */
export function recommendActivitiesFor(input: RecommendInput): Activity[] {
  const { planSlug, kidsAgeGroups, partySize, limit = 4 } = input
  const total = partySize.adults + partySize.kids

  const allowedAges = new Set<AgeRange>(['all-ages'])
  if (kidsAgeGroups.length === 0 || kidsAgeGroups.every((g) => g === 'none')) {
    allowedAges.add('adults')
  } else {
    for (const g of kidsAgeGroups) {
      for (const r of mapKidAgeGroupToRanges(g)) allowedAges.add(r)
    }
  }

  const scored = ACTIVITIES.map((a) => {
    const planMatch = a.recommendedFor?.includes(planSlug) ? 1 : 0
    const ageMatch = allowedAges.has(a.ageRange) ? 1 : 0
    const groupMatch = fitsGroupSize(a, total) ? 1 : 0
    const score = planMatch * 4 + ageMatch * 2 + groupMatch
    return { activity: a, score, planMatch }
  })

  return scored
    .filter((s) => s.score >= 3) // require at least age + group match (or plan match)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      // Prefer narrower-fit activities (those tagged for fewer plans) when tied.
      const aFit = a.activity.recommendedFor?.length ?? 99
      const bFit = b.activity.recommendedFor?.length ?? 99
      return aFit - bFit
    })
    .slice(0, limit)
    .map((s) => s.activity)
}
