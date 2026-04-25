# Activities & Skills Integration into Trip Plans — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every Trip Plan answer the three questions — what to bring (gear), what to do (activities), how to do it (skills) — both on the results page and in the downloadable PDF.

**Architecture:** Extend `PlanTemplate` with three new fields (`recommendedActivities`, `recommendedSkills`, `activitySchedule`) and populate them for the four MVP plans. Build two new section components (`ActivityScheduleBlock`, `SkillsSummaryBlock`) that render on plan pages, replacing the existing generic `RecommendedActivities` block. Add two new PDF pages (`renderActivitiesPlan`, `renderSkillsUsed`) that flow from the existing Timeline. Skills-per-plan rationales live on the plan-skill relationship, not on the skill itself.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind, Vitest, Puppeteer-rendered HTML PDFs.

---

## Slug mapping — recorded for the record

The user spec uses descriptive activity/skill names. These map to real slugs from `lib/activities/data.ts` and `lib/skills/data.ts` as follows.

### Activities per plan

| Plan | Activity slugs | Day 1 | Day 2 |
|---|---|---|---|
| `easy-family-basecamp` | `nature-scavenger-hunt`, `camp-olympics`, `campfire-story-chain`, `flashlight-tag` | scavenger, olympics, story-chain | flashlight-tag |
| `first-night-camp` | `nature-scavenger-hunt`, `rock-skipping-contest`, `campfire-story-chain` | all three | — |
| `backyard-test` | `flashlight-tag`, `glow-stick-ring-toss`, `nature-scavenger-hunt`, `stargazing-constellation-hunt` | all four | — |
| `first-weekend-camp` | `trail-bingo`, `capture-the-flag`, `campfire-story-chain`, `flashlight-tag` | trail-bingo, capture-flag, story-chain | flashlight-tag |

### Skills per plan (slug = `category/skill`)

| Plan | Skill slugs |
|---|---|
| `easy-family-basecamp` | `camp-setup/setup-order`, `cooking/two-burner-stove-basics`, `knots/taut-line-hitch`, `fire/starting-a-fire` |
| `first-night-camp` | `shelter/pitching-a-tent`, `camp-setup/setup-order`, `cooking/two-burner-stove-basics` |
| `backyard-test` | `shelter/pitching-a-tent`, `knots/taut-line-hitch`, `knife-skills/safe-knife-handling` |
| `first-weekend-camp` | `camp-setup/campsite-layout`, `cooking/two-burner-stove-basics`, `fire/starting-a-fire`, `orienteering/compass-basics` |

### Gaps and ambiguities resolved

1. **"Backyard Camp Setup Challenge"** (backyard-test) — no matching activity in the dataset. **Omitted.** The plan template's `arrival` timeline already covers tent-up-as-rehearsal; an additional activity card would duplicate it. The 4 selected activities cover the energy mix without it.
2. **"Movie Night (projector)"** (backyard-test) — no matching activity, equipment-dependent, not outdoor-coded. **Omitted.** Replaced with `glow-stick-ring-toss` (true outdoor wind-down) and `stargazing-constellation-hunt` (low-energy wind-down).
3. **"Optional night game"** (first-weekend-camp) — vague. **Resolved to `flashlight-tag`** (best night-game match in the dataset, scheduled on day 2).
4. **"Simple Scavenger Hunt"** (first-night-camp) and **"Mini Scavenger Hunt"** (backyard-test) — same activity, different framing. Use `nature-scavenger-hunt`. The "simple"/"mini" framing belongs in copy, not a separate activity.
5. **"Fire Basics" / "Fire Building"** — multiple candidates in `fire/`. **Picked `fire/starting-a-fire`** (action-oriented; matches "how do I do it").
6. **"Camp Setup Basics" / "Camp Setup"** — two candidates: `setup-order` (when/in-what-order) vs `campsite-layout` (where each zone goes). **`setup-order`** for first-trip plans (basecamp, first-night). **`campsite-layout`** for first-weekend-camp where two-night layout strategy matters more.
7. **"Basic Lighting / Camp Setup"** (first-night-camp) — no separate "Basic Lighting" skill. **Resolved to `camp-setup/setup-order`**, which covers lantern hanging, headlamp placement, and clothesline routing.
8. **"Basic Knots (intro)" / "Basic Knots (taut-line hitch)"** — spec already names taut-line. **Use `knots/taut-line-hitch`** for both plans that mention knots.

---

## File Structure

**New files:**
- `components/plan/ActivityScheduleBlock.tsx` — "What You'll Do" section with day-grouped activity cards.
- `components/plan/SkillsSummaryBlock.tsx` — "Skills You'll Use" section with skill cards plus per-plan rationale.
- `lib/__tests__/plan-templates.test.ts` — shape validation for the new plan fields.

