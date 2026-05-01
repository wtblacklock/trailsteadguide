'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { ACTIVITIES } from '@/lib/activities/data'
import { filterActivities, hasAnyFilter, parseActivityFilters } from '@/lib/activities/filters'
import ActivityCard from './ActivityCard'

export default function ActivitiesGrid() {
  const searchParams = useSearchParams()

  const { activities, isFiltered } = useMemo(() => {
    const filters = parseActivityFilters({
      age: searchParams.get('age') ?? undefined,
      group: searchParams.get('group') ?? undefined,
      energy: searchParams.get('energy') ?? undefined,
      time: searchParams.get('time') ?? undefined,
      category: searchParams.get('category') ?? undefined,
    })
    return {
      activities: filterActivities(ACTIVITIES, filters),
      isFiltered: hasAnyFilter(filters),
    }
  }, [searchParams])

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
