import { describe, it, expect } from 'vitest'
import { computePlanSlug } from '../quiz-router'
import type { QuizAnswers } from '@/types'

describe('computePlanSlug', () => {
  it('returns easy-family-basecamp for high comfort priority regardless of experience', () => {
    const answers: QuizAnswers = {
      experience: 'none',
      kidsAgeGroup: '3-6',
      intent: 'real-trip',
      anxiety: 'high',
      comfortPriority: 'high',
    }
    expect(computePlanSlug(answers)).toBe('easy-family-basecamp')
  })

  it('returns easy-family-basecamp for high comfort even with confident experience', () => {
    const answers: QuizAnswers = {
      experience: 'confident',
      kidsAgeGroup: 'none',
      intent: 'multi-night',
      anxiety: 'low',
      comfortPriority: 'high',
    }
    expect(computePlanSlug(answers)).toBe('easy-family-basecamp')
  })

  it('returns backyard-test for no experience + test intent', () => {
    const answers: QuizAnswers = {
      experience: 'none',
      kidsAgeGroup: '7-12',
      intent: 'test',
      anxiety: 'high',
      comfortPriority: 'low',
    }
    expect(computePlanSlug(answers)).toBe('backyard-test')
  })

  it('returns first-weekend-camp for some experience + multi-night', () => {
    const answers: QuizAnswers = {
      experience: 'some',
      kidsAgeGroup: '7-12',
      intent: 'multi-night',
      anxiety: 'medium',
      comfortPriority: 'low',
    }
    expect(computePlanSlug(answers)).toBe('first-weekend-camp')
  })

  it('returns first-weekend-camp for confident + multi-night', () => {
    const answers: QuizAnswers = {
      experience: 'confident',
      kidsAgeGroup: 'teens',
      intent: 'multi-night',
      anxiety: 'low',
      comfortPriority: 'low',
    }
    expect(computePlanSlug(answers)).toBe('first-weekend-camp')
  })

  it('returns first-night-camp as default for no-experience + real-trip', () => {
    const answers: QuizAnswers = {
      experience: 'none',
      kidsAgeGroup: '3-6',
      intent: 'real-trip',
      anxiety: 'high',
      comfortPriority: 'low',
    }
    expect(computePlanSlug(answers)).toBe('first-night-camp')
  })

  it('returns first-night-camp for some experience + real-trip', () => {
    const answers: QuizAnswers = {
      experience: 'some',
      kidsAgeGroup: 'teens',
      intent: 'real-trip',
      anxiety: 'medium',
      comfortPriority: 'low',
    }
    expect(computePlanSlug(answers)).toBe('first-night-camp')
  })
})
