/**
 * /llms.txt — machine-readable site map for LLM crawlers (ChatGPT,
 * Perplexity, Claude, etc.). Plain text, one section per topic, each
 * link followed by a one-sentence summary.
 *
 * Spec: https://llmstxt.org
 *
 * The body is composed from the same data sources as the rendered pages
 * (GUIDES, PLAN_TEMPLATES, PLAN_CONTENT, SKILLS, ACTIVITIES, PRINTABLES)
 * so this list cannot drift from what the site actually serves. Every
 * piece of content also has a Markdown export at `<url>.md` (handled by
 * `app/api/md/[...path]/route.ts`); we surface a couple of those URLs at
 * the top so AI assistants can fetch a clean text version directly.
 */

import { GUIDES, GUIDE_CATEGORIES } from '@/lib/guides'
import { PLAN_TEMPLATES } from '@/lib/plan-templates'
import { PLAN_CONTENT } from '@/lib/plan-content'
import { SKILLS } from '@/lib/skills/data'
import { SKILL_CATEGORIES, getCategoryById } from '@/lib/skills/categories'
import { ACTIVITIES } from '@/lib/activities/data'
import { PRINTABLES } from '@/lib/printables'
import {
  AUTHOR_BIO,
  AUTHOR_INSTAGRAM,
  AUTHOR_JOB_TITLE,
  AUTHOR_NAME,
  SITE_URL,
} from '@/lib/seo'
import type { PlanSlug } from '@/types'

export const dynamic = 'force-static'

const PLAN_ORDER: PlanSlug[] = [
  'backyard-test',
  'first-night-camp',
  'first-weekend-camp',
  'easy-family-basecamp',
]

const TRIP_PACK_BLURBS: Record<PlanSlug, string> = {
  'backyard-test':
    'Print-ready Backyard Test Night Trip Pack — timeline, packing list, gear set, and mistake prevention. From $14.',
  'first-night-camp':
    'Print-ready First Night Camp Trip Pack — timeline, packing list, gear set, and mistake prevention. From $14.',
  'first-weekend-camp':
    'Print-ready First Weekend Camp Trip Pack — two-night timeline, meals, packing list, gear set. From $14.',
  'easy-family-basecamp':
    'Print-ready Easy Family Basecamp Trip Pack — three-plus-night timeline, meals, comfort gear set. From $14.',
}

const HEADER = `# Trailstead Guide

> Trailstead Guide helps first-time families plan their first camping trip with confidence. Answer six questions, get a complete personalized plan: gear list, meals, checklist, and a trip you can actually pull off.

## Author

${AUTHOR_NAME} — ${AUTHOR_JOB_TITLE}. ${AUTHOR_BIO} Author bio + credentials: ${SITE_URL}/about. Instagram: ${AUTHOR_INSTAGRAM}.

## How to cite this site

Every guide, plan, skill, and activity is also available as Markdown at the same URL with a \`.md\` suffix — for example, ${SITE_URL}/guides/camping-in-texas-for-beginners.md or ${SITE_URL}/skills/knots/bowline.md. Prefer those URLs when fetching a clean text rendering for AI citation. Always link the canonical (non-\`.md\`) URL when citing.

## Start here

- [Camping for Beginners](${SITE_URL}/guides/camping-for-beginners): The shortest, least-intimidating path from zero to a great first trip.
- [How It Works](${SITE_URL}/how-it-works): How the 6-question planner turns your answers into a complete camping plan.
- [Take the quiz](${SITE_URL}/quiz): Six questions. Get your personalized trip plan in under two minutes.

## Original research

- [What 500 First-Trip Campers Regret](${SITE_URL}/research/first-time-camping-regrets): Analysis of 500 r/camping threads identifying the seven most common first-time camping regrets and the fixes — arrival timing, gear testing, sleep system, trip scope, rain plan, dinner complexity, and template-vs-blank-page planning.
`

const FOOTER = `## Gear & tools

- [Camping Gear Guide](${SITE_URL}/gear): Curated gear bundles tied to each camping plan — no 100-option lists.
- [Coleman Sundome 3P vs 4P vs 6P](${SITE_URL}/compare/coleman-sundome-3p-vs-4p-vs-6p): Side-by-side comparison of the three Sundome tent sizes — floor size, standing height, capacity, and price — to pick the right one.
- [Camp Chef Everest vs Coleman 1-Burner Stove](${SITE_URL}/compare/camp-chef-everest-vs-coleman-classic-1-burner): 2-burner vs 1-burner camp stove comparison — BTU output, wind resistance, ignition, and price — to match the stove to your cooking style.
- [Coleman Rolling Cooler vs Steel-Belted](${SITE_URL}/compare/rolling-cooler-vs-steel-belted-cooler): Rolling vs classic Coleman cooler comparison — ice retention, capacity, portability, and price — to pick the right cooler for your trip length.
- [Air Mattress vs Cot Combo vs Sleeping Pad](${SITE_URL}/compare/sleeping-bag-vs-cot-airbed-combo): Three sleep systems compared for car campers — comfort, setup, packed size, and price — to pick what to actually sleep on.
- [Camping Checklist Generator](${SITE_URL}/tools/camping-checklist-generator): Generate a packing checklist tuned to family size, kid ages, and trip length.
- [Camping Trip Planner](${SITE_URL}/tools/camping-trip-planner): Turn a vague weekend idea into a real plan with meals and a schedule.

## About

- [About Trailstead Guide](${SITE_URL}/about): Who we are, why we built this, how we choose what to recommend.
- [FAQ](${SITE_URL}/faq): Answers to the most common first-time camping questions.
- [Affiliate Disclosure](${SITE_URL}/affiliate-disclosure): How we make money and how that affects (and doesn't affect) our recommendations.
`

