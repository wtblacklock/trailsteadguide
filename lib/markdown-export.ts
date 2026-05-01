/**
 * Markdown rendering for the AI-citation export routes.
 *
 * Every guide / plan / skill / activity / hub is exposed at a `.md` URL so
 * AI assistants (ChatGPT, Perplexity, Claude) can fetch a clean text
 * version of the same content. The `.md` URLs are wired up in
 * `next.config.ts` (rewrites) and dispatched by
 * `app/api/md/[...path]/route.ts`.
 *
 * Rendering rules:
 *  - Skills, activities, plans, hubs render their full structured content
 *    (data already lives in the corresponding `lib/<type>/data.ts`).
 *  - Guides ship as a "title + Quick Answer + canonical URL + author"
 *    stub. The article body is JSX in each `app/guides/<slug>/page.tsx`
 *    and parsing it is brittle; the Quick Answer alone is enough for AI
 *    citation since the assistant will follow the canonical URL.
 *  - Quick Answers are extracted from the page source at build time
 *    (these routes are `force-static`), so no source files need to live
 *    in the deployed function bundle.
 */

import { readFileSync } from 'node:fs'
import path from 'node:path'

import { ACTIVITIES } from './activities/data'
import { GUIDES, GUIDE_CATEGORIES } from './guides'
import { PLAN_CONTENT } from './plan-content'
import { PLAN_TEMPLATES } from './plan-templates'
import { AUTHOR_BIO, AUTHOR_NAME, SITE_NAME, SITE_URL } from './seo'
import { SKILLS } from './skills/data'
import { SKILL_CATEGORIES, getCategoryById } from './skills/categories'
import type { PlanSlug } from '@/types'

const PLAN_ORDER: PlanSlug[] = [
  'backyard-test',
  'first-night-camp',
  'first-weekend-camp',
  'easy-family-basecamp',
]

// ── helpers ────────────────────────────────────────────────────────────────

const TODAY_ISO = new Date().toISOString().slice(0, 10)

function metaBlock(canonicalPath: string, updated = TODAY_ISO): string {
  return `_Source: ${SITE_URL}${canonicalPath} · Author: ${AUTHOR_NAME} · Updated: ${updated}_`
}

function footer(canonicalPath: string): string {
  return [
    '---',
    `Authored by ${AUTHOR_NAME} (${AUTHOR_BIO}). Read the live page at ${SITE_URL}${canonicalPath}.`,
    `Republishing: please cite ${SITE_NAME} (${SITE_URL}) and link back to the source URL.`,
  ].join('\n')
}

function bullets(items: readonly string[] | undefined): string {
  if (!items || items.length === 0) return ''
  return items.map((item) => `- ${item}`).join('\n')
}

function numbered(items: readonly string[] | undefined): string {
  if (!items || items.length === 0) return ''
  return items.map((item, i) => `${i + 1}. ${item}`).join('\n')
}

function section(heading: string, body: string | undefined): string {
  if (!body) return ''
  return `## ${heading}\n\n${body}\n`
}

function response(body: string): Response {
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}

function notFound(): Response {
  return new Response('Not Found', { status: 404 })
}

// ── guide quick-answer extraction (build-time only) ────────────────────────

type QuickAnswer = { tldr?: string; summary?: string }

function extractQuickAnswer(slug: string): QuickAnswer {
  try {
    const file = path.join(process.cwd(), 'app', 'guides', slug, 'page.tsx')
    const src = readFileSync(file, 'utf8')
    const tldr = src.match(/tldr="([^"]*)"/)?.[1]
    const summary = src.match(/summary="([^"]*)"/)?.[1]
    return { tldr, summary }
  } catch {
    return {}
  }
}

// ── per-content-type renderers ─────────────────────────────────────────────

function renderGuide(slug: string): Response {
  const guide = GUIDES.find((g) => g.slug === slug)
  if (!guide) return notFound()

  const canonicalPath = `/guides/${guide.slug}`
  const { tldr, summary } = extractQuickAnswer(slug)

  const parts: string[] = [
    `# ${guide.title}`,
    metaBlock(canonicalPath),
    guide.description,
  ]

  if (tldr || summary) {
    const qa: string[] = ['## Quick answer']
    if (tldr) qa.push(`**${tldr}**`)
    if (summary) qa.push(summary)
    parts.push(qa.join('\n\n'))
  }

  parts.push(
    section(
      'Read the full guide',
      `The full article — including specifics, mistakes to avoid, and pre-trip checklist — lives at ${SITE_URL}${canonicalPath}.`,
    ),
  )
  parts.push(footer(canonicalPath))

  return response(parts.filter(Boolean).join('\n\n') + '\n')
}

