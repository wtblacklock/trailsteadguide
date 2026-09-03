import { describe, expect, it } from 'vitest'
import { PRINTABLES } from '@/lib/printables'
import { GUIDES } from '@/lib/guides'
import {
  GUIDE_PRINTABLES,
  getPrintablesForGuide,
  getGuidesLinkedToPrintable,
  allGuidePrintableSlugs,
} from '../guide-printables'

describe('GUIDE_PRINTABLES', () => {
  const guideSlugs = new Set(GUIDES.map((g) => g.slug))
  const printableSlugs = new Set(PRINTABLES.map((p) => p.slug))

  it('every key is a real guide slug', () => {
    for (const slug of Object.keys(GUIDE_PRINTABLES)) {
      expect(guideSlugs.has(slug), `"${slug}" is not a real guide slug`).toBe(true)
    }
  })

  it.each(Object.keys(GUIDE_PRINTABLES))('%s lists 1-3 printables, all valid slugs', (guideSlug) => {
    const slugs = GUIDE_PRINTABLES[guideSlug]
    expect(slugs.length, guideSlug).toBeGreaterThanOrEqual(1)
    expect(slugs.length, guideSlug).toBeLessThanOrEqual(3)
    for (const s of slugs) {
      expect(printableSlugs.has(s), `${guideSlug}: unknown printable slug "${s}"`).toBe(true)
    }
  })

  it('every one of the 15 printables is reachable from at least one guide', () => {
    const covered = new Set(allGuidePrintableSlugs())
    for (const p of PRINTABLES) {
      expect(covered.has(p.slug), `printable "${p.slug}" isn't linked from any guide`).toBe(true)
    }
  })

  it('getPrintablesForGuide resolves real Printable objects in curated order', () => {
    const resolved = getPrintablesForGuide('camping-with-kids-first-time')
    expect(resolved.map((p) => p.slug)).toEqual(GUIDE_PRINTABLES['camping-with-kids-first-time'])
  })

  it('getPrintablesForGuide returns an empty array for a guide with no entry', () => {
    expect(getPrintablesForGuide('recreation-gov-reservation-strategy')).toEqual([])
  })

  it('getGuidesLinkedToPrintable is the true reverse of GUIDE_PRINTABLES', () => {
    const allGuideSlugs = Object.keys(GUIDE_PRINTABLES)
    for (const p of PRINTABLES) {
      const guides = getGuidesLinkedToPrintable(p.slug)
      for (const guideSlug of guides) {
        expect(GUIDE_PRINTABLES[guideSlug]).toContain(p.slug)
      }
      const expectedGuides = allGuideSlugs.filter((s) => GUIDE_PRINTABLES[s].includes(p.slug))
      expect(guides.sort()).toEqual(expectedGuides.sort())
    }
  })
})
