import Link from 'next/link'
import { GUIDE_CATEGORIES, getGuidesByCategoryId } from '@/lib/guides'

/**
 * Homepage rail with direct links to every guide on the site, grouped by
 * category. Sits below `<GuidesGrid />` (the four-card category overview)
 * to surface individual guides for SEO crawl coverage and for visitors
 * who'd rather scan a list than enter a category.
 *
 * Each guide gets a one-click path from the homepage, which is the main
 * fix for the "Discovered – currently not indexed" cluster in GSC where
 * specific guides sit because they were 2 clicks deep from home.
 */
export default function AllGuidesRail() {
  return (
    <section
      data-reveal
      aria-labelledby="all-guides-heading"
      className="py-16 md:py-24 max-w-page mx-auto px-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10 md:mb-14">
        <div className="col-span-1 md:col-span-5">
          <h2
            id="all-guides-heading"
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-stone-950 tracking-tight leading-tight"
          >
            Browse all guides
          </h2>
        </div>
        <div className="col-span-1 md:col-span-5 md:col-start-7 flex items-end mt-3 md:mt-0">
          <p className="text-stone-500 text-base md:text-lg leading-relaxed">
            Every published guide, grouped by topic. Pick what fits your trip.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
        {GUIDE_CATEGORIES.map((category) => {
          const guides = getGuidesByCategoryId(category.id)
          if (guides.length === 0) return null
          return (
            <div key={category.id}>
              <Link
                href={`/guides/${category.slug}`}
                className="group inline-flex items-baseline gap-1 mb-4 text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 hover:text-stone-900 transition-colors"
              >
                {category.label}
                <span
                  aria-hidden="true"
                  className="text-stone-300 group-hover:text-stone-700 transition-colors"
                >
                  ›
                </span>
              </Link>
              <ul className="space-y-2">
                {guides.map((guide) => (
                  <li key={guide.slug}>
                    <Link
                      href={`/guides/${guide.slug}`}
                      className="block text-sm leading-relaxed text-stone-800 hover:text-stone-500 transition-colors"
                    >
                      {guide.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
