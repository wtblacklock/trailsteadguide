import type {
  Activity,
  ActivityCategory,
  ActivityFilters,
  AgeRange,
  EnergyLevel,
  FilterKey,
  GroupSize,
  TimeRequired,
} from './types'

export const AGE_OPTIONS: { value: AgeRange; label: string }[] = [
  { value: '3-5', label: 'Ages 3–5' },
  { value: '6-8', label: 'Ages 6–8' },
  { value: '9-12', label: 'Ages 9–12' },
  { value: '13-17', label: 'Teens (13–17)' },
  { value: 'adults', label: 'Adults' },
]

export const GROUP_OPTIONS: { value: GroupSize; label: string }[] = [
  { value: 'solo', label: 'Solo' },
  { value: '2-4', label: '2–4 people' },
  { value: '5-10', label: '5–10 people' },
  { value: '10+', label: 'Large group (10+)' },
]

export const ENERGY_OPTIONS: { value: EnergyLevel; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

export const TIME_OPTIONS: { value: TimeRequired; label: string }[] = [
  { value: '5-10min', label: '5–10 min' },
  { value: '15-30min', label: '15–30 min' },
  { value: '30-60min', label: '30–60 min' },
  { value: '1hour+', label: '1+ hour' },
]

export const CATEGORY_OPTIONS: { value: ActivityCategory; label: string }[] = [
  { value: 'icebreaker', label: 'Icebreakers' },
  { value: 'campfire', label: 'Campfire Games' },
  { value: 'movement', label: 'Movement' },
  { value: 'exploration', label: 'Nature Exploration' },
  { value: 'team', label: 'Team Competitions' },
  { value: 'creative', label: 'Creative & Build' },
  { value: 'night', label: 'Night Activities' },
  { value: 'wind-down', label: 'Quiet & Wind Down' },
]

export const FILTER_LABELS: Record<FilterKey, string> = {
  age: 'Age',
  group: 'Group size',
  energy: 'Energy',
  time: 'Time',
  category: 'Category',
}

const AGE_VALUES = new Set(AGE_OPTIONS.map((o) => o.value))
const GROUP_VALUES = new Set(GROUP_OPTIONS.map((o) => o.value))
const ENERGY_VALUES = new Set(ENERGY_OPTIONS.map((o) => o.value))
const TIME_VALUES = new Set(TIME_OPTIONS.map((o) => o.value))
const CATEGORY_VALUES = new Set(CATEGORY_OPTIONS.map((o) => o.value))

/**
 * Coerce a flat record of strings (typically from URL search params) into a
 * validated ActivityFilters object. Unknown values are silently dropped so a
 * mistyped URL never blanks the page.
 */
export function parseActivityFilters(
  input: Partial<Record<FilterKey, string | undefined>>,
): ActivityFilters {
  const filters: ActivityFilters = {}
  if (input.age && AGE_VALUES.has(input.age as AgeRange)) filters.age = input.age as AgeRange
  if (input.group && GROUP_VALUES.has(input.group as GroupSize)) filters.group = input.group as GroupSize
  if (input.energy && ENERGY_VALUES.has(input.energy as EnergyLevel)) filters.energy = input.energy as EnergyLevel
  if (input.time && TIME_VALUES.has(input.time as TimeRequired)) filters.time = input.time as TimeRequired
  if (input.category && CATEGORY_VALUES.has(input.category as ActivityCategory))
    filters.category = input.category as ActivityCategory
  return filters
}

/**
 * Apply filters to an activity list. Empty filters return the full list.
 *
 * Age uses overlap semantics: an activity tagged 'all-ages' matches every age
 * filter. All other dimensions are exact-match.
 */
export function filterActivities(activities: Activity[], filters: ActivityFilters): Activity[] {
  return activities.filter((a) => {
    if (filters.age && a.ageRange !== filters.age && a.ageRange !== 'all-ages') return false
    if (filters.group && a.groupSize !== filters.group) return false
    if (filters.energy && a.energyLevel !== filters.energy) return false
    if (filters.time && a.timeRequired !== filters.time) return false
    if (filters.category && a.category !== filters.category) return false
    return true
  })
}

export function hasAnyFilter(filters: ActivityFilters): boolean {
  return Boolean(filters.age || filters.group || filters.energy || filters.time || filters.category)
}
