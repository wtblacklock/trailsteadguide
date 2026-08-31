# Site-Wide Search Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an instant-overlay search feature, opened from a header icon or `⌘K`/`Ctrl+K`, that searches across every content type on the site (guides, skills, activities, printables, gear, glossary, comparison pages, plans) with type-only filtering.

**Architecture:** A build-time Next.js Route Handler (`app/search-index.json/route.ts`) generates one static JSON index from all existing content data files. The browser fetches it once when the search overlay first opens and searches it entirely client-side with MiniSearch — no server round-trip per keystroke.

**Tech Stack:** Next.js 15 App Router, MiniSearch (client-side fuzzy search), existing Vitest test setup.

**Spec:** `docs/superpowers/specs/2026-08-30-site-search-design.md`

---

## Deviations from the spec, decided during planning

- **Gear result URLs.** `AFFILIATE_PRODUCTS` have **no internal detail page** — every existing gear surface on the site (`GuideGearShelf`, `AffiliateBlock`, `RelatedGearBlock`) links straight to the product's Amazon affiliate URL via `getProductUrl()`. This wasn't pinned down in the spec's generic `url: string` field. Search results for `type: 'gear'` do the same: open the Amazon URL in a new tab with `rel="nofollow sponsored noopener"`, exactly like every other gear link on the site. All other result types (`guide`, `skill`, `activity`, `printable`, `glossary`, `compare`, `plan`) link to an internal page and navigate via `next/link`.
- **No standalone `SearchProvider`/`SearchTrigger` files.** The spec described a context provider so the trigger and overlay "don't need to be siblings." In practice both live inside `components/landing/Nav.tsx` already (the mobile menu toggle button follows the same inline pattern), so a single `useState` in `Nav.tsx` plus the `SearchOverlay` component covers the same behavior with less code — no context needed since there's exactly one owner of the open/closed state. If a second entry point for opening search is added later (e.g. a "search" link elsewhere on the site), lifting this into a context at that point is a small, isolated change.

---

### Task 1: Install MiniSearch

**Files:**
- Modify: `package.json`, `package-lock.json`

- [ ] **Step 1: Install the dependency**

Run: `npm install minisearch`

- [ ] **Step 2: Verify it installed**

Run: `grep '"minisearch"' package.json`
Expected: a line like `"minisearch": "^7.1.2"` (or whatever the current published version resolves to) under `dependencies`.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add minisearch for client-side site search"
```

---

### Task 2: Extract glossary data to `lib/glossary/data.ts`

**Files:**
- Create: `lib/glossary/data.ts`
- Modify: `app/glossary/page.tsx`
- Test: `lib/glossary/__tests__/data.test.ts`

The glossary page currently defines an unexported `Term` type, a `TERMS` array (59 entries), and a `slugify()` helper inline. This task moves all three into a new data file, matching the `lib/<type>/data.ts` convention already used by guides/skills/activities/printables, with no change in the glossary page's rendered output.

- [ ] **Step 1: Write the failing test**

Create `lib/glossary/__tests__/data.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run lib/glossary/__tests__/data.test.ts`
Expected: FAIL — `lib/glossary/data.ts` does not exist yet.

- [ ] **Step 3: Create `lib/glossary/data.ts` by moving the existing content**

Find the exact current line ranges before editing — line numbers drift as the file changes, so locate these by content, not by the numbers below:

```bash
grep -n "^type Term\|^const TERMS\|^const TERMS_BY_LETTER\|^function slugify" app/glossary/page.tsx
```

This prints four lines: the start of `type Term = {`, the start of `const TERMS: Term[] = [`, the start of the next top-level const after it (`TERMS_BY_LETTER` — `TERMS` ends on the blank line right before this), and the start of `function slugify`. Use those line numbers to identify:
- The `type Term = { ... }` block (from the `type Term` line through its closing `}`).
- The `const TERMS: Term[] = [ ... ]` array (from the `const TERMS` line through its closing `]`, ending just before `const TERMS_BY_LETTER`).
- The `function slugify(s: string): string { ... }` block (from the `function slugify` line through its closing `}`).

Create `lib/glossary/data.ts` with this structure, pasting the **exact, unmodified** `Term` type and `TERMS` array content from the page file into it, and the exact `slugify` function body:

```ts
export type Term = {
  term: string
  definition: string
  href?: string
  linkText?: string
}

