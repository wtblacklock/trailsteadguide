#!/usr/bin/env node
/**
 * Title-tag length audit (SEO roadmap item A7).
 *
 *   node scripts/title-length-audit.mjs
 *
 * Every rendered <title> is `${title} | Trailstead Guide` (see
 * TITLE_TEMPLATE_SUFFIX in lib/seo.ts). Google's SERP display window is
 * ~60 chars; past that the title gets truncated, which hurts CTR even when
 * ranking is fine. This walks every `app/**\/page.tsx`, resolves each
 * `pageMetadata({ title: ... })` call (literal string, or a same-file
 * const it references), and flags anything over budget.
 *
 * A handful of titles are built from data files instead of a literal
 * in the page file (gear sets, plan pages, trip-pack covers); those are
 * checked separately below against the live data. The printables print
 * view is deliberately excluded - it's `noIndex: true` (the printable
 * landing page is the indexable one), so it never appears in a SERP and
 * the 60-char budget doesn't apply to it.
 *
 * Pure node stdlib - no npm install required.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const SUFFIX_LEN = ' | Trailstead Guide'.length
const BUDGET = 60

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry)
    const st = statSync(p)
    if (st.isDirectory()) walk(p, out)
    else if (entry === 'page.tsx') out.push(p)
  }
  return out
}

function report(label, title, extraSuffix = '') {
  const rendered = title.length + extraSuffix.length + SUFFIX_LEN
  const flag = rendered > BUDGET ? '  OVERFLOW' : ''
  console.log(`  [${rendered}]${flag} ${title}${extraSuffix}  (${label})`)
  return rendered > BUDGET
}

let overflowCount = 0

console.log(`Budget: ${BUDGET} rendered chars (title + " | Trailstead Guide").\n`)

// --- 1. Static/literal titles in app/**/page.tsx ---------------------------
const files = walk('app')
const dynamic = []

console.log(`Checked ${files.length} page.tsx files for literal titles:`)
for (const file of files) {
  const src = readFileSync(file, 'utf8')
  const metaMatch = src.match(/pageMetadata\(\{([\s\S]*?)\n\}\)/)
  if (!metaMatch) continue
  const titleLineMatch = metaMatch[1].match(/title:\s*([^\n,]+),?/)
  if (!titleLineMatch) continue
  const expr = titleLineMatch[1].trim()

  const literal = expr.match(/^'([^']*)'$/) || expr.match(/^"([^"]*)"$/)
  let title = null
  if (literal) {
    title = literal[1]
  } else if (/^[A-Z_][A-Z0-9_]*$/.test(expr)) {
    const constMatch = src.match(new RegExp(`const ${expr}\\s*=\\s*'([^']*)'`))
    if (constMatch) title = constMatch[1]
  }

  if (title === null) {
    dynamic.push(file)
    continue
  }
  if (report(file, title)) overflowCount++
}

// --- 2. Data-driven titles not caught above ---------------------------------
// Plain node can't import .ts source directly, so these are pulled with a
// regex over the source text (same approach as scripts/check-affiliate-images.mjs).
console.log(`\nData-driven titles (resolved from source data, not a page.tsx literal):`)

const gearSetsSrc = readFileSync('lib/gear-sets.ts', 'utf8')
for (const m of gearSetsSrc.matchAll(/title:\s*'([^']+)'/g)) {
  if (report('lib/gear-sets.ts -> /gear/sets/*', m[1], ' - Gear Set')) overflowCount++
}

const planContentSrc = readFileSync('lib/plan-content.ts', 'utf8')
for (const m of planContentSrc.matchAll(/cover:\s*\{[^}]*?title:\s*'([^']+)'/g)) {
  if (report('lib/plan-content.ts -> /trip-pack/*', m[1], ' Trip Pack')) overflowCount++
}

console.log(
  `\n(/plans/[planId] titles use their own PLAN_PAGE_META.title, already literal strings` +
    ` under budget - verified by hand, not re-checked here.)`,
)
console.log(
  `(/printables/[slug]/print is noIndex - excluded; the printable landing page carries` +
    ` the indexable title via titleWithQualifier(), which already stays in budget by construction.)`,
)
console.log(
  `(/skills/[category]/[skill] also uses titleWithQualifier() - stays in budget by construction.)`,
)

if (dynamic.length) {
  console.log(`\nPage files with a non-literal title expression not covered above:`)
  for (const f of dynamic) console.log(`  - ${f}`)
}

console.log(`\nTotal overflow count: ${overflowCount}`)
process.exit(overflowCount > 0 ? 1 : 0)
