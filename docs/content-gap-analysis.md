# Content Gap Analysis — Trailstead Guide

A backlog-shaped audit of the current content surface, what's missing, and what's worth shipping next. Snapshot re-baselined 2026-11-23 against `main` at `ca09a5b` (previous baseline: 2026-10-12).

---

## 1. Snapshot — current state

| Area | Count | Status |
|---|---|---|
| Plans | 4 | Foundation set, all introductory (backyard / first night / first weekend / family basecamp). No intermediate or activity-specific. Unchanged across five baselines. |
| Guides — total | 116 | Up from 82 on 2026-10-12. **Thirty-four guides landed, beating the previous record cycle of sixteen.** Three clusters: a seven-guide gift and Black-Friday set, a cold-weather set (frozen ground, freezing water, warm batteries, wet gear, dressing kids, hypothermia, liners, temperature ratings, winter dogs, warm-winter destinations), and a kids-safety and tactics set (water safety, ticks and Lyme, sleep, nighttime bathroom trips, tarp, uneven ground, putting out a campfire). Shipped through individual PRs, **not** through the November publishing queue, which is separately stalled (see the movement note below). |
| Guides — Basics | 40 | Up from 29. Eleven added, mostly tactical skills-shaped guides: `how-to-put-out-a-campfire`, `how-to-set-up-a-camping-tarp`, `how-to-pitch-a-tent-on-uneven-ground`, `how-to-stake-a-tent-in-frozen-ground`, `how-to-dry-wet-gear-camping`, `how-to-wash-dishes-camping`, `sleeping-bag-temperature-ratings-explained`, `are-sleeping-bag-liners-worth-it`. Still the densest category. |
| Guides — Scenario | 38 | Up from 26. Twelve added, nearly all kids-specific: `water-safety-at-camp-with-kids`, `ticks-and-lyme-disease-in-kids`, `hypothermia-and-frostbite-in-kids`, `how-to-get-kids-to-sleep-camping`, `nighttime-bathroom-trips-camping-with-kids`, `how-to-dress-kids-for-cold-weather-camping`, `winter-break-camping-with-kids`, `winter-camping-with-dogs`, `camping-with-another-family`. Broader life-situation scenarios (group of 10+, limited mobility, allergy, pregnancy) are **still absent after five baselines**, and seven holiday-dated guides are still filed here rather than seasonal. |
| Guides — Seasonal | 18 | Up from 7, the largest proportional jump of any category and now 15.5% of the guide surface. The growth is almost entirely the holiday-shopping cluster: seven gift guides plus `black-friday-camping-gear`, joined by `warm-winter-camping-destinations`, `first-day-hikes-with-kids`, `how-to-keep-water-from-freezing-camping` and `how-to-keep-batteries-warm-camping`. **The routing rule is now demonstrably inconsistent rather than merely unwritten:** `first-day-hikes-with-kids` (January 1) is seasonal while `winter-break-camping-with-kids` (the same calendar week) is scenario, and all seven gift guides are seasonal while Halloween, Thanksgiving, Labor Day, Columbus Day and fall foliage are not. |
| Guides — Location | 20 | **Unchanged for the third baseline running**, and the only category that did not move in a 34-guide cycle. 8 US regions + best-state-parks roundup + 11 single-state guides (NY, MI, PA, GA, WI, WY, MT, UT, AZ, NC, plus the Ozarks as a cross-state region). Eight more state guides (SC, AL, NM, TN, NV, VA, LA, KY) are written and sitting in `content-queue/`, so this cluster is gated entirely on the stalled publisher, not on authoring. |
| Skills | 68 / 12 categories | Unchanged. Foundational + intermediate layer solid; several adjacent categories still absent. |
| Activities | 37 / 8 categories | Activity content unchanged, but 4 age/weather landing pages (kids, teenagers, toddlers, rainy-day) now ship as browse surfaces. Water-based category still missing. |
| Comparison pages | 20 | Up from 17. `3-season-vs-4-season-tent`, `cast-iron-skillet-vs-dutch-oven` and `foam-vs-inflatable-sleeping-pad` added. Cookware is a new compare axis. The bag-vs-quilt-vs-blanket format compare is still the main gap. |
| Research | 2 | Up from 1, plus a `/research` index. Regrets + pack-analysis pieces live. |
| Gear bundles | 4 | Unchanged. One per plan. No budget-tier, kid-only, or season-specific bundles. |
| Affiliate catalog | 127 active (147 registry entries, 20 deprecated) | **Down from 133 active**, the first decline on record, because dead and unbuyable ASINs were retired faster than new ones landed (three replacement PRs this cycle). Breadth is still not the constraint; the bundle surface is. 127 products against 4 bundles, about 32 per bundle. |
| Trip Packs (paid) | 4 | One per plan — unchanged. |
| Printables (free, email-gated) | 19 | Up from 17. Strong analog asset library. |
| Glossary | 69 terms | Up from 61. Shipped at `/glossary`. |
| About / trust | 1 bio | Founder story, FAQ. No testimonials wall, press, or logo strip. |
| Quiz | 6 questions | Question coverage is sufficient for current personalization output. |
| Tools | 2 | trip-planner + checklist-generator. `/research`, `/compare` and `/glossary` have shipped; a human-readable HTML sitemap is still missing. Unchanged. |