**Modified files:**
- `types/index.ts` — add `PlanSkillRef`, `PlanActivitySchedule` types; extend `PlanTemplate`.
- `lib/plan-templates.ts` — populate new fields for the four plans.
- `lib/skills/helpers.ts` — add `getSkillByRef` helper that takes a slash-separated `category/skill` slug.
- `app/plan/easy-family-basecamp/page.tsx` — replace `RecommendedActivities` with `ActivityScheduleBlock`; add `SkillsSummaryBlock`; update jump nav.
- `app/plan/first-night-camp/page.tsx` — same.
- `app/plan/backyard-test/page.tsx` — same.
- `app/plan/first-weekend-camp/page.tsx` — same.
- `lib/pdf/template.ts` — insert `renderActivitiesPlan` + `renderSkillsUsed` between Timeline and Packing.
- `lib/pdf/styles.ts` — add CSS for the two new PDF page layouts.

`KidActivityPlan` (the existing free-text per-template list) is **kept** — it serves a different purpose (age-targeted vignettes) than the new curated cards. A future cleanup may merge them; out of scope here.

---

## Task 1: Add plan-relationship types

**Files:**
- Modify: `types/index.ts`

- [ ] **Step 1: Add the new types**

In `types/index.ts`, after the existing `ActivityItem` type (line ~60), add:

```typescript
/**
 * A reference from a plan to a curated skill, with a per-plan rationale
 * explaining why the skill matters for THIS trip. The rationale belongs to
 * the plan-skill relationship, not to the skill itself, so different plans
 * can frame the same skill differently.
 */
export type PlanSkillRef = {
  /** Slash-separated `categorySlug/skillSlug`, e.g. 'knots/taut-line-hitch'. */
  skillSlug: string
  rationale: string
}

export type PlanActivitySchedule = {
  /** Activity slugs scheduled for day 1. */
  day1: string[]
  /** Optional day 2 schedule. Single-night plans omit this. */
  day2?: string[]
}
```

Then extend `PlanTemplate` (currently lines 96–110) by adding three required fields just below `meals`:

```typescript
export type PlanTemplate = {
  slug: PlanSlug
  title: string
  tagline: string
  heroImage: string
  tripSummary: string
  preTrip: TimelineItem[]
  arrival: TimelineItem[]
  evening: TimelineItem[]
  morning: TimelineItem[]
  gear: GearItem[]
  activities: ActivityItem[]
  safetyNotes: string[]
  meals: Meal[]
  /** Activity slugs curated for this plan (3–5 total). */
  recommendedActivities: string[]
  /** Skills curated for this plan, with per-plan rationale (3–4 max). */
  recommendedSkills: PlanSkillRef[]
  /** Day-by-day activity schedule. Each slug must appear in `recommendedActivities`. */
  activitySchedule: PlanActivitySchedule
}
```

- [ ] **Step 2: Run type check to confirm the four plans are flagged**

Run: `npx tsc --noEmit`
Expected: Type errors on every entry of `PLAN_TEMPLATES` (missing required fields). This proves the type wiring is in place. We populate the data in Task 2.

- [ ] **Step 3: Commit**

```bash
git add types/index.ts
git commit -m "feat(plans): add type fields for curated activities and skills"
```

---

## Task 2: Populate the four plans

**Files:**
- Modify: `lib/plan-templates.ts`

- [ ] **Step 1: Add the new fields to `easy-family-basecamp`**

Find the `'easy-family-basecamp'` entry (line ~323). After the `safetyNotes` array (which ends around line 443), and before the closing `},` of the entry (line ~444), add:

```typescript
    recommendedActivities: [
      'nature-scavenger-hunt',
      'camp-olympics',
      'campfire-story-chain',
      'flashlight-tag',
    ],
    recommendedSkills: [
      {
        skillSlug: 'camp-setup/setup-order',
        rationale:
          'A multi-night basecamp lives or dies on a calm, ordered first hour. Run this once and the rest of the trip self-organizes.',
      },
      {
        skillSlug: 'cooking/two-burner-stove-basics',
        rationale:
          'Real meals are the point of this plan — the two-burner stove is the workhorse for every breakfast and dinner.',
      },
      {
        skillSlug: 'knots/taut-line-hitch',
        rationale:
          'Your canopy and tent guy lines need to stay taut for three nights, even after dew or rain. This is the knot that does it.',
      },
      {
        skillSlug: 'fire/starting-a-fire',
        rationale:
          'Comfortable fire time after dinner is the trip’s emotional anchor — light it cleanly the first time, every night.',
      },
    ],
    activitySchedule: {
      day1: ['nature-scavenger-hunt', 'camp-olympics', 'campfire-story-chain'],
      day2: ['flashlight-tag'],
    },
```

- [ ] **Step 2: Add the new fields to `first-night-camp`**

Find the `'first-night-camp'` entry (line ~81). After its `safetyNotes`, add:

