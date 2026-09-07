# Gear rotation candidates

Products spotted during the weekly gear-rotation pass that look worth a slot but
were not wired in yet. Each entry says what still needs to happen before it can
ship. Trim this file as items are actioned or go stale.

Last reviewed: 2026-09-07

## Not yet verified

### LuminAID PackLite Max 2-in-1 (200 lumens)

- Candidate ASIN: `B08YC6H4F6` (seen in search results only, product page not opened)
- Why: the registry's `luminaid-packlite-max` entry now correctly resolves to the
  **Titan** (300 lumens, ~$68). The 200-lumen Max sits around $40 and would give the
  LIGHTING slot a real budget tier under the Titan instead of jumping straight from
  a headlamp to a $68 lantern.
- Before adding: open `https://www.amazon.com/dp/B08YC6H4F6`, confirm the title,
  rating, review count and stock, curl-verify the tagged link and the image, then
  add it as a new registry id (do not reuse `luminaid-packlite-max`, which several
  guides already point at).

## Deferred, not a sourcing problem

### Broader gear-slot fills in `data/guide-gear.ts`

PR #74 ("align gear shelves with the products the prose recommends") has been open
against `data/guide-gear.ts` since 2026-09-03 and rewrites STOVE and CHAIR rows
across most regional guides. This run only touched the `how-to-pack-a-cooler`
block, which that PR does not modify, to avoid handing the owner a merge conflict.

Still thin after this run, worth revisiting once #74 lands:

- `campfire-recipes-for-kids` - 1 product (KID_GEAR only)
- `no-cook-camping-meals-kids` - 1 product
- `how-to-start-a-campfire` - 2 products

### Incomplete registry entries

`rtic-45-cooler` and `coleman-xtreme-50-cooler` were repaired this run. A sweep of
`lib/affiliate-products.ts` found no other entry missing both `amazonAsin` and
`affiliateUrl`, which is the combination that makes a product silently disappear
from gear shelves (see the guard in `components/guide/GuideGearShelf.tsx`).
