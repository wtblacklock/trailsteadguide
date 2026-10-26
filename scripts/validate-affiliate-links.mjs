#!/usr/bin/env node
/**
 * Affiliate link validator.
 *
 * Scans the source tree for Amazon affiliate URLs (canonical /dp/<ASIN>
 * URLs from `amazonAffiliateUrl(...)` calls, active registry entries, and
 * any residual `amzn.to` short links) and checks that each product can
 * actually be bought: the product page must have an Add to Cart button.
 *
 *   node scripts/validate-affiliate-links.mjs              check every link
 *   node scripts/validate-affiliate-links.mjs --quiet      failures + summary only
 *   node scripts/validate-affiliate-links.mjs --strict     also fail on unverified pages
 *   node scripts/validate-affiliate-links.mjs --browser-audit
 *       print a snippet to paste into the console of an amazon.com tab
 *
 * Why "buyable" and not just HTTP 200: Amazon answers automated requests
 * with a robot-check page that still returns 200, and a retired listing
 * still renders with a 200 but has no buy box ("Currently unavailable",
 * "No featured offers available", only "See All Buying Options"). A status
 * check passes both. Each product is classified by
 * scripts/lib/amazon-page.mjs instead.
 *
 * When Amazon serves a robot check, the listing is reported as UNVERIFIED
 * rather than OK. This script does not try to get past the check. Use
 * --browser-audit and run the printed snippet in a normal browser tab,
 * where Amazon serves real product pages.
 *
 * Exits non-zero on any broken or not-buyable product, and with --strict on
 * any product that could not be verified.
 */

import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { classifyAmazonProductHtml, asinFromUrl } from './lib/amazon-page.mjs'

const QUIET = process.argv.includes('--quiet')
const STRICT = process.argv.includes('--strict')
const BROWSER_AUDIT = process.argv.includes('--browser-audit')
const REGISTRY_FILE = 'lib/affiliate-products.ts'
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
    .filter(
      (p) =>
        p &&
        !p.startsWith('scripts/validate-affiliate-links') &&
        !p.startsWith('scripts/lib/') &&
        // Tests use invented ASINs that 404 on purpose. Scanning them reports
        // the same two failures every run, and a real broken link is easy to
        // miss once the output is expected to be noisy.
        !p.includes('__tests__') &&
        !/\.(test|spec)\.[cm]?[jt]sx?$/.test(p),
    )
}

/**
 * Deprecated registry entries are kept for history. One that nothing links
 * to any more is expected to lose its buy box eventually, so it is skipped.
 * One that a page still uses (legacy compare pages, skills) is checked like
 * any other product.
 */
