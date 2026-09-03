# Content Gap Analysis — Trailstead Guide

A backlog-shaped audit of the current content surface, what's missing, and what's worth shipping next. Snapshot re-baselined 2026-09-03 against `main` (previous baseline: 2026-05-05).

---

## 1. Snapshot — current state

| Area | Count | Status |
|---|---|---|
| Plans | 4 | Foundation set — all introductory (backyard / first night / first weekend / family basecamp). No intermediate or activity-specific. Unchanged since the last baseline. |
| Guides — total | 56 | Up from 35. The location cluster absorbed most of the growth. |
| Guides — Basics | 19 | Beginner core, family meal/gear sub-niche, plus the dispersed-camping and Recreation.gov micro-guides. Densest category. |
| Guides — Scenario | 15 | Family scenarios complete; holiday-weekend entry added. Broader life-situation scenarios (group, mobility, allergy) still absent. |
| Guides — Seasonal | 4 | Generic spring/summer/fall/winter, unchanged. Now the thinnest category at 7% of the guide surface. |
| Guides — Location | 18 | 8 US regions + best-state-parks roundup + 9 single-state guides (NY, MI, PA, GA, WI, WY, MT, UT, AZ). |
| Skills | 68 / 12 categories | Unchanged. Foundational + intermediate layer solid; several adjacent categories still absent. |
| Activities | 37 / 8 categories | Activity content unchanged, but 4 age/weather landing pages (kids, teenagers, toddlers, rainy-day) now ship as browse surfaces. Water-based category still missing. |
| Comparison pages | 15 | Up from 6, plus a `/compare` index. Tent / cooler / stove / sleeping-system type compares all shipped. |
| Research | 2 | Up from 1, plus a `/research` index. Regrets + pack-analysis pieces live. |
| Gear bundles | 4 | Unchanged. One per plan. No budget-tier, kid-only, or season-specific bundles. |
| Affiliate catalog | 93 products | Up from 44. Breadth is no longer the constraint. |
| Trip Packs (paid) | 4 | One per plan — unchanged. |
| Printables (free, email-gated) | 15 | Unchanged. Strong analog asset library. |
| Glossary | 58 terms | New since last baseline. Shipped at `/glossary`. |
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

### Guides — Basics (12)
Coverage is dense. Most gaps are tactical micro-topics, not whole guides.

Missing (5–8 high-intent titles):
- **How to find dispersed camping on BLM and National Forest land** — captures "free camping near me" intent. High traffic.
- **Campsite reservation strategy** — Recreation.gov timing, 6-month windows, cancellation refresh tricks.
- **Camping etiquette: 12 unwritten rules** — high pin/share format, easy AI-citation passages.
- **Camping food planning (no-cook + cooler-first)** — sits between the two existing meal guides; covers structure, not recipes.
- **What NOT to bring camping** — counter-list to packing-list guides; high CTR.
- **How to read a campsite map (state/national park reservation maps)** — beginner blocker, currently uncovered.
- **Camping on a budget** (separate from the family-budget guide) — single + couple version with annual cost breakdown.
- **Tent setup intermediate: pitching in wind/slope/uneven ground** — graduation step from beginner pitch.

### Guides — Scenario (10)
Family-specific scenarios are well-covered. Broader life-situation scenarios are missing.

Missing (5–8 titles):
- **Cold-weather scenario: camping in 30–45°F weather** — dedicated cold-snap guide separate from winter; common shoulder-season bail point.
- **Group camping for 10+ people** — coordination, site selection, shared-meal logistics.
- **Camping with elderly relatives or limited mobility** — site selection, accessible parks, gear adjustments.
- **Camping while pregnant** — high-search, low-supply niche.
- **Sober camping / camping without alcohol** — strong AI-citation niche; growing search demand.
- **Camping with food allergies (gluten, nut, dairy)** — meal planning, cross-contamination, emergency prep.
- **Last-minute / impromptu camping** — what you can pull off with 24-hour notice.
- **Gear-failure recovery** — what to do when the tent leaks / stove won't light / cooler fails — this is a research-piece topic too.

### Guides — Seasonal (4)
Four broad seasons covered. Sub-seasonal scenarios untouched.

Missing (3–5 titles):
- **Holiday-weekend camping (Memorial / July 4 / Labor Day)** — crowd strategy, reservation timing, alternatives.
- **Shoulder-season camping (April / October)** — dedicated guide for unpredictable weather.
- **Pre-season prep / off-season teardown** — stretches storage SEO — gear care, mildew prevention.
- **First warm-weekend camping** — for family audience emerging from winter, distinct from "spring camping for beginners."

### Guides — Location (9)
US regions are 70% covered; specific high-traffic states are missing.

