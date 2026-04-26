/**
 * /llms.txt — machine-readable site map for LLM crawlers (ChatGPT,
 * Perplexity, Claude, etc.). Plain text, one section per topic, each
 * link followed by a one-sentence summary.
 *
 * Spec: https://llmstxt.org
 */

export const dynamic = 'force-static'

const BODY = `# Trailstead Guide

> Trailstead Guide helps first-time families plan their first camping trip with confidence. Answer five questions, get a complete personalized plan: gear list, meals, checklist, and a trip you can actually pull off.

## Start here

- [Camping for Beginners](https://www.trailsteadguide.com/guides/camping-for-beginners): The shortest, least-intimidating path from zero to a great first trip.
- [How It Works](https://www.trailsteadguide.com/how-it-works): How the 5-question planner turns your answers into a complete camping plan.
- [Take the quiz](https://www.trailsteadguide.com/quiz): Five questions. Get your personalized trip plan in under two minutes.

## Camping plans

- [Backyard Test](https://www.trailsteadguide.com/plans/backyard-test): A zero-risk first night in your yard to test the gear and the kids.
- [First Night Camp](https://www.trailsteadguide.com/plans/first-night-camp): One night at a nearby campground — the real just-try-it trip.
- [First Weekend Camp](https://www.trailsteadguide.com/plans/first-weekend-camp): Two nights, fully planned: meals, gear, schedule, pack list.
- [Easy Family Basecamp](https://www.trailsteadguide.com/plans/easy-family-basecamp): Three+ nights in one spot with the comfort upgrades.

## Guides

- [How to Plan a Camping Trip](https://www.trailsteadguide.com/guides/how-to-plan-a-camping-trip): Step-by-step: pick a site, book it, prep the gear, don't forget the can opener.
- [Camping with Kids for the First Time](https://www.trailsteadguide.com/guides/camping-with-kids-first-time): What actually keeps kids happy at camp (and what quietly ruins the trip).
- [Car Camping Beginner Guide](https://www.trailsteadguide.com/guides/car-camping-beginner-guide): Drive-up, park-next-to-your-tent camping — the only kind we recommend first.
- [First Camping Trip Checklist](https://www.trailsteadguide.com/guides/first-camping-trip-checklist): The real packing list — not 200 items, just what you'll use.
- [Weekend Camping Packing List](https://www.trailsteadguide.com/guides/weekend-camping-packing-list): Two-night family pack list, by category, by person.
- [First-Time Camping Mistakes](https://www.trailsteadguide.com/guides/first-time-camping-mistakes): The avoidable mistakes that turn a first trip into "never again."

## Gear & tools

- [Camping Gear Guide](https://www.trailsteadguide.com/gear-guide): Three curated bundles and a short per-category catalog — no 100-option lists.
- [Coleman Sundome 3P vs 4P vs 6P](https://www.trailsteadguide.com/compare/coleman-sundome-3p-vs-4p-vs-6p): Side-by-side comparison of the three Sundome tent sizes — floor size, standing height, capacity, and price — to pick the right one.
- [Camp Chef Everest vs Coleman 1-Burner Stove](https://www.trailsteadguide.com/compare/camp-chef-everest-vs-coleman-classic-1-burner): 2-burner vs 1-burner camp stove comparison — BTU output, wind resistance, ignition, and price — to match the stove to your cooking style.
- [Coleman Rolling Cooler vs Steel-Belted](https://www.trailsteadguide.com/compare/rolling-cooler-vs-steel-belted-cooler): Rolling vs classic Coleman cooler comparison — ice retention, capacity, portability, and price — to pick the right cooler for your trip length.
- [Air Mattress vs Cot Combo vs Sleeping Pad](https://www.trailsteadguide.com/compare/sleeping-bag-vs-cot-airbed-combo): Three sleep systems compared for car campers — comfort, setup, packed size, and price — to pick what to actually sleep on.
- [Camping Checklist Generator](https://www.trailsteadguide.com/tools/camping-checklist-generator): Generate a packing checklist tuned to family size, kid ages, and trip length.
- [Camping Trip Planner](https://www.trailsteadguide.com/tools/camping-trip-planner): Turn a vague weekend idea into a real plan with meals and a schedule.

## About

- [About Trailstead Guide](https://www.trailsteadguide.com/about): Who we are, why we built this, how we choose what to recommend.
- [FAQ](https://www.trailsteadguide.com/faq): Answers to the most common first-time camping questions.
- [Affiliate Disclosure](https://www.trailsteadguide.com/affiliate-disclosure): How we make money and how that affects (and doesn't affect) our recommendations.
`

export function GET() {
  return new Response(BODY, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
