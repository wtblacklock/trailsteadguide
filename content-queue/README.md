# Content queue

Finished guides that are written but not live yet. Nothing in this folder is
routed: Next.js only renders pages under `app/`, and `lib/guides/data.ts` and
`data/guide-gear.ts` do not know about these guides until they are published.

The daily `trailstead-daily-content` routine publishes one guide a day with:

```
node scripts/publish-next-queued-guide.mjs
```

which takes the earliest folder whose date is on or before today, moves its
`page.tsx` to `app/guides/<slug>/page.tsx`, appends its `GUIDES` entry, adds
its gear shelf, applies its reciprocal related-guide links, and deletes the
folder. It prints `NOTHING_DUE` when the queue is empty or nothing is due.

## Folder shape

```
content-queue/guides/<publishOn>--<slug>/
  page.tsx     the finished page, dateModified="<publishOn>"
  queue.json
```

`queue.json`:

```json
{
  "publishOn": "2026-11-01",
  "guide": {
    "slug": "...",
    "category": "basics | scenario | seasonal | location",
    "title": "...",
    "description": "...",
    "eyebrow": "...",
    "shortLabel": "Only for location guides, e.g. Texas",
    "metaTitle": "41 chars max",
    "metaDescription": "155 chars max",
    "relatedGuides": ["live-slug-a", "live-slug-b", "live-slug-c"]
  },
  "gear": [{ "slot": "TENT", "productId": "coleman-sundome-4p" }],
  "reciprocal": [{ "slug": "live-guide", "replace": "slug-it-currently-lists" }]
}
```

`reciprocal` adds the new guide to an existing guide's `relatedGuides`,
swapping out `replace` when it is still there and appending otherwise.

## Rules

`lib/guides/__tests__/content-queue.test.ts` checks every queued guide, so the
queue stays publishable: SEO limits, no em or en dashes, active products only,
and links only to guides that are already live. A queued guide must never link
to another queued guide, since it may publish first.
