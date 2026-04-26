import Link from 'next/link'
import { PLAN_TEMPLATES } from '@/lib/plan-templates'
import { GEAR_SETS } from '@/lib/gear-sets'
import { getPlanContent } from '@/lib/plan-content'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, collectionPageGraph, SITE_URL } from '@/lib/seo'
import type { PlanSlug } from '@/types'

const TITLE = 'Camping Gear Guide'
const DESCRIPTION =
  'Curated gear bundles tied to a specific camping plan. Pick the trip you are running and we will tell you exactly what to bring — no 100-option catalog, no overwhelm.'

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
  const bundles = BUNDLE_ORDER.map((planSlug) => {
    const plan = PLAN_TEMPLATES[planSlug]
    const content = getPlanContent(planSlug)
    const set = GEAR_SETS[content.gearSetId]
    return { planSlug, plan, set }
  }).filter((b) => b.plan && b.set)

  return (
    <main>
      <JsonLd
        data={collectionPageGraph({
          slug: '/gear',
          title: TITLE,
          description: DESCRIPTION,
          items: bundles.map((b) => ({
            name: b.set.title,
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
          Every camping plan ships with a curated gear set built for that exact trip. Pick the plan you&rsquo;re running — we&rsquo;ll tell you what to bring.
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

      <section className="max-w-page mx-auto px-8 pb-24">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {bundles.map(({ planSlug, plan, set }) => (
            <li key={planSlug}>
              <Link
                href={`/gear/sets/${planSlug}`}
                className="group block h-full p-8 md:p-10 rounded-2xl ring-1 ring-stone-200 bg-white hover:ring-stone-900 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
              >
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">
                  Gear set · {set.entries.length} items
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-3">
                  {set.title}
                </h2>
                <p className="text-stone-600 leading-relaxed mb-6">{set.tagline}</p>
                <p className="text-sm text-stone-500 mb-8">
                  Pairs with the{' '}
                  <span className="text-stone-700 font-medium">{plan.title}</span> plan.
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-900 group-hover:text-stone-600 transition-colors">
                  See the gear
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-xs text-stone-500 max-w-2xl">
          As an Amazon Associate we earn from qualifying purchases. Links on the bundle pages are affiliate links — clicking them may earn us a small commission at no extra cost to you.
        </p>
      </section>
    </main>
  )
}
