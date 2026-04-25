import { notFound } from 'next/navigation'
import { getPlanTemplate } from '@/lib/plan-templates'
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

const SLUG = '/plan/first-night-camp'
const TITLE = 'First Night Camp Plan'
const DESCRIPTION =
  'A personalized first-campsite plan for first-time family campers. Timeline, gear, meals, activities, and safety — tuned for one short, easy night.'

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: SLUG,
  type: 'article',
})

export default async function FirstNightCampPage({
  searchParams,
}: {
  searchParams: Promise<{ adults?: string; kids?: string }>
}) {
  const plan = getPlanTemplate('first-night-camp')
  if (!plan) notFound()

  const products = getProductsForTemplate('first-night-camp')
  const { adults, kids } = parsePartySize(await searchParams)

  const timelineSections = [
    { heading: 'Before You Leave', items: plan.preTrip.map(i => `${i.time}: ${i.title} — ${i.description}`) },
    { heading: 'Arrival & Setup', items: plan.arrival.map(i => `${i.time}: ${i.title} — ${i.description}`) },
    { heading: 'Evening Routine', items: plan.evening.map(i => `${i.time}: ${i.title} — ${i.description}`) },
    { heading: 'Morning & Pack-Out', items: plan.morning.map(i => `${i.time}: ${i.title} — ${i.description}`) },
  ].filter(s => s.items.length > 0)

  const gearItems = plan.gear.map(g => g.name)
  const activityItems = plan.activities.map(a => `${a.title} — ${a.description}`)

  const howToSteps = [...plan.preTrip, ...plan.arrival, ...plan.evening, ...plan.morning].map((s) => ({
    name: s.title,
    text: `${s.time}: ${s.description}`,
  }))

  return (
    <main>
      <JsonLd
        data={howToGraph({
          name: TITLE,
          description: DESCRIPTION,
          image: plan.heroImage,
          totalTime: 'P1D',
          steps: howToSteps,
        })}
      />
      <JsonLd
        data={articleGraph({
          slug: SLUG,
          title: TITLE,
          description: DESCRIPTION,
          image: plan.heroImage,
          breadcrumbs: [
            { name: 'Home', url: `${SITE_URL}/` },
            { name: TITLE, url: `${SITE_URL}${SLUG}` },
          ],
        })}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: TITLE, url: `${SITE_URL}${SLUG}` },
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
      <TripPackCta planSlug="first-night-camp" adults={adults} kids={kids} />
      <FloatingEmailBar planSlug="first-night-camp" adults={adults} kids={kids} />
    </main>
  )
}
