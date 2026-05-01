import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PLAN_TEMPLATES, getPlanTemplate } from '@/lib/plan-templates'
import { getProductsForGuide, PLAN_TO_GUIDE } from '@/lib/affiliate/guide-gear'
import PlanHero from '@/components/plan/PlanHero'
import PlanJumpNav from '@/components/plan/PlanJumpNav'
import PersonalizationChip from '@/components/plan/PersonalizationChip'
import GearSystemsBlock from '@/components/plan/GearSystemsBlock'
import Timeline from '@/components/plan/Timeline'
import GearList from '@/components/plan/GearList'
import KidActivityPlan from '@/components/plan/KidActivityPlan'
import ActivityScheduleBlock from '@/components/plan/ActivityScheduleBlock'
import SkillsSummaryBlock from '@/components/plan/SkillsSummaryBlock'
import SafetyNotes from '@/components/plan/SafetyNotes'
import AffiliateBlock from '@/components/plan/AffiliateBlock'
import TripPackCta from '@/components/plan/TripPackCta'
import FounderTrustBlock from '@/components/plan/FounderTrustBlock'
import PlanComparisonLink from '@/components/plan/PlanComparisonLink'
import FloatingEmailBar from '@/components/plan/FloatingEmailBar'
import MealPlanAndShopping from '@/components/plan/MealPlanAndShopping'
import FaqSection from '@/components/site/FaqSection'
import { parseQuizOutput, type PlanSearchParams } from '@/lib/personalization/url-params'
import { buildModifiers } from '@/lib/personalization/modifiers'
import { applyModifiers } from '@/lib/personalization/apply-modifiers'
import { getPlanModifierRules } from '@/lib/personalization/plan-modifiers'
import { buildGearSystems, buildChipSummary } from '@/lib/personalization/gear-systems'
import { resolveSystemProducts } from '@/lib/personalization/product-map'
import { generateIntro } from '@/lib/personalization/intro'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata, articleGraph, howToGraph, planProductGraph, SITE_URL } from '@/lib/seo'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { PRICE_DISPLAY } from '@/lib/stripe'
import type { PlanSlug } from '@/types'

type Params = { planId: string }

type PlanPageMeta = {
  title: string
  description: string
  totalTime: string
}

const PLAN_PAGE_META: Record<PlanSlug, PlanPageMeta> = {
  'backyard-test': {
    title: 'Backyard Test Night Plan',
    description:
      'A one-night backyard simulation that tests your sleep system, gear setup, and kid readiness — no campsite booking required.',
    totalTime: 'P1D',
  },
  'first-night-camp': {
    title: 'First Night Camp Plan',
    description:
      'A personalized first-campsite plan for first-time family campers. Timeline, gear, meals, activities, and safety — tuned for one short, easy night.',
    totalTime: 'P1D',
  },
  'first-weekend-camp': {
    title: 'First Weekend Camp Plan',
    description:
      'A two-night family camping plan: full timeline, gear list, meals, activities, and safety guidance for your first real weekend out.',
    totalTime: 'P2D',
  },
  'easy-family-basecamp': {
    title: 'Easy Family Basecamp Plan',
    description:
      'A comfort-first family camping plan designed for a relaxed, predictable three-night trip. Full timeline, gear, meals, kid activities, and safety notes.',
    totalTime: 'P3D',
  },
}

const PLAN_FAQ_ITEMS = [
  {
    question: 'What’s included in the Trip Pack?',
    answer:
      'A printable PDF of the full plan: hour-by-hour timeline, packing checklist, gear setup notes, meal plan with a shopping list scaled to your party size, and the safety notes. Designed to print or live on your phone offline at the campsite.',
  },
  {
    question: 'Can I share it with my spouse or co-parent?',
    answer:
      'Yes — family use is fine and expected. Forward the page link or the Trip Pack PDF to whoever is co-planning the trip. One purchase covers your household.',
  },
  {
    question: 'Is the gear list affiliate-linked?',
    answer:
      'Yes, transparently. Some gear links are Amazon Associate links that pay Trailstead a small commission if you buy through them. Your price is identical either way, and we only recommend gear we’ve used with our own families.',
  },
  {
    question: 'Do I need camping experience to use this plan?',
    answer:
      'No. The plan is built specifically for first-time campers. Every step assumes you’ve never set up a tent, cooked over a stove at a campsite, or slept outside with kids before. If you’ve done five-plus trips, you’ll find it too basic.',
  },
  {
    question: 'What if my trip details change?',
    answer:
      'Re-take the five-question quiz with the new details — different ages, different number of nights, different comfort level — and the planner regenerates a fresh plan. The quiz is free and unlimited.',
  },
  {
    question: 'Why this plan instead of the others?',
    answer:
      'The four plans map to four pacing archetypes: a single-night backyard test, one easy first night out, a real first weekend, and a relaxed three-night basecamp. The comparison page lays them side-by-side so you can see which one fits your family right now.',
  },
  {
    question: 'Is Trailstead Guide worth it?',
    answer:
      'The plan you’re reading is free. The optional Trip Pack PDF is a small upgrade — about the cost of a couple of Gatorades — for families who want a printable, offline-friendly version they don’t have to rebuild the night before. Skip the upgrade and use the free plan as-is.',
  },
]