function stripUnusedDeprecatedEntries(registryText, otherSourceText) {
  return registryText.replace(/ {2}\{\n {4}id: '([^']+)',\n[\s\S]*?\n {2}\},\n/g, (block, id) => {
    if (!/\n {4}deprecated: true,/.test(block)) return block
    const referenced = otherSourceText.includes(`'${id}'`) || otherSourceText.includes(`"${id}"`)
    return referenced ? block : ''
  })
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
  // amazonAffiliateUrl('ASIN', 'slug') calls: synthesize the URL
  for (const m of text.matchAll(
    /amazonAffiliateUrl\(\s*['"]([A-Z0-9]{10})['"]\s*,\s*['"]([^'"]+)['"]\s*\)/g,
  )) {
    const [, asin, slug] = m
    urls.add(
      `https://www.amazon.com/dp/${asin}?tag=trailsteadgui-20&ascsubtag=${encodeURIComponent(slug)}`,
    )
  }
  // Registry entries: any `amazonAsin: '...'` value in source files. Synthesizes
  // a canonical URL so the validator catches retired ASINs even after the
  // <AmazonLink /> migration removed inline URL strings from guide pages.
  for (const m of text.matchAll(/amazonAsin:\s*['"]([A-Z0-9]{10})['"]/g)) {
    urls.add(
      `https://www.amazon.com/dp/${m[1]}?tag=trailsteadgui-20&ascsubtag=registry`,
    )
  }
  return urls
}

async function get(url) {
  const ctrl = new AbortController()
  const timeout = setTimeout(() => ctrl.abort(), 20000)
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: ctrl.signal,
      headers: {
        'User-Agent': USER_AGENT,
        'Accept-Language': 'en-US,en;q=0.9',
        Accept: 'text/html,application/xhtml+xml',
      },
    })
    const body = await res.text()
    return { status: res.status, finalUrl: res.url, body }
  } catch (err) {
    return { status: `error: ${err?.message ?? err}`, finalUrl: url, body: '' }
  } finally {
    clearTimeout(timeout)
  }
}

/** Checks one product page. Returns { kind, detail } where kind is ok | not-buyable | broken | unverified. */
async function checkProduct(url) {
  const { status, finalUrl, body } = await get(url)
  if (status !== 200) return { kind: 'broken', detail: String(status) }
  const { status: page, reason } = classifyAmazonProductHtml(body)
  if (page === 'buyable') return { kind: 'ok', detail: reason, finalAsin: asinFromUrl(finalUrl) }
  if (page === 'not-buyable') return { kind: 'not-buyable', detail: reason }
  return { kind: 'unverified', detail: reason }
}

function collectUrls() {
  const texts = new Map()
  for (const f of findSourceFiles()) {
    try {
      texts.set(f, readFileSync(f, 'utf8'))
    } catch {
      /* unreadable file: skip */
    }
  }
  const others = [...texts].filter(([f]) => f !== REGISTRY_FILE).map(([, t]) => t).join('\n')
  const all = new Set()
  for (const [f, raw] of texts) {
    const text = f === REGISTRY_FILE ? stripUnusedDeprecatedEntries(raw, others) : raw
    for (const u of extractUrls(text)) all.add(u)
  }
  return all
}

function printBrowserAudit(asins) {
  const snippet = `// Trailstead affiliate buy-box audit. Paste into the DevTools console of an
// amazon.com tab (signed out is fine) and wait for the summary table.
(async () => {
  const classify = (${classifyAmazonProductHtml.toString()});
  const asins = ${JSON.stringify(asins)};
  const rows = [];
  for (const asin of asins) {
    const res = await fetch('/dp/' + asin, { credentials: 'include' });
    const { status, reason } = res.status === 200
      ? classify(await res.text())
      : { status: 'broken', reason: 'HTTP ' + res.status };
    rows.push({ asin, status, reason });
    console.log((status === 'buyable' ? '\\u2713' : '\\u2717'), asin, status, reason);
    await new Promise((r) => setTimeout(r, 600));
  }
  const bad = rows.filter((r) => r.status !== 'buyable');
  console.table(bad.length ? bad : [{ result: 'All ' + rows.length + ' products buyable' }]);
  return bad;
})();`
  console.log(snippet)
}

async function main() {
  const all = collectUrls()
  if (all.size === 0) {
    log('No Amazon affiliate URLs found.')
    return
  }

  // One check per product, however many URLs (tags, subtags) point at it.
  const productUrls = new Map() // asin -> first URL seen
  const shortLinks = []
  const otherUrls = []
  for (const url of all) {
    const asin = asinFromUrl(url)
    if (asin) {
      if (!productUrls.has(asin)) productUrls.set(asin, url)
    } else if (/amzn\.to\//.test(url)) shortLinks.push(url)
    else otherUrls.push(url)
  }

  if (BROWSER_AUDIT) {
    printBrowserAudit([...productUrls.keys()])
    return
  }

  log(
    `Checking ${productUrls.size} products, ${shortLinks.length} short links, ${otherUrls.length} other URLs...`,
  )

  const results = { ok: [], 'not-buyable': [], broken: [], unverified: [] }
  const record = (label, r) => {
    results[r.kind].push({ label, detail: r.detail })
    const mark = { ok: '✓', 'not-buyable': '✗', broken: '✗', unverified: '?' }[r.kind]
    log(`${mark} ${r.kind.padEnd(11)} ${label}  ${r.kind === 'ok' ? '' : r.detail}`)
  }

  // Sequential with a small delay: Amazon throttles aggressive parallel requests.
  for (const [asin] of productUrls) {
    record(asin, await checkProduct(`https://www.amazon.com/dp/${asin}`))
    await new Promise((r) => setTimeout(r, 400))
  }
  for (const url of shortLinks) {
    record(url, await checkProduct(url))
    await new Promise((r) => setTimeout(r, 400))
  }
  for (const url of otherUrls) {
    const { status } = await get(url)
    record(url.slice(0, 100), status === 200 ? { kind: 'ok', detail: '' } : { kind: 'broken', detail: String(status) })
    await new Promise((r) => setTimeout(r, 250))
  }

  const failing = [...results.broken, ...results['not-buyable']]
  if (results.broken.length) {
    console.error(`\n${results.broken.length} broken link(s):`)
    for (const { label, detail } of results.broken) console.error(`  [${detail}] ${label}`)
  }
  if (results['not-buyable'].length) {
    console.error(`\n${results['not-buyable'].length} product(s) cannot be bought from the product page:`)
    for (const { label, detail } of results['not-buyable']) console.error(`  ${label}  ${detail}`)
  }
  if (results.unverified.length) {
    console.error(
      `\n${results.unverified.length} of ${productUrls.size + shortLinks.length} product(s) could not be verified ` +
        `(Amazon served a robot check or an unrecognised page). This is not a pass.\n` +
        `Run with --browser-audit and paste the snippet into an amazon.com tab to check them.`,
    )
  }

  // Always print the summary, even in --quiet mode.
  console.log(
    `\nSummary: ${results.ok.length} OK, ${results['not-buyable'].length} not buyable, ` +
      `${results.broken.length} broken, ${results.unverified.length} unverified.`,
  )
  if (failing.length || (STRICT && results.unverified.length)) process.exit(1)
  if (!results.unverified.length) console.log('All affiliate products are buyable.')
}

main().catch((err) => {
  console.error('validator failed:', err)
  process.exit(1)
})
