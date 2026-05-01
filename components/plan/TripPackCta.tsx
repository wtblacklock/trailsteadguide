import Link from 'next/link'
import type { PlanSlug } from '@/types'
import type {
  ActivityType,
  ComfortLevel,
  GroupType,
  KidsAgeBucket,
} from '@/lib/personalization/types'

const TITLES: Record<PlanSlug, string> = {
  'backyard-test': 'Backyard Test Night',
  'first-night-camp': 'First Night Camp',
  'first-weekend-camp': 'First Weekend Camp',
  'easy-family-basecamp': 'Easy Family Basecamp',
}

/**
 * Banner CTA pointing from a free plan page to the paid Trip Pack
 * (print-ready PDF + curated gear + mistake prevention).
 */
export default function TripPackCta({
  planSlug,
  adults,
  kids,
  group,
  kidsAge,
  activity,
  comfort,
}: {
  planSlug: PlanSlug
  adults: number
  kids: number
  group?: GroupType
  kidsAge?: KidsAgeBucket
  activity?: ActivityType
  comfort?: ComfortLevel
}) {
  const params = new URLSearchParams({ adults: String(adults), kids: String(kids) })
  if (group) params.set('group', group)
  if (kidsAge) params.set('kidsAge', kidsAge)
  if (activity) params.set('activity', activity)
  if (comfort) params.set('comfort', comfort)
  const qs = params.toString()
  return (
    <section className="py-12">
      <div className="max-w-content mx-auto px-6">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-900 to-emerald-950 text-emerald-50 p-8 md:p-10 shadow-sm">
          <div className="md:flex md:items-center md:justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-200 mb-2">
                Trailstead Trip Pack
              </p>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-2">
                Take it with you: {TITLES[planSlug]} in a 7-page print-ready PDF.
              </h2>
              <p className="text-emerald-100/85 text-sm leading-relaxed">
                Personalized timeline, packing list scaled to your party, curated gear, and a mistake-prevention guide &mdash; one pack, yours forever.
              </p>
            </div>
            <div className="mt-6 md:mt-0 shrink-0">
              <Link
                href={`/trip-pack/${planSlug}?${qs}`}
                className="inline-block bg-amber-300 hover:bg-amber-200 text-stone-900 font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Get my Trip Pack &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
