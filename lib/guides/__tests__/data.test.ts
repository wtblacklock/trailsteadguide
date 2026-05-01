import { describe, expect, it } from 'vitest'
import { GUIDES } from '../data'
import { GUIDE_CATEGORIES } from '../categories'

describe('GUIDES dataset', () => {
  it('uses only valid category ids', () => {
    const validIds = new Set(GUIDE_CATEGORIES.map((c) => c.id))
    for (const guide of GUIDES) {
      expect(
        validIds.has(guide.category),
        `${guide.slug} has invalid category ${guide.category}`,
      ).toBe(true)
    }
  })

  it('uses unique slugs', () => {
    const seen = new Set<string>()
    for (const guide of GUIDES) {
      expect(seen.has(guide.slug), `duplicate guide slug ${guide.slug}`).toBe(false)
      seen.add(guide.slug)
    }
  })

  it('has non-empty title and description for every guide', () => {
    for (const guide of GUIDES) {
      expect(guide.title.length, `${guide.slug} title`).toBeGreaterThan(0)
      expect(guide.description.length, `${guide.slug} description`).toBeGreaterThan(0)
    }
  })

  it('every non-placeholder category has at least one guide', () => {
    for (const cat of GUIDE_CATEGORIES) {
      if (cat.placeholder) continue
      const matches = GUIDES.filter((g) => g.category === cat.id)
      expect(
        matches.length,
        `non-placeholder category ${cat.id} should have at least 1 guide`,
      ).toBeGreaterThan(0)
    }
  })

  it('placeholder categories have no guides', () => {
    for (const cat of GUIDE_CATEGORIES) {
      if (!cat.placeholder) continue
      const matches = GUIDES.filter((g) => g.category === cat.id)
      expect(
        matches.length,
        `placeholder category ${cat.id} should have no guides`,
      ).toBe(0)
    }
  })

  it('uses unique category slugs that do not collide with guide slugs', () => {
    const guideSlugs = new Set(GUIDES.map((g) => g.slug))
    const categorySlugs = new Set<string>()
    for (const cat of GUIDE_CATEGORIES) {
      expect(categorySlugs.has(cat.slug), `duplicate category slug ${cat.slug}`).toBe(false)
      categorySlugs.add(cat.slug)
      expect(
        guideSlugs.has(cat.slug),
        `category slug ${cat.slug} collides with guide slug`,
      ).toBe(false)
    }
  })
})
