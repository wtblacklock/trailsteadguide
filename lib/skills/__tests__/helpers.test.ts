import { describe, expect, it } from 'vitest'
import { getCategoryBySlug } from '../categories'
import { getSkillBySlugs, getSkillsByCategoryId, getPopulatedCategories, getSkillByRef } from '../helpers'

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

describe('getSkillByRef', () => {
  it('returns skill + category for a valid category/skill slug', () => {
    const result = getSkillByRef('knots/taut-line-hitch')
    expect(result).not.toBeNull()
    expect(result!.skill.slug).toBe('taut-line-hitch')
    expect(result!.skill.category).toBe('knots')
    expect(result!.category.slug).toBe('knots')
    expect(result!.category.id).toBe('knots')
  })

  it('returns null for an unknown category', () => {
    expect(getSkillByRef('made-up/whatever')).toBeNull()
  })

  it('returns null for an unknown skill in a real category', () => {
    expect(getSkillByRef('knots/no-such-knot')).toBeNull()
  })

  it('returns null for a malformed slug (no slash)', () => {
    expect(getSkillByRef('taut-line-hitch')).toBeNull()
  })

  it('returns null for an empty string', () => {
    expect(getSkillByRef('')).toBeNull()
  })
})
