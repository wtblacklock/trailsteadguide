import Link from 'next/link'
import { PLAN_TEMPLATES } from '@/lib/plan-templates'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, collectionPageGraph, SITE_URL } from '@/lib/seo'
import type { PlanSlug } from '@/types'

const TITLE = 'Camping Plans'
const DESCRIPTION =
  'Four proven camping setups for first-time families. Pick the plan that matches your trip — or take the quiz and we will pick for you.'

const PLAN_ORDER: PlanSlug[] = [
  'easy-family-basecamp',
  'first-night-camp',
  'backyard-test',
  'first-weekend-camp',
]

const PLAN_DIFFICULTY: Record<PlanSlug, string> = {
  'backyard-test': 'Practice run · 1 night',
  'first-night-camp': 'Beginner · 1 night',
  'first-weekend-camp': 'Beginner+ · 2 nights',
  'easy-family-basecamp': 'Comfort-first · 3+ nights',
}

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/plans',
})

export default function PlansIndexPage() {
  const plans = PLAN_ORDER.map((slug) => PLAN_TEMPLATES[slug]).filter(Boolean)

  return (
    <main>
      <JsonLd
        data={collectionPageGraph({
          slug: '/plans',
          title: TITLE,
          description: DESCRIPTION,
          items: plans.map((p) => ({
            name: p.title,
            url: `${SITE_URL}/plans/${p.slug}`,
          })),
        })}
      />
      <Breadcrumbs
        emitSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Camping Plans', url: `${SITE_URL}/plans` },
        ]}
      />

      <header className="max-w-page mx-auto px-8 pt-16 md:pt-24 pb-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-500 mb-4">Plans</p>
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-stone-950 tracking-tight leading-tight max-w-4xl">
          Choose a proven camping setup.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl">
          Four structured plans for the four real first-time scenarios. Pick the one that fits — or take the quiz and we&apos;ll match you.
        </p>
        <div className="mt-8">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
          >
            Take the quiz instead
          </Link>
        </div>
      </header>

      <section className="max-w-page mx-auto px-8 pb-24">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <li key={plan.slug}>
              <Link
                href={`/plans/${plan.slug}`}
                className="group block h-full p-8 md:p-10 rounded-2xl ring-1 ring-stone-200 bg-white hover:ring-stone-900 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
              >
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">
                  {PLAN_DIFFICULTY[plan.slug]}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-3">
                  {plan.title}
                </h2>
                <p className="text-stone-600 leading-relaxed mb-8">{plan.tagline}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-900 group-hover:text-stone-600 transition-colors">
                  Get this plan
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
      </section>
    </main>
  )
}
