#!/usr/bin/env node
/**
 * Moves the next due guide out of `content-queue/guides/` and onto the site.
 *
 * Each queued guide is a folder named `<publishOn>--<slug>/` holding:
 *   - page.tsx   the finished `app/guides/<slug>/page.tsx`, with
 *                dateModified set to its publishOn date
 *   - queue.json { publishOn, guide, gear, reciprocal } - see
 *                content-queue/README.md for the shape
 *
 * Publishing one guide:
 *   1. copies page.tsx to app/guides/<slug>/page.tsx (dateModified is
 *      rewritten to the actual publish date if it differs)
 *   2. appends `guide` to GUIDES in lib/guides/data.ts
 *   3. adds `gear` to GUIDE_GEAR in data/guide-gear.ts (if any)
 *   4. applies each `reciprocal` relatedGuides link on an existing guide
 *   5. deletes the queue folder
 *
 * Usage:
 *   node scripts/publish-next-queued-guide.mjs                # today
 *   node scripts/publish-next-queued-guide.mjs --date 2026-11-03
 *   node scripts/publish-next-queued-guide.mjs --dry-run
 *
 * Prints `PUBLISHED <slug>` on success, or `NOTHING_DUE` (exit 0) when no
 * queued guide has a publishOn date on or before the given date.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = process.cwd()
const QUEUE_DIR = join(ROOT, 'content-queue/guides')
const DATA_FILE = join(ROOT, 'lib/guides/data.ts')
const GEAR_FILE = join(ROOT, 'data/guide-gear.ts')

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const dateArg = args.includes('--date') ? args[args.indexOf('--date') + 1] : null

function localToday() {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

const today = dateArg ?? localToday()
if (!/^\d{4}-\d{2}-\d{2}$/.test(today)) {
  console.error(`Bad --date: ${today}`)
  process.exit(1)
}

const q = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`

function serializeGuide(g) {
  const lines = ['  {']
  lines.push(`    slug: ${q(g.slug)},`)
  lines.push(`    category: ${q(g.category)},`)
  lines.push(`    title: ${q(g.title)},`)
  lines.push(`    description: ${q(g.description)},`)
  if (g.eyebrow) lines.push(`    eyebrow: ${q(g.eyebrow)},`)
  if (g.shortLabel) lines.push(`    shortLabel: ${q(g.shortLabel)},`)
  if (g.metaTitle) lines.push(`    metaTitle: ${q(g.metaTitle)},`)
  if (g.metaDescription) lines.push(`    metaDescription:\n      ${q(g.metaDescription)},`)
  if (g.relatedGuides?.length) lines.push(`    relatedGuides: [${g.relatedGuides.map(q).join(', ')}],`)
  lines.push('  },')
  return lines.join('\n')
}

function serializeGear(slug, gear) {
  const rows = gear.map((e) => `    { slot: ${q(e.slot)}, productId: ${q(e.productId)} },`)
  return [`  ${q(slug)}: [`, ...rows, '  ],'].join('\n')
}

/** Inserts `block` on its own lines just before the last line matching `closer`. */
function insertBeforeLast(source, closer, block, file) {
  const idx = source.lastIndexOf(`\n${closer}\n`)
  if (idx === -1) throw new Error(`Could not find closing "${closer}" in ${file}`)
  return `${source.slice(0, idx)}\n${block}${source.slice(idx)}`
}

function applyReciprocal(source, { slug, replace }, newSlug) {
  const start = source.indexOf(`slug: ${q(slug)},`)
  if (start === -1) return { source, note: `reciprocal target ${slug} not found, skipped` }
  const nextEntry = source.indexOf('\n  {', start)
  const end = nextEntry === -1 ? source.length : nextEntry
  const block = source.slice(start, end)
  const m = /relatedGuides: \[([^\]]*)\]/.exec(block)
  if (!m) return { source, note: `${slug} has no relatedGuides array, skipped` }
  const items = m[1]
    .split(',')
    .map((s) => s.trim().replace(/^'|'$/g, ''))
    .filter(Boolean)
  if (items.includes(newSlug)) return { source, note: `${slug} already links ${newSlug}` }
  const i = replace ? items.indexOf(replace) : -1
  let note
  if (i !== -1) {
    items[i] = newSlug
    note = `${slug}: replaced ${replace} with ${newSlug}`
  } else {
    items.push(newSlug)
    note = `${slug}: appended ${newSlug}`
  }
  const updated = block.replace(m[0], `relatedGuides: [${items.map(q).join(', ')}]`)
  return { source: source.slice(0, start) + updated + source.slice(end), note }
}

const due = (existsSync(QUEUE_DIR) ? readdirSync(QUEUE_DIR) : [])
  .filter((name) => /^\d{4}-\d{2}-\d{2}--/.test(name))
  .sort()
  .filter((name) => name.slice(0, 10) <= today)

if (due.length === 0) {
  console.log('NOTHING_DUE')
  process.exit(0)
}

const folder = join(QUEUE_DIR, due[0])
const item = JSON.parse(readFileSync(join(folder, 'queue.json'), 'utf8'))
const { guide, gear = [], reciprocal = [] } = item
const target = join(ROOT, 'app/guides', guide.slug)

if (existsSync(target)) throw new Error(`app/guides/${guide.slug} already exists`)

let data = readFileSync(DATA_FILE, 'utf8')
if (data.includes(`slug: ${q(guide.slug)},`)) throw new Error(`${guide.slug} already in lib/guides/data.ts`)

data = insertBeforeLast(data, ']', serializeGuide(guide), DATA_FILE)
const notes = []
for (const r of reciprocal) {
  const res = applyReciprocal(data, r, guide.slug)
  data = res.source
  notes.push(res.note)
}

let gearSource = readFileSync(GEAR_FILE, 'utf8')
if (gear.length) gearSource = insertBeforeLast(gearSource, '}', serializeGear(guide.slug, gear), GEAR_FILE)

let page = readFileSync(join(folder, 'page.tsx'), 'utf8')
page = page.replace(`dateModified="${item.publishOn}"`, `dateModified="${today}"`)

if (dryRun) {
  console.log(`DRY_RUN would publish ${guide.slug} from ${due[0]}`)
  for (const n of notes) console.log(`  ${n}`)
  process.exit(0)
}

mkdirSync(target, { recursive: true })
writeFileSync(join(target, 'page.tsx'), page)
writeFileSync(DATA_FILE, data)
writeFileSync(GEAR_FILE, gearSource)
rmSync(folder, { recursive: true })

console.log(`PUBLISHED ${guide.slug}`)
for (const n of notes) console.log(`  ${n}`)
console.log(`  ${due.length - 1} more due, ${readdirSync(QUEUE_DIR).filter((n) => /^\d{4}/.test(n)).length} left in queue`)
