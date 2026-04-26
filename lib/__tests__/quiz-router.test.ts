import { describe, it, expect } from 'vitest'
import { computePlanSlug } from '../quiz-router'
import type { QuizAnswers } from '@/types'

describe('computePlanSlug', () => {
  it('returns easy-family-basecamp for comfort-first regardless of experience', () => {
    const answers: QuizAnswers = {
      experience: 'none',
      kidsAgeGroup: ['under_5'],
      intent: 'real-trip',
      activityType: 'balanced',
      comfortLevel: 'comfort-first',
      partySize: { adults: 2, kids: 2 },
    }
    expect(computePlanSlug(answers)).toBe('easy-family-basecamp')
  })

  it('returns easy-family-basecamp for comfort-first even with confident experience', () => {
    const answers: QuizAnswers = {
      experience: 'confident',
      kidsAgeGroup: ['none'],
      intent: 'multi-night',
      activityType: 'active',
      comfortLevel: 'comfort-first',
      partySize: { adults: 2, kids: 2 },
    }
    expect(computePlanSlug(answers)).toBe('easy-family-basecamp')
  })

  it('returns backyard-test for no experience + test intent', () => {
    const answers: QuizAnswers = {
      experience: 'none',
      kidsAgeGroup: ['5_10'],
      intent: 'test',
      activityType: 'balanced',
      comfortLevel: 'minimal',
      partySize: { adults: 2, kids: 2 },
    }
    expect(computePlanSlug(answers)).toBe('backyard-test')
  })

  it('returns first-weekend-camp for some experience + multi-night', () => {
    const answers: QuizAnswers = {
      experience: 'some',
      kidsAgeGroup: ['5_10'],
      intent: 'multi-night',
      activityType: 'active',
      comfortLevel: 'balanced',
      partySize: { adults: 2, kids: 2 },
    }
    expect(computePlanSlug(answers)).toBe('first-weekend-camp')
  })

  it('returns first-weekend-camp for confident + multi-night', () => {
    const answers: QuizAnswers = {
      experience: 'confident',
      kidsAgeGroup: ['10+'],
      intent: 'multi-night',
      activityType: 'active',
      comfortLevel: 'minimal',
      partySize: { adults: 2, kids: 2 },
    }
    expect(computePlanSlug(answers)).toBe('first-weekend-camp')
  })

  it('returns first-night-camp as default for no-experience + real-trip', () => {
    const answers: QuizAnswers = {
      experience: 'none',
      kidsAgeGroup: ['under_5'],
      intent: 'real-trip',
      activityType: 'relaxing',
      comfortLevel: 'balanced',
      partySize: { adults: 2, kids: 2 },
    }
    expect(computePlanSlug(answers)).toBe('first-night-camp')
  })

  it('returns first-night-camp for some experience + real-trip', () => {
    const answers: QuizAnswers = {
      experience: 'some',
      kidsAgeGroup: ['10+'],
      intent: 'real-trip',
      activityType: 'balanced',
      comfortLevel: 'balanced',
      partySize: { adults: 2, kids: 2 },
    }
    expect(computePlanSlug(answers)).toBe('first-night-camp')
  })
})