// Alphabetized in flat list; grouped by first letter for rendering.
export const TERMS: Term[] = [
  // ... paste the full existing array content here, unchanged ...
]

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
```

- [ ] **Step 4: Update `app/glossary/page.tsx` to import from the new file**

Remove the `type Term`, `const TERMS`, and `function slugify` definitions from `app/glossary/page.tsx`. Add this import near the top of the file (after the existing imports):

```ts
import { TERMS, slugify } from '@/lib/glossary/data'
```

Everything else in the page (the `LETTERS` computation, the JSX rendering, the `JsonLd` block that references `slugify(t.term)`) stays exactly as it is — it already refers to `TERMS` and `slugify` by name, so it keeps working once those names resolve via the new import instead of a local declaration.

- [ ] **Step 5: Run the test to verify it passes**

Run: `npx vitest run lib/glossary/__tests__/data.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 6: Verify the glossary page still builds and typechecks**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add lib/glossary/data.ts lib/glossary/__tests__/data.test.ts app/glossary/page.tsx
git commit -m "refactor: extract glossary TERMS to lib/glossary/data.ts"
```

---

### Task 3: Create `lib/compare/index.ts`

**Files:**
- Create: `lib/compare/index.ts`
- Test: `lib/compare/__tests__/index.test.ts`

Comparison pages under `app/compare/*/page.tsx` are bespoke components with no shared data file. Add a small manual index of all 12 with their real titles and descriptions (extracted directly from each page's `TITLE`/`DESCRIPTION` constants), used by the search index builder.

- [ ] **Step 1: Write the failing test**

Create `lib/compare/__tests__/index.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run lib/compare/__tests__/index.test.ts`
Expected: FAIL — `lib/compare/index.ts` does not exist yet.

- [ ] **Step 3: Create `lib/compare/index.ts`**

```ts
export type ComparePageEntry = {
  slug: string
  title: string
  excerpt: string
}

export const COMPARE_PAGES: ComparePageEntry[] = [
  {
    slug: '6-person-vs-8-person-family-tent',
    title: '6-Person vs 8-Person Family Tent: Which Size?',
    excerpt:
      '6-person vs 8-person family tent compared: floor size, standing height, real capacity, setup time, and price. The sizing rule that decides it for most families.',
  },
  {
    slug: 'backyard-test-vs-first-night-camp',
    title: 'Backyard Test vs First Night Camp — First-Trip Comparison',
    excerpt:
      'Backyard Test vs First Night Camp: which plan fits your first trip? Compare gear, duration, and risk. Pick the right starting point in 60 seconds.',
  },
  {
    slug: 'best-beginner-cooler',
    title: 'Best Beginner Cooler: 3 Picks for First-Trip Comfort',
    excerpt:
      'Best beginner cooler: a compact classic, a full-size rolling cooler, and a premium upgrade path. Compare ice retention, capacity, weight, and price.',
  },
  {
    slug: 'best-beginner-sleeping-system',
    title: 'Best Beginner Sleeping System: 3 Picks for First Trips',
    excerpt:
      'Best beginner sleeping system: synthetic bag plus pad, three tiers. Compare temp rating, weight, packed size, and price for budget, comfort, and cold-weather upgrades.',
  },
  {
    slug: 'best-beginner-stove',
    title: 'Best Beginner Camp Stove: 3 Picks for First Trips',
    excerpt:
      'Best beginner camp stove: single-burner, two-burner propane, and a premium two-burner. Compare BTU, fuel, ease of cleanup, and footprint.',
  },
  {
    slug: 'best-beginner-tent',
    title: 'Best Beginner Tent: 3 Picks for First-Trip Comfort',
    excerpt:
      'Best beginner tent: a 4-person dome, a stand-up family size-up, and a sturdier upgrade. Compare capacity, setup, weather rating, and price.',
  },
  {
    slug: 'camp-chef-everest-vs-coleman-classic-1-burner',
    title: 'Camp Chef Everest vs Coleman 1-Burner: Which Stove?',
    excerpt:
      'Camp Chef Everest 2-burner vs Coleman Classic 1-burner compared: BTU output, ignition, pot size, wind resistance, and price. Pick the right camp stove.',
  },
  {
    slug: 'coleman-sundome-3p-vs-4p-vs-6p',
    title: 'Coleman Sundome 3P vs 4P vs 6P: Which Size?',
    excerpt:
      'Coleman Sundome 3P vs 4P vs 6P compared: floor size, standing height, real capacity, setup time, and price. Pick the right size for your first camping trip.',
  },
  {
    slug: 'dome-tent-vs-cabin-tent',
    title: 'Dome Tent vs. Cabin Tent for Families',
    excerpt:
      'Dome tent vs. cabin tent compared for family camping: setup time, wind resistance, headroom, weight, and price. Which style actually wins for car camping.',
  },
  {
    slug: 'easy-family-basecamp-vs-first-weekend-camp',
    title: 'Easy Family Basecamp vs First Weekend Camp — Comparison',
    excerpt:
      'Easy Family Basecamp vs First Weekend Camp: pick the right multi-night plan. Compare comfort, ambition, gear, hike day, and which fits your family.',
  },
  {
    slug: 'rolling-cooler-vs-steel-belted-cooler',
    title: 'Rolling Cooler vs Steel-Belted: Which Coleman Cooler?',
    excerpt:
      'Coleman Rolling Cooler vs Steel-Belted 54-Quart compared: ice retention, capacity, portability, durability, and price. Pick the right camping cooler.',
  },
  {
    slug: 'sleeping-bag-vs-cot-airbed-combo',
    title: 'Air Mattress vs Cot Combo vs Pad: What to Sleep On',
    excerpt:
      'Air mattress vs cot-airbed combo vs sleeping pad compared for car campers: comfort, setup, packed size, durability, and price. Pick the right sleep system.',
  },
]
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run lib/compare/__tests__/index.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add lib/compare/index.ts lib/compare/__tests__/index.test.ts
git commit -m "feat(compare): add COMPARE_PAGES index for search"
```

---

### Task 4: Define search types

**Files:**
- Create: `lib/search/types.ts`

- [ ] **Step 1: Create the file**

```ts
export type SearchDocType =
  | 'guide'
  | 'skill'
  | 'activity'
  | 'printable'
  | 'gear'
  | 'glossary'
  | 'compare'
  | 'plan'

export type SearchDocument = {
  /** Unique across all documents, e.g. "guide:camping-for-beginners". */
  id: string
  type: SearchDocType
  title: string
  /** Shown under the title in results. */
  excerpt: string
  url: string
  /** Extra matchable text (tags/category) — not displayed. */
  keywords?: string
}

