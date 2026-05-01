import Link from 'next/link'
import {
  GUIDES,
  getGuideBySlug,
  getGuidesByCategoryId,
} from '@/lib/guides'
import type { Guide } from '@/lib/guides'

/**
 * Pick three sibling guides to recommend at the bottom of an article.
 *
 * Order of preference:
 *   1. The current guide's curated `relatedGuides` list (if set).
 *   2. Other guides in the same category.
 *   3. Other guides anywhere — only if the first two ran out.
 *
 * Always excludes the current guide and dedupes across the three sources.
 */
function pickRelated(currentSlug: string, count = 3): Guide[] {
  const current = getGuideBySlug(currentSlug)
  if (!current) return GUIDES.slice(0, count)

  const seen = new Set<string>([currentSlug])
  const result: Guide[] = []
  const push = (guide: Guide | null | undefined) => {
    if (!guide) return
    if (seen.has(guide.slug)) return
    seen.add(guide.slug)
    result.push(guide)
  }

  // 1) Hand-curated cross-links — these are the ones we want first because
  //    they encode topical relationships the default category sibling
  //    pick misses (e.g. Colorado → PNW for high-altitude affinity).
  for (const slug of current.relatedGuides ?? []) {
    if (result.length >= count) break
    push(getGuideBySlug(slug))
  }

  // 2) Same-category fallback for any remaining slots.
  if (result.length < count) {
    for (const sibling of getGuidesByCategoryId(current.category)) {
      if (result.length >= count) break
      push(sibling)
    }
  }

  // 3) Anywhere-in-catalogue fallback if categories ran out (rare).
  if (result.length < count) {
    for (const guide of GUIDES) {
      if (result.length >= count) break
      push(guide)
    }
  }

  return result
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
