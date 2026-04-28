#!/usr/bin/env node
/**
 * Verify every product image URL in the registry is reachable.
 *
 *   node scripts/check-affiliate-images.mjs            # full report
 *   node scripts/check-affiliate-images.mjs --quiet    # only failures
 *
 * Amazon rotates image URLs occasionally — a hash in the path can change,
 * leaving the registry pointing at a 404. Run before deploys (or on a
 * cron) to catch broken images before users see them.
 *
 * Exits non-zero on any non-200 response.
 *
 * Pure node stdlib — no npm install required.
 */

import { readFileSync } from 'node:fs'

const QUIET = process.argv.includes('--quiet')
const TIMEOUT_MS = 10_000
const CONCURRENCY = 6
const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'

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
    products.push({
      id: m[1],
      name: get(/name:\s*'([^']+)'/),
      imageUrl: get(/imageUrl:\s*'([^']+)'/),
    })
  }
  return products
}

async function checkOne(url) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    let res = await fetch(url, {
      method: 'HEAD',
      headers: { 'User-Agent': USER_AGENT, Accept: 'image/*,*/*' },
      signal: controller.signal,
      redirect: 'follow',
    })
    // Some Amazon image CDNs reject HEAD with 405 — retry GET (one byte range).
    if (res.status === 405 || res.status === 403) {
      res = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': USER_AGENT,
          Accept: 'image/*,*/*',
          Range: 'bytes=0-0',
        },
        signal: controller.signal,
        redirect: 'follow',
      })
    }
    return { ok: res.ok, status: res.status }
  } catch (err) {
    return { ok: false, status: 0, error: err.message }
  } finally {
    clearTimeout(timeout)
  }
}

async function runWithConcurrency(items, n, fn) {
  const results = new Array(items.length)
  let next = 0
  async function worker() {
    while (true) {
      const i = next++
      if (i >= items.length) return
      results[i] = await fn(items[i], i)
    }
  }
  await Promise.all(Array.from({ length: n }, worker))
  return results
}

async function main() {
  const src = readFileSync('lib/affiliate-products.ts', 'utf8')
  const products = parseProducts(src).filter((p) => p.imageUrl)

  if (products.length === 0) {
    console.error('No products with imageUrl found.')
    process.exit(2)
  }

  if (!QUIET) {
    console.log(`Checking ${products.length} product images (concurrency ${CONCURRENCY})...`)
  }

  const results = await runWithConcurrency(products, CONCURRENCY, async (p, i) => {
    const r = await checkOne(p.imageUrl)
    if (!QUIET || !r.ok) {
      const tag = r.ok ? '✓' : '✗'
      const status = r.error ? `ERR ${r.error}` : `${r.status}`
      console.log(`${tag} ${status.padEnd(10)} ${p.id}  ${p.name}`)
      if (!r.ok) console.log(`             ${p.imageUrl}`)
    }
    return { product: p, result: r }
  })

  const failures = results.filter((r) => !r.result.ok)
  console.log('')
  console.log(`Checked: ${results.length}  Passed: ${results.length - failures.length}  Failed: ${failures.length}`)

  if (failures.length > 0) {
    console.error('')
    console.error('Broken image URLs:')
    for (const f of failures) {
      console.error(`  - ${f.product.id} (${f.product.name}): ${f.result.status || f.result.error}`)
    }
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('image-check exception', err)
  process.exit(2)
})