---

## 2. Gap analysis by area

### Plans
Current 4 are all introductory. The "first 3 trips" arc is well covered.

Missing:
- **Intermediate plan: 4-night state-park stay** — the natural next trip after `easy-family-basecamp`. Repeat customers have nowhere to graduate to.
- **Activity-specific plan: lake/water-focused weekend** — paddle/swim trips are a different gear and timeline shape and a high-search niche.
- **National-park-specific plan template** (e.g. "Great Smoky Mountains weekend with kids") — captures one of the fattest beginner intent buckets and slots cleanly under the existing location guides.
- **Cold-weather plan** — paired naturally with `winter-camping-for-beginners` guide; current plans assume 3-season.

### Guides — Basics (40)
Coverage is dense. Most gaps are tactical micro-topics, not whole guides.

Missing (5–8 high-intent titles):
- **How to find dispersed camping on BLM and National Forest land** — captures "free camping near me" intent. High traffic.
- **Campsite reservation strategy** — Recreation.gov timing, 6-month windows, cancellation refresh tricks.
- **Camping etiquette: 12 unwritten rules** — high pin/share format, easy AI-citation passages.
- **Camping food planning (no-cook + cooler-first)** — sits between the two existing meal guides; covers structure, not recipes.
- ~~**What NOT to bring camping**~~ - **SHIPPED** 2026-10-06 as `what-not-to-bring-camping`.
- **How to read a campsite map (state/national park reservation maps)** — beginner blocker, currently uncovered.
- **Camping on a budget** (separate from the family-budget guide) — single + couple version with annual cost breakdown.
- ~~**Tent setup intermediate: pitching in wind/slope/uneven ground**~~ - **SHIPPED** 2026-11-23 cycle as `how-to-pitch-a-tent-on-uneven-ground`, with `how-to-stake-a-tent-in-frozen-ground` and `how-to-set-up-a-camping-tarp` alongside it.

### Guides — Scenario (38)
Family-specific scenarios are now very well covered, kids-safety especially. Broader life-situation scenarios are still missing after five baselines.

Missing (5–8 titles):
- ~~**Cold-weather scenario: camping in 30-45°F weather**~~ - **SHIPPED** 2026-10-06 as `camping-in-40-degree-weather`, deliberately filed under seasonal (see the 2026-10-06 movement note).
- **Group camping for 10+ people** — coordination, site selection, shared-meal logistics.
- **Camping with elderly relatives or limited mobility** — site selection, accessible parks, gear adjustments.
- **Camping while pregnant** — high-search, low-supply niche.
- **Sober camping / camping without alcohol** — strong AI-citation niche; growing search demand.
- **Camping with food allergies (gluten, nut, dairy)** — meal planning, cross-contamination, emergency prep.
- **Last-minute / impromptu camping** — what you can pull off with 24-hour notice.
- **Gear-failure recovery** - what to do when the tent leaks / stove won't light / cooler fails. Partially covered now by `how-to-dry-wet-gear-camping` and `how-to-prevent-tent-condensation`; the stove and cooler halves are still open. Also a research-piece topic.

### Guides — Seasonal (18)
Four broad seasons, the seven-guide gift cluster plus Black Friday, hunting season, 40-degree weather, warm-winter destinations, First Day Hikes, and two freezing-weather tactics guides. No longer thin; the open question is the routing rule, not the volume.

Missing (3–5 titles):
- **Holiday-weekend camping (Memorial / July 4)** — crowd strategy, reservation timing, alternatives. Labor Day, Columbus Day, Halloween and Thanksgiving have all shipped, the last three filed outside seasonal.
- **Shoulder-season camping (April / October)** — dedicated guide for unpredictable weather.
- ~~**Pre-season prep / off-season teardown**~~ - **SHIPPED** as `how-to-store-camping-gear` (filed under basics, not seasonal).
- **First warm-weekend camping** — for family audience emerging from winter, distinct from "spring camping for beginners."

### Guides — Location (20)
US regions are 70% covered. Eight more single-state guides are written and queued but unpublished; WA and OR are the notable states absent from both the site and the queue.

