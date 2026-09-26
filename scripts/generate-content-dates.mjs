/**
 * Generates data/content-dates.json - a map of URL path to the date its
 * source last actually changed, taken from git.
 *
 * Why this exists: app/sitemap.ts used to stamp every URL with one of three
 * hardcoded constants, so 228 of 237 URLs claimed the same lastmod while the
 * repo was being committed to daily. Google was told the site had not moved
 * in months. Uniform, provably-wrong lastmod is worse than none.
 *
 * The map is generated here rather than read from git at build time because
 * the build may run against a shallow clone, where per-file history is not
 * available and every file would collapse back to a single date - silently
 * reproducing the bug this fixes.
 *
 * Routes that render from a shared data module inherit that module's date,
 * which is correct: those pages do change together.
 *
 * Run: npm run content-dates
 */

import { execFileSync } from 'node:child_process'
import { readdirSync, existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const OUT = 'data/content-dates.json'

/** Last commit date (YYYY-MM-DD) that touched a path, or null. */
function lastCommitDate(path) {
  if (!existsSync(path)) return null
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', path], {
      encoding: 'utf8',
    }).trim()
    return out || null
  } catch {
    return null
  }
}

/** Every directory under `dir` that holds a page.tsx, as [slug, filePath]. */
function routeDirs(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('[') && !d.name.startsWith('_'))
    .map((d) => [d.name, join(dir, d.name, 'page.tsx')])
    .filter(([, f]) => existsSync(f))
}

const dates = {}

function set(urlPath, sourcePath) {
  const d = lastCommitDate(sourcePath)
  if (d) dates[urlPath] = d
}

// Per-page routes: each has its own file, so each gets its own real date.
for (const [section, base] of [
  ['guides', 'app/guides'],
  ['compare', 'app/compare'],
  ['printables', 'app/printables'],
  ['research', 'app/research'],
  ['tools', 'app/tools'],
]) {
  for (const [slug, file] of routeDirs(base)) {
    set(`/${section}/${slug}`, file)
  }
}

// Standalone pages.
for (const p of [
  '/', '/guides', '/skills', '/activities', '/compare', '/printables',
  '/gear', '/plans', '/quiz', '/checklist', '/glossary', '/about',
  '/how-it-works', '/faq', '/contact', '/research', '/tools',
  '/affiliate-disclosure', '/privacy', '/terms',
]) {
  const file = p === '/' ? 'app/page.tsx' : `app${p}/page.tsx`
  set(p, file)
}

// Data-driven sections: every entry renders from one shared module, so the
// module's own commit date is the honest answer for all of them.
const SHARED = [
  ['app/skills', 'lib/skills/data.ts'],
  ['app/activities', 'lib/activities/data.ts'],
  ['app/plans', 'lib/plan-templates.ts'],
  ['app/printables', 'lib/printables'],
  ['app/gear', 'lib/gear-sets.ts'],
  ['app/trip-pack', 'lib/plan-templates.ts'],
  // Guide category hubs (/guides/basics etc) render from the guide catalogue.
  // Individual /guides/<slug> pages match their own file above and never
  // reach this fallback.
  ['app/guides', 'lib/guides'],
]
for (const [route, source] of SHARED) {
  const d = lastCommitDate(source)
  if (d) dates[`__shared__${route}`] = d
}

const sorted = Object.fromEntries(Object.entries(dates).sort(([a], [b]) => a.localeCompare(b)))
writeFileSync(OUT, JSON.stringify(sorted, null, 2) + '\n')

const real = Object.keys(sorted).filter((k) => !k.startsWith('__shared__')).length
const distinct = new Set(Object.values(sorted)).size
console.log(`✓ ${OUT}: ${real} URL dates, ${distinct} distinct days`)
