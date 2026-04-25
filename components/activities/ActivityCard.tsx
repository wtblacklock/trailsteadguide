import Link from 'next/link'
import type { Activity } from '@/lib/activities/types'
import ActivityBadge from './ActivityBadge'
import { AGE_LABELS, CATEGORY_LABELS, ENERGY_LABELS, TIME_LABELS } from './labels'

interface Props {
  activity: Activity
  variant?: 'default' | 'compact'
}

export default function ActivityCard({ activity, variant = 'default' }: Props) {
  const isCompact = variant === 'compact'
  return (
    <Link
      href={`/activities/${activity.slug}`}
      className="group block h-full bg-white border border-stone-200 rounded-xl shadow-sm hover:shadow-md hover:border-stone-300 transition-all p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2"
    >
      <div className="flex flex-col h-full">
        {!isCompact && (
          <p className="text-xs uppercase tracking-widest text-[#2d5016] font-medium mb-3">
            {CATEGORY_LABELS[activity.category]}
          </p>
        )}
        <h3 className="font-serif text-xl text-stone-900 mb-2 leading-snug">{activity.title}</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-5 flex-1">{activity.tagline}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          <ActivityBadge label={AGE_LABELS[activity.ageRange]} tone="age" />
          <ActivityBadge label={TIME_LABELS[activity.timeRequired]} tone="time" />
          <ActivityBadge label={ENERGY_LABELS[activity.energyLevel]} tone="energy" />
        </div>
        <span className="text-sm text-stone-700 group-hover:text-stone-900 inline-flex items-center gap-1 font-medium">
          View activity
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
