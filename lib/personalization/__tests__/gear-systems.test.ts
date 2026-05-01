import { describe, it, expect } from 'vitest'
import { buildGearSystems, buildChipSummary } from '../gear-systems'
import { buildModifiers } from '../modifiers'
import type { QuizOutput } from '../types'

const familyOut: QuizOutput = {
  planSlug: 'first-night-camp',
  partySize: { adults: 2, kids: 2 },
  groupType: 'family',
  peopleBucket: '3-4',
  hasKids: true,
  kidsAge: '5_10',
  activityType: 'balanced',
  comfortLevel: 'balanced',
}

describe('buildGearSystems — sleep system', () => {
  it.each([
    [{ ...familyOut, hasKids: false, groupType: 'couple', kidsAge: undefined }, 'single'],
    [{ ...familyOut, kidsAge: 'under_5' }, 'shared'],
    [{ ...familyOut, kidsAge: '5_10' }, 'flex'],
    [{ ...familyOut, kidsAge: '10+' }, 'split'],
  ] as const)('selects correct sleep system', (out, expected) => {
    const m = buildModifiers(out as QuizOutput)
    expect(buildGearSystems(out as QuizOutput, m).sleep).toBe(expected)
  })
})

describe('buildGearSystems — cooking + comfort tiers', () => {
  it('uses minimal/low when comfortLevel=minimal', () => {
    const out: QuizOutput = { ...familyOut, comfortLevel: 'minimal' }
    const sys = buildGearSystems(out, buildModifiers(out))
    expect(sys.cooking).toBe('minimal')
    expect(sys.comfort).toBe('low')
  })

  it('uses comfort/high when comfortLevel=comfort-first', () => {
    const out: QuizOutput = { ...familyOut, comfortLevel: 'comfort-first' }
    const sys = buildGearSystems(out, buildModifiers(out))
    expect(sys.cooking).toBe('comfort')
    expect(sys.comfort).toBe('high')
  })

  it('uses standard/medium for balanced', () => {
    const sys = buildGearSystems(familyOut, buildModifiers(familyOut))
    expect(sys.cooking).toBe('standard')
    expect(sys.comfort).toBe('medium')
  })
})

describe('buildGearSystems — lighting', () => {
  it('multi_zone only when sleep=split (10+ kids)', () => {
    const split: QuizOutput = { ...familyOut, kidsAge: '10+' }
    expect(buildGearSystems(split, buildModifiers(split)).lighting).toBe('multi_zone')
    expect(buildGearSystems(familyOut, buildModifiers(familyOut)).lighting).toBe('single_zone')
  })
})

describe('buildChipSummary', () => {
  it('builds a family with young kids · relaxed · comfort-focused chip', () => {
    const out: QuizOutput = {
      ...familyOut,
      kidsAge: 'under_5',
      activityType: 'relaxing',
      comfortLevel: 'comfort-first',
    }
    const sys = buildGearSystems(out, buildModifiers(out))
    expect(buildChipSummary(out, sys)).toEqual([
      'Family with young kids',
      'Relaxed trip',
      'Comfort-focused',
    ])
  })

  it('appends "Split tents" when sleep system is split', () => {
    const out: QuizOutput = { ...familyOut, kidsAge: '10+' }
    const sys = buildGearSystems(out, buildModifiers(out))
    expect(buildChipSummary(out, sys)).toContain('Split tents')
  })

  it('handles couple correctly', () => {
    const out: QuizOutput = {
      ...familyOut,
      groupType: 'couple',
      hasKids: false,
      kidsAge: undefined,
      activityType: 'active',
    }
    const sys = buildGearSystems(out, buildModifiers(out))
    expect(buildChipSummary(out, sys)[0]).toBe('Couple')
    expect(buildChipSummary(out, sys)).toContain('Active trip')
  })
})