Missing (5–8 titles):
- ~~**Camping in New York (Adirondacks)**~~ - **SHIPPED** as `camping-in-new-york-for-beginners`.
- ~~**Camping in Michigan (Upper Peninsula)**~~ - **SHIPPED** as `camping-in-michigan-for-beginners`.
- ~~**Camping in Pennsylvania**~~ - **SHIPPED** as `camping-in-pennsylvania-for-beginners`.
- ~~**Camping in Wisconsin**~~ - **SHIPPED** as `camping-in-wisconsin-for-beginners`.
- ~~**Camping in Georgia**~~ - **SHIPPED** as `camping-in-georgia-for-beginners`.
- ~~**Camping in Wyoming / Montana**~~ - **SHIPPED** as `camping-in-wyoming-for-beginners` and `camping-in-montana-for-beginners`.
- ~~**Camping in Utah / Arizona for beginners**~~ - **SHIPPED** as `camping-in-utah-for-beginners` and `camping-in-arizona-for-beginners`.
- ~~**Camping in North Carolina**~~ - **SHIPPED** 2026-10-12 cycle as `camping-in-north-carolina-for-beginners`.
- **Second wave: WA, OR, TN** - the highest-volume states left, already linked by the region guides without a destination. Tracked as a Tier-2 gap in section 3.
- **Camping in Canada (Ontario / BC) for first-timers** - international starter; high search from US visitors. Still the only unshipped item here, and deferred in Tier 3.

### Skills (68 / 12 categories)
Foundational + intermediate layer is solid. Several whole categories are missing rather than thin.

Missing categories (highest impact):
- **Map reading** — separate from orienteering. Trail/topo/contour reading as discrete sub-discipline.
- **Camp hygiene** — handwashing, dish disposal, cathole digging, gray water rules. Currently scattered. Strong LNT-adjacent SEO.
- **Water sourcing & treatment** — exists as a single skill (`water-purification`); deserves a category (filter vs UV vs chemical, sourcing, contamination signs).
- **Leave No Trace ethics** — formal LNT principles category. AI-citation magnet.
- **Weather reading** — exists as a single skill; deserves a category (cloud reading, wind direction, pressure, forecast literacy).
- **Animal awareness** — bear / snake / tick / mountain-lion-specific skills, separated from `wildlife-encounters` umbrella.

Missing within existing categories:
- **Knots:** lashing (square / diagonal / tripod), prusik. Currently 7 skills — bridge to scout-level knot work.
- **Knife skills:** batoning, feather-sticking, carving a tent stake (replacement). Currently 4.
- **Fire:** fire by friction (bow drill / hand drill), one-match fire challenge. Currently 6.
- **Hiking:** river crossing, hiking in heat/cold. Currently 6.
- **Stargazing:** photography for kids (phone-only), binocular astronomy. Currently 8 (already deep).

### Activities (37 / 8 categories)
Solid breadth. Underserved by *audience segment* and a few specific categories.

Missing categories / segments:
- **Foraging / nature ID** — leaf ID, edible-plant safe games (no actual eating), bird ID. AI-citation friendly.
- **Water games** — for lake/river sites. Stick boat races, fish-spotting, log floating. Separate from "movement."
- **Photo scavenger hunts** — list-based, phone-only, kid-led.
- **Age-bucketed views**: existing activities tag age groups in plans but there's no activity-by-age browsing surface (3–5, 6–10, 11+, teens, mixed). Worth adding as filtered views, not new content.
- **Group games for 10+** — modified versions of existing activities for larger parties, paired with the missing "group camping" guide.
- **Evening rituals / cooldown** — existing wind-down (4) is thin; gratitude rounds, "best part of today," song circles.

### Comparison pages (20)
Plan-vs-plan: 2. Format works; surface area is still small relative to 116 guides.

Missing (highest leverage):
- **Tent type comparison: dome vs cabin vs backpacking** — query-rich, conversion-friendly. Routes into existing tent products.
- **Stove comparison: 1-burner vs 2-burner vs all-in-one** — already have a 1-burner-vs-Camp-Chef; missing the category-level explainer.
- **Cooler comparison: hard vs soft vs powered** — beyond the current rolling-vs-steel-belted. Still open; `cast-iron-skillet-vs-dutch-oven` opened a cookware axis this cycle instead.
- **Sleeping system: bag vs quilt vs blanket** — high-intent, gear-decision query. The fill and shape questions are now covered (`down-vs-synthetic-sleeping-bag`, `mummy-vs-rectangular-sleeping-bag`); the format question is not.
- **"Trailstead Guide vs winging it"** — narrative compare. Owns brand-search and serves as conversion page.
- **Plan vs alternative experience: "Easy Family Basecamp vs renting a cabin"** — high-intent, captures users mid-decision.
- **Plan vs alternative experience: "Backyard Test vs glamping"** — same shape, different segment.
- **Headlamp vs lantern vs string lights** — short, high-conversion lighting compare.