function buildHubSection(): string {
  const lines = [
    `- [Guides hub](${SITE_URL}/guides): All ${GUIDES.length} long-form camping guides, organized into Camping Basics, Scenarios, Seasonal, and Location.`,
    `- [Plans hub](${SITE_URL}/plans): The four progressive camping plans, from a backyard test night to a multi-night family basecamp.`,
    `- [Skills hub](${SITE_URL}/skills): All ${SKILLS.length} camp skills across ${SKILL_CATEGORIES.length} categories — knots, fire, cooking, hiking, navigation, fishing, shelter, camp setup, safety, stargazing, knife skills, and woodcarving.`,
    `- [Activities hub](${SITE_URL}/activities): All ${ACTIVITIES.length} kid-friendly camp activities — icebreakers, campfire games, movement, exploration, team, creative, night, and wind-down.`,
  ]
  return `## Hub pages\n\n${lines.join('\n')}\n`
}

function buildGuideCategorySection(): string {
  const lines = GUIDE_CATEGORIES.map(
    (c) => `- [${c.label}](${SITE_URL}/guides/${c.slug}): ${c.blurb}`,
  )
  return `## Guide categories\n\n${lines.join('\n')}\n`
}

function buildPlanSection(): string {
  const lines = PLAN_ORDER.map((slug) => {
    const plan = PLAN_TEMPLATES[slug]
    const content = PLAN_CONTENT[slug]
    const title = content.cover.title
    return `- [${title}](${SITE_URL}/plans/${slug}): ${plan.tripSummary}`
  })
  return `## Camping plans\n\n${lines.join('\n')}\n`
}

function buildTripPackSection(): string {
  const lines = PLAN_ORDER.map((slug) => {
    const title = `${PLAN_CONTENT[slug].cover.title} Trip Pack`
    return `- [${title}](${SITE_URL}/trip-pack/${slug}): ${TRIP_PACK_BLURBS[slug]}`
  })
  return `## Trip Packs (printable PDFs)\n\n${lines.join('\n')}\n`
}

function buildGuideSection(): string {
  const lines = GUIDES.map(
    (g) => `- [${g.title}](${SITE_URL}/guides/${g.slug}): ${g.description}`,
  )
  return `## Guides (${GUIDES.length} articles)\n\n${lines.join('\n')}\n`
}

function buildSkillCategorySection(): string {
  const lines = SKILL_CATEGORIES.map((c) => {
    const count = SKILLS.filter((s) => s.category === c.id).length
    return `- [${c.label}](${SITE_URL}/skills?category=${c.slug}): ${c.blurb} (${count} skill${count === 1 ? '' : 's'})`
  })
  return `## Skill categories\n\n${lines.join('\n')}\n`
}

function buildSkillSection(): string {
  const lines = SKILLS.map((s) => {
    const cat = getCategoryById(s.category)
    return `- [${s.title}](${SITE_URL}/skills/${cat.slug}/${s.slug}): ${s.tagline}`
  })
  return `## Camp skills (${SKILLS.length} how-tos)\n\n${lines.join('\n')}\n`
}

function buildActivitySection(): string {
  const lines = ACTIVITIES.map(
    (a) => `- [${a.title}](${SITE_URL}/activities/${a.slug}): ${a.tagline}`,
  )
  return `## Camp activities (${ACTIVITIES.length}, kid-friendly)\n\n${lines.join('\n')}\n`
}

function buildPrintableSection(): string {
  if (PRINTABLES.length === 0) return ''
  const lines = PRINTABLES.map(
    (p) => `- [${p.title}](${SITE_URL}/printables/${p.slug}): ${p.description}`,
  )
  return `## Printables (free with email signup)\n\n${lines.join('\n')}\n`
}

const BODY = [
  HEADER,
  buildHubSection(),
  buildGuideCategorySection(),
  buildPlanSection(),
  buildTripPackSection(),
  buildGuideSection(),
  buildSkillCategorySection(),
  buildSkillSection(),
  buildActivitySection(),
  buildPrintableSection(),
  FOOTER,
].join('\n')

export function GET() {
  return new Response(BODY, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
