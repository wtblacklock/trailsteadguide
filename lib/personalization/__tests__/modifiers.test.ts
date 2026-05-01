import { describe, it, expect } from 'vitest'
import { buildModifiers, partySizeToPeopleBucket } from '../modifiers'
import type { QuizOutput } from '../types'

const baseFamily: QuizOutput = {
  planSlug: 'first-night-camp',
  partySize: { adults: 2, kids: 2 },
  groupType: 'family',
  peopleBucket: '3-4',
  hasKids: true,
  kidsAge: '5_10',
  activityType: 'balanced',
  comfortLevel: 'balanced',
}

describe('partySizeToPeopleBucket', () => {
  it.each([
    [1, 0, '1-2'],
    [2, 0, '1-2'],
    [2, 1, '3-4'],
    [2, 2, '3-4'],
    [2, 3, '5+'],
    [3, 3, '5+'],
  ] as const)('adults=%i kids=%i → %s', (a, k, expected) => {
    expect(partySizeToPeopleBucket(a, k)).toBe(expected)
  })
})

describe('buildModifiers', () => {
  it('marks isFamily and hasKids for a family with kids', () => {
    const m = buildModifiers(baseFamily)
    expect(m.isFamily).toBe(true)
    expect(m.hasKids).toBe(true)
  })

  it('exposes exactly one age flag at a time', () => {
    expect(buildModifiers({ ...baseFamily, kidsAge: 'under_5' })).toMatchObject({
      kidsUnder5: true,
      kids5to10: false,
      kids10plus: false,
    })
    expect(buildModifiers({ ...baseFamily, kidsAge: '5_10' })).toMatchObject({
      kidsUnder5: false,
      kids5to10: true,
      kids10plus: false,
    })
    expect(buildModifiers({ ...baseFamily, kidsAge: '10+' })).toMatchObject({
      kidsUnder5: false,
      kids5to10: false,
      kids10plus: true,
    })
  })

  it('clears all age flags when no kids', () => {
    const m = buildModifiers({
      ...baseFamily,
      groupType: 'couple',
      hasKids: false,
      kidsAge: undefined,
    })
    expect(m).toMatchObject({
      hasKids: false,
      kidsUnder5: false,
      kids5to10: false,
      kids10plus: false,
    })
  })

  it('flags isLargeGroup only at 5+', () => {
    expect(buildModifiers({ ...baseFamily, peopleBucket: '3-4' }).isLargeGroup).toBe(false)
    expect(buildModifiers({ ...baseFamily, peopleBucket: '5+' }).isLargeGroup).toBe(true)
  })

  it('flags activity and comfort levels independently', () => {
    expect(
      buildModifiers({ ...baseFamily, activityType: 'active', comfortLevel: 'minimal' }),
    ).toMatchObject({
      isRelaxedTrip: false,
      isActiveTrip: true,
      isMinimal: true,
      isComfortFocused: false,
    })
    expect(
      buildModifiers({ ...baseFamily, activityType: 'relaxing', comfortLevel: 'comfort-first' }),
    ).toMatchObject({
      isRelaxedTrip: true,
      isActiveTrip: false,
      isMinimal: false,
      isComfortFocused: true,
    })
  })
})
