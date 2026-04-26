import { describe, it, expect } from 'vitest'
import { applyModifiers } from '../apply-modifiers'
import { buildModifiers } from '../modifiers'
import type { ModifierRules, QuizOutput } from '../types'
import type { PlanTemplate } from '@/types'

const stubPlan: PlanTemplate = {
  slug: 'first-night-camp',
  title: 'Stub',
  tagline: 'stub',
  heroImage: '',
  tripSummary: '',
  preTrip: [{ time: 'now', title: 'Do thing', description: 'desc' }],
  arrival: [],
  evening: [],
  morning: [],
  gear: [
    { name: 'Tent', essential: true },
    { name: 'Sleeping bag', essential: true },
    { name: 'Camp chair', essential: false },
  ],
  activities: [],
  safetyNotes: ['Bring water'],
  meals: [],
  recommendedActivities: [],
  recommendedSkills: [],
  activitySchedule: { day1: [] },
}

const baseOut: QuizOutput = {
  planSlug: 'first-night-camp',
  partySize: { adults: 2, kids: 2 },
  groupType: 'family',
  peopleBucket: '3-4',
  hasKids: true,
  kidsAge: 'under_5',
  activityType: 'balanced',
  comfortLevel: 'balanced',
}

describe('applyModifiers', () => {
  it('returns the base plan unchanged when no rules fire', () => {
    const merged = applyModifiers(stubPlan, buildModifiers(baseOut), {})
    expect(merged.gear).toEqual(stubPlan.gear)
    expect(merged.safetyNotes).toEqual(stubPlan.safetyNotes)
    expect(merged.appliedModifiers).toEqual([])
  })

  it('appends addPacking items as non-essential gear', () => {
    const rules: ModifierRules = {
      kidsUnder5: { addPacking: ['Pack-n-Play', 'Toddler snacks'] },
    }
    const merged = applyModifiers(stubPlan, buildModifiers(baseOut), rules)
    expect(merged.gear.map((g) => g.name)).toContain('Pack-n-Play')
    expect(merged.gear.map((g) => g.name)).toContain('Toddler snacks')
    const added = merged.gear.find((g) => g.name === 'Pack-n-Play')
    expect(added?.essential).toBe(false)
    expect(merged.appliedModifiers).toContain('kidsUnder5')
  })

  it('removes packing items by substring match (case-insensitive)', () => {
    const rules: ModifierRules = {
      isMinimal: { removePacking: ['camp chair'] },
    }
    const out: QuizOutput = { ...baseOut, comfortLevel: 'minimal' }
    const merged = applyModifiers(stubPlan, buildModifiers(out), rules)
    expect(merged.gear.map((g) => g.name)).not.toContain('Camp chair')
    expect(merged.gear.map((g) => g.name)).toContain('Tent')
  })

  it('appends timeline items to the named block', () => {
    const rules: ModifierRules = {
      isActiveTrip: {
        addTimeline: {
          block: 'arrival',
          items: [{ time: 'noon', title: 'Trail recon', description: 'walk it once' }],
        },
      },
    }
    const out: QuizOutput = { ...baseOut, activityType: 'active' }
    const merged = applyModifiers(stubPlan, buildModifiers(out), rules)
    expect(merged.arrival).toHaveLength(1)
    expect(merged.arrival[0].title).toBe('Trail recon')
    expect(merged.preTrip).toHaveLength(1) // unchanged
  })

  it('appends safety notes', () => {
    const rules: ModifierRules = {
      kidsUnder5: { addNotes: ['Bring extra wipes'] },
    }
    const merged = applyModifiers(stubPlan, buildModifiers(baseOut), rules)
    expect(merged.safetyNotes).toEqual(['Bring water', 'Bring extra wipes'])
  })

  it('does not mutate the input plan', () => {
    const rules: ModifierRules = {
      kidsUnder5: { addPacking: ['X'], addNotes: ['Y'] },
    }
    applyModifiers(stubPlan, buildModifiers(baseOut), rules)
    expect(stubPlan.gear).toHaveLength(3)
    expect(stubPlan.safetyNotes).toEqual(['Bring water'])
  })

  it('applies modifiers in deterministic order regardless of rules object key order', () => {
    const rulesA: ModifierRules = {
      kidsUnder5: { addPacking: ['A'] },
      isComfortFocused: { addPacking: ['B'] },
    }
    const rulesB: ModifierRules = {
      isComfortFocused: { addPacking: ['B'] },
      kidsUnder5: { addPacking: ['A'] },
    }
    const out: QuizOutput = { ...baseOut, comfortLevel: 'comfort-first' }
    const ma = applyModifiers(stubPlan, buildModifiers(out), rulesA)
    const mb = applyModifiers(stubPlan, buildModifiers(out), rulesB)
    expect(ma.gear.map((g) => g.name)).toEqual(mb.gear.map((g) => g.name))
    expect(ma.appliedModifiers).toEqual(mb.appliedModifiers)
  })
})
