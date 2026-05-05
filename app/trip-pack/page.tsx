import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, collectionPageGraph, SITE_URL } from '@/lib/seo'
import { PLAN_CONTENT } from '@/lib/plan-content'
import { PLAN_TEMPLATES } from '@/lib/plan-templates'
import type { PlanSlug } from '@/types'

const TITLE = 'Trip Packs'
const META_TITLE = 'Camping Trip Packs — Print-Ready Family Camping Plans'
const DESCRIPTION =
  'Print-ready Trip Packs for first-time family campers — timeline, packing list, gear set, meal plan, and mistake prevention, scaled to your party size.'

const ORDER: PlanSlug[] = [
  'backyard-test',
  'first-night-camp',
  'first-weekend-camp',
  'easy-family-basecamp',
]

export const metadata = pageMetadata({
  title: META_TITLE,
  description: DESCRIPTION,
  path: '/trip-pack',
})

const COLLECTION = collectionPageGraph({
  slug: '/trip-pack',
  title: TITLE,
  description: DESCRIPTION,
  items: ORDER.map((slug) => ({
    name: `${PLAN_CONTENT[slug].cover.title} Trip Pack`,
    url: `${SITE_URL}/trip-pack/${slug}`,
  })),
})

export default function Page() {
  return (
    <main>
      <JsonLd data={COLLECTION} />
      <Breadcrumbs
        emitSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Trip Packs', url: `${SITE_URL}/trip-pack` },
        ]}
      />

      <header className="max-w-page mx-auto px-8 pt-16 md:pt-24 pb-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-500 mb-4">
          Trip Packs
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-stone-950 tracking-tight leading-tight max-w-4xl">
          Print-ready trip plans, scaled to your family.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl">
          Each Trip Pack is a complete, printable plan for one of our four pacing archetypes — timeline, gear set, packing list, meal plan, kid activities, and the mistakes most beginners make.
        </p>
        <p className="mt-4 text-base text-stone-500 leading-relaxed max-w-2xl">
          Built around four scenarios that match how families actually start camping. Pick the one that matches where you are, and you get a complete weekend instead of a reading list.
        </p>
      </header>

      <section className="max-w-page mx-auto px-8 pb-24">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {ORDER.map((slug) => {
            const content = PLAN_CONTENT[slug]
            const plan = PLAN_TEMPLATES[slug]
            return (
              <li key={slug}>
                <Link
                  href={`/trip-pack/${slug}`}
                  className="group block h-full p-8 md:p-10 rounded-2xl ring-1 ring-stone-200 bg-white hover:ring-stone-900 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
                >
                  <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">
                    {content.cover.eyebrow}
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-3">
                    {content.cover.title}
                  </h2>
                  <p className="text-stone-600 leading-relaxed mb-6">{plan?.tripSummary}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-900 group-hover:text-stone-600 transition-colors">
                    See the trip pack
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
            )
          })}
        </ul>
      </section>

      <section className="max-w-page mx-auto px-8 pb-24">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight mb-6">
            What&apos;s in every Trip Pack
          </h2>
          <ul className="space-y-3 text-stone-700 leading-relaxed text-lg list-none">
            <li>Hour-by-hour trip timeline scaled to your party size.</li>
            <li>Curated gear set — the exact items we recommend, no fluff.</li>
            <li>Printable packing checklist sized for letter paper.</li>
            <li>Meal plan with a shopping list scaled to adults and kids.</li>
            <li>Kid activities mapped to age range and time of day.</li>
            <li>Mistake-prevention notes for the most common first-trip regrets.</li>
          </ul>
        </div>
      </section>
    </main>
  )
}
