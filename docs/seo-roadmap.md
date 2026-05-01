# SEO / AEO / GEO Roadmap

_Last audited: 2026-04-27 against the `feature/mvp-build` branch._

A snapshot of what's already shipped on Trailstead Guide, plus a prioritized
backlog of what to do next. Each backlog item is sized so it can be dropped
into a future task prompt as-is.

---

## 1. Snapshot — what's shipped

**Discoverability is in good shape.** The runtime sitemap at `app/sitemap.ts`
covers the full surface area: home, 4 guide-category hubs, 25 guide articles,
4 plan pages, 4 trip-pack pages, 13 activity pages, 31 skill pages, the gear
hub + 4 gear sets, 4 comparison pages, 2 tool pages, and the funnel/info
pages. lastmod is intentionally bucketed into three freshness tiers
(FRESH 2026-04-24 for core content, RECENT 2026-03-15, STABLE 2026-01-10) to
avoid the uniform-date low-quality signal. Robots policy lives at
`app/robots.ts` (not `public/robots.txt`) and explicitly allows GPTBot,
ClaudeBot, Google-Extended, PerplexityBot, and CCBot — only `/checklist/result`
is blocked. There is no `app/not-found.tsx` or `app/error.tsx` yet, so 404s
fall through to the Next.js default page.

**Structured data coverage is broad but uneven.** `lib/seo.ts` centralizes
JSON-LD builders for Organization, WebSite, Article, FAQPage, HowTo,
BreadcrumbList, CollectionPage, Product, and ItemList. Guide articles emit
Article + FAQPage + BreadcrumbList. Plans emit HowTo + Article +
BreadcrumbList. Activities and skills emit HowTo + Article + BreadcrumbList.
Gear sets emit Product + ItemList. Hubs (guides, plans, activities, skills,
gear) emit CollectionPage. **Notable gaps:** plan pages and trip-pack pages
(the paid products) emit no Product/Offer schema; Article author is hardcoded
to the Organization rather than a Person; and no Review/AggregateRating
exists yet because there are no testimonials.

**Share metadata, performance, AI accessibility, internal linking, and
content depth.** OG image is dynamic at `app/opengraph-image.tsx` (real logo
+ Source Serif italic tagline on the brand cream background) and pulled into
every page via `pageMetadata()`. Favicon stack is dynamic too (`app/icon.tsx`
32×32 and `app/apple-icon.tsx` 180×180). Vercel Analytics and Speed Insights
are mounted in `app/layout.tsx`. AI accessibility is handled by an
LLM-tuned `app/llms.txt/route.ts` (29 curated links across plans, guides,
gear, and about) plus the explicit AI-bot allowlist in robots.ts. Internal
linking density is moderate — every guide article ends with a `RelatedGuides`
component that picks 3 same-category siblings — but there's no link-density
floor and no automatic "More like this" on plans, activities, skills, or gear.
Content inventory: 25 guides, 4 plans, 13 activities, 31 skills, 4 gear sets,
4 comparison pages, 2 tools.

---

## 2. Next up — prioritized backlog

Each item: **Title** · Why it matters · Effort (S = 1–2 hrs, M = half day,
L = full day+) · Expected lift (low/med/high) · Status (queued / blocked /
partial).

### A. SEO foundations

#### A1. Add `app/not-found.tsx` and `app/error.tsx`
- **Why:** Default Next.js 404 leaks the framework, has no nav, and bounces
  every misrouted crawler. A branded 404 with links to `/guides`, `/plans`,
  and `/quiz` recaptures lost crawl + lost humans.
- **Effort:** S
- **Expected lift:** medium
- **Status:** queued

#### A2. Audit the `pageMetadata()` canonical on query-param pages
- **Why:** Today `pageMetadata({ path: '/plans/first-night-camp' })` correctly
  canonicalizes `/plans/first-night-camp?adults=2&kids=2` back to the clean
  URL. But this is implicit. Add a comment in `lib/seo.ts` and a unit test
  that asserts canonical does not include the query string, so a future change
  doesn't quietly add `searchParams` to the canonical and split crawl budget
  across infinite variants. Same pattern applies to `/trip-pack/[planSlug]`.
- **Effort:** S
- **Expected lift:** low (preventative)
- **Status:** queued

