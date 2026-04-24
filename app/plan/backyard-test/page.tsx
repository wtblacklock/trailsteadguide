import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPlanTemplate } from '@/lib/plan-templates'
import { getProductsForTemplate } from '@/lib/affiliate-products'
import PlanHero from '@/components/plan/PlanHero'
import GearList from '@/components/plan/GearList'
import KidActivityPlan from '@/components/plan/KidActivityPlan'
import SafetyNotes from '@/components/plan/SafetyNotes'
import AffiliateBlock from '@/components/plan/AffiliateBlock'
import PostPlanEmailCapture from '@/components/plan/PostPlanEmailCapture'

export const metadata: Metadata = {
  title: 'Backyard Test Night Plan | Trailstead Guide',
  description: 'A zero-pressure backyard camping trial run for first-time family campers.',
}

export default function BackyardTestPage() {
  const plan = getPlanTemplate('backyard-test')
  if (!plan) notFound()

  const products = getProductsForTemplate('backyard-test')

  const timelineSections = [
    { heading: 'Before You Start', items: plan.preTrip },
    { heading: 'Setup', items: plan.arrival },
  ].filter(s => s.items.length > 0)

  const gearItems = plan.gear.map(g => g.name)
  const activityItems = plan.activities.map(a => `${a.title} — ${a.description}`)

  return (
    <main>
      <PlanHero title={plan.title} hook={plan.tagline} imageUrl={plan.heroImage} />
      {/* backyard-test: no overnight, so no Timeline wrapper — just pre-trip + setup inline */}
      <section className="py-12 max-w-content mx-auto px-6">
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
      <GearList items={gearItems} />
      <KidActivityPlan activities={activityItems} />
      <SafetyNotes notes={plan.safetyNotes} />
      <AffiliateBlock products={products} />
      <PostPlanEmailCapture />
    </main>
  )
}
