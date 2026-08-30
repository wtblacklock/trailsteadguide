import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import GearSetDetailClient, { type DetailItem } from '@/components/gear/GearSetDetailClient'
import { pageMetadata, productGraph, itemListGraph, SITE_URL } from '@/lib/seo'
import { GEAR_SETS, GEAR_TIERS, resolveGearSet, type GearTier } from '@/lib/gear-sets'
import { getProductUrl } from '@/lib/amazon'
import { PLAN_TEMPLATES } from '@/lib/plan-templates'
import { getPlanContent } from '@/lib/plan-content'
import type { PlanSlug } from '@/types'

const SET_PLAN_SLUGS: PlanSlug[] = [
  'backyard-test',
  'first-night-camp',
  'first-weekend-camp',
  'easy-family-basecamp',
]

type Params = { setId: string }

export function generateStaticParams(): Params[] {
  return SET_PLAN_SLUGS.map((setId) => ({ setId }))
}

function getSetForPlan(setId: string) {
  if (!SET_PLAN_SLUGS.includes(setId as PlanSlug)) return null
  const planSlug = setId as PlanSlug
  const plan = PLAN_TEMPLATES[planSlug]
  const content = getPlanContent(planSlug)
  if (!plan || !content) return null
  const set = GEAR_SETS[content.gearSetId]
  if (!set) return null

  const itemsByTier = Object.fromEntries(
    GEAR_TIERS.map(({ id }) => [
      id,
      resolveGearSet(content.gearSetId, id).map((r): DetailItem => ({ product: r.product, category: r.category })),
    ]),
  ) as Record<GearTier, DetailItem[]>

  return { planSlug, plan, set, itemsByTier }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { setId } = await params
  const data = getSetForPlan(setId)
  if (!data) return {}
  return pageMetadata({
    title: `${data.set.title} — Gear Set`,
    description: `${data.set.tagline} The curated gear bundle for the ${data.plan.title} plan.`,
    path: `/gear/sets/${setId}`,
  })
}

export default async function GearSetPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { setId } = await params
  const data = getSetForPlan(setId)
  if (!data) notFound()

  const { planSlug, plan, set, itemsByTier } = data
  const path = `/gear/sets/${setId}`
  // Standard tier is the canonical view for schema.org markup and the
  // header's item count — crawlers and metadata don't need to reflect
  // client-side tier state.
  const standardItems = itemsByTier.standard

  const productGraphs = standardItems.map((i) =>
    productGraph({
      id: i.product.id,
      name: i.product.name,
      description: i.product.description,
      image: i.product.imageUrl,
      offerUrl: getProductUrl(i.product),
      priceRange: i.product.priceRange,
    }),
  )

  const list = itemListGraph({
    name: set.title,
    items: standardItems.map((i, idx) => ({
      position: idx + 1,
      name: i.product.name,
      url: getProductUrl(i.product),
    })),
  })

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [list, ...productGraphs],
  }

  return (
    <main>
      <JsonLd data={graph} />
      <Breadcrumbs
        emitSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Gear Guide', url: `${SITE_URL}/gear` },
          { name: set.title, url: `${SITE_URL}${path}` },
        ]}
      />

      <header className="max-w-page mx-auto px-8 pt-16 md:pt-24 pb-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-500 mb-4">
          <Link href="/gear" className="hover:text-stone-900 transition-colors">
            ← All gear sets
          </Link>
        </p>
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">
          Gear set · {standardItems.length} items
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-stone-950 tracking-tight leading-[1.04] max-w-4xl">
          {set.title}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl">
          {set.tagline}
        </p>
        <p className="mt-6 text-sm text-stone-500">
          Pairs with the{' '}
          <Link href={`/plans/${planSlug}`} className="text-stone-900 font-medium underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900">
            {plan.title}
          </Link>{' '}
          plan.
        </p>
      </header>

      <GearSetDetailClient itemsByTier={itemsByTier} />

      <section className="max-w-page mx-auto px-8 pb-24">
        <div className="bg-stone-900 rounded-3xl p-10 md:p-16 text-white">
          <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-4">
            Use this gear with the plan
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight mb-4 max-w-2xl">
            See the {plan.title} plan
          </h2>
          <p className="text-stone-300 text-lg mb-8 max-w-xl">
            Full timeline, meals, kid activities, and safety notes — built around exactly this gear.
          </p>
          <Link
            href={`/plans/${planSlug}`}
            className="inline-flex items-center justify-center rounded-md font-medium bg-white text-stone-900 hover:bg-stone-100 transition-colors px-6 py-3 text-sm"
          >
            Open the plan
          </Link>
        </div>

        <p className="mt-8 text-xs text-stone-500 max-w-2xl">
          As an Amazon Associate we earn from qualifying purchases. The links above are affiliate links — clicking them may earn us a small commission at no extra cost to you.
        </p>
      </section>
    </main>
  )
}
