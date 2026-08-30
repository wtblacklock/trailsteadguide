# Printables Print-Overflow Fix — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the 10 of 15 printables (out of `lib/printables/data.ts`'s `PRINTABLES` array) that overflow onto a second physical page despite claiming "single-page printable," per part 1 of `docs/superpowers/specs/2026-08-30-printables-upgrade-design.md`.

**Architecture:** Two fix strategies, chosen per-card by how much each overflows a Letter page's usable print area (979px at the render width the print page uses):
- **Trim** (4 cards, 9–11% over): cut or merge lower-value content and tighten CSS spacing until the card is a genuine single page.
- **Front & back** (6 cards, 19–53% over): split content across two physical pages on one sheet, using a new shared `PrintPageBreak` component that forces a `break-after: page` in print. `formatNote` copy changes from "Single-page" to "Single-sheet · front & back" for these 6, and any tagline/whatYouGet text claiming "one page" is updated to match.

Every content and CSS change in this plan has already been implemented once, measured live against a running dev server (`getBoundingClientRect()` on `.printable-print` compared to the 979.2px threshold — Letter height 11in minus the print CSS's 0.4in top+bottom margin, at 96 CSS px/in), and reverted before being written into this plan — the numbers in each task are real measured results, not estimates.

**Tech Stack:** Next.js App Router, React (server components for the print page shell, the artwork components themselves have no `'use client'` — they're plain presentational components), Tailwind CSS + inline `<style>` blocks (existing pattern in this file family), Vitest for the test suite, `npx eslint` for lint.

---

## Before you start

Confirm the repo state assumed by this plan:

```bash
git log --oneline -1
```

This plan was written against `main` at commit `beeffaa` ("fix: repair plan-templates test..."). If `main` has moved since, that's expected — other work has been landing concurrently. Rebase this branch onto the latest `origin/main` before starting, and re-run the height checks in Task 12 regardless (things could have shifted).

Create a branch before Task 1:

```bash
git checkout main
git pull --ff-only
git checkout -b fix/printables-print-overflow
```

---

## Task 1: Shared `PrintPageBreak` component

**Files:**
- Create: `components/printables/PrintPageBreak.tsx`

- [ ] **Step 1: Create the component**

```tsx
/**
 * Marks the boundary between side 1 and side 2 of a front/back printable.
 * `break-after: page` forces everything after it onto the second physical
 * page when printed. On screen it renders a visible divider so the preview
 * matches what actually prints; that divider collapses to nothing in print
 * (the browser's own page break does the work there).
 */
export default function PrintPageBreak() {
  return (
    <div className="print-page-break" aria-hidden="true">
      <style>{`
        .print-page-break {
          break-after: page;
          page-break-after: always;
          border-top: 1px dashed #D6D3D1;
          margin: 16px 0;
          padding-top: 5px;
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 9px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #A8A29E;
          text-align: center;
        }
        .print-page-break::after {
          content: 'Side 2 — prints on the back';
        }
        @media print {
          .print-page-break {
            border: none;
            margin: 0;
            padding: 0;
            height: 0;
            font-size: 0;
            line-height: 0;
          }
          .print-page-break::after {
            content: none;
          }
        }
      `}</style>
    </div>
  )
}
```

- [ ] **Step 2: Lint it**

Run: `npx eslint components/printables/PrintPageBreak.tsx`
Expected: no output (clean).

- [ ] **Step 3: Commit**

```bash
git add components/printables/PrintPageBreak.tsx
git commit -m "feat(printables): add shared PrintPageBreak component for front/back cards"
```

---

## Task 2: Trim — Knot Reference Card (1086px → 937px)

**Files:**
- Modify: `components/printables/KnotReferenceCard.tsx`

The fix removes the per-knot `warn` field (folding its text into the `useFor` line — no safety information is lost, it's merged into the same sentence) and tightens the 2×2 grid's image box, padding, and list spacing.

- [ ] **Step 1: Replace the file contents**

Replace the entire contents of `components/printables/KnotReferenceCard.tsx` with:

```tsx
/**
 * Camp Knots Reference Card — print asset.
 *
 * Four knot panels in a 2×2 grid: square knot, bowline, taut-line hitch,
 * clove hitch. Each panel has the Wikimedia Commons illustration (used
 * under the same license as the existing skill pages — already attributed
 * in the skill records), three steps, and a "use it for" line.
 *
 * The eslint-disable below is intentional: next/image won't accept
 * arbitrary external SVG hosts without next.config tweaks, and these
 * pages are content-style PDFs that print at 1× — perf optimizations
 * from next/image aren't relevant. Plain <img> is correct here.
 */

type KnotPanel = {
  name: string
  imageSrc: string
  imageAlt: string
  attribution: string
  steps: string[]
  useFor: string
}

const KNOTS: KnotPanel[] = [
  {
    name: 'Square Knot',
    imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Reef_knot.svg',
    imageAlt: 'Square (reef) knot — two interlocking half-knots',
    attribution: 'Lucasbosch — Wikimedia Commons (CC BY-SA 3.0)',
    steps: [
      'Cross the right end over the left, then under and back up.',
      'Now cross the left end over the right, then under and back up.',
      'Pull both ends to tighten. The two loops should sit flat against each other.',
    ],
    useFor:
      'Joining two equal-diameter ropes, tying a bandage, bundling a rolled tarp — never for climbing, rescue, or any load that risks a person.',
  },
  {
    name: 'Bowline',
    imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Bowline.svg',
    imageAlt: 'Bowline knot with a fixed loop',
    attribution: 'Lucasbosch — Wikimedia Commons (CC BY 3.0)',
    steps: [
      'Make a small loop in the standing line, leaving plenty of working end.',
      'Thread the working end up through the loop, around the standing line, and back down through the same loop.',
      'Pull the standing line and the loop tight. The fixed loop will not slip under load.',
    ],
    useFor: 'A loop that won\'t collapse. Securing a rope to a tree. The rescue loop.',
  },
  {
    name: 'Taut-Line Hitch',
    imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/TautlineHitch-ABOK-1800.jpg',
    imageAlt: 'Taut-line hitch tied around a fixed object',
    attribution: 'David J. Fred — Wikimedia Commons (CC BY-SA 2.5)',
    steps: [
      'Wrap the working end twice around the standing line on the load side.',
      'Make one more wrap on the other side, then pass the end through and dress the wraps tight.',
      'Slide the hitch along the standing line to adjust tension. It will hold under load.',
    ],
    useFor: 'Adjustable tension on tent guy lines, tarp ridgelines, food-hang lines.',
  },
  {
    name: 'Clove Hitch',
    imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Webeleinenstek3.svg',
    imageAlt: 'Clove hitch wrapped around a vertical pole',
    attribution: 'Wikimedia Commons (CC BY-SA 3.0)',
    steps: [
      'Pass the rope over the pole, then bring it around and over again, crossing the first wrap.',
      'On the second pass, tuck the working end under the diagonal cross.',
      'Pull both ends tight. The hitch will grip but slip if the pole rotates.',
    ],
    useFor:
      'Quick start or finish on a tarp ridge, tying off to a stake or pole — don\'t use for a load that swings or reverses direction.',
  },
]

export default function KnotReferenceCard() {
  return (
    <div className="knot-card">
      <style>{`
        .knot-card {
          font-family: 'Source Serif 4', Georgia, serif;
          color: #1C1917;
          line-height: 1.45;
        }
        .knot-card .lead {
          font-size: 12.5px;
          color: #44403C;
          margin: 0 0 14px 0;
        }
        .knot-card .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .knot-card .panel {
          border: 1px solid #D6D3D1;
          border-radius: 8px;
          padding: 10px;
          background: #FAF8F2;
          break-inside: avoid;
        }
        .knot-card .panel h3 {
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 4px 0;
        }
        .knot-card .panel .img-wrap {
          background: #fff;
          border: 1px solid #E7E5E4;
          border-radius: 4px;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 85px;
          margin-bottom: 8px;
        }
        .knot-card .panel img {
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
        }
        .knot-card .panel ol {
          padding: 0;
          margin: 0 0 6px 0;
          list-style: none;
          counter-reset: knotstep;
        }
        .knot-card .panel ol li {
          font-size: 11px;
          line-height: 1.35;
          padding: 2px 0 2px 22px;
          position: relative;
          counter-increment: knotstep;
        }
        .knot-card .panel ol li::before {
          content: counter(knotstep);
          position: absolute;
          left: 0;
          top: 4px;
          width: 16px;
          height: 16px;
          border: 1px solid #1C1917;
          border-radius: 50%;
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 600;
          line-height: 14px;
          text-align: center;
        }
        .knot-card .panel .use {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10.5px;
          color: #44403C;
          margin: 4px 0 0 0;
        }
        .knot-card .panel .use strong {
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-size: 9.5px;
          color: #78716C;
          display: block;
          margin-bottom: 2px;
        }
        .knot-card .panel .attribution {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 9px;
          color: #A8A29E;
          margin: 6px 0 0 0;
        }
      `}</style>

      <p className="lead">
        Four knots cover almost everything a camper needs to tie. Master each one with a length of paracord at the kitchen table, then bring this card on the trip.
      </p>

      <div className="grid-2">
        {KNOTS.map((knot) => (
          <div key={knot.name} className="panel">
            <h3>{knot.name}</h3>
            <div className="img-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={knot.imageSrc} alt={knot.imageAlt} />
            </div>
            <ol>
              {knot.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            <p className="use">
              <strong>Use it for</strong>
              {knot.useFor}
            </p>
            <p className="attribution">Diagram: {knot.attribution}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify the page height**

Run: `npm run dev` (if not already running), then in a browser at `http://localhost:3000/printables/knot-reference-card/print`, open devtools console and run:

```js
const el = document.querySelector('.printable-print')
el.getBoundingClientRect().height
```

Expected: a number ≤ 979 (measured result when this was authored: **937**). The browser window must be at least 1280px wide so `.printable-print` renders at its full 816px (`max-width: 8.5in`) — narrower windows shrink it and inflate the height reading.

- [ ] **Step 3: Lint**

Run: `npx eslint components/printables/KnotReferenceCard.tsx`
Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add components/printables/KnotReferenceCard.tsx
git commit -m "fix(printables): trim Knot Reference Card to fit one printed page"
```

---

## Task 3: Trim — Shadow Puppet Hand Guide (1066px → 966px)

**Files:**
- Modify: `components/printables/ShadowPuppetHandGuide.tsx`

CSS-only tightening (setup box, grid gap, panel padding, row typography) — no content removed.

- [ ] **Step 1: Replace the file contents**

Replace the entire contents of `components/printables/ShadowPuppetHandGuide.tsx` with:

```tsx
type PuppetPanel = {
  animal: string
  emoji: string
  hands: string
  position: string
  animate: string
}

const PUPPETS: PuppetPanel[] = [
  {
    animal: 'Dog',
    emoji: '🐕',
    hands: 'One hand only.',
    position: 'Hold hand flat, fingers together pointing forward. Fold thumb down to touch palm. Curl pinky slightly down for the jaw.',
    animate: 'Open and close the gap between thumb and pinky to make the dog bark. Tilt wrist left and right for head tilts.',
  },
  {
    animal: 'Rabbit',
    emoji: '🐇',
    hands: 'One hand.',
    position: 'Make a fist. Extend index and middle fingers straight up for ears. Tuck ring and pinky fingers down. Extend thumb sideways for the nose.',
    animate: 'Wiggle the two ear fingers alternately. Bend the thumb in and out for nose-twitching.',
  },
  {
    animal: 'Bird',
    emoji: '🐦',
    hands: 'Both hands.',
    position: 'Join thumbs together side by side. Spread all fingers wide — these are the wings. Face hands sideways toward the screen.',
    animate: 'Flap both hands up and down together for flying. Open and close one hand slightly for the beak.',
  },
  {
    animal: 'Butterfly',
    emoji: '🦋',
    hands: 'Both hands.',
    position: 'Join thumbs, face palms toward screen. Spread all fingers wide. Cross wrists slightly so hands overlap at center.',
    animate: 'Slowly open and close both hands simultaneously — a gentle flutter is more convincing than fast flapping.',
  },
  {
    animal: 'Fox',
    emoji: '🦊',
    hands: 'One hand.',
    position: 'Hold hand upright, fingers together. Fold ring and middle fingers down to touch palm. Keep index, pinky, and thumb extended — index and pinky are ears, thumb is the snout.',
    animate: 'Bring thumb toward palm and back out for mouth movement. Tilt wrist for the fox to look around.',
  },
  {
    animal: 'Bear',
    emoji: '🐻',
    hands: 'One hand.',
    position: 'Hold hand in loose fist. Keep all fingers curled but rounded — not tight. Extend thumb slightly for the snout. The rounded knuckles form the bear\'s head.',
    animate: 'Open fist slightly and close for a growling mouth. Move the whole hand slowly — bears are deliberate.',
  },
  {
    animal: 'Deer',
    emoji: '🦌',
    hands: 'Both hands.',
    position: 'Make two fists. Extend all fingers on one hand upward — this is the antler rack. Place the other fist below it as the head, with index and middle fingers as ears.',
    animate: 'Keep the antler hand very still. Move the head-fist slightly side to side. Tilt ears forward to show alertness.',
  },
  {
    animal: 'Snake',
    emoji: '🐍',
    hands: 'One hand.',
    position: 'Hold hand flat, all fingers together, pointing sideways. Bend wrist slightly downward. Touch thumb to side of index finger for the closed mouth.',
    animate: 'Move the whole arm in a slow S-curve. Separate thumb from fingers slightly and snap shut for the strike.',
  },
]

export default function ShadowPuppetHandGuide() {
  return (
    <div className="puppet-card">
      <style>{`
        .puppet-card {
          font-family: 'Source Serif 4', Georgia, serif;
          color: #1C1917;
          line-height: 1.45;
        }
        .puppet-card .setup {
          background: #1C1917;
          color: #fff;
          border-radius: 6px;
          padding: 8px 12px;
          margin-bottom: 10px;
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10.5px;
          line-height: 1.4;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
        }
        .puppet-card .setup .setup-item strong {
          display: block;
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #A8A29E;
          margin-bottom: 2px;
        }
        .puppet-card .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
        }
        .puppet-card .panel {
          border: 1px solid #D6D3D1;
          border-radius: 6px;
          padding: 7px 9px;
          background: #FAF8F2;
          break-inside: avoid;
        }
        .puppet-card .animal-name {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 12.5px;
          font-weight: 700;
          margin: 0 0 2px 0;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .puppet-card .hands-note {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #78716C;
          margin: 0 0 4px 0;
        }
        .puppet-card .row {
          font-size: 10.5px;
          color: #44403C;
          margin: 0 0 3px 0;
          line-height: 1.32;
        }
        .puppet-card .row strong {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #78716C;
          display: block;
          margin-bottom: 1px;
        }
      `}</style>

      <div className="setup">
        <div className="setup-item">
          <strong>Light source</strong>
          Lantern or phone flashlight. Point light toward a flat surface — tent wall or white tarp works perfectly.
        </div>
        <div className="setup-item">
          <strong>Distance</strong>
          Hold hands 12–18 inches from the light for a sharp shadow. Move closer for a larger, softer shape.
        </div>
        <div className="setup-item">
          <strong>Starter story</strong>
          A fox and a rabbit meet a bear at the river. The bird warns them a snake is coming. The deer runs. The butterfly stays.
        </div>
      </div>

      <div className="grid">
        {PUPPETS.map((p) => (
          <div key={p.animal} className="panel">
            <p className="animal-name"><span>{p.emoji}</span>{p.animal}</p>
            <p className="hands-note">{p.hands}</p>
            <p className="row"><strong>Shape</strong>{p.position}</p>
            <p className="row"><strong>Animate</strong>{p.animate}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify the page height**

At `http://localhost:3000/printables/shadow-puppet-hand-guide/print`, run the same `getBoundingClientRect().height` check.
Expected: ≤ 979 (measured result: **966** — a 13px margin, the tightest of the 4 trim cards; if a font substitution on the verifying machine pushes it over, cut `.puppet-card .setup` `padding` from `8px 12px` to `6px 10px` and re-check).

- [ ] **Step 3: Lint**

Run: `npx eslint components/printables/ShadowPuppetHandGuide.tsx`
Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add components/printables/ShadowPuppetHandGuide.tsx
git commit -m "fix(printables): trim Shadow Puppet Hand Guide to fit one printed page"
```

---

## Task 4: Trim — Leave No Trace Quick Reference (1070px → 942px)

**Files:**
- Modify: `components/printables/LeaveNoTraceQuickReference.tsx`

CSS-only tightening — no content removed.

- [ ] **Step 1: Replace the file contents**

Replace the entire contents of `components/printables/LeaveNoTraceQuickReference.tsx` with:

```tsx
const PRINCIPLES = [
  {
    number: 1,
    title: 'Plan ahead and prepare',
    actions: [
      'Check fire and permit conditions before you leave — not at the trailhead.',
      'Bring a paper map. Cell service fails in most wilderness and many campgrounds.',
      'Tell someone your itinerary and expected return time.',
    ],
    broken: null,
  },
  {
    number: 2,
    title: 'Travel and camp on durable surfaces',
    actions: [
      'Walk single-file on established trails. Widening the trail by walking beside it causes erosion.',
      'Camp on existing tent pads or bare mineral soil — not on vegetation.',
      'Avoid crushing young plants. If the ground springs back, it\'s recovering.',
    ],
    broken: 'Cutting switchbacks. It looks like a shortcut — it causes lasting erosion.',
  },
  {
    number: 3,
    title: 'Dispose of waste properly',
    actions: [
      'Pack out all trash, food waste, and packaging. "Biodegradable" food still attracts animals.',
      'Human waste: cat hole 6–8 inches deep, 200 ft from water, trail, and camp.',
      'Dishes: strain food particles, scatter gray water 200 ft from water sources.',
    ],
    broken: 'Burying food scraps. They get dug up. Pack them out.',
  },
  {
    number: 4,
    title: 'Leave what you find',
    actions: [
      'Leave rocks, plants, feathers, and historical artifacts exactly where you found them.',
      'Don\'t build cairns, furniture, or fire rings beyond existing ones.',
      'Avoid introducing invasive species — clean boots, boats, and gear before a new area.',
    ],
    broken: null,
  },
  {
    number: 5,
    title: 'Minimize campfire impact',
    actions: [
      'Use established fire rings only. Never build a new ring.',
      'Use only down, dead, small wood you can break by hand — don\'t cut standing trees.',
      'Let wood burn to ash. Drown, stir, drown. Cold to the touch before you leave.',
    ],
    broken: 'Bringing firewood from home. It spreads invasive insects. Buy it within 50 miles.',
  },
  {
    number: 6,
    title: 'Respect wildlife',
    actions: [
      'Observe from a distance. If an animal changes its behavior, you\'re too close.',
      'Store food, waste, and scented items in a bear bag or canister every night.',
      'Keep pets under control. Off-leash dogs stress wildlife and other campers.',
    ],
    broken: 'Feeding wildlife — any wildlife. It kills them.',
  },
  {
    number: 7,
    title: 'Be considerate of others',
    actions: [
      'Quiet hours at established campgrounds are typically 10 pm – 6 am. Honor them.',
      'Yield to uphill hikers, horses, and mountain bikers on singletrack.',
      'Camp out of sight and earshot of others when in dispersed areas.',
    ],
    broken: 'Bluetooth speakers on trails. Carry them to camp if you must — not on the trail.',
  },
]

const FINAL_CHECK = [
  'All food, wrappers, and scented items packed out or hung',
  'Fire cold to the touch (drown, stir, drown)',
  'Camp looks cleaner than when you arrived',
  'No shortcuts cut across switchbacks on the way out',
  'Pet waste packed out or buried properly',
  'Site looks like no one was there',
]

export default function LeaveNoTraceQuickReference() {
  return (
    <div className="lnt-card">
      <style>{`
        .lnt-card {
          font-family: 'Source Serif 4', Georgia, serif;
          color: #1C1917;
          line-height: 1.45;
        }
        .lnt-card .lead {
          font-size: 11.5px;
          color: #44403C;
          margin: 0 0 9px 0;
        }
        .lnt-card .cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          margin-bottom: 9px;
        }
        .lnt-card .principle {
          border: 1px solid #D6D3D1;
          border-radius: 6px;
          padding: 7px 10px;
          background: #FAF8F2;
          break-inside: avoid;
        }
        .lnt-card .p-header {
          display: flex;
          align-items: baseline;
          gap: 7px;
          margin-bottom: 3px;
        }
        .lnt-card .p-num {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 700;
          color: #78716C;
          flex-shrink: 0;
        }
        .lnt-card .p-title {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 11.5px;
          font-weight: 700;
          color: #1C1917;
          margin: 0;
          line-height: 1.3;
        }
        .lnt-card .actions {
          list-style: none;
          padding: 0;
          margin: 0 0 5px 0;
        }
        .lnt-card .actions li {
          font-size: 10px;
          color: #292524;
          padding: 1.5px 0 1.5px 12px;
          position: relative;
          line-height: 1.28;
        }
        .lnt-card .actions li::before {
          content: '›';
          position: absolute;
          left: 0;
          color: #A8A29E;
        }
        .lnt-card .broken {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 9px;
          color: #B91C1C;
          margin: 3px 0 0 0;
          line-height: 1.28;
        }
        .lnt-card .broken strong {
          font-weight: 700;
          text-transform: uppercase;
          font-size: 8.5px;
          letter-spacing: 0.06em;
        }
        .lnt-card .final {
          background: #1C1917;
          color: #fff;
          border-radius: 6px;
          padding: 8px 12px;
        }
        .lnt-card .final h2 {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #A8A29E;
          border-bottom: 1px solid #44403C;
          padding-bottom: 3px;
          margin: 0 0 6px 0;
        }
        .lnt-card .final-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 14px;
        }
        .lnt-card .final-item {
          display: flex;
          align-items: flex-start;
          gap: 7px;
          font-size: 10px;
          color: #E7E5E4;
          padding: 1.5px 0;
          line-height: 1.28;
        }
        .lnt-card .final-box {
          width: 11px;
          height: 11px;
          border: 1.2px solid #78716C;
          border-radius: 2px;
          flex-shrink: 0;
          margin-top: 1px;
        }
      `}</style>

      <p className="lead">
        LNT isn&apos;t about being perfect. It&apos;s seven habits that compound — the more people who follow them, the better the wild places get. These are the car-camping and day-hiking versions, not just backcountry rules.
      </p>

      <div className="cols">
        {PRINCIPLES.map((p) => (
          <div key={p.number} className="principle">
            <div className="p-header">
              <span className="p-num">{p.number}.</span>
              <p className="p-title">{p.title}</p>
            </div>
            <ul className="actions">
              {p.actions.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
            {p.broken && (
              <p className="broken"><strong>Most broken:</strong> {p.broken}</p>
            )}
          </div>
        ))}
      </div>

      <div className="final">
        <h2>Before you leave camp</h2>
        <div className="final-grid">
          {FINAL_CHECK.map((item) => (
            <div key={item} className="final-item">
              <span className="final-box" aria-hidden="true" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify the page height**

At `http://localhost:3000/printables/leave-no-trace-quick-reference/print`, run the height check.
Expected: ≤ 979 (measured result: **942**).

- [ ] **Step 3: Lint**

Run: `npx eslint components/printables/LeaveNoTraceQuickReference.tsx`
Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add components/printables/LeaveNoTraceQuickReference.tsx
git commit -m "fix(printables): trim Leave No Trace Quick Reference to fit one printed page"
```

---

## Task 5: Trim — Backyard Test Pre-Flight Checklist (1072px → 933px)

**Files:**
- Modify: `components/printables/BackyardTestChecklist.tsx`

Merges 3 checklist items into 1 in the first group (headlamp + lantern + device-charging → one combined item) and 3 items into 1 in the third group (coffee + cooler + gear-pile-walk → one combined item). No information is deleted, only consolidated. Plus CSS tightening.

- [ ] **Step 1: Replace the file contents**

Replace the entire contents of `components/printables/BackyardTestChecklist.tsx` with:

```tsx
/**
 * Backyard Test Pre-Flight Checklist — print asset.
 *
 * Single-page typographic checklist. Designed to be physically checked
 * off with a pen, so the boxes are real.
 */

const PRE_FLIGHT_GROUPS: Array<{ heading: string; items: string[] }> = [
  {
    heading: 'Day before — gear test (allow 60 min)',
    items: [
      'Pitch the tent on a flat patch of grass. Stake every guy-out point.',
      'Crawl in. Lie down. Note hot spots where you can feel the ground.',
      'Light the stove on its lowest setting. Confirm fuel canister is full.',
      'Boil 2 cups of water. Time it — calibrate vs the foil-pack card.',
      'Inflate every sleeping pad. Listen for leaks for 60 minutes.',
      'Power-cycle every headlamp and lantern. Replace batteries that flicker — confirm the lantern is bright enough to cook by.',
    ],
  },
  {
    heading: 'Sunset — the real overnight',
    items: [
      'Sleep in the tent the way you’ll sleep at camp: clothes, bag, pillow, no phone screens after dark.',
      'Bring the actual book / activity you’d use to wind kids down.',
      'Run the kid bedtime ritual end-to-end. Note what missing item bites first.',
      'Eat the dinner you plan for night one. Cook on the camp stove, not the kitchen.',
      'No re-entering the house once the tent is zipped.',
    ],
  },
  {
    heading: 'Morning — pack-down rehearsal',
    items: [
      'Pack the tent down in 20 minutes or less. Time it.',
      'Note any wet condensation on the rainfly; it will be worse in real cold.',
      'Make camp coffee on the stove, confirm the cooler is still cold, then walk the gear pile — anything you didn’t touch goes home next time.',
    ],
  },
  {
    heading: 'After-action — the three things you’ll only learn outside',
    items: [
      'Whether your sleeping pad keeps you off the cold ground.',
      'Whether your kid will actually fall asleep in a tent.',
      'Whether the stove + cookset + cooler combo works as a system, not just as separate items.',
    ],
  },
]

export default function BackyardTestChecklist() {
  return (
    <div className="backyard-card">
      <style>{`
        .backyard-card {
          font-family: 'Source Serif 4', Georgia, serif;
          color: #1C1917;
          line-height: 1.55;
        }
        .backyard-card h2 {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #57534E;
          margin: 0 0 10px 0;
          padding-bottom: 4px;
          border-bottom: 1px solid #D6D3D1;
        }
        .backyard-card .group {
          margin-bottom: 12px;
          break-inside: avoid;
        }
        .backyard-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .backyard-card li {
          font-size: 12px;
          line-height: 1.4;
          padding: 4px 0 4px 24px;
          position: relative;
          border-bottom: 1px dotted #E7E5E4;
        }
        .backyard-card li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          width: 12px;
          height: 12px;
          border: 1.2px solid #1C1917;
          border-radius: 2px;
        }
        .backyard-card .lead {
          font-size: 13px;
          line-height: 1.55;
          color: #44403C;
          margin: 0 0 18px 0;
        }
      `}</style>

      <p className="lead">
        Run this the weekend before any real camping trip. The yard test answers the questions you can&apos;t answer in a store: does the gear work as a system, will the kid sleep in the tent, will you?
      </p>

      {PRE_FLIGHT_GROUPS.map((g, i) => (
        <section key={i} className="group">
          <h2>{g.heading}</h2>
          <ul>
            {g.items.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Verify the page height**

At `http://localhost:3000/printables/backyard-test-checklist/print`, run the height check.
Expected: ≤ 979 (measured result: **933**).

- [ ] **Step 3: Lint**

Run: `npx eslint components/printables/BackyardTestChecklist.tsx`
Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add components/printables/BackyardTestChecklist.tsx
git commit -m "fix(printables): trim Backyard Test Checklist to fit one printed page"
```

---

## Task 6: Front & back — Bear Bag & Food Storage Card (1497px → 475px + 856px)

**Files:**
- Modify: `components/printables/BearBagFoodStorageCard.tsx`

Side 1: lead + "goes in the bag" / "stays out" / bear canister sizing + the "if a bear gets your food" callout. Side 2: the 7-step PCT counter-balance hang method (given its own page — it's the most-referenced section and benefits from more room, not less).

- [ ] **Step 1: Replace the file contents**

Replace the entire contents of `components/printables/BearBagFoodStorageCard.tsx` with:

```tsx
import PrintPageBreak from './PrintPageBreak'

export default function BearBagFoodStorageCard() {
  const goesIn = [
    'All food — packaged, fresh, cooked, or partially eaten',
    'Food wrappers, foil, and cooking waste',
    'Cooking pots, utensils, plates with food residue',
    'Toothpaste, lip balm, chapstick',
    'Soap, hand sanitizer, sunscreen, bug spray',
    'Pet food and water bowls',
    'Empty water bottles that held flavored drinks',
    'Scented candles, air fresheners, baby wipes',
  ]

  const staysOut = [
    'Water (unflavored)',
    'Prescription medications (keep in tent pocket, ask ranger if unsure)',
    'Empty pots rinsed clean and aired out',
  ]

  const pctSteps = [
    { step: 'Rope', detail: '50–70 ft of 550 paracord. Attach to bag with a bowline.' },
    { step: 'Find the branch', detail: 'At least 20 ft high, 10 ft from trunk, 4 inches thick — enough to support ~20 lbs.' },
    { step: 'Throw one end over', detail: 'Tie a stick or rock to the throw end. Aim for 5–6 ft out from the trunk.' },
    { step: 'Attach first bag', detail: 'Clip the food bag to the rope as high as you can reach.' },
    { step: 'Attach second weight', detail: 'Tie the second bag or a counterweight to the free end, same height as the food bag.' },
    { step: 'Push up with a stick', detail: 'Use a long stick to push the bags up until they\'re equal height, at least 12 ft off the ground.' },
    { step: 'Retrieve in the morning', detail: 'Hook the lower bag with a stick or trekking pole to pull it down.' },
  ]

  return (
    <div className="bear-card">
      <style>{`
        .bear-card {
          font-family: 'Source Serif 4', Georgia, serif;
          color: #1C1917;
          line-height: 1.45;
        }
        .bear-card .lead {
          font-size: 12px;
          color: #44403C;
          margin: 0 0 12px 0;
        }
        .bear-card h2 {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #57534E;
          border-bottom: 1px solid #D6D3D1;
          padding-bottom: 3px;
          margin: 0 0 8px 0;
        }
        .bear-card .top-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 14px;
        }
        .bear-card .check-list { margin: 0; padding: 0; list-style: none; }
        .bear-card .check-list li {
          display: flex;
          align-items: flex-start;
          gap: 7px;
          font-size: 11px;
          color: #292524;
          padding: 2.5px 0;
          line-height: 1.4;
        }
        .bear-card .box {
          width: 11px;
          height: 11px;
          border: 1.2px solid #A8A29E;
          border-radius: 2px;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .bear-card .stays-out li { color: #57534E; font-style: italic; }
        .bear-card .stays-out .box { border-style: dashed; }
        .bear-card ol {
          list-style: none;
          padding: 0;
          margin: 0 0 14px 0;
          counter-reset: pct;
        }
        .bear-card ol li {
          display: grid;
          grid-template-columns: 90px 1fr;
          gap: 8px;
          font-size: 11.5px;
          padding: 5px 0;
          border-bottom: 1px dotted #E7E5E4;
          counter-increment: pct;
          line-height: 1.4;
        }
        .bear-card ol li:last-child { border-bottom: none; }
        .bear-card ol li::before {
          content: counter(pct);
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 11px;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border: 1.2px solid #1C1917;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .bear-card ol li .step-label {
          font-family: 'Figtree', system-ui, sans-serif;
          font-weight: 700;
          font-size: 11px;
          color: #1C1917;
        }
        .bear-card ol li .step-detail {
          font-size: 11px;
          color: #44403C;
        }
        .bear-card .canister {
          background: #FAF8F2;
          border: 1px solid #D6D3D1;
          border-radius: 6px;
          padding: 10px 14px;
          font-size: 11px;
          color: #292524;
          line-height: 1.5;
          margin-bottom: 10px;
        }
        .bear-card .if-happens {
          background: #1C1917;
          color: #fff;
          border-radius: 6px;
          padding: 10px 14px;
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 11px;
          line-height: 1.55;
        }
        .bear-card .if-happens h2 { color: #D6D3D1; border-bottom-color: #44403C; }
      `}</style>

      <div className="print-side print-side-1">
        <p className="lead">
          Bears that get human food become habituated and must be euthanized. Hanging your food correctly takes 10 minutes and protects both your trip and the bear.
        </p>

        <div className="top-cols">
          <div>
            <h2>Goes in the Bear Bag</h2>
            <ul className="check-list">
              {goesIn.map((item) => (
                <li key={item}><span className="box" aria-hidden="true" />{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <div style={{ marginBottom: '12px' }}>
              <h2>Stays Out (Safe in Tent)</h2>
              <ul className="check-list stays-out">
                {staysOut.map((item) => (
                  <li key={item}><span className="box" aria-hidden="true" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="canister">
              <h2 style={{ marginBottom: '6px' }}>Bear Canister Sizing</h2>
              <strong>1 night</strong> — 450–500 cu in per person<br />
              <strong>2–3 nights</strong> — 650–700 cu in per person<br />
              <strong>4–7 nights</strong> — 900+ cu in per person<br />
              <span style={{ color: '#78716C', fontSize: '10px' }}>Required by permit in some wilderness areas. Check before you go.</span>
            </div>
          </div>
        </div>

        <div className="if-happens">
          <h2>If a Bear Gets Your Food</h2>
          Don&apos;t chase it — you won&apos;t win and you could get hurt. Make loud noise to drive it off once it has moved away from camp. Report to the camp host or ranger station: date, time, location, and bear description. The trip is not over — most campers who lose food finish the trip on camp store supplies.
        </div>
      </div>

      <PrintPageBreak />

      <div className="print-side print-side-2">
        <h2>PCT Counter-Balance Hang Method</h2>
        <ol>
          {pctSteps.map((s) => (
            <li key={s.step}>
              <span className="step-label">{s.step}</span>
              <span className="step-detail">{s.detail}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify both page heights**

At `http://localhost:3000/printables/bear-bag-food-storage-card/print`, run:

```js
const header = document.querySelector('.header-strip').getBoundingClientRect()
const side1 = document.querySelector('.print-side-1').getBoundingClientRect()
const side2 = document.querySelector('.print-side-2').getBoundingClientRect()
const footer = document.querySelector('.footer-strip').getBoundingClientRect()
console.log('page1', Math.round(header.height + side1.height), 'page2', Math.round(side2.height + footer.height))
```

Expected: both numbers ≤ 979 (measured result: page1 **475**, page2 **856**). The `.header-strip`/`.footer-strip` elements are rendered by `app/printables/[slug]/print/page.tsx` (unchanged by this task) — they wrap every artwork component already, so this check works without further shell changes. `page1` doesn't include the page-break element's own height since it collapses to 0 in print.

- [ ] **Step 3: Lint**

Run: `npx eslint components/printables/BearBagFoodStorageCard.tsx`
Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add components/printables/BearBagFoodStorageCard.tsx
git commit -m "fix(printables): split Bear Bag & Food Storage Card into front/back pages"
```

---

## Task 7: Front & back — Camp First Aid Quick Reference (1184px → 765px + 255px)

**Files:**
- Modify: `components/printables/CampFirstAidQuickReference.tsx`

Side 1: the 8-injury treatment grid. Side 2: the kit baseline checklist + the fill-in emergency contacts box — a natural "what to bring / who to call" page that benefits from the extra room for handwriting.

- [ ] **Step 1: Replace the file contents**

Replace the entire contents of `components/printables/CampFirstAidQuickReference.tsx` with:

```tsx
type Injury = {
  name: string
  emoji: string
  signs: string
  treatment: string[]
  evacuate: string
}

const INJURIES: Injury[] = [
  {
    name: 'Blister',
    emoji: '🩹',
    signs: 'Hot spot, then fluid-filled bubble on foot or heel.',
    treatment: [
      'Leave intact if small — drain only if large and painful.',
      'To drain: sterilize needle, pierce edge, let fluid out, leave skin flap.',
      'Cover with moleskin donut or blister pad. Keep dry.',
    ],
    evacuate: 'Signs of infection: redness spreading beyond blister, pus, red streaks, fever.',
  },
  {
    name: 'Sprained Ankle',
    emoji: '🦶',
    signs: 'Swelling, bruising, pain on weight-bearing. Rolled outward is most common.',
    treatment: [
      'RICE: Rest, Ice (20 min on/off), Compression (ACE wrap), Elevate.',
      'If walking needed, taping provides support. Wrap figure-8 around ankle.',
      'Use trekking pole as a cane on the way out.',
    ],
    evacuate: 'Cannot bear any weight, severe deformity, numbness, or circulation issues.',
  },
  {
    name: 'Cut / Laceration',
    emoji: '🩸',
    signs: 'Bleeding wound from sharp object, rock, or fall.',
    treatment: [
      'Apply direct pressure with clean cloth for 10+ min. Do not lift to check.',
      'Once bleeding stops: clean with clean water (flush well).',
      'Close with butterfly strips or steri-strips. Cover with bandage.',
    ],
    evacuate: 'Bleeding doesn\'t stop after 20 min of pressure, wound is deep or gaping, signs of tendon or bone.',
  },
  {
    name: 'Insect Sting',
    emoji: '🐝',
    signs: 'Sharp pain, localized swelling and redness.',
    treatment: [
      'Remove stinger by scraping (bee) — don\'t squeeze with tweezers.',
      'Ice for swelling. Antihistamine (Benadryl) for itch.',
      'Monitor for signs of allergy.',
    ],
    evacuate: 'Throat tightening, hives beyond sting site, dizziness, shortness of breath — use EpiPen if available, call 911.',
  },
  {
    name: 'Sunburn',
    emoji: '☀️',
    signs: 'Red, hot, tender skin. Blistering in severe cases.',
    treatment: [
      'Get out of sun. Cool with wet cloth (not ice).',
      'Aloe vera or hydrocortisone cream for pain.',
      'Hydrate aggressively — sunburn dehydrates.',
    ],
    evacuate: 'Blistering over large area, fever over 103°F, confusion, or vomiting.',
  },
  {
    name: 'Dehydration',
    emoji: '💧',
    signs: 'Dark urine, headache, fatigue, dizziness, dry mouth.',
    treatment: [
      'Stop activity. Sit in shade. Drink water steadily — not all at once.',
      'Add electrolytes: sports drink, electrolyte tablets, or a pinch of salt + sugar.',
      'Rest 30+ min before returning to activity.',
    ],
    evacuate: 'Cannot keep fluids down, severe headache, confusion, no urination for 8+ hours.',
  },
  {
    name: 'Hypothermia (early)',
    emoji: '🥶',
    signs: 'Shivering, cold/pale skin, clumsiness, slurred speech.',
    treatment: [
      'Get out of wind and wet clothing immediately.',
      'Insulate with dry layers and sleeping bag. Add head cover.',
      'Warm fluids if conscious. Body heat from another person is effective.',
    ],
    evacuate: 'Stops shivering but still cold (severe hypothermia), loss of consciousness, heart irregularity.',
  },
  {
    name: 'Minor Burn',
    emoji: '🔥',
    signs: 'Redness and pain from campfire, stove, or hot cookware.',
    treatment: [
      'Cool immediately: run cool (not cold) water over burn for 10–20 min.',
      'Do not apply ice, butter, or toothpaste.',
      'Cover with non-stick sterile bandage. Ibuprofen for pain.',
    ],
    evacuate: 'Blistering larger than your palm, burn on face/hands/genitals, charred or white skin.',
  },
]

const KIT_ITEMS = [
  'Bandages (assorted sizes)',
  'Gauze pads + medical tape',
  'Moleskin / blister pads',
  'ACE wrap (elastic bandage)',
  'Butterfly strips / steri-strips',
  'Antihistamine (Benadryl)',
  'Ibuprofen + acetaminophen',
  'Antibiotic ointment',
  'Aloe vera gel',
  'Tweezers + safety pins',
  'Medical gloves (2 pairs)',
  'CPR face shield',
]

import PrintPageBreak from './PrintPageBreak'

export default function CampFirstAidQuickReference() {
  return (
    <div className="first-aid">
      <style>{`
        .first-aid {
          font-family: 'Source Serif 4', Georgia, serif;
          color: #1C1917;
          line-height: 1.45;
        }
        .first-aid .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 12px;
        }
        .first-aid .panel {
          border: 1px solid #D6D3D1;
          border-radius: 6px;
          padding: 9px 11px;
          background: #FAF8F2;
          break-inside: avoid;
        }
        .first-aid .panel .title {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 12px;
          font-weight: 700;
          margin: 0 0 3px 0;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .first-aid .panel .signs {
          font-size: 10.5px;
          color: #57534E;
          margin: 0 0 5px 0;
          line-height: 1.35;
          font-style: italic;
        }
        .first-aid .panel ol {
          list-style: none;
          padding: 0;
          margin: 0 0 5px 0;
          counter-reset: tx;
        }
        .first-aid .panel ol li {
          font-size: 10.5px;
          color: #292524;
          padding: 2px 0 2px 18px;
          position: relative;
          counter-increment: tx;
          line-height: 1.35;
        }
        .first-aid .panel ol li::before {
          content: counter(tx) '.';
          position: absolute;
          left: 0;
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 700;
          color: #78716C;
        }
        .first-aid .panel .evac {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 9.5px;
          color: #B91C1C;
          margin: 4px 0 0 0;
          line-height: 1.35;
        }
        .first-aid .panel .evac strong {
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-size: 9px;
        }
        .first-aid .bottom-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .first-aid h2 {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #57534E;
          border-bottom: 1px solid #D6D3D1;
          padding-bottom: 3px;
          margin: 0 0 8px 0;
        }
        .first-aid .kit-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 10px;
        }
        .first-aid .kit-item {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          font-size: 10.5px;
          color: #292524;
          padding: 2px 0;
          line-height: 1.35;
        }
        .first-aid .box {
          width: 10px;
          height: 10px;
          border: 1.2px solid #A8A29E;
          border-radius: 2px;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .first-aid .emergency-box {
          background: #FAF8F2;
          border: 1px solid #D6D3D1;
          border-radius: 6px;
          padding: 10px 14px;
          font-size: 11px;
        }
        .first-aid .emergency-box .fill-line {
          border-bottom: 1px solid #A8A29E;
          height: 22px;
          margin-bottom: 8px;
        }
        .first-aid .emergency-box label {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 9px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #78716C;
          display: block;
          margin-bottom: 2px;
        }
      `}</style>

      <div className="print-side print-side-1">
        <div className="grid">
          {INJURIES.map((inj) => (
            <div key={inj.name} className="panel">
              <p className="title"><span>{inj.emoji}</span>{inj.name}</p>
              <p className="signs">{inj.signs}</p>
              <ol>
                {inj.treatment.map((t, i) => <li key={i}>{t}</li>)}
              </ol>
              <p className="evac"><strong>Evacuate:</strong> {inj.evacuate}</p>
            </div>
          ))}
        </div>
      </div>

      <PrintPageBreak />

      <div className="print-side print-side-2">
        <div className="bottom-row">
          <div>
            <h2>Kit Baseline</h2>
            <div className="kit-grid">
              {KIT_ITEMS.map((item) => (
                <div key={item} className="kit-item">
                  <span className="box" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="emergency-box">
            <h2>Emergency Contacts</h2>
            <label>Nearest Ranger Station</label>
            <div className="fill-line" />
            <label>Nearest Hospital / Urgent Care</label>
            <div className="fill-line" />
            <label>Emergency Contact (name + phone)</label>
            <div className="fill-line" />
            <label>Trip start / end dates</label>
            <div className="fill-line" />
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify both page heights**

At `http://localhost:3000/printables/camp-first-aid-quick-reference/print`, run the same two-page check from Task 6 Step 2.
Expected: page1 ≤ 979 (measured: **765**), page2 ≤ 979 (measured: **255** — spacious by design, a fill-in page).

- [ ] **Step 3: Lint**

Run: `npx eslint components/printables/CampFirstAidQuickReference.tsx`
Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add components/printables/CampFirstAidQuickReference.tsx
git commit -m "fix(printables): split Camp First Aid Quick Reference into front/back pages"
```

---

## Task 8: Front & back — Fire-Starting Checklist (1261px → 673px + 421px)

**Files:**
- Modify: `components/printables/FireStartingChecklist.tsx`

Side 1: the three-tier wood stack + build & light steps (how to get it going). Side 2: teepee vs. log cabin comparison + the drown-stir-drown extinguish protocol + the "never" line (how to run and end it safely).

- [ ] **Step 1: Replace the file contents**

Replace the entire contents of `components/printables/FireStartingChecklist.tsx` with:

```tsx
/**
 * Fire-Starting Checklist — print asset.
 *
 * Single-page guide to building, lighting, maintaining, and extinguishing
 * a campfire. Visual hierarchy walks the four stages. The drown-stir-drown
 * extinguish protocol gets a dedicated callout.
 */

import PrintPageBreak from './PrintPageBreak'

export default function FireStartingChecklist() {
  return (
    <div className="fire-card">
      <style>{`
        .fire-card {
          font-family: 'Source Serif 4', Georgia, serif;
          color: #1C1917;
          line-height: 1.55;
        }
        .fire-card h2 {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #57534E;
          margin: 0 0 10px 0;
          padding-bottom: 4px;
          border-bottom: 1px solid #D6D3D1;
        }
        .fire-card .lead {
          font-size: 13px;
          line-height: 1.55;
          color: #44403C;
          margin: 0 0 18px 0;
        }
        .fire-card .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 18px;
        }
        .fire-card .stack {
          background: #FAF8F2;
          border: 1px solid #D6D3D1;
          border-radius: 8px;
          padding: 14px 16px;
        }
        .fire-card .stack h3 {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #1C1917;
          margin: 0 0 4px 0;
        }
        .fire-card .stack p {
          font-size: 12px;
          margin: 0;
          color: #44403C;
        }
        .fire-card .stack .qty {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 11px;
          color: #78716C;
          margin-top: 4px;
        }
        .fire-card ol {
          list-style: none;
          padding: 0;
          margin: 0 0 16px 0;
          counter-reset: step;
        }
        .fire-card ol li {
          font-size: 12.5px;
          line-height: 1.5;
          padding: 6px 0 6px 28px;
          position: relative;
          counter-increment: step;
          border-bottom: 1px dotted #E7E5E4;
        }
        .fire-card ol li::before {
          content: counter(step);
          position: absolute;
          left: 0;
          top: 6px;
          width: 18px;
          height: 18px;
          border: 1.2px solid #1C1917;
          border-radius: 50%;
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 11px;
          font-weight: 600;
          line-height: 16px;
          text-align: center;
        }
        .fire-card .extinguish {
          background: #1C1917;
          color: #fff;
          border-radius: 8px;
          padding: 14px 16px;
          margin-top: 4px;
        }
        .fire-card .extinguish h2 {
          color: #c9d4b5;
          border-bottom-color: #44403C;
        }
        .fire-card .extinguish ol li {
          color: #fff;
          border-bottom-color: #44403C;
        }
        .fire-card .extinguish ol li::before {
          border-color: #c9d4b5;
          color: #c9d4b5;
        }
        .fire-card .never {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 11px;
          color: #78716C;
          margin-top: 12px;
        }
        .fire-card .never strong {
          color: #1C1917;
          font-weight: 600;
        }
      `}</style>

      <div className="print-side print-side-1">
      <p className="lead">
        A camp fire works in four stages — build, light, maintain, extinguish. Skip the last one and you&apos;re how a wildfire starts. Run all four every time.
      </p>

      <h2>The three-tier stack</h2>
      <div className="grid-2">
        <div className="stack">
          <h3>1 · Tinder</h3>
          <p>Anything that catches a flame in seconds: dryer lint, birch bark, wax-coated cotton balls, fire-starter cubes, fatwood shavings.</p>
          <p className="qty">Quantity: a baseball-sized bundle.</p>
        </div>
        <div className="stack">
          <h3>2 · Kindling</h3>
          <p>Pencil-to-thumb-thick dry sticks. Snap, don&apos;t bend. Splits of seasoned firewood work too.</p>
          <p className="qty">Quantity: a forearm-thick bundle.</p>
        </div>
        <div className="stack">
          <h3>3 · Fuelwood</h3>
          <p>Wrist- to forearm-thick split logs. Buy bundled at the camp store — never transport from home.</p>
          <p className="qty">Quantity: 2–3 bundles per evening.</p>
        </div>
        <div className="stack">
          <h3>4 · Lighter / matches</h3>
          <p>Bic lighter, stormproof matches, or a ferro rod. Bring two redundant sources — at least one waterproof.</p>
          <p className="qty">Quantity: 2 sources, kept dry.</p>
        </div>
      </div>

      <h2>Build &amp; light</h2>
      <ol>
        <li>Confirm no fire ban. Build only inside an established ring. Clear a 3-foot radius down to mineral soil.</li>
        <li>Lay the tinder bundle in the center.</li>
        <li>Build a teepee of kindling around the tinder, with a 2-finger gap on the windward side as the door.</li>
        <li>Light the tinder bundle from underneath through that windward gap. Never light from above.</li>
        <li>Once the kindling is burning steadily, add small fuelwood pieces to the structure — don&apos;t smother the kindling.</li>
        <li>Add larger fuelwood as the fire establishes. Maintain airflow; small adjustments only.</li>
      </ol>
      </div>

      <PrintPageBreak />

      <div className="print-side print-side-2">
      <h2>Teepee vs log cabin</h2>
      <div className="grid-2">
        <div className="stack">
          <h3>Teepee</h3>
          <p>Best for: starting fast, smaller fires, dry conditions. Burns hot and quick, collapses inward.</p>
        </div>
        <div className="stack">
          <h3>Log cabin</h3>
          <p>Best for: long-burn evenings, cooking grates, wet conditions. Slower to start but steadier.</p>
        </div>
      </div>

      <div className="extinguish">
        <h2>Extinguish protocol — drown · stir · drown</h2>
        <ol>
          <li><strong>Drown.</strong> Pour water across the entire fire bed, not just the visible flames. Listen for hissing — keep going until it stops.</li>
          <li><strong>Stir.</strong> Use a stick or shovel to mix ashes, embers, and unburned wood. Embers buried under ash can stay alive for days.</li>
          <li><strong>Drown again.</strong> A second full pour. Touch the back of your hand to the ashes — if it&apos;s warm, the fire is not out.</li>
        </ol>
      </div>

      <p className="never">
        <strong>Never:</strong> burn trash, plastic, foil, or pressure-treated wood &middot; use accelerants &middot; leave a fire unattended &middot; trust the rain to put it out &middot; build a fire in burn-ban country.
      </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify both page heights**

At `http://localhost:3000/printables/fire-starting-checklist/print`, run the two-page check.
Expected: page1 ≤ 979 (measured: **673**), page2 ≤ 979 (measured: **421**).

- [ ] **Step 3: Lint**

Run: `npx eslint components/printables/FireStartingChecklist.tsx`
Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add components/printables/FireStartingChecklist.tsx
git commit -m "fix(printables): split Fire-Starting Checklist into front/back pages"
```

---

## Task 9: Front & back — 3-Day Camp Meal Planner (1311px → 583px + 563px)

**Files:**
- Modify: `components/printables/CampMealPlanner.tsx`

Side 1: the fill-in 3-day meal grid. Side 2: the shopping list, party-size scaling table, notes, and allergies sections. The lead paragraph's "scale note at the bottom" is corrected to "scale note on side 2" since it's no longer literally at the bottom of the same page.

- [ ] **Step 1: Replace the file contents**

Replace the entire contents of `components/printables/CampMealPlanner.tsx` with:

```tsx
const MEAL_IDEAS: Record<string, Record<string, string>> = {
  breakfast: {
    easy: 'Granola + milk, instant oatmeal, Pop-Tarts, trail mix',
    medium: 'Scrambled eggs + bacon on the 2-burner stove, pancakes from mix',
    cast: 'Dutch oven cinnamon rolls, cast iron frittata',
  },
  lunch: {
    easy: 'Sandwiches, wraps, cheese + crackers, PB&J',
    medium: 'Quesadillas on the stove, soup from a pouch',
    cast: 'Grilled cheese in cast iron, camp nachos',
  },
  dinner: {
    easy: 'Hot dogs over the fire, mac and cheese, ramen upgraded with an egg',
    medium: 'Foil-pack chicken + veggies over coals, 2-burner pasta',
    cast: 'Cast iron chili, one-pan stir fry, Dutch oven lasagna',
  },
  snacks: {
    easy: 'Trail mix, fruit, jerky, energy bars, crackers',
    medium: 'S\'mores, popcorn over the fire, camp nachos',
    cast: 'Cast iron skillet cookies, campfire banana boats',
  },
}

const COOK_METHODS = ['Campfire', '2-Burner Stove', 'Cast Iron', 'No-Cook']
const DAYS = ['Day 1', 'Day 2', 'Day 3']
const MEALS = ['Breakfast', 'Lunch', 'Dinner', 'Snacks']

const GROCERY_CATEGORIES = [
  'Proteins (meat, eggs, beans)',
  'Grains & starches',
  'Dairy',
  'Fruits & vegetables',
  'Snacks & trail food',
  'Condiments & spices',
  'Camp pantry (oil, foil, bags)',
  'Beverages & coffee',
]

import PrintPageBreak from './PrintPageBreak'

export default function CampMealPlanner() {
  return (
    <div className="meal-planner">
      <style>{`
        .meal-planner {
          font-family: 'Source Serif 4', Georgia, serif;
          color: #1C1917;
          line-height: 1.45;
        }
        .meal-planner .lead {
          font-size: 11.5px;
          color: #44403C;
          margin: 0 0 12px 0;
        }
        .meal-planner h2 {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #57534E;
          border-bottom: 1px solid #D6D3D1;
          padding-bottom: 3px;
          margin: 0 0 8px 0;
        }
        .meal-planner .grid-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 14px;
          font-size: 10.5px;
        }
        .meal-planner .grid-table th {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #57534E;
          padding: 5px 8px;
          border: 1px solid #D6D3D1;
          background: #F5F3EE;
          text-align: left;
        }
        .meal-planner .grid-table td {
          border: 1px solid #D6D3D1;
          padding: 0;
          vertical-align: top;
        }
        .meal-planner .cell-inner {
          padding: 6px 8px;
          min-height: 42px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .meal-planner .cell-idea {
          font-size: 9px;
          color: #A8A29E;
          font-style: italic;
          line-height: 1.3;
          margin-bottom: 3px;
        }
        .meal-planner .cell-method {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }
        .meal-planner .method-btn {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 0.05em;
          border: 1px solid #D6D3D1;
          border-radius: 2px;
          padding: 1px 4px;
          color: #78716C;
          white-space: nowrap;
        }
        .meal-planner .bottom-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .meal-planner .grocery-list { margin: 0; padding: 0; list-style: none; }
        .meal-planner .grocery-cat {
          margin-bottom: 8px;
          break-inside: avoid;
        }
        .meal-planner .grocery-cat h3 {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #78716C;
          margin: 0 0 3px 0;
        }
        .meal-planner .fill-lines {
          border-bottom: 1px solid #D6D3D1;
          height: 18px;
          margin-bottom: 3px;
        }
        .meal-planner .scaling {
          background: #FAF8F2;
          border: 1px solid #D6D3D1;
          border-radius: 6px;
          padding: 9px 12px;
          font-size: 10.5px;
          line-height: 1.55;
        }
        .meal-planner .scaling h3 {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #57534E;
          margin: 0 0 5px 0;
        }
        .meal-planner .scaling table {
          width: 100%;
          font-size: 10px;
          border-collapse: collapse;
        }
        .meal-planner .scaling td {
          padding: 2px 4px;
          border-bottom: 1px dotted #E7E5E4;
          color: #292524;
        }
        .meal-planner .scaling td:first-child { color: #78716C; font-weight: 600; }
      `}</style>

      <div className="print-side print-side-1">
      <p className="lead">
        Fill in the meal column first, then circle a cook method. Transfer each ingredient to the shopping list. Default portions feed 4 people — scale note on side 2.
      </p>

      <h2>Meal Plan Grid</h2>
      <table className="grid-table">
        <thead>
          <tr>
            <th style={{ width: '15%' }}></th>
            {DAYS.map((d) => (
              <th key={d} style={{ width: '28.3%' }}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MEALS.map((meal) => {
            const key = meal.toLowerCase() as keyof typeof MEAL_IDEAS
            const ideas = MEAL_IDEAS[key]
            return (
              <tr key={meal}>
                <td>
                  <div className="cell-inner" style={{ background: '#F5F3EE', minHeight: '68px' }}>
                    <span style={{ fontFamily: '\'Figtree\', system-ui, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#57534E' }}>{meal}</span>
                    <div className="cell-method">
                      {COOK_METHODS.map((m) => (
                        <span key={m} className="method-btn">{m}</span>
                      ))}
                    </div>
                  </div>
                </td>
                {DAYS.map((day, di) => {
                  const idea = di === 0 ? ideas.easy : di === 1 ? ideas.medium : ideas.cast
                  return (
                    <td key={day}>
                      <div className="cell-inner" style={{ minHeight: '68px' }}>
                        <p className="cell-idea">{idea}</p>
                        <div className="cell-method">
                          {COOK_METHODS.map((m) => (
                            <span key={m} className="method-btn">{m}</span>
                          ))}
                        </div>
                      </div>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      </div>

      <PrintPageBreak />

      <div className="print-side print-side-2">
      <div className="bottom-cols">
        <div>
          <h2>Shopping List</h2>
          {GROCERY_CATEGORIES.map((cat) => (
            <div key={cat} className="grocery-cat">
              <h3>{cat}</h3>
              <div className="fill-lines" />
              <div className="fill-lines" />
            </div>
          ))}
        </div>
        <div>
          <h2>Party Size Scaling</h2>
          <div className="scaling" style={{ marginBottom: '12px' }}>
            <h3>Default: 4 people · Adjust by multiplying</h3>
            <table>
              <tbody>
                <tr><td>2 people</td><td>Multiply quantities × 0.5</td></tr>
                <tr><td>6 people</td><td>Multiply quantities × 1.5</td></tr>
                <tr><td>8 people</td><td>Multiply quantities × 2</td></tr>
                <tr><td>Kids under 8</td><td>Count as 0.5 adult portions</td></tr>
              </tbody>
            </table>
          </div>
          <h2>Notes</h2>
          {[1,2,3,4].map((i) => (
            <div key={i} style={{ borderBottom: '1px solid #D6D3D1', height: '22px', marginBottom: '4px' }} />
          ))}
          <h2 style={{ marginTop: '12px' }}>Allergies / Restrictions</h2>
          {[1,2].map((i) => (
            <div key={i} style={{ borderBottom: '1px solid #D6D3D1', height: '22px', marginBottom: '4px' }} />
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify both page heights**

At `http://localhost:3000/printables/3-day-camp-meal-planner/print`, run the two-page check.
Expected: page1 ≤ 979 (measured: **583**), page2 ≤ 979 (measured: **563**).

- [ ] **Step 3: Lint**

Run: `npx eslint components/printables/CampMealPlanner.tsx`
Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add components/printables/CampMealPlanner.tsx
git commit -m "fix(printables): split 3-Day Camp Meal Planner into front/back pages"
```

---

## Task 10: Front & back — Northern Hemisphere Constellation Wheel (1349px → 518px + 647px)

**Files:**
- Modify: `components/printables/ConstellationWheel.tsx:392-467` (the `ConstellationWheel` default export only — the `DISCS` data array above it, lines 60–301, is untouched)

Side 1: Spring + Summer discs. Side 2: Fall + Winter discs + the "How to use this" / "Reading the dots" legend. This is a targeted edit, not a full-file replacement — the file is 510 lines and ~85% of it (the star-coordinate data in `DISCS`) doesn't change.

This file is large enough that giving it its own file-read pass first is worth it: read `components/printables/ConstellationWheel.tsx` before editing so the `old_string` below matches exactly (whitespace-sensitive).

- [ ] **Step 1: Add the import**

Using the Edit tool on `components/printables/ConstellationWheel.tsx`, replace:

```tsx
export default function ConstellationWheel() {
```

with:

```tsx
import PrintPageBreak from './PrintPageBreak'

export default function ConstellationWheel() {
```

- [ ] **Step 2: Split the discs grid and legend across two print sides**

Using the Edit tool on the same file, replace:

```tsx
      <div className="grid grid-cols-2 gap-6 md:gap-8">
        {DISCS.map((disc) => (
          <div key={disc.season}>
            <SkyDisc disc={disc} />
            <p className="mt-1 text-center text-xs text-stone-600 italic px-4">
              {disc.blurb}
            </p>
          </div>
        ))}
      </div>

      <div className="constellation-legend">
        <div>
          <h2>How to use this</h2>
          <p>
            Stand outside after full dark, facing north. Hold the page up
            overhead with the &ldquo;N&rdquo; edge of each disc pointing
            toward Polaris. Use the disc that matches the current season —
            the constellations roughly match what&apos;s overhead at 9pm.
            The sky rotates ~15° per hour, so reorient as the night goes.
          </p>
        </div>
        <div>
          <h2>Reading the dots</h2>
          <p>
            Brighter stars are bigger dots. Lines connect the
            most-recognizable shape of each constellation — they aren&apos;t
            in the actual sky. Polaris is the same point in every disc:
            the sky pivots around it through the night and across the
            seasons.
          </p>
        </div>
      </div>
```

with:

```tsx
      <div className="print-side print-side-1">
        <div className="grid grid-cols-2 gap-6 md:gap-8">
          {DISCS.slice(0, 2).map((disc) => (
            <div key={disc.season}>
              <SkyDisc disc={disc} />
              <p className="mt-1 text-center text-xs text-stone-600 italic px-4">
                {disc.blurb}
              </p>
            </div>
          ))}
        </div>
      </div>

      <PrintPageBreak />

      <div className="print-side print-side-2">
        <div className="grid grid-cols-2 gap-6 md:gap-8">
          {DISCS.slice(2, 4).map((disc) => (
            <div key={disc.season}>
              <SkyDisc disc={disc} />
              <p className="mt-1 text-center text-xs text-stone-600 italic px-4">
                {disc.blurb}
              </p>
            </div>
          ))}
        </div>

        <div className="constellation-legend">
          <div>
            <h2>How to use this</h2>
            <p>
              Stand outside after full dark, facing north. Hold the page up
              overhead with the &ldquo;N&rdquo; edge of each disc pointing
              toward Polaris. Use the disc that matches the current season —
              the constellations roughly match what&apos;s overhead at 9pm.
              The sky rotates ~15° per hour, so reorient as the night goes.
            </p>
          </div>
          <div>
            <h2>Reading the dots</h2>
            <p>
              Brighter stars are bigger dots. Lines connect the
              most-recognizable shape of each constellation — they aren&apos;t
              in the actual sky. Polaris is the same point in every disc:
              the sky pivots around it through the night and across the
              seasons.
            </p>
          </div>
        </div>
      </div>
```

Note `DISCS` order is `[Spring, Summer, Fall, Winter]` (defined in the untouched top of the file), so `slice(0, 2)` is Spring+Summer and `slice(2, 4)` is Fall+Winter.

- [ ] **Step 3: Verify both page heights**

At `http://localhost:3000/printables/northern-hemisphere-constellation-wheel/print`, run the two-page check.
Expected: page1 ≤ 979 (measured: **518**), page2 ≤ 979 (measured: **647**). Bonus: each disc now renders larger than in the old 4-up layout, since only 2 share the row instead of 4 — worth a visual spot-check, not just the height number.

- [ ] **Step 4: Lint**

Run: `npx eslint components/printables/ConstellationWheel.tsx`
Expected: no output.

- [ ] **Step 5: Commit**

```bash
git add components/printables/ConstellationWheel.tsx
git commit -m "fix(printables): split Constellation Wheel into front/back pages"
```

---

## Task 11: Front & back — Animal Track ID Card (1166px → 567px + 437px)

**Files:**
- Modify: `components/printables/AnimalTrackIdCard.tsx`

Side 1: the 4 common/harmless tracks (deer, raccoon, cottontail, squirrel). Side 2: the 4 tracks worth extra caution (fox, coyote, black bear, skunk — 2 of which already carry a `warn` line). Extracts a `TrackCard` sub-component so the panel markup isn't duplicated between the two `.slice()` calls (DRY — the panel JSX is identical for both halves, only the data differs).

- [ ] **Step 1: Replace the file contents**

Replace the entire contents of `components/printables/AnimalTrackIdCard.tsx` with:

```tsx
type TrackPanel = {
  animal: string
  emoji: string
  frontTrack: string
  hindTrack: string
  sizeInches: string
  gait: string
  claws: string
  note?: string
  warn?: string
  trackImg?: { url: string; alt: string }
}

const TRACKS: TrackPanel[] = [
  {
    animal: 'White-tailed Deer',
    emoji: '🦌',
    frontTrack: 'Two elongated, pointed lobes (hooves) forming a heart shape. Dewclaws show in soft mud.',
    hindTrack: 'Slightly smaller than front, same heart shape.',
    sizeInches: '2–3 in long',
    gait: 'Walking: diagonal pattern. Bounding: four tracks clustered together.',
    claws: 'No claws visible',
    note: 'Most common track in wooded campsites. Often found on soft soil near water.',
    trackImg: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Whitetail_track.svg',
      alt: 'White-tailed deer hoofprint — two pointed lobes in a heart shape',
    },
  },
  {
    animal: 'Raccoon',
    emoji: '🦝',
    frontTrack: '5 long, finger-like toes splayed wide. Looks like a tiny human hand.',
    hindTrack: 'Longer than front, heel often visible. Walks flat-footed.',
    sizeInches: '2–3 in wide',
    gait: 'Hind foot prints near front foot, offset left/right.',
    claws: 'Claws visible on all 5 toes',
    note: 'Often found near water or trash. Mostly nocturnal — morning tracks are common.',
  },
  {
    animal: 'Eastern Cottontail',
    emoji: '🐇',
    frontTrack: '4 toes, small round print. Lands behind the larger hind feet when bounding.',
    hindTrack: 'Much larger than front — elongated oval, side by side when bounding.',
    sizeInches: 'Front: 1 in · Hind: 3 in',
    gait: 'Classic bounding Y-shape: two large hind feet forward, two small fronts behind.',
    claws: 'Faint claws on hind feet',
    note: 'The Y-shape bounding pattern is unmistakable. Often found at wood edges.',
    trackImg: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Rabbit_tracks.svg',
      alt: 'Rabbit bounding track pattern — two large hind feet ahead, two small front feet behind',
    },
  },
  {
    animal: 'Gray Squirrel',
    emoji: '🐿️',
    frontTrack: '4 toes in a tight cluster. Small and round.',
    hindTrack: '5 toes, longer and wider than front. Often lands ahead of front in bounding.',
    sizeInches: 'Front: ¾ in · Hind: 1½ in',
    gait: 'Bounding pairs: small fronts together, large hinds ahead — square cluster pattern.',
    claws: 'Thin claws visible',
    note: 'The square cluster is the key ID. Common at every campsite with trees.',
  },
  {
    animal: 'Red Fox',
    emoji: '🦊',
    frontTrack: '4 toes in an oval, with a bar-shaped central pad. Often shows fur between toes.',
    hindTrack: 'Nearly identical to front — slightly smaller.',
    sizeInches: '2–2½ in long',
    gait: 'Direct-register trot: hind foot lands precisely in front footprint, making a straight line.',
    claws: 'Claws visible, fine and close-set',
    note: 'The perfectly straight line of single prints is the fox signature. Coyote is larger.',
    trackImg: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Foxprint.svg',
      alt: 'Red fox paw print — oval shape with 4 toes and a central bar pad',
    },
  },
  {
    animal: 'Coyote',
    emoji: '🐺',
    frontTrack: '4 toes, oval shape, larger than fox. Less fur between toes.',
    hindTrack: 'Slightly smaller than front, same oval form.',
    sizeInches: '2½–3 in long',
    gait: 'Direct-register trot like fox — straight line. Wider stride than fox.',
    claws: 'Prominent claws clearly visible',
    warn: 'If pups are nearby, adults may be bold. Haze with noise if one approaches camp.',
    trackImg: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Canis_lupis_track.svg',
      alt: 'Canine track — 4 toes with prominent claws above a large central pad',
    },
  },
  {
    animal: 'Black Bear',
    emoji: '🐻',
    frontTrack: '5 toes in a wide arc above a large, chunky pad. Pigeon-toed.',
    hindTrack: 'Much longer — resembles a wide human foot with 5 toes.',
    sizeInches: 'Front: 4–5 in · Hind: 6–7 in',
    gait: 'Shuffling walk — hind foot lands slightly inside front track.',
    claws: 'Long curved claws up to 2 in ahead of toes',
    warn: 'Secure all food immediately. Never leave smelly items in tent. Report to camp host.',
  },
  {
    animal: 'Striped Skunk',
    emoji: '🦨',
    frontTrack: '5 toes with prominent long claws (used for digging). Compact pad.',
    hindTrack: 'Shorter claws, rounder toes. Heel visible.',
    sizeInches: '1–1½ in wide',
    gait: 'Slow, waddling walk — front and hind on same side move together.',
    claws: 'Very long front claws — most distinctive feature',
    note: 'Tracks often found near logs, disturbed soil, and grubs. Mostly nocturnal.',
  },
]

import PrintPageBreak from './PrintPageBreak'

function TrackCard({ t }: { t: TrackPanel }) {
  return (
    <div className="panel">
      <div className="panel-inner">
        <div className="panel-body">
          <p className="animal-name"><span>{t.emoji}</span>{t.animal}</p>
          <p className="size">{t.sizeInches}</p>
          <p className="row"><strong>Front</strong> {t.frontTrack}</p>
          <p className="row"><strong>Hind</strong> {t.hindTrack}</p>
          <p className="row"><strong>Gait</strong> {t.gait}</p>
          <p className="row"><strong>Claws</strong> {t.claws}</p>
          {t.note && <p className="note">{t.note}</p>}
          {t.warn && <p className="warn">⚠ {t.warn}</p>}
        </div>
        {t.trackImg && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={t.trackImg.url}
            alt={t.trackImg.alt}
            className="track-img"
            draggable={false}
          />
        )}
      </div>
    </div>
  )
}

export default function AnimalTrackIdCard() {
  return (
    <div className="track-card">
      <style>{`
        .track-card {
          font-family: 'Source Serif 4', Georgia, serif;
          color: #1C1917;
          line-height: 1.45;
        }
        .track-card .lead {
          font-size: 12px;
          color: #44403C;
          margin: 0 0 14px 0;
        }
        .track-card .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .track-card .panel {
          border: 1px solid #D6D3D1;
          border-radius: 6px;
          padding: 10px 12px;
          background: #FAF8F2;
          break-inside: avoid;
        }
        .track-card .panel-inner {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        .track-card .panel-body {
          flex: 1;
          min-width: 0;
        }
        .track-card .track-img {
          width: 58px;
          height: 72px;
          flex-shrink: 0;
          object-fit: contain;
          opacity: 0.75;
          filter: grayscale(1);
          margin-top: 2px;
        }
        .track-card .panel .animal-name {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #1C1917;
          margin: 0 0 2px 0;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .track-card .panel .size {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 600;
          color: #78716C;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin: 0 0 6px 0;
        }
        .track-card .panel .row {
          font-size: 11px;
          color: #44403C;
          margin: 0 0 4px 0;
          line-height: 1.4;
        }
        .track-card .panel .row strong {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #78716C;
        }
        .track-card .panel .note {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          color: #57534E;
          margin: 5px 0 0 0;
          padding-top: 5px;
          border-top: 1px dotted #D6D3D1;
          font-style: italic;
        }
        .track-card .panel .warn {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 10px;
          color: #B91C1C;
          margin: 5px 0 0 0;
          padding-top: 5px;
          border-top: 1px dotted #D6D3D1;
        }
      `}</style>

      <div className="print-side print-side-1">
        <p className="lead">
          Track size varies by age and substrate — mud shows more detail than dust. When in doubt, look for the gait pattern: it&apos;s more reliable than print shape alone.
        </p>

        <div className="grid">
          {TRACKS.slice(0, 4).map((t) => (
            <TrackCard key={t.animal} t={t} />
          ))}
        </div>
      </div>

      <PrintPageBreak />

      <div className="print-side print-side-2">
        <div className="grid">
          {TRACKS.slice(4, 8).map((t) => (
            <TrackCard key={t.animal} t={t} />
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify both page heights**

At `http://localhost:3000/printables/animal-track-id-card/print`, run the two-page check.
Expected: page1 ≤ 979 (measured: **567**), page2 ≤ 979 (measured: **437**).

- [ ] **Step 3: Lint**

Run: `npx eslint components/printables/AnimalTrackIdCard.tsx`
Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add components/printables/AnimalTrackIdCard.tsx
git commit -m "fix(printables): split Animal Track ID Card into front/back pages"
```

---

## Task 12: Update landing-page copy for the 6 front/back printables

**Files:**
- Modify: `lib/printables/data.ts`

Each of the 6 front/back printables' `formatNote` currently reads `'Single-page printable · Letter / A4 · Free with email signup'`. All 6 need it changed to `'Single-sheet printable · front & back · Letter / A4 · Free with email signup'`. 3 of the 6 (`northern-hemisphere-constellation-wheel`, `fire-starting-checklist`, `bear-bag-food-storage-card`) also have a `tagline` that explicitly says "one page" and needs rewording; all 6 have a `whatYouGet` bullet ending in "Letter / A4 sized[...]" that should mention front & back.

Because `formatNote`'s string is identical across all 15 entries, each edit below is anchored using surrounding lines unique to that printable (the adjacent `whatYouGet` bullet or `useCases` text) so the Edit tool's required-unique-match doesn't accidentally hit a different entry.

- [ ] **Step 1: `northern-hemisphere-constellation-wheel`**

Using the Edit tool on `lib/printables/data.ts`, replace:

```ts
    tagline:
      'A one-page printable. Four seasonal sky maps. Polaris in the center of every view, with the major constellations placed where you’ll actually see them.',
    whatYouGet: [
      'Four quadrant sky maps — spring, summer, fall, winter — sized to fold flat in a pack',
      'The Big Dipper, Cassiopeia, Orion, the Summer Triangle, and 8+ more major constellations',
      'A short "how to read this" sidebar so it works the first time out',
      'Letter / A4 sized, printed in a single ink-friendly color pass',
    ],
    useCases: [
      'A camp activity for kids that doesn’t need a phone',
      'Something to clip to the fridge so you actually go outside on the next clear night',
      'A reference card for a first stargazing trip',
    ],
    formatNote: 'Single-page printable · Letter / A4 · Free with email signup',
```

with:

```ts
    tagline:
      'A two-page printable, front and back. Four seasonal sky maps. Polaris in the center of every view, with the major constellations placed where you’ll actually see them.',
    whatYouGet: [
      'Four quadrant sky maps — spring, summer, fall, winter — sized to fold flat in a pack',
      'The Big Dipper, Cassiopeia, Orion, the Summer Triangle, and 8+ more major constellations',
      'A short "how to read this" sidebar so it works the first time out',
      'Letter / A4 sized, front & back, printed in a single ink-friendly color pass',
    ],
    useCases: [
      'A camp activity for kids that doesn’t need a phone',
      'Something to clip to the fridge so you actually go outside on the next clear night',
      'A reference card for a first stargazing trip',
    ],
    formatNote: 'Single-sheet printable · front & back · Letter / A4 · Free with email signup',
```

- [ ] **Step 2: `fire-starting-checklist`**

Replace:

```ts
    tagline:
      'Build, light, maintain, extinguish. The four-stage fire process every camper should know — on one page.',
    whatYouGet: [
      'The three-tier wood stack: tinder, kindling, fuelwood — sizes and quantities',
      'Teepee vs log cabin build comparison',
      'The light sequence — under the tinder bundle, not above',
      'The drown-stir-drown extinguish protocol with safety call-outs',
      'Letter / A4 sized, one-color print',
    ],
    useCases: [
      'Hand to a kid old enough to build their first fire',
      'Carry in a glove-box first-aid kit as a quick reference',
      'Brief a co-camper before a trip',
    ],
    formatNote: 'Single-page printable · Letter / A4 · Free with email signup',
```

with:

```ts
    tagline:
      'Build, light, maintain, extinguish. The four-stage fire process every camper should know — front and back.',
    whatYouGet: [
      'The three-tier wood stack: tinder, kindling, fuelwood — sizes and quantities',
      'Teepee vs log cabin build comparison',
      'The light sequence — under the tinder bundle, not above',
      'The drown-stir-drown extinguish protocol with safety call-outs',
      'Letter / A4 sized, front & back, one-color print',
    ],
    useCases: [
      'Hand to a kid old enough to build their first fire',
      'Carry in a glove-box first-aid kit as a quick reference',
      'Brief a co-camper before a trip',
    ],
    formatNote: 'Single-sheet printable · front & back · Letter / A4 · Free with email signup',
```

- [ ] **Step 3: `bear-bag-food-storage-card`**

Replace:

```ts
    tagline:
      'What goes in. How to hang it. What to do if the bag comes down. One page keeps your food — and the bear — safe.',
    whatYouGet: [
      'Complete "goes in the bag" checklist: food, wrappers, toiletries, lip balm, dog food',
      'PCT counter-balance hang method with rope length and branch-height specs',
      'Bear canister volume guide by trip length and party size',
      'What to do if a bear gets your food — the actual steps',
      'Letter / A4 sized',
    ],
    useCases: [
      'Pair with the Food Storage & Bear Bags skill — the field-carry version',
      'Brief a first-timer co-camper before a backcountry or dispersed trip',
      'Keep in a bear canister lid as a nightly reminder',
    ],
    formatNote: 'Single-page printable · Letter / A4 · Free with email signup',
```

with:

```ts
    tagline:
      'What goes in. How to hang it. What to do if the bag comes down. Front and back keeps your food — and the bear — safe.',
    whatYouGet: [
      'Complete "goes in the bag" checklist: food, wrappers, toiletries, lip balm, dog food',
      'PCT counter-balance hang method with rope length and branch-height specs',
      'Bear canister volume guide by trip length and party size',
      'What to do if a bear gets your food — the actual steps',
      'Letter / A4 sized, front & back',
    ],
    useCases: [
      'Pair with the Food Storage & Bear Bags skill — the field-carry version',
      'Brief a first-timer co-camper before a backcountry or dispersed trip',
      'Keep in a bear canister lid as a nightly reminder',
    ],
    formatNote: 'Single-sheet printable · front & back · Letter / A4 · Free with email signup',
```

- [ ] **Step 4: `camp-first-aid-quick-reference`**

Replace:

```ts
    whatYouGet: [
      'Treatment steps for 8 common camp injuries in plain language',
      '"Evacuate now" flags — the specific signs that mean leave, not wait',
      'The baseline kit checklist: what a camp first aid kit must include',
      'An emergency contact fill-in section for nearest ranger station and hospital',
      'Letter / A4 sized',
    ],
    useCases: [
      'Laminate and keep inside the first aid kit so they always travel together',
      'Pair with the Building a Camp First Aid Kit skill',
      'Brief any co-camper who might be alone with kids on the trail',
    ],
    formatNote: 'Single-page printable · Letter / A4 · Free with email signup',
```

with:

```ts
    whatYouGet: [
      'Treatment steps for 8 common camp injuries in plain language',
      '"Evacuate now" flags — the specific signs that mean leave, not wait',
      'The baseline kit checklist: what a camp first aid kit must include',
      'An emergency contact fill-in section for nearest ranger station and hospital',
      'Letter / A4 sized, front & back',
    ],
    useCases: [
      'Laminate and keep inside the first aid kit so they always travel together',
      'Pair with the Building a Camp First Aid Kit skill',
      'Brief any co-camper who might be alone with kids on the trail',
    ],
    formatNote: 'Single-sheet printable · front & back · Letter / A4 · Free with email signup',
```

- [ ] **Step 5: `3-day-camp-meal-planner`**

Replace:

```ts
    whatYouGet: [
      'A 3-day meal grid: Breakfast · Lunch · Dinner · Snacks × Day 1, 2, 3',
      'A cook-method column: campfire, 2-burner stove, cast iron, or no-cook',
      'A fill-in shopping list organized by category',
      'Suggested meals per slot with prep time and difficulty',
      'Party-size scaling note — default portions for 4 people',
      'Letter / A4 sized',
    ],
    useCases: [
      'Meal planning the week before any multi-day camping trip',
      'Pair with the Camp Coffee and Cast Iron Cooking skills',
      'Brief a co-parent handling food so nothing gets doubled or missed',
    ],
    formatNote: 'Single-page printable · Letter / A4 · Free with email signup',
```

with:

```ts
    whatYouGet: [
      'A 3-day meal grid: Breakfast · Lunch · Dinner · Snacks × Day 1, 2, 3',
      'A cook-method column: campfire, 2-burner stove, cast iron, or no-cook',
      'A fill-in shopping list organized by category',
      'Suggested meals per slot with prep time and difficulty',
      'Party-size scaling note — default portions for 4 people',
      'Letter / A4 sized, front & back',
    ],
    useCases: [
      'Meal planning the week before any multi-day camping trip',
      'Pair with the Camp Coffee and Cast Iron Cooking skills',
      'Brief a co-parent handling food so nothing gets doubled or missed',
    ],
    formatNote: 'Single-sheet printable · front & back · Letter / A4 · Free with email signup',
```

- [ ] **Step 6: `animal-track-id-card`**

Replace:

```ts
    whatYouGet: [
      'Track patterns for 8 common North American animals with size in inches',
      'Front and hind foot differences where they matter for ID',
      'Key field markers: gait pattern, claw visibility, toe count',
      '"What to do" notes for bear and coyote sightings',
      'Letter / A4 sized, one-color print',
    ],
    useCases: [
      'Morning nature walk around the campsite — pairs with the Animal Track Hunt activity',
      'Field reference near water, mud, or soft trail edges where tracks appear',
      'A structured nature lesson for kids who need something to look for',
    ],
    formatNote: 'Single-page printable · Letter / A4 · Free with email signup',
```

with:

```ts
    whatYouGet: [
      'Track patterns for 8 common North American animals with size in inches',
      'Front and hind foot differences where they matter for ID',
      'Key field markers: gait pattern, claw visibility, toe count',
      '"What to do" notes for bear and coyote sightings',
      'Letter / A4 sized, front & back, one-color print',
    ],
    useCases: [
      'Morning nature walk around the campsite — pairs with the Animal Track Hunt activity',
      'Field reference near water, mud, or soft trail edges where tracks appear',
      'A structured nature lesson for kids who need something to look for',
    ],
    formatNote: 'Single-sheet printable · front & back · Letter / A4 · Free with email signup',
```

- [ ] **Step 7: Verify no other entries were affected**

Run: `grep -c "formatNote: 'Single-page printable" lib/printables/data.ts`
Expected: `9` (15 total minus the 6 just changed).

Run: `grep -c "formatNote: 'Single-sheet printable" lib/printables/data.ts`
Expected: `6`.

- [ ] **Step 8: Lint**

Run: `npx eslint lib/printables/data.ts`
Expected: no output.

- [ ] **Step 9: Commit**

```bash
git add lib/printables/data.ts
git commit -m "docs(printables): update front/back copy for the 6 restructured printables"
```

---

## Task 13: Full verification and cleanup

**Files:** none modified — this task only runs checks.

- [ ] **Step 1: Re-measure all 15 printables**

With `npm run dev` running, open each of the following in a browser at ≥1280px width and run the single- or two-page height check (from Task 2 Step 2 or Task 6 Step 2 as appropriate) at each URL:

```
http://localhost:3000/printables/northern-hemisphere-constellation-wheel/print   (2-page)
http://localhost:3000/printables/camp-cooking-conversion-card/print              (1-page, unchanged — sanity check)
http://localhost:3000/printables/backyard-test-checklist/print                   (1-page)
http://localhost:3000/printables/fire-starting-checklist/print                   (2-page)
http://localhost:3000/printables/knot-reference-card/print                       (1-page)
http://localhost:3000/printables/animal-track-id-card/print                      (2-page)
http://localhost:3000/printables/nature-scavenger-hunt-card/print                (1-page, unchanged — sanity check)
http://localhost:3000/printables/night-sky-bingo/print                           (1-page, unchanged — sanity check)
http://localhost:3000/printables/shadow-puppet-hand-guide/print                  (1-page)
http://localhost:3000/printables/kids-camping-packing-list/print                 (1-page, unchanged — sanity check)
http://localhost:3000/printables/weather-signs-field-card/print                  (1-page, unchanged — sanity check)
http://localhost:3000/printables/bear-bag-food-storage-card/print                (2-page)
http://localhost:3000/printables/camp-first-aid-quick-reference/print            (2-page)
http://localhost:3000/printables/leave-no-trace-quick-reference/print            (1-page)
http://localhost:3000/printables/3-day-camp-meal-planner/print                   (2-page)
```

Expected: every page/side ≤ 979.2px. If anything regressed (a shared style or the 5 "unchanged" ones moved), stop and investigate before continuing — something outside this plan's edits shifted.

- [ ] **Step 2: Run the full test suite**

Run: `npx vitest run`
Expected: same pass count as before this branch started (this plan adds no new tests — it's a visual/layout fix — so the count should be unchanged; if any printables-related test exists and fails, investigate before proceeding).

- [ ] **Step 3: Lint the whole repo**

Run: `npx eslint .`
Expected: no errors introduced by this plan's files (pre-existing warnings elsewhere in the repo are not this plan's concern).

- [ ] **Step 4: Full production build**

Run: `npm run build`
Expected: exits 0, includes `/printables/[slug]` and `/printables/[slug]/print` in the static output with no errors. This is the most important check — the print page renders every artwork component at build time, so a broken import (e.g. a missing `PrintPageBreak` import) fails the build immediately.

- [ ] **Step 5: Visual spot-check 2 of the 6 front/back cards**

Take a screenshot (browser devtools or a screenshot tool) of `http://localhost:3000/printables/bear-bag-food-storage-card/print` and `http://localhost:3000/printables/northern-hemisphere-constellation-wheel/print` at a tall viewport (e.g. 850×1450) to confirm both pages render cleanly, the dashed "Side 2 — prints on the back" divider shows on screen, and nothing looks visually broken (overlapping text, cut-off content, misaligned grids).

- [ ] **Step 6: Push and open a PR**

```bash
git push -u origin fix/printables-print-overflow
gh pr create --base main --title "fix: repair print-overflow on 10 of 15 printables" --body "$(cat <<'EOF'
## Summary
10 of 15 printables overflowed onto a 2nd physical page despite claiming
"single-page printable" (confirmed by measuring rendered height against
the print CSS's actual usable page area). Fixed per
docs/superpowers/specs/2026-08-30-printables-upgrade-design.md part 1:

- 4 cards trimmed to genuinely fit one page (Backyard Test Checklist,
  Knot Reference Card, Shadow Puppet Hand Guide, Leave No Trace Quick
  Reference) — content merged/tightened, nothing deleted.
- 6 cards restructured as front/back sheets via a new shared
  PrintPageBreak component (Bear Bag & Food Storage Card, Camp First
  Aid Quick Reference, Fire-Starting Checklist, 3-Day Camp Meal
  Planner, Northern Hemisphere Constellation Wheel, Animal Track ID
  Card) — all original content kept, formatNote copy updated to
  "Single-sheet printable · front & back".

Every fix was verified live against a running dev server before being
written into the implementation plan — the page-height numbers in the
plan and this PR are measured, not estimated.

## Test plan
- [x] All 15 printables re-measured: every page/side ≤ 979px (Letter
      usable print height)
- [x] `npx vitest run` — full suite passes
- [x] `npx eslint .` — clean
- [x] `npm run build` — clean production build, print pages included
- [x] Visual spot-check on 2 of the 6 front/back cards

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```
