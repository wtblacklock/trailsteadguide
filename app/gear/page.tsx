import Link from 'next/link'
import { PLAN_TEMPLATES } from '@/lib/plan-templates'
import { GEAR_SETS, GEAR_TIERS, resolveGearSet } from '@/lib/gear-sets'
import { getPlanContent } from '@/lib/plan-content'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import GearHubClient, { type HubBundle } from '@/components/gear/GearHubClient'
import { pageMetadata, collectionPageGraph, SITE_URL } from '@/lib/seo'
import type { PlanSlug } from '@/types'

function parsePriceRange(range: string): number {
  const match = range.match(/\d+/)
  return match ? parseInt(match[0], 10) : 0
}

const TITLE = 'Camping Gear Guide'
const DESCRIPTION =
  'Curated gear bundles tied to a specific camping plan. Pick the trip you are running and we will tell you exactly what to bring - no 100-option catalog, no overwhelm.'

const BUNDLE_ORDER: PlanSlug[] = [
  'first-night-camp',
  'first-weekend-camp',
  'easy-family-basecamp',
  'backyard-test',
]

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/gear',
})

export default function GearHubPage() {
  const bundles: HubBundle[] = BUNDLE_ORDER.map((planSlug) => {
    const plan = PLAN_TEMPLATES[planSlug]
    const content = getPlanContent(planSlug)
    const set = GEAR_SETS[content.gearSetId]
    if (!plan || !set) return null

    const itemsByTier = Object.fromEntries(
      GEAR_TIERS.map(({ id }) => [id, resolveGearSet(content.gearSetId, id).map((r) => r.product)]),
    ) as HubBundle['itemsByTier']
    const totalByTier = Object.fromEntries(
      GEAR_TIERS.map(({ id }) => [
        id,
        itemsByTier[id].reduce((sum, product) => sum + parsePriceRange(product.priceRange ?? ''), 0),
      ]),
    ) as HubBundle['totalByTier']

    return {
      planSlug,
      planTitle: plan.title,
      setTitle: set.title,
      setTagline: set.tagline,
      entryCount: set.entries.length,
      itemsByTier,
      totalByTier,
    }
  }).filter((b): b is HubBundle => b !== null)

  return (
    <main>
      <JsonLd
        data={collectionPageGraph({
          slug: '/gear',
          title: TITLE,
          description: DESCRIPTION,
          items: bundles.map((b) => ({
            name: b.setTitle,
            url: `${SITE_URL}/gear/sets/${b.planSlug}`,
          })),
        })}
      />
      <Breadcrumbs
        emitSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Gear Guide', url: `${SITE_URL}/gear` },
        ]}
      />

      <header className="max-w-page mx-auto px-8 pt-16 md:pt-24 pb-14 md:pb-20">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-6">
          Gear Guide
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-stone-950 tracking-tight leading-[1.04] max-w-4xl">
          Beginner gear, simplified.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl">
          Every camping plan ships with a curated gear set built for that exact trip. Pick the plan you&rsquo;re running - we&rsquo;ll tell you what to bring.
        </p>
        <p className="mt-4 text-base text-stone-500 leading-relaxed max-w-2xl">
          Each bundle is matched to a specific trip type - a first overnight, a weekend car camp, or a backyard test run - and lists every item with a price estimate and estimated total. No 100-option catalogs, no conflicting reviews. Just the gear that works for that plan, with Amazon links so you can check current prices and ship before your trip date.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
          >
            Not sure which plan? Take the quiz
          </Link>
        </div>
      </header>

      <GearHubClient bundles={bundles} />
    </main>
  )
}
