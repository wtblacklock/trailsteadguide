import Link from 'next/link'
import type { PlanSlug } from '@/types'

type Pairing = {
  otherTitle: string
  comparePath: string
  hook: string
}

const PAIRINGS: Partial<Record<PlanSlug, Pairing>> = {
  'backyard-test': {
    otherTitle: 'First Night Camp',
    comparePath: '/compare/backyard-test-vs-first-night-camp',
    hook: 'Not sure if you should rehearse in the yard first or just go for the campsite?',
  },
  'first-night-camp': {
    otherTitle: 'Backyard Test',
    comparePath: '/compare/backyard-test-vs-first-night-camp',
    hook: 'Not sure if you should rehearse in the yard first or just go for the campsite?',
  },
  'easy-family-basecamp': {
    otherTitle: 'First Weekend Camp',
    comparePath: '/compare/easy-family-basecamp-vs-first-weekend-camp',
    hook: 'Not sure between a comfort-first basecamp and a Saturday-hike weekend?',
  },
  'first-weekend-camp': {
    otherTitle: 'Easy Family Basecamp',
    comparePath: '/compare/easy-family-basecamp-vs-first-weekend-camp',
    hook: 'Not sure between a Saturday-hike weekend and a comfort-first basecamp?',
  },
}

export default function PlanComparisonLink({ planSlug }: { planSlug: PlanSlug }) {
  const pairing = PAIRINGS[planSlug]
  if (!pairing) return null

  return (
    <section className="py-8">
      <div className="max-w-content mx-auto px-6">
        <div className="rounded-2xl ring-1 ring-stone-200 bg-stone-50 px-6 py-5 md:px-7 md:py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-1.5">
              Comparing plans?
            </p>
            <p className="text-stone-800 leading-relaxed">{pairing.hook}</p>
          </div>
          <Link
            href={pairing.comparePath}
            className="shrink-0 inline-flex items-center justify-center rounded-md font-medium ring-1 ring-stone-300 text-stone-900 bg-white hover:bg-stone-100 transition-colors px-5 py-2.5 text-sm"
          >
            See this vs {pairing.otherTitle} &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
