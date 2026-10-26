#!/usr/bin/env node
/**
 * Submit URLs to IndexNow (Bing, Yandex, Seznam, Naver and others share
 * submissions through api.indexnow.org).
 *
 * The key file lives at public/<key>.txt, so it is served at
 * https://www.trailsteadguide.com/<key>.txt. The key is public by design:
 * owning the key file on the host is what proves the submission is ours.
 *
 * Usage:
 *   node scripts/indexnow-submit.mjs                 # every URL in the live sitemap
 *   node scripts/indexnow-submit.mjs /guides/foo /activities/bar
 *   node scripts/indexnow-submit.mjs --dry-run       # print the payload, send nothing
 *
 * Run it after a production deploy (the "IndexNow" workflow does this
 * automatically when Vercel reports a successful Production deployment).
 */

import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HOST = 'www.trailsteadguide.com'
const ORIGIN = `https://${HOST}`
const ENDPOINT = 'https://api.indexnow.org/indexnow'
// IndexNow accepts up to 10,000 URLs per POST.
const BATCH_SIZE = 10_000

const publicDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')

function loadKey() {
  const keyFiles = readdirSync(publicDir).filter((f) => /^[a-f0-9]{32}\.txt$/.test(f))
  if (keyFiles.length !== 1) {
    throw new Error(`Expected exactly one IndexNow key file in public/, found ${keyFiles.length}`)
  }
  const key = keyFiles[0].replace(/\.txt$/, '')
  const contents = readFileSync(join(publicDir, keyFiles[0]), 'utf8').trim()
  if (contents !== key) throw new Error(`public/${keyFiles[0]} must contain exactly the key`)
  return key
}

async function sitemapUrls() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`)
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`)
  const xml = await res.text()
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1])
}

function toAbsolute(arg) {
  const url = new URL(arg, ORIGIN)
  if (url.host !== HOST) throw new Error(`${arg} is not on ${HOST}`)
  return url.toString()
}

async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const explicit = args.filter((a) => !a.startsWith('--'))

  const key = loadKey()
  const keyLocation = `${ORIGIN}/${key}.txt`

  if (!dryRun) {
    // Search engines fetch keyLocation to verify ownership; fail early if
    // the deploy that should be serving it isn't live yet.
    const check = await fetch(keyLocation)
    const body = check.ok ? (await check.text()).trim() : ''
    if (body !== key) throw new Error(`${keyLocation} is not serving the key (HTTP ${check.status})`)
  }

  const urls = [...new Set(explicit.length ? explicit.map(toAbsolute) : await sitemapUrls())]
  if (!urls.length) throw new Error('No URLs to submit')

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const urlList = urls.slice(i, i + BATCH_SIZE)
    const payload = { host: HOST, key, keyLocation, urlList }
    if (dryRun) {
      console.log(JSON.stringify({ ...payload, urlList: `${urlList.length} URLs` }, null, 2))
      continue
    }
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    })
    // 200 = accepted, 202 = accepted, key validation pending.
    if (res.status !== 200 && res.status !== 202) {
      throw new Error(`IndexNow returned ${res.status}: ${await res.text()}`)
    }
    console.log(`IndexNow: submitted ${urlList.length} URLs (HTTP ${res.status})`)
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
