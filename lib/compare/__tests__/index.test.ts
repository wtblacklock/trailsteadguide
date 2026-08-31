import { describe, it, expect } from 'vitest'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { COMPARE_PAGES } from '../index'

describe('COMPARE_PAGES', () => {
  it('has an entry for every app/compare/<slug>/page.tsx directory', () => {
    for (const entry of COMPARE_PAGES) {
      const pagePath = join(process.cwd(), 'app', 'compare', entry.slug, 'page.tsx')
      expect(existsSync(pagePath), `missing page.tsx for slug "${entry.slug}"`).toBe(true)
    }
  })

  it('every entry has a non-empty title and excerpt', () => {
    for (const entry of COMPARE_PAGES) {
      expect(entry.title.length).toBeGreaterThan(0)
      expect(entry.excerpt.length).toBeGreaterThan(0)
    }
  })

  it('has no duplicate slugs', () => {
    const slugs = COMPARE_PAGES.map((e) => e.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})