export const SEARCH_TYPE_LABELS: Record<SearchDocType, string> = {
  guide: 'Guide',
  skill: 'Skill',
  activity: 'Activity',
  printable: 'Printable',
  gear: 'Gear',
  glossary: 'Glossary',
  compare: 'Compare',
  plan: 'Plan',
}
```

- [ ] **Step 2: Verify it typechecks**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/search/types.ts
git commit -m "feat(search): add SearchDocument types"
```

---

### Task 5: Build the search index

**Files:**
- Create: `lib/search/build-index.ts`
- Test: `lib/search/__tests__/build-index.test.ts`

- [ ] **Step 1: Write the failing test**

Create `lib/search/__tests__/build-index.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { buildSearchIndex } from '../build-index'
import { GUIDES } from '@/lib/guides/data'
import { SKILLS } from '@/lib/skills/data'
import { ACTIVITIES } from '@/lib/activities/data'
import { PRINTABLES } from '@/lib/printables'
import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import { TERMS } from '@/lib/glossary/data'
import { COMPARE_PAGES } from '@/lib/compare'
import { PLAN_TEMPLATES } from '@/lib/plan-templates'

describe('buildSearchIndex', () => {
  const docs = buildSearchIndex()

  it('every document has a non-empty title and url', () => {
    for (const d of docs) {
      expect(d.title.length, `empty title for id "${d.id}"`).toBeGreaterThan(0)
      expect(d.url.length, `empty url for id "${d.id}"`).toBeGreaterThan(0)
    }
  })

  it('has no duplicate ids', () => {
    const ids = docs.map((d) => d.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has no duplicate urls', () => {
    const urls = docs.map((d) => d.url)
    expect(new Set(urls).size).toBe(urls.length)
  })

  it('has exactly one document per guide', () => {
    expect(docs.filter((d) => d.type === 'guide').length).toBe(GUIDES.length)
  })

  it('has exactly one document per skill', () => {
    expect(docs.filter((d) => d.type === 'skill').length).toBe(SKILLS.length)
  })

  it('has exactly one document per activity', () => {
    expect(docs.filter((d) => d.type === 'activity').length).toBe(ACTIVITIES.length)
  })

  it('has exactly one document per printable', () => {
    expect(docs.filter((d) => d.type === 'printable').length).toBe(PRINTABLES.length)
  })

  it('has exactly one document per glossary term', () => {
    expect(docs.filter((d) => d.type === 'glossary').length).toBe(TERMS.length)
  })

  it('has exactly one document per compare page', () => {
    expect(docs.filter((d) => d.type === 'compare').length).toBe(COMPARE_PAGES.length)
  })

  it('has exactly one document per plan', () => {
    expect(docs.filter((d) => d.type === 'plan').length).toBe(Object.keys(PLAN_TEMPLATES).length)
  })

  it('has one gear document per non-deprecated affiliate product, and excludes deprecated ones', () => {
    const activeProducts = AFFILIATE_PRODUCTS.filter((p) => !p.deprecated)
    const gearDocs = docs.filter((d) => d.type === 'gear')
    expect(gearDocs.length).toBe(activeProducts.length)

    const deprecatedIds = new Set(
      AFFILIATE_PRODUCTS.filter((p) => p.deprecated).map((p) => p.id),
    )
    for (const d of gearDocs) {
      const productId = d.id.replace(/^gear:/, '')
      expect(deprecatedIds.has(productId)).toBe(false)
    }
  })

  it('gear document urls are external Amazon links, not internal paths', () => {
    const gearDocs = docs.filter((d) => d.type === 'gear')
    for (const d of gearDocs) {
      expect(d.url.startsWith('https://www.amazon.com/') || d.url.startsWith('https://amzn.to/')).toBe(true)
    }
  })

  it('skill urls are nested under their category slug', () => {
    const skillDoc = docs.find((d) => d.type === 'skill')
    expect(skillDoc?.url).toMatch(/^\/skills\/[a-z-]+\/[a-z0-9-]+$/)
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run lib/search/__tests__/build-index.test.ts`
Expected: FAIL — `lib/search/build-index.ts` does not exist yet.

