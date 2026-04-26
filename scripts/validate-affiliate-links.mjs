#!/usr/bin/env node
/**
 * Build-time affiliate link validator.
 *
 * Scans the source tree for Amazon affiliate URLs (canonical /dp/<ASIN>
 * URLs from `amazonAffiliateUrl(...)` calls and any residual `amzn.to`
 * short links) and confirms each one returns 200. Run before deploys to
 * catch broken/retired ASINs or short links.
 *
 *   node scripts/validate-affiliate-links.mjs
 *
 * Exits non-zero on any non-200 response. Run with `--quiet` to suppress
 * per-URL output and only print failures + summary.
 */

import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const QUIET = process.argv.includes('--quiet')
const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'

function log(...args) {
  if (!QUIET) console.log(...args)
}

function findSourceFiles() {
  const out = execSync(
    'git ls-files "*.tsx" "*.ts" "*.mjs" "*.js" 2>/dev/null',
    { encoding: 'utf8' },
  )
  return out
    .split('\n')
    .filter((p) => p && !p.startsWith('scripts/validate-affiliate-links'))
}

function extractUrls(text) {
  const urls = new Set()
  const isLiteral = (u) => !u.includes('${') && !u.includes('`')
  // Direct amazon.com product URLs
  for (const m of text.matchAll(/https?:\/\/(?:www\.)?amazon\.com\/[^"'\s)]+/g)) {
    const url = m[0].replace(/[.,;)]+$/, '')
    if (isLiteral(url)) urls.add(url)
  }
  // Short links (legacy)
  for (const m of text.matchAll(/https?:\/\/amzn\.to\/[A-Za-z0-9]+/g)) {
    if (isLiteral(m[0])) urls.add(m[0])
  }
  // amazonAffiliateUrl('ASIN', 'slug') calls — synthesize the URL
  for (const m of text.matchAll(
    /amazonAffiliateUrl\(\s*['"]([A-Z0-9]{10})['"]\s*,\s*['"]([^'"]+)['"]\s*\)/g,
  )) {
    const [, asin, slug] = m
    urls.add(
      `https://www.amazon.com/dp/${asin}?tag=trailsteadgui-20&ascsubtag=${encodeURIComponent(slug)}`,
    )
  }
  return urls
}

async function checkUrl(url) {
  // Use HEAD first, fall back to GET if HEAD blocked.
  try {
    const ctrl = new AbortController()
    const timeout = setTimeout(() => ctrl.abort(), 10000)
    const head = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: ctrl.signal,
      headers: { 'User-Agent': USER_AGENT },
    })
    clearTimeout(timeout)
    if (head.status !== 405 && head.status !== 403) return head.status
  } catch {
    /* fall through to GET */
  }
  try {
    const ctrl = new AbortController()
    const timeout = setTimeout(() => ctrl.abort(), 15000)
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: ctrl.signal,
      headers: { 'User-Agent': USER_AGENT },
    })
    clearTimeout(timeout)
    return res.status
  } catch (err) {
    return `error: ${err?.message ?? err}`
  }
}

async function main() {
  const files = findSourceFiles()
  const all = new Set()
  for (const f of files) {
    let text
    try {
      text = readFileSync(f, 'utf8')
    } catch {
      continue
    }
    for (const u of extractUrls(text)) all.add(u)
  }

  if (all.size === 0) {
    log('No Amazon affiliate URLs found.')
    return
  }

  log(`Validating ${all.size} unique Amazon URLs…`)

  const failures = []
  // Sequential with a small delay — Amazon throttles aggressive parallel HEADs.
  for (const url of all) {
    const status = await checkUrl(url)
    const ok = status === 200
    log(`${ok ? '✓' : '✗'} ${status}  ${url.slice(0, 100)}`)
    if (!ok) failures.push({ url, status })
    await new Promise((r) => setTimeout(r, 250))
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} broken affiliate link(s):`)
    for (const { url, status } of failures) console.error(`  [${status}] ${url}`)
    process.exit(1)
  }
  log(`\nAll ${all.size} affiliate URLs OK.`)
}

main().catch((err) => {
  console.error('validator failed:', err)
  process.exit(1)
})
