import Link from 'next/link'
import type { Activity } from '@/lib/activities/types'
import ActivityCard from './ActivityCard'

// Presentational half of the hub grid. The client grid renders it with the
// filtered list; the hub page renders it as the Suspense fallback with the
// full list, so the server HTML always links to every activity.
export default function ActivitiesGridView({
  activities,
  isFiltered,
}: {
  activities: Activity[]
  isFiltered: boolean
}) {
  return (
    <section className="max-w-page mx-auto px-6 py-12 md:py-16">
      <div className="flex items-baseline justify-between mb-8">
        <p className="text-sm text-stone-500">
          {activities.length} {activities.length === 1 ? 'activity' : 'activities'}
          {isFiltered && ' match your filters'}
        </p>
      </div>
      {activities.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((a) => (
            <ActivityCard key={a.slug} activity={a} />
          ))}
        </div>
      )}
    </section>
  )
}

function EmptyState() {
  return (
    <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-10 text-center">
      <h2 className="font-serif text-2xl text-stone-900 mb-3">No activities match those filters</h2>
      <p className="text-stone-600 mb-6 max-w-md mx-auto">
        Try removing one of the filters above. Most activities work well across age groups when
        you scale them up or down.
      </p>
      <Link
        href="/activities"
        className="inline-flex items-center justify-center bg-stone-900 text-white text-sm font-medium rounded-md hover:bg-stone-800 transition-colors px-5 py-2.5"
      >
        Clear all filters
      </Link>
    </div>
  )
}
