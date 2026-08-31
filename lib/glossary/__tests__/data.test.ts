import { describe, it, expect } from 'vitest'
import { TERMS, slugify } from '../data'

describe('glossary data', () => {
  it('has at least 50 terms, each with a non-empty term and definition', () => {
    expect(TERMS.length).toBeGreaterThanOrEqual(50)
    for (const t of TERMS) {
      expect(t.term.length).toBeGreaterThan(0)
      expect(t.definition.length).toBeGreaterThan(0)
    }
  })

  it('produces unique slugs for every term', () => {
    const slugs = TERMS.map((t) => slugify(t.term))
    expect(new Set(slugs).size).toBe(TERMS.length)
  })

  it('slugify lowercases and hyphenates', () => {
    expect(slugify('Baseplate Compass')).toBe('baseplate-compass')
  })
})