function renderSkill(categorySlug: string, skillSlug: string): Response {
  const skill = SKILLS.find(
    (s) => s.slug === skillSlug && getCategoryById(s.category).slug === categorySlug,
  )
  if (!skill) return notFound()

  const canonicalPath = `/skills/${categorySlug}/${skill.slug}`
  const cat = getCategoryById(skill.category)

  const parts: string[] = [
    `# ${skill.title}`,
    metaBlock(canonicalPath),
    `_Category: ${cat.label} · Difficulty: ${skill.difficulty}_`,
    skill.tagline,
  ]

  if (skill.whenToUse) parts.push(section('When to use', skill.whenToUse))
  if (skill.outcome) parts.push(section('Outcome', skill.outcome))
  if (skill.timeRequired) parts.push(section('Time required', skill.timeRequired))
  if (skill.useCases?.length) parts.push(section('Use cases', bullets(skill.useCases)))
  if (skill.materials?.length) parts.push(section('Materials', bullets(skill.materials)))
  if (skill.steps?.length) parts.push(section('Steps', numbered(skill.steps)))
  if (skill.proTips?.length) parts.push(section('Pro tips', bullets(skill.proTips)))
  if (skill.commonMistakes?.length)
    parts.push(section('Common mistakes', bullets(skill.commonMistakes)))
  if (skill.safetyNotes?.length)
    parts.push(section('Safety notes', bullets(skill.safetyNotes)))
  if (skill.variations?.length) parts.push(section('Variations', bullets(skill.variations)))
  if (skill.relatedGear?.length)
    parts.push(section('Related gear', bullets(skill.relatedGear.map((g) => g.name))))

  parts.push(footer(canonicalPath))
  return response(parts.filter(Boolean).join('\n\n') + '\n')
}

function renderActivity(slug: string): Response {
  const activity = ACTIVITIES.find((a) => a.slug === slug)
  if (!activity) return notFound()

  const canonicalPath = `/activities/${activity.slug}`

  const parts: string[] = [
    `# ${activity.title}`,
    metaBlock(canonicalPath),
    `_Ages: ${activity.ageRange} · Group: ${activity.groupSize} · Energy: ${activity.energyLevel} · Time: ${activity.timeRequired} · Setup: ${activity.setupDifficulty}_`,
    activity.tagline,
  ]

  if (activity.materials?.length)
    parts.push(section('Materials', bullets(activity.materials)))
  if (activity.instructions?.length)
    parts.push(section('How to play', numbered(activity.instructions)))
  if (activity.winCondition) parts.push(section('Win condition', activity.winCondition))
  if (activity.variations?.length)
    parts.push(section('Variations', bullets(activity.variations)))
  if (activity.safetyNotes?.length)
    parts.push(section('Safety notes', bullets(activity.safetyNotes)))

  parts.push(footer(canonicalPath))
  return response(parts.filter(Boolean).join('\n\n') + '\n')
}

function renderPlan(slug: string): Response {
  if (!(slug in PLAN_CONTENT)) return notFound()
  const planSlug = slug as PlanSlug
  const content = PLAN_CONTENT[planSlug]
  const template = PLAN_TEMPLATES[planSlug]

  const canonicalPath = `/plans/${planSlug}`
  const title = content.cover.title

  const parts: string[] = [
    `# ${title}`,
    metaBlock(canonicalPath),
    `_${content.cover.subtitle}_`,
    template.tripSummary,
    section('What this is', content.overview.whatThisIs),
    section('Why it works', content.overview.whyItWorks),
    section('Expected outcome', content.overview.expectedOutcome),
  ]

  if (content.mistakePrevention?.length) {
    const mistakes = content.mistakePrevention
      .map((m) => `### ${m.title}\n\n_Why it matters:_ ${m.why}\n\n_Fix:_ ${m.fix}`)
      .join('\n\n')
    parts.push(`## Mistakes to avoid\n\n${mistakes}\n`)
  }

  if (content.finalChecklist?.length)
    parts.push(section('Final pre-trip checklist', bullets(content.finalChecklist)))

  if (template.gear?.length) {
    const essential = template.gear.filter((g) => g.essential).map((g) => g.name)
    const nice = template.gear.filter((g) => !g.essential).map((g) => g.name)
    const lines: string[] = []
    if (essential.length) lines.push(`**Essential:**\n${bullets(essential)}`)
    if (nice.length) lines.push(`**Nice to have:**\n${bullets(nice)}`)
    parts.push(section('Gear set', lines.join('\n\n')))
  }

  if (template.safetyNotes?.length)
    parts.push(section('Safety notes', bullets(template.safetyNotes)))

  parts.push(footer(canonicalPath))
  return response(parts.filter(Boolean).join('\n\n') + '\n')
}