```typescript
    recommendedActivities: [
      'nature-scavenger-hunt',
      'rock-skipping-contest',
      'campfire-story-chain',
    ],
    recommendedSkills: [
      {
        skillSlug: 'shelter/pitching-a-tent',
        rationale:
          'Tent up first means your kids have a base before anything else can go wrong. Practice this once before you arrive.',
      },
      {
        skillSlug: 'camp-setup/setup-order',
        rationale:
          'Beat the dark on a one-night trip. The right order means dinner is on the stove before headlamps come on.',
      },
      {
        skillSlug: 'cooking/two-burner-stove-basics',
        rationale:
          'One simple dinner, cooked outside — that’s the moment the trip flips from anxious to fun.',
      },
    ],
    activitySchedule: {
      day1: ['nature-scavenger-hunt', 'rock-skipping-contest', 'campfire-story-chain'],
    },
```

- [ ] **Step 3: Add the new fields to `backyard-test`**

Find the `'backyard-test'` entry (line ~5). After its `safetyNotes`, add:

```typescript
    recommendedActivities: [
      'flashlight-tag',
      'glow-stick-ring-toss',
      'nature-scavenger-hunt',
      'stargazing-constellation-hunt',
    ],
    recommendedSkills: [
      {
        skillSlug: 'shelter/pitching-a-tent',
        rationale:
          'The whole point of this night is rehearsing the tent. Pitch it as if your campsite was 50 miles away, not 50 feet.',
      },
      {
        skillSlug: 'knots/taut-line-hitch',
        rationale:
          'A loose guy line is a saggy fly is a wet floor at 3 a.m. Practice tightening guy lines now, in your yard.',
      },
      {
        skillSlug: 'knife-skills/safe-knife-handling',
        rationale:
          'If you’ll let kids near a knife on a real trip, the rules need to land here first — somewhere with no consequences.',
      },
    ],
    activitySchedule: {
      day1: [
        'flashlight-tag',
        'glow-stick-ring-toss',
        'nature-scavenger-hunt',
        'stargazing-constellation-hunt',
      ],
    },
```

- [ ] **Step 4: Add the new fields to `first-weekend-camp`**

Find the `'first-weekend-camp'` entry (line ~197). After its `safetyNotes`, add:

```typescript
    recommendedActivities: [
      'trail-bingo',
      'capture-the-flag',
      'campfire-story-chain',
      'flashlight-tag',
    ],
    recommendedSkills: [
      {
        skillSlug: 'camp-setup/campsite-layout',
        rationale:
          'Two nights means a real layout — sleep, kitchen, fire — that supports an active weekend without re-doing it.',
      },
      {
        skillSlug: 'cooking/two-burner-stove-basics',
        rationale:
          'Five meals over the weekend lean on the stove. Knowing it cold makes Saturday breakfast effortless.',
      },
      {
        skillSlug: 'fire/starting-a-fire',
        rationale:
          'Saturday’s centerpiece dinner expects a coal bed — getting the fire right early is what makes the day work.',
      },
      {
        skillSlug: 'orienteering/compass-basics',
        rationale:
          'Saturday’s day-hike is the weekend’s main event. Compass + map keeps a marked trail confident and an off-trail spur found.',
      },
    ],
    activitySchedule: {
      day1: ['trail-bingo', 'capture-the-flag', 'campfire-story-chain'],
      day2: ['flashlight-tag'],
    },
```

- [ ] **Step 5: Run type check to confirm clean**

Run: `npx tsc --noEmit`
Expected: PASS — no type errors.

- [ ] **Step 6: Commit**

```bash
git add lib/plan-templates.ts
git commit -m "feat(plans): populate activities and skills for the four MVP plans"
```

---

## Task 3: Add `getSkillByRef` helper

**Files:**
- Modify: `lib/skills/helpers.ts`
- Test: `lib/skills/__tests__/helpers.test.ts`

- [ ] **Step 1: Write the failing test**

Open `lib/skills/__tests__/helpers.test.ts` and look at the existing tests to match style. Then append:

```typescript
import { getSkillByRef } from '../helpers'

describe('getSkillByRef', () => {
  it('returns skill + category for a valid category/skill slug', () => {
    const result = getSkillByRef('knots/taut-line-hitch')
    expect(result).not.toBeNull()
    expect(result!.skill.slug).toBe('taut-line-hitch')
    expect(result!.skill.category).toBe('knots')
    expect(result!.category.slug).toBe('knots')
    expect(result!.category.id).toBe('knots')
  })

  it('returns null for an unknown category', () => {
    expect(getSkillByRef('made-up/whatever')).toBeNull()
  })

  it('returns null for an unknown skill in a real category', () => {
    expect(getSkillByRef('knots/no-such-knot')).toBeNull()
  })

  it('returns null for a malformed slug (no slash)', () => {
    expect(getSkillByRef('taut-line-hitch')).toBeNull()
  })

  it('returns null for an empty string', () => {
    expect(getSkillByRef('')).toBeNull()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run lib/skills/__tests__/helpers.test.ts -t getSkillByRef`
Expected: FAIL — "getSkillByRef is not a function" or import error.

- [ ] **Step 3: Implement `getSkillByRef`**

