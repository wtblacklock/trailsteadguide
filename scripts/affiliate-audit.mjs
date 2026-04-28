#!/usr/bin/env node
/**
 * Affiliate audit — emits two CSVs the operator opens in Sheets to drive
 * curation and research, plus a stdout summary that calls out gaps.
 *
 *   node scripts/affiliate-audit.mjs
 *
 * Outputs:
 *   data/affiliate-audit.csv     — per-product registry view
 *   data/affiliate-coverage.csv  — per-guide × per-slot worksheet with
 *                                  image_url and a Reddit research query
 *                                  on every blank row
 *
 * Pure node stdlib — no npm install required.
 *
 * The slot config (which slots exist, which apply to which guides, which
 * tags map to which slots) MIRRORS lib/affiliate/gear-slots.ts. If you
 * add or rename a slot there, update the SLOT_CONFIG block below.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = process.cwd()

// ---------- SLOT_CONFIG (mirror of lib/affiliate/gear-slots.ts) ------------

const GEAR_SLOTS = [
  { id: 'TENT', label: 'Tent', researchQuery: 'best family tent first-time camping' },
  { id: 'SLEEP_BAG', label: 'Sleeping bag', researchQuery: 'best 3-season sleeping bag car camping' },
  { id: 'SLEEP_SURFACE', label: 'Sleep surface', researchQuery: 'best sleeping pad family car camping' },
  { id: 'STOVE', label: 'Stove', researchQuery: 'best 2 burner propane stove car camping' },
  { id: 'COOKWARE', label: 'Cookware', researchQuery: 'best camping cookware set family' },
  { id: 'COOLER', label: 'Cooler', researchQuery: 'best cooler for car camping family' },
  { id: 'LIGHTING', label: 'Lighting', researchQuery: 'best camping lantern beginner' },
  { id: 'CHAIR', label: 'Chair', researchQuery: 'best camping chair family' },
  { id: 'CANOPY', label: 'Canopy / shade', researchQuery: 'best pop up canopy camping shade' },
  { id: 'RAIN_GEAR', label: 'Rain gear', researchQuery: 'best tarp setup rain camping' },
  { id: 'WINTER_GEAR', label: 'Cold-weather gear', researchQuery: 'winter car camping sleeping bag 0 degree' },
  { id: 'HOT_GEAR', label: 'Hot-weather gear', researchQuery: 'best tent fan summer camping' },
  { id: 'DOG_GEAR', label: 'Dog gear', researchQuery: 'dog camping gear tie out water bowl' },
  { id: 'KID_GEAR', label: 'Kid-specific gear', researchQuery: 'kids camping gear sleeping bag headlamp' },
  { id: 'SAFETY', label: 'Safety / first aid', researchQuery: 'best first aid kit camping family' },
  { id: 'POWER', label: 'Power / charging', researchQuery: 'best power bank camping' },
  { id: 'TRASH', label: 'Trash / cleanup', researchQuery: 'collapsible camping trash can' },
]

const SLOT_BY_ID = Object.fromEntries(GEAR_SLOTS.map((s) => [s.id, s]))

const TAG_TO_SLOT = {
  tent: 'TENT',
  'sleeping-bag': 'SLEEP_BAG',
  'sleeping-pad': 'SLEEP_SURFACE',
  'air-mattress': 'SLEEP_SURFACE',
  cot: 'SLEEP_SURFACE',
  stove: 'STOVE',
  cooler: 'COOLER',
  lantern: 'LIGHTING',
  headlamp: 'LIGHTING',
  'lantern-hanger': 'LIGHTING',
  chair: 'CHAIR',
  canopy: 'CANOPY',
  trash: 'TRASH',
}

const BASE_SLOTS = ['TENT', 'SLEEP_BAG', 'SLEEP_SURFACE', 'STOVE', 'COOLER', 'LIGHTING', 'CHAIR', 'SAFETY']

const SCENARIO_RULES = [
  { keywords: ['heatwave', 'summer', 'desert', 'texas', 'florida', 'california'], addSlots: ['CANOPY', 'HOT_GEAR'] },
  { keywords: ['winter', 'fall', 'spring', 'turns'], addSlots: ['WINTER_GEAR'] },
  { keywords: ['rain', 'turns', 'pacific-northwest', 'appalachians', 'northeast'], addSlots: ['RAIN_GEAR'] },
  { keywords: ['dogs'], addSlots: ['DOG_GEAR'] },
  { keywords: [], addSlots: ['KID_GEAR'] }, // family-focused site — KID_GEAR sitewide
  { keywords: ['weekend', 'how-to-plan', 'first-camping-trip'], addSlots: ['POWER'] },
]

function slotsForGuide(slug) {
  const set = new Set(BASE_SLOTS)
  const lower = slug.toLowerCase()
  for (const rule of SCENARIO_RULES) {
    const matches = rule.keywords.length === 0 || rule.keywords.some((k) => lower.includes(k))
    if (matches) for (const s of rule.addSlots) set.add(s)
  }
  return GEAR_SLOTS.map((s) => s.id).filter((id) => set.has(id))
}

function slotForProduct(product) {
  for (const tag of product.tags) {
    if (TAG_TO_SLOT[tag]) return TAG_TO_SLOT[tag]
  }
  return null
}

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
      imageUrl: get(/imageUrl:\s*'([^']+)'/),
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
    // Skip the top-level page.tsx (the index) and any [dynamic] route segments
    .filter((slug) => !slug.startsWith('[') && !slug.startsWith('.') && !slug.endsWith('.tsx'))
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
    'id', 'name', 'asin', 'canonical_url', 'image_url',
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
      p.imageUrl || '',
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

// ---------- guide × slot coverage CSV (the curation worksheet) -------------

function buildCoverageCsv(products, guideMap) {
  const productById = Object.fromEntries(products.map((p) => [p.id, p]))

  const headers = [
    'guide_slug', 'slot_id', 'slot_label', 'status',
    'current_product_id', 'current_product_name',
    'current_asin', 'current_amazon_url', 'current_image_url',
    'current_tier', 'current_price',
    'research_query',
    'candidate_asin', 'candidate_name', 'candidate_image_url', 'candidate_price',
    'notes',
  ]
  const rows = [headers.join(',')]

  // Sort guides for stable diffs
  const guideSlugs = Object.keys(guideMap).concat(
    listGuidePages().map((g) => g.slug),
  )
  const uniqueGuides = [...new Set(guideSlugs)].sort()

  for (const slug of uniqueGuides) {
    const productIds = guideMap[slug] || []
    // Index this guide's current products by inferred slot
    const slotToProducts = {}
    for (const pid of productIds) {
      const p = productById[pid]
      if (!p) continue
      const slot = slotForProduct(p)
      if (!slot) continue
      if (!slotToProducts[slot]) slotToProducts[slot] = []
      slotToProducts[slot].push(p)
    }

    for (const slotId of slotsForGuide(slug)) {
      const slotMeta = SLOT_BY_ID[slotId]
      const filledProducts = slotToProducts[slotId] || []

      if (filledProducts.length === 0) {
        // Empty slot — the curation surface
        rows.push([
          slug, slotId, slotMeta.label, 'EMPTY',
          '', '', '', '', '', '', '',
          slotMeta.researchQuery,
          '', '', '', '',
          'Needs research — fill candidate_* columns',
        ].map(csvEscape).join(','))
      } else {
        // One row per product currently in the slot. Multiple products per
        // slot is fine (e.g. budget chair + premium rocker on the same guide).
        for (const p of filledProducts) {
          const tags = partitionTags(p.tags)
          rows.push([
            slug, slotId, slotMeta.label, 'FILLED',
            p.id, p.name,
            p.asin || '', canonicalUrl(p.asin), p.imageUrl || '',
            tags.tier.join('|'), p.priceRange,
            slotMeta.researchQuery,
            '', '', '', '',
            '',
          ].map(csvEscape).join(','))
        }
      }
    }
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

  const productCsv = buildCsv(products, gearSets, guideMap)
  const coverageCsv = buildCoverageCsv(products, guideMap)

  if (process.argv.includes('--stdout')) {
    process.stdout.write(productCsv)
    process.stdout.write('\n--- coverage ---\n')
    process.stdout.write(coverageCsv)
    return
  }

  mkdirSync(join(ROOT, 'data'), { recursive: true })
  writeFileSync(join(ROOT, 'data/affiliate-audit.csv'), productCsv)
  writeFileSync(join(ROOT, 'data/affiliate-coverage.csv'), coverageCsv)

  // Coverage row counts: how many slots are filled vs empty across all guides.
  const coverageLines = coverageCsv.trim().split('\n').slice(1)
  const filled = coverageLines.filter((l) => l.includes(',FILLED,')).length
  const empty = coverageLines.filter((l) => l.includes(',EMPTY,')).length

  console.log(`✓ ${products.length} products → data/affiliate-audit.csv`)
  console.log(`✓ ${coverageLines.length} (guide × slot) rows → data/affiliate-coverage.csv`)
  console.log(`  ${filled} filled, ${empty} empty (${Math.round((filled / (filled + empty)) * 100)}% covered)`)
  console.log(`  ${Object.keys(guideMap).length} guides reference products`)
  console.log(`  ${Object.keys(gearSets).length} gear sets`)
  console.log(buildCoverageReport(products))
  console.log(buildPlanCoverageReport(products))
}

main()
