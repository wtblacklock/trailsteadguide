import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { GUIDES } from '../data'
import { GUIDE_CATEGORIES } from '../categories'
import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import { GEAR_SLOTS } from '@/lib/affiliate/gear-slots'

/**
 * Guides waiting in `content-queue/guides/` are published one a day by
 * `scripts/publish-next-queued-guide.mjs`. These checks make sure every
 * queued guide will pass the same checks once it lands in `app/guides/`,
 * so the daily publish run never has to repair content.
 *
 * Queued guides may only link to guides that are already live: the publish
 * order is by date, and a link to a later queued guide would 404 until then.
 */
const QUEUE_DIR = join(process.cwd(), 'content-queue/guides')
const folders = existsSync(QUEUE_DIR)
  ? readdirSync(QUEUE_DIR).filter((n) => /^\d{4}-\d{2}-\d{2}--/.test(n))
  : []

const LIVE = new Set(GUIDES.map((g) => g.slug))
const CATEGORY_IDS = new Set(GUIDE_CATEGORIES.map((c) => c.id))
/** Chip categories render `shortLabel` on the homepage, so their guides must set one. */
const CHIP_CATEGORY_IDS = new Set(GUIDE_CATEGORIES.filter((c) => c.homeDisplay === 'chips').map((c) => c.id))
const SLOT_IDS = new Set(GEAR_SLOTS.map((s) => s.id))
const ACTIVE_PRODUCTS = new Set(AFFILIATE_PRODUCTS.filter((p) => !p.deprecated).map((p) => p.id))
const DASH = /[\u2013\u2014]/

function readConst(source: string, name: string): string | null {
  const match = new RegExp(`\\bconst ${name} =\\s*\\n?\\s*(['"])((?:[^\\\\]|\\\\.)*?)\\1`).exec(source)
  if (!match) return null
  return match[2].replace(/\\'/g, "'").replace(/\\"/g, '"')
}

describe('content queue', () => {
  it('has unique publish dates and slugs', () => {
    const dates = folders.map((f) => f.slice(0, 10))
    const slugs = folders.map((f) => f.slice(12))
    expect(new Set(dates).size).toBe(dates.length)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('does not reuse a hero image', () => {
    const live = new Set<string>()
    for (const slug of LIVE) {
      const file = join(process.cwd(), 'app/guides', slug, 'page.tsx')
      if (!existsSync(file)) continue
      const hero = readConst(readFileSync(file, 'utf8'), 'HERO_IMAGE')
      if (hero) live.add(hero.split('?')[0])
    }
    const queued = folders.map((f) =>
      readConst(readFileSync(join(QUEUE_DIR, f, 'page.tsx'), 'utf8'), 'HERO_IMAGE')!.split('?')[0],
    )
    expect(new Set(queued).size, 'two queued guides share a hero').toBe(queued.length)
    for (const [i, hero] of queued.entries()) {
      expect(live.has(hero), `${folders[i]} hero is already live`).toBe(false)
    }
  })

  for (const folder of folders) {
    describe(folder, () => {
      const dir = join(QUEUE_DIR, folder)
      const queueRaw = readFileSync(join(dir, 'queue.json'), 'utf8')
      const page = readFileSync(join(dir, 'page.tsx'), 'utf8')
      const item = JSON.parse(queueRaw)
      const { guide } = item
      const slug = folder.slice(12)

      it('has matching folder name, publishOn, and slug', () => {
        expect(item.publishOn).toBe(folder.slice(0, 10))
        expect(guide.slug).toBe(slug)
      })

      it('is not already live', () => {
        expect(LIVE.has(slug)).toBe(false)
        expect(existsSync(join(process.cwd(), 'app/guides', slug))).toBe(false)
      })

      it('has a valid guide entry within SEO limits', () => {
        expect(CATEGORY_IDS.has(guide.category)).toBe(true)
        expect(guide.title.length).toBeGreaterThan(0)
        expect(guide.description.length).toBeGreaterThan(0)
        expect(guide.metaTitle.length).toBeLessThanOrEqual(41)
        expect(guide.metaDescription.length).toBeLessThanOrEqual(155)
        if (CHIP_CATEGORY_IDS.has(guide.category)) {
          expect(guide.shortLabel, `${guide.category} guides need a shortLabel`).toBeTruthy()
        }
        for (const r of guide.relatedGuides ?? []) expect(LIVE.has(r), `relatedGuides ${r}`).toBe(true)
      })

      it('has valid gear and reciprocal links', () => {
        for (const e of item.gear ?? []) {
          expect(SLOT_IDS.has(e.slot), `slot ${e.slot}`).toBe(true)
          expect(ACTIVE_PRODUCTS.has(e.productId), `product ${e.productId}`).toBe(true)
        }
        for (const r of item.reciprocal ?? []) {
          expect(LIVE.has(r.slug), `reciprocal ${r.slug}`).toBe(true)
          if (r.replace) expect(LIVE.has(r.replace), `reciprocal replace ${r.replace}`).toBe(true)
        }
      })

      it('page matches its queue entry', () => {
        expect(readConst(page, 'SLUG')).toBe(`/guides/${slug}`)
        expect(readConst(page, 'META_TITLE')).toBe(guide.metaTitle)
        const description = readConst(page, 'DESCRIPTION')
        expect(description).not.toBeNull()
        expect(description!.length).toBeLessThanOrEqual(155)
        expect(readConst(page, 'HERO_IMAGE')).toMatch(/^https:\/\/images\.unsplash\.com\/photo-/)
        expect(page).toContain(`slug="${slug}"`)
        expect(page).toContain(`guideSlug="${slug}"`)
        expect(page).toContain(`currentSlug="${slug}"`)
        expect(page).toContain(`dateModified="${item.publishOn}"`)
      })

      it('only links to live guides and active products', () => {
        for (const m of page.matchAll(/href="\/guides\/([a-z0-9-]+)"/g)) {
          expect(LIVE.has(m[1]), `link to /guides/${m[1]}`).toBe(true)
        }
        for (const m of page.matchAll(/productId="([a-z0-9-]+)"/g)) {
          expect(ACTIVE_PRODUCTS.has(m[1]), `AmazonLink ${m[1]}`).toBe(true)
        }
      })

      it('contains no em or en dashes', () => {
        expect(DASH.test(page)).toBe(false)
        expect(DASH.test(queueRaw)).toBe(false)
      })
    })
  }
})
