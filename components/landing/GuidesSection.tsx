import Link from 'next/link'
import { GUIDE_CATEGORIES, GUIDES, getGuidesByCategoryId } from '@/lib/guides'
import type { Guide, GuideCategory } from '@/lib/guides'
import GuidesSearchButton from './GuidesSearchButton'

/**
 * The homepage guides section: category framing and every published guide,
 * in one block.
 *
 * Replaces the old <GuidesGrid /> + <AllGuidesRail /> pair, which presented
 * the same four categories twice in a row - cards teasing the taxonomy,
 * then a full dump under it.
 *
 * SEO CONSTRAINT: every guide keeps a one-click path from the homepage.
 * That is the whole reason the exhaustive list exists (it cleared a GSC
 * "Discovered - currently not indexed" cluster for guides that were two
 * clicks deep). Everything here is server-rendered, and the disclosure is
 * a native <details>, so all anchors sit in the HTML whether or not it is
 * open. Do not swap this for a JS tab strip or a filter that renders only
 * matches - that removes links from the markup and undoes the fix.
 * `GuidesSection.test.tsx` asserts the full count is present.
 *
 * Length is managed per category via `GuideCategory.homeDisplay`:
 *   chips - short `shortLabel` pills, for sets you pick your own from
 *           (18 states collapse from 18 rows to about 3)
 *   list  - full titles, lead handful visible, remainder behind the
 *           disclosure, because the wording carries the meaning
 */

/** Titles shown before the disclosure, for `homeDisplay: 'list'` categories. */
const LEAD_COUNT = 6

export default function GuidesSection() {
  return (
    <section
      data-reveal
      aria-labelledby="guides-heading"
      className="py-16 md:py-32 max-w-page mx-auto px-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 md:mb-16">
        <div className="col-span-1 md:col-span-5">
          <h2
            id="guides-heading"
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-stone-950 tracking-tight leading-tight"
          >
            Not ready yet? Start here.
          </h2>
        </div>
        <div className="col-span-1 md:col-span-5 md:col-start-7 flex flex-col justify-end gap-4 mt-4 md:mt-0">
          <p className="text-stone-500 text-lg leading-relaxed">
            Every guide on the site, grouped by topic. Pick a category, or jump
            straight to the one that fits your trip.
          </p>
          <GuidesSearchButton count={GUIDES.length} />
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GUIDE_CATEGORIES.map((category) => (
          <li key={category.id}>
            <CategoryBlock category={category} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function CategoryBlock({ category }: { category: GuideCategory }) {
  const guides = getGuidesByCategoryId(category.id)
  if (guides.length === 0) return null

  return (
    <div className="h-full flex flex-col p-8 md:p-10 rounded-2xl ring-1 ring-stone-200 bg-white">
      <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">
        {guides.length} guides
      </p>
      <h3 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-3">
        <Link
          href={`/guides/${category.slug}`}
          className="hover:text-stone-600 transition-colors"
        >
          {category.label}
        </Link>
      </h3>
      <p className="text-stone-600 leading-relaxed mb-6">{category.blurb}</p>

      <div className="mb-8">
        {category.homeDisplay === 'chips' ? (
          <ChipList guides={guides} />
        ) : (
          <LeadList guides={guides} />
        )}
      </div>

      <Link
        href={`/guides/${category.slug}`}
        className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-stone-900 hover:text-stone-600 transition-colors"
      >
        {category.ctaLabel}
        <Arrow />
      </Link>
    </div>
  )
}

/**
 * Pills labelled by `shortLabel`. The visible text is deliberately terse
 * ("Texas"), so `aria-label` carries the full title - otherwise a screen
 * reader hears a bare list of place names with no indication they are
 * camping guides.
 */
function ChipList({ guides }: { guides: Guide[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {guides.map((guide) => (
        <li key={guide.slug}>
          <Link
            href={`/guides/${guide.slug}`}
            aria-label={guide.title}
            className="inline-flex rounded-full ring-1 ring-stone-200 px-3 py-1.5 text-sm text-stone-700 hover:ring-stone-900 hover:text-stone-950 transition-colors"
          >
            {guide.shortLabel ?? guide.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

function LeadList({ guides }: { guides: Guide[] }) {
  const lead = guides.slice(0, LEAD_COUNT)
  const rest = guides.slice(LEAD_COUNT)

  return (
    <>
      <ul className="space-y-2">
        {lead.map((guide) => (
          <GuideLink key={guide.slug} guide={guide} />
        ))}
      </ul>

      {rest.length > 0 && (
        <details className="group mt-3">
          <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden inline-flex items-center gap-1 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors">
            <span className="group-open:hidden">Show all {guides.length}</span>
            <span className="hidden group-open:inline">Show fewer</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-open:rotate-180"
            >
              ⌄
            </span>
          </summary>
          <ul className="space-y-2 mt-3">
            {rest.map((guide) => (
              <GuideLink key={guide.slug} guide={guide} />
            ))}
          </ul>
        </details>
      )}
    </>
  )
}

function GuideLink({ guide }: { guide: Guide }) {
  return (
    <li>
      <Link
        href={`/guides/${guide.slug}`}
        className="block text-sm leading-relaxed text-stone-800 hover:text-stone-500 transition-colors"
      >
        {guide.title}
      </Link>
    </li>
  )
}

function Arrow() {
  return (
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
    >
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  )
}
