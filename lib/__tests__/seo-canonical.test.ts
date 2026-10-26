// @vitest-environment node
/**
 * Guards the invariant from docs/seo-roadmap.md A2: `pageMetadata()`'s
 * canonical must never carry a query string, even for pages that read
 * filterable/paginated `searchParams` (e.g. /plans/[planId],
 * /trip-pack/[planSlug]). A future change that builds `path` from the
 * request URL instead of route params would quietly split crawl budget
 * across query-string variants - this pins the current, correct behavior.
 */

import { describe, expect, it } from 'vitest'
import { pageMetadata, SITE_URL } from '@/lib/seo'

describe('pageMetadata canonical', () => {
  it('builds the canonical from path alone, with no query string', () => {
    const meta = pageMetadata({
      title: 'First Night Camp',
      description: 'A plan.',
      path: '/plans/first-night-camp',
    })
    expect(meta.alternates?.canonical).toBe(`${SITE_URL}/plans/first-night-camp`)
    expect(String(meta.alternates?.canonical)).not.toContain('?')
  })

  it('matches the OpenGraph url, also query-string-free', () => {
    const meta = pageMetadata({
      title: 'First Weekend Camp Trip Pack',
      description: 'A pack.',
      path: '/trip-pack/first-weekend-camp',
    })
    const ogUrl = meta.openGraph && 'url' in meta.openGraph ? meta.openGraph.url : undefined
    expect(ogUrl).toBe(meta.alternates?.canonical)
    expect(String(ogUrl)).not.toContain('?')
  })
})
