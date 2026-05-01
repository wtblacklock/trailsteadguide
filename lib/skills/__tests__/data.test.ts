import { describe, expect, it } from 'vitest'
import { SKILLS } from '../data'
import { SKILL_CATEGORIES } from '../categories'

describe('SKILLS dataset', () => {
  it('has at least one skill per category', () => {
    for (const category of SKILL_CATEGORIES) {
      const matches = SKILLS.filter((s) => s.category === category.id)
      expect(matches.length, `category ${category.id} should have at least 1 skill`).toBeGreaterThan(0)
    }
  })

  it('uses only valid category ids', () => {
    const validIds = new Set(SKILL_CATEGORIES.map((c) => c.id))
    for (const skill of SKILLS) {
      expect(validIds.has(skill.category), `${skill.slug} has invalid category ${skill.category}`).toBe(true)
    }
  })

  it('uses unique slugs within each category', () => {
    const seen = new Set<string>()
    for (const skill of SKILLS) {
      const key = `${skill.category}/${skill.slug}`
      expect(seen.has(key), `duplicate skill slug ${key}`).toBe(false)
      seen.add(key)
    }
  })

  it('has non-empty title, tagline, and at least one step for every skill', () => {
    for (const skill of SKILLS) {
      expect(skill.title.length, `${skill.slug} title`).toBeGreaterThan(0)
      expect(skill.tagline.length, `${skill.slug} tagline`).toBeGreaterThan(0)
      expect(skill.steps.length, `${skill.slug} steps`).toBeGreaterThan(0)
    }
  })

  it('uses only Beginner or Intermediate difficulty', () => {
    for (const skill of SKILLS) {
      expect(['Beginner', 'Intermediate']).toContain(skill.difficulty)
    }
  })

  it('depth check — knife-skills, woodcarving, knots, fire each have 4+ skills', () => {
    const counts = SKILLS.reduce<Record<string, number>>((acc, s) => {
      acc[s.category] = (acc[s.category] ?? 0) + 1
      return acc
    }, {})
    expect(counts['knife-skills']).toBeGreaterThanOrEqual(4)
    expect(counts['woodcarving']).toBeGreaterThanOrEqual(4)
    expect(counts['knots']).toBeGreaterThanOrEqual(4)
    expect(counts['fire']).toBeGreaterThanOrEqual(4)
  })

  it('every knife-skills and woodcarving skill has safety notes', () => {
    const sharp = SKILLS.filter((s) => s.category === 'knife-skills' || s.category === 'woodcarving')
    for (const skill of sharp) {
      expect(skill.safetyNotes && skill.safetyNotes.length > 0, `${skill.slug} should have safetyNotes`).toBe(true)
    }
  })
})
