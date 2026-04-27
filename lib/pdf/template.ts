/**
 * Trip Pack HTML template — assembled from plan + gear-set + party-size
 * inputs and handed to Puppeteer for PDF rendering.
 *
 * Pure string construction, no React. Self-contained: includes inline CSS
 * and the logo as inline SVG so the PDF is portable.
 */

import type { PartySize, PlanSlug } from '@/types'
import { PLAN_TEMPLATES } from '@/lib/plan-templates'
import { getPlanContent } from '@/lib/plan-content'
import { resolveGearSet, buildAffiliateUrl } from '@/lib/gear-sets'
import { buildChecklist, type ChecklistInput } from '@/lib/checklist-builder'
import { getActivityBySlug } from '@/lib/activities/data'
import { getSkillByRef } from '@/lib/skills/helpers'
import { parseQuizOutput } from '@/lib/personalization/url-params'
import { buildModifiers } from '@/lib/personalization/modifiers'
import { applyModifiers, type MergedPlan } from '@/lib/personalization/apply-modifiers'
import { getPlanModifierRules } from '@/lib/personalization/plan-modifiers'
import {
  buildGearSystems,
  buildChipSummary,
  COMFORT_SYSTEMS,
  COOKING_SYSTEMS,
  LIGHTING_SYSTEMS,
  SLEEP_SYSTEMS,
} from '@/lib/personalization/gear-systems'
import {
  CATEGORY_LABELS,
  resolveSystemProducts,
  type ResolvedSystem,
  type ResolvedSystems,
} from '@/lib/personalization/product-map'
import { generateIntro } from '@/lib/personalization/intro'
import type {
  ActivityType,
  ComfortLevel,
  GearSystemSelection,
  GroupType,
  KidsAgeBucket,
  QuizOutput,
} from '@/lib/personalization/types'
import { PDF_STYLES } from './styles'

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

/**
 * Logos are inlined as strings here so the PDF renderer never touches the
 * filesystem. Gradient ids use a `tp-` prefix to avoid collisions with any
 * other SVG on the page.
 */

/** Pure-HTML wordmark — no SVG, no font dependency beyond the page's font stack. */
const COVER_LOGO_HTML = `<div class="cover-logo">TRAILSTEAD GUIDE</div>`

// Per-page footer is now rendered by Puppeteer's footerTemplate so it lands
// at the bottom of every physical page, including section overflow pages.
// Section names are no longer surfaced in the footer; page numbers are.

export type TripPackInput = {
  planSlug: PlanSlug
  party: PartySize
  /** Number of nights, derived from plan or override. */
  nights: number
  /** Optional purchaser name on cover. */
  purchaserName?: string
  /** Optional personalization modifiers — when omitted, defaults apply. */
  group?: GroupType
  kidsAge?: KidsAgeBucket
  activity?: ActivityType
  comfort?: ComfortLevel
}

export function renderTripPackHtml(input: TripPackInput): string {
  const plan = PLAN_TEMPLATES[input.planSlug]
  const content = getPlanContent(input.planSlug)
  const gear = resolveGearSet(content.gearSetId)

  // Build the personalization layer. Modifier params on the input feed
  // parseQuizOutput; missing fields fall back to its safe defaults.
  const out: QuizOutput = parseQuizOutput(input.planSlug, {
    adults: String(input.party.adults),
    kids: String(input.party.kids),
    group: input.group,
    kidsAge: input.kidsAge,
    activity: input.activity,
    comfort: input.comfort,
  })
  const modifiers = buildModifiers(out)
  const merged = applyModifiers(plan, modifiers, getPlanModifierRules(input.planSlug))
  const systems = buildGearSystems(out, modifiers)
  const resolved = resolveSystemProducts(systems)
  const chipParts = buildChipSummary(out, systems)
  const personalizedSubtitle = generateIntro(out, content.cover.subtitle)
  const addedPacking = merged.gear
    .filter((g) => !plan.gear.some((basis) => basis.name === g.name))
    .map((g) => g.name)

  const checklistInput: ChecklistInput = {
    adults: input.party.adults,
    kids: input.party.kids,
    nights: Math.min(3, Math.max(1, input.nights)),
    ages: [],
  }
  const checklist = buildChecklist(checklistInput)

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(content.cover.title)} — Trailstead Trip Pack</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>${PDF_STYLES}</style>
</head>
<body>
  ${renderCover(input, content, plan.tripSummary, personalizedSubtitle, chipParts)}
  ${renderOverview(content)}
  ${renderTimeline(merged)}
  ${renderActivitiesPlan(merged)}
  ${renderSkillsUsed(merged)}
  ${renderGearSystems(systems, resolved)}
  ${renderPacking(checklist, addedPacking)}
  ${renderGear(gear)}
  ${renderMistakes(content)}
  ${renderFinalChecklist(content)}
