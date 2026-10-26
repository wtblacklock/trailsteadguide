import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { GUIDES } from '../data'
import { GUIDE_CATEGORIES } from '../categories'

/**
 * SEO metadata budgets, enforced here so they stop being advisory.
 *
 * `app/layout.tsx` sets `title.template` to `'%s | Trailstead Guide'`, which
 * appends 19 characters to every page title. 41 + 19 = 60, which is Google's
 * approximate truncation point, so a title over 41 gets cut in the SERP.
 *
 * Both limits are the ones documented on `Guide.metaTitle` /
 * `Guide.metaDescription` in `lib/guides/types.ts`. Three consecutive weekly
 * audits found over-length values as their most frequent finding, and the
 * 2026-10-05 audit found 18 land in 16 commits, so the constraint is checked
 * mechanically rather than weekly after the fact.
 */
const META_TITLE_MAX = 41
const META_DESCRIPTION_MAX = 155

/** Vitest runs with the repo root as cwd (see `vitest.config.ts`). */
const REPO_ROOT = `${process.cwd()}/`

/** Every `.tsx`/`.ts` file under `app/`, which is where page-level constants live. */
function appSourceFiles(dir = join(REPO_ROOT, 'app')): string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      out.push(...appSourceFiles(full))
    } else if (entry.endsWith('.tsx') || entry.endsWith('.ts')) {
      out.push(full)
    }
  }
  return out
}

/**
 * Reads a top-level `const <name> = '...'` string literal. Deliberately simple:
 * it matches the single convention every page under `app/` already uses, and a
 * page that stops matching it simply is not covered rather than failing.
 */
function readConst(source: string, name: string): string | null {
  const match = new RegExp(`\\bconst ${name} =\\s*\\n?\\s*(['"])((?:[^\\\\]|\\\\.)*?)\\1`).exec(
    source,
  )
  if (!match) return null
  return match[2].replace(/\\'/g, "'").replace(/\\"/g, '"')
}

describe('SEO metadata limits', () => {
  it(`keeps every guide metaTitle within ${META_TITLE_MAX} chars`, () => {
    for (const guide of GUIDES) {
      if (!guide.metaTitle) continue
      expect(
        guide.metaTitle.length,
        `${guide.slug} metaTitle is ${guide.metaTitle.length} chars: ${guide.metaTitle}`,
      ).toBeLessThanOrEqual(META_TITLE_MAX)
    }
  })

  it(`keeps every guide metaDescription within ${META_DESCRIPTION_MAX} chars`, () => {
    for (const guide of GUIDES) {
      if (!guide.metaDescription) continue
      expect(
        guide.metaDescription.length,
        `${guide.slug} metaDescription is ${guide.metaDescription.length} chars`,
      ).toBeLessThanOrEqual(META_DESCRIPTION_MAX)
    }
  })

  it('keeps every category hub metaTitle and metaDescription within limits', () => {
    for (const cat of GUIDE_CATEGORIES) {
      expect(
        cat.metaTitle.length,
        `category ${cat.id} metaTitle is ${cat.metaTitle.length} chars: ${cat.metaTitle}`,
      ).toBeLessThanOrEqual(META_TITLE_MAX)
      expect(
        cat.metaDescription.length,
        `category ${cat.id} metaDescription is ${cat.metaDescription.length} chars`,
      ).toBeLessThanOrEqual(META_DESCRIPTION_MAX)
    }
  })

  it('keeps every page-level META_TITLE and DESCRIPTION under app/ within limits', () => {
    const files = appSourceFiles()
    // Guard the walker itself: a refactor that moves pages out of app/ should
    // fail loudly here rather than silently checking nothing.
    expect(files.length, 'expected to find source files under app/').toBeGreaterThan(50)

    let checked = 0
    for (const file of files) {
      const source = readFileSync(file, 'utf8')
      const rel = file.slice(REPO_ROOT.length)

      const metaTitle = readConst(source, 'META_TITLE')
      if (metaTitle !== null) {
        checked += 1
        expect(
          metaTitle.length,
          `${rel} META_TITLE is ${metaTitle.length} chars: ${metaTitle}`,
        ).toBeLessThanOrEqual(META_TITLE_MAX)
      }

      const description = readConst(source, 'DESCRIPTION')
      if (description !== null) {
        checked += 1
        expect(
          description.length,
          `${rel} DESCRIPTION is ${description.length} chars`,
        ).toBeLessThanOrEqual(META_DESCRIPTION_MAX)
      }
    }

    expect(checked, 'expected to check page-level metadata constants').toBeGreaterThan(50)
  })
})
