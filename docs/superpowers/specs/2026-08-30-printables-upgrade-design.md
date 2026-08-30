# Printables Upgrade — Design Spec
Date: 2026-08-30

## Overview

The printables system (`/printables`, 15 free single-page reference cards, email-gated) has three problems and one gap, all confirmed by direct inspection of the live site and the print output:

1. **10 of 15 printables overflow onto a second physical page** despite every one claiming "single-page printable." Measured by comparing each `.printable-print` element's rendered height against the usable print area of a Letter page (11in − 0.8in top/bottom margin = 979px at 96 CSS px/in). Overflow ranges from +9% (Backyard Test Checklist) to +53% (Bear Bag & Food Storage Card).
2. **Guide pages (40+) and plan pages (4) never link to printables.** Printables link out to one guide and one skill each (`relatedGuideSlug`, `relatedSkillPath`), and skills link back to printables (`relatedPrintableSlug` on skill entries), but the guide/plan → printable direction doesn't exist anywhere in the codebase.
3. **Printables never surface real gear.** A visitor reading the Camp First Aid Quick Reference has no path to the actual first aid kit sold on the site.
4. **Only 15 printables exist**, with no coverage for dog camping, kid activities beyond one scavenger hunt, or campsite layout — all topics with existing guide/gear support elsewhere on the site.

This spec covers fixing all four. It touches the printables data model and print shell, adds one new curated mapping file, extends `GuidePage` and the plan template page, and adds 3 new printables + 3 new affiliate products.

---

## 1. Print-overflow fix

### Measured state (today, at `.printable-print` render width 816px / 8.5in)

| Slug | Height (px) | Overflow | Fix |
|---|---|---|---|
| camp-cooking-conversion-card | 759 | — | already fits |
| nature-scavenger-hunt-card | 739 | — | already fits |
| night-sky-bingo | 868 | — | already fits |
| kids-camping-packing-list | 874 | — | already fits |
| weather-signs-field-card | 854 | — | already fits |
| backyard-test-checklist | 1072 | +9.5% | **trim** |
| knot-reference-card | 1086 | +10.9% | **trim** |
| shadow-puppet-hand-guide | 1066 | +8.9% | **trim** |
| leave-no-trace-quick-reference | 1070 | +9.3% | **trim** |
| animal-track-id-card | 1166 | +19.1% | **front/back** |
| camp-first-aid-quick-reference | 1184 | +20.9% | **front/back** |
| fire-starting-checklist | 1261 | +28.8% | **front/back** |
| 3-day-camp-meal-planner | 1311 | +33.9% | **front/back** |
| northern-hemisphere-constellation-wheel | 1349 | +37.8% | **front/back** |
| bear-bag-food-storage-card | 1497 | +52.9% | **front/back** |

Threshold: overflow under ~15% is addressed by cutting content; above that, the card is treated as reference material where cutting content would meaningfully reduce its value, so it becomes a front/back sheet instead.

### Trim-to-fit (4 cards)

For `BackyardTestChecklist.tsx`, `KnotReferenceCard.tsx`, `ShadowPuppetHandGuide.tsx`, `LeaveNoTraceQuickReference.tsx`: reduce list items / shorten copy / tighten spacing directly in each component until re-measuring puts height at or under 979px. No print-shell changes needed. `formatNote` stays "Single-page printable."

### Front & back (6 cards)

For `AnimalTrackIdCard.tsx`, `CampFirstAidQuickReference.tsx`, `FireStartingChecklist.tsx`, `CampMealPlanner.tsx`, `ConstellationWheel.tsx`, `BearBagFoodStorageCard.tsx`:

- Each component splits its content into two logical halves and renders both wrapped in a `<PrintPageBreak />` marker component (new, `components/printables/PrintPageBreak.tsx`) — a `<div>` with `break-after: page` in screen+print CSS, so the screen preview also shows the split (via a visible divider) for accuracy.
- `app/printables/[slug]/print/page.tsx` needs **no changes at all**. It already wraps every artwork component with `header-strip` above and `footer-strip` below, unconditionally. Since each front/back artwork component now renders its own `<PrintPageBreak />` internally, those existing wrappers already land in the right place — header before side 1, footer after side 2 — with no `twoPage` flag or `ARTWORK_RENDERERS` shape change needed. (An earlier draft of this spec proposed such a flag; verified during implementation that it was unnecessary and simpler to omit.)
- `lib/printables/types.ts`: no schema change needed — the split is entirely an artwork-component and print-shell concern, not `Printable` content metadata.
- `formatNote` for these 6 changes from `'Single-page printable · Letter / A4 · Free with email signup'` to `'Single-sheet printable · front & back · Letter / A4 · Free with email signup'`.
- Landing-page copy (`whatYouGet` bullet mentioning "Letter / A4 sized...") gets the same front/back wording where present.

