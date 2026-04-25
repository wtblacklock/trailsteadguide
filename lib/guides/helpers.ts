import { GUIDES } from './data'
import { GUIDE_CATEGORIES, getCategoryById, getCategoryBySlug } from './categories'
import type { Guide, GuideCategory, GuideCategoryId } from './types'

const GUIDE_BY_SLUG: Record<string, Guide> = Object.fromEntries(
  GUIDES.map((g) => [g.slug, g]),
)

const GUIDES_BY_CATEGORY: Record<GuideCategoryId, Guide[]> = GUIDE_CATEGORIES.reduce(
  (acc, cat) => {
    acc[cat.id] = GUIDES.filter((g) => g.category === cat.id)
    return acc
  },
  {} as Record<GuideCategoryId, Guide[]>,
)

/**
 * Look up a guide by its slug. Returns null when no matching guide
 * exists.
 */
export function getGuideBySlug(slug: string): Guide | null {
  return GUIDE_BY_SLUG[slug] ?? null
}

/**
 * All guides assigned to a given category, in dataset order.
 */
export function getGuidesByCategoryId(id: GuideCategoryId): Guide[] {
  return GUIDES_BY_CATEGORY[id] ?? []
}

/**
 * Categories that have at least one published guide.
 */
export function getPopulatedCategories(): GuideCategory[] {
  return GUIDE_CATEGORIES.filter((c) => (GUIDES_BY_CATEGORY[c.id]?.length ?? 0) > 0)
}

/**
 * Convenience accessor used by guide article pages: given the article
 * slug, return its category record so the page can render a breadcrumb
 * and a "Back to <Category>" link.
 */
export function getCategoryForGuide(slug: string): GuideCategory | null {
  const guide = getGuideBySlug(slug)
  if (!guide) return null
  return getCategoryById(guide.category)
}

export { GUIDES, GUIDE_CATEGORIES, getCategoryById, getCategoryBySlug }
