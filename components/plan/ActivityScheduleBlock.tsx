import Link from 'next/link'
import { getActivityBySlug } from '@/lib/activities/data'
import type { PlanActivitySchedule } from '@/types'
import ActivityCard from '@/components/activities/ActivityCard'

interface Props {
  schedule: PlanActivitySchedule
  /** Used to title day groups. Single-night plans pass `false`. */
  showDayHeadings?: boolean
}

export default function ActivityScheduleBlock({ schedule, showDayHeadings = true }: Props) {
  const day1 = schedule.day1.map(getActivityBySlug).filter((a): a is NonNullable<typeof a> => a !== null)
  const day2 = (schedule.day2 ?? [])
    .map(getActivityBySlug)
    .filter((a): a is NonNullable<typeof a> => a !== null)

  if (day1.length === 0 && day2.length === 0) return null

  const groups: { heading: string | null; items: typeof day1 }[] = day2.length
    ? [
        { heading: showDayHeadings ? 'Day 1' : null, items: day1 },
        { heading: showDayHeadings ? 'Day 2' : null, items: day2 },
      ]
    : [{ heading: null, items: day1 }]

  return (
    <section className="py-12 max-w-content mx-auto px-6">
      <h2 className="text-2xl font-serif font-medium text-stone-900 mb-2">What you&rsquo;ll do</h2>
      <p className="text-stone-500 text-sm mb-8">
        A short, balanced lineup for this trip. Tap any card for full instructions.
      </p>
      <div className="space-y-10">
        {groups.map((g, i) => (
          <div key={i}>
            {g.heading && (
              <p className="text-xs uppercase tracking-widest text-[#2d5016] font-semibold mb-4">
                {g.heading}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {g.items.map((a) => (
                <ActivityCard key={a.slug} activity={a} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link
          href="/activities"
          className="inline-flex items-center gap-1 text-sm font-medium text-stone-700 hover:text-stone-900"
        >
          Browse all activities
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
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
