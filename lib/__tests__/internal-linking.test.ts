// @vitest-environment node
/**
 * Guards the crawl graph fixes from the 2026-10-30 SEO audit: every skill and
 * activity page must be linked from at least one sibling page (the hub grids
 * are client-filtered, so sibling links are the reliable crawl path), and
 * robots.txt must not block /_next/, which serves the JS, CSS and images
 * Googlebot needs to render pages.
 */

import { describe, expect, it } from 'vitest'
import robots from '@/app/robots'
import sitemap from '@/app/sitemap'
import { ACTIVITIES, getRelatedActivities } from '@/lib/activities/data'
import { SKILLS, getRelatedSkillRefs } from '@/lib/skills/helpers'
import { getCategoryById } from '@/lib/skills/categories'
import { GUIDE_DATES } from '@/lib/guides/guide-dates.generated'
import { GUIDES } from '@/lib/guides/data'

describe('related activities', () => {
  it('links every activity from at least one other activity page', () => {
    const linked = new Set(ACTIVITIES.flatMap((a) => getRelatedActivities(a).map((r) => r.slug)))
    for (const a of ACTIVITIES) expect(linked.has(a.slug), `${a.slug} has no inbound sibling link`).toBe(true)
  })

  it('never recommends the current activity and returns three picks', () => {
    for (const a of ACTIVITIES) {
      const related = getRelatedActivities(a)
      expect(related).toHaveLength(3)
      expect(related.map((r) => r.slug)).not.toContain(a.slug)
    }
  })
})

describe('related skills', () => {
  it('links every skill from at least one other skill page', () => {
    const linked = new Set(SKILLS.flatMap((s) => getRelatedSkillRefs(s)))
    for (const s of SKILLS) {
      const ref = `${getCategoryById(s.category).slug}/${s.slug}`
      expect(linked.has(ref), `${ref} has no inbound sibling link`).toBe(true)
    }
  })

  it('keeps curated relatedSkills first and never links to itself', () => {
    for (const s of SKILLS) {
      const refs = getRelatedSkillRefs(s)
      const self = `${getCategoryById(s.category).slug}/${s.slug}`
      expect(refs).not.toContain(self)
      if (s.relatedSkills?.[0]) expect(refs[0]).toBe(s.relatedSkills[0])
    }
  })
})

describe('robots', () => {
  it('does not block /_next/ for any crawler', () => {
    const rules = robots().rules
    for (const rule of Array.isArray(rules) ? rules : [rules]) {
      const disallow = [rule.disallow ?? []].flat()
      expect(disallow).not.toContain('/_next/')
    }
  })
})

describe('sitemap guide lastmod', () => {
  it('uses the git-derived GUIDE_DATES dateModified for every guide', () => {
    const byPath = new Map(sitemap().map((e) => [new URL(e.url).pathname, e.lastModified]))
    for (const g of GUIDES) {
      const dates = GUIDE_DATES[g.slug]
      if (!dates) continue
      expect(byPath.get(`/guides/${g.slug}`), g.slug).toBe(dates.dateModified)
    }
  })
})
