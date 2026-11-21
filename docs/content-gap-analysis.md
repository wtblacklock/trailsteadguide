# Content Gap Analysis — Trailstead Guide

A backlog-shaped audit of the current content surface, what's missing, and what's worth shipping next. Snapshot re-baselined 2026-11-16 against `main` at `345ecff` (previous baseline: 2026-10-12).

---

## 1. Snapshot — current state

| Area | Count | Status |
|---|---|---|
| Plans | 4 | Foundation set — all introductory (backyard / first night / first weekend / family basecamp). No intermediate or activity-specific. Unchanged since the last baseline. |
| Guides - total | 104 | Up from 82 on 2026-10-12, in 39 merged commits. Twenty-two guides landed across three cycles after a five-week period in which nothing merged at all: a six-guide **gift and Black Friday cluster**, a five-guide **winter and cold cluster** (warm-winter destinations, winter break, dressing kids for cold, hypothermia and frostbite, winter camping with dogs), four **camp-skill basics** (put out a campfire, wash dishes, whittling, plus fishing and hiking with kids from camp), and a scatter of scenarios (another family, cabin camping, electric site, sleeping in your car, getting kids to sleep). |
| Guides - Basics | 34 | Up from 29. `how-to-put-out-a-campfire`, `how-to-wash-dishes-camping`, `teaching-kids-to-whittle`, `fishing-with-kids-at-camp` and `hiking-with-kids-from-camp` added. No longer the densest category: scenario has overtaken it. |
| Guides - Scenario | 35 | Up from 26, and now the largest category. Nine added, seven of them cold-weather or shelter-shaped: `how-to-dress-kids-for-cold-weather-camping`, `hypothermia-and-frostbite-in-kids`, `winter-camping-with-dogs`, `winter-break-camping-with-kids`, `state-park-cabin-camping-with-kids`, `tent-camping-at-an-electric-site`, `how-to-sleep-in-your-car-camping`, plus `camping-with-another-family` and `how-to-get-kids-to-sleep-camping`. Broader life-situation scenarios (mobility, allergy, pregnancy) still absent; `camping-with-another-family` is the closest thing yet to the open group-camping gap but stops at two families. |
| Guides - Seasonal | 15 | **The routing question is settled.** Up from 7, more than doubling, and now 14.4% of the guide surface against 6.1% two baselines ago. All eight additions were filed here on purpose: the six gift guides (`best-camping-gifts-for-families`, `camping-gifts-for-kids`, `camping-gifts-under-50`, `camping-stocking-stuffers`, `gifts-for-new-campers`, `black-friday-camping-gear`), plus `first-day-hikes-with-kids` and `warm-winter-camping-destinations`. Seasonal is no longer a dead category being routed around. The historical inconsistency remains unfixed, though: the six holiday and season guides filed under scenario or basics before this cycle have not been recategorised. |
| Guides - Location | 20 | Unchanged, and the only category that did not move. 8 US regions + best-state-parks roundup + 11 single-state guides (NY, MI, PA, GA, WI, WY, MT, UT, AZ, NC, plus the Ozarks as a cross-state region). WA, OR and TN remain the open second wave. |
| Skills | 68 / 12 categories | Unchanged for a third baseline. Foundational + intermediate layer solid; several adjacent categories still absent. Note that `teaching-kids-to-whittle` and `how-to-wash-dishes-camping` shipped as *guides*, covering ground the open knife-skills and camp-hygiene skill gaps describe. |
| Activities | 37 / 8 categories | Activity content unchanged for a third baseline. 4 age/weather landing pages (kids, teenagers, toddlers, rainy-day) ship as browse surfaces. Water-based category still missing, though `fishing-with-kids-at-camp` and `hiking-with-kids-from-camp` now cover that intent as guides. |
| Comparison pages | 18 | Up from 17. `3-season-vs-4-season-tent` added, which is also the first seasonal-axis compare. Tent / cooler / stove / sleeping-system type compares all shipped. |
| Research | 2 | Up from 1, plus a `/research` index. Regrets + pack-analysis pieces live. |
| Gear bundles | 4 | Unchanged. One per plan. No budget-tier, kid-only, or season-specific bundles. |
| Affiliate catalog | 147 products (127 active) | Up from 133. Breadth is emphatically no longer the constraint; the bundle surface is. **147 products against 4 bundles**, a ratio that has worsened at every baseline for five months. |
| Trip Packs (paid) | 4 | One per plan — unchanged. |
| Printables (free, email-gated) | 19 | Up from 17. Fishing quick reference and the Camping With Dogs Field Card added. Strong analog asset library. |
| Glossary | 67 terms | Up from 61. Potable/giardia and the Totin' Chip terms among the additions. Shipped at `/glossary`. |
| About / trust | 1 bio | Founder story, FAQ. No testimonials wall, press, or logo strip. |
| Quiz | 6 questions | Question coverage is sufficient for current personalization output. |
| Tools | 2 | trip-planner + checklist-generator. `/research`, `/compare` and `/glossary` have shipped; a human-readable HTML sitemap is still missing. |

