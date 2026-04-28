#!/usr/bin/env node
/**
 * Affiliate audit — extracts the current state of the affiliate program
 * from the source registry, the gear sets, and every guide page that
 * uses <AmazonLink productId="...">. Outputs a single CSV worksheet
 * the operator can open in Sheets to drive research and product swaps.
 *
 *   node scripts/affiliate-audit.mjs            # writes data/affiliate-audit.csv
 *   node scripts/affiliate-audit.mjs --stdout   # prints CSV to stdout
 *
 * Pure node stdlib — no npm install required, runs anywhere with node.
 *
 * Output columns:
 *   id, name, asin, canonical_url, short_url, category, tier, price,
 *   plan_slugs, gear_sets, guide_count, guides, audience, scenarios,
 *   product_type, notes
 *
 * Plus a "Gaps" section appended to the CSV listing audience/scenario
 * tags that are referenced by the type system but have ≤1 product
 * tagged for them — those are the under-served slots.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = process.cwd()

// ---------- helpers ---------------------------------------------------------

function read(p) {
  return readFileSync(join(ROOT, p), 'utf8')
}

function csvEscape(v) {
  if (v == null) return ''
  const s = String(v)
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`
  }
  return s
}

// ---------- parse affiliate-products.ts -------------------------------------
// Pulls each product literal as a chunk, then extracts string fields with
// regex. Dumb but predictable; the source file is hand-edited literals.

function parseProducts(src) {
  const products = []
  const blockRe = /\{\s*id:\s*'([^']+)'[^}]*?\},/gs
  let m
  while ((m = blockRe.exec(src))) {
    const block = m[0]
    const get = (re) => {
      const x = block.match(re)
      return x ? x[1] : undefined
    }
    const list = (re) => {
      const x = block.match(re)
      if (!x) return []
      return x[1]
        .split(',')
        .map((s) => s.replace(/['"\s]/g, ''))
        .filter(Boolean)
    }
    products.push({
      id: m[1],
      name: get(/name:\s*'([^']+)'/),
      asin: get(/amazonAsin:\s*'([^']+)'/),
      affiliateUrl: get(/affiliateUrl:\s*'([^']+)'/),
      category: get(/category:\s*'([^']+)'/),
      priceRange: get(/priceRange:\s*'([^']+)'/),
      templateSlugs: list(/templateSlugs:\s*\[([^\]]*)\]/),
      tags: list(/tags:\s*\[([^\]]*)\]/),
    })
  }
  return products
}

// ---------- parse gear-sets.ts ---------------------------------------------

function parseGearSets(src) {
  const sets = {}
  const setRe = /(\w+):\s*\{\s*id:\s*'(\w+)'[^}]*?entries:\s*\[([\s\S]*?)\][^}]*?\}/g
  let m
  while ((m = setRe.exec(src))) {
    const id = m[2]
    const entries = m[3]
    const ids = []
    const entryRe = /productId:\s*'([^']+)'/g
    let e
    while ((e = entryRe.exec(entries))) ids.push(e[1])
    sets[id] = ids
  }
  return sets
}

// ---------- scan guides for productId="..." --------------------------------

function listGuidePages() {
  const dir = join(ROOT, 'app/guides')
  return readdirSync(dir)
    .map((slug) => ({ slug, path: join(dir, slug, 'page.tsx') }))
    .filter((g) => {
      try {
        return statSync(g.path).isFile()
      } catch {
        return false
      }
    })
}

function productsInGuide(src) {
  const ids = new Set()
  const re = /productId\s*=\s*"([^"]+)"/g
  let m
  while ((m = re.exec(src))) ids.add(m[1])
  return [...ids]
}

// ---------- derive helpers --------------------------------------------------

const AUDIENCE_TAGS = new Set(['family', 'solo', 'beginner', 'with-kids', 'with-dogs'])
const SCENARIO_TAGS = new Set(['comfort', 'heat-friendly', 'rain-ready', 'cold-ready', 'shade'])
const TIER_TAGS = new Set(['budget', 'mid-range', 'premium'])
const TYPE_TAGS = new Set([
  'tent', 'sleeping-bag', 'sleeping-pad', 'air-mattress', 'cot',
  'stove', 'cooler', 'lantern', 'headlamp', 'chair',
  'canopy', 'projector', 'trash', 'lantern-hanger',
])

function partitionTags(tags) {
  const out = { type: [], tier: [], audience: [], scenario: [] }
  for (const t of tags) {
    if (TYPE_TAGS.has(t)) out.type.push(t)
    else if (TIER_TAGS.has(t)) out.tier.push(t)
    else if (AUDIENCE_TAGS.has(t)) out.audience.push(t)
    else if (SCENARIO_TAGS.has(t)) out.scenario.push(t)
  }
  return out
}

function canonicalUrl(asin) {
  if (!asin) return ''
  return `https://www.amazon.com/dp/${asin}?tag=trailsteadgui-20`
}

function deriveNotes(p, guideCount) {
  const notes = []
  if (p.templateSlugs.length === 0) notes.push('not assigned to any plan')
  if (guideCount === 0) notes.push('not used in any guide')
  if (p.affiliateUrl && p.affiliateUrl.includes('amzn.to')) {
    notes.push('short link strips per-page subtag')
  }
  if (!p.asin) notes.push('no ASIN — search fallback only')
  return notes.join('; ')
}

// ---------- build CSV -------------------------------------------------------

function buildCsv(products, gearSets, guideMap) {
  // Reverse-index product → gear sets it belongs to
  const productToSets = {}
  for (const [setId, productIds] of Object.entries(gearSets)) {
    for (const pid of productIds) {
      if (!productToSets[pid]) productToSets[pid] = []
      productToSets[pid].push(setId)
    }
  }

  // Reverse-index product → guides it appears in
  const productToGuides = {}
  for (const [slug, ids] of Object.entries(guideMap)) {
    for (const id of ids) {
      if (!productToGuides[id]) productToGuides[id] = []
      productToGuides[id].push(slug)
    }
  }

  const headers = [
    'id', 'name', 'asin', 'canonical_url', 'short_url',
    'category', 'tier', 'price',
    'plan_slugs', 'gear_sets', 'guide_count', 'guides',
    'audience', 'scenarios', 'product_type', 'notes',
  ]
  const rows = [headers.join(',')]

  for (const p of products) {
    const tags = partitionTags(p.tags)
    const guides = productToGuides[p.id] || []
    const sets = productToSets[p.id] || []
    rows.push([
      p.id,
      p.name,
      p.asin || '',
      canonicalUrl(p.asin),
      p.affiliateUrl || '',
      p.category,
      tags.tier.join('|'),
      p.priceRange,
      p.templateSlugs.join('|'),
      sets.join('|'),
      guides.length,
      guides.join('|'),
      tags.audience.join('|'),
      tags.scenario.join('|'),
      tags.type.join('|'),
      deriveNotes(p, guides.length),
    ].map(csvEscape).join(','))
  }

  return rows.join('\n') + '\n'
}

// ---------- coverage summary -----------------------------------------------

function buildCoverageReport(products) {
  const tagCount = {}
  for (const p of products) {
    for (const t of p.tags) tagCount[t] = (tagCount[t] || 0) + 1
  }
  const lines = []
  lines.push('')
  lines.push('=== Tag coverage (count of products per tag) ===')
  const allTags = [...TIER_TAGS, ...AUDIENCE_TAGS, ...SCENARIO_TAGS, ...TYPE_TAGS]
  for (const t of allTags) {
    const n = tagCount[t] || 0
    const flag = n === 0 ? ' ⚠️  empty' : n === 1 ? ' ⚠️  thin' : ''
    lines.push(`  ${t.padEnd(18)} ${String(n).padStart(2)}${flag}`)
  }
  return lines.join('\n')
}

function buildPlanCoverageReport(products) {
  const PLANS = ['backyard-test', 'first-night-camp', 'first-weekend-camp', 'easy-family-basecamp']
  const lines = []
  lines.push('')
  lines.push('=== Plan coverage (products per plan) ===')
  for (const plan of PLANS) {
    const list = products.filter((p) => p.templateSlugs.includes(plan))
    lines.push(`  ${plan.padEnd(22)} ${list.length} products`)
  }
  const orphans = products.filter((p) => p.templateSlugs.length === 0)
  if (orphans.length) {
    lines.push('')
    lines.push(`=== Orphan products (no plan assigned) — ${orphans.length} ===`)
    for (const p of orphans) lines.push(`  ${p.id.padEnd(28)} ${p.name}`)
  }
  return lines.join('\n')
}

// ---------- main ------------------------------------------------------------

function main() {
  const productsSrc = read('lib/affiliate-products.ts')
  const gearSrc = read('lib/gear-sets.ts')
  const products = parseProducts(productsSrc)
  const gearSets = parseGearSets(gearSrc)

  const guides = listGuidePages()
  const guideMap = {}
  for (const g of guides) {
    const ids = productsInGuide(read(`app/guides/${g.slug}/page.tsx`))
    if (ids.length) guideMap[g.slug] = ids
  }

  const csv = buildCsv(products, gearSets, guideMap)

  if (process.argv.includes('--stdout')) {
    process.stdout.write(csv)
  } else {
    mkdirSync(join(ROOT, 'data'), { recursive: true })
    const outPath = 'data/affiliate-audit.csv'
    writeFileSync(join(ROOT, outPath), csv)
    console.log(`✓ ${products.length} products → ${outPath}`)
    console.log(`  ${Object.keys(guideMap).length} guides reference products`)
    console.log(`  ${Object.keys(gearSets).length} gear sets`)
    console.log(buildCoverageReport(products))
    console.log(buildPlanCoverageReport(products))
  }
}

main()