- [ ] **Step 3: Write `lib/search/build-index.ts`**

```ts
import { GUIDES } from '@/lib/guides/data'
import { SKILLS } from '@/lib/skills/data'
import { getCategoryById } from '@/lib/skills/categories'
import { ACTIVITIES } from '@/lib/activities/data'
import { PRINTABLES } from '@/lib/printables'
import { AFFILIATE_PRODUCTS } from '@/lib/affiliate-products'
import { getProductUrl } from '@/lib/amazon'
import { TERMS, slugify } from '@/lib/glossary/data'
import { COMPARE_PAGES } from '@/lib/compare'
import { PLAN_TEMPLATES } from '@/lib/plan-templates'
import type { SearchDocument } from './types'

/**
 * Builds the full site search index from every content source. Called at
 * build time by `app/search-index.json/route.ts`. Throws if any content
 * item is missing a title or url — a broken search entry is a build
 * failure, not a silently-skipped item.
 */
export function buildSearchIndex(): SearchDocument[] {
  const docs: SearchDocument[] = []

  for (const g of GUIDES) {
    docs.push({
      id: `guide:${g.slug}`,
      type: 'guide',
      title: g.title,
      excerpt: g.description,
      url: `/guides/${g.slug}`,
      keywords: g.category,
    })
  }

  for (const s of SKILLS) {
    docs.push({
      id: `skill:${s.slug}`,
      type: 'skill',
      title: s.title,
      excerpt: s.tagline,
      url: `/skills/${getCategoryById(s.category).slug}/${s.slug}`,
      keywords: `${s.category} ${s.difficulty}`,
    })
  }

  for (const a of ACTIVITIES) {
    docs.push({
      id: `activity:${a.slug}`,
      type: 'activity',
      title: a.title,
      excerpt: a.tagline,
      url: `/activities/${a.slug}`,
      keywords: `${a.category} ${a.ageRange} ${a.groupSize}`,
    })
  }

  for (const p of PRINTABLES) {
    docs.push({
      id: `printable:${p.slug}`,
      type: 'printable',
      title: p.title,
      excerpt: p.description,
      url: `/printables/${p.slug}`,
      keywords: p.category,
    })
  }

  for (const product of AFFILIATE_PRODUCTS) {
    if (product.deprecated) continue
    docs.push({
      id: `gear:${product.id}`,
      type: 'gear',
      title: product.name,
      excerpt: product.description,
      url: getProductUrl(product),
      keywords: product.tags?.join(' '),
    })
  }

  for (const t of TERMS) {
    docs.push({
      id: `glossary:${slugify(t.term)}`,
      type: 'glossary',
      title: t.term,
      excerpt: t.definition,
      url: `/glossary#${slugify(t.term)}`,
    })
  }

  for (const c of COMPARE_PAGES) {
    docs.push({
      id: `compare:${c.slug}`,
      type: 'compare',
      title: c.title,
      excerpt: c.excerpt,
      url: `/compare/${c.slug}`,
    })
  }

  for (const plan of Object.values(PLAN_TEMPLATES)) {
    docs.push({
      id: `plan:${plan.slug}`,
      type: 'plan',
      title: plan.title,
      excerpt: plan.tagline,
      url: `/plans/${plan.slug}`,
      keywords: 'plan template',
    })
  }

  for (const d of docs) {
    if (!d.title) throw new Error(`buildSearchIndex: empty title for id "${d.id}"`)
    if (!d.url) throw new Error(`buildSearchIndex: empty url for id "${d.id}"`)
  }

  return docs
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run lib/search/__tests__/build-index.test.ts`
Expected: PASS (13 tests). If the guide/skill/activity/printable count assertions fail, it means the counts in the test literally read from the live data arrays — a count mismatch would indicate a real bug in the loop above (e.g. a missed content source), not a stale expected number, since the test imports the same arrays it's checking against.

- [ ] **Step 5: Commit**

```bash
git add lib/search/build-index.ts lib/search/__tests__/build-index.test.ts
git commit -m "feat(search): build the full-site search index"
```

---

### Task 6: Serve the index as a static JSON route

**Files:**
- Create: `app/search-index.json/route.ts`

- [ ] **Step 1: Write the route handler**

```ts
import { NextResponse } from 'next/server'
import { buildSearchIndex } from '@/lib/search/build-index'

