import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPlanTemplate } from '@/lib/plan-templates'
import { getProductsForTemplate } from '@/lib/affiliate-products'
import PlanHero from '@/components/plan/PlanHero'
import PlanJumpNav from '@/components/plan/PlanJumpNav'
import GearList from '@/components/plan/GearList'
import KidActivityPlan from '@/components/plan/KidActivityPlan'
import SafetyNotes from '@/components/plan/SafetyNotes'
import AffiliateBlock from '@/components/plan/AffiliateBlock'
import PostPlanEmailCapture from '@/components/plan/PostPlanEmailCapture'
import FloatingEmailBar from '@/components/plan/FloatingEmailBar'
import MealPlanAndShopping from '@/components/plan/MealPlanAndShopping'
import { parsePartySize } from '@/lib/party-size'

export const metadata: Metadata = {
  title: 'Backyard Test Night Plan | Trailstead Guide',
  description: 'A zero-pressure backyard camping trial run for first-time family campers.',
}

export default async function BackyardTestPage({
  searchParams,
}: {
  searchParams: Promise<{ adults?: string; kids?: string }>
}) {
  const plan = getPlanTemplate('backyard-test')
  if (!plan) notFound()

  const products = getProductsForTemplate('backyard-test')
  const { adults, kids } = parsePartySize(await searchParams)

  const timelineSections = [
    { heading: 'Before You Start', items: plan.preTrip },
    { heading: 'Setup', items: plan.arrival },
  ].filter(s => s.items.length > 0)

  const gearItems = plan.gear.map(g => g.name)
  const activityItems = plan.activities.map(a => `${a.title} — ${a.description}`)

  return (
    <main>
      <PlanHero title={plan.title} hook={plan.tagline} imageUrl={plan.heroImage} />
      <PlanJumpNav
        links={[
          { id: 'timeline', label: 'Plan' },
          { id: 'gear', label: 'Gear' },
          { id: 'activities', label: 'Activities' },
          { id: 'meals', label: 'Meals' },
          { id: 'safety', label: 'Safety' },
          ...(products.length > 0 ? [{ id: 'shop', label: 'Shop' }] : []),
        ]}
      />
      {/* backyard-test: no overnight, so no Timeline wrapper — just pre-trip + setup inline */}
      <section id="timeline" className="scroll-mt-32 py-12 max-w-content mx-auto px-6">
        <h2 className="text-2xl font-serif font-medium text-stone-900 mb-8">Your Trial Night Plan</h2>
        {timelineSections.map((section) => (
          <div key={section.heading} className="mb-8">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-green mb-4">{section.heading}</h3>
            <ul className="space-y-3">
              {section.items.map((item, i) => (
                <li key={i} className="flex gap-3 text-stone-700">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-xs font-medium text-stone-500">{i + 1}</span>
                  <span><strong>{item.time}:</strong> {item.title} — {item.description}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <div id="gear" className="scroll-mt-32"><GearList items={gearItems} /></div>
      <div id="activities" className="scroll-mt-32"><KidActivityPlan activities={activityItems} /></div>
      <div id="meals" className="scroll-mt-32"><MealPlanAndShopping meals={plan.meals} defaultAdults={adults} defaultKids={kids} /></div>
      <div id="safety" className="scroll-mt-32"><SafetyNotes notes={plan.safetyNotes} /></div>
      {products.length > 0 && (
        <div id="shop" className="scroll-mt-32"><AffiliateBlock products={products} /></div>
      )}
      <PostPlanEmailCapture planSlug="backyard-test" />
      <FloatingEmailBar planSlug="backyard-test" />
    </main>
  )
}
