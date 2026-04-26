import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, productGraph, itemListGraph, SITE_URL } from '@/lib/seo'
import { GEAR_SETS, resolveGearSet } from '@/lib/gear-sets'
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
  const items = resolveGearSet(content.gearSetId)
  return { planSlug, plan, set, items }
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

  const { planSlug, plan, set, items } = data
  const path = `/gear/sets/${setId}`

  const productGraphs = items.map((i) =>
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
    items: items.map((i, idx) => ({
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
          Gear set · {items.length} items
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

      <section className="max-w-page mx-auto px-8 pb-20">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map(({ product, category }) => (
            <li key={product.id}>
              <a
                href={getProductUrl(product)}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="group block h-full rounded-2xl ring-1 ring-stone-200 bg-white overflow-hidden transition-all duration-200 hover:ring-stone-900 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="aspect-[4/3] w-full bg-stone-50 relative overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                    loading="lazy"
                    unoptimized
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-6 flex flex-col">
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <p className="text-xs uppercase tracking-widest text-stone-500">{category}</p>
                    {product.priceRange && (
                      <p className="text-xs text-stone-400 tabular-nums">{product.priceRange}</p>
                    )}
                  </div>
                  <h2 className="font-serif text-xl font-medium text-stone-900 tracking-tight mb-3">
                    {product.name}
                  </h2>
                  <p className="text-stone-600 leading-relaxed text-[15px]">{product.description}</p>
                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 group-hover:text-stone-600 transition-colors">
                      View on Amazon
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <path d="M7 17L17 7" />
                        <path d="M8 7h9v9" />
                      </svg>
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-stone-400">
                      Affiliate
                    </span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>

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