#### A3. Submit sitemap to Google Search Console + Bing Webmaster Tools
- **Why:** The sitemap is comprehensive but has zero discovery value if no
  search engine knows where to find it. GSC submission also unlocks Search
  Console performance data, which is the foundation for everything in
  section 4 below.
- **Effort:** S (mostly waiting on verification)
- **Expected lift:** high (prerequisite for measuring anything)
- **Status:** queued

#### A4. Image alt audit across guide hero images
- **Why:** Every guide page has a hero image with manually-written alt text,
  but the pattern isn't enforced. Two `alt=""` exist in components today;
  confirm those are decorative (icons inside Links, etc.) and add an ESLint
  rule (`jsx-a11y/alt-text`) so future regressions break the build.
- **Effort:** S
- **Expected lift:** low (a11y + image-search side benefit)
- **Status:** queued

#### A5. Per-guide `dateModified` instead of a single FRESH date
- **Why:** Every guide currently shows `datePublished: '2026-01-01'` and
  `dateModified: '2026-04-24'` (the `articleGraph()` defaults). Real
  per-guide modification dates from git let Article schema reflect actual
  freshness, which Google uses for QDF (query-deserves-freshness) ranking
  on "first-time" / "best for 2026" type queries.
- **Effort:** M (write a build-time script that reads `git log -1
  --format=%cI app/guides/<slug>/page.tsx` and exports a slug→date map)
- **Expected lift:** medium
- **Status:** queued

#### A6. Per-page sitemap `lastmod` from git, not the FRESH/RECENT/STABLE
constants
- **Why:** Same root issue as A5. Three buckets is an improvement over a
  single date but still won't reflect that "Camping with Kids First Time"
  was edited last week and "Privacy" wasn't. The script from A5 can feed
  the sitemap too.
- **Effort:** S (after A5 ships)
- **Expected lift:** medium
- **Status:** blocked (do A5 first)

#### A7. Title-tag length audit
- **Why:** A few guide titles plus the `| Trailstead Guide` template suffix
  (~17 chars + space + pipe) push past Google's ~60-char display window.
  Run a one-time script that prints `(title.length + 19)` for every page
  and flag overflows; fix the worst offenders manually.
- **Effort:** S
- **Expected lift:** low (better SERP CTR on the truncated ones)
- **Status:** queued

### B. Structured data

#### B1. Add Product + Offer schema to trip-pack pages
- **Why:** `/trip-pack/[planSlug]` is the actual paid product on the site
  (printable PDF) but emits no Product schema today. Adding
  `Product` + `Offer` (price, currency, availability, seller) makes it
  eligible for rich product results in Google and gives AI assistants a
  structured answer to "how much does Trailstead's first-weekend trip pack
  cost." `lib/seo.ts` already has `productGraph()` — wire it up.
- **Effort:** S
- **Expected lift:** high (paid SKUs deserve product schema)
- **Status:** queued

#### B2. Add Person schema for an author byline
- **Why:** All Article schemas use `author: Organization` today. E-E-A-T
  (Experience, Expertise, Authoritativeness, Trust) heavily rewards a
  named human author with a bio, especially on a "first-time camping"
  topic where personal experience is the credibility signal Google looks
  for. Create one Person node in `lib/seo.ts`, point Article.author at it,
  and add a one-line byline + photo to each guide.
- **Effort:** M (Person node + global byline component + bio block on
  about page)
- **Expected lift:** high
- **Status:** queued (depends on F1 about-page expansion)

#### B3. Validate every emitted schema against Google's Rich Results test
- **Why:** Schema is emitted but never validated end-to-end. Spend a
  morning running each page-type through
  `https://search.google.com/test/rich-results` and Schema.org's validator.
  Easy to catch: missing required fields on Product, malformed
  HowTo.totalTime, BreadcrumbList items missing `item` URLs.
- **Effort:** S
- **Expected lift:** medium (catches silent failures that block rich results)
- **Status:** queued

#### B4. Upgrade plan pages from HowTo to HowTo + Product
- **Why:** Plan pages currently emit HowTo + Article. They're also the
  thing the Trip Pack is *for* — adding a `Product` node with
  `hasOffer` pointing at `/trip-pack/<slug>` ties the free planner page
  to the paid SKU and reinforces the relationship for both Google and
  LLMs.
- **Effort:** S
- **Expected lift:** medium
- **Status:** queued (do after B1)

