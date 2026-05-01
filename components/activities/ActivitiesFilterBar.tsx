'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import {
  AGE_OPTIONS,
  CATEGORY_OPTIONS,
  ENERGY_OPTIONS,
  GROUP_OPTIONS,
  TIME_OPTIONS,
  hasAnyFilter,
  parseActivityFilters,
} from '@/lib/activities/filters'
import { FILTER_KEYS, type FilterKey } from '@/lib/activities/types'

const OPTION_GROUPS: Record<FilterKey, { value: string; label: string }[]> = {
  age: AGE_OPTIONS,
  group: GROUP_OPTIONS,
  energy: ENERGY_OPTIONS,
  time: TIME_OPTIONS,
  category: CATEGORY_OPTIONS,
}

const PLACEHOLDERS: Record<FilterKey, string> = {
  age: 'Any age',
  group: 'Any size',
  energy: 'Any energy',
  time: 'Any time',
  category: 'All types',
}

export default function ActivitiesFilterBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const filters = parseActivityFilters({
    age: searchParams.get('age') ?? undefined,
    group: searchParams.get('group') ?? undefined,
    energy: searchParams.get('energy') ?? undefined,
    time: searchParams.get('time') ?? undefined,
    category: searchParams.get('category') ?? undefined,
  })
  const anyActive = hasAnyFilter(filters)

  const updateFilter = useCallback(
    (key: FilterKey, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === '') params.delete(key)
      else params.set(key, value)
      const qs = params.toString()
      router.replace(qs ? `/activities?${qs}` : '/activities', { scroll: false })
    },
    [router, searchParams],
  )

  const clearAll = useCallback(() => {
    router.replace('/activities', { scroll: false })
  }, [router])

  return (
    <nav
      id="filter-bar"
      aria-label="Filter activities"
      className="sticky top-16 z-40 bg-[#F5F3EE]/95 backdrop-blur-sm border-y border-stone-200/60 scroll-mt-16"
    >
      <div className="max-w-page mx-auto px-6 py-3 md:py-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
          {FILTER_KEYS.map((key) => {
            const active = filters[key] ?? ''
            const options = OPTION_GROUPS[key]
            return (
              <FilterSelect
                key={key}
                filterKey={key}
                value={active}
                placeholder={PLACEHOLDERS[key]}
                options={options}
                onChange={(v) => updateFilter(key, v)}
              />
            )
          })}
          {anyActive && (
            <button
              type="button"
              onClick={clearAll}
              className="shrink-0 ml-1 inline-flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900 px-3 py-1.5"
            >
              Clear all
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
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

interface FilterSelectProps {
  filterKey: FilterKey
  value: string
  placeholder: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
}

function FilterSelect({ filterKey, value, placeholder, options, onChange }: FilterSelectProps) {
  const isActive = value !== ''
  return (
    <label className="shrink-0 relative">
      <span className="sr-only">{placeholder}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none cursor-pointer pl-3.5 pr-9 py-1.5 rounded-full text-sm transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 ${
          isActive
            ? 'bg-stone-900 text-white border border-stone-900'
            : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'
        }`}
        data-filter={filterKey}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${
          isActive ? 'text-white' : 'text-stone-500'
        }`}
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </label>
  )
}
