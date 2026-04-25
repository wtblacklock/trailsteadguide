import { describe, expect, it } from 'vitest'
import { getCategoryBySlug } from '../categories'
import { getSkillBySlugs, getSkillsByCategoryId, getPopulatedCategories } from '../helpers'

describe('getCategoryBySlug', () => {
  it('returns a category for a known slug', () => {
    const cat = getCategoryBySlug('knots')
    expect(cat).not.toBeNull()
    expect(cat?.id).toBe('knots')
  })

  it('returns null for an unknown slug', () => {
    expect(getCategoryBySlug('not-a-real-category')).toBeNull()
  })
})

describe('getSkillBySlugs', () => {
  it('returns a skill for a known category + skill slug pair', () => {
    const skill = getSkillBySlugs('knots', 'square-knot')
    expect(skill).not.toBeNull()
    expect(skill?.title).toBe('Square Knot')
  })

  it('returns null for an unknown skill slug in a known category', () => {
    expect(getSkillBySlugs('knots', 'mystery-knot')).toBeNull()
  })

  it('returns null for an unknown category', () => {
    expect(getSkillBySlugs('astrology', 'square-knot')).toBeNull()
  })
})

describe('getSkillsByCategoryId', () => {
  it('returns the right skills for a category', () => {
    const skills = getSkillsByCategoryId('knots')
    expect(skills.length).toBeGreaterThan(0)
    expect(skills.every((s) => s.category === 'knots')).toBe(true)
  })
})

describe('getPopulatedCategories', () => {
  it('returns only categories that have skills', () => {
    const populated = getPopulatedCategories()
    expect(populated.length).toBeGreaterThan(0)
    for (const cat of populated) {
      expect(getSkillsByCategoryId(cat.id).length).toBeGreaterThan(0)
    }
  })
})
