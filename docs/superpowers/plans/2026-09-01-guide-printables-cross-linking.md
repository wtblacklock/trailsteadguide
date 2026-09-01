# Guide-Side Printables Cross-Linking Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Every guide page that has a genuinely relevant printable should surface it, and every printable page should show which guides use it — closing the last open piece of `docs/superpowers/specs/2026-08-30-printables-upgrade-design.md` §2.

**Architecture:** This is a scoped follow-up to that spec's cross-linking section, specifically the guide-page half that `docs/superpowers/plans/2026-08-30-quiz-end-printables-cross-linking.md` explicitly deferred ("The guide-page half of part 2 (40+ guides, a much larger curation task) is explicitly out of scope here"). The plan-page half is already shipped (`lib/printables/plan-printables.ts`, PR #54) and is the direct pattern this plan mirrors for the data/helper/reverse-lookup shape. For *where the block renders*, this plan follows the sibling-component convention already established by `GuideGearShelf` / `GuideArticleCTA` / `RelatedGuides` (each wired individually into every `app/guides/*/page.tsx` file) rather than the original spec's assumption that `GuidePage.tsx` could render it automatically with zero per-file changes — that assumption doesn't hold: `GuideGearShelf` and friends are NOT rendered from inside `GuidePage.tsx`, they're explicit siblings in each page file, and matching that existing convention keeps one cross-link mechanism from behaving invisibly differently than the other two.