export function generateStaticParams(): Params[] {
  return Object.keys(PLAN_TEMPLATES).map((planId) => ({ planId }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { planId } = await params
  const meta = PLAN_PAGE_META[planId as PlanSlug]
  if (!meta) return {}
  return pageMetadata({
    title: meta.title,
    description: meta.description,
    path: `/plans/${planId}`,
    type: 'article',
  })
}

export default async function PlanPage({
  params,
  searchParams,
}: {
  params: Promise<Params>
  searchParams: Promise<PlanSearchParams>
}) {
  const { planId } = await params
  const meta = PLAN_PAGE_META[planId as PlanSlug]
  const plan = getPlanTemplate(planId)
  if (!meta || !plan) notFound()

  const slug = planId as PlanSlug
  const sp = await searchParams

  const out = parseQuizOutput(slug, sp)
  // Each plan slug pulls its affiliate gear from a representative guide.
  // The KID_GEAR slot is filtered out inside <AffiliateBlock> when the
  // party doesn't include a toddler/infant.
  const products = getProductsForGuide(PLAN_TO_GUIDE[slug])
  const modifiers = buildModifiers(out)
  const merged = applyModifiers(plan, modifiers, getPlanModifierRules(slug))
  const systems = buildGearSystems(out, modifiers)
  const resolved = resolveSystemProducts(systems)
  const chipParts = buildChipSummary(out, systems)
  const heroHook = generateIntro(out, plan.tagline)

  const path = `/plans/${slug}`
  const { adults, kids } = out.partySize

  const timelineSections = [
    { heading: 'Before You Leave', items: merged.preTrip.map((i) => `${i.time}: ${i.title} — ${i.description}`) },
    { heading: 'Arrival & Setup', items: merged.arrival.map((i) => `${i.time}: ${i.title} — ${i.description}`) },
    { heading: 'Evening Routine', items: merged.evening.map((i) => `${i.time}: ${i.title} — ${i.description}`) },
    { heading: 'Morning & Pack-Out', items: merged.morning.map((i) => `${i.time}: ${i.title} — ${i.description}`) },
  ].filter((s) => s.items.length > 0)

  const gearItems = merged.gear.map((g) => g.name)
  const activityItems = merged.activities.map((a) => `${a.title} — ${a.description}`)

  const howToSteps = [...merged.preTrip, ...merged.arrival, ...merged.evening, ...merged.morning].map((s) => ({
    name: s.title,
    text: `${s.time}: ${s.description}`,
  }))

  return (
    <main>
      <JsonLd
        data={howToGraph({
          name: meta.title,
          description: meta.description,
          image: plan.heroImage,
          totalTime: meta.totalTime,
          steps: howToSteps,
        })}
      />
      <JsonLd
        data={articleGraph({
          slug: path,
          title: meta.title,
          description: meta.description,
          image: plan.heroImage,
          breadcrumbs: [
            { name: 'Home', url: `${SITE_URL}/` },
            { name: meta.title, url: `${SITE_URL}${path}` },
          ],
        })}
      />
      <JsonLd
        data={planProductGraph({
          planSlug: slug,
          name: plan.title,
          description: plan.tagline,
          image: plan.heroImage,
          priceUsd: PRICE_DISPLAY.basic / 100,
          breadcrumbs: [
            { name: 'Home', url: `${SITE_URL}/` },
            { name: meta.title, url: `${SITE_URL}${path}` },
          ],
        })}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: meta.title, url: `${SITE_URL}${path}` },
        ]}
      />
      <PlanHero title={plan.title} hook={heroHook} imageUrl={plan.heroImage} />
      <PersonalizationChip parts={chipParts} />
      <PlanJumpNav
        links={[
          { id: 'setup', label: 'Your Setup' },
          { id: 'timeline', label: 'Timeline' },
          { id: 'gear', label: 'Gear' },
          { id: 'activities', label: 'What You’ll Do' },
          { id: 'skills', label: 'Skills' },
          { id: 'meals', label: 'Meals' },
          { id: 'safety', label: 'Safety' },
          ...(products.length > 0 ? [{ id: 'shop', label: 'Shop' }] : []),
        ]}
      />
      <div id="setup" className="scroll-mt-32"><GearSystemsBlock systems={systems} resolved={resolved} /></div>
      <div id="timeline" className="scroll-mt-32"><Timeline sections={timelineSections} /></div>
      <div id="gear" className="scroll-mt-32"><GearList items={gearItems} /></div>
      <div id="activities" className="scroll-mt-32">
        <KidActivityPlan activities={activityItems} />
        <ActivityScheduleBlock schedule={merged.activitySchedule} />
      </div>
      <div id="skills" className="scroll-mt-32">
        <SkillsSummaryBlock skillRefs={merged.recommendedSkills} />
      </div>
      <div id="meals" className="scroll-mt-32"><MealPlanAndShopping meals={merged.meals} defaultAdults={adults} defaultKids={kids} /></div>
      <div id="safety" className="scroll-mt-32"><SafetyNotes notes={merged.safetyNotes} /></div>
      {products.length > 0 && (
        <div id="shop" className="scroll-mt-32"><AffiliateBlock products={products} quizOutput={out} /></div>
      )}
      <FounderTrustBlock />
      <TripPackCta
        planSlug={slug}
        adults={adults}
        kids={kids}
        group={out.groupType}
        kidsAge={out.kidsAge}
        activity={out.activityType}
        comfort={out.comfortLevel}
      />
      <PlanComparisonLink planSlug={slug} />
      <FaqSection items={PLAN_FAQ_ITEMS} />
      <FloatingEmailBar planSlug={slug} adults={adults} kids={kids} />
    </main>
  )
}
