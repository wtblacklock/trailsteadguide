import { SKILLS } from './data'
import { SKILL_CATEGORIES, getCategoryBySlug } from './categories'
import type { Skill, SkillCategory, SkillCategoryId } from './types'

const SKILL_BY_KEY: Record<string, Skill> = Object.fromEntries(
  SKILLS.map((s) => [`${s.category}/${s.slug}`, s]),
)

const SKILLS_BY_CATEGORY: Record<SkillCategoryId, Skill[]> = SKILL_CATEGORIES.reduce(
  (acc, cat) => {
    acc[cat.id] = SKILLS.filter((s) => s.category === cat.id)
    return acc
  },
  {} as Record<SkillCategoryId, Skill[]>,
)

/**
 * Look up a skill by its category and skill slug. Returns null when no
 * matching skill exists — used by the per-skill route to trigger 404.
 */
export function getSkillBySlugs(categorySlug: string, skillSlug: string): Skill | null {
  const category = getCategoryBySlug(categorySlug)
  if (!category) return null
  const key = `${category.id}/${skillSlug}`
  return SKILL_BY_KEY[key] ?? null
}

/**
 * All skills assigned to a given category, in dataset order.
 */
export function getSkillsByCategoryId(id: SkillCategoryId): Skill[] {
  return SKILLS_BY_CATEGORY[id] ?? []
}

/**
 * Categories that have at least one skill. Used by the hub grid so we
 * never link to an empty category page.
 */
export function getPopulatedCategories(): SkillCategory[] {
  return SKILL_CATEGORIES.filter((c) => (SKILLS_BY_CATEGORY[c.id]?.length ?? 0) > 0)
}

/**
 * Look up a skill by its plan-template reference slug, e.g.
 * `knots/taut-line-hitch`. Returns null for malformed slugs,
 * unknown categories, or unknown skills.
 */
export function getSkillByRef(
  ref: string,
): { skill: Skill; category: SkillCategory } | null {
  const slash = ref.indexOf('/')
  if (slash <= 0 || slash === ref.length - 1) return null
  const categorySlug = ref.slice(0, slash)
  const skillSlug = ref.slice(slash + 1)
  const category = getCategoryBySlug(categorySlug)
  if (!category) return null
  const skill = getSkillBySlugs(categorySlug, skillSlug)
  if (!skill) return null
  return { skill, category }
}

export { SKILLS, SKILL_CATEGORIES }