**Curation:** 42 of the 47 real guides get 1-3 curated printables each (topical match against each guide's actual subject); 5 guides with no genuine match (`family-camping-on-a-budget`, `camping-with-dogs-first-time`, `how-to-pack-a-cooler`, `no-cook-camping-meals-kids`, `recreation-gov-reservation-strategy`) are left out, mirroring `GUIDE_GEAR`'s "not every guide needs an entry" sparse pattern rather than `PLAN_PRINTABLES`'s exhaustive one. All 15 printables end up reachable from at least one guide. The component is wired unconditionally into all 47 guide pages (including the 5 skipped ones) and self-guards to `null` when there's no entry — this exactly mirrors how `GuideGearShelf` is already unconditionally present and self-guards on an empty lookup, so there's no new "is this guide wired up or not" state for future editors to track.

**Tech Stack:** Next.js App Router (server components), TypeScript, Tailwind CSS, Vitest, Node (for the one-time codemod script in Task 4).

---

## Before you start

```bash
git log --oneline -1
```

This plan was written against `main` at commit `6cb9467` ("fix(guides): align tent guide's picks with the tents actually sold (#66)"). If `main` has moved since, rebase this branch onto the latest `origin/main` before starting.

```bash
git checkout main
git pull --ff-only
git checkout -b feat/guide-printables-cross-linking
```

(This plan is already being executed on branch `feat/guide-printables-cross-linking` in worktree `guide-printables-cross-linking` — skip the branch creation if you're continuing that session.)

---

## Task 1: Curated guide → printable data

**Files:**
- Create: `data/guide-printables.ts`
- Test: `lib/printables/__tests__/guide-printables.test.ts` (shared with Task 2 — written once, covers both files)

- [ ] **Step 1: Create the curated data file**

```ts
// data/guide-printables.ts
/**
 * Per-guide printable curation - which free printable(s) get surfaced on
 * each `/guides/<slug>/` page. Mirrors the `data/guide-gear.ts` pattern:
 * a plain slug -> slug[] map, sparse by design.
 *
 * Guides not present in this map render no printables section (same
 * "not every guide needs an entry" convention as GUIDE_GEAR - forcing a
 * printable onto a guide with no genuine topical match would just be
 * noise). Consumed by `getPrintablesForGuide()` in
 * `lib/printables/guide-printables.ts`.
 */
export const GUIDE_PRINTABLES: Record<string, string[]> = {
  'camping-for-beginners': ['backyard-test-checklist', 'leave-no-trace-quick-reference', 'fire-starting-checklist'],
  'how-to-plan-a-camping-trip': ['backyard-test-checklist', 'weather-signs-field-card'],
  'car-camping-beginner-guide': ['backyard-test-checklist', 'camp-first-aid-quick-reference'],
  'first-camping-trip-checklist': ['backyard-test-checklist', 'camp-first-aid-quick-reference', 'knot-reference-card'],
  'weekend-camping-packing-list': ['backyard-test-checklist'],
  'first-time-camping-mistakes': ['leave-no-trace-quick-reference', 'camp-first-aid-quick-reference'],
  'camping-with-kids-first-time': ['animal-track-id-card', 'nature-scavenger-hunt-card', 'shadow-puppet-hand-guide'],
  'camping-with-toddlers': ['kids-camping-packing-list'],
  'summer-camping-with-kids': ['kids-camping-packing-list', 'nature-scavenger-hunt-card'],
  'first-night-camping-guide': ['northern-hemisphere-constellation-wheel', 'night-sky-bingo'],
  'rainy-camping-trips': ['weather-signs-field-card'],
  'camping-in-a-heatwave': ['weather-signs-field-card'],
  'camping-when-the-weather-turns': ['weather-signs-field-card'],
  'spring-camping-for-beginners': ['weather-signs-field-card'],
  'summer-camping-for-beginners': ['nature-scavenger-hunt-card', 'night-sky-bingo'],
  'fall-camping-for-beginners': ['weather-signs-field-card', 'fire-starting-checklist'],
  'winter-camping-for-beginners': ['fire-starting-checklist', 'camp-first-aid-quick-reference'],
  'camping-in-texas-for-beginners': ['weather-signs-field-card', 'animal-track-id-card'],
  'camping-in-california-for-beginners': ['bear-bag-food-storage-card', 'leave-no-trace-quick-reference'],
  'camping-in-colorado-for-beginners': ['bear-bag-food-storage-card', 'weather-signs-field-card'],
  'camping-in-florida-for-beginners': ['weather-signs-field-card', 'animal-track-id-card'],
  'camping-in-the-pacific-northwest-for-beginners': ['bear-bag-food-storage-card', 'weather-signs-field-card'],
  'camping-in-the-desert-southwest-for-beginners': ['weather-signs-field-card', 'animal-track-id-card'],
  'camping-in-the-appalachians-for-beginners': ['bear-bag-food-storage-card', 'animal-track-id-card'],
  'camping-in-the-northeast-for-beginners': ['bear-bag-food-storage-card', 'weather-signs-field-card'],
  'family-camping-for-beginners': ['leave-no-trace-quick-reference', 'kids-camping-packing-list'],
  'backyard-camping-with-kids': ['backyard-test-checklist', 'shadow-puppet-hand-guide'],
  'how-to-choose-a-family-campsite': ['leave-no-trace-quick-reference'],
  'family-camping-gear-list': ['kids-camping-packing-list', 'backyard-test-checklist'],
  'best-family-tent-for-beginners': ['backyard-test-checklist'],
  'best-camping-sleeping-bag-for-kids': ['kids-camping-packing-list'],
  'how-to-set-up-a-tent': ['backyard-test-checklist', 'knot-reference-card'],
  'how-to-break-camp': ['leave-no-trace-quick-reference'],
  'best-tent-for-rainy-camping': ['weather-signs-field-card'],
  'best-tent-for-hot-weather': ['weather-signs-field-card'],
  'easy-family-camping-meals': ['camp-cooking-conversion-card', '3-day-camp-meal-planner'],
  'camping-meal-plan-family': ['3-day-camp-meal-planner', 'camp-cooking-conversion-card'],
  'campfire-recipes-for-kids': ['fire-starting-checklist', 'camp-cooking-conversion-card'],
  'how-to-start-a-campfire': ['fire-starting-checklist'],
  'best-state-parks-for-families': ['leave-no-trace-quick-reference', 'weather-signs-field-card'],
  'dispersed-camping-on-blm-and-national-forest-land': ['bear-bag-food-storage-card', 'leave-no-trace-quick-reference'],
  'labor-day-weekend-camping': ['weather-signs-field-card', 'camp-first-aid-quick-reference'],
}
```

- [ ] **Step 2: Commit**

```bash
git add data/guide-printables.ts
git commit -m "feat(printables): add curated guide-printable mapping data"
```

---

## Task 2: Resolver helpers + completeness tests

**Files:**
- Create: `lib/printables/guide-printables.ts`
- Modify: `lib/printables/index.ts`
- Create: `lib/printables/__tests__/guide-printables.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// lib/printables/__tests__/guide-printables.test.ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run lib/printables/__tests__/guide-printables.test.ts`
Expected: FAIL — `../guide-printables` module not found.

- [ ] **Step 3: Write the resolver module**

```ts
// lib/printables/guide-printables.ts
import { GUIDE_PRINTABLES } from '@/data/guide-printables'
import { getPrintableBySlug } from './data'
import type { Printable } from './types'

export { GUIDE_PRINTABLES }

/** Resolved printables for a guide, in curated order. Empty array if the guide has no entry. */
export function getPrintablesForGuide(guideSlug: string): Printable[] {
  const slugs = GUIDE_PRINTABLES[guideSlug] ?? []
  return slugs
    .map((slug) => getPrintableBySlug(slug))
    .filter((p): p is Printable => p !== null)
}

/**
 * Reverse lookup: every guide slug that lists the given printable.
 * Powers the "Guides that use this printable" section on /printables/[slug].
 */
export function getGuidesLinkedToPrintable(printableSlug: string): string[] {
  return Object.keys(GUIDE_PRINTABLES).filter((guideSlug) =>
    GUIDE_PRINTABLES[guideSlug].includes(printableSlug),
  )
}

/** Every printable slug referenced by at least one guide - used only by the completeness test. */
export function allGuidePrintableSlugs(): string[] {
  return Array.from(new Set(Object.values(GUIDE_PRINTABLES).flat()))
}
```

- [ ] **Step 4: Re-export from the barrel**

In `lib/printables/index.ts`, add:

```ts
export { getPrintablesForGuide, getGuidesLinkedToPrintable } from './guide-printables'
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run lib/printables/__tests__/guide-printables.test.ts`
Expected: PASS (7 tests, 42 of them from the `it.each` expansion)

- [ ] **Step 6: Commit**

```bash
git add lib/printables/guide-printables.ts lib/printables/index.ts lib/printables/__tests__/guide-printables.test.ts
git commit -m "feat(printables): add guide-printable resolver helpers"
```

---

## Task 3: `GuidePrintablesBlock` component

**Files:**
- Create: `components/guide/GuidePrintablesBlock.tsx`

Mirrors `components/plan/PrintablesForPlanBlock.tsx` (same card-grid visual pattern, same null-when-empty guard) adapted for a guide slug and guide-appropriate copy.

- [ ] **Step 1: Write the component**

```tsx
// components/guide/GuidePrintablesBlock.tsx
import Link from 'next/link'
import { getPrintablesForGuide } from '@/lib/printables'

type Props = {
  /** Guide slug (e.g. `'camping-for-beginners'`) - keys into GUIDE_PRINTABLES. */
  guideSlug: string
}

/**
 * Card grid of curated printables for a guide, rendered unconditionally
 * on every `/guides/*` page (same pattern as `GuideGearShelf`). Renders
 * nothing when the guide has no `GUIDE_PRINTABLES` entry.
 */
export default function GuidePrintablesBlock({ guideSlug }: Props) {
  const printables = getPrintablesForGuide(guideSlug)
  if (printables.length === 0) return null

  return (
    <section className="py-12 max-w-wide mx-auto px-6 border-t border-stone-200">
      <h2 className="text-2xl font-serif font-medium text-stone-900 mb-2">Free printables for this trip</h2>
      <p className="text-stone-500 text-sm mb-8">
        Analog reference cards you can print and pack - no phone, no signal needed at the campsite.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {printables.map((printable) => (
          <Link
            key={printable.slug}
            href={`/printables/${printable.slug}`}
            className="group flex flex-col gap-1 rounded-lg ring-1 ring-stone-200 bg-white px-5 py-4 hover:ring-stone-900 transition-colors"
          >
            <span className="text-[11px] tracking-[0.14em] uppercase text-stone-500">
              {printable.formatNote.split(' · ')[0]}
            </span>
            <span className="text-sm font-semibold text-stone-900 group-hover:text-stone-600 transition-colors">
              {printable.title}
            </span>
            <span className="text-sm text-stone-600 leading-relaxed line-clamp-2">
              {printable.description}
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <Link
          href="/printables"
          className="inline-flex items-center gap-1 text-sm font-medium text-stone-700 hover:text-stone-900"
        >
          Browse all printables
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no new errors (the component isn't wired into any page yet, so this only checks it compiles standalone).

- [ ] **Step 3: Commit**

```bash
git add components/guide/GuidePrintablesBlock.tsx
git commit -m "feat(printables): add GuidePrintablesBlock component"
```

---

## Task 4: Wire the block into every guide page

**Files:**
- Modify: all 47 files matching `app/guides/*/page.tsx` (every guide page except the dynamic `app/guides/[category]/page.tsx`, which isn't a single guide)

Every one of these files already has the identical structure confirmed during planning:
```
import GuideGearShelf from '@/components/guide/GuideGearShelf'
...
      </GuidePage>
      <GuideGearShelf guideSlug="<slug>" ... />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="<slug>" />
```
(indentation varies file-to-file between 4 and 6 spaces, but the three lines are always contiguous in that order). This task adds `GuidePrintablesBlock` **before** `GuideGearShelf` on all 47 pages (unconditionally - it self-guards to `null` on the 5 guides with no `GUIDE_PRINTABLES` entry), matching the plan-page precedent where `<PrintablesForPlanBlock>` also renders before `<AffiliateBlock>`.

This is a uniform mechanical edit across many files, so it's done with a one-time script rather than 47 hand-written diffs.

- [ ] **Step 1: Write the codemod script**

```js
// scripts/wire-guide-printables.mjs
// One-time codemod for Task 4 of docs/superpowers/plans/2026-09-01-guide-printables-cross-linking.md.
// Safe to delete after running - not part of the ongoing build.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const GUIDES_DIR = 'app/guides'
const IMPORT_LINE = "import GuidePrintablesBlock from '@/components/guide/GuidePrintablesBlock'"
const GEAR_IMPORT_RE = /^import GuideGearShelf from '@\/components\/guide\/GuideGearShelf'$/m
const GEAR_JSX_RE = /^(\s*)<GuideGearShelf guideSlug="([^"]+)"/m

let changed = 0
for (const entry of readdirSync(GUIDES_DIR, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name.startsWith('[')) continue
  const filePath = join(GUIDES_DIR, entry.name, 'page.tsx')
  let contents
  try {
    contents = readFileSync(filePath, 'utf8')
  } catch {
    continue // no page.tsx in this dir (e.g. the stray empty family-camping-checklist/ dir)
  }

  const gearImportMatch = GEAR_IMPORT_RE.exec(contents)
  const gearJsxMatch = GEAR_JSX_RE.exec(contents)
  if (!gearImportMatch || !gearJsxMatch) {
    console.warn(`SKIP (no GuideGearShelf found): ${filePath}`)
    continue
  }

  const [indent, guideSlug] = [gearJsxMatch[1], gearJsxMatch[2]]

  contents = contents.replace(GEAR_IMPORT_RE, `${gearImportMatch[0]}\n${IMPORT_LINE}`)
  contents = contents.replace(
    GEAR_JSX_RE,
    `${indent}<GuidePrintablesBlock guideSlug="${guideSlug}" />\n${gearJsxMatch[0]}`,
  )

  writeFileSync(filePath, contents)
  changed++
}

console.log(`Updated ${changed} guide page(s).`)
```

- [ ] **Step 2: Run it**

Run: `node scripts/wire-guide-printables.mjs`
Expected output: `Updated 47 guide page(s).` with no `SKIP` lines. If any `SKIP` lines appear, stop and investigate that file by hand before continuing - don't proceed with a partial run.

- [ ] **Step 3: Spot-check a few diffs**

```bash
git diff app/guides/camping-for-beginners/page.tsx app/guides/how-to-start-a-campfire/page.tsx app/guides/family-camping-on-a-budget/page.tsx
```

Confirm: the import line lands directly after the `GuideGearShelf` import, the JSX line lands directly before `<GuideGearShelf`, indentation matches the surrounding file, and `family-camping-on-a-budget` (a guide with no `GUIDE_PRINTABLES` entry) still gets the line added - it should, since the component self-guards at render time, not at wiring time.

- [ ] **Step 4: Typecheck and build**

Run: `npx tsc --noEmit`
Expected: clean.

Run: `npm run build`
Expected: succeeds, all 47 guide pages still present in the static output.

- [ ] **Step 5: Delete the one-time script and commit**

```bash
rm scripts/wire-guide-printables.mjs
git add -A
git commit -m "feat(printables): wire GuidePrintablesBlock into all 47 guide pages"
```

---

## Task 5: Reverse lookup on the printable page

**Files:**
- Modify: `app/printables/[slug]/page.tsx`

Adds a "Guides that use this printable" section, symmetric with the existing "Plans that use this printable" section immediately above it.

- [ ] **Step 1: Add the import**

In `app/printables/[slug]/page.tsx`, alongside the existing `getPlansLinkedToPrintable` import:

```ts
import { getGuidesLinkedToPrintable } from '@/lib/printables/guide-printables'
import { getGuideBySlug } from '@/lib/guides'
```

`getGuideBySlug` already exists (`lib/guides/helpers.ts`, re-exported from `lib/guides/index.ts`) — returns `Guide | null`, same shape as `getPrintableBySlug`. No new lookup function needed.

- [ ] **Step 2: Resolve linked guides**

Alongside the existing `linkedPlans` resolution in the page component body:

```ts
const linkedGuides = getGuidesLinkedToPrintable(printable.slug)
  .map((slug) => getGuideBySlug(slug))
  .filter((g): g is NonNullable<ReturnType<typeof getGuideBySlug>> => g !== null)
```

- [ ] **Step 3: Render the section**

Immediately after the existing `{linkedPlans.length > 0 && (...)}` block (same file, same visual pattern - copy its structure exactly, swapping in guides):

```tsx
{linkedGuides.length > 0 && (
  <section className="max-w-page mx-auto px-8 pb-16">
    <div className="max-w-3xl">
      <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-3">
        Guides that use this printable
      </p>
      <h2 className="font-serif text-2xl md:text-3xl font-semibold text-stone-950 tracking-tight mb-6">
        Read the guide, then print the card.
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {linkedGuides.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={`/guides/${guide.slug}`}
              className="group flex flex-col gap-1 rounded-lg ring-1 ring-stone-200 bg-white px-4 py-3 hover:ring-stone-900 transition-colors"
            >
              <span className="text-sm font-semibold text-stone-900 group-hover:text-stone-600 transition-colors">
                {guide.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
)}
```

- [ ] **Step 4: Typecheck and build**

Run: `npx tsc --noEmit && npm run build`
Expected: clean; spot-check `/printables/backyard-test-checklist` in the build output list (it should now be linked from several guides per Task 1's data).

- [ ] **Step 5: Commit**

```bash
git add app/printables/\[slug\]/page.tsx
git commit -m "feat(printables): add reverse guide lookup to printable pages"
```

---

## Task 6: Full verification

- [ ] **Step 1: Run the full test suite**

Run: `npx vitest run`
Expected: all tests pass, including the 7 new ones from Task 2 and every existing printable/guide test.

- [ ] **Step 2: Typecheck and lint**

Run: `npx tsc --noEmit && npx eslint .`
Expected: clean (pre-existing unrelated warnings, if any, are fine - no new errors).

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: succeeds, all guide pages and all printable pages present in the static route list.

- [ ] **Step 4: Manual browser verification**

Start the dev server and check, in the browser:
- A guide with several curated printables (e.g. `/guides/first-camping-trip-checklist`, 3 cards) shows the "Free printables for this trip" section positioned before the gear shelf, and each card links to the correct `/printables/<slug>` page.
- A guide with no entry (e.g. `/guides/family-camping-on-a-budget`) shows no printables section at all (no empty heading, no gap).
- A printable page that several guides link to (e.g. `/printables/backyard-test-checklist`) shows a "Guides that use this printable" section listing them, each linking to the right `/guides/<slug>` page.
- A printable with no guide link (if any remain after Task 1 - check by grepping `data/guide-printables.ts` for full coverage) shows no guides section.

- [ ] **Step 5: Final commit if any fixes were needed during verification**

If Step 4 surfaces anything, fix it, re-run Steps 1-4, then commit the fix separately with a clear message before moving on to review.