---

## 2. Gap analysis by area

### Plans
Current 4 are all introductory. The "first 3 trips" arc is well covered.

Missing:
- **Intermediate plan: 4-night state-park stay** — the natural next trip after `easy-family-basecamp`. Repeat customers have nowhere to graduate to.
- **Activity-specific plan: lake/water-focused weekend** — paddle/swim trips are a different gear and timeline shape and a high-search niche.
- **National-park-specific plan template** (e.g. "Great Smoky Mountains weekend with kids") — captures one of the fattest beginner intent buckets and slots cleanly under the existing location guides.
- **Cold-weather plan** — paired naturally with `winter-camping-for-beginners` guide; current plans assume 3-season.

### Guides — Basics (29)
Coverage is dense. Most gaps are tactical micro-topics, not whole guides.

Missing (5–8 high-intent titles):
- **How to find dispersed camping on BLM and National Forest land** — captures "free camping near me" intent. High traffic.
- **Campsite reservation strategy** — Recreation.gov timing, 6-month windows, cancellation refresh tricks.
- **Camping etiquette: 12 unwritten rules** — high pin/share format, easy AI-citation passages.
- **Camping food planning (no-cook + cooler-first)** — sits between the two existing meal guides; covers structure, not recipes.
- ~~**What NOT to bring camping**~~ - **SHIPPED** 2026-10-06 as `what-not-to-bring-camping`.
- **How to read a campsite map (state/national park reservation maps)** — beginner blocker, currently uncovered.
- **Camping on a budget** (separate from the family-budget guide) — single + couple version with annual cost breakdown.
- **Tent setup intermediate: pitching in wind/slope/uneven ground** — graduation step from beginner pitch.

### Guides — Scenario (26)
Family-specific scenarios are well-covered. Broader life-situation scenarios are missing.

Missing (5–8 titles):
- ~~**Cold-weather scenario: camping in 30-45°F weather**~~ - **SHIPPED** 2026-10-06 as `camping-in-40-degree-weather`, deliberately filed under seasonal (see the 2026-10-06 movement note).
- **Group camping for 10+ people** — coordination, site selection, shared-meal logistics.
- **Camping with elderly relatives or limited mobility** — site selection, accessible parks, gear adjustments.
- **Camping while pregnant** — high-search, low-supply niche.
- **Sober camping / camping without alcohol** — strong AI-citation niche; growing search demand.
- **Camping with food allergies (gluten, nut, dairy)** — meal planning, cross-contamination, emergency prep.
- **Last-minute / impromptu camping** — what you can pull off with 24-hour notice.
- **Gear-failure recovery** — what to do when the tent leaks / stove won't light / cooler fails — this is a research-piece topic too.

### Guides — Seasonal (7)
Four broad seasons plus hunting season, 40-degree weather and the gift guide. Sub-seasonal scenarios still thin.

Missing (3–5 titles):
- **Holiday-weekend camping (Memorial / July 4)** — crowd strategy, reservation timing, alternatives. Labor Day, Columbus Day, Halloween and Thanksgiving have all shipped, the last three filed outside seasonal.
- **Shoulder-season camping (April / October)** — dedicated guide for unpredictable weather.
- ~~**Pre-season prep / off-season teardown**~~ - **SHIPPED** as `how-to-store-camping-gear` (filed under basics, not seasonal).
- **First warm-weekend camping** — for family audience emerging from winter, distinct from "spring camping for beginners."

### Guides — Location (20)
US regions are 70% covered; specific high-traffic states are missing.

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

### Comparison pages (17)
Plan-vs-plan: 2. Product compares: 5. Format works; surface area is small.

Missing (highest leverage):
- **Tent type comparison: dome vs cabin vs backpacking** — query-rich, conversion-friendly. Routes into existing tent products.
- **Stove comparison: 1-burner vs 2-burner vs all-in-one** — already have a 1-burner-vs-Camp-Chef; missing the category-level explainer.
- **Cooler comparison: hard vs soft vs powered** — beyond the current rolling-vs-steel-belted.
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

