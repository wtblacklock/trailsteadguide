/**
 * Trip Pack purchase-confirmation email. Sent from the Stripe webhook.
 * Uses Resend (already a dependency). No-op if RESEND_API_KEY unset.
 */

import { Resend } from 'resend'
import type { PlanSlug } from '@/types'

const PLAN_TITLES: Record<PlanSlug, string> = {
  'backyard-test': 'Backyard Test Night',
  'first-night-camp': 'First Night Camp',
  'first-weekend-camp': 'First Weekend Camp',
  'easy-family-basecamp': 'Easy Family Basecamp',
}

type SendArgs = {
  to: string
  plan: PlanSlug
  downloadUrl: string
  tier?: 'basic' | 'premium'
}

export async function sendTripPackEmail(args: SendArgs): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  if (!apiKey || !from) return { ok: false, skipped: true }

  const title = PLAN_TITLES[args.plan]
  const tierLabel = args.tier === 'premium' ? 'Premium' : 'Basic'

  const html = `<!doctype html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif;background:#f5efe2;margin:0;padding:32px 16px;color:#1f2622;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
    <tr><td style="padding:28px 32px 12px;">
      <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#3a5a3e;font-weight:600;margin-bottom:8px;">Trailstead Trip Pack</div>
      <h1 style="font-size:26px;line-height:1.2;margin:0 0 8px;color:#1f3622;font-weight:700;letter-spacing:-0.4px;">Your ${title} pack is ready.</h1>
      <p style="margin:0;color:#5a6b5e;font-size:14px;">Thanks for your order. The ${tierLabel} Trip Pack is waiting below.</p>
    </td></tr>
    <tr><td style="padding:20px 32px 8px;">
      <a href="${args.downloadUrl}" style="display:inline-block;background:#1f3622;color:#ffffff;padding:14px 24px;border-radius:10px;text-decoration:none;font-weight:600;font-size:15px;">Download your Trip Pack (PDF)</a>
    </td></tr>
    <tr><td style="padding:4px 32px 24px;">
      <p style="margin:0;color:#8a9088;font-size:12px;line-height:1.5;">
        Link valid for 24 hours. If it expires, reply to this email and we&rsquo;ll send a fresh one.<br/>
        Open the PDF once, save it to your device &mdash; it&rsquo;s yours to keep forever.
      </p>
    </td></tr>
    <tr><td style="padding:20px 32px 28px;border-top:1px solid #ece4d2;">
      <p style="margin:0 0 8px;font-size:13px;color:#4a5450;"><strong>What&rsquo;s inside:</strong></p>
      <ul style="margin:0;padding-left:18px;color:#4a5450;font-size:13px;line-height:1.7;">
        <li>Hour-by-hour trip timeline</li>
        <li>Packing list scaled to your party size</li>
        <li>Curated gear set with Amazon links</li>
        <li>Mistake-prevention guide</li>
        <li>Final ready-to-go gut check</li>
      </ul>
    </td></tr>
    <tr><td style="padding:16px 32px;background:#f5efe2;text-align:center;color:#5a6b5e;font-size:11px;letter-spacing:0.5px;">
      Trailstead Guide &middot; trailsteadguide.com
    </td></tr>
  </table>
</body></html>`

  const text = `Your ${title} Trip Pack is ready.

Download it here (link valid 24 hours):
${args.downloadUrl}

If the link expires, reply to this email and we'll send a fresh one.

— Trailstead Guide`

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to: args.to,
      subject: `Your ${title} Trip Pack is ready`,
      html,
      text,
    })
    if (error) {
      console.error('[trip-pack email] resend error', error)
      return { ok: false, error: String(error) }
    }
    return { ok: true }
  } catch (err) {
    console.error('[trip-pack email] exception', err)
    return { ok: false, error: (err as Error).message }
  }
}
