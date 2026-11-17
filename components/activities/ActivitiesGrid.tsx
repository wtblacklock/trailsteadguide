'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { ACTIVITIES } from '@/lib/activities/data'
import { filterActivities, hasAnyFilter, parseActivityFilters } from '@/lib/activities/filters'
import ActivitiesGridView from './ActivitiesGridView'

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

  return <ActivitiesGridView activities={activities} isFiltered={isFiltered} />
}
