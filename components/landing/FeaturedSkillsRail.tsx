import Link from 'next/link'
import { getSkillByRef } from '@/lib/skills/helpers'

const FEATURED_REFS = [
  'shelter/pitching-a-tent',
  'fire/starting-a-fire',
  'knots/taut-line-hitch',
  'safety/lightning-safety',
  'hiking/hiking-with-kids',
  'cooking/one-pot-camp-meals',
  'safety/wildlife-encounters',
  'shelter/tarp-rigging',
] as const

export default function FeaturedSkillsRail() {
  const cards = FEATURED_REFS
    .map((ref) => {
      const found = getSkillByRef(ref)
      return found ? { ref, skill: found.skill, category: found.category } : null
    })
    .filter((c): c is NonNullable<typeof c> => c !== null)

  if (cards.length === 0) return null

  return (
    <section data-reveal className="py-16 md:py-32 max-w-page mx-auto px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 md:mb-16">
        <div className="col-span-1 md:col-span-5">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">
            Camp Skills
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-stone-950 tracking-tight leading-tight">
            The skills your plan calls for.
          </h2>
        </div>
        <div className="col-span-1 md:col-span-5 md:col-start-7 flex items-end mt-4 md:mt-0">
          <p className="text-stone-500 text-lg leading-relaxed">
            Short, beginner-friendly walkthroughs of the moves a confident first trip
            assumes you can do - pitching a tent, starting a fire, tying the one knot
            that holds a tarp taut overnight.
          </p>
        </div>
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {cards.map(({ ref, skill, category }) => (
          <li key={ref}>
            <Link
              href={`/skills/${category.slug}/${skill.slug}`}
              className="group block h-full p-6 md:p-7 rounded-xl ring-1 ring-stone-200 bg-white hover:ring-stone-900 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
            >
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-stone-500 mb-3">
                {category.label}
              </p>
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-stone-950 tracking-tight leading-tight mb-2">
                {skill.title}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed line-clamp-3">
                {skill.tagline}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 md:mt-12">
        <Link
          href="/skills"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-900 hover:text-stone-600 transition-colors"
        >
          Browse the full skill library
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
        </Link>
      </div>
    </section>
  )
}
