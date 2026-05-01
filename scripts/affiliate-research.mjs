#!/usr/bin/env node
/**
 * Reddit-driven product research helper.
 *
 * Searches camping subreddits for a query, pulls the top threads from the
 * past year, walks the comments, and tallies Amazon ASIN mentions weighted
 * by comment upvotes. Output is a ranked candidate list to drop into
 * AFFILIATE_PRODUCTS — including which candidates are already in the
 * registry vs new.
 *
 *   npm run affiliate:research -- "two burner stove car camping"
 *   npm run affiliate:research -- "rain tarp setup" --subs CampingGear,camping
 *   npm run affiliate:research -- "cot for camping" --threads 8
 *
 * Flags:
 *   --subs <csv>     Subreddits to search (default: CampingGear, camping,
 *                    CampingandHiking, GoCamping)
 *   --threads <n>    Top threads per subreddit (default: 5)
 *   --time <window>  Reddit time window: hour|day|week|month|year|all
 *                    (default: year)
 *
 * No Reddit auth required — uses the public *.json endpoints. Set a
 * unique User-Agent so Reddit doesn't rate-limit aggressive crawlers.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

const args = process.argv.slice(2)
const query = args.filter((a) => !a.startsWith('--'))[0]
if (!query) {
  console.error('Usage: npm run affiliate:research -- "<query>" [--subs ...] [--threads N] [--csv <path>]')
  process.exit(1)
}

function flag(name, fallback) {
  const i = args.indexOf(`--${name}`)
  return i >= 0 ? args[i + 1] : fallback
}

const SUBS = flag('subs', 'CampingGear,camping,CampingandHiking,GoCamping')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)
const TOP_THREADS = parseInt(flag('threads', '5'), 10)
const TIME_WINDOW = flag('time', 'year')

const USER_AGENT = 'trailsteadguide-affiliate-research/0.1 (by /u/trailstead)'
const SLEEP_MS = 750 // be polite — Reddit throttles fast crawlers
const AMAZON_TAG = 'trailsteadgui-20'

function affiliateUrl(asin) {
  // Match lib/affiliate/amazon.ts so you get credit even on research clicks.
  return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_TAG}&ascsubtag=research`
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function redditJson(path) {
  const url = `https://www.reddit.com${path}`
  const res = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' },
    redirect: 'follow',
  })
  if (!res.ok) {
    throw new Error(`Reddit ${res.status} for ${url}`)
  }
  return res.json()
}

async function searchSubreddit(sub, q) {
  const path = `/r/${sub}/search.json?q=${encodeURIComponent(q)}&restrict_sr=1&sort=top&t=${TIME_WINDOW}&limit=${TOP_THREADS}`
  try {
    const data = await redditJson(path)
    return (data?.data?.children ?? [])
      .map((c) => c.data)
      .filter((p) => p?.id)
      .map((p) => ({
        id: p.id,
        title: p.title,
        score: p.score,
        permalink: p.permalink,
        sub,
      }))
  } catch (err) {
    console.error(`  ! ${sub}: ${err.message}`)
    return []
  }
}

async function fetchComments(sub, id) {
  const path = `/r/${sub}/comments/${id}.json?limit=200`
  try {
    const data = await redditJson(path)
    return Array.isArray(data) ? (data[1]?.data?.children ?? []) : []
  } catch (err) {
    console.error(`  ! comments ${sub}/${id}: ${err.message}`)
    return []
  }
}

function extractFromComment(comment, hits) {
  const c = comment?.data
  if (!c || c.kind === 'more') return
  const body = c.body || ''
  const score = typeof c.score === 'number' ? c.score : 0

  for (const m of body.matchAll(/amazon\.com\/(?:[^\s)"']*\/)?dp\/([A-Z0-9]{10})/gi)) {
    const asin = m[1].toUpperCase()
    const entry = hits.get(asin) ?? { asin, mentions: 0, score: 0, sample: null }
    entry.mentions += 1
    entry.score += score
    entry.sample ??= body.slice(0, 200).replace(/\s+/g, ' ')
    hits.set(asin, entry)
  }

  const replies = c.replies?.data?.children
  if (Array.isArray(replies)) {
    for (const r of replies) extractFromComment(r, hits)
  }
}

function loadRegistry() {
  // Best-effort parse of lib/affiliate-products.ts — pulls (id, asin) pairs
  // by scanning consecutive `id:` and `amazonAsin:` lines.
  try {
    const src = readFileSync('lib/affiliate-products.ts', 'utf8')
    const map = new Map()
    let pendingId = null
    for (const line of src.split('\n')) {
      const idMatch = line.match(/^\s*id:\s*['"]([^'"]+)['"]/)
      if (idMatch) {
        pendingId = idMatch[1]
        continue
      }
      const asinMatch = line.match(/^\s*amazonAsin:\s*['"]([A-Z0-9]{10})['"]/)
      if (asinMatch && pendingId) {
        map.set(asinMatch[1], pendingId)
        pendingId = null
      }
    }
    return map
  } catch {
    return new Map()
  }
}

async function main() {
  console.log(`Searching ${SUBS.length} subreddit(s) for "${query}" (top of ${TIME_WINDOW})\n`)

  const threads = []
  for (const sub of SUBS) {
    const found = await searchSubreddit(sub, query)
    threads.push(...found)
    await sleep(SLEEP_MS)
  }

  threads.sort((a, b) => b.score - a.score)
  if (threads.length === 0) {
    console.log('No matching threads.')
    return
  }

  console.log(`Top ${threads.length} thread(s):`)
  for (const t of threads.slice(0, 10)) {
    console.log(`  [${String(t.score).padStart(4)}]  ${t.title.slice(0, 90)}`)
    console.log(`         r/${t.sub}  https://reddit.com${t.permalink}`)
  }

  const hits = new Map()
  console.log(`\nWalking comments on ${threads.length} thread(s)…`)
  for (const t of threads) {
    const comments = await fetchComments(t.sub, t.id)
    for (const c of comments) extractFromComment(c, hits)
    await sleep(SLEEP_MS)
  }

  if (hits.size === 0) {
    console.log('\nNo Amazon ASINs found in comments. Try a broader query or different subs.')
    return
  }

  const registry = loadRegistry()
  const ranked = [...hits.values()].sort((a, b) =>
    b.mentions === a.mentions ? b.score - a.score : b.mentions - a.mentions,
  )

  console.log(`\nCandidate products (sorted by mentions, then summed upvotes):\n`)
  for (const h of ranked) {
    const inReg = registry.get(h.asin)
    const tag = inReg ? `  [in registry: ${inReg}]` : '  [NEW]'
    console.log(
      `  ${h.asin}  ${String(h.mentions).padStart(3)} mentions  ∑${String(h.score).padStart(5)} upvotes${tag}`,
    )
    console.log(`             ${affiliateUrl(h.asin)}`)
    if (h.sample) console.log(`             "${h.sample.slice(0, 110)}…"`)
  }

  const newCount = ranked.filter((h) => !registry.get(h.asin)).length
  console.log(
    `\n${ranked.length} unique ASIN(s); ${newCount} not yet in AFFILIATE_PRODUCTS.`,
  )

  // Optional CSV export — gives the operator a research worksheet
  // they can open in Sheets to browse top candidates + paste names,
  // images, prices etc. they look up manually.
  const csvPath = flag('csv', null)
  if (csvPath) {
    const headers = [
      'rank', 'asin', 'mentions', 'sum_upvotes', 'in_registry',
      'amazon_url', 'sample_comment',
      // Blanks for the operator to fill after browsing the Amazon page:
      'product_name', 'price', 'image_url', 'tier', 'notes',
    ]
    const esc = (v) => {
      const s = v == null ? '' : String(v)
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
    }
    const rows = [headers.join(',')]
    ranked.forEach((h, i) => {
      rows.push([
        i + 1,
        h.asin,
        h.mentions,
        h.score,
        registry.get(h.asin) || '',
        affiliateUrl(h.asin),
        h.sample ? h.sample.slice(0, 200).replace(/\s+/g, ' ') : '',
        '', '', '', '', '',
      ].map(esc).join(','))
    })
    mkdirSync(dirname(csvPath), { recursive: true })
    writeFileSync(csvPath, rows.join('\n') + '\n')
    console.log(`\n✓ wrote ${ranked.length} candidates → ${csvPath}`)
  }
}

main().catch((err) => {
  console.error('research failed:', err)
  process.exit(1)
})
