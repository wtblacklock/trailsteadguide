/**
 * Real last-modified dates for content routes.
 *
 * Backed by data/content-dates.json, generated from git history by
 * `npm run content-dates`. This is the single source of truth for freshness:
 * the sitemap's lastmod, the Article JSON-LD dateModified, and the visible
 * "Last updated" line all read from here.
 *
 * Before this existed, each of those surfaces carried its own hardcoded
 * constant, so the site told Google and readers that nothing had changed
 * since April while the repo was committed to daily.
 *
 * The map is generated ahead of the build rather than read from git during
 * it: a build can run against a shallow clone, where per-file history
 * collapses to a single date and would silently restore the bug.
 */

import CONTENT_DATES from '@/data/content-dates.json'

const DATES: Record<string, string> = CONTENT_DATES

/**
 * Sections whose pages all render from one shared data module. Every entry
 * inherits that module's commit date, which is honest - those pages change
 * together. Order matters only in that a more specific exact-path match in
 * DATES always wins first.
 */
const SHARED_SECTIONS: ReadonlyArray<readonly [string, string]> = [
  ['/skills', '__shared__app/skills'],
  ['/activities', '__shared__app/activities'],
  ['/plans', '__shared__app/plans'],
  ['/printables', '__shared__app/printables'],
  ['/gear', '__shared__app/gear'],
  ['/trip-pack', '__shared__app/trip-pack'],
  // Only the category hubs reach this; each /guides/<slug> matches its own file.
  ['/guides', '__shared__app/guides'],
]

/**
 * The date a route's source actually last changed, or undefined when we have
 * no record of it. Callers supply their own fallback.
 */
export function contentDate(path: string): string | undefined {
  const clean = path.startsWith('http') ? new URL(path).pathname : path
  const key = clean.length > 1 && clean.endsWith('/') ? clean.slice(0, -1) : clean
  if (DATES[key]) return DATES[key]
  for (const [prefix, sharedKey] of SHARED_SECTIONS) {
    if (key === prefix || key.startsWith(`${prefix}/`)) return DATES[sharedKey]
  }
  return undefined
}
