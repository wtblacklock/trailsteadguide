import { describe, expect, it } from 'vitest'
import { SKILLS } from '../data'
import { filterSkills, hasAnySkillFilter, parseSkillFilters } from '../filters'

describe('filterSkills', () => {
  it('returns all skills when no filters are set', () => {
    expect(filterSkills(SKILLS, {})).toHaveLength(SKILLS.length)
  })

  it('filters by category', () => {
    const result = filterSkills(SKILLS, { category: 'knots' })
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((s) => s.category === 'knots')).toBe(true)
  })

  it('filters by difficulty', () => {
    const result = filterSkills(SKILLS, { difficulty: 'Beginner' })
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((s) => s.difficulty === 'Beginner')).toBe(true)
  })

  it('safety=critical only returns critical-safety skills', () => {
    const result = filterSkills(SKILLS, { safety: 'critical' })
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((s) => s.safetyTone === 'critical')).toBe(true)
  })

  it('safety=standard treats missing safetyTone as standard', () => {
    const result = filterSkills(SKILLS, { safety: 'standard' })
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((s) => (s.safetyTone ?? 'standard') === 'standard')).toBe(true)
    // Should include at least one skill with no explicit safetyTone
    expect(result.some((s) => s.safetyTone === undefined)).toBe(true)
  })

  it('combines multiple filters with AND semantics', () => {
    const result = filterSkills(SKILLS, { category: 'fire', safety: 'critical' })
    expect(result.every((s) => s.category === 'fire' && s.safetyTone === 'critical')).toBe(true)
  })

  it('returns empty when no skill matches', () => {
    const result = filterSkills(SKILLS, { category: 'stargazing', safety: 'critical' })
    expect(result).toHaveLength(0)
  })
})

describe('parseSkillFilters', () => {
  it('keeps valid values', () => {
    const filters = parseSkillFilters({
      category: 'knots',
      difficulty: 'Beginner',
      safety: 'critical',
    })
    expect(filters).toEqual({
      category: 'knots',
      difficulty: 'Beginner',
      safety: 'critical',
    })
  })

  it('drops unknown values silently', () => {
    const filters = parseSkillFilters({
      category: 'banana',
      difficulty: 'Expert',
      safety: 'spicy',
    })
    expect(filters).toEqual({})
  })

  it('returns empty for empty input', () => {
    expect(parseSkillFilters({})).toEqual({})
  })
})

describe('hasAnySkillFilter', () => {
  it('returns false for empty filters', () => {
    expect(hasAnySkillFilter({})).toBe(false)
  })

  it('returns true when any filter is set', () => {
    expect(hasAnySkillFilter({ category: 'knots' })).toBe(true)
    expect(hasAnySkillFilter({ difficulty: 'Beginner' })).toBe(true)
    expect(hasAnySkillFilter({ safety: 'critical' })).toBe(true)
  })
})
