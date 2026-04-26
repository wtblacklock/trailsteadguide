import Link from 'next/link'
import {
  GUIDES,
  getGuideBySlug,
  getGuidesByCategoryId,
} from '@/lib/guides'
import type { Guide } from '@/lib/guides'

/**
 * Pick three sibling guides to recommend at the bottom of an article.
 * Prefer guides in the same category; if there aren't three, fill the
 * remainder from the rest of the catalogue. Always excludes the
 * current guide.
 */
function pickRelated(currentSlug: string, count = 3): Guide[] {
  const current = getGuideBySlug(currentSlug)
  const sameCategory = current
    ? getGuidesByCategoryId(current.category).filter((g) => g.slug !== currentSlug)
    : []
  const others = GUIDES.filter(
    (g) => g.slug !== currentSlug && !sameCategory.some((s) => s.slug === g.slug),
  )
  return [...sameCategory, ...others].slice(0, count)
}

export default function RelatedGuides({ currentSlug }: { currentSlug: string }) {
  const others = pickRelated(currentSlug)

  return (
    <section className="max-w-5xl mx-auto px-8 mt-20 mb-32">
      <div className="border-t border-stone-200 pt-12">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-10">
          Keep reading
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {others.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="group block rounded-2xl ring-1 ring-stone-200 bg-white p-6 md:p-8 transition-all duration-200 hover:ring-stone-900 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">
                Guide
              </p>
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-stone-900 tracking-tight leading-snug mb-3 group-hover:text-stone-600 transition-colors">
                {g.title}
              </h3>
              <p className="text-stone-600 leading-relaxed text-[15px] mb-6">
                {g.description}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 group-hover:text-stone-600 transition-colors">
                Read guide
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
          ))}
        </div>
      </div>
    </section>
  )
}