</body>
</html>`
}

function renderCover(
  input: TripPackInput,
  content: ReturnType<typeof getPlanContent>,
  summary: string,
  personalizedSubtitle: string,
  chipParts: string[],
): string {
  const partyLabel = formatParty(input.party)
  const nightLabel = `${input.nights} ${input.nights === 1 ? 'night' : 'nights'}`
  const chipHtml =
    chipParts.length > 0
      ? `<p class="cover-chip">Built for: ${escapeHtml(chipParts.join(' · '))}</p>`
      : ''
  const generatedLabel = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  return `
  <div class="cover">
    ${COVER_LOGO_HTML}
    <div class="cover-titleblock">
      <p class="cover-eyebrow">${escapeHtml(content.cover.eyebrow)}</p>
      <h1 class="cover-title">${escapeHtml(content.cover.title)}</h1>
      <p class="cover-subtitle">${escapeHtml(personalizedSubtitle)}</p>
      ${chipHtml}
      <div class="cover-meta">
        <span>${escapeHtml(nightLabel)}</span>
        <span>${escapeHtml(partyLabel)}</span>
        <span>Beginner-ready</span>
      </div>
      <p class="cover-stamp">Generated ${escapeHtml(generatedLabel)} · pages tailored to your trip</p>
    </div>
    <div class="cover-foot">${escapeHtml(summary)}</div>
  </div>`
}

function renderOverview(content: ReturnType<typeof getPlanContent>): string {
  return `
  <div class="page">
    <p class="section-eyebrow">Overview</p>
    <h2 class="section-title">Why this plan, why now</h2>
    <p class="section-lede">A short orientation before the steps. Read it once. You won't need to read it again.</p>
    <div class="overview-grid">
      <div class="overview-card">
        <p class="overview-label">What this trip is</p>
        <p class="overview-text">${escapeHtml(content.overview.whatThisIs)}</p>
      </div>
      <div class="overview-card">
        <p class="overview-label">Why it works</p>
        <p class="overview-text">${escapeHtml(content.overview.whyItWorks)}</p>
      </div>
      <div class="overview-card">
        <p class="overview-label">Expected outcome</p>
        <p class="overview-text">${escapeHtml(content.overview.expectedOutcome)}</p>
      </div>
    </div>
  </div>`
}

function renderTimeline(plan: MergedPlan | typeof PLAN_TEMPLATES[string]): string {
  const groups: { heading: string; items: { time: string; title: string; description: string }[] }[] = [
    { heading: 'Before you leave', items: plan.preTrip },
    { heading: 'Arrival & setup', items: plan.arrival },
    { heading: 'Evening routine', items: plan.evening },
    { heading: 'Morning & pack-out', items: plan.morning },
  ].filter((g) => g.items.length > 0)

  const groupHtml = groups
    .map(
      (g) => `
    <div class="timeline-group">
      <p class="timeline-group-title">${escapeHtml(g.heading)}</p>
      ${g.items
        .map(
          (it) => `
        <div class="timeline-row">
          <div class="timeline-time">${escapeHtml(it.time)}</div>
          <div class="timeline-body">
            <p class="timeline-title">${escapeHtml(it.title)}</p>
            <p class="timeline-desc">${escapeHtml(it.description)}</p>
          </div>
        </div>`,
        )
        .join('')}
    </div>`,
    )
    .join('')

  return `
  <div class="page">
    <p class="section-eyebrow">Your timeline</p>
    <h2 class="section-title">When to do what</h2>
    <p class="section-lede">Times are suggestions; the order matters. Do these in sequence and the trip self-organizes.</p>
    ${groupHtml}
  </div>`
}

function renderPacking(
  checklist: ReturnType<typeof buildChecklist>,
  added: string[] = [],
): string {
  const cats = checklist
    .map(
      (c) => `
      <div class="packing-cat">
        <p class="packing-cat-title">${escapeHtml(c.heading)}</p>
        ${c.items
          .map(
            (it) => `
          <div class="packing-item">
            <span class="box"></span>
            <span>${escapeHtml(it.name)}${it.qty ? `<span class="qty">${escapeHtml(it.qty)}</span>` : ''}${it.note ? `<span class="note"> — ${escapeHtml(it.note)}</span>` : ''}</span>
          </div>`,
          )
          .join('')}
      </div>`,
    )
    .join('')

  const addedHtml =
    added.length > 0
      ? `
      <div class="packing-cat">
        <p class="packing-cat-title">Personalized additions</p>
        ${added
          .map(
            (name) => `
          <div class="packing-item">
            <span class="box"></span>
            <span>${escapeHtml(name)}</span>
          </div>`,
          )
          .join('')}
      </div>`
      : ''

  return `
  <div class="page">
    <p class="section-eyebrow">Packing list</p>
    <h2 class="section-title">What to bring</h2>
    <p class="section-lede">Scaled to your party size. Check each box as it goes in the car.</p>
    <div class="packing-grid">${cats}${addedHtml}</div>
  </div>`
}

function renderGearSystems(systems: GearSystemSelection, resolved: ResolvedSystems): string {
  const card = (
    title: string,
    description: string,
    structure: string[],
    system: ResolvedSystem<string>,
  ): string => {
    const structureHtml =
      structure.length > 0
        ? `<ul class="gs-structure">${structure
            .map((s) => `<li>${escapeHtml(s)}</li>`)
            .join('')}</ul>`
        : ''
    const productsHtml =
      system.categories.length > 0
        ? system.categories
            .map(
              (c) => `
              <div class="gs-cat">
                <p class="gs-cat-title">${escapeHtml(
                  CATEGORY_LABELS[c.category as keyof typeof CATEGORY_LABELS] ?? c.category,
                )}</p>
                <ul class="gs-products">
                  ${c.products
                    .map(
                      (p) => `<li>${escapeHtml(p.name)} <span class="gs-price">${escapeHtml(p.priceRange)}</span></li>`,
                    )
                    .join('')}
                </ul>
              </div>`,
            )
            .join('')
        : ''
    return `
      <div class="gs-card">
        <p class="gs-title">${escapeHtml(title)}</p>
        <p class="gs-desc">${escapeHtml(description)}</p>
        ${structureHtml}
        ${productsHtml}
      </div>`
  }

  return `
  <div class="page">
    <p class="section-eyebrow">Your gear systems</p>
    <h2 class="section-title">The four systems for this trip</h2>
    <p class="section-lede">Sleep, cook, light, comfort — picked from your answers. Use these as the spine of your shopping list.</p>
    <div class="gs-grid">
      ${card(SLEEP_SYSTEMS[systems.sleep].title, SLEEP_SYSTEMS[systems.sleep].description, SLEEP_SYSTEMS[systems.sleep].structure, resolved.sleep)}
      ${card(COOKING_SYSTEMS[systems.cooking].title, COOKING_SYSTEMS[systems.cooking].description, COOKING_SYSTEMS[systems.cooking].structure, resolved.cooking)}
      ${card(LIGHTING_SYSTEMS[systems.lighting].title, LIGHTING_SYSTEMS[systems.lighting].description, LIGHTING_SYSTEMS[systems.lighting].structure, resolved.lighting)}
      ${card(COMFORT_SYSTEMS[systems.comfort].title, COMFORT_SYSTEMS[systems.comfort].description, COMFORT_SYSTEMS[systems.comfort].structure, resolved.comfort)}
    </div>
  </div>`
}

function renderGear(gear: ReturnType<typeof resolveGearSet>): string {
  const cards = gear
    .map((g) => {
      const url = buildAffiliateUrl(g.product)
      return `
      <div class="gear-card">
        <div class="gear-card-img"><img src="${escapeHtml(g.product.imageUrl)}" alt="" /></div>
        <div class="gear-card-body">
          <span class="gear-cat">${escapeHtml(g.category)}</span>
          <p class="gear-name">${escapeHtml(g.product.name)}</p>
          <p class="gear-desc">${escapeHtml(g.pdfBlurb)}</p>
          <a class="gear-cta" href="${escapeHtml(url)}">View on Amazon</a>
          <span class="gear-price">${escapeHtml(g.product.priceRange)}</span>
        </div>
      </div>`
    })
    .join('')

  return `
  <div class="page">
    <p class="section-eyebrow">Your gear set</p>
    <h2 class="section-title">Recommended gear</h2>
    <p class="section-lede">A curated kit that matches this plan. Tap a card to view it on Amazon — links include our affiliate code, which helps fund Trailstead.</p>
    <div class="gear-grid">${cards}</div>
  </div>`
}

function renderMistakes(content: ReturnType<typeof getPlanContent>): string {
  const blocks = content.mistakePrevention
    .map(
      (m) => `
      <div class="mistake-block">
        <span class="mistake-tag">Mistake to avoid</span>
        <p class="mistake-title">${escapeHtml(m.title)}</p>
        <p class="mistake-row"><b>Why it bites:</b> ${escapeHtml(m.why)}</p>
        <p class="mistake-row"><b>The fix:</b> ${escapeHtml(m.fix)}</p>
      </div>`,
    )
    .join('')

  return `
  <div class="page">
    <p class="section-eyebrow">Mistake prevention</p>
    <h2 class="section-title">What goes wrong</h2>
    <p class="section-lede">Read these once before you leave. Each one is a real failure mode for this plan type.</p>
    ${blocks}
  </div>`
}

function renderFinalChecklist(content: ReturnType<typeof getPlanContent>): string {
  const rows = content.finalChecklist
    .map((c) => `<div class="final-row"><span class="box"></span><span>${escapeHtml(c)}</span></div>`)
    .join('')
  return `
  <div class="page">
    <p class="section-eyebrow">Ready to go</p>
    <h2 class="section-title">Final gut-check</h2>
    <p class="section-lede">If every box below is checked, you're done planning. Get in the car.</p>
    <div class="final-list">
      <p class="final-list-title">You're ready.</p>
      <p class="final-list-sub">Six items. No more decisions to make.</p>
      ${rows}
    </div>
  </div>`
}

function renderActivitiesPlan(plan: MergedPlan | typeof PLAN_TEMPLATES[string]): string {
  const day1 = plan.activitySchedule.day1
    .map(getActivityBySlug)
    .filter((a): a is NonNullable<typeof a> => a !== null)
  const day2 = (plan.activitySchedule.day2 ?? [])
    .map(getActivityBySlug)
    .filter((a): a is NonNullable<typeof a> => a !== null)

  const groupHtml = (heading: string | null, items: typeof day1) => {
    if (items.length === 0) return ''
    const cards = items
      .map(
        (a) => `
        <div class="activity-pdf-card">
          <p class="activity-pdf-title">${escapeHtml(a.title)}</p>
          <p class="activity-pdf-tagline">${escapeHtml(a.tagline)}</p>
          <div class="activity-pdf-badges">
            <span>${escapeHtml(a.timeRequired)}</span>
            <span>${escapeHtml(a.energyLevel)} energy</span>
            <span>${escapeHtml(a.groupSize)}</span>
          </div>
          <p class="activity-pdf-preview">${escapeHtml(a.instructions[0] ?? '')}</p>
        </div>`,
      )
      .join('')
    return `
      ${heading ? `<p class="activity-pdf-day">${escapeHtml(heading)}</p>` : ''}
      <div class="activity-pdf-grid">${cards}</div>`
  }

  const groups = day2.length
    ? `${groupHtml('Day 1', day1)}${groupHtml('Day 2', day2)}`
    : groupHtml(null, day1)

  return `
  <div class="page">
    <p class="section-eyebrow">Your activities plan</p>
    <h2 class="section-title">What you&rsquo;ll do</h2>
    <p class="section-lede">A short, balanced lineup. Full step-by-step instructions live on trailsteadguide.com/activities.</p>
    ${groups}
  </div>`
}

function renderSkillsUsed(plan: MergedPlan | typeof PLAN_TEMPLATES[string]): string {
  const blocks = plan.recommendedSkills
    .map((ref) => {
      const found = getSkillByRef(ref.skillSlug)
      if (!found) return ''
      const { skill, category } = found
      const stepPreview = skill.steps.slice(0, 4)
        .map((s, i) => `<li><span class="skill-pdf-num">${i + 1}.</span> ${escapeHtml(s)}</li>`)
        .join('')
      return `
        <div class="skill-pdf-card">
          <span class="skill-pdf-cat">${escapeHtml(category.label)}</span>
          <p class="skill-pdf-title">${escapeHtml(skill.title)}</p>
          <p class="skill-pdf-tagline">${escapeHtml(skill.tagline)}</p>
          <p class="skill-pdf-rationale"><b>Why for this trip:</b> ${escapeHtml(ref.rationale)}</p>
          <ol class="skill-pdf-steps">${stepPreview}</ol>
          <p class="skill-pdf-link">Full guide: trailsteadguide.com/skills/${escapeHtml(category.slug)}/${escapeHtml(skill.slug)}</p>
        </div>`
    })
    .join('')

  return `
  <div class="page">
    <p class="section-eyebrow">Skills you&rsquo;ll use</p>
    <h2 class="section-title">How to do it</h2>
    <p class="section-lede">A few core skills this trip leans on. The full guide for each lives at trailsteadguide.com/skills.</p>
    ${blocks}
  </div>`
}

function formatParty(p: PartySize): string {
  const a = `${p.adults} adult${p.adults === 1 ? '' : 's'}`
  if (p.kids === 0) return a
  const k = `${p.kids} kid${p.kids === 1 ? '' : 's'}`
  return `${a} · ${k}`
}