#### B5. Add `ItemList` schema to comparison pages
- **Why:** `/compare/coleman-sundome-3p-vs-4p-vs-6p` and the other 3
  comparisons are perfect rich-result candidates — Google increasingly
  shows comparison-table cards for "X vs Y" queries. Wrap the products
  being compared in an `ItemList` of `Product` nodes.
- **Effort:** S
- **Expected lift:** medium
- **Status:** queued

#### B6. Add `Review` / `AggregateRating` once testimonials exist
- **Why:** Blocked on having any testimonials at all. Once the trip packs
  have ≥5 verified buyers willing to give a quote + a star rating, wire
  AggregateRating into `productGraph()` for the trip-pack pages.
- **Effort:** S (once testimonials exist)
- **Expected lift:** high (review snippets dramatically lift CTR)
- **Status:** blocked (no testimonials yet)

### C. AEO / GEO

#### C1. Add `/<page>.md` Markdown export routes
- **Why:** AI assistants (Claude, Perplexity, ChatGPT) increasingly prefer
  to fetch `<url>.md` if it exists rather than parsing rendered HTML.
  Adding a route handler at `app/[...slug]/route.ts` (or per-section
  `route.ts` files) that emits clean Markdown from the same source data
  used to render the React page makes every guide directly citable.
  llmstxt.org's "/llms-full.txt" pattern is the same idea.
- **Effort:** L (need a content-source split: today guide bodies are JSX,
  not data — refactor to MDX or extract to a data file first)
- **Expected lift:** high
- **Status:** queued

#### C2. Expand `llms.txt` to include all 25 guides + 4 plans + 4 trip packs
- **Why:** The current llms.txt has 29 hand-picked links. AI crawlers use
  it as the table of contents. The full guide catalog (25 articles) and
  the trip-pack pages (paid products) belong in there too — plus a short
  one-line summary each, in the existing format. Right now ~6 of the 25
  guides are linked.
- **Effort:** S (mechanical: pull from `GUIDES`, `PLAN_TEMPLATES`, format)
- **Expected lift:** medium
- **Status:** queued

#### C3. Add an `llms-full.txt` route with the full guide bodies
- **Why:** llms.txt is the index; llms-full.txt is the corpus. Some
  crawlers fetch it. Cheap to ship if C1 lands first (it's the same
  Markdown emitter, concatenated).
- **Effort:** S (after C1)
- **Expected lift:** medium
- **Status:** blocked (do C1 first)

#### C4. Add a "Quick answer" / TL;DR block to every guide
- **Why:** AI Overviews and Perplexity heavily quote the first 60–120
  words below an H1 when there's a clear, citable summary. Most guides
  open with a paragraph of voice/context instead. Add a 2–3 sentence
  "Quick answer" block above the lede that directly answers the
  page's primary query — this is the single biggest GEO lever.
- **Effort:** M (25 guides × ~5 min each)
- **Expected lift:** high
- **Status:** queued