Edit `lib/skills/helpers.ts`. Add at the bottom (before the re-export line):

```typescript
/**
 * Look up a skill by its plan-template reference slug, e.g.
 * `knots/taut-line-hitch`. Returns null for malformed slugs,
 * unknown categories, or unknown skills.
 */
export function getSkillByRef(
  ref: string,
): { skill: Skill; category: SkillCategory } | null {
  const slash = ref.indexOf('/')
  if (slash <= 0 || slash === ref.length - 1) return null
  const categorySlug = ref.slice(0, slash)
  const skillSlug = ref.slice(slash + 1)
  const category = getCategoryBySlug(categorySlug)
  if (!category) return null
  const skill = getSkillBySlugs(categorySlug, skillSlug)
  if (!skill) return null
  return { skill, category }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run lib/skills/__tests__/helpers.test.ts -t getSkillByRef`
Expected: PASS, 5 tests.

- [ ] **Step 5: Commit**

```bash
git add lib/skills/helpers.ts lib/skills/__tests__/helpers.test.ts
git commit -m "feat(skills): add getSkillByRef helper for plan-template refs"
```

---

## Task 4: Plan-template integrity tests

**Files:**
- Create: `lib/__tests__/plan-templates.test.ts`

- [ ] **Step 1: Write the test file**

```typescript
import { describe, expect, it } from 'vitest'
import { PLAN_TEMPLATES } from '@/lib/plan-templates'
import { getActivityBySlug } from '@/lib/activities/data'
import { getSkillByRef } from '@/lib/skills/helpers'

describe('PLAN_TEMPLATES — activities & skills integrity', () => {
  const entries = Object.entries(PLAN_TEMPLATES)

  it.each(entries)('%s has 3-5 recommendedActivities', (slug, plan) => {
    expect(plan.recommendedActivities.length, `${slug}`).toBeGreaterThanOrEqual(3)
    expect(plan.recommendedActivities.length, `${slug}`).toBeLessThanOrEqual(5)
  })

  it.each(entries)('%s has 3-4 recommendedSkills', (slug, plan) => {
    expect(plan.recommendedSkills.length, `${slug}`).toBeGreaterThanOrEqual(3)
    expect(plan.recommendedSkills.length, `${slug}`).toBeLessThanOrEqual(4)
  })

  it.each(entries)('%s — every recommendedActivities slug resolves', (slug, plan) => {
    for (const s of plan.recommendedActivities) {
      expect(getActivityBySlug(s), `${slug}: missing activity ${s}`).not.toBeNull()
    }
  })

  it.each(entries)('%s — every recommendedSkills slug resolves', (slug, plan) => {
    for (const ref of plan.recommendedSkills) {
      expect(getSkillByRef(ref.skillSlug), `${slug}: missing skill ${ref.skillSlug}`).not.toBeNull()
    }
  })

  it.each(entries)('%s — every skill ref has a non-empty rationale', (slug, plan) => {
    for (const ref of plan.recommendedSkills) {
      expect(ref.rationale.trim().length, `${slug}: ${ref.skillSlug} rationale`).toBeGreaterThan(0)
    }
  })

  it.each(entries)('%s — activitySchedule slugs are subset of recommendedActivities', (slug, plan) => {
    const recommended = new Set(plan.recommendedActivities)
    const scheduled = [
      ...plan.activitySchedule.day1,
      ...(plan.activitySchedule.day2 ?? []),
    ]
    for (const s of scheduled) {
      expect(recommended.has(s), `${slug}: ${s} scheduled but not recommended`).toBe(true)
    }
  })

  it.each(entries)('%s — every recommended activity is scheduled at least once', (slug, plan) => {
    const scheduled = new Set([
      ...plan.activitySchedule.day1,
      ...(plan.activitySchedule.day2 ?? []),
    ])
    for (const s of plan.recommendedActivities) {
      expect(scheduled.has(s), `${slug}: ${s} recommended but never scheduled`).toBe(true)
    }
  })
})
```

- [ ] **Step 2: Run test to verify it passes**

Run: `npx vitest run lib/__tests__/plan-templates.test.ts`
Expected: PASS, 28 tests (7 it.each × 4 plans).

- [ ] **Step 3: Commit**

```bash
git add lib/__tests__/plan-templates.test.ts
git commit -m "test(plans): cover activities and skills data integrity"
```

---

## Task 5: Build `ActivityScheduleBlock`

**Files:**
- Create: `components/plan/ActivityScheduleBlock.tsx`

- [ ] **Step 1: Write the component**