Missing (5–8 titles):
- **Camping in New York (Adirondacks)** — major NE traffic source, separate from broad Northeast guide.
- **Camping in Michigan (Upper Peninsula)** — distinct ecosystem, high enthusiast traffic.
- **Camping in Pennsylvania** — heavy state-park network, high search.
- **Camping in Wisconsin** — Northwoods/lake intent.
- **Camping in Georgia** — Southeast gap (Florida is covered, GA isn't).
- **Camping in Wyoming / Montana** — Yellowstone/Glacier-adjacent.
- **Camping in Utah / Arizona for beginners** — sub-divides desert-southwest by state for higher-intent matches.
- **Camping in Canada (Ontario / BC) for first-timers** — international starter; high search from US visitors.

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

### Comparison pages (6)
Plan-vs-plan: 2. Product compares: 4. Format works; surface area is small.

Missing (highest leverage):
- **Tent type comparison: dome vs cabin vs backpacking** — query-rich, conversion-friendly. Routes into existing tent products.
- **Stove comparison: 1-burner vs 2-burner vs all-in-one** — already have a 1-burner-vs-Camp-Chef; missing the category-level explainer.
- **Cooler comparison: hard vs soft vs powered** — beyond the current rolling-vs-steel-belted.
- **Sleeping system: bag vs quilt vs blanket** — high-intent, gear-decision query.
- **"Trailstead Guide vs winging it"** — narrative compare. Owns brand-search and serves as conversion page.
- **Plan vs alternative experience: "Easy Family Basecamp vs renting a cabin"** — high-intent, captures users mid-decision.
- **Plan vs alternative experience: "Backyard Test vs glamping"** — same shape, different segment.
- **Headlamp vs lantern vs string lights** — short, high-conversion lighting compare.

### Research / data pieces (1)
The biggest growth lever. One piece live (`first-time-camping-regrets`). Format is proven for backlinks and AI citation.

Missing (4–6 follow-on ideas):
- **What 1,000 first-time campers actually packed (Reddit/forum analysis)** — companion to regrets piece. Sets up gear authority.
- **Most-asked first-trip questions: 12 months of r/camping search data** — long-tail authority builder.
- **Campsite booking timing: when reservations actually fill (Recreation.gov data)** — citable stats, evergreen.
- **The "first trip cost" reality check: what beginner families actually spend** — pricing transparency, links to gear bundles.
- **Beginner gear failure rates: which items break first (forum complaint analysis)** — feeds the gear-failure-recovery guide and product compare reasoning.
- **What kids actually remember about camping (parent survey / reddit thread synthesis)** — soft-emotional piece, high social shares.

### Gear (4 bundles, 44 products)
Bundles map 1:1 to plans. Missing the budget and life-stage cuts.

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
- **`/research` index** — currently a single article with no parent. Once a 2nd piece ships, index becomes important.
- **`/compare` index** — discovery surface for the 6 (and growing) compare pages. Currently no parent route.
- **Glossary / camping terms page** — high AI-citation lift; explains terms used across guides (rainfly, vestibule, footprint, double-wall, etc.).
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
6. **Guide: "What NOT to bring camping"** — **S effort, medium-high lift.** Counter-list to existing packing guides, high CTR, easy social. Still the cheapest unbuilt Tier 1 item.
7. **About page trust upgrade: testimonials wall + methodology block** — **S effort, medium lift.** Conversion lift on key landing pages, especially before the quiz.

### Tier 2 — worth doing, sequence after Tier 1

8. ~~**Compare: "Trailstead Guide vs winging it" + "Easy Family Basecamp vs renting a cabin"**~~ — **SHIPPED** as `trailstead-guide-vs-winging-it` and `family-camping-vs-cabin-rental`.
9. ~~**Guide cluster: 4 missing high-intent state guides (NY, MI, PA, GA)**~~ — **SHIPPED**, and over-delivered: WI, WY, MT, UT and AZ shipped alongside them, taking the location cluster from 9 to 18.
10. **Skill category: Leave No Trace (5–7 skills)** — M / medium lift. AI-citation; pairs with planned methodology block.
11. **Skill category: Camp Hygiene (4–6 skills)** — S / medium lift. Searchable, scattered topics now.
12. **Gear: Under-$200 budget bundle + Under-$500 mid bundle** — S each / medium-high lift. Captures "cheap camping gear" intent and gives quiz comfort-tier outputs distinct destinations.
13. **Guide: "Camping etiquette" + "How to read a campsite map"** — S each / medium lift. Tactical micro-guides; both are easy AI-citation passages.
14. **Research piece #3: "Campsite booking timing (Recreation.gov data)"** — M / high lift. Citable stats; supports the new reservation-strategy guide.
15. **Activities: water-games category (5 activities)** — S–M / medium lift. The age-bucketed browse half of this item **SHIPPED** (kids / teenagers / toddlers / rainy-day landing pages); the water-games content did not. Activity count is still 37 across 8 categories.
16. **Plan: 4-night intermediate state-park stay** — L / medium lift. Repeat-customer destination; later in the funnel than the existing four.

### Tier 3 — nice to have, later or never

- New seasonal sub-guides (holiday weekends, shoulder season). Labor Day **SHIPPED** as `labor-day-weekend-camping`; Memorial Day and July 4 remain.
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
- **Seasonal is now structurally underweight** — **M effort, medium lift.** Seasonal sat at 4 guides in May and is still 4, while the catalogue grew from 35 to 56. It is now 7% of the guide surface with no holiday-weekend siblings to `labor-day-weekend-camping` and no shoulder-season entry, despite the template already existing.
- **Second wave of state guides: WA, OR, NC, TN** — **M effort each, high lift.** The region guides already link these agencies (`parks.wa.gov`, `stateparks.oregon.gov`, `ncparks.gov`, `tnstateparks.com`) without a dedicated destination. They are the highest-volume states left after the nine that shipped, and the guide template is now well established.
- **Location index / state picker** — **S effort, medium lift.** 18 location guides have no browse surface between the guides hub and the individual article. A simple state-and-region picker would convert the cluster's internal-link value.
- **Gear bundles have not kept pace with the catalogue** — **S–M effort, medium-high lift.** The affiliate catalogue more than doubled (44 to 93 products) while bundles stayed at 4, so most of the catalogue has no bundle surface. This strengthens the existing budget-tier bundle items (#12) rather than replacing them.

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
