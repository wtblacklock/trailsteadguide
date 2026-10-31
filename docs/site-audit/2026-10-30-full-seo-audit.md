# Full SEO audit - 2026-10-30

Crawled all 282 sitemap URLs on https://www.trailsteadguide.com (live, 2026-10-30) and checked
the code on `main` at `6a2d63b`. Covered: technical, on-page, schema, content and
cannibalization, internal linking, performance signals, and AI search readiness.

**Estimated health: 78/100 before this branch, about 85 after.** The site is well built:
every URL returns 200 with a correct self-canonical, there are no noindex mistakes, no
duplicate titles or descriptions, no images without alt text, and JSON-LD on every page type.
Security headers are strong. llms.txt lists 102 guides. AI crawlers are allowed. A branded 404
and error page exist.

## Fixed in this branch

| Priority | Issue | Fix |
|---|---|---|
| High | `robots.txt` disallowed `/_next/` for all crawlers. That path serves the JS, CSS and optimized images Googlebot needs to render pages, so Google saw unstyled pages and could not run the client grids. | `app/robots.ts`: only `/api/` is disallowed. |
| High | `/activities` and `/skills` shipped **zero** links to their 38 activities and 68 skills in server HTML. The grids read `useSearchParams` inside Suspense, so the static HTML held only a 6-card skeleton. Combined with the robots block, those 106 pages were reachable only through the sitemap. | Split each grid into a client filter and a presentational view (`ActivitiesGridView`, `SkillsHubGridView`). The Suspense fallback now renders the full, unfiltered grid, so the HTML links every item. |
| High | Activity and skill detail pages linked to no sibling pages (only 34 of 68 skills had curated `relatedSkills`; activities had none). 8 pages had zero inbound internal links. | Activity pages get a "More activities to try" block (`getRelatedActivities`). Skill pages always render "Continue learning", curated refs first, then same-category neighbours (`getRelatedSkillRefs`). Both use a wrap-around pick so every page is linked from its neighbours. Guarded by `lib/__tests__/internal-linking.test.ts`. |
| Medium | Sitemap `lastmod` ignored the git-derived `GUIDE_DATES` map and used a hand-kept list, so 264 of 282 URLs said 2026-04-27, including guides published in September and October (Black Friday, published 2026-10-30, claimed April). | `app/sitemap.ts` reads `GUIDE_DATES` for every guide; the hand-kept list is gone. |
| Medium | 80 guides showed "Last updated April 2026" (the component default) while their Article schema carried the real git date. 18 more hardcoded a visible date that disagreed with schema. | `GuidePage` falls back to `GUIDE_DATES` before the default; the 18 visible-only date props are removed. Pages that pass the same explicit date to both schema and `GuidePage` keep it. |
| Medium | **Gift-guide cannibalization.** `/guides/gifts-for-campers` was titled "2026 Family Gift Guide" and repeated stocking-stuffer and kids FAQs, competing head-on with `/guides/best-camping-gifts-for-families` (the hub) and `/guides/camping-stocking-stuffers`. | Repositioned `gifts-for-campers` to the experienced-camper intent ("Gifts for Campers Who Have Everything"): new title, H1, meta description, catalogue entry, and section headings. Its duplicate stocking-stuffer and kids FAQs (visible and JSON-LD) are replaced with "camper who has everything" and "tent as a gift" questions. The kids section now points to `/guides/camping-gifts-for-kids`. Product picks are unchanged. |

## Cannibalization verdict on the holiday cluster

Six gift guides plus Black Friday now have distinct intents:

| URL | Intent |
|---|---|
| `best-camping-gifts-for-families` | Hub: whole-family gifts, routes to the rest |
| `gifts-for-campers` | Experienced camper who already owns the gear |
| `camping-stocking-stuffers` | Under $25, stocking format |
| `camping-gifts-under-50` | Budget tier |
| `camping-gifts-for-kids` | Kids by age |
| `gifts-for-new-campers` | Beginners |
| `black-friday-camping-gear` | Deal timing, not gifting |

Watch in Search Console after the holidays: if `gifts-for-campers` and the hub still swap
positions for "camping gifts", consider folding the experienced-camper picks into the hub
and redirecting.

## Left for you (not fixable in code, or editorial)

1. **Search Console and Bing Webmaster:** confirm the sitemap is submitted and request
   re-crawl of `/activities` and `/skills` after this deploys. Use URL Inspection on one skill
   page to confirm Google now renders it with CSS.
2. **Non-guide lastmod is still bucketed** (activities, skills, compare, plans use the
   2026-04-27 constant). Extending `scripts/generate-guide-dates.mjs` to those data files is
   the next step if GSC shows slow recrawl.
3. **Thin pages:** the four `/gear/sets/*` pages (about 95 words each), `/tools/*` and
   `/checklist` are mostly UI. Add 150-300 words of "who this is for" copy, or leave as is if
   they are not meant to rank.
4. **Compare pages are weakly linked** (1-2 inbound links each). Linking each from the guide
   that covers the same gear would help them rank for "X vs Y" queries.
5. **`Organization.sameAs` is empty** (roadmap F4). Add Pinterest and any other profiles.
6. **Field Core Web Vitals:** check Speed Insights by device now that traffic exists
   (roadmap E5). Lab signals look fine: static prerender, HTML under 175 KB on the home page.

Roadmap items A1 (404 page), A5 (guide dates), B2 (Person author), C2 (llms.txt coverage)
and C4 (Quick answer blocks) are already shipped; the April roadmap statuses are stale.