// Generated once at build time and served as a static asset — mirrors the
// convention used by app/sitemap.ts and app/robots.ts.
export const dynamic = 'force-static'

export function GET() {
  return NextResponse.json(buildSearchIndex())
}
```

- [ ] **Step 2: Verify it builds**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Verify the route serves real data**

Run: `npm run dev` in one terminal, then in another:
Run: `curl -s http://localhost:3000/search-index.json | node -e "const d = JSON.parse(require('fs').readFileSync(0)); console.log('total:', d.length); console.log('sample:', d[0])"`
Expected: `total:` a number in the low-to-mid 300s, and a `sample:` object with `id`, `type`, `title`, `excerpt`, `url` fields populated. Stop the dev server after checking.

- [ ] **Step 4: Commit**

```bash
git add app/search-index.json/route.ts
git commit -m "feat(search): serve the search index as a static JSON route"
```

---

### Task 7: Client-side search engine

**Files:**
- Create: `lib/search/client.ts`
- Test: `lib/search/__tests__/client.test.ts`

- [ ] **Step 1: Write the failing test**

Create `lib/search/__tests__/client.test.ts`. This tests the pure `createSearchEngine` / `searchDocuments` functions directly against the real index (not the fetch-and-cache wrapper, which needs a browser `fetch` and is covered by manual browser verification in Task 11):

```ts
import { describe, it, expect } from 'vitest'
import { buildSearchIndex } from '../build-index'
import { createSearchEngine, searchDocuments } from '../client'

describe('search engine', () => {
  const engine = createSearchEngine(buildSearchIndex())

  it('finds tent-related content when searching "tent"', () => {
    const results = searchDocuments(engine, 'tent')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some((r) => r.title.toLowerCase().includes('tent'))).toBe(true)
  })

  it('is typo-tolerant', () => {
    const results = searchDocuments(engine, 'tnet')
    expect(results.some((r) => r.title.toLowerCase().includes('tent'))).toBe(true)
  })

  it('matches on a partial/prefix word', () => {
    const results = searchDocuments(engine, 'campfi')
    expect(results.length).toBeGreaterThan(0)
  })

  it('returns an empty array for a query matching nothing', () => {
    const results = searchDocuments(engine, 'zzzznonexistentqueryzzzz')
    expect(results).toEqual([])
  })

  it('returns an empty array for an empty query', () => {
    expect(searchDocuments(engine, '')).toEqual([])
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run lib/search/__tests__/client.test.ts`
Expected: FAIL — `lib/search/client.ts` does not exist yet.

- [ ] **Step 3: Write `lib/search/client.ts`**

