import { SKILL_CATEGORIES } from './categories'
import type { Difficulty, SafetyTone, Skill, SkillCategoryId } from './types'

export type SafetyFilter = Extract<SafetyTone, 'standard' | 'critical'>

export type SkillFilters = {
  category?: SkillCategoryId
  difficulty?: Difficulty
  safety?: SafetyFilter
}

export const SKILL_FILTER_KEYS = ['category', 'difficulty', 'safety'] as const
export type SkillFilterKey = (typeof SKILL_FILTER_KEYS)[number]

export const CATEGORY_FILTER_OPTIONS: { value: SkillCategoryId; label: string }[] =
  SKILL_CATEGORIES.map((c) => ({ value: c.id, label: c.label }))

export const DIFFICULTY_FILTER_OPTIONS: { value: Difficulty; label: string }[] = [
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
]

export const SAFETY_FILTER_OPTIONS: { value: SafetyFilter; label: string }[] = [
  { value: 'standard', label: 'Standard' },
  { value: 'critical', label: 'Critical-safety first' },
]

export const SKILL_FILTER_LABELS: Record<SkillFilterKey, string> = {
  category: 'Category',
  difficulty: 'Difficulty',
  safety: 'Safety',
}

const CATEGORY_VALUES = new Set<SkillCategoryId>(CATEGORY_FILTER_OPTIONS.map((o) => o.value))
const DIFFICULTY_VALUES = new Set<Difficulty>(DIFFICULTY_FILTER_OPTIONS.map((o) => o.value))
const SAFETY_VALUES = new Set<SafetyFilter>(SAFETY_FILTER_OPTIONS.map((o) => o.value))

/**
 * Coerce a flat record of strings (typically from URL search params) into a
 * validated SkillFilters object. Unknown values are silently dropped so a
 * mistyped URL never blanks the page.
 */
export function parseSkillFilters(
  input: Partial<Record<SkillFilterKey, string | undefined>>,
): SkillFilters {
  const filters: SkillFilters = {}
  if (input.category && CATEGORY_VALUES.has(input.category as SkillCategoryId)) {
    filters.category = input.category as SkillCategoryId
  }
  if (input.difficulty && DIFFICULTY_VALUES.has(input.difficulty as Difficulty)) {
    filters.difficulty = input.difficulty as Difficulty
  }
  if (input.safety && SAFETY_VALUES.has(input.safety as SafetyFilter)) {
    filters.safety = input.safety as SafetyFilter
  }
  return filters
}

/**
 * Apply filters to a skill list. Empty filters return the full list.
 *
 * The `safety` filter treats a missing `safetyTone` as `'standard'` so any
 * skill without an explicit critical tag passes through the standard filter.
 */
export function filterSkills(skills: Skill[], filters: SkillFilters): Skill[] {
  return skills.filter((s) => {
    if (filters.category && s.category !== filters.category) return false
    if (filters.difficulty && s.difficulty !== filters.difficulty) return false
    if (filters.safety) {
      const tone: SafetyTone = s.safetyTone ?? 'standard'
      if (tone !== filters.safety) return false
    }
    return true
  })
}

export function hasAnySkillFilter(filters: SkillFilters): boolean {
  return Boolean(filters.category || filters.difficulty || filters.safety)
}