### Research / data pieces (2)
The biggest growth lever. One piece live (`first-time-camping-regrets`). Format is proven for backlinks and AI citation.

Missing (4–6 follow-on ideas):
- **What 1,000 first-time campers actually packed (Reddit/forum analysis)** — companion to regrets piece. Sets up gear authority.
- **Most-asked first-trip questions: 12 months of r/camping search data** — long-tail authority builder.
- **Campsite booking timing: when reservations actually fill (Recreation.gov data)** — citable stats, evergreen.
- **The "first trip cost" reality check: what beginner families actually spend** — pricing transparency, links to gear bundles.
- **Beginner gear failure rates: which items break first (forum complaint analysis)** — feeds the gear-failure-recovery guide and product compare reasoning.
- **What kids actually remember about camping (parent survey / reddit thread synthesis)** — soft-emotional piece, high social shares.

### Gear (4 bundles, 127 active products)
Bundles map 1:1 to plans. Missing the budget and life-stage cuts. The ratio is now about 32 products per bundle.

Missing:
- **Budget tier: under $200 starter kit** — captures "cheap camping gear for beginners."
- **Mid tier: under $500 first-trip kit.**
- **Premium / "buy once" tier** — for the comfort-first quiz answer.
- **Kid-specific gear roundup** — sleep bags, kids' headlamps, mini chairs, pack-fit guidance. Currently scattered across plans.
- **Cold-weather upgrade gear** — pairs with the missing cold-weather plan/guide.
- **Gear failure replacements** — repair kits, extra stakes, tarp patches. Small bundle, ties to gear-failure scenario guide.
- **Lake/water trip gear add-on** — paired with proposed lake plan.

### Trust / About
Single founder bio, strong narrative. Trust scaffolding is thin.

Missing:
- **Testimonials wall** — even 5–8 short quotes from early users would matter; can be sourced from email replies / IG.
- **Press / mentions placeholder** — empty section now, scaffolded for when coverage exists.
- **Partner / source logos** — Leave No Trace, Recreation.gov, REI (if cited), state-park systems referenced. Visual trust pattern.
- **"Why trust us" credentials block on home + key landing pages** — Eagle Scout / Wood Badge / Philmont line currently lives only on /about.
- **Methodology page** — how plans are built, what gets tested, what doesn't. Strong for AI citation and authority.

### Quiz (6 questions)
Coverage is sufficient. Don't add unless personalization output materially changes.

Optionally worth testing:
- **"How comfortable are your kids in the dark?"** — directly affects evening activity selection. Would change personalization.
- **"How far are you driving?"** — only useful if plan recommendations diverge by drive time. Currently they don't.
- **"What's your biggest worry?"** — tone/copy variant rather than logic; small lift.

If quiz expands at all, prioritize the dark-comfort question — everything else is noise without a corresponding plan-output change.

### Email
Current PDF gate captures emails but no drip sequence is wired up.

Missing (low priority — user has flagged email as far-out):
- **Welcome email + Day-3 prep tip + Day-7 invite-back** — minimum viable drip.
- **Trip-completion follow-up** — 2 weeks after PDF download, "how did it go?" reply-friendly email.
- **Seasonal re-engagement** — spring/fall nudges to lapsed signups.

Flag: don't build until traffic + conversion data justify the effort.

### Discovery surfaces
Several useful index/glossary pages are missing.

Missing:
- **HTML sitemap page (/sitemap or /map)** — user-facing discovery doc for crawlers and humans.
- ~~**`/research` index**~~ - **SHIPPED** at `/research`.
- ~~**`/compare` index**~~ - **SHIPPED** at `/compare`, now parenting 20 compare pages.
- ~~**Glossary / camping terms page**~~ - **SHIPPED** at `/glossary`, 69 terms.
- **"Start Here" page** — distinct from /about and /how-it-works; a curated path for cold visitors. Optional.

---

## 3. Prioritized backlog

Sized as **S** (≤ a day), **M** (2–4 days), **L** (a week+). Lift = expected traffic / conversion impact, not certainty.

### Tier 1 — biggest impact-to-effort, ship next

