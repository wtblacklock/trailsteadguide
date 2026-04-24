import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPlanTemplate } from '@/lib/plan-templates'
import { getProductsForTemplate } from '@/lib/affiliate-products'
import PlanHero from '@/components/plan/PlanHero'
import Timeline from '@/components/plan/Timeline'
import GearList from '@/components/plan/GearList'
import KidActivityPlan from '@/components/plan/KidActivityPlan'
import SafetyNotes from '@/components/plan/SafetyNotes'
import AffiliateBlock from '@/components/plan/AffiliateBlock'
import PostPlanEmailCapture from '@/components/plan/PostPlanEmailCapture'
import FloatingEmailBar from '@/components/plan/FloatingEmailBar'
import MealPlanAndShopping from '@/components/plan/MealPlanAndShopping'
import { parsePartySize } from '@/lib/party-size'

export const metadata: Metadata = {
  title: 'First Night Camp Plan | Trailstead Guide',
  description: 'Your personalized first campsite night plan for first-time family campers.',
}

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

  return (
    <main>
      <PlanHero title={plan.title} hook={plan.tagline} imageUrl={plan.heroImage} />
      <Timeline sections={timelineSections} />
      <GearList items={gearItems} />
      <KidActivityPlan activities={activityItems} />
      <SafetyNotes notes={plan.safetyNotes} />
      <MealPlanAndShopping meals={plan.meals} defaultAdults={adults} defaultKids={kids} />
      <AffiliateBlock products={products} />
      <PostPlanEmailCapture planSlug="first-night-camp" />
      <FloatingEmailBar planSlug="first-night-camp" />
    </main>
  )
}
