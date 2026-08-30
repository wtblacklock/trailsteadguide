# Site-Wide Search — Design Spec
Date: 2026-08-30

## Overview

The site has grown to roughly 300 individually addressable pages — 44 guides, 68
skills, 38 activities, 16 printables, 12 comparison pages, 71 active gear
products, 59 glossary terms, and 4 plans — with no way to search across any of
it. The only navigation paths are the five hub pages in the header nav
(Guides/Skills/Activities/Gear/Printables) and whatever internal links happen
to exist between pages. A visitor who knows roughly what they want (e.g. "the
tent guide" or "how to tie a bowline") has no fast way to get there.

This spec covers a site-wide search feature: an icon in the header that opens
an instant-results overlay, searchable across all content types, filterable by
type. It does not cover other "one-stop-shop" ideas (e.g. the shelved
printables-gear cross-sell spec) — those remain separate future work.

## Scope decisions (from brainstorming)

- **Interaction model**: instant overlay/modal, not a dedicated `/search` page.
  Opens on icon click or the `⌘K` / `Ctrl+K` shortcut, closes on Esc or
  backdrop click.
- **Content coverage**: everything — guides, skills, activities, printables,
  gear, glossary terms, comparison pages, and plans.
- **Filtering**: type-only (a chip row: All / Guides / Skills / Activities /
  Printables / Gear / Glossary / Compare / Plans). No per-type facets
  (age range, season, etc.) in this pass — the overlay format doesn't have
  room for a rich facet UI, and type-only filtering covers the large majority
  of "find me the right kind of thing" searches. Per-type facets are a
  candidate for a future dedicated `/search` page if type-only filtering turns
  out to be insufficient.
- **Technical approach**: client-side static index (see below), not a hosted
  search service. At ~300 items, a browser can search the whole index
  instantly; a hosted service (Algolia/Typesense/Meilisearch) would add a
  vendor relationship, API keys, a content-sync step, and would route every
  visitor's search query through a third party for no benefit at this scale.

## 1. Architecture & data flow

A new Route Handler at `app/search-index.json/route.ts`, using
`export const dynamic = 'force-static'`, generates one static JSON file at
build time — the same App Router convention already used for `app/sitemap.ts`
and `app/robots.ts`. The browser fetches this file once, the first time the
search overlay opens, and caches it for the rest of the session; there are no
further network calls per keystroke.

### `lib/search/build-index.ts`

Pulls from every existing content source and maps each item into one common
shape:

```ts
export type SearchDocType =
  | 'guide' | 'skill' | 'activity' | 'printable'
  | 'gear' | 'glossary' | 'compare' | 'plan'

export type SearchDocument = {
  id: string        // e.g. "guide:camping-for-beginners" — unique across all types
  type: SearchDocType
  title: string
  excerpt: string    // shown under the title in results
  url: string
  keywords?: string  // extra matchable text (tags/category), not displayed
}

export function buildSearchIndex(): SearchDocument[]
```

### Content sources

| Type | Source | Notes |
|---|---|---|
| `guide` | `lib/guides/data.ts` (`GUIDES`) | title, tagline as excerpt |
| `skill` | `lib/skills/data.ts` (`SKILLS`) | title, tagline as excerpt |
| `activity` | `lib/activities/data.ts` (`ACTIVITIES`) | title, tagline as excerpt |
| `printable` | `lib/printables/data.ts` (`PRINTABLES`) | title, description as excerpt |
| `gear` | `lib/affiliate-products.ts` (`AFFILIATE_PRODUCTS`) | **excludes `deprecated: true`** entries; name + description as excerpt |
| `glossary` | `lib/glossary/data.ts` (new — see below) | term + definition as excerpt |
| `compare` | `lib/compare/index.ts` (new — see below) | manual list; title + excerpt |
| `plan` | `lib/plan-templates.ts` (`PLAN_TEMPLATES`) | title as-is; a short fixed excerpt per plan |

### Two small extractions needed first

1. **Glossary data** currently lives as an unexported `TERMS: Term[]` array
   inside `app/glossary/page.tsx` (59 entries). Extract it to
   `lib/glossary/data.ts` (matching the existing `lib/<type>/data.ts`
   convention used by guides/skills/activities/printables) and import it back
   into the glossary page. No behavior change to the glossary page itself.
2. **Comparison pages** (`app/compare/*/page.tsx`, 12 pages) are bespoke page
   components with no shared data file. Add a small manual index,
   `lib/compare/index.ts`, of `{ slug, title, excerpt }` for each — this list
   changes rarely enough that hand-maintaining it is simpler than trying to
   extract metadata from each page module generically.

### Client-side search

`lib/search/client.ts` wraps [MiniSearch](https://github.com/lucaong/minisearch)
(~15KB gzipped): loads the JSON index on first overlay open, indexes it with
`title` weighted highest, `excerpt` and `keywords` weighted lower, and exposes
`search(query: string): SearchDocument[]`. Fuzzy matching and prefix matching
are both enabled (MiniSearch supports both natively) so partial words and
minor typos still match.

## 2. Components & UX behavior

- **`components/search/SearchProvider.tsx`** — context holding open/closed
  state and the loaded index, so the trigger and the overlay don't need to be
  siblings.
- **`components/search/SearchTrigger.tsx`** — the icon button. Rendered in
  `components/landing/Nav.tsx` on both the desktop link row and inside the
  mobile full-screen menu. Also registers the global `⌘K` / `Ctrl+K` listener.
- **`components/search/SearchOverlay.tsx`** — the modal: a backdrop plus a
  centered panel on desktop, a full-screen takeover on mobile (mirroring the
  existing mobile-nav pattern already in `Nav.tsx`). Contains the text input,
  the type-filter chip row, and the results list.
- **`components/search/SearchResults.tsx`** — one row per result: a small type
  badge, the title, and the excerpt, with the matched substring subtly
  highlighted.

### Behavior

- Input is debounced ~120ms before re-searching.
- Type chips filter the current result set instantly (no re-fetch — MiniSearch
  already returned all matches; chips just filter client-side by `type`).
- **Empty state** (overlay just opened, no query yet): a short list of
  popular destinations — Guides hub, the quiz, Gear hub — instead of a blank
  box.
- **No-results state**: a friendly message plus links to the Guides hub and
  the quiz.
- **Keyboard**: Arrow Up/Down move the highlighted result, Enter navigates to
  it, Esc closes the overlay. Focus returns to the trigger button on close.

## 3. Error handling

- If `/search-index.json` fails to fetch (rare — it's a static asset served
  from the CDN), the overlay shows an inline "Search is temporarily
  unavailable" message with a retry button, rather than failing silently or
  showing an empty result list indistinguishable from "no matches."
- Build-time mapping follows the fail-fast convention already used elsewhere
  in this codebase (e.g. `getProductById()` throwing on an unknown id in
  `lib/affiliate/guide-gear.ts`): if a content item is missing a required
  field (title or url), `buildSearchIndex()` throws rather than silently
  producing a broken entry that would show as a dead link in search results.

## 4. Testing

- `lib/search/__tests__/build-index.test.ts`, mirroring the existing pattern
  in `lib/affiliate/__tests__/guide-gear.test.ts` and
  `lib/personalization/__tests__/product-map.test.ts`:
  - Every document has a non-empty `title` and `url`.
  - No duplicate `id` values, no duplicate `url` values.
  - Per-type counts match the source data (e.g. exactly as many `activity`
    documents as `ACTIVITIES.length`).
  - No `gear` documents for products with `deprecated: true`.
- A handful of known-query assertions against `lib/search/client.ts` (e.g.
  searching "tent" surfaces tent-related guides/gear near the top) to catch
  relevance regressions from future content additions.
- Manual browser verification: open via icon click and via `⌘K`, search
  across each content type, confirm chip filtering, confirm keyboard
  navigation, confirm the mobile full-screen layout, confirm empty-state and
  no-results-state render correctly.

## Out of scope (future work, not this spec)

- Per-type facets (activity age-range/group-size, skill category, etc.).
- A dedicated `/search` results page with a persistent filter sidebar.
- Search analytics / logging what people search for.
- Hosted search service migration, if content volume grows enough that
  client-side search becomes a real bottleneck (unlikely much below
  several thousand items).
- The printables "Shop the real gear" cross-sell spec
  (`2026-08-30-printables-upgrade-design.md`) — unrelated initiative, tracked
  separately.
