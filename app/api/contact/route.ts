import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getContactAutoReplyEmail } from '@/lib/email-templates'

const SITE_URL = 'https://www.trailsteadguide.com'

const CATEGORIES: Record<string, string> = {
  general: 'General question',
  press: 'Press / interview',
  partnership: 'Partnership / collaboration',
  affiliate: 'Affiliate or sponsorship',
  bug: 'Bug or issue with the site',
  feedback: 'Plan or quiz feedback',
  other: 'Other',
}

type ContactBody = {
  name?: string
  email?: string
  category?: string
  message?: string
  honeypot?: string
  turnstileToken?: string
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

async function verifyTurnstile(token: string, secret: string): Promise<boolean> {
  try {
    const res = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: token }),
      },
    )
    if (!res.ok) return false
    const data = (await res.json()) as { success?: boolean }
    return data.success === true
  } catch (err) {
    console.error('[contact] turnstile verify error', err)
    return false
  }
}

export async function POST(req: Request) {
  let body: ContactBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  // Honeypot — silently 200 to fool bots, but don't send anything.
  if (body.honeypot && body.honeypot.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const name = (body.name || '').trim()
  const email = (body.email || '').trim()
  const category = (body.category || '').trim()
  const message = (body.message || '').trim()

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
  }
  if (!category || !CATEGORIES[category]) {
    return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
  }
  if (!message) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 })
  }

  // Optional Turnstile verification — only enforced if both server secret
  // and a client token were supplied. Keeps the form working pre-rollout.
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
  if (turnstileSecret && body.turnstileToken) {
    const ok = await verifyTurnstile(body.turnstileToken, turnstileSecret)
    if (!ok) {
      return NextResponse.json(
        { error: 'Verification failed. Please try again.' },
        { status: 400 },
      )
    }
  }

  const resendApiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.EMAIL_FROM
  if (!resendApiKey || !fromEmail) {
    console.error('[contact] missing env', {
      hasApiKey: !!resendApiKey,
      hasFrom: !!fromEmail,
    })
    return NextResponse.json(
      { error: 'Email service not configured' },
      { status: 500 },
    )
  }

  const categoryLabel = CATEGORIES[category]
  // Single inbound alias so one Gmail filter labels everything as
  // Trailstead Guide. The category still rides in the subject line.
  const inboxAddress = 'wtblacklock+trailsteadguide@gmail.com'
  const messagePreview = message.slice(0, 60).replace(/\s+/g, ' ').trim()
  const subject = `[Trailstead / ${categoryLabel}] ${messagePreview}`
  const timestamp = new Date().toISOString()

  const inboundHtml = `<!DOCTYPE html>
<html><body style="margin:0;padding:24px;background:#F5F3EE;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1c1917;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;">
    <tr><td style="padding:28px 32px 8px;">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#3d6b1f;font-weight:600;">New contact form message</p>
      <h1 style="margin:0 0 16px;font-family:Georgia,serif;font-size:22px;line-height:1.25;font-weight:600;color:#0c0a09;">${escapeHtml(categoryLabel)}</h1>
    </td></tr>
    <tr><td style="padding:0 32px 8px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:14px;line-height:1.6;color:#44403c;">
        <tr><td style="padding:6px 0;width:90px;color:#78716c;">Name</td><td style="padding:6px 0;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#78716c;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#1c1917;">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#78716c;">Category</td><td style="padding:6px 0;">${escapeHtml(categoryLabel)} <span style="color:#a8a29e;">(${escapeHtml(category)})</span></td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:16px 32px 24px;">
      <p style="margin:0 0 8px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#78716c;font-weight:600;">Message</p>
      <div style="font-size:15px;line-height:1.6;color:#1c1917;white-space:pre-wrap;">${escapeHtml(message)}</div>
    </td></tr>
    <tr><td style="padding:16px 32px 24px;border-top:1px solid #e7e5e4;">
      <p style="margin:0;font-size:12px;color:#a8a29e;">Sent via <a href="${SITE_URL}/contact" style="color:#a8a29e;">trailsteadguide.com/contact</a> at ${escapeHtml(timestamp)}</p>
    </td></tr>
  </table>
</body></html>`

  const inboundText = `New contact form message — ${categoryLabel}

Name: ${name}
Email: ${email}
Category: ${categoryLabel} (${category})

Message:
${message}

—
Sent via ${SITE_URL}/contact at ${timestamp}`

  try {
    const resend = new Resend(resendApiKey)

    const { error: inboundErr } = await resend.emails.send({
      from: fromEmail,
      to: inboxAddress,
      replyTo: email,
      subject,
      html: inboundHtml,
      text: inboundText,
    })
    if (inboundErr) {
      console.error('[contact] inbound send failed', inboundErr)
      return NextResponse.json(
        { error: 'Email send failed' },
        { status: 500 },
      )
    }

    const autoReply = getContactAutoReplyEmail({ name })
    const { error: autoErr } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: autoReply.subject,
      html: autoReply.html,
      text: autoReply.text,
    })
    if (autoErr) {
      // Don't fail the user-facing flow on auto-reply errors — the inbound
      // message already landed, which is the load-bearing part.
      console.error('[contact] auto-reply send failed', autoErr)
    }
  } catch (err) {
    console.error('[contact] resend exception', err)
    return NextResponse.json(
      { error: 'Email send error' },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true })
}
