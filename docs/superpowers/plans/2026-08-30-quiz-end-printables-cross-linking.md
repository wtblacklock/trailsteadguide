# Quiz-End Printables Cross-Linking & Thumbnail Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Every one of the 15 printables should be reachable from the plan page a visitor lands on after finishing the quiz, and every printable-thumbnail render site should actually render a thumbnail (not silently show nothing).

**Architecture:** This is a scoped follow-up to `docs/superpowers/specs/2026-08-30-printables-upgrade-design.md` part 2 (cross-linking) — specifically the plan-page half of it, prompted by an audit that found only 6 of 15 printables reachable from the quiz-end flow, all of them two clicks deep (Plan → Skill/Activity card → detail page → printable link), none directly on the plan page. The guide-page half of part 2 (40+ guides, a much larger curation task) is explicitly out of scope here.

Four independent fixes, in order of how much they depend on each other:
1. **Bug fix**: `components/printables/PrintableThumbnail.tsx` has a stale renderer map — only 5 of 15 printables have an entry, so 10 silently render no thumbnail wherever this component is used (confirmed live today: 5 skill pages already reference printables missing from this map).
2. **Regression test**: add a completeness check so any new printable that forgets to register in all three renderer maps (`PrintablePreview`, `PrintableThumbnail`, the print page's `ARTWORK_RENDERERS`) fails CI instead of silently shipping broken.
3. **Two missing activity→printable pairings**: `nature-scavenger-hunt` and `shadow-puppet-theatre` are already scheduled activities in existing plans, with matching printables that just aren't wired into `ACTIVITY_PRINTABLE_PAIRINGS`.
4. **Direct plan-page cross-linking**: a new `lib/printables/plan-printables.ts` with a curated, complete plan→printable mapping (covering all 15), a "Free printables for this trip" section on each of the 4 plan pages, and a reverse "Plans that use this printable" section on the printable landing page — mirroring the existing skill↔printable reverse-lookup pattern already in this codebase.

**Tech Stack:** Next.js App Router (server components for pages, `'use client'` only where the existing printable components already need it), React, Tailwind CSS, Vitest.

---

## Before you start

```bash
git log --oneline -1
```

This plan was written against `main` at commit `e7536b2` ("fix: repair print-overflow on 10 of 15 printables (#48)"). If `main` has moved since, rebase this branch onto the latest `origin/main` before starting.

```bash
git checkout main
git pull --ff-only
git checkout -b fix/quiz-end-printables-cross-linking
```

---

## Task 1: Fix the stale `PrintableThumbnail` renderer map

**Files:**
- Modify: `components/printables/PrintableThumbnail.tsx`

**Bug:** this file's `RENDERERS` map has only 5 of 15 printables. `components/printables/PrintableEmailGate.tsx` renders `<PrintableThumbnail>` when `showThumbnail` is true, and `components/skills/SkillDetail.tsx:227` passes `showThumbnail` on every skill page's "Analog companion" block. 5 skills already have a `relatedPrintableSlug` pointing at a printable missing from this map (`leave-no-trace-quick-reference`, `kids-camping-packing-list`, `weather-signs-field-card`, `bear-bag-food-storage-card`, `camp-first-aid-quick-reference` — see `lib/skills/data.ts` lines 2276, 2354, 2517, 2550, 2590, 2630, 2671) — those skill pages are live on `main` right now silently rendering an empty thumbnail box.

- [ ] **Step 1: Add the 10 missing imports and renderer entries**

Using the Edit tool on `components/printables/PrintableThumbnail.tsx`, replace:

```tsx
import ConstellationWheel from './ConstellationWheel'
import CookingConversionCard from './CookingConversionCard'
import BackyardTestChecklist from './BackyardTestChecklist'
import FireStartingChecklist from './FireStartingChecklist'
import KnotReferenceCard from './KnotReferenceCard'

const RENDERERS: Record<string, React.ComponentType> = {
  'northern-hemisphere-constellation-wheel': ConstellationWheel,
  'camp-cooking-conversion-card': CookingConversionCard,
  'backyard-test-checklist': BackyardTestChecklist,
  'fire-starting-checklist': FireStartingChecklist,
  'knot-reference-card': KnotReferenceCard,
}
```

with:

```tsx
import ConstellationWheel from './ConstellationWheel'
import CookingConversionCard from './CookingConversionCard'
import BackyardTestChecklist from './BackyardTestChecklist'
import FireStartingChecklist from './FireStartingChecklist'
import KnotReferenceCard from './KnotReferenceCard'
import AnimalTrackIdCard from './AnimalTrackIdCard'
import NatureScavengerHuntCard from './NatureScavengerHuntCard'
import NightSkyBingoCard from './NightSkyBingoCard'
import ShadowPuppetHandGuide from './ShadowPuppetHandGuide'
import KidsCampingPackingList from './KidsCampingPackingList'
import WeatherSignsCard from './WeatherSignsCard'
import BearBagFoodStorageCard from './BearBagFoodStorageCard'
import CampFirstAidQuickReference from './CampFirstAidQuickReference'
import LeaveNoTraceQuickReference from './LeaveNoTraceQuickReference'
import CampMealPlanner from './CampMealPlanner'

export const RENDERERS: Record<string, React.ComponentType> = {
  'northern-hemisphere-constellation-wheel': ConstellationWheel,
  'camp-cooking-conversion-card': CookingConversionCard,
  'backyard-test-checklist': BackyardTestChecklist,
  'fire-starting-checklist': FireStartingChecklist,
  'knot-reference-card': KnotReferenceCard,
  'animal-track-id-card': AnimalTrackIdCard,
  'nature-scavenger-hunt-card': NatureScavengerHuntCard,
  'night-sky-bingo': NightSkyBingoCard,
  'shadow-puppet-hand-guide': ShadowPuppetHandGuide,
  'kids-camping-packing-list': KidsCampingPackingList,
  'weather-signs-field-card': WeatherSignsCard,
  'bear-bag-food-storage-card': BearBagFoodStorageCard,
  'camp-first-aid-quick-reference': CampFirstAidQuickReference,
  'leave-no-trace-quick-reference': LeaveNoTraceQuickReference,
  '3-day-camp-meal-planner': CampMealPlanner,
}
```

Note the map is now `export const` (was module-private `const`) — Task 2's regression test needs to import it. This exactly mirrors the already-complete map in `components/printables/PrintablePreview.tsx` (copy the import list from there if you want to double check against a known-good reference — it has the identical 15 imports).

- [ ] **Step 2: Verify visually**

Start the dev server if not already running (`npm run dev`). Visit a skill page whose printable was previously missing, e.g. `http://localhost:3000/skills/hiking/hiking-with-kids` (the skill with `relatedPrintableSlug: 'kids-camping-packing-list'`, per `lib/skills/data.ts:2354` — confirm the exact category/skill slug by reading that skill's entry if the URL 404s, category+skill slug come from the two path segments in its `SKILLS` entry). Scroll to "Analog companion" and confirm a small packing-list thumbnail now renders instead of an empty 96×96px box.

- [ ] **Step 3: Lint**

Run: `npx eslint components/printables/PrintableThumbnail.tsx`
Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add components/printables/PrintableThumbnail.tsx
git commit -m "fix(printables): add 10 missing renderer entries to PrintableThumbnail

5 skill pages (relatedPrintableSlug pointing at leave-no-trace,
kids-camping-packing-list, weather-signs, bear-bag, camp-first-aid)
have been silently rendering an empty thumbnail box in their Analog
companion block since those printables shipped — this map was never
updated to match PrintablePreview.tsx's complete 15-entry version."
```

---

## Task 2: Add a renderer-completeness regression test

**Files:**
- Create: `lib/printables/__tests__/renderers.test.ts`
- Modify: `components/printables/PrintablePreview.tsx` (export the existing `RENDERERS` const)
- Modify: `app/printables/[slug]/print/page.tsx` (export the existing `ARTWORK_RENDERERS` const)

Task 1 fixed one instance of "a printable shipped without registering in every renderer map." This test prevents the next one from landing silently.

- [ ] **Step 1: Export `PrintablePreview`'s renderer map**

Using the Edit tool on `components/printables/PrintablePreview.tsx`, find:

```tsx
const RENDERERS: Record<string, React.ComponentType> = {
```

Replace with:

```tsx
export const RENDERERS: Record<string, React.ComponentType> = {
```

(Only that one line changes — the map's contents are already complete, don't touch them.)

- [ ] **Step 2: Export the print page's `ARTWORK_RENDERERS` map**

Using the Edit tool on `app/printables/[slug]/print/page.tsx`, find:

```tsx
const ARTWORK_RENDERERS: Record<string, React.ComponentType> = {
```

Replace with:

```tsx
export const ARTWORK_RENDERERS: Record<string, React.ComponentType> = {
```

- [ ] **Step 3: Write the test**

Create `lib/printables/__tests__/renderers.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { PRINTABLES } from '@/lib/printables'
import { RENDERERS as PREVIEW_RENDERERS } from '@/components/printables/PrintablePreview'
import { RENDERERS as THUMBNAIL_RENDERERS } from '@/components/printables/PrintableThumbnail'
import { ARTWORK_RENDERERS } from '@/app/printables/[slug]/print/page'

describe('printable renderer maps stay in sync with the registry', () => {
  const slugs = PRINTABLES.map((p) => p.slug)

  it.each(slugs)('%s has a PrintablePreview renderer', (slug) => {
    expect(PREVIEW_RENDERERS[slug], `PrintablePreview.tsx is missing a renderer for "${slug}"`).toBeDefined()
  })

  it.each(slugs)('%s has a PrintableThumbnail renderer', (slug) => {
    expect(THUMBNAIL_RENDERERS[slug], `PrintableThumbnail.tsx is missing a renderer for "${slug}"`).toBeDefined()
  })

  it.each(slugs)('%s has a print-page ARTWORK renderer', (slug) => {
    expect(ARTWORK_RENDERERS[slug], `app/printables/[slug]/print/page.tsx is missing a renderer for "${slug}"`).toBeDefined()
  })
})
```

- [ ] **Step 4: Run it to confirm it passes now that Task 1 landed**

Run: `npx vitest run lib/printables/__tests__/renderers.test.ts`
Expected: `Test Files 1 passed (1)`, `Tests 45 passed (45)` (15 printables × 3 maps).

- [ ] **Step 5: Prove the test actually catches the bug class it's meant to catch**

Temporarily comment out one entry in `THUMBNAIL_RENDERERS` (e.g. the `'night-sky-bingo': NightSkyBingoCard,` line in `components/printables/PrintableThumbnail.tsx`), re-run the same command, confirm exactly one test fails with the message `PrintableThumbnail.tsx is missing a renderer for "night-sky-bingo"`, then restore the line and re-run to confirm all 45 pass again.

- [ ] **Step 6: Lint**

Run: `npx eslint lib/printables/__tests__/renderers.test.ts components/printables/PrintablePreview.tsx "app/printables/[slug]/print/page.tsx"`
Expected: no output.

- [ ] **Step 7: Commit**

```bash
git add lib/printables/__tests__/renderers.test.ts components/printables/PrintablePreview.tsx "app/printables/[slug]/print/page.tsx"
git commit -m "test(printables): add renderer-map completeness check

Verified (then reverted) that this test actually catches a missing
renderer entry — it would have caught Task 1's bug before merge."
```

---

## Task 3: Wire the 2 missing activity→printable pairings

**Files:**
- Modify: `components/activities/ActivityDetail.tsx`

`nature-scavenger-hunt` and `shadow-puppet-theatre` are both already-scheduled activities in `lib/plan-templates.ts` (the former in `backyard-test` and `easy-family-basecamp`, the latter in `backyard-test` and `first-night-camp`), and both have a directly-matching printable already in the registry (`nature-scavenger-hunt-card`, `shadow-puppet-hand-guide`) that's currently only reachable by browsing `/printables` directly.

- [ ] **Step 1: Add the two entries**

Using the Edit tool on `components/activities/ActivityDetail.tsx`, find:

```tsx
const ACTIVITY_PRINTABLE_PAIRINGS: Record<string, string> = {
  'stargazing-constellation-hunt': 'northern-hemisphere-constellation-wheel',
}
```

Replace with:

```tsx
const ACTIVITY_PRINTABLE_PAIRINGS: Record<string, string> = {
  'stargazing-constellation-hunt': 'northern-hemisphere-constellation-wheel',
  'nature-scavenger-hunt': 'nature-scavenger-hunt-card',
  'shadow-puppet-theatre': 'shadow-puppet-hand-guide',
}
```

- [ ] **Step 2: Verify visually**

At `http://localhost:3000/activities/nature-scavenger-hunt` and `http://localhost:3000/activities/shadow-puppet-theatre`, confirm an "Analog companion" block now appears with the matching printable (and, since Task 1 landed first, an actual thumbnail rather than an empty box).

- [ ] **Step 3: Lint**

Run: `npx eslint components/activities/ActivityDetail.tsx`
Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add components/activities/ActivityDetail.tsx
git commit -m "feat(activities): pair nature scavenger hunt and shadow puppets with their printables

Both activities are already scheduled in existing plans; their
matching printable cards existed but weren't wired into the
activity-page companion block."
```

---

## Task 4: Curated plan→printable mapping + reverse lookup helper

**Files:**
- Create: `lib/printables/plan-printables.ts`
- Create: `lib/printables/__tests__/plan-printables.test.ts`

This is the data layer Task 5 and Task 6 both build on. The mapping below was curated by reading each plan's actual `recommendedSkills`, `activitySchedule`, and `safetyNotes` in `lib/plan-templates.ts` and matching to the printable whose content genuinely applies — every one of the 15 printables is placed on at least one plan.

- [ ] **Step 1: Write the file**

Create `lib/printables/plan-printables.ts`:

```ts
import type { PlanSlug } from '@/types'
import { PRINTABLES, getPrintableBySlug } from './data'
import type { Printable } from './types'

/**
 * Curated plan → printable slug mapping. Powers the "Free printables for
 * this trip" section on each plan page. Unlike the skill/activity
 * companion pairings (which surface a printable only if you click into a
 * specific skill or activity), every printable here is placed directly on
 * at least one plan page, so all 15 are reachable without leaving the
 * plan a visitor lands on after the quiz.
 *
 * Curated from each plan's actual recommendedSkills / activitySchedule /
 * safetyNotes in lib/plan-templates.ts — not a generic "show everything"
 * list.
 */
export const PLAN_PRINTABLES: Record<PlanSlug, string[]> = {
  'backyard-test': [
    'backyard-test-checklist',
    'northern-hemisphere-constellation-wheel',
    'nature-scavenger-hunt-card',
    'shadow-puppet-hand-guide',
    'knot-reference-card',
  ],
  'first-night-camp': [
    'camp-cooking-conversion-card',
    'fire-starting-checklist',
    'kids-camping-packing-list',
    'bear-bag-food-storage-card',
    'camp-first-aid-quick-reference',
  ],
  'first-weekend-camp': [
    'northern-hemisphere-constellation-wheel',
    'animal-track-id-card',
    'weather-signs-field-card',
    'bear-bag-food-storage-card',
    'leave-no-trace-quick-reference',
  ],
  'easy-family-basecamp': [
    '3-day-camp-meal-planner',
    'night-sky-bingo',
    'animal-track-id-card',
    'nature-scavenger-hunt-card',
    'camp-first-aid-quick-reference',
  ],
}

/** Resolved printables for a plan, in curated order. Drops unknown slugs defensively. */
export function getPrintablesForPlan(planSlug: PlanSlug): Printable[] {
  const slugs = PLAN_PRINTABLES[planSlug] ?? []
  return slugs
    .map((slug) => getPrintableBySlug(slug))
    .filter((p): p is Printable => p !== null)
}

/**
 * Reverse lookup: every plan (slug + title) that lists the given printable.
 * Powers the "Plans that use this printable" section on /printables/[slug].
 */
export function getPlansLinkedToPrintable(printableSlug: string): PlanSlug[] {
  return (Object.keys(PLAN_PRINTABLES) as PlanSlug[]).filter((planSlug) =>
    PLAN_PRINTABLES[planSlug].includes(printableSlug),
  )
}

/** Every printable slug referenced by at least one plan — used only by the completeness test below. */
export function allPlanPrintableSlugs(): string[] {
  return Array.from(new Set(Object.values(PLAN_PRINTABLES).flat()))
}
```

- [ ] **Step 2: Write the completeness + validity test**

Create `lib/printables/__tests__/plan-printables.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { PRINTABLES } from '@/lib/printables'
import { PLAN_PRINTABLES, getPrintablesForPlan, getPlansLinkedToPrintable, allPlanPrintableSlugs } from '../plan-printables'
import { PLAN_TEMPLATES } from '@/lib/plan-templates'
import type { PlanSlug } from '@/types'

describe('PLAN_PRINTABLES', () => {
  const planSlugs = Object.keys(PLAN_TEMPLATES) as PlanSlug[]

  it('has an entry for every plan in PLAN_TEMPLATES', () => {
    for (const slug of planSlugs) {
      expect(PLAN_PRINTABLES[slug], `no PLAN_PRINTABLES entry for plan "${slug}"`).toBeDefined()
    }
  })

  it.each(planSlugs)('%s lists 3-5 printables, all valid slugs', (planSlug) => {
    const slugs = PLAN_PRINTABLES[planSlug]
    expect(slugs.length, planSlug).toBeGreaterThanOrEqual(3)
    expect(slugs.length, planSlug).toBeLessThanOrEqual(5)
    for (const s of slugs) {
      expect(PRINTABLES.some((p) => p.slug === s), `${planSlug}: unknown printable slug "${s}"`).toBe(true)
    }
  })

  it('every one of the 15 printables is reachable from at least one plan', () => {
    const covered = new Set(allPlanPrintableSlugs())
    for (const p of PRINTABLES) {
      expect(covered.has(p.slug), `printable "${p.slug}" isn't linked from any plan`).toBe(true)
    }
  })

  it('getPrintablesForPlan resolves real Printable objects in curated order', () => {
    const resolved = getPrintablesForPlan('backyard-test')
    expect(resolved.map((p) => p.slug)).toEqual(PLAN_PRINTABLES['backyard-test'])
  })

  it('getPlansLinkedToPrintable is the true reverse of PLAN_PRINTABLES', () => {
    for (const p of PRINTABLES) {
      const plans = getPlansLinkedToPrintable(p.slug)
      for (const planSlug of plans) {
        expect(PLAN_PRINTABLES[planSlug]).toContain(p.slug)
      }
      // Every plan that lists this printable must show up in the reverse lookup.
      const expectedPlans = planSlugs.filter((s) => PLAN_PRINTABLES[s].includes(p.slug))
      expect(plans.sort()).toEqual(expectedPlans.sort())
    }
  })
})
```

- [ ] **Step 3: Run the tests**

Run: `npx vitest run lib/printables/__tests__/plan-printables.test.ts`
Expected: all pass (`4 plans` × `3-5 count/validity` test + 3 more suite-level tests).

- [ ] **Step 4: Lint**

Run: `npx eslint lib/printables/plan-printables.ts lib/printables/__tests__/plan-printables.test.ts`
Expected: no output.

- [ ] **Step 5: Commit**

```bash
git add lib/printables/plan-printables.ts lib/printables/__tests__/plan-printables.test.ts
git commit -m "feat(printables): add curated plan-printable mapping with bidirectional lookup

Every one of the 15 printables is now linked from at least one plan's
curated list, verified by a completeness test. This is the data layer
for the plan-page and printable-page cross-link sections in the next
two tasks."
```

---

## Task 5: "Free printables for this trip" section on plan pages

**Files:**
- Create: `components/plan/PrintablesForPlanBlock.tsx`
- Modify: `app/plans/[planId]/page.tsx`

- [ ] **Step 1: Write the component**

Create `components/plan/PrintablesForPlanBlock.tsx`:

```tsx
import Link from 'next/link'
import type { Printable } from '@/lib/printables'

interface Props {
  printables: Printable[]
}

export default function PrintablesForPlanBlock({ printables }: Props) {
  if (printables.length === 0) return null

  return (
    <section className="py-12 max-w-content mx-auto px-6">
      <h2 className="text-2xl font-serif font-medium text-stone-900 mb-2">Free printables for this trip</h2>
      <p className="text-stone-500 text-sm mb-8">
        Analog reference cards for this plan — no phone, no signal needed at the campsite.
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

This matches `components/plan/SkillsSummaryBlock.tsx`'s exact visual pattern (`py-12 max-w-content`, `grid grid-cols-1 md:grid-cols-2 gap-5`, "Browse all X" footer link with the same arrow SVG) — read that file for comparison if anything here looks inconsistent, it shouldn't.

- [ ] **Step 2: Wire it into the plan page**

Using the Edit tool on `app/plans/[planId]/page.tsx`, find:

```tsx
import SkillsSummaryBlock from '@/components/plan/SkillsSummaryBlock'
import SafetyNotes from '@/components/plan/SafetyNotes'
```

Replace with:

```tsx
import SkillsSummaryBlock from '@/components/plan/SkillsSummaryBlock'
import PrintablesForPlanBlock from '@/components/plan/PrintablesForPlanBlock'
import SafetyNotes from '@/components/plan/SafetyNotes'
```

Then find:

```tsx
import { generateIntro } from '@/lib/personalization/intro'
```

Replace with:

```tsx
import { generateIntro } from '@/lib/personalization/intro'
import { getPrintablesForPlan } from '@/lib/printables/plan-printables'
```

Then find:

```tsx
  const heroHook = generateIntro(out, plan.tagline)
```

Replace with:

```tsx
  const heroHook = generateIntro(out, plan.tagline)
  const printables = getPrintablesForPlan(slug)
```

Then find:

```tsx
          { id: 'skills', label: 'Skills' },
          { id: 'meals', label: 'Meals' },
```

Replace with:

```tsx
          { id: 'skills', label: 'Skills' },
          { id: 'printables', label: 'Printables' },
          { id: 'meals', label: 'Meals' },
```

Then find:

```tsx
      <div id="skills" className="scroll-mt-32">
        <SkillsSummaryBlock skillRefs={merged.recommendedSkills} />
      </div>
      <div id="meals" className="scroll-mt-32"><MealPlanAndShopping meals={merged.meals} defaultAdults={adults} defaultKids={kids} /></div>
```

Replace with:

```tsx
      <div id="skills" className="scroll-mt-32">
        <SkillsSummaryBlock skillRefs={merged.recommendedSkills} />
      </div>
      <div id="printables" className="scroll-mt-32">
        <PrintablesForPlanBlock printables={printables} />
      </div>
      <div id="meals" className="scroll-mt-32"><MealPlanAndShopping meals={merged.meals} defaultAdults={adults} defaultKids={kids} /></div>
```

- [ ] **Step 3: Verify all 4 plan pages**

At `http://localhost:3000/plans/backyard-test`, `/plans/first-night-camp`, `/plans/first-weekend-camp`, `/plans/easy-family-basecamp`: confirm a "Printables" jump-nav link appears, clicking it scrolls to a "Free printables for this trip" section with 5 cards each (real thumbnails not required here — this section is text/link cards, not thumbnails), and each card links to the correct `/printables/<slug>` page.

- [ ] **Step 4: Lint**

Run: `npx eslint components/plan/PrintablesForPlanBlock.tsx "app/plans/[planId]/page.tsx"`
Expected: no output.

- [ ] **Step 5: Run the full test suite**

Run: `npx vitest run`
Expected: same pass count as before this task, plus no new failures (this task adds no new tests itself — Task 4 already covers the data layer).

- [ ] **Step 6: Commit**

```bash
git add components/plan/PrintablesForPlanBlock.tsx "app/plans/[planId]/page.tsx"
git commit -m "feat(plans): add Free printables for this trip section to plan pages

Direct, one-click-from-quiz-result access to every plan's curated
printable set — previously the only path to any printable was two
clicks deep, through a skill or activity detail page."
```

---

## Task 6: Reverse "Plans that use this printable" section

**Files:**
- Modify: `app/printables/[slug]/page.tsx`

Mirrors the existing "Skills that use this printable" section on the same page (search for `getSkillsLinkedToPrintable` in that file to see the pattern this copies).

- [ ] **Step 1: Import the new helper and plan metadata**

Find:

```tsx
import { getSkillsLinkedToPrintable } from '@/lib/skills/helpers'
```

Replace with:

```tsx
import { getSkillsLinkedToPrintable } from '@/lib/skills/helpers'
import { getPlansLinkedToPrintable } from '@/lib/printables/plan-printables'
import { PLAN_TEMPLATES } from '@/lib/plan-templates'
```

- [ ] **Step 2: Resolve the linked plans**

Find:

```tsx
  const linkedSkills = getSkillsLinkedToPrintable(printable.slug)
```

Replace with:

```tsx
  const linkedSkills = getSkillsLinkedToPrintable(printable.slug)
  const linkedPlans = getPlansLinkedToPrintable(printable.slug)
```

- [ ] **Step 3: Add the section**

Find this exact block (the closing of the existing "Skills that use this printable" section, immediately followed by the CTA section):

```tsx
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="px-8 pb-24">
        <div className="bg-stone-900 rounded-3xl p-10 md:p-16 text-white">
          <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-4">
```

Replace with:

```tsx
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {linkedPlans.length > 0 && (
        <section className="max-w-page mx-auto px-8 pb-16">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-3">
              Plans that use this printable
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-stone-950 tracking-tight mb-6">
              Part of these trip plans.
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {linkedPlans.map((planSlug) => (
                <li key={planSlug}>
                  <Link
                    href={`/plans/${planSlug}`}
                    className="group flex flex-col gap-1 rounded-lg ring-1 ring-stone-200 bg-white px-4 py-3 hover:ring-stone-900 transition-colors"
                  >
                    <span className="text-sm font-semibold text-stone-900 group-hover:text-stone-600 transition-colors">
                      {PLAN_TEMPLATES[planSlug].title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="px-8 pb-24">
        <div className="bg-stone-900 rounded-3xl p-10 md:p-16 text-white">
          <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-4">
```

Note this last 3-line fragment (the CTA section's opening, which the `Find` block above also matched) is intentionally repeated verbatim at the end of the `Replace with` block — it was consumed by the `Find` match and must be put back immediately after the new section, otherwise the CTA section's opening would be deleted.

- [ ] **Step 4: Verify**

At `http://localhost:3000/printables/backyard-test-checklist` (referenced by exactly one plan, `backyard-test`) and `http://localhost:3000/printables/bear-bag-food-storage-card` (referenced by two plans, `first-night-camp` and `first-weekend-camp`), confirm the new "Plans that use this printable" section appears with the correct plan title(s), linking to the correct `/plans/<slug>` pages, and that the CTA section below it ("Want a real plan too") still renders normally and wasn't accidentally deleted.

- [ ] **Step 5: Lint**

Run: `npx eslint "app/printables/[slug]/page.tsx"`
Expected: no output.

- [ ] **Step 6: Commit**

```bash
git add "app/printables/[slug]/page.tsx"
git commit -m "feat(printables): add reverse Plans that use this printable section

Symmetric with the existing Skills that use this printable section —
every printable page now links back to whichever plan pages surface
it directly."
```

---

## Task 7: Full verification and PR

**Files:** none modified — this task only runs checks.

- [ ] **Step 1: Full test suite**

Run: `npx vitest run`
Expected: previous pass count (227, before this branch) + the new tests from Tasks 2 and 4 (45 + ~9 = ~54 new), all passing.

- [ ] **Step 2: Full lint**

Run: `npx eslint .`
Expected: 0 errors (pre-existing unrelated warnings are fine, same 5 as before this branch).

- [ ] **Step 3: Full production build**

Run: `npm run build`
Expected: exit 0, all 4 `/plans/[planId]` routes and all 15 `/printables/[slug]` routes build with no errors — this is the strongest signal that no renderer map or import is broken, since the print page's `ARTWORK_RENDERERS` (now exported) and every plan/printable page render at build time.

- [ ] **Step 4: Manual cross-check — every printable reachable in ≤1 click from some plan page**

For each of the 15 printable slugs, confirm it appears in at least one plan page's "Free printables for this trip" grid (Task 4's test already asserts this programmatically — this is a human-facing sanity spot check, pick 3-4 at random rather than all 15).

- [ ] **Step 5: Push and open a PR**

```bash
git push -u origin fix/quiz-end-printables-cross-linking
gh pr create --base main --title "fix: surface all 15 printables directly from plan pages" --body "$(cat <<'EOF'
## Summary
An audit (prompted by "make sure printables at the end of the quiz are
servicing correctly") found only 6 of 15 printables reachable from the
quiz-end plan pages, all two clicks deep (Plan → Skill/Activity card →
detail page → printable link), and a live bug: PrintableThumbnail.tsx's
renderer map was missing 10 of 15 printables, so 5 already-shipped
skill pages have been silently rendering empty thumbnails.

- Fixed PrintableThumbnail's stale renderer map (Task 1) + added a
  regression test across all 3 renderer maps so this can't recur
  silently (Task 2, verified to actually catch the bug class).
- Wired 2 already-scheduled activities (nature scavenger hunt, shadow
  puppets) to their existing but unlinked printables (Task 3).
- Added a curated plan→printable mapping covering all 15 printables
  (Task 4), a direct "Free printables for this trip" section on all 4
  plan pages (Task 5), and the reverse "Plans that use this printable"
  section on printable pages (Task 6).

Every printable is now reachable in one click from the plan page a
visitor lands on right after finishing the quiz.

## Test plan
- [x] `npx vitest run` — full suite + ~54 new tests pass
- [x] `npx eslint .` — clean
- [x] `npm run build` — clean, all plan and printable routes included
- [x] Verified live: previously-broken skill-page thumbnails now render
- [x] Verified live: all 4 plan pages show a 5-card printables section
- [x] Verified live: reverse plan links appear on printable pages

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```
