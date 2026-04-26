import { describe, expect, it } from 'vitest'
import { getCategoryBySlug, getCategoryById } from '../categories'
import {
  getGuideBySlug,
  getGuidesByCategoryId,
  getPopulatedCategories,
  getCategoryForGuide,
} from '../helpers'

describe('getCategoryBySlug', () => {
  it('returns a category for a known slug', () => {
    const cat = getCategoryBySlug('camping-basics')
    expect(cat).not.toBeNull()
    expect(cat?.id).toBe('basics')
  })

  it('returns null for an unknown slug', () => {
    expect(getCategoryBySlug('not-a-real-category')).toBeNull()
  })
})

describe('getCategoryById', () => {
  it('returns the matching category for every defined id', () => {
    expect(getCategoryById('basics').slug).toBe('camping-basics')
    expect(getCategoryById('scenario').slug).toBe('scenario-based')
    expect(getCategoryById('seasonal').slug).toBe('seasonal')
    expect(getCategoryById('location').slug).toBe('location')
  })
})

describe('getGuideBySlug', () => {
  it('returns a guide for a known slug', () => {
    const guide = getGuideBySlug('camping-for-beginners')
    expect(guide).not.toBeNull()
    expect(guide?.title).toBe('Camping for Beginners')
  })

  it('returns null for an unknown slug', () => {
    expect(getGuideBySlug('not-a-real-guide')).toBeNull()
  })
})

describe('getGuidesByCategoryId', () => {
  it('returns the right guides for a populated category', () => {
    const guides = getGuidesByCategoryId('basics')
    expect(guides.length).toBeGreaterThan(0)
    expect(guides.every((g) => g.category === 'basics')).toBe(true)
  })

  it('returns an empty array for a placeholder category', () => {
    expect(getGuidesByCategoryId('location')).toEqual([])
  })
})

describe('getPopulatedCategories', () => {
  it('returns only categories that have guides', () => {
    const populated = getPopulatedCategories()
    expect(populated.length).toBeGreaterThan(0)
    for (const cat of populated) {
      expect(getGuidesByCategoryId(cat.id).length).toBeGreaterThan(0)
    }
  })

  it('excludes placeholder categories', () => {
    const populated = getPopulatedCategories()
    const ids = populated.map((c) => c.id)
    expect(ids).not.toContain('location')
  })
})

describe('getCategoryForGuide', () => {
  it('returns the category of a known guide', () => {
    const cat = getCategoryForGuide('camping-with-kids-first-time')
    expect(cat).not.toBeNull()
    expect(cat?.id).toBe('scenario')
  })

  it('returns null for an unknown guide', () => {
    expect(getCategoryForGuide('not-a-real-guide')).toBeNull()
  })
})