1. ~~**Compare hub page + 4 high-intent product compares**~~ — **SHIPPED.** `/compare` index plus 15 compare pages, including dome-vs-cabin tent, beginner cooler, beginner stove, and beginner sleeping system.
2. ~~**Research piece #2: "What 1,000 first-time campers actually packed"**~~ — **SHIPPED**, along with the `/research` index.
3. ~~**Guide: "How to find dispersed camping on BLM and National Forest land"**~~ — **SHIPPED** as `dispersed-camping-on-blm-and-national-forest-land`.
4. ~~**Guide: "Campsite reservation strategy (Recreation.gov)"**~~ — **SHIPPED** as `recreation-gov-reservation-strategy`.
5. ~~**Glossary page (/glossary)**~~ — **SHIPPED**, 58 terms.
6. ~~**Guide: "What NOT to bring camping"**~~ - **SHIPPED** 2026-10-06 as `what-not-to-bring-camping` (15 items, each paired with what to pack instead).
7. **About page trust upgrade: testimonials wall + methodology block** — **S effort, medium lift.** Conversion lift on key landing pages, especially before the quiz.

### Tier 2 — worth doing, sequence after Tier 1

8. ~~**Compare: "Trailstead Guide vs winging it" + "Easy Family Basecamp vs renting a cabin"**~~ — **SHIPPED** as `trailstead-guide-vs-winging-it` and `family-camping-vs-cabin-rental`.
9. ~~**Guide cluster: 4 missing high-intent state guides (NY, MI, PA, GA)**~~ — **SHIPPED**, and over-delivered: WI, WY, MT, UT and AZ shipped alongside them, taking the location cluster from 9 to 18.
10. **Skill category: Leave No Trace (5–7 skills)** — M / medium lift. AI-citation; pairs with planned methodology block. **A guide-shaped first instalment, `leave-no-trace-with-kids`, is written and queued for 2026-11-22 but unpublished**; the skills category itself is still unstarted.
11. **Skill category: Camp Hygiene (4–6 skills)** — S / medium lift. Searchable, scattered topics now.
12. **Gear: Under-$200 budget bundle + Under-$500 mid bundle** — S each / medium-high lift. Captures "cheap camping gear" intent and gives quiz comfort-tier outputs distinct destinations. **Still 4 bundles after five baselines, now against 116 guides and 127 active products.** The single most-deferred item in this document.
13. **Guide: "Camping etiquette" + "How to read a campsite map"** — S each / medium lift. Tactical micro-guides; both are easy AI-citation passages. **Etiquette is written and queued as `campground-etiquette-for-families` for 2026-11-18 but unpublished.** The campsite-map guide is still unwritten.
14. **Research piece #3: "Campsite booking timing (Recreation.gov data)"** — M / high lift. Citable stats; supports the new reservation-strategy guide.
15. **Activities: water-games category (5 activities)** — S–M / medium lift. The age-bucketed browse half of this item **SHIPPED** (kids / teenagers / toddlers / rainy-day landing pages); the water-games content did not. Activity count is still 37 across 8 categories.
16. **Plan: 4-night intermediate state-park stay** — L / medium lift. Repeat-customer destination; later in the funnel than the existing four.

### Tier 3 — nice to have, later or never

