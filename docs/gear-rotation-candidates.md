# Gear rotation candidates

Products spotted during the weekly gear-rotation pass that look worth a slot but
were not wired in yet. Each entry says what still needs to happen before it can
ship. Trim this file as items are actioned or go stale.

Last reviewed: 2026-11-27

## Resolved since last review

- `celestron-outland-binoculars` (B004KM82IQ) was one of the 20 entries left
  unconfirmed on 2026-11-20. Confirmed buyable this week (real Add to Cart page).
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
domain next time someone is verifying them anyway. Unchanged as of 2026-11-27 -
same 4 entries, same cause.

Separately, this week's container started with no `node_modules` (same as the
2026-11-13 run) and no setup script in either environment, so `npm ci` has to run
before any check works. Not a registry problem, but it costs time every run.

## This week's audited slice (2026-11-27)

Rather than continuing the no-`affiliateUrl` slice from 2026-11-20 (20 of those 21
are still unconfirmed - see the entry above, carried forward below), this week
targeted the next batch of actively-used products that had not had individual
recent attention, mostly kid/toddler sleeping bags, kid cold-weather layers, and
dog gear: `teton-junior-20`, `redcamp-kids-mummy`, `coleman-kids-45`,
`retrospec-dream-25`, `kelty-space-cadet-40`, `kurgo-loft-dog-jacket`,
`mushers-secret-paw-wax`, `vicherub-kids-thermal-set`, `wildbreakers-kids-mittens`,
`kelty-cosmic-20-down`, `teton-trailhead-20`, `sea-to-summit-reactor-extreme-liner`,
`crown-shades-10x10-canopy`, `tickcheck-tick-remover-kit`,
`primacare-mylar-emergency-blankets`, `gsi-glacier-stainless-camper`,
`geertop-4p-4-season`.

The egress path to Amazon worked better than it has in weeks, so
`validate-affiliate-links.mjs` was also run twice against the **full** registry
(142 linked ASINs/short-links) rather than only the planned slice - strictly more
signal for the same script:

- Run 1 (`--quiet`): 20 OK, 1 not-buyable, 0 broken, 121 unverified.
- Run 2 (~15 min later, full log): 16 OK, 0 not-buyable, 0 broken, 126 unverified.

Confirmed buyable (real Add to Cart page, either run) that had not been
individually confirmed before: `vicherub-kids-thermal-set`,
`sea-to-summit-reactor-extreme-liner`, `tickcheck-tick-remover-kit` (all three
from this week's planned slice), plus `coleman-sundome-4p`,
`coleman-classic-rolling-cooler`, `therm-a-rest-z-lite-sol`,
`uco-stormproof-matches`, `cascade-mountain-tech-trekking-poles`,
`coleman-xtreme-50-cooler`, `rtic-45-cooler`, `kids-craft-supply-kit`,
`kids-medal-ribbons-pack`, `bearvault-food-canister`, and the deprecated-but-live
`tent-sundome-3` (via its `amzn.to` link). The rest of this week's planned slice
(14 of 17) hit the robot-check wall on every attempt in both runs - unconfirmed,
not evidence of being dead. Also unconfirmed again: 20 of the 21 from the
2026-11-20 no-`affiliateUrl` slice (only `celestron-outland-binoculars`, noted
above, came through this time).

One confirmed dead product, from a genuine (non-robot-checked) product page:
`graco-pack-n-play-on-the-go` (B09MWHG3ZT) returned "Currently unavailable" on
the first run. See "Needs a replacement" below.

Next reviewer: the remaining unconfirmed items in both slices are still worth a
retry, ideally from a normal browser session (`--browser-audit` snippet) rather
than this container, since the hit rate here is well under 20%.

## Needs a replacement

- `graco-pack-n-play-on-the-go` (B09MWHG3ZT): "Currently unavailable", confirmed
  2026-11-27 on a genuine product page fetch (the response had
  `id="productTitle"`, so this was not a robot check). Fills the `KID_GEAR` slot
  on `camping-with-a-baby` and `camping-with-toddlers`. A same-category travel
  crib/playard replacement was attempted this run, but Amazon's search page
  (`/s?k=...`) returned a robot-check/503 on every try (unlike individual product
  pages, which sometimes get through), so no candidate ASIN could be verified -
  per the hard rule against inventing an ASIN, nothing was swapped in. Next run
  (or a human with real browser access): search "Graco pack n play" or similar
  travel playard on amazon.com, verify a current in-stock listing's ASIN, title,
  and price, and swap it into the registry plus both guides' gear shelf.

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
  Still not checked: this week's Amazon search attempts (for this and the Graco
  replacement above) all hit a robot-check/503 on Amazon's `/s?k=...` search page.
  Before adding it, verify a variant ASIN with Add to Cart and a price, and compare
  it against `kelty-wireless-6` and `core-6p-instant-cabin`.

- Reusable ice packs for `how-to-pack-a-cooler`. Confirmed again this week: the
  shelf is still exactly three coolers (`coleman-classic-rolling-cooler`,
  `coleman-xtreme-50-cooler`, `rtic-45-cooler`) and nothing else, while the guide's
  copy leans on block ice. A long-lasting, well-reviewed cooler ice pack set would
  round it out. Not sourced this week, same search-page block as above.

## Video candidates skipped

`setup-order`, `constellations-by-season` and `using-red-light-at-camp` still have
no video as of the last video pass (2026-11-16 or earlier - see git history for
this file). That pass's only credible hit was a Cerritos Library "Constellations"
session with NASA's Universe of Learning (`lNY4QeYa4XE`, oEmbed valid), but it is
a craft-focused library program, not a seasonal sky guide, so it was not wired in.
Not re-checked this week - this run (per the gear-catalog task) is scoped to
products, not videos.

## Closed this week

- `how-to-start-a-campfire` was missing a fire extinguisher. On 2026-11-02
  `first-alert-ez-fire-spray` (B001229JCU, 4.8 stars on 12,703 ratings, $11.98,
  Add to Cart verified) was added to the registry and to that guide's shelf.
- `easy-family-camping-meals` and `camping-meal-plan-family` had 3-product shelves
  while their copy tells readers to cook in "one large skillet". On 2026-11-06 the
  existing `lodge-cast-iron-skillet` was added to both shelves (no new ASIN).