```ts
import MiniSearch from 'minisearch'
import type { SearchDocument } from './types'

export type SearchEngine = MiniSearch<SearchDocument>

/** Builds a MiniSearch engine over the given documents. Pure — no I/O. */
export function createSearchEngine(documents: SearchDocument[]): SearchEngine {
  const engine = new MiniSearch<SearchDocument>({
    idField: 'id',
    fields: ['title', 'excerpt', 'keywords'],
    storeFields: ['id', 'type', 'title', 'excerpt', 'url'],
    searchOptions: {
      boost: { title: 3, excerpt: 1, keywords: 1 },
      fuzzy: 0.2,
      prefix: true,
    },
  })
  engine.addAll(documents)
  return engine
}

/** Searches the engine, returning full SearchDocument objects. */
export function searchDocuments(engine: SearchEngine, query: string): SearchDocument[] {
  const trimmed = query.trim()
  if (!trimmed) return []
  return engine.search(trimmed).map((result) => ({
    id: result.id as string,
    type: result.type,
    title: result.title,
    excerpt: result.excerpt,
    url: result.url,
  }))
}

let cachedEnginePromise: Promise<SearchEngine> | null = null

/**
 * Fetches the search index and builds the engine, memoized for the life of
 * the page session — only the first call to open the search overlay pays
 * the fetch + index-build cost.
 */
export function getSearchEngine(): Promise<SearchEngine> {
  if (!cachedEnginePromise) {
    cachedEnginePromise = fetch('/search-index.json')
      .then((res) => {
        if (!res.ok) throw new Error(`search index fetch failed: ${res.status}`)
        return res.json() as Promise<SearchDocument[]>
      })
      .then((documents) => createSearchEngine(documents))
      .catch((err) => {
        // Allow a retry on the next call instead of caching the failure forever.
        cachedEnginePromise = null
        throw err
      })
  }
  return cachedEnginePromise
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run lib/search/__tests__/client.test.ts`
Expected: PASS (5 tests)

- [ ] **Step 5: Commit**

```bash
git add lib/search/client.ts lib/search/__tests__/client.test.ts
git commit -m "feat(search): client-side MiniSearch engine + index loader"
```

---

### Task 8: `SearchResults` component

**Files:**
- Create: `components/search/SearchResults.tsx`

- [ ] **Step 1: Write the component**

```tsx
'use client'

import Link from 'next/link'
import type { SearchDocument } from '@/lib/search/types'
import { SEARCH_TYPE_LABELS } from '@/lib/search/types'

type Props = {
  results: SearchDocument[]
  highlightedIndex: number
  onNavigate: () => void
}

export default function SearchResults({ results, highlightedIndex, onNavigate }: Props) {
  if (results.length === 0) return null

  return (
    <ul role="listbox" className="divide-y divide-stone-100">
      {results.map((doc, i) => {
        const isHighlighted = i === highlightedIndex
        const rowClasses = `flex items-start gap-3 px-4 py-3 transition-colors ${
          isHighlighted ? 'bg-stone-100' : 'hover:bg-stone-50'
        }`
        const inner = (
          <>
            <span className="mt-0.5 shrink-0 text-[10px] font-semibold uppercase tracking-wider text-stone-500 bg-stone-100 rounded px-1.5 py-0.5">
              {SEARCH_TYPE_LABELS[doc.type]}
            </span>
            <span className="min-w-0">
              <span className="block text-stone-900 font-medium truncate">{doc.title}</span>
              <span className="block text-sm text-stone-500 line-clamp-1">{doc.excerpt}</span>
            </span>
          </>
        )

        if (doc.type === 'gear') {
          return (
            <li key={doc.id} role="option" aria-selected={isHighlighted}>
              <a
                href={doc.url}
                target="_blank"
                rel="nofollow sponsored noopener"
                onClick={onNavigate}
                className={rowClasses}
              >
                {inner}
              </a>
            </li>
          )
        }

        return (
          <li key={doc.id} role="option" aria-selected={isHighlighted}>
            <Link href={doc.url} onClick={onNavigate} className={rowClasses}>
              {inner}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
```

- [ ] **Step 2: Verify it typechecks**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/search/SearchResults.tsx
git commit -m "feat(search): SearchResults component"
```

---

### Task 9: `SearchOverlay` component

**Files:**
- Create: `components/search/SearchOverlay.tsx`

- [ ] **Step 1: Write the component**

```tsx
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getSearchEngine, searchDocuments, type SearchEngine } from '@/lib/search/client'
import type { SearchDocType, SearchDocument } from '@/lib/search/types'
import { SEARCH_TYPE_LABELS } from '@/lib/search/types'
import SearchResults from './SearchResults'

type Props = {
  open: boolean
  onClose: () => void
}

type Status = 'idle' | 'loading' | 'ready' | 'error'

const TYPE_CHIPS: Array<{ id: SearchDocType | 'all'; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'guide', label: SEARCH_TYPE_LABELS.guide + 's' },
  { id: 'skill', label: SEARCH_TYPE_LABELS.skill + 's' },
  { id: 'activity', label: SEARCH_TYPE_LABELS.activity + 's' },
  { id: 'printable', label: SEARCH_TYPE_LABELS.printable + 's' },
  { id: 'gear', label: SEARCH_TYPE_LABELS.gear },
  { id: 'glossary', label: SEARCH_TYPE_LABELS.glossary },
  { id: 'compare', label: SEARCH_TYPE_LABELS.compare },
  { id: 'plan', label: SEARCH_TYPE_LABELS.plan + 's' },
]