- New seasonal sub-guides (holiday weekends, shoulder season). Labor Day **SHIPPED** as `labor-day-weekend-camping`, Halloween as `halloween-camping-with-kids`, Columbus Day as `columbus-day-weekend-camping` and Thanksgiving as `thanksgiving-camping-with-kids` (all four filed under scenario); Memorial Day, July 4 and a shoulder-season entry remain.
- Cold-weather plan (only after `winter-camping-for-beginners` traffic justifies it).
- Email drip sequence (defer until traffic data justifies — user flagged as far-out).
- Quiz dark-comfort question (only if a corresponding plan-output change ships).
- Press / partner-logos placeholder (only meaningful when there's something to put there).
- Skill: knot lashings, batoning, fire-by-friction (advanced — defer until traffic shows scout-level demand).
- Sober camping / pregnancy / food-allergy guides (real demand, but niche; sequence after general scenario-guide gaps fill).
- Canada / Mexico location guides (defer until US gaps close).

### New gaps identified in the 2026-09-03 re-baseline

These come from the current catalogue rather than the original May snapshot.

- **Canonical reservation-systems reference (one table, one source of truth)** — **S effort, high lift.** The 18 location guides plus `recreation-gov-reservation-strategy` now each assert their own booking window, release time, and reservation URL independently. The 2026-09-03 audit found three mutually inconsistent statements of the *same* Recreation.gov release time across three guides. A single sourced table (state, system, URL, window, release time) is both a citable asset and the structural fix that stops the drift. Everything else on this list is optional; this one is maintenance debt that compounds every time a state guide ships.
- **Seasonal is recovering, but the routing rule is still arbitrary** — **S effort, editorial.** Seasonal sat at 4 guides from May through three baselines and is now **7**, the first movement in four baselines, because `camping-during-hunting-season`, `camping-in-40-degree-weather` and `gifts-for-campers` were filed there on purpose. That resolves the "revive or retire" question in favour of revive. What is left is consistency: in the *same* cycle, `fall-foliage-camping-with-kids` and `thanksgiving-camping-with-kids` shipped as `scenario`, so a gift guide now sits in seasonal while a holiday-weekend guide does not. The remaining work is a one-line written rule for what belongs in seasonal, plus a recategorisation pass over the six holiday and season guides still filed elsewhere (Halloween, Labor Day, Columbus Day, Thanksgiving, fall foliage, off-season gear storage), which would take the category from 7 to 13 with no new writing.
- **Second wave of state guides: WA, OR, TN** — **M effort each, high lift.** North Carolina **SHIPPED** in the 2026-10-12 cycle as `camping-in-north-carolina-for-beginners`. **Tennessee is written and queued for 2026-11-14 but unpublished**, along with seven other states (SC, AL, NM, NV, VA, LA, KY). WA and OR are not in the queue, and the region guides still link `parks.wa.gov` and `stateparks.oregon.gov` without a dedicated destination. Publishing the queue delivers most of this item at no authoring cost. Ship WA and OR *after* the canonical reservation table, so they consume it rather than adding two more copies of the same facts.
- **Location index / state picker** — **S effort, medium lift.** 20 location guides have no browse surface between the guides hub and the individual article, and the queue would take that to 28. A simple state-and-region picker would convert the cluster's internal-link value, and is worth building *before* the queued state guides land rather than after.
- **Gear bundles have not kept pace with the catalogue** — **S–M effort, medium-high lift.** Bundles have been 4 since the first baseline while the catalogue went 44 to 127 active products and guides went to 116. The gap widened at every one of the last five baselines. Note the catalogue itself declined this cycle (133 to 127) as dead ASINs were retired, so the ratio improved for the wrong reason. This strengthens the existing budget-tier bundle items (#12) rather than replacing them.

### Movement in the 2026-09-07 re-baseline

Two guides landed since 2026-09-03 (`how-to-store-camping-gear`, `halloween-camping-with-kids`),
taking the catalogue from 56 to 58. Both were season-shaped topics filed under basics and
scenario, so **seasonal is still at 4** and its share of the guide surface fell again. The
category is not being starved of ideas; it is being routed around.

The **canonical reservation-systems reference** item above got stronger, not weaker. The
2026-09-07 audit found the drift it predicts had spread to a fourth guide:
`camping-in-california-for-beginners` applied Yosemite's 5-month block-release window to every
federal park in the state (Sequoia, Joshua Tree, Death Valley, Pinnacles, Lassen, Redwood), all
of which use the standard 6-month rolling window, and `camping-in-utah-for-beginners` asserted a
"twelve months out" federal booking race that matches no system. Both were corrected in this
audit, but that is now two consecutive audits fixing the same class of error in different files.
Ship the table.

### Movement in the 2026-10-05 re-baseline

Eight guides landed since 2026-09-07, taking the catalogue from 58 to 66. Three arrived before
this audit ran (`camping-after-dark-with-kids`, `camping-in-bear-country-with-kids`,
`how-to-keep-kids-warm-camping`) and five more landed while its PR sat open
(`setting-up-camp-in-the-dark`, `cold-weather-camping-meals`,
`how-to-prevent-tent-condensation`, `tent-heater-safety`, `columbus-day-weekend-camping`).

**Seven of the eight are plainly season-shaped, and not one was filed as seasonal**
(`how-to-prevent-tent-condensation` is the arguable case, since condensation is a year-round
problem that merely worsens in the cold). Seasonal is still at 4 for a third consecutive
baseline and its share of the guide surface fell again to 6.1%.

The clearest single data point is `columbus-day-weekend-camping`. Holiday-weekend camping is
listed in this very document as a Tier 3 *seasonal* gap; the guide is a direct sibling to
`labor-day-weekend-camping`; and it shipped as `scenario` - as did Labor Day and Halloween
before it. Counting back to the 2026-09-03 baseline, ten guides whose entire premise is a
season or a holiday have been filed under basics or scenario: off-season gear storage,
Halloween, Labor Day, Columbus Day, after dark with kids, bear country, keeping kids warm,
cold-weather meals, tent heater safety, and setting up camp in the dark. The 2026-09-07 note
that the category "is being routed around, not starved of ideas" is no longer an inference.
`seasonal` is in practice a dead category that four old guides happen to sit in, and the
decision it needs is whether to revive it or retire it.

Those guides also form an unplanned cluster that is worth naming: **camping with kids in
adverse fall conditions** (dark, cold, bears, heaters, after-dark arrival) is now six guides
deep with no hub or browse surface, and it partially overlaps the still-open scenario gap
"cold-weather scenario: camping in 30-45°F weather". `how-to-keep-kids-warm-camping` covers the kid-specific half of that gap;
the general shoulder-season cold-snap guide is still unbuilt, so the item stays open rather than
being marked shipped.

The **canonical reservation-systems reference** item is now backed by a third consecutive audit,
and this time the evidence is sharper than drift between files. The 2026-10-05 audit found
`camping-in-the-northeast-for-beginners` contradicting *itself*: its common-mistakes section
claimed Acadia's Blackwoods and Seawall "release 60 days ahead", while the same file's
reservations list, its Acadia section, its visible FAQ and its JSON-LD FAQ all correctly said
6 months. Acadia in fact releases 90% of sites six months ahead on the first of the month at
10 a.m. ET, with the remaining 10% at 14 days out. One guide, five statements of the same fact,
one of them wrong. A shared table is the only fix that scales: the error rate per guide is not
falling, and there are now 66 guides.

One further process signal from this cycle, worth recording because it is structural rather
than editorial: **of the five guides that landed while the audit PR was open, all five shipped
with over-length SEO metadata**, as did the new `down-vs-synthetic-sleeping-bag` compare page
and the two guides refreshed by the "best tents / kids sleeping bag" SEO pass. That is 18
over-limit values in 16 commits, swept in this audit's branch after a rebase. Metadata limits
are mechanically checkable and currently only get checked weekly, after the fact. A pre-commit
or CI check against `metaTitle <= 41` and `metaDescription <= 155` would stop the whole class at
the source and is a smaller job than the reservation table.

### Movement on 2026-10-06 (content PR, not a re-baseline)

Three guides added, taking the catalogue in `lib/guides/data.ts` from 79 to 82 (several guides
landed after the 2026-10-05 baseline count of 66):

- `what-not-to-bring-camping` (basics) closes Tier 1 item #6.
- `camping-in-40-degree-weather` (seasonal) closes the scenario gap "cold-weather scenario:
  camping in 30-45°F weather". It is filed as **seasonal**, not scenario, as a first response to
  the 2026-10-05 finding that season-shaped guides keep being routed around the seasonal
  category. It also acts as the adult-and-family hub for the cold-night cluster
  (`how-to-keep-kids-warm-camping`, `sleeping-pad-r-value-explained`, `tent-heater-safety`,
  `how-to-prevent-tent-condensation`, `camp-stove-fuel-in-cold-weather`,
  `cold-weather-camping-meals`), which it links in body.
- `gifts-for-campers` (seasonal) is a new item not previously on this backlog: a holiday gift
  guide built entirely from products already in the affiliate registry, timed for November and
  December commercial searches. It is the site's first gift guide.

Seasonal moves from 5 guides (the four generic seasons plus `camping-during-hunting-season`) to
7. Basics moves from 28 to 29. The counts in section 1 are left at the 2026-10-05 baseline until
the next full re-baseline.

### Movement in the 2026-10-12 re-baseline

Sixteen guides landed in 26 commits since `a65e01e`, taking the catalogue from 66 to **82**. It
is the largest single cycle on record and it moved every category: basics 23 to 29, scenario 21
to 26, seasonal 4 to 7, location 18 to 20. One compare page (`mummy-vs-rectangular-sleeping-bag`)
and 22 affiliate products also shipped, taking the registry to 133. The glossary, skills,
activities, printables, plans and bundles are all unchanged.

**Seasonal moved for the first time in four baselines**, which settles the open question from
2026-10-05. The category is being revived rather than retired: three of the sixteen new guides
were filed there deliberately. But the same cycle filed `fall-foliage-camping-with-kids` and
`thanksgiving-camping-with-kids` as `scenario`, so the taxonomy now has a holiday gift guide in
seasonal and a holiday-weekend camping guide in scenario. The decision has been made; the rule
has not been written down. See the revised gap item above.

Two Tier-1 and Tier-2 items closed: `what-not-to-bring-camping` (Tier 1 #6, the last unshipped
Tier 1 content item) and North Carolina, the first of the four second-wave state guides.

**The canonical reservation-systems reference is now backed by a fourth consecutive audit, and
this time the error arrived with the content rather than drifting into it.** The 2026-10-12
audit found `camping-in-the-ozarks-for-beginners` asserting in four places that Kyles Landing
and Erbie on the Buffalo National River "stay first-come, first-served". That was true when the
guide was written and stopped being true on **September 1, 2026**, six weeks before the audit
ran, when the National Park Service extended reservations to all individual sites at both
campgrounds. The guide is one of the two newest location guides, so this is not legacy debt: a
guide shipped in this cycle carried a reservation fact that expired within the same cycle.

That changes the argument for the table. The first three audits found drift between guides, or a
guide disagreeing with itself, both of which a shared source of truth prevents by construction.
This one found something a table also fixes but in a different way: the Buffalo River rule
appears in exactly one guide, so no amount of cross-checking between guides would have caught
it. What catches it is having one dated, sourced row per system that a human reviews on a
schedule, instead of the same fact written into prose in four places inside one article, where
updating it means finding all four. The audit did find all four this time. The next one may not.

A related process note: the reservation facts this site asserts are now spread across 20
location guides, `recreation-gov-reservation-strategy`, `best-state-parks-for-families` and
`lib/plan-templates.ts`. The weekly audit verified 14 distinct systems this cycle by web search
and found one stale. That hit rate is sustainable; the surface area is what is growing.

---

### Movement in the 2026-11-23 re-baseline

Thirty-four guides landed since 2026-10-12, taking the catalogue from 82 to 116. That beats the
previous record cycle (sixteen) by more than double, and it arrived alongside a merged PR queue:
the eighteen-PR backlog that the last four audits called the site's main health problem is gone.

**But almost none of it came from this backlog, and the mechanism matters.** On 2026-10-19 a
thirty-guide November publishing queue landed in `content-queue/` (#166), each item carrying a
`publishOn` date for `scripts/publish-next-queued-guide.mjs` to pick up daily. As of today
**four of the thirty have published and twenty are past due**, the oldest dated 2026-11-02.
`first-day-hikes-with-kids` published out of order from a 2026-11-30 slot while twenty earlier
items waited. The thirty-four guides that did ship came through individual PRs on a separate
track.

This reframes several standing items rather than resolving them:

- **The location cluster is not an authoring gap any more.** It has sat at 20 for three
  baselines, and eight finished state guides (SC, AL, NM, TN, NV, VA, LA, KY) are in the queue
  waiting. Tennessee, one of the three Tier-2 "second wave" states, is among them.
- **Two Tier-2 backlog items are written and queued, not missing.** `campground-etiquette-for-families`
  (item 13) is dated 2026-11-18 and `leave-no-trace-with-kids` (item 10) 2026-11-22. Marking them
  as gaps overstates the work left; running the publisher is the work left.
- **The gaps that are genuinely untouched are the non-guide ones.** Plans (4), gear bundles (4),
  skills (68 / 12 categories) and activities (37 / 8 categories) have not moved in five baselines
  while guides nearly doubled. The guide surface is 116 against 4 bundles.

Two category observations from the recount:

**Seasonal is no longer starved, but the routing rule is now provably inconsistent.** It went 7 to
18, and the question the last four baselines asked ("revive or retire") is settled by the numbers.
What replaced it is sharper: `first-day-hikes-with-kids` (January 1) is filed seasonal while
`winter-break-camping-with-kids`, covering the same calendar week, is scenario. All seven gift
guides are seasonal; Halloween, Thanksgiving, Labor Day, Columbus Day and fall foliage are not.
This is no longer an argument about whether the category deserves content, it is two guides about
the same week in different categories. The one-line written rule is still the whole fix.

**The affiliate catalogue declined for the first time**, 133 to 127 active, because dead and
unbuyable ASINs were retired faster than new ones landed. Twenty of 147 registry entries are
deprecated. That is healthy maintenance, but it means "breadth is no longer the constraint" needs
restating: the constraint was never breadth and is now demonstrably the bundle surface, which has
been 4 since the first baseline.

The **canonical reservation-systems reference** item is unchanged in priority and gained its
sixth consecutive piece of supporting evidence. The 2026-11-23 audit found Wyoming's state-park
reservation requirement asserted without its seasonal bound in **five** places in one guide, and
Florida's resident-only 11-month window asserted in **four** places in another. Nine edits, two
facts. A table with one dated row per system would have made both a one-line change.

---

## 4. Out of scope

Things not worth doing for this site:

- **Deep international coverage** — the site is US-focused; one Canada starter is the ceiling.
- **Backpacking / thru-hiking content** — the brand is family car-camping; backpacking is a different audience and pulls focus.
- **Bushcraft / survivalism content** — adjacent but off-brand. Trailstead is "structured beginner," not "wilderness survival."
- **AMP pages** — Google deprecated the format; no upside.
- **Native mobile app** — the printable PDFs already serve the offline-at-camp use case.
- **Forums / community / UGC** — moderation overhead, low SEO upside, no current resourcing.
- **Trip-report blog format** — would dilute the "structured planner" positioning; if added later, route them as research pieces, not a blog.
- **Hyper-local "campgrounds near [city]" pages** — programmatic scale at this volume creates thin-content risk; better served by the location-by-state structure already in place.
- **Coupon / deal pages** — off-brand for a planning-first site; affiliate model already works without it.

---

*Snapshot owner: this doc is a backlog, not a plan. Re-baseline counts whenever new content lands; gap items should graduate to plan/issue tickets before being built.*
