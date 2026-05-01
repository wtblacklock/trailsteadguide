import { describe, it, expect } from 'vitest'
import { PLAN_TEMPLATES } from '@/lib/plan-templates'
import { applyModifiers } from '../apply-modifiers'
import { buildModifiers } from '../modifiers'
import { PLAN_MODIFIER_RULES } from '../plan-modifiers'
import type { QuizOutput } from '../types'

const baseFamily: QuizOutput = {
  planSlug: 'first-night-camp',
  partySize: { adults: 2, kids: 2 },
  groupType: 'family',
  peopleBucket: '3-4',
  hasKids: true,
  kidsAge: 'under_5',
  activityType: 'balanced',
  comfortLevel: 'balanced',
}

describe('PLAN_MODIFIER_RULES coverage', () => {
  it('has rules for every plan slug', () => {
    for (const slug of Object.keys(PLAN_TEMPLATES)) {
      expect(PLAN_MODIFIER_RULES).toHaveProperty(slug)
    }
  })

  it('every plan has at least 5 modifier rules', () => {
    for (const [slug, rules] of Object.entries(PLAN_MODIFIER_RULES)) {
      const count = Object.keys(rules).length
      expect(count, `${slug} should have ≥5 modifier rules`).toBeGreaterThanOrEqual(5)
    }
  })
})

describe('first-night-camp modifiers', () => {
  it('kidsUnder5 adds toddler items + an evening row', () => {
    const out: QuizOutput = { ...baseFamily, kidsAge: 'under_5' }
    const merged = applyModifiers(
      PLAN_TEMPLATES['first-night-camp'],
      buildModifiers(out),
      PLAN_MODIFIER_RULES['first-night-camp'],
    )
    const gearNames = merged.gear.map((g) => g.name)
    expect(gearNames.some((n) => n.toLowerCase().includes('pack-n-play'))).toBe(true)
    expect(merged.evening.some((e) => e.title.toLowerCase().includes('toddler'))).toBe(true)
    expect(merged.appliedModifiers).toContain('kidsUnder5')
  })

  it('isActiveTrip adds a morning hike row + day pack', () => {
    const out: QuizOutput = { ...baseFamily, activityType: 'active' }
    const merged = applyModifiers(
      PLAN_TEMPLATES['first-night-camp'],
      buildModifiers(out),
      PLAN_MODIFIER_RULES['first-night-camp'],
    )
    expect(merged.morning.some((m) => m.title.toLowerCase().includes('hike'))).toBe(true)
    expect(merged.gear.some((g) => g.name.toLowerCase().includes('day pack'))).toBe(true)
  })

  it('isMinimal removes camp chairs', () => {
    const baseChairs = PLAN_TEMPLATES['first-night-camp'].gear.filter((g) =>
      g.name.toLowerCase().includes('camp chairs'),
    ).length
    expect(baseChairs).toBeGreaterThan(0)
    const out: QuizOutput = { ...baseFamily, comfortLevel: 'minimal' }
    const merged = applyModifiers(
      PLAN_TEMPLATES['first-night-camp'],
      buildModifiers(out),
      PLAN_MODIFIER_RULES['first-night-camp'],
    )
    expect(merged.gear.some((g) => g.name.toLowerCase().includes('camp chairs'))).toBe(false)
  })
})

describe('first-weekend-camp modifiers', () => {
  it('isLargeGroup adds note + extra packing', () => {
    const out: QuizOutput = {
      ...baseFamily,
      planSlug: 'first-weekend-camp',
      peopleBucket: '5+',
      partySize: { adults: 2, kids: 4 },
      kidsAge: '5_10',
    }
    const merged = applyModifiers(
      PLAN_TEMPLATES['first-weekend-camp'],
      buildModifiers(out),
      PLAN_MODIFIER_RULES['first-weekend-camp'],
    )
    expect(merged.appliedModifiers).toContain('isLargeGroup')
    expect(merged.safetyNotes.some((n) => /5\+/.test(n))).toBe(true)
  })

  it('isRelaxedTrip adds a "do nothing" framing note', () => {
    const out: QuizOutput = {
      ...baseFamily,
      planSlug: 'first-weekend-camp',
      activityType: 'relaxing',
    }
    const merged = applyModifiers(
      PLAN_TEMPLATES['first-weekend-camp'],
      buildModifiers(out),
      PLAN_MODIFIER_RULES['first-weekend-camp'],
    )
    expect(merged.appliedModifiers).toContain('isRelaxedTrip')
  })
})

describe('idempotency + isolation', () => {
  it('applyModifiers does not mutate PLAN_TEMPLATES', () => {
    const before = JSON.stringify(PLAN_TEMPLATES['first-night-camp'])
    const out: QuizOutput = { ...baseFamily, kidsAge: 'under_5', activityType: 'active' }
    applyModifiers(
      PLAN_TEMPLATES['first-night-camp'],
      buildModifiers(out),
      PLAN_MODIFIER_RULES['first-night-camp'],
    )
    expect(JSON.stringify(PLAN_TEMPLATES['first-night-camp'])).toBe(before)
  })
})
