# Gear rotation candidates

Products spotted during the weekly gear-rotation pass that look worth a slot but
were not wired in yet. Each entry says what still needs to happen before it can
ship. Trim this file as items are actioned or go stale.

Last reviewed: 2026-11-13

## Blocked: the weekly run cannot reach Amazon at all

Read this before trusting any script output below. As of 2026-11-13 the failure mode
changed and got worse. It is no longer Amazon's bot wall, it is the container's own
network policy:

- `curl https://www.amazon.com/` fails with `connect_tunnel failed, response 403`
  (`connect_rejected`) from the egress proxy, and WebFetch cannot resolve the host.
  Earlier runs at least received a page from Amazon, so the request left the box.
  Now it does not.
- The scheduled session runs on the personal cloud environment named "Default",
  whose network access is "limited" with an empty allowed-hosts list.
- A personal environment named "trailsteadguide-gear-audit" already exists, is saved
  for this repository, and allows exactly the four hosts this job needs:
  `www.amazon.com`, `amazon.com`, `m.media-amazon.com`, `amzn.to`. The weekly run is
  not using it.
- A session started by a routine cannot be moved onto another environment, so the
  run cannot fix this itself. Someone has to point the weekly gear trigger at
  "trailsteadguide-gear-audit", or add those four hosts to "Default", before any
  future run can verify a single listing.

Because of that, these two numbers from 2026-11-13 are artifacts of the block and
not findings. Do not act on them:

- `node scripts/validate-affiliate-links.mjs --quiet`: "0 OK, 0 not buyable, 142
  broken, 0 unverified". Every one of the 142 is `error: fetch failed`. This is not
  142 dead products.
- `node scripts/check-affiliate-images.mjs`: every image `fetch failed`, for the same
  reason.

Non-Amazon checks on 2026-11-13 were clean: `tsc --noEmit`, `eslint .` (0 errors,
4 pre-existing warnings), `vitest run` (570 passed), `npm run build`. Note that the
container had no `node_modules` on start, so dependencies had to be installed before
any of those could run; neither environment has a setup script.

## Needs a replacement (dead on main)

Both are still live on the site and have now gone unreplaced for three consecutive
weekly runs, because no run since 2026-11-04 has been able to verify a replacement
ASIN (see the blocked section above). Whoever can browse Amazon should source a
buyable listing (Add to Cart plus a price) and update `lib/affiliate-products.ts`.
These are live reader-facing affiliate links that currently go nowhere good.

- `reliance-aqua-tainer-7gal-2pack` (B09NP5538N): "Currently unavailable" since
  2026-11-06. Used on `how-to-wash-dishes-camping` and
  `state-park-cabin-camping-with-kids` (inline `<AmazonLink>` plus shelf slots in
  `data/guide-gear.ts`). Copy says "~$39" and "Buy two", so a 2-pack or a single
  7 gallon Reliance Aqua-Tainer listing both fit; adjust `priceRange` to match.
- `heavy-duty-aluminum-foil` (B0D14YNCF9): 404 since 2026-11-09. Used on
  `camping-stocking-stuffers` (inline link and shelf), `lib/activities/data.ts`, and
  `lib/skills/data.ts`. Any current Reynolds Wrap Heavy Duty listing works; keep it
  under the stocking-stuffer price band (~$12).

## Needs a human decision

Optional: `kidde-portable-co-alarm` now points at `B0G1CR88J9` ($24.97, 4.6 stars
on 408 ratings). The older, much more reviewed listing of the same AA battery Kidde
alarm, `B004Y6V5CI`, was verified 2026-10-26: In Stock, Add to Cart, $27.97, 4.7
stars on 19,945 ratings, image
`https://m.media-amazon.com/images/I/71Q2PU+ZWVL._AC_SL1500_.jpg`. Switching would
push it just over the "Stocking stuffers under $25" band on `/guides/gifts-for-campers`,
so it is left as-is.

## Not yet verified

- NEMO Aurora Highrise 6P (family tent). Outdoor Life's family-tent roundup lists it
  as a strong pick for smaller families, alongside picks the registry already covers.
  Still not checked on Amazon, carried over since 2026-11-06: no ASIN, stock, or
  review count could be confirmed (see the blocked section above). Before adding it,
  verify a variant ASIN with Add to Cart and a price, and compare it against
  `kelty-wireless-6` and `core-6p-instant-cabin`.

- Reusable ice packs for `how-to-pack-a-cooler`. Its shelf is three coolers and
  nothing else, while the copy leans on block ice. A long-lasting, well-reviewed
  cooler ice pack set would round it out. Still not sourced, carried over since
  2026-11-09: Amazon unreachable (see above).

## Closed this week

- Nothing. The 2026-11-13 run opened no product changes: the catalog slice could not
  be audited and no candidate could be verified, because Amazon was unreachable from
  the run's environment.

- `how-to-start-a-campfire` was missing a fire extinguisher. On 2026-11-02
  `first-alert-ez-fire-spray` (B001229JCU, 4.8 stars on 12,703 ratings, $11.98,
  Add to Cart verified) was added to the registry and to that guide's shelf.
- `easy-family-camping-meals` and `camping-meal-plan-family` had 3-product shelves
  while their copy tells readers to cook in "one large skillet". On 2026-11-06 the
  existing `lodge-cast-iron-skillet` was added to both shelves (no new ASIN).