```tsx
import Link from 'next/link'
import { getActivityBySlug } from '@/lib/activities/data'
import type { PlanActivitySchedule } from '@/types'
import ActivityCard from '@/components/activities/ActivityCard'

interface Props {
  schedule: PlanActivitySchedule
  /** Used to title day groups. Single-night plans pass `false`. */
  showDayHeadings?: boolean
}

export default function ActivityScheduleBlock({ schedule, showDayHeadings = true }: Props) {
  const day1 = schedule.day1.map(getActivityBySlug).filter((a): a is NonNullable<typeof a> => a !== null)
  const day2 = (schedule.day2 ?? [])
    .map(getActivityBySlug)
    .filter((a): a is NonNullable<typeof a> => a !== null)

  if (day1.length === 0 && day2.length === 0) return null

  const groups: { heading: string | null; items: typeof day1 }[] = day2.length
    ? [
        { heading: showDayHeadings ? 'Day 1' : null, items: day1 },
        { heading: showDayHeadings ? 'Day 2' : null, items: day2 },
      ]
    : [{ heading: null, items: day1 }]

  return (
    <section className="py-12 max-w-content mx-auto px-6">
      <h2 className="text-2xl font-serif font-medium text-stone-900 mb-2">What you&rsquo;ll do</h2>
      <p className="text-stone-500 text-sm mb-8">
        A short, balanced lineup for this trip. Tap any card for full instructions.
      </p>
      <div className="space-y-10">
        {groups.map((g, i) => (
          <div key={i}>
            {g.heading && (
              <p className="text-xs uppercase tracking-widest text-[#2d5016] font-semibold mb-4">
                {g.heading}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {g.items.map((a) => (
                <ActivityCard key={a.slug} activity={a} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link
          href="/activities"
          className="inline-flex items-center gap-1 text-sm font-medium text-stone-700 hover:text-stone-900"
        >
          Browse all activities
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

- [ ] **Step 2: Commit**

```bash
git add components/plan/ActivityScheduleBlock.tsx
git commit -m "feat(plan): add ActivityScheduleBlock component"
```

---

## Task 6: Build `SkillsSummaryBlock`

**Files:**
- Create: `components/plan/SkillsSummaryBlock.tsx`

- [ ] **Step 1: Write the component**

```tsx
import Link from 'next/link'
import { getSkillByRef } from '@/lib/skills/helpers'
import type { PlanSkillRef } from '@/types'
import SkillCard from '@/components/skills/SkillCard'

interface Props {
  skillRefs: PlanSkillRef[]
}

