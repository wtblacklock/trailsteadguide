import { describe, expect, it } from 'vitest'
import sitemap from '@/app/sitemap'
import { PRINTABLES } from '@/lib/printables'

// Pages that set `noIndex: true` in their metadata. Listing a noindex URL
// in the sitemap sends search engines contradictory signals, and Bing
// Webmaster Tools reports it.
const NOINDEX_PATHS = [
  '/quiz',
  '/checklist/result',
  '/thank-you',
  ...PRINTABLES.map((p) => `/printables/${p.slug}/print`),
]

describe('sitemap', () => {
  it('leaves out noindex pages', () => {
    const paths = new Set(sitemap().map((e) => new URL(e.url).pathname))
    for (const p of NOINDEX_PATHS) expect(paths.has(p), `${p} is noindex but in the sitemap`).toBe(false)
  })
})
