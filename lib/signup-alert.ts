/**
 * Email-signup alert.
 *
 * Kit (ConvertKit) holds the subscriber list, but its dashboard is a place
 * you have to remember to visit. This sends one email the moment somebody
 * signs up, with the context Kit's own generic notification does not carry:
 * which surface they came from, which plan or printable they were after,
 * and whether the Kit write actually succeeded.
 *
 * Called fire-and-forget from `app/api/subscribe/route.ts`. Every failure
 * path is swallowed and logged - a broken alert must never stop a real
 * subscriber from getting their plan email.
 *
 * Config:
 *   SIGNUP_ALERTS=off   disables the stream entirely
 *   SIGNUP_ALERT_TO     overrides the recipient
 * Reuses RESEND_API_KEY and EMAIL_FROM, already set for affiliate alerts.
 */

import { Resend } from 'resend'

const SITE_URL = 'https://www.trailsteadguide.com'
const KIT_DASHBOARD = 'https://app.kit.com/subscribers'

// Matches the +affiliate convention in app/api/affiliate-alert/route.ts so a
// single Gmail filter can label or batch this stream on its own.
const DEFAULT_ALERT_TO = 'wtblacklock+signup@gmail.com'

export type SignupAlertInput = {
  email: string
  source?: string
  planSlug?: string
  printableSlug?: string
  tagIds?: number[]
  /** False when the Kit write failed, so the alert can flag a lost subscriber. */
  kitOk: boolean
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Strips control characters so nothing can forge headers or break the body. */
function clean(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''
  return value.replace(/[\x00-\x1f\x7f]/g, '').trim().slice(0, max)
}

const SOURCE_LABELS: Record<string, string> = {
  homepage: 'Homepage capture',
  'mid-quiz': 'Mid-quiz capture',
  'post-plan': 'Post-plan capture',
  printable: 'Printable gate',
}

export async function sendSignupAlert(input: SignupAlertInput): Promise<void> {
  if (process.env.SIGNUP_ALERTS === 'off') return

  const resendApiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.EMAIL_FROM
  if (!resendApiKey || !fromEmail) {
    console.error('[signup-alert] missing env', {
      hasApiKey: !!resendApiKey,
      hasFrom: !!fromEmail,
    })
    return
  }

  const email = clean(input.email, 254)
  if (!email) return

  const source = clean(input.source, 32)
  const planSlug = clean(input.planSlug, 64)
  const printableSlug = clean(input.printableSlug, 64)
  const sourceLabel = SOURCE_LABELS[source] || source || 'Unknown source'
  const wanted = planSlug || printableSlug
  const wantedUrl = planSlug
    ? `${SITE_URL}/plans/${planSlug}`
    : printableSlug
      ? `${SITE_URL}/printables/${printableSlug}`
      : ''
  const tags = (input.tagIds ?? []).filter((n) => Number.isFinite(n)).join(', ')
  const timestamp = new Date().toISOString()

  const rows: string[] = [
    `<tr><td style="padding:6px 0;width:90px;color:#78716c;">Email</td><td style="padding:6px 0;">${escapeHtml(email)}</td></tr>`,
    `<tr><td style="padding:6px 0;color:#78716c;">Source</td><td style="padding:6px 0;">${escapeHtml(sourceLabel)}</td></tr>`,
  ]
  if (wanted) {
    rows.push(
      `<tr><td style="padding:6px 0;color:#78716c;">Wanted</td><td style="padding:6px 0;"><a href="${escapeHtml(wantedUrl)}" style="color:#1c1917;">${escapeHtml(wanted)}</a></td></tr>`,
    )
  }
  if (tags) {
    rows.push(
      `<tr><td style="padding:6px 0;color:#78716c;">Kit tags</td><td style="padding:6px 0;">${escapeHtml(tags)}</td></tr>`,
    )
  }

  const kitNote = input.kitOk
    ? `Added to Kit. <a href="${KIT_DASHBOARD}" style="color:#3d6b1f;">Open subscribers</a>.`
    : 'WARNING: the Kit write failed, so this address is NOT on the list. Add it by hand.'

  const html = `<!DOCTYPE html>
<html><body style="margin:0;padding:24px;background:#F5F3EE;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1c1917;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;">
    <tr><td style="padding:28px 32px 8px;">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${input.kitOk ? '#3d6b1f' : '#b91c1c'};font-weight:600;">New email signup</p>
      <h1 style="margin:0 0 16px;font-family:Georgia,serif;font-size:22px;line-height:1.25;font-weight:600;color:#0c0a09;">${escapeHtml(email)}</h1>
    </td></tr>
    <tr><td style="padding:0 32px 8px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:14px;line-height:1.6;color:#44403c;">
        ${rows.join('\n        ')}
      </table>
    </td></tr>
    <tr><td style="padding:16px 32px 24px;border-top:1px solid #e7e5e4;">
      <p style="margin:0 0 6px;font-size:12px;color:#78716c;">${kitNote}</p>
      <p style="margin:0;font-size:12px;color:#a8a29e;">${escapeHtml(timestamp)}</p>
    </td></tr>
  </table>
</body></html>`

  const text = `New email signup - ${email}

Source:  ${sourceLabel}${wanted ? `\nWanted:  ${wanted} (${wantedUrl})` : ''}${tags ? `\nKit tags: ${tags}` : ''}

${input.kitOk ? `Added to Kit: ${KIT_DASHBOARD}` : 'WARNING: the Kit write failed, so this address is NOT on the list. Add it by hand.'}

${timestamp}`

  try {
    const resend = new Resend(resendApiKey)
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: process.env.SIGNUP_ALERT_TO || DEFAULT_ALERT_TO,
      subject: `[Trailstead] ${input.kitOk ? 'Signup' : 'Signup (Kit FAILED)'}: ${email}`,
      html,
      text,
    })
    if (error) console.error('[signup-alert] send failed', error)
  } catch (err) {
    console.error('[signup-alert] resend exception', err)
  }
}