const POPULAR_LINKS = [
  { href: '/guides', label: 'Browse all guides' },
  { href: '/quiz', label: 'Take the 5-second quiz' },
  { href: '/gear', label: 'See the gear guide' },
]

export default function SearchOverlay({ open, onClose }: Props) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [engine, setEngine] = useState<SearchEngine | null>(null)
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [activeType, setActiveType] = useState<SearchDocType | 'all'>('all')
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  // Load the engine the first time the overlay opens.
  useEffect(() => {
    if (!open || engine) return
    setStatus('loading')
    getSearchEngine()
      .then((e) => {
        setEngine(e)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [open, engine])

  // Reset transient state whenever the overlay opens, and focus the input.
  useEffect(() => {
    if (!open) return
    setQuery('')
    setDebouncedQuery('')
    setActiveType('all')
    setHighlightedIndex(0)
    const id = setTimeout(() => inputRef.current?.focus(), 0)
    return () => clearTimeout(id)
  }, [open])

  // Debounce the query.
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), 120)
    return () => clearTimeout(id)
  }, [query])

  const allResults = useMemo<SearchDocument[]>(() => {
    if (!engine) return []
    return searchDocuments(engine, debouncedQuery)
  }, [engine, debouncedQuery])

  const filteredResults = useMemo(
    () => (activeType === 'all' ? allResults : allResults.filter((r) => r.type === activeType)),
    [allResults, activeType],
  )

  useEffect(() => {
    setHighlightedIndex(0)
  }, [debouncedQuery, activeType])

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      onClose()
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex((i) => Math.min(i + 1, Math.max(filteredResults.length - 1, 0)))
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex((i) => Math.max(i - 1, 0))
      return
    }
    if (e.key === 'Enter') {
      const target = filteredResults[highlightedIndex]
      if (!target) return
      e.preventDefault()
      if (target.type === 'gear') {
        window.open(target.url, '_blank', 'noopener,noreferrer')
      } else {
        router.push(target.url)
      }
      onClose()
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center pt-24 px-4">
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/40 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site search"
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl ring-1 ring-stone-200 overflow-hidden flex flex-col max-h-[70vh]"
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-stone-200 shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-stone-400 shrink-0">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search guides, skills, gear, and more…"
            className="flex-1 outline-none text-stone-900 placeholder:text-stone-400"
            aria-label="Search"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="text-xs text-stone-400 border border-stone-200 rounded px-1.5 py-0.5"
          >
            Esc
          </button>
        </div>

        <div className="flex gap-1.5 px-4 py-2 border-b border-stone-100 overflow-x-auto shrink-0">
          {TYPE_CHIPS.map((chip) => (
            <button
              key={chip.id}
              type="button"
              onClick={() => setActiveType(chip.id)}
              className={`shrink-0 text-xs font-medium rounded-full px-3 py-1 transition-colors ${
                activeType === chip.id
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        <div className="overflow-y-auto flex-1">
          {status === 'error' && (
            <div className="p-6 text-center text-sm text-stone-600">
              Search is temporarily unavailable.
              <button
                type="button"
                onClick={() => {
                  setStatus('loading')
                  getSearchEngine()
                    .then((e) => {
                      setEngine(e)
                      setStatus('ready')
                    })
                    .catch(() => setStatus('error'))
                }}
                className="block mx-auto mt-2 text-stone-900 font-medium underline underline-offset-4"
              >
                Try again
              </button>
            </div>
          )}

          {status !== 'error' && debouncedQuery.trim() === '' && (
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2 px-2">
                Popular
              </p>
              <ul>
                {POPULAR_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="block px-2 py-2 rounded-lg text-stone-700 hover:bg-stone-50"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {status !== 'error' && debouncedQuery.trim() !== '' && filteredResults.length === 0 && (
            <div className="p-6 text-center text-sm text-stone-600">
              No results for &ldquo;{debouncedQuery}&rdquo;.
              <div className="mt-2">
                <Link href="/guides" onClick={onClose} className="text-stone-900 font-medium underline underline-offset-4">
                  Browse all guides
                </Link>
              </div>
            </div>
          )}

          {status !== 'error' && filteredResults.length > 0 && (
            <SearchResults results={filteredResults} highlightedIndex={highlightedIndex} onNavigate={onClose} />
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify it typechecks**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/search/SearchOverlay.tsx
git commit -m "feat(search): SearchOverlay component"
```

---

### Task 10: Wire the search icon and shortcut into `Nav.tsx`

**Files:**
- Modify: `components/landing/Nav.tsx`

- [ ] **Step 1: Add state, the global keyboard shortcut, and the overlay**

In `components/landing/Nav.tsx`, add these imports near the top (after the existing imports):

```tsx
import SearchOverlay from '@/components/search/SearchOverlay'
```

Inside the `Nav()` function body, right after the existing `const [mobileOpen, setMobileOpen] = useState(false)` line, add:

```tsx
const [searchOpen, setSearchOpen] = useState(false)
```

Add a new `useEffect` alongside the existing ones (after the "Close on Escape" effect) to register the global `⌘K` / `Ctrl+K` shortcut:

```tsx
// Global search shortcut — works from anywhere on the site since Nav
// is rendered in the root layout.
useEffect(() => {
  function onKey(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault()
      setSearchOpen(true)
    }
  }
  document.addEventListener('keydown', onKey)
  return () => document.removeEventListener('keydown', onKey)
}, [])
```

- [ ] **Step 2: Add the search icon button**

In the "Right side: CTA + mobile toggle" `<div>` (the one with `className="flex items-center gap-2"`), add a search button as the first child, before the "Start Planning" `<Link>`:

```tsx
<button
  type="button"
  onClick={() => setSearchOpen(true)}
  aria-label="Search"
  className="inline-flex items-center justify-center w-10 h-10 rounded-md text-stone-700 hover:bg-stone-200/60 transition-colors"
>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
</button>
```

This button has no `md:` or `hidden` classes, so it's visible at every screen size — one implementation covers both the desktop nav row and the mobile header row (both share the same top-level right-side container).

- [ ] **Step 3: Render the overlay**

At the end of the `Nav()` function's returned JSX, right before the closing `</nav>` tag, add:

```tsx
<SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
```

- [ ] **Step 4: Verify it typechecks**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add components/landing/Nav.tsx
git commit -m "feat(search): add search icon and Cmd+K shortcut to the header"
```

---

### Task 11: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1: Run the full test suite**

Run: `npx vitest run`
Expected: all tests pass, including the new ones from Tasks 2, 3, 5, and 7.

- [ ] **Step 2: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors; no new warnings beyond whatever pre-existing warnings the repo already has.

- [ ] **Step 3: Manual browser verification**

Start the dev server and use the Browser pane to check, on `http://localhost:3000`:
1. Click the search icon in the header — the overlay opens, input is focused, "Popular" links show.
2. Press `Esc` — overlay closes.
3. Press `⌘K` (or `Ctrl+K`) from any page — overlay opens.
4. Type "tent" — results appear live, mixing guides/gear/skills.
5. Click the "Gear" chip — results narrow to only gear items; click one — opens Amazon in a new tab.
6. Click the "Guides" chip, then click a guide result — navigates to that guide page and the overlay closes.
7. Type a nonsense query (e.g. "zzzznonexistentzzzz") — the no-results state renders with a link to Guides.
8. Use `resize_window` to emulate mobile width — confirm the overlay still renders usably (centered panel with `pt-24` should still fit above the fold on common phone heights; if it looks cramped, note it for a follow-up rather than silently shipping a broken mobile layout).

- [ ] **Step 4: Check the production build**

Run: `npm run build`
Expected: build succeeds, and the build output includes `/search-index.json` as a static route (look for it in the route listing Next.js prints at the end of the build).

- [ ] **Step 5: Final commit if any fixes were needed**

If Step 3 or Step 4 surfaced any issues, fix them and commit:

```bash
git add -A
git commit -m "fix(search): address issues found in manual verification"
```

If no issues were found, this task requires no commit — it's a pure verification pass.

---

## Self-review notes

- Every task produces working, independently testable code — no task depends on a later task's code to compile or pass its own tests.
- `gear` results deliberately have external URLs (`getProductUrl()`) rather than internal paths, matching how every other gear-showing surface on the site already works (`GuideGearShelf`, `AffiliateBlock`, `RelatedGearBlock`) — this was the one open technical question the spec didn't pin down, resolved during planning by checking the existing gear-link convention.
- Type names and fields are consistent across all tasks: `SearchDocument`, `SearchDocType`, `SEARCH_TYPE_LABELS`, `createSearchEngine`, `searchDocuments`, `getSearchEngine` are defined once (Tasks 4 and 7) and referenced identically everywhere else (Tasks 5, 8, 9).
