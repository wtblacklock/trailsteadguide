import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, collectionPageGraph, SITE_URL } from '@/lib/seo'
import {
  GUIDE_CATEGORIES,
  getGuidesByCategoryId,
} from '@/lib/guides'
import type { GuideCategory } from '@/lib/guides'

const GUIDES_TITLE = 'Camping Guides'
const GUIDES_META_TITLE = 'Camping Guides for Beginners — All Topics'
const GUIDES_DESCRIPTION =
  'Camping guides for beginners: 24 step-by-step articles on basics, scenarios, seasons, and locations — each routing into a personalized trip plan.'

export const metadata = pageMetadata({
  title: GUIDES_META_TITLE,
  description: GUIDES_DESCRIPTION,
  path: '/guides',
})

const GUIDES_COLLECTION = collectionPageGraph({
  slug: '/guides',
  title: GUIDES_TITLE,
  description: GUIDES_DESCRIPTION,
  items: GUIDE_CATEGORIES.map((c) => ({
    name: c.label,
    url: `${SITE_URL}/guides/${c.slug}`,
  })),
})

export default function Page() {
  return (
    <main>
      <JsonLd data={GUIDES_COLLECTION} />
      <Breadcrumbs
        emitSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Guides', url: `${SITE_URL}/guides` },
        ]}
      />

      <header className="max-w-page mx-auto px-8 pt-16 md:pt-24 pb-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-500 mb-4">
          Guides Library
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-stone-950 tracking-tight leading-tight max-w-4xl">
          A structured path to your first trip.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl">
          Pick a category. Each one walks you through a different angle on family camping — and ends in a plan made for your trip.
        </p>
      </header>

      <section className="max-w-page mx-auto px-8 pb-20">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {GUIDE_CATEGORIES.map((category) => (
            <li key={category.id}>
              <CategoryCard category={category} />
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-page mx-auto px-8 pb-24">
        <div className="bg-stone-900 rounded-3xl p-10 md:p-16 text-white">
          <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-4">
            Skip the reading
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight mb-4 max-w-2xl">
            Get Your Camping Plan.
          </h2>
          <p className="text-stone-300 text-lg mb-8 max-w-xl">
            Answer 5 questions. Get a full trip plan — timeline, gear, meals, activities — in about 2 minutes.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-md font-medium bg-white text-stone-900 hover:bg-stone-100 transition-colors px-6 py-3 text-sm"
          >
            Start Planning
          </Link>
        </div>
      </section>
    </main>
  )
}

function CategoryCard({ category }: { category: GuideCategory }) {
  const guides = getGuidesByCategoryId(category.id)
  const examples = guides.slice(0, 3)
  const isPlaceholder = category.placeholder === true || examples.length === 0
  const href = `/guides/${category.slug}`

  return (
    <Link
      href={href}
      className="group block h-full p-8 md:p-10 rounded-2xl ring-1 ring-stone-200 bg-white hover:ring-stone-900 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
    >
      <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">
        Category
      </p>
      <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-3">
        {category.label}
      </h2>
      <p className="text-stone-600 leading-relaxed mb-6">{category.blurb}</p>

      {isPlaceholder ? (
        <p className="text-sm text-stone-500 italic mb-6">
          We&apos;re building this section out. In the meantime, the quiz can scaffold a trip for any season or region.
        </p>
      ) : (
        <ul className="space-y-2 mb-8">
          {examples.map((g) => (
            <li
              key={g.slug}
              className="flex items-start gap-2 text-sm text-stone-700"
            >
              <span aria-hidden="true" className="text-stone-400 mt-[1px]">
                ›
              </span>
              <span>{g.title}</span>
            </li>
          ))}
        </ul>
      )}

      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-900 group-hover:text-stone-600 transition-colors">
        {category.ctaLabel}
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
  )
}
