import Link from 'next/link'
import type { KidsAgeGroup, PartySize, PlanSlug } from '@/types'
import { recommendActivitiesFor } from '@/lib/activities/recommendations'
import ActivityCard from './ActivityCard'

interface Props {
  planSlug: PlanSlug
  kidsAgeGroups?: KidsAgeGroup[]
  partySize: PartySize
  limit?: number
}

export default function RecommendedActivities({
  planSlug,
  kidsAgeGroups = ['none'],
  partySize,
  limit = 4,
}: Props) {
  const activities = recommendActivitiesFor({ planSlug, kidsAgeGroups, partySize, limit })
  if (activities.length === 0) return null

  return (
    <section className="py-12 max-w-content mx-auto px-6">
      <div className="flex items-baseline justify-between mb-2">
        <h2 className="text-2xl font-serif font-medium text-stone-900">More activity ideas</h2>
      </div>
      <p className="text-stone-500 text-sm mb-8">
        Hand-picked from the activities system to fit this trip.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {activities.map((a) => (
          <ActivityCard key={a.slug} activity={a} variant="compact" />
        ))}
      </div>
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
    </section>
  )
}
