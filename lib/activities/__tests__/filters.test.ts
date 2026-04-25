import { describe, expect, it } from 'vitest'
import { ACTIVITIES } from '../data'
import { filterActivities, hasAnyFilter, parseActivityFilters } from '../filters'

describe('filterActivities', () => {
  it('returns all activities when no filters are set', () => {
    expect(filterActivities(ACTIVITIES, {})).toHaveLength(ACTIVITIES.length)
  })

  it('filters by category', () => {
    const result = filterActivities(ACTIVITIES, { category: 'night' })
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((a) => a.category === 'night')).toBe(true)
  })

  it('filters by energy level', () => {
    const result = filterActivities(ACTIVITIES, { energy: 'high' })
    expect(result.every((a) => a.energyLevel === 'high')).toBe(true)
  })

  it('age filter includes activities tagged all-ages', () => {
    const result = filterActivities(ACTIVITIES, { age: '6-8' })
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((a) => a.ageRange === '6-8' || a.ageRange === 'all-ages')).toBe(true)
    // Should include at least one all-ages activity
    expect(result.some((a) => a.ageRange === 'all-ages')).toBe(true)
  })

  it('combines multiple filters with AND semantics', () => {
    const result = filterActivities(ACTIVITIES, { energy: 'low', category: 'wind-down' })
    expect(result.every((a) => a.energyLevel === 'low' && a.category === 'wind-down')).toBe(true)
  })

  it('returns empty when no activity matches', () => {
    const result = filterActivities(ACTIVITIES, {
      category: 'icebreaker',
      energy: 'high',
    })
    expect(result).toHaveLength(0)
  })
})

describe('parseActivityFilters', () => {
  it('keeps valid values', () => {
    const filters = parseActivityFilters({ age: '6-8', energy: 'high', category: 'night' })
    expect(filters).toEqual({ age: '6-8', energy: 'high', category: 'night' })
  })

  it('drops unknown values silently', () => {
    const filters = parseActivityFilters({ age: 'banana', energy: 'extreme', category: 'night' })
    expect(filters).toEqual({ category: 'night' })
  })

  it('returns empty for empty input', () => {
    expect(parseActivityFilters({})).toEqual({})
  })
})

describe('hasAnyFilter', () => {
  it('returns false for empty filters', () => {
    expect(hasAnyFilter({})).toBe(false)
  })

  it('returns true when any filter is set', () => {
    expect(hasAnyFilter({ age: '6-8' })).toBe(true)
    expect(hasAnyFilter({ category: 'night' })).toBe(true)
  })
})