### Gear (4 bundles, 133 products)
Bundles map 1:1 to plans. Missing the budget and life-stage cuts. The ratio is now 33 products per bundle.

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
- ~~**`/compare` index**~~ - **SHIPPED** at `/compare`, now parenting 17 compare pages.
- ~~**Glossary / camping terms page**~~ - **SHIPPED** at `/glossary`, 61 terms.
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
10. **Skill category: Leave No Trace (5–7 skills)** — M / medium lift. AI-citation; pairs with planned methodology block.
11. **Skill category: Camp Hygiene (4–6 skills)** — S / medium lift. Searchable, scattered topics now.
12. **Gear: Under-$200 budget bundle + Under-$500 mid bundle** — S each / medium-high lift. Captures "cheap camping gear" intent and gives quiz comfort-tier outputs distinct destinations.
13. **Guide: "Camping etiquette" + "How to read a campsite map"** — S each / medium lift. Tactical micro-guides; both are easy AI-citation passages.
14. **Research piece #3: "Campsite booking timing (Recreation.gov data)"** — M / high lift. Citable stats; supports the new reservation-strategy guide.
15. **Activities: water-games category (5 activities)** - S-M / medium lift. The age-bucketed browse half of this item **SHIPPED** (kids / teenagers / toddlers / rainy-day landing pages); the water-games content did not. Activity count is still 37 across 8 categories for a third baseline. `fishing-with-kids-at-camp` now serves the water intent as a guide, which weakens the traffic case for the activity category without closing it.
16. **Plan: 4-night intermediate state-park stay** — L / medium lift. Repeat-customer destination; later in the funnel than the existing four.

### Tier 3 — nice to have, later or never

