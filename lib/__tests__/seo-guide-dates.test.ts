// @vitest-environment node
/**
 * Guards docs/seo-roadmap.md A5: guide pages' Article schema should carry
 * real per-guide dateModified/datePublished from GUIDE_DATES (generated
 * from git history by scripts/generate-guide-dates.mjs), not the single
 * site-wide FRESH default - and every known guide slug should resolve to
 * a real, well-formed entry.
 */

import { describe, expect, it } from 'vitest'
import { articleGraph, SITE_URL } from '@/lib/seo'
import { GUIDE_DATES } from '@/lib/guides/guide-dates.generated'
import { GUIDES } from '@/lib/guides/data'

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

describe('articleGraph guide dates', () => {
  it('uses the per-guide GUIDE_DATES entry instead of the site-wide default', () => {
    const [slug, dates] = Object.entries(GUIDE_DATES)[0]
    const graph = articleGraph({
      slug: `/guides/${slug}`,
      title: 'Test Guide',
      description: 'Test.',
      breadcrumbs: [{ name: 'Home', url: `${SITE_URL}/` }],
    })
    const article = graph['@graph'].find((n) => (n as { '@type'?: string })['@type'] === 'Article') as Record<string, unknown>
    expect(article.datePublished).toBe(dates.datePublished)
    expect(article.dateModified).toBe(dates.dateModified)
  })

  it('falls back to the site-wide default for a slug with no GUIDE_DATES entry', () => {
    const graph = articleGraph({
      slug: '/guides/does-not-exist',
      title: 'Test Guide',
      description: 'Test.',
      breadcrumbs: [{ name: 'Home', url: `${SITE_URL}/` }],
    })
    const article = graph['@graph'].find((n) => (n as { '@type'?: string })['@type'] === 'Article') as Record<string, unknown>
    expect(article.datePublished).toBe('2026-01-01')
    expect(article.dateModified).toBe('2026-04-24')
  })

  it('still honors explicit dates passed by non-guide article pages', () => {
    const graph = articleGraph({
      slug: '/research/example',
      title: 'Test Research',
      description: 'Test.',
      datePublished: '2026-02-02',
      dateModified: '2026-03-03',
      breadcrumbs: [{ name: 'Home', url: `${SITE_URL}/` }],
    })
    const article = graph['@graph'].find((n) => (n as { '@type'?: string })['@type'] === 'Article') as Record<string, unknown>
    expect(article.datePublished).toBe('2026-02-02')
    expect(article.dateModified).toBe('2026-03-03')
  })

  it('has a well-formed, non-future entry for every known guide', () => {
    for (const guide of GUIDES) {
      const dates = GUIDE_DATES[guide.slug]
      expect(dates, `missing GUIDE_DATES entry for ${guide.slug}`).toBeDefined()
      expect(dates.datePublished).toMatch(ISO_DATE)
      expect(dates.dateModified).toMatch(ISO_DATE)
      expect(dates.datePublished <= dates.dateModified).toBe(true)
    }
  })
})