#### C5. Original-research / "we analyzed N posts" content
- **Why:** AI assistants and traditional SEO both reward primary-source
  content. The affiliate Reddit-research CLI (commit `795853c`) already
  pulls real beginner reports — turn that data into 1–2 published
  research posts ("We analyzed 800 first-time camping posts on Reddit.
  Here's what actually goes wrong"). These become both a backlink
  magnet and a citable AI source.
- **Effort:** L (one analysis + one published post; second post 1 week later)
- **Expected lift:** high
- **Status:** queued

#### C6. Primary-source linking density
- **Why:** Guides currently reference ReserveAmerica, Recreation.gov, and
  REI by name without linking to them. Add outbound links on first
  mention of any institution, brand, or data source. Outbound primary-
  source links are an E-E-A-T signal Google explicitly calls out and AI
  assistants use to verify claims.
- **Effort:** S (per-guide pass; can be batched)
- **Expected lift:** low–medium
- **Status:** queued

### D. Internal linking + content velocity

#### D1. Link-density floor: every page links to ≥3 related pages
- **Why:** Guides hit this via `RelatedGuides`, but plans, activities,
  skills, and trip-pack pages do not. Add an analogous "Related"
  component for each page type (related plans on plan pages, related
  skills on skill pages, related activities on activity pages). Same
  visual treatment as `RelatedGuides`.
- **Effort:** M (one component per page type; data already exists)
- **Expected lift:** medium
- **Status:** queued

#### D2. Cross-link between page types, not just within
- **Why:** Today's `RelatedGuides` only recommends other guides. A guide
  on "Camping with Kids" should link to the `/activities/scavenger-hunt`
  page and the `/plans/first-weekend-camp` plan. Add a 1-line "If you
  want a plan: …" CTA at the bottom of every guide that picks the most
  relevant plan based on guide tags.
- **Effort:** M
- **Expected lift:** medium
- **Status:** queued

#### D3. Content cadence: 1 new guide per week
- **Why:** Content velocity is the single most reliable SEO lever for a
  new site. 25 guides at launch is a strong base; 75 guides in 12 months
  is a moat. Pick the topic queue from Search Console queries (after A3
  unlocks data) plus the affiliate-Reddit research (C5).
- **Effort:** L (recurring; ~half day per guide for 1500–2500 words)
- **Expected lift:** high (compounds)
- **Status:** queued

#### D4. Comparison pages — add "Backyard Test vs First Night Camp"
- **Why:** "X vs Y" pages rank well because the search intent is
  unambiguous and competition is thinner. Today's 4 comparison pages
  are gear-only. Add 2–3 plan-comparison pages
  (Backyard Test vs First Night Camp, First Weekend vs Easy Basecamp)
  that map the decision and link to both plans.
- **Effort:** M (per comparison)
- **Expected lift:** medium
- **Status:** queued

#### D5. "What to read next" auto-recommendation on trip-pack purchase success
- **Why:** `/trip-pack/[planSlug]/success/page.tsx` is the highest-intent
  moment on the site. Add 3 contextual links: a related guide, a related
  skill, and "your next plan" (e.g. after Backyard Test → First Night
  Camp). Pure conversion + retention play.
- **Effort:** S
- **Expected lift:** low (small audience, high engagement)
- **Status:** queued

### E. Performance + UX

#### E1. Lazy-load below-the-fold guide hero images
- **Why:** Guide hero images use Unsplash URLs at `w=1400` and load
  eagerly. Verify all hero images use `next/image` with `priority` only
  on the LCP image of the visible viewport, and `loading="lazy"` for
  any image that's below the fold. Speed Insights data (after data
  lands) will pinpoint specific offenders.
- **Effort:** S
- **Expected lift:** medium (LCP improvement)
- **Status:** partial (8 components import next/image; 2 raw `<img>`
  tags remain)
- **Status:** queued

#### E2. Preload the two custom Google fonts
- **Why:** Figtree and Source Serif 4 are loaded with `display: swap`
  via `next/font/google` (good — that uses the built-in optimization).
  Audit the actual `<link rel="preload">` output to confirm only the
  weights actually used in above-the-fold copy are preloaded. Excess
  preloads slow LCP rather than help it.
- **Effort:** S
- **Expected lift:** low
- **Status:** queued

#### E3. Replace remaining raw `<img>` tags with `next/image`
- **Why:** 2 raw `<img>` tags in components/ skip Next.js image
  optimization (no AVIF/WebP, no responsive `srcset`, no width/height
  → CLS risk). Find them, convert them.
- **Effort:** S
- **Expected lift:** low
- **Status:** queued