- New seasonal sub-guides (holiday weekends, shoulder season). Labor Day **SHIPPED** as `labor-day-weekend-camping`, Halloween as `halloween-camping-with-kids`, Columbus Day as `columbus-day-weekend-camping` and Thanksgiving as `thanksgiving-camping-with-kids` (all four filed under scenario); winter break **SHIPPED** as `winter-break-camping-with-kids` and New Year's Day **SHIPPED** as `first-day-hikes-with-kids` (both correctly filed under seasonal). Memorial Day, July 4 and a shoulder-season entry remain.
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
- **Seasonal routing: RESOLVED as of the 2026-11-16 baseline, with one cleanup left** - **S effort, editorial.** Seasonal more than doubled from 7 to 15 and all eight additions were filed there deliberately, so the "revive or retire" question is answered and new content is routing correctly. What remains is purely retrospective: the six pre-existing holiday and season guides listed below are still filed under scenario or basics. Recategorising them would take seasonal from 15 to 21 with no new writing. Original note follows. **S effort, editorial.** Seasonal sat at 4 guides from May through three baselines and is now **7**, the first movement in four baselines, because `camping-during-hunting-season`, `camping-in-40-degree-weather` and `gifts-for-campers` were filed there on purpose. That resolves the "revive or retire" question in favour of revive. What is left is consistency: in the *same* cycle, `fall-foliage-camping-with-kids` and `thanksgiving-camping-with-kids` shipped as `scenario`, so a gift guide now sits in seasonal while a holiday-weekend guide does not. The remaining work is a one-line written rule for what belongs in seasonal, plus a recategorisation pass over the six holiday and season guides still filed elsewhere (Halloween, Labor Day, Columbus Day, Thanksgiving, fall foliage, off-season gear storage), which would take the category from 7 to 13 with no new writing.
- **Second wave of state guides: WA, OR, TN** — **M effort each, high lift.** North Carolina **SHIPPED** in the 2026-10-12 cycle as `camping-in-north-carolina-for-beginners`. The region guides still link `parks.wa.gov`, `stateparks.oregon.gov` and `tnstateparks.com` without a dedicated destination. These are the highest-volume states left after the eleven that shipped, and the guide template is well established. Ship them *after* the canonical reservation table, so they consume it rather than adding three more copies of the same facts.
- **Location index / state picker** — **S effort, medium lift.** 20 location guides have no browse surface between the guides hub and the individual article. A simple state-and-region picker would convert the cluster's internal-link value.
- **Gear bundles have not kept pace with the catalogue** - **S-M effort, medium-high lift.** The affiliate catalogue has more than tripled (44 to 147 products) while bundles stayed at 4, so most of the catalogue has no bundle surface. The gap has widened at every one of the last five baselines. This strengthens the existing budget-tier bundle items (#12) rather than replacing them, and the six new gift guides make it worse: they are product-recommendation pages with no bundle to convert into.

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

### Movement in the 2026-11-16 re-baseline

**The queue unblocked.** The previous three baselines were written against a frozen `main`: the
2026-10-26 audit recorded zero commits merged in seven days and 18 open pull requests, four of
them audit output. Since then **39 commits have merged**, including the metadata-limits guard
(#131) that had been open 20 days. Twenty-two guides landed, taking the catalogue from 82 to
**104**. Every mechanical check in the weekly audit has a real surface to read again, and the
2026-11-16 audit found zero defects in metadata, dashes and internal links across that growth,
which is the guard working rather than the check being skipped.

Three structural shifts worth recording:

1. **Seasonal is fixed.** The category sat at 4 guides from May through three baselines while
   season-shaped content was filed around it, and this document called it "in practice a dead
   category". It is now **15**, having more than doubled in one cycle, with all eight additions
   filed there on purpose. The standing "revive or retire" decision is closed in favour of
   revive. Only the retrospective recategorisation of six older guides is left.
2. **A gift cluster shipped with no browse surface.** Six guides
   (`best-camping-gifts-for-families`, `camping-gifts-for-kids`, `camping-gifts-under-50`,
   `camping-stocking-stuffers`, `gifts-for-new-campers`, `black-friday-camping-gear`) plus the
   pre-existing `gifts-for-campers` make **seven** gift and deal guides, all seasonal, all
   shipped inside about five weeks. There is no gift hub, no `/gifts` index, and no gear bundle
   behind any of them. This is the single most time-boxed gap in the document: the traffic for
   these pages arrives in November and December and does not come back until next year. See the
   new gap below.
3. **The cold-and-dark cluster is now the largest unhubbed cluster on the site.** Five more
   winter guides landed (`warm-winter-camping-destinations`, `winter-break-camping-with-kids`,
   `how-to-dress-kids-for-cold-weather-camping`, `hypothermia-and-frostbite-in-kids`,
   `winter-camping-with-dogs`), on top of the ten-guide adverse-conditions set the 2026-10-26
   audit named. That is roughly **15 guides** doing browse work through `relatedGuides` by hand.
   The hub recommendation has outranked new content for three audits and is now larger than
   some whole categories.

**Location is the only category that did not move**, which sharpens the second-wave item: WA, OR
and TN are still linked by the region guides without a destination, and the canonical
reservation-systems table they should consume is still unbuilt. That table remains the oldest
open structural item in this document, now backed by a sixth consecutive audit: the 2026-11-16
run corrected `camping-in-wyoming-for-beginners` in **four places in one file** for a single
fact about Wyoming state park walk-in sites, exactly the cost the table exists to remove.

### New gaps identified in the 2026-11-16 re-baseline

- **Gift hub / `/gifts` index** - **S effort, high lift, and time-boxed to the next few weeks.**
  Seven gift and deal guides now exist with no index between the guides hub and the individual
  article, no cross-linking surface, and no bundle. Gift intent is the highest-commercial-intent
  traffic the site gets and it is seasonal, so a hub built in January is worth a fraction of one
  built now. Pairs naturally with the long-open budget-tier bundles (#12), since a gift hub with
  no bundle to convert into is leaving the money on the table twice.
- **Guides are outgrowing the skills and activities surfaces.** Skills (68) and activities (37)
  have not moved for three baselines while guides went 66 to 104. Four of this cycle's guides
  (`teaching-kids-to-whittle`, `how-to-wash-dishes-camping`, `fishing-with-kids-at-camp`,
  `hiking-with-kids-from-camp`) cover ground that open *skill* and *activity* gaps in this
  document describe, shipped as long-form guides instead. That is not wrong, but it means the
  skill and activity gap lists are drifting out of date rather than being worked, and content
  that would be a 400-word skill is being written as a 2,000-word guide. Worth an explicit
  decision: either retire the overlapping skill/activity items, or route this content there.
- **Year-scoped park facts need a review hook.** `camping-in-montana-for-beginners` and
  `camping-in-utah-for-beginners` both assert correctly sourced facts explicitly scoped to
  **2026** (Glacier suspending vehicle reservations, Arches ending timed entry). Both are
  accurate today and were re-verified on 2026-11-16, with no 2027 announcement published for
  either park. But they will silently become stale the moment those announcements land, and the
  site has no mechanism that surfaces "this sentence names a year that is about to end." A
  lightweight convention, such as a `dateSensitive` note in `GUIDES` listing the facts to
  re-check each November, would make the weekly audit cheaper and less dependent on remembering
  which guides hardcode a season.

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
