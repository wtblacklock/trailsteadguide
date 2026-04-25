import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, collectionPageGraph, SITE_URL } from '@/lib/seo'
import {
  GUIDE_CATEGORIES,
  getCategoryBySlug,
  getGuidesByCategoryId,
} from '@/lib/guides'
import type { Guide, GuideCategory } from '@/lib/guides'

export function generateStaticParams() {
  return GUIDE_CATEGORIES.map((c) => ({ category: c.slug }))
}

type Params = { category: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { category: categorySlug } = await params
  const category = getCategoryBySlug(categorySlug)
  if (!category) return {}
  return pageMetadata({
    title: `${category.label} — Camping Guides`,
    description: category.heroSubhead,
    path: `/guides/${category.slug}`,
  })
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { category: categorySlug } = await params
  const category = getCategoryBySlug(categorySlug)
  if (!category) notFound()

  const guides = getGuidesByCategoryId(category.id)
  const isPlaceholder = category.placeholder === true || guides.length === 0

  return (
    <main>
      <JsonLd
        data={collectionPageGraph({
          slug: `/guides/${category.slug}`,
          title: `${category.label} — Camping Guides`,
          description: category.heroSubhead,
          items: guides.map((g) => ({
            name: g.title,
            url: `${SITE_URL}/guides/${g.slug}`,
          })),
        })}
      />
      <Breadcrumbs
        emitSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Guides', url: `${SITE_URL}/guides` },
          { name: category.label, url: `${SITE_URL}/guides/${category.slug}` },
        ]}
      />

      <header className="max-w-page mx-auto px-8 pt-16 md:pt-24 pb-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-500 mb-4">
          <Link href="/guides" className="hover:text-stone-900 transition-colors">
            ← All Guides
          </Link>
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-stone-950 tracking-tight leading-tight max-w-4xl">
          {category.heroTitle}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl">
          {category.heroSubhead}
        </p>
      </header>

      {isPlaceholder ? (
        <PlaceholderBody category={category} />
      ) : (
        <GuideList guides={guides} />
      )}

      <section className="max-w-page mx-auto px-8 pb-24">
        <div className="bg-stone-900 rounded-3xl p-10 md:p-16 text-white">
          <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-4">
            Skip the reading
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight mb-4 max-w-2xl">
            Get Your Camping Plan.
          </h2>
          <p className="text-stone-300 text-lg mb-8 max-w-xl">
            Answer 5 questions. We scale the timeline, gear, and meals to your kids&apos; ages and your party size.
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

function GuideList({ guides }: { guides: Guide[] }) {
  return (
    <section className="max-w-page mx-auto px-8 pb-20">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={`/guides/${guide.slug}`}
              className="group block h-full p-8 rounded-2xl ring-1 ring-stone-200 bg-white hover:ring-stone-900 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
            >
              {guide.eyebrow && (
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-3">
                  {guide.eyebrow}
                </p>
              )}
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-stone-900 mb-3 tracking-tight group-hover:text-stone-700 transition-colors">
                {guide.title}
              </h2>
              <p className="text-stone-600 leading-relaxed">{guide.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

function PlaceholderBody({ category }: { category: GuideCategory }) {
  return (
    <section className="max-w-3xl mx-auto px-8 pb-16">
      <div className="rounded-2xl ring-1 ring-stone-200 bg-stone-50 p-8 md:p-12">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">
          Coming soon
        </p>
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-stone-950 tracking-tight mb-4">
          {category.id === 'seasonal'
            ? 'We’re writing this section out by season.'
            : 'We’re writing this section out by region.'}
        </h2>
        <p className="text-stone-600 leading-relaxed mb-6">
          The quiz already scaffolds a plan around your dates and where you’re going — start there and we’ll match the timeline to the conditions you’ll actually face.
        </p>
        <Link
          href="/quiz"
          className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
        >
          {category.ctaLabel} via the Quiz
        </Link>
      </div>
    </section>
  )
}