export default function SkillsSummaryBlock({ skillRefs }: Props) {
  const resolved = skillRefs
    .map((ref) => {
      const found = getSkillByRef(ref.skillSlug)
      return found ? { ...found, rationale: ref.rationale } : null
    })
    .filter((r): r is NonNullable<typeof r> => r !== null)

  if (resolved.length === 0) return null

  return (
    <section className="py-12 max-w-content mx-auto px-6">
      <h2 className="text-2xl font-serif font-medium text-stone-900 mb-2">Skills you&rsquo;ll use</h2>
      <p className="text-stone-500 text-sm mb-8">
        The handful of camp skills this trip leans on. Each card opens a step-by-step guide.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {resolved.map(({ skill, category, rationale }) => (
          <div key={`${category.slug}/${skill.slug}`} className="flex flex-col gap-3">
            <SkillCard skill={skill} category={category} showCategory />
            <p className="text-sm text-stone-700 leading-relaxed px-1">
              <span className="font-semibold text-stone-900">Why for this trip: </span>
              {rationale}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link
          href="/skills"
          className="inline-flex items-center gap-1 text-sm font-medium text-stone-700 hover:text-stone-900"
        >
          Browse all skills
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

- [ ] **Step 2: Commit**

```bash
git add components/plan/SkillsSummaryBlock.tsx
git commit -m "feat(plan): add SkillsSummaryBlock component"
```

---

## Task 7: Wire components into the four plan pages

**Files:**
- Modify: `app/plan/easy-family-basecamp/page.tsx`
- Modify: `app/plan/first-night-camp/page.tsx`
- Modify: `app/plan/backyard-test/page.tsx`
- Modify: `app/plan/first-weekend-camp/page.tsx`

The same five edits apply to each page. Below is the recipe for `easy-family-basecamp`; replicate for the others.

- [ ] **Step 1: Update imports in `easy-family-basecamp/page.tsx`**

Replace:
```tsx
import RecommendedActivities from '@/components/activities/RecommendedActivities'
```
with:
```tsx
import ActivityScheduleBlock from '@/components/plan/ActivityScheduleBlock'
import SkillsSummaryBlock from '@/components/plan/SkillsSummaryBlock'
```

- [ ] **Step 2: Update jump nav links**

Find the `<PlanJumpNav links={...}>` block and update so `Activities` becomes `What You'll Do`, plus a new `Skills` link before `Meals`:

```tsx
<PlanJumpNav
  links={[
    { id: 'timeline', label: 'Timeline' },
    { id: 'gear', label: 'Gear' },
    { id: 'activities', label: 'What You’ll Do' },
    { id: 'skills', label: 'Skills' },
    { id: 'meals', label: 'Meals' },
    { id: 'safety', label: 'Safety' },
    ...(products.length > 0 ? [{ id: 'shop', label: 'Shop' }] : []),
  ]}
/>
```

- [ ] **Step 3: Replace activities and add skills block**

Find the `<div id="activities" ...>` block. Replace its `<RecommendedActivities ... />` with the schedule block, and add a new `skills` div right after:

```tsx
<div id="activities" className="scroll-mt-32">
  <KidActivityPlan activities={activityItems} />
  <ActivityScheduleBlock schedule={plan.activitySchedule} />
</div>
<div id="skills" className="scroll-mt-32">
  <SkillsSummaryBlock skillRefs={plan.recommendedSkills} />
</div>
```

- [ ] **Step 4: Repeat steps 1–3 for the other three pages**

Apply the same three edits to:
- `app/plan/first-night-camp/page.tsx`
- `app/plan/backyard-test/page.tsx`
- `app/plan/first-weekend-camp/page.tsx`

The existing pages call `RecommendedActivities` with different `kidsAgeGroups` — those props are no longer used by `ActivityScheduleBlock`, which derives its content from `plan.activitySchedule` directly. The `parsePartySize` block above stays exactly as-is; `adults` and `kids` are still used by `MealPlanAndShopping`, `TripPackCta`, and `FloatingEmailBar`.

- [ ] **Step 5: Run type check + tests**

Run: `npx tsc --noEmit && npm test`
Expected: PASS.

- [ ] **Step 6: Visual verification — start dev server**

Run: `npm run dev` (background). Then in a browser preview:
1. Visit `/plan/easy-family-basecamp` — confirm the new "What you'll do" section shows Day 1 / Day 2 groups with 3 + 1 cards. Confirm the "Skills you'll use" section shows 4 skill cards each with a rationale below.
2. Visit `/plan/first-night-camp` — confirm 3 activity cards, no day heading, 3 skill cards.
3. Visit `/plan/backyard-test` — confirm 4 activity cards (single group), 3 skill cards.
4. Visit `/plan/first-weekend-camp` — confirm Day 1 (3 cards) + Day 2 (1 card), 4 skill cards.
5. Click one activity card and one skill card — confirm both navigate to working detail routes.
6. Click "What You'll Do" and "Skills" entries in the jump nav — confirm they scroll to the right sections.

Capture a screenshot of `/plan/easy-family-basecamp` showing both new sections.

- [ ] **Step 7: Commit**

```bash
git add app/plan
git commit -m "feat(plan): replace RecommendedActivities with curated What-You'll-Do and Skills sections"
```

---

## Task 8: PDF — render Activities Plan and Skills Used pages

**Files:**
- Modify: `lib/pdf/template.ts`

- [ ] **Step 1: Add the two render functions**

In `lib/pdf/template.ts`, add these helpers above the existing `formatParty` definition at the bottom of the file:

```typescript
import { getActivityBySlug } from '@/lib/activities/data'
import { getSkillByRef } from '@/lib/skills/helpers'

function renderActivitiesPlan(plan: typeof PLAN_TEMPLATES[string]): string {
  const day1 = plan.activitySchedule.day1
    .map(getActivityBySlug)
    .filter((a): a is NonNullable<typeof a> => a !== null)
  const day2 = (plan.activitySchedule.day2 ?? [])
    .map(getActivityBySlug)
    .filter((a): a is NonNullable<typeof a> => a !== null)

  const groupHtml = (heading: string | null, items: typeof day1) => {
    if (items.length === 0) return ''
    const cards = items
      .map(
        (a) => `
        <div class="activity-pdf-card">
          <p class="activity-pdf-title">${escapeHtml(a.title)}</p>
          <p class="activity-pdf-tagline">${escapeHtml(a.tagline)}</p>
          <div class="activity-pdf-badges">
            <span>${escapeHtml(a.timeRequired)}</span>
            <span>${escapeHtml(a.energyLevel)} energy</span>
            <span>${escapeHtml(a.groupSize)}</span>
          </div>
          <p class="activity-pdf-preview">${escapeHtml(a.instructions[0] ?? '')}</p>
        </div>`,
      )
      .join('')
    return `
      ${heading ? `<p class="activity-pdf-day">${escapeHtml(heading)}</p>` : ''}
      <div class="activity-pdf-grid">${cards}</div>`
  }

  const groups = day2.length
    ? `${groupHtml('Day 1', day1)}${groupHtml('Day 2', day2)}`
    : groupHtml(null, day1)

  return `
  <div class="page">
    <p class="section-eyebrow">Your activities plan</p>
    <h2 class="section-title">What you&rsquo;ll do</h2>
    <p class="section-lede">A short, balanced lineup. Full step-by-step instructions live on trailsteadguide.com/activities.</p>
    ${groups}
    ${footer('Activities plan')}
  </div>`
}

function renderSkillsUsed(plan: typeof PLAN_TEMPLATES[string]): string {
  const blocks = plan.recommendedSkills
    .map((ref) => {
      const found = getSkillByRef(ref.skillSlug)
      if (!found) return ''
      const { skill, category } = found
      const stepPreview = skill.steps.slice(0, 4)
        .map((s, i) => `<li><span class="skill-pdf-num">${i + 1}.</span> ${escapeHtml(s)}</li>`)
        .join('')
      return `
        <div class="skill-pdf-card">
          <span class="skill-pdf-cat">${escapeHtml(category.label)}</span>
          <p class="skill-pdf-title">${escapeHtml(skill.title)}</p>
          <p class="skill-pdf-tagline">${escapeHtml(skill.tagline)}</p>
          <p class="skill-pdf-rationale"><b>Why for this trip:</b> ${escapeHtml(ref.rationale)}</p>
          <ol class="skill-pdf-steps">${stepPreview}</ol>
          <p class="skill-pdf-link">Full guide: trailsteadguide.com/skills/${escapeHtml(category.slug)}/${escapeHtml(skill.slug)}</p>
        </div>`
    })
    .join('')

  return `
  <div class="page">
    <p class="section-eyebrow">Skills you&rsquo;ll use</p>
    <h2 class="section-title">How to do it</h2>
    <p class="section-lede">A few core skills this trip leans on. The full guide for each lives at trailsteadguide.com/skills.</p>
    ${blocks}
    ${footer('Skills you’ll use')}
  </div>`
}
```

- [ ] **Step 2: Insert the two pages into the document body**

In `renderTripPackHtml`, update the body (currently lines 76–84) to insert the two new sections between Timeline and Packing:

```typescript
  ${renderCover(input, content, plan.tripSummary)}
  ${renderOverview(content)}
  ${renderTimeline(plan)}
  ${renderActivitiesPlan(plan)}
  ${renderSkillsUsed(plan)}
  ${renderPacking(checklist)}
  ${renderGear(gear)}
  ${renderMistakes(content)}
  ${renderFinalChecklist(content)}
```

- [ ] **Step 3: Run type check + tests**

Run: `npx tsc --noEmit && npm test`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add lib/pdf/template.ts
git commit -m "feat(pdf): add Activities Plan and Skills Used pages between Timeline and Packing"
```

---

## Task 9: PDF styles for the two new pages

**Files:**
- Modify: `lib/pdf/styles.ts`

- [ ] **Step 1: Append the new style block**

At the end of the `PDF_STYLES` template literal in `lib/pdf/styles.ts` (just before the closing backtick), add:

```css
  /* ACTIVITIES PLAN */
  .activity-pdf-day {
    font-size: 10pt; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: #1f3622;
    margin: 0 0 8px; padding-bottom: 5px; border-bottom: 1.5px solid #1f3622;
  }
  .activity-pdf-day + .activity-pdf-grid { margin-bottom: 18px; }
  .activity-pdf-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
    margin-bottom: 14px;
  }
  .activity-pdf-card {
    background: #f8f4ea;
    border: 1px solid #ece4d2;
    border-radius: 8px;
    padding: 11px 13px;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .activity-pdf-title {
    font-size: 10.5pt; font-weight: 700; color: #1f2622;
    margin: 0 0 4px; line-height: 1.25;
  }
  .activity-pdf-tagline {
    font-size: 9pt; color: #4a5450; margin: 0 0 6px; line-height: 1.45;
  }
  .activity-pdf-badges {
    display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 6px;
  }
  .activity-pdf-badges span {
    font-size: 7.5pt; font-weight: 600; letter-spacing: 0.5px;
    text-transform: uppercase;
    background: #ece4d2; color: #3a5a3e;
    padding: 2px 7px; border-radius: 999px;
  }
  .activity-pdf-preview {
    font-size: 8.5pt; color: #4a5450; margin: 0; line-height: 1.45;
    font-style: italic;
  }

  /* SKILLS USED */
  .skill-pdf-card {
    background: #fffaf0;
    border: 1px solid #ece4d2;
    border-radius: 8px;
    padding: 12px 14px;
    margin-bottom: 10px;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .skill-pdf-cat {
    display: inline-block;
    font-size: 7.5pt; font-weight: 700; letter-spacing: 1.2px;
    text-transform: uppercase; color: #3a5a3e;
    background: #ece4d2; padding: 3px 8px; border-radius: 999px;
    margin-bottom: 6px;
  }
  .skill-pdf-title {
    font-size: 11pt; font-weight: 700; color: #1f2622;
    margin: 0 0 3px; line-height: 1.25;
  }
  .skill-pdf-tagline {
    font-size: 9pt; color: #4a5450; margin: 0 0 6px; line-height: 1.45;
  }
  .skill-pdf-rationale {
    font-size: 9pt; color: #2c332e; margin: 0 0 8px; line-height: 1.5;
  }
  .skill-pdf-rationale b { color: #1f3622; font-weight: 700; }
  .skill-pdf-steps {
    list-style: none; padding: 0; margin: 0 0 8px;
  }
  .skill-pdf-steps li {
    font-size: 9pt; color: #2c332e; margin: 0 0 4px; line-height: 1.45;
    padding-left: 0;
  }
  .skill-pdf-num {
    font-weight: 700; color: #3a5a3e; margin-right: 4px;
  }
  .skill-pdf-link {
    font-size: 8pt; color: #6a7268; margin: 0; letter-spacing: 0.3px;
  }
```

- [ ] **Step 2: Commit**

```bash
git add lib/pdf/styles.ts
git commit -m "feat(pdf): style Activities Plan and Skills Used pages"
```

---

## Task 10: Visually verify the PDF

**Files:**
- None modified. Verification only.

- [ ] **Step 1: Locate the local PDF rendering path**

The PDF is rendered by `app/api/generate-pdf/route.ts` (or similar). Read it to find the right query string format.

Run: `grep -rn "generate-pdf\|tripPack\|renderTripPack" app/api/ lib/ 2>/dev/null | head -20`

Expected: identifies the route handler and the params it accepts (planSlug, adults, kids, nights, optional token).

- [ ] **Step 2: Generate one PDF per plan locally**

With `npm run dev` running, hit the route for each plan slug — if the route requires a token, generate one via the existing flow or temporarily bypass for dev. Save the four PDFs to `/tmp/`.

```bash
for s in easy-family-basecamp first-night-camp backyard-test first-weekend-camp; do
  curl -s "http://localhost:3000/api/generate-pdf?planSlug=${s}&adults=2&kids=2&nights=2" -o "/tmp/${s}.pdf"
  ls -la "/tmp/${s}.pdf"
done
```

If the dev route requires a token or auth, document that and either:
- Generate via the existing email-capture flow, OR
- Use the underlying `renderTripPackHtml` from a one-off Node script that writes to a Puppeteer instance.

- [ ] **Step 3: Inspect each PDF**

Open each PDF (preview app or `open /tmp/<slug>.pdf` on macOS). Visually confirm:
1. Cover page renders cleanly (no regression).
2. Overview page unchanged.
3. Timeline page unchanged.
4. **NEW** Activities Plan page renders with day groupings (where applicable) and 2-column activity cards. No content is clipped at page edges. Single-night plans show one ungrouped grid.
5. **NEW** Skills Used page renders 3–4 skill blocks, each with category badge, title, tagline, "Why for this trip" rationale, the first 4 steps numbered, and the trailsteadguide.com/skills/... link.
6. Packing → Gear → Mistakes → Final all unchanged.
7. No orphan footers; no blank pages between sections.
8. The Skills page may be longer than one physical page for plans with 4 skills — confirm the page-break flow keeps each skill block intact (no skill split across pages).

- [ ] **Step 4: Sanity check rationale text**

Open each PDF and read the rationale text on the Skills page. Confirm each plan's rationales feel plan-specific (not generic). If any read like a copy of the skill's own tagline, revisit the rationale in `lib/plan-templates.ts`.

- [ ] **Step 5: Run final test pass**

Run: `npm test`
Expected: PASS — all 55 + new tests (~83 total).

- [ ] **Step 6: Run final type check**

Run: `npx tsc --noEmit`
Expected: clean.

---

## Self-Review Notes (filled in after writing the plan)

**Spec coverage check:**
- "Each plan must answer: gear, activities, skills" — ✅ existing gear, new ActivityScheduleBlock + new SkillsSummaryBlock, plus PDF parallels.
- "3–5 activities, balanced energy" — ✅ enforced in test (3–5 range); energy mix manually curated.
- "3–4 skills max" — ✅ enforced in test (3–4 range).
- "New data structure: recommendedActivities/recommendedSkills/activitySchedule" — ✅ Task 1 + 2.
- "ActivityScheduleBlock + SkillsSummaryBlock UI components" — ✅ Tasks 5 + 6.
- "Reuse ActivityCard and SkillCard" — ✅ both new blocks reuse them.
- "Replace existing RecommendedActivities" — ✅ Task 7.
- "Two new PDF pages, ordered after Timeline" — ✅ Tasks 8 + 9.
- "Per-plan-per-skill rationale" — ✅ `PlanSkillRef.rationale` field, populated in Task 2, rendered in Task 6 (page) and Task 8 (PDF).
- "Tests for data shape + lookup helpers" — ✅ Tasks 3 + 4.
- "Render PDF and visually sanity-check" — ✅ Task 10.
- "Do NOT dump full activity instructions into PDF" — ✅ Activities Plan PDF page shows tagline + 1-line preview only; full instructions stay on web.

**Placeholder scan:** none — every step contains the actual code.

**Type consistency:**
- `PlanSkillRef.skillSlug` (string `category/skill`) used uniformly across types, components, helpers, tests, and PDF render.
- `PlanActivitySchedule.day1`/`day2` (string[]) referenced consistently.
- `getSkillByRef(ref)` signature matches between Task 3 (definition), Task 4 (test), Task 6 (component), Task 8 (PDF).
- `getActivityBySlug` already exists; signature unchanged.