// ── hub renderers ──────────────────────────────────────────────────────────

function renderGuidesHub(): Response {
  const canonicalPath = '/guides'
  const byCategory = GUIDE_CATEGORIES.map((c) => {
    const guides = GUIDES.filter((g) => g.category === c.id)
    if (guides.length === 0) return ''
    const lines = guides.map(
      (g) => `- [${g.title}](${SITE_URL}/guides/${g.slug}): ${g.description}`,
    )
    return `### ${c.label}\n\n${c.blurb}\n\n${lines.join('\n')}`
  }).filter(Boolean)

  const body = [
    '# Camping Guides',
    metaBlock(canonicalPath),
    'Long-form, beginner-friendly camping guides — basics, scenarios, seasons, and locations.',
    '## Categories',
    byCategory.join('\n\n'),
    footer(canonicalPath),
  ].join('\n\n')

  return response(body + '\n')
}

function renderSkillsHub(): Response {
  const canonicalPath = '/skills'
  const sections = SKILL_CATEGORIES.map((c) => {
    const skills = SKILLS.filter((s) => s.category === c.id)
    if (skills.length === 0) return ''
    const lines = skills.map(
      (s) => `- [${s.title}](${SITE_URL}/skills/${c.slug}/${s.slug}): ${s.tagline}`,
    )
    return `### ${c.label}\n\n${c.blurb}\n\n${lines.join('\n')}`
  }).filter(Boolean)

  const body = [
    '# Camp Skills',
    metaBlock(canonicalPath),
    'Hands-on camping skills, organized into 12 categories — knots, cooking, fire, hiking, orienteering, fishing, shelter, camp setup, safety, stargazing, knife skills, and woodcarving.',
    '## Categories',
    sections.join('\n\n'),
    footer(canonicalPath),
  ].join('\n\n')

  return response(body + '\n')
}

function renderActivitiesHub(): Response {
  const canonicalPath = '/activities'
  const lines = ACTIVITIES.map(
    (a) =>
      `- [${a.title}](${SITE_URL}/activities/${a.slug}): ${a.tagline} _(${a.ageRange}, ${a.timeRequired})_`,
  )

  const body = [
    '# Camp Activities',
    metaBlock(canonicalPath),
    'Kid-friendly camp activities — icebreakers, campfire games, movement, exploration, team challenges, creative play, night games, and wind-down activities.',
    '## All activities',
    lines.join('\n'),
    footer(canonicalPath),
  ].join('\n\n')

  return response(body + '\n')
}

function renderPlansHub(): Response {
  const canonicalPath = '/plans'
  const lines = PLAN_ORDER.map((slug) => {
    const t = PLAN_TEMPLATES[slug]
    const c = PLAN_CONTENT[slug]
    return `- [${c.cover.title}](${SITE_URL}/plans/${slug}): ${t.tripSummary}`
  })

  const body = [
    '# Camping Plans',
    metaBlock(canonicalPath),
    'Four progressive camping plans — from a one-night backyard test to a multi-night family basecamp. Each plan ships with a timeline, gear set, meals, and activity schedule.',
    '## Plans',
    lines.join('\n'),
    footer(canonicalPath),
  ].join('\n\n')

  return response(body + '\n')
}

// ── public dispatcher + static-params enumerator ───────────────────────────

export function dispatchMarkdown(segments: readonly string[]): Response {
  const [type, a, b] = segments
  if (!type) return notFound()

  if (segments.length === 1) {
    if (type === 'guides') return renderGuidesHub()
    if (type === 'skills') return renderSkillsHub()
    if (type === 'activities') return renderActivitiesHub()
    if (type === 'plans') return renderPlansHub()
    return notFound()
  }

  if (type === 'guides' && a) return renderGuide(a)
  if (type === 'plans' && a) return renderPlan(a)
  if (type === 'activities' && a) return renderActivity(a)
  if (type === 'skills' && a && b) return renderSkill(a, b)

  return notFound()
}

export function allMarkdownPaths(): { path: string[] }[] {
  const paths: { path: string[] }[] = [
    { path: ['guides'] },
    { path: ['skills'] },
    { path: ['activities'] },
    { path: ['plans'] },
  ]
  for (const g of GUIDES) paths.push({ path: ['guides', g.slug] })
  for (const slug of PLAN_ORDER) paths.push({ path: ['plans', slug] })
  for (const a of ACTIVITIES) paths.push({ path: ['activities', a.slug] })
  for (const s of SKILLS) {
    const cat = getCategoryById(s.category)
    paths.push({ path: ['skills', cat.slug, s.slug] })
  }
  return paths
}
