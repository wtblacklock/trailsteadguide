# Gear rotation candidates

Products spotted during the weekly gear-rotation pass that look worth a slot but
were not wired in yet. Each entry says what still needs to happen before it can
ship. Trim this file as items are actioned or go stale.

Last reviewed: 2026-11-20

## Resolved since last review

- Both dead products carried in this file since 2026-11-06/09 were replaced by
  human-driven PRs before this week's run: `reliance-aqua-tainer-7gal-2pack` got a
  new ASIN in #202, `heavy-duty-aluminum-foil` in #198. No action needed.
- The stale #189 ("2026-11-13 audit blocked") was closed - the full network block
  it described (egress proxy rejecting amazon.com entirely) is fixed. Direct
  requests to `www.amazon.com` now succeed.

## Known environment limitation: bulk Amazon checks still get robot-checked

Connectivity is no longer fully blocked, but this container's egress IP still gets
Amazon's robot-check page on most automated requests, especially after a burst of
sequential ones (`validate-affiliate-links.mjs` and `check-affiliate-images.mjs`
both make >100 rapid requests). This week: a single isolated request succeeds
reliably; a run of 10+ requests even with 4-12s spacing between them gets
robot-checked on ~90-95% of them, worse after an earlier burst. This is Amazon's
bot defense, not a dead listing - a `[503]` or `unverified` result from either
script is not evidence anything is broken. Only a confirmed `not-buyable` (no buy
box) or a genuine 404 is actionable, and neither script found any this week.

Separately, `check-affiliate-images.mjs` fails 4 images every run, all on the
legacy `images-na.ssl-images-amazon.com` domain: the egress proxy itself rejects
that host (`connect_rejected`, HTTP 403), confirmed with a direct `curl`. This is
an allowed-hosts gap, not a broken image - `m.media-amazon.com` (used by nearly
everything else in the registry) works fine. A human with environment access
should add `images-na.ssl-images-amazon.com` to the allowed hosts, or the 4
affected entries (`lodge-cast-iron-skillet`, `celestron-outland-binoculars`,
`sawyer-extractor-pump-kit`, `fwc-tent-sundome`) can be migrated to the modern
domain next time someone is verifying them anyway.

## This week's audited slice (2026-11-20)

Rather than a size-based slice of the ~127 active products, this week targeted the
21 active entries with no recorded `affiliateUrl` (they fall back to a bare
`/dp/<ASIN>` link via `getProductUrl()` and have likely never been individually
re-verified): `eurmax-galvanized-tent-stakes`, `fwc-trash-can-wakeman`,
`opinel-no7-folding-knife`, `reflective-guyline-50ft`, `suunto-a10-compass`,
`eno-doublenest-hammock`, `lodge-cast-iron-skillet`, `pull-through-knife-sharpener`,
`mineral-oil-food-safe`, `celestron-outland-binoculars`,
`leukotape-blister-prevention`, `tackle-box-lure-assortment`, `lodge-dutch-oven`,
`fishing-forceps-hemostat`, `gsi-backpack-bocce`, `team-scrimmage-vests-12pack`,
`lawn-bowling-skittles-set`, `stove-2-burner`, `cooler-basic`,
`fwc-lantern-consciot`, `fwc-sleeping-bag-mallome`.

Result: `lodge-cast-iron-skillet` (B00006JSUA) came back with a genuine Add to Cart
page - title "Lodge Pre-Seasoned Cast Iron Skillet, PFAS-Free, 10.25 Inches", price
$23 (recorded `~$20`, close enough, no change needed). The other 20 hit the
robot-check wall above on every attempt (several retried with 4-15s spacing) and
could not be positively verified either way. None showed "Currently unavailable" or
a 404, so there is no evidence any of them are dead - just unconfirmed. Next
reviewer: try these 20 again, ideally from a normal browser session
(`--browser-audit` snippet) rather than this container.

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
  Not checked this week either - this run's Amazon time went to re-verifying the
  21-item slice above, not sourcing new candidates (see hard rule: at most 1-2 new
  products per run, and only once verified). Before adding it, verify a variant ASIN
  with Add to Cart and a price, and compare it against `kelty-wireless-6` and
  `core-6p-instant-cabin`.

- Reusable ice packs for `how-to-pack-a-cooler`. Its shelf is three coolers and
  nothing else, while the copy leans on block ice. A long-lasting, well-reviewed
  cooler ice pack set would round it out. Not sourced this week, same reason as above.

## Video candidates skipped

`setup-order`, `constellations-by-season` and `using-red-light-at-camp` still have
no video. The only credible hit this week was a Cerritos Library "Constellations"
session with NASA's Universe of Learning (`lNY4QeYa4XE`, oEmbed valid), but it is
a craft-focused library program, not a seasonal sky guide, so it was not wired in.

## Closed this week

- `how-to-start-a-campfire` was missing a fire extinguisher. On 2026-11-02
  `first-alert-ez-fire-spray` (B001229JCU, 4.8 stars on 12,703 ratings, $11.98,
  Add to Cart verified) was added to the registry and to that guide's shelf.
- `easy-family-camping-meals` and `camping-meal-plan-family` had 3-product shelves
  while their copy tells readers to cook in "one large skillet". On 2026-11-06 the
  existing `lodge-cast-iron-skillet` was added to both shelves (no new ASIN).