### Verification

Re-run the same height-measurement check (Playwright/browser `getBoundingClientRect()` against the 979px threshold) against all 15 (soon 18) printables after the fix. This isn't a new automated test in this pass — it's a manual verification step during implementation, same technique used to find the bug. (A follow-up could turn it into a Playwright test; out of scope here — see Open Questions.)

---

## 2. Cross-linking

### New file: `data/guide-printables.ts`

Mirrors the existing `data/guide-gear.ts` curation pattern:

```ts
export const GUIDE_PRINTABLES: Record<string, string[]> = {
  'first-night-camping-guide': ['northern-hemisphere-constellation-wheel', 'backyard-test-checklist'],
  'camping-with-dogs-first-time': ['camping-with-dogs-field-card'], // new printable, see §4
  // ...curated per-guide, not every guide needs an entry
}
```

Helper `getPrintablesForGuide(slug: string): Printable[]` in `lib/printables/index.ts` (or a new `lib/printables/helpers.ts`), filtering `PRINTABLES` by slugs present for that guide, dropping unknown slugs defensively (mirrors how `getSkillsLinkedToPrintable` already behaves).

### `components/guide/GuidePage.tsx`

Add a "Free printable for this trip" section, rendered automatically from `getPrintablesForGuide(slug)` — **no changes to any of the 40+ individual `app/guides/*/page.tsx` files**, since `GuidePage` already receives `slug` and wraps every guide uniformly (same reason `<StickyQuizCTA />` doesn't need per-file wiring). Renders `null`-equivalent (nothing) when the lookup is empty. Visual treatment: small card grid, same pattern as the existing "Skills that use this printable" section on printable pages (title + one-line description + arrow, linking to `/printables/<slug>`).

### `app/plans/[planId]/page.tsx`

Only 4 plans, one dynamic route — map plan slug → printable slug(s) inline in this file (no separate data file needed at this scale) and render the same card-grid section.

### `app/printables/[slug]/page.tsx`

Add a reverse-lookup "Guides that use this printable" section, symmetric with the existing "Skills that use this printable" section — `GUIDE_PRINTABLES` is scanned for any guide listing this printable's slug, same visual pattern (card grid linking to `/guides/<slug>`).

---

## 3. "Shop the real gear" section on printables

### `lib/printables/types.ts`

Add one optional field to `Printable`:

```ts
/** Real gear cross-sell, by AFFILIATE_PRODUCTS id — the "pro" version of the analog card. */
relatedProductIds?: string[]
```

### `app/printables/[slug]/page.tsx`

When `relatedProductIds` is non-empty, resolve to `AffiliateProduct[]` and render the **existing** `<AffiliateBlock products={...} />` component (`components/plan/AffiliateBlock.tsx`) — already used on plan pages, already handles the essential/comfort/convenience grouping, image/price/link rendering, and empty-state (`visible.length === 0` → `null`). No new UI component needed. Section heading override to something printable-appropriate ("Want the real thing?") — `AffiliateBlock` doesn't currently take a heading override, so add one optional prop (`heading?: string`, default `"Gear for this trip"`) rather than forking the component.

### New affiliate products (research required before this section can ship on 3 cards)

Same verification process as the earlier ASIN fixes (live page fetch, confirm in-stock, confirm price/spec match, `tag=trailsteadgui-20`):

1. **Firestarter / ferro rod kit** — for Fire-Starting Checklist.
2. **Paracord / utility rope** — for Knot Reference Card.
3. **Bear canister or odor-proof storage bag** — for Bear Bag & Food Storage Card.

All three added to `lib/affiliate-products.ts` as `category: 'essential'`, with `templateSlugs: []` (not part of the quiz-driven plan gear system, printable-only cross-sell) and no `slot` (not part of the guide gear-shelf slot system either — these are print-page-only recommendations, not general site gear recommendations, so they intentionally sit outside `lib/affiliate/gear-slots.ts`).

### Mapping (`relatedProductIds` per printable)

| Printable | Product(s) |
|---|---|
| northern-hemisphere-constellation-wheel | headlamp-family, luminaid-packlite-max |
| camp-cooking-conversion-card | coleman-triton-2-burner, thtybros-cookware-mess-kit |
| backyard-test-checklist | coleman-sundome-4p, sleeping-bag-family, headlamp-family |
| fire-starting-checklist | *(new firestarter product)* |
| knot-reference-card | *(new paracord product)* |
| animal-track-id-card | — (no good match; ships without this section) |
| nature-scavenger-hunt-card | — (no good match; ships without this section) |
| night-sky-bingo | headlamp-family |
| shadow-puppet-hand-guide | luminaid-packlite-max |
| kids-camping-packing-list | kidco-gopod, headlamp-family |
| weather-signs-field-card | geertop-17x10-tarp |
| bear-bag-food-storage-card | *(new bear canister/dry bag product)* |
| camp-first-aid-quick-reference | thriad-first-aid-430 |
| leave-no-trace-quick-reference | fwc-trash-can-wakeman |
| 3-day-camp-meal-planner | coleman-triton-2-burner, coleman-classic-rolling-cooler |
| camping-with-dogs-field-card *(new)* | katolk-tie-out |
| junior-ranger-activity-sheet *(new)* | kidco-gopod |
| campsite-setup-diagram *(new)* | coleman-sundome-4p, canopy-camp, camp-chairs |

---

## 4. Three new printables

All built single-page from the start (budgeted against the 979px threshold during development, not after) — same component/data pattern as the existing 15.

1. **Camping With Dogs Field Card** (`camping-with-dogs-field-card`, category: TBD — see Open Questions) — tie-out setup, campsite dog-proofing checklist, heat/paw-safety notes, what to pack. Cross-links: guide `camping-with-dogs-first-time`, product `katolk-tie-out`.
2. **Junior Ranger / Kid Activity Sheet** (`junior-ranger-activity-sheet`, category: `kids`) — pulls from the activity content already in `lib/activities/data.ts` / plan `activitySchedule`s rather than inventing new activities; a fill-in-the-blank / checklist format distinct from the existing scavenger-hunt card. Cross-links: plan pages (all 4), product `kidco-gopod`.
3. **Campsite Setup Diagram** (`campsite-setup-diagram`, category: `planning`) — a labeled top-down layout card (tent zone, kitchen zone, fire ring, food storage, parking) with distance/spacing guidance, referenced by the arrival/evening timeline sections already present in every plan template. Cross-links: all 4 plans, guide `how-to-choose-a-family-campsite`, products `coleman-sundome-4p` / `canopy-camp` / `camp-chairs`.

Each gets: a new component under `components/printables/`, a `PRINTABLES` entry in `lib/printables/data.ts`, an `ARTWORK_RENDERERS` entry, and the cross-link/product wiring from §2–3.

---

## Testing

- Existing suite (`lib/printables/__tests__` if present, `lib/affiliate/__tests__/guide-gear.test.ts`-style checks) should gain equivalents for `getPrintablesForGuide` and the new `relatedProductIds` resolving against `AFFILIATE_PRODUCTS` (mirrors the existing "every productId resolves" pattern already enforced for `lib/personalization/product-map.ts`).
- `node scripts/validate-affiliate-links.mjs` and `node scripts/check-affiliate-images.mjs` re-run after the 3 new products are added.
- `npm run build` as a full-site smoke test (same as used to verify the affiliate-fix and gear-consistency work earlier).
- Manual re-measurement of all 18 printables' print heights (script or ad hoc) to confirm the overflow fix actually landed.

## Open Questions

- **New printable category:** `PrintableCategoryId` is currently `'stargazing' | 'cooking' | 'knots' | 'fire' | 'planning' | 'kids'`. Camping With Dogs doesn't fit cleanly — either add a `'safety'`/`'pets'` category or file it under `planning`. Left for the implementation plan to decide, doesn't affect this design's architecture.
- **Automated overflow regression test:** this spec fixes the current overflow but doesn't add a test to prevent it recurring on a future printable. Worth a follow-up (e.g., a Playwright check against the 979px threshold in CI) — intentionally out of scope here to keep this spec focused.
