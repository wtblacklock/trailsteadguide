# Gear rotation candidates

Products spotted during the weekly gear-rotation pass that look worth a slot but
were not wired in yet. Each entry says what still needs to happen before it can
ship. Trim this file as items are actioned or go stale.

Last reviewed: 2026-11-09

## Needs a replacement (dead on main)

Both are still live on the site and cannot be replaced from this environment: since
2026-11-04 the in-app browser gets an "Access restricted" page on amazon.com, so no
replacement ASIN can be verified. Whoever can browse Amazon should source a buyable
listing (Add to Cart plus a price) and update `lib/affiliate-products.ts`.

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
  Not checked on Amazon: since 2026-11-04 the in-app browser gets an "Access
  restricted" page on amazon.com, so no ASIN, stock, or review count could be
  confirmed. Before adding it, verify a variant ASIN with Add to Cart and a price,
  and compare it against `kelty-wireless-6` and `core-6p-instant-cabin`.

- Reusable ice packs for `how-to-pack-a-cooler`. Its shelf is three coolers and
  nothing else, while the copy leans on block ice. A long-lasting, well-reviewed
  cooler ice pack set would round it out. Not sourced: Amazon blocked (see above).

## Closed this week

- `how-to-start-a-campfire` was missing a fire extinguisher. On 2026-11-02
  `first-alert-ez-fire-spray` (B001229JCU, 4.8 stars on 12,703 ratings, $11.98,
  Add to Cart verified) was added to the registry and to that guide's shelf.
- `easy-family-camping-meals` and `camping-meal-plan-family` had 3-product shelves
  while their copy tells readers to cook in "one large skillet". On 2026-11-06 the
  existing `lodge-cast-iron-skillet` was added to both shelves (no new ASIN).
