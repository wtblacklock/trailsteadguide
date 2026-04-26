import { describe, it, expect } from 'vitest'
import { generateIntro } from '../intro'
import type { QuizOutput } from '../types'

const baseOut: QuizOutput = {
  planSlug: 'first-night-camp',
  partySize: { adults: 2, kids: 0 },
  groupType: 'couple',
  peopleBucket: '1-2',
  hasKids: false,
  activityType: 'balanced',
  comfortLevel: 'balanced',
}

describe('generateIntro', () => {
  it('returns the fallback when nothing personalizes', () => {
    expect(generateIntro(baseOut, 'fallback line')).toBe('fallback line')
  })

  it('prioritizes kid-age variants over activity / comfort', () => {
    const out: QuizOutput = {
      ...baseOut,
      groupType: 'family',
      hasKids: true,
      kidsAge: 'under_5',
      partySize: { adults: 2, kids: 1 },
      activityType: 'active',
      comfortLevel: 'comfort-first',
    }
    expect(generateIntro(out, 'fallback')).toMatch(/toddler|preschool/i)
  })

  it('uses the solo+active variant', () => {
    const out: QuizOutput = {
      ...baseOut,
      groupType: 'solo',
      partySize: { adults: 1, kids: 0 },
      activityType: 'active',
    }
    expect(generateIntro(out, 'fallback')).toMatch(/solo/i)
  })

  it('uses the couple+comfort-first variant', () => {
    const out: QuizOutput = { ...baseOut, comfortLevel: 'comfort-first' }
    expect(generateIntro(out, 'fallback')).toMatch(/two of you/i)
  })

  it('uses the minimal variant', () => {
    const out: QuizOutput = { ...baseOut, comfortLevel: 'minimal' }
    expect(generateIntro(out, 'fallback')).toMatch(/pack-light/i)
  })

  it('uses the relaxing variant', () => {
    const out: QuizOutput = { ...baseOut, activityType: 'relaxing' }
    expect(generateIntro(out, 'fallback')).toMatch(/slow-paced/i)
  })
})
