/**
 * Affiliate click alert.
 *
 * Amazon Associates has no real-time order notification - no webhook, no
 * sale email, no order API. The nearest live signal we own is the outbound
 * click, so this route emails one when it happens. Treat it as "someone is
 * shopping", not "someone bought"; actual conversions still have to be read
 * off the Associates dashboard a day later.
 *
 * Called via navigator.sendBeacon() from <AffiliateClickTracker>, so the
 * request survives the immediate navigation to Amazon. Nothing client-side
 * reads the response - every failure path returns 200 so a broken alert can
 * never interfere with the outbound click.
 */

import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const SITE_URL = 'https://www.trailsteadguide.com'
const ASSOCIATES_DASHBOARD = 'https://affiliate-program.amazon.com/home'

// Alerts land in the same inbox as everything else. The +affiliate alias
// exists so a single Gmail filter can label, batch, or mute this stream
// without touching contact-form mail. Override with AFFILIATE_ALERT_TO.
const DEFAULT_ALERT_TO = 'wtblacklock+affiliate@gmail.com'

// Best-effort throttle. Module scope on Fluid Compute persists across
// requests to the same warm instance, but is NOT global - a second instance
// keeps its own counters. Enough to stop one bot or one rage-clicker from
// flooding the inbox and burning the Resend quota; not a hard guarantee.
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 8
const DEDUPE_MS = 60_000
const hits = new Map<string, number[]>()
const recent = new Map<string, number>()

type AlertBody = {
  product?: string
  location?: string
  linkText?: string
  subtag?: string
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Public endpoint, so a stranger could POST it straight into the inbox.
 * When the browser sends an origin we require it to be ours; when it sends
 * none (some privacy modes strip both headers) we still accept, because a
 * missed alert is cheaper than a feature that silently never fires. The
 * rate limit below applies either way.
 */
function originAllowed(req: Request): boolean {
  const origin = req.headers.get('origin')
  const referer = req.headers.get('referer')
  let candidate = origin
  if (!candidate && referer) {
    try {
      candidate = new URL(referer).origin
    } catch {
      return false
    }
  }
  if (!candidate) return true
  return (
    candidate === SITE_URL ||
    candidate === 'https://trailsteadguide.com' ||
    candidate.endsWith('.vercel.app') ||
    candidate.startsWith('http://localhost')
  )
}

function rateLimited(key: string): boolean {
  const now = Date.now()
  const times = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  times.push(now)
  hits.set(key, times)
  if (hits.size > 500) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k)
  }
  return times.length > MAX_PER_WINDOW
}

/** Collapses double-clicks and cmd-click-then-click on the same product. */
function isDuplicate(key: string): boolean {
  const now = Date.now()
  const last = recent.get(key)
  recent.set(key, now)
  if (recent.size > 500) {
    for (const [k, t] of recent) if (now - t >= DEDUPE_MS) recent.delete(k)
  }
  return last !== undefined && now - last < DEDUPE_MS
}

function clean(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''
  // Strip control characters so nothing can forge headers or break the body.
  return value.replace(/[\x00-\x1f\x7f]/g, '').trim().slice(0, max)
}

export async function POST(req: Request) {
  if (process.env.AFFILIATE_ALERTS === 'off') {
    return NextResponse.json({ ok: true, skipped: 'disabled' })
  }
  if (!originAllowed(req)) {
    return NextResponse.json({ ok: true, skipped: 'origin' })
  }

  let body: AlertBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: true, skipped: 'bad-body' })
  }

  const product = clean(body.product, 64)
  const location = clean(body.location, 200)
  const linkText = clean(body.linkText, 60)
  const subtag = clean(body.subtag, 100)

  if (!product || !location.startsWith('/')) {
    return NextResponse.json({ ok: true, skipped: 'invalid' })
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'

  if (rateLimited(ip)) {
    return NextResponse.json({ ok: true, skipped: 'rate-limited' })
  }
  if (isDuplicate(`${ip}:${product}`)) {
    return NextResponse.json({ ok: true, skipped: 'duplicate' })
  }

  const resendApiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.EMAIL_FROM
  if (!resendApiKey || !fromEmail) {
    console.error('[affiliate-alert] missing env', {
      hasApiKey: !!resendApiKey,
      hasFrom: !!fromEmail,
    })
    return NextResponse.json({ ok: true, skipped: 'unconfigured' })
  }

  const to = process.env.AFFILIATE_ALERT_TO || DEFAULT_ALERT_TO
  const isAsin = /^[A-Z0-9]{10}$/i.test(product)
  const productUrl = isAsin
    ? `https://www.amazon.com/dp/${product}`
    : `https://www.amazon.com/s?k=${encodeURIComponent(product)}`
  const pageUrl = `${SITE_URL}${location}`
  const label = linkText || product
  const timestamp = new Date().toISOString()

  const html = `<!DOCTYPE html>
<html><body style="margin:0;padding:24px;background:#F5F3EE;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1c1917;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;">
    <tr><td style="padding:28px 32px 8px;">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#3d6b1f;font-weight:600;">Amazon affiliate click</p>
      <h1 style="margin:0 0 16px;font-family:Georgia,serif;font-size:22px;line-height:1.25;font-weight:600;color:#0c0a09;">${escapeHtml(label)}</h1>
    </td></tr>
    <tr><td style="padding:0 32px 8px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:14px;line-height:1.6;color:#44403c;">
        <tr><td style="padding:6px 0;width:90px;color:#78716c;">Product</td><td style="padding:6px 0;"><a href="${escapeHtml(productUrl)}" style="color:#1c1917;">${escapeHtml(product)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#78716c;">Page</td><td style="padding:6px 0;"><a href="${escapeHtml(pageUrl)}" style="color:#1c1917;">${escapeHtml(location)}</a></td></tr>
        ${subtag ? `<tr><td style="padding:6px 0;color:#78716c;">Subtag</td><td style="padding:6px 0;">${escapeHtml(subtag)}</td></tr>` : ''}
      </table>
    </td></tr>
    <tr><td style="padding:16px 32px 24px;border-top:1px solid #e7e5e4;">
      <p style="margin:0 0 6px;font-size:12px;color:#78716c;">This is a click, not a sale. Orders appear in the <a href="${ASSOCIATES_DASHBOARD}" style="color:#3d6b1f;">Associates dashboard</a> on a delay, filed under the subtag above.</p>
      <p style="margin:0;font-size:12px;color:#a8a29e;">${escapeHtml(timestamp)}</p>
    </td></tr>
  </table>
</body></html>`

  const text = `Amazon affiliate click - ${label}

Product: ${product} (${productUrl})
Page:    ${pageUrl}${subtag ? `\nSubtag:  ${subtag}` : ''}

This is a click, not a sale. Orders appear in the Associates dashboard on a
delay, filed under the subtag above: ${ASSOCIATES_DASHBOARD}

${timestamp}`

  try {
    const resend = new Resend(resendApiKey)
    const { error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject: `[Trailstead] Amazon click: ${label}`,
      html,
      text,
    })
    if (error) console.error('[affiliate-alert] send failed', error)
  } catch (err) {
    console.error('[affiliate-alert] resend exception', err)
  }

  return NextResponse.json({ ok: true })
}
