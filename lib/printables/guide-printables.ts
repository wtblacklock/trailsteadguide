import { GUIDE_PRINTABLES } from '@/data/guide-printables'
import { getPrintableBySlug } from './data'
import type { Printable } from './types'

export { GUIDE_PRINTABLES }

/** Resolved printables for a guide, in curated order. Empty array if the guide has no entry. */
export function getPrintablesForGuide(guideSlug: string): Printable[] {
  const slugs = GUIDE_PRINTABLES[guideSlug] ?? []
  return slugs
    .map((slug) => getPrintableBySlug(slug))
    .filter((p): p is Printable => p !== null)
}

/**
 * Reverse lookup: every guide slug that lists the given printable.
 * Powers the "Guides that use this printable" section on /printables/[slug].
 */
export function getGuidesLinkedToPrintable(printableSlug: string): string[] {
  return Object.keys(GUIDE_PRINTABLES).filter((guideSlug) =>
    GUIDE_PRINTABLES[guideSlug].includes(printableSlug),
  )
}

/** Every printable slug referenced by at least one guide - used only by the completeness test. */
export function allGuidePrintableSlugs(): string[] {
  return Array.from(new Set(Object.values(GUIDE_PRINTABLES).flat()))
}