#### E4. Run a real Lighthouse pass on top 5 pages
- **Why:** Speed Insights gives field data (after E5's data lands).
  Lighthouse gives lab data with actionable diagnostics today. Run on
  `/`, `/quiz`, `/plans/first-weekend-camp`, `/guides/camping-for-beginners`,
  and `/trip-pack/first-weekend-camp`. Triage anything red.
- **Effort:** S
- **Expected lift:** medium
- **Status:** queued

#### E5. Mobile-specific audit (Speed Insights → device-bucketed CWV)
- **Why:** First-time-camping queries are heavily mobile. Once Speed
  Insights has 1–2 weeks of traffic data, slice CWV by device class and
  fix the worst mobile metric. Often it's CLS from images without
  explicit dimensions, or LCP from a too-large hero.
- **Effort:** depends on findings
- **Expected lift:** depends on findings
- **Status:** blocked (waiting on data)

### F. Trust + conversion

#### F1. Expand the About page with founder bio + photo
- **Why:** The current `/about` page is intentionally minimal ("trust-
  layer principle"), but Google's E-E-A-T criteria — and AI assistants'
  citation patterns — strongly prefer a named human with verifiable
  experience. Add a 1-paragraph founder bio with a photo, the credibility
  hook ("camped with X kids over Y years"), and an outbound social link
  (LinkedIn or X) that establishes the Person identity.
- **Effort:** M (writing + photo)
- **Expected lift:** high (unblocks B2 and improves AI citation odds)
- **Status:** queued

#### F2. Author byline on every guide
- **Why:** Pairs with B2 (Person schema). A 1-line byline + small photo
  at the top of each guide ("By [Name] · Last updated 2026-03-15") is
  the visible counterpart to the Person schema and is what humans
  actually see in the article and in SERP.
- **Effort:** S (after F1 + B2)
- **Expected lift:** medium
- **Status:** blocked (do F1 + B2 first)

#### F3. Trip Pack purchase social proof block
- **Why:** Trip-pack pages have a paywall (`TripPackPaywall`) but no
  social proof. Once 5+ buyers exist, add a "1,234 families have
  downloaded a Trip Pack" counter (rough, rounded down) plus 1–2
  short testimonial quotes. Standard conversion play. Also unblocks B6
  (AggregateRating).
- **Effort:** S (once buyers exist)
- **Expected lift:** medium
- **Status:** blocked (no buyers yet)

#### F4. Add `Organization.sameAs` to point at social profiles
- **Why:** `lib/seo.ts:82` has `sameAs: [] as string[]` — empty.
  Once the brand has any social presence (X, Instagram, YouTube,
  Reddit), populate this. It's a verified-entity signal Google uses
  for the Knowledge Panel.
- **Effort:** S (once social accounts exist)
- **Expected lift:** low–medium
- **Status:** blocked (no social presence yet)

---

## 3. Out of scope — track but don't do

- **AMP** — dead format; Google deprecated AMP-specific ranking benefits
  in 2021. Don't bother.
- **Custom analytics dashboard** — Vercel Analytics + Speed Insights +
  Search Console is enough for a single-founder operation. Building
  Looker Studio dashboards on a 25-page site is procrastination.
- **Server-side A/B testing infrastructure** — premature. Sample size
  on a new site won't reach significance for months. Revisit at 5k+
  weekly visitors.
- **`vercel.ts` migration** — current `vercel.json` is 7 lines (one
  function-memory override for the PDF generator). Migrating to
  `vercel.ts` adds dependencies and changes nothing observable.
- **Hreflang / international SEO** — single market (US English). Not
  applicable.
- **Schema for `LocalBusiness`** — Trailstead Guide has no physical
  location and doesn't serve a geographic area as a business. The site
  is a content/product brand. Don't add LocalBusiness; it would be
  inaccurate and could trigger a manual action.
- **Custom 404-tracking pipeline** — Vercel Analytics already shows 404
  paths. A1 (branded 404 page) is the right scope; don't overbuild.
- **Bing-specific schema or Yandex tooling** — vanishingly small US
  family-camping audience on either. Skip.

---

## 4. Things to revisit after analytics data lands

The following decisions are blocked on data that the just-shipped
instrumentation (Vercel Analytics events for the quiz funnel, Speed Insights
for CWV) needs ~2 weeks to gather, plus Search Console after A3.

- **Which quiz step has the steepest drop-off** — instrumented in commit
  `c85232d`. After 2 weeks of traffic, identify the single highest-
  dropoff step and rewrite its copy or change its UI. Repeat quarterly.
- **Lowest-CTR guide on Search Console** — blocked on A3 (GSC submission).
  After 4 weeks of GSC data, identify the guide with the most impressions
  but lowest CTR and rewrite its title + meta description. CTR test, not
  a content test — the content already ranks.
- **Worst CWV metric on mobile** — blocked on E5. Speed Insights bucketed
  by device class. The fix is metric-specific (LCP → image; CLS → reserve
  image dimensions; INP → shrink JS bundle).
- **Which trip pack converts best** — once trip-pack purchases start, the
  one with the best preview→checkout rate gets all UX changes propagated
  to the others. The one with the worst rate is the one to interview
  bouncers about.
- **Highest-traffic external referrers** — Vercel Analytics shows
  referrers. Once 1–2 reliable sources emerge (e.g. a Reddit thread, a
  newsletter mention), invest disproportionately in similar placements.
- **Which guide gets cited by AI assistants** — manually search ChatGPT,
  Claude, and Perplexity for the top 10 first-time-camping queries every
  month. Track which Trailstead pages get pulled in and which don't, and
  use that gap to prioritize C1/C4 work.
