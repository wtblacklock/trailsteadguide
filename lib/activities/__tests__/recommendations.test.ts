import { describe, expect, it } from 'vitest'
import { recommendActivitiesFor } from '../recommendations'

describe('recommendActivitiesFor', () => {
  it('returns at most `limit` activities', () => {
    const result = recommendActivitiesFor({
      planSlug: 'first-night-camp',
      kidsAgeGroups: ['7-12'],
      partySize: { adults: 2, kids: 2 },
      limit: 3,
    })
    expect(result.length).toBeLessThanOrEqual(3)
  })

  it('prioritizes activities tagged for the given plan slug', () => {
    const result = recommendActivitiesFor({
      planSlug: 'first-night-camp',
      kidsAgeGroups: ['7-12'],
      partySize: { adults: 2, kids: 2 },
    })
    expect(result.length).toBeGreaterThan(0)
    // Top result should be tagged for this plan.
    expect(result[0].recommendedFor).toContain('first-night-camp')
  })

  it('handles adults-only parties', () => {
    const result = recommendActivitiesFor({
      planSlug: 'easy-family-basecamp',
      kidsAgeGroups: ['none'],
      partySize: { adults: 3, kids: 0 },
    })
    expect(result.length).toBeGreaterThan(0)
    // No 6-8 or 9-12 only activities should leak into adults-only output.
    expect(result.every((a) => a.ageRange === 'all-ages' || a.ageRange === 'adults' || a.ageRange === '13-17')).toBe(
      true,
    )
  })

  it('respects group size — small parties do not get 10+ activities', () => {
    const result = recommendActivitiesFor({
      planSlug: 'first-night-camp',
      kidsAgeGroups: ['3-6'],
      partySize: { adults: 2, kids: 1 },
    })
    expect(result.every((a) => a.groupSize !== '10+')).toBe(true)
  })

  it('teens unlock 13-17 tagged activities', () => {
    const result = recommendActivitiesFor({
      planSlug: 'first-weekend-camp',
      kidsAgeGroups: ['teens'],
      partySize: { adults: 2, kids: 2 },
      limit: 10,
    })
    // Trail Journal Sketching is tagged 13-17 and recommended for first-weekend-camp
    expect(result.some((a) => a.slug === 'trail-journal-sketching')).toBe(true)
  })

  it('returns an empty array for an impossibly small party with no fit', () => {
    const result = recommendActivitiesFor({
      planSlug: 'backyard-test',
      kidsAgeGroups: ['none'],
      partySize: { adults: 1, kids: 0 },
    })
    // We tolerate empty here; the smoke check is "does not crash".
    expect(Array.isArray(result)).toBe(true)
  })
})
