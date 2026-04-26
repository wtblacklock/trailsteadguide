import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PLAN_TEMPLATES, getPlanTemplate } from '@/lib/plan-templates'
import { getProductsForTemplate } from '@/lib/affiliate-products'
import PlanHero from '@/components/plan/PlanHero'
import PlanJumpNav from '@/components/plan/PlanJumpNav'
import Timeline from '@/components/plan/Timeline'
import GearList from '@/components/plan/GearList'
import KidActivityPlan from '@/components/plan/KidActivityPlan'
import ActivityScheduleBlock from '@/components/plan/ActivityScheduleBlock'
import SkillsSummaryBlock from '@/components/plan/SkillsSummaryBlock'
import SafetyNotes from '@/components/plan/SafetyNotes'
import AffiliateBlock from '@/components/plan/AffiliateBlock'
import TripPackCta from '@/components/plan/TripPackCta'
import FloatingEmailBar from '@/components/plan/FloatingEmailBar'
import MealPlanAndShopping from '@/components/plan/MealPlanAndShopping'
import { parsePartySize } from '@/lib/party-size'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata, articleGraph, howToGraph, SITE_URL } from '@/lib/seo'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
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
  searchParams: Promise<{ adults?: string; kids?: string }>
}) {
  const { planId } = await params
  const meta = PLAN_PAGE_META[planId as PlanSlug]
  const plan = getPlanTemplate(planId)
  if (!meta || !plan) notFound()

  const slug = planId as PlanSlug
  const products = getProductsForTemplate(slug)
  const { adults, kids } = parsePartySize(await searchParams)

  const path = `/plans/${slug}`

  const timelineSections = [
    { heading: 'Before You Leave', items: plan.preTrip.map((i) => `${i.time}: ${i.title} — ${i.description}`) },
    { heading: 'Arrival & Setup', items: plan.arrival.map((i) => `${i.time}: ${i.title} — ${i.description}`) },
    { heading: 'Evening Routine', items: plan.evening.map((i) => `${i.time}: ${i.title} — ${i.description}`) },
    { heading: 'Morning & Pack-Out', items: plan.morning.map((i) => `${i.time}: ${i.title} — ${i.description}`) },
  ].filter((s) => s.items.length > 0)

  const gearItems = plan.gear.map((g) => g.name)
  const activityItems = plan.activities.map((a) => `${a.title} — ${a.description}`)

  const howToSteps = [...plan.preTrip, ...plan.arrival, ...plan.evening, ...plan.morning].map((s) => ({
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
      <Breadcrumbs
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: meta.title, url: `${SITE_URL}${path}` },
        ]}
      />
      <PlanHero title={plan.title} hook={plan.tagline} imageUrl={plan.heroImage} />
      <PlanJumpNav
        links={[
          { id: 'timeline', label: 'Timeline' },
          { id: 'gear', label: 'Gear' },
          { id: 'activities', label: 'What You’ll Do' },
          { id: 'skills', label: 'Skills' },
          { id: 'meals', label: 'Meals' },
          { id: 'safety', label: 'Safety' },
          ...(products.length > 0 ? [{ id: 'shop', label: 'Shop' }] : []),
        ]}
      />
      <div id="timeline" className="scroll-mt-32"><Timeline sections={timelineSections} /></div>
      <div id="gear" className="scroll-mt-32"><GearList items={gearItems} /></div>
      <div id="activities" className="scroll-mt-32">
        <KidActivityPlan activities={activityItems} />
        <ActivityScheduleBlock schedule={plan.activitySchedule} />
      </div>
      <div id="skills" className="scroll-mt-32">
        <SkillsSummaryBlock skillRefs={plan.recommendedSkills} />
      </div>
      <div id="meals" className="scroll-mt-32"><MealPlanAndShopping meals={plan.meals} defaultAdults={adults} defaultKids={kids} /></div>
      <div id="safety" className="scroll-mt-32"><SafetyNotes notes={plan.safetyNotes} /></div>
      {products.length > 0 && (
        <div id="shop" className="scroll-mt-32"><AffiliateBlock products={products} /></div>
      )}
      <TripPackCta planSlug={slug} adults={adults} kids={kids} />
      <FloatingEmailBar planSlug={slug} adults={adults} kids={kids} />
    </main>
  )
}
