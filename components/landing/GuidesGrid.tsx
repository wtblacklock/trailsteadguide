import Link from 'next/link'
import { GUIDE_CATEGORIES, getGuidesByCategoryId } from '@/lib/guides'
import type { GuideCategory, GuideCategoryId } from '@/lib/guides'

/**
 * Spec example titles surfaced when a category has fewer than 3 published
 * guides. The card always links to /guides/<slug> regardless — sparse
 * categories funnel into the quiz on the category page itself.
 */
const SPEC_EXAMPLES: Record<GuideCategoryId, string[]> = {
  basics: [
    'What to Pack for Camping',
    'How to Set Up a Tent',
    'Beginner Camping Checklist',
  ],
  scenario: [
    'Camping with Kids First Time',
    'First Night Camping Guide',
    'Rainy Camping Trips',
  ],
  seasonal: [
    'Spring Camping for Beginners',
    'Summer Family Camping Guide',
    'Fall Camping Checklist',
  ],
  location: [
    'Camping in Texas for Beginners',
    'Beginner National Park Camping',
    'Easy Campgrounds for First Timers',
  ],
}

export default function GuidesGrid() {
  return (
    <section data-reveal className="py-16 md:py-32 max-w-page mx-auto px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 md:mb-16">
        <div className="col-span-1 md:col-span-5">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-stone-950 tracking-tight leading-tight">
            Not ready yet? Start here.
          </h2>
        </div>
        <div className="col-span-1 md:col-span-5 md:col-start-7 flex items-end mt-4 md:mt-0">
          <p className="text-stone-500 text-lg leading-relaxed">
            Explore structured camping guides or build confidence before planning your trip.
          </p>
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GUIDE_CATEGORIES.map((category) => (
          <li key={category.id}>
            <CategoryCard category={category} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function CategoryCard({ category }: { category: GuideCategory }) {
  const guides = getGuidesByCategoryId(category.id)
  const hasRealGuides = guides.length >= 3
  const examples = hasRealGuides
    ? guides.slice(0, 3).map((g) => g.title)
    : SPEC_EXAMPLES[category.id]

  return (
    <Link
      href={`/guides/${category.slug}`}
      className="group block h-full p-8 md:p-10 rounded-2xl ring-1 ring-stone-200 bg-white hover:ring-stone-900 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
    >
      <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">
        Category
      </p>
      <h3 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-3">
        {category.label}
      </h3>
      <p className="text-stone-600 leading-relaxed mb-6">{category.blurb}</p>

      <ul className="space-y-2 mb-8">
        {examples.map((title) => (
          <li key={title} className="flex items-start gap-2 text-sm text-stone-700">
            <span aria-hidden="true" className="text-stone-400 mt-[1px]">›</span>
            <span>{title}</span>
          </li>
        ))}
      </ul>

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
