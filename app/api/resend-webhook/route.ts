import { NextResponse } from 'next/server'
import crypto from 'node:crypto'

export const runtime = 'nodejs'

const TIMESTAMP_TOLERANCE_SECONDS = 300 // 5 minutes — Svix recommendation

type ResendEvent = {
  type?: string
  created_at?: string
  data?: {
    email_id?: string
    from?: string
    to?: string[] | string
    subject?: string
    bounce?: {
      type?: string
      subtype?: string
      message?: string
    }
  }
}

/**
 * Verifies a Svix-style signed webhook (the format Resend uses).
 *
 * Header contract:
 *   svix-id        — unique message id
 *   svix-timestamp — unix seconds
 *   svix-signature — space-separated list of "v1,<base64>" entries
 *
 * Secret format `whsec_<base64>`. The bytes after the prefix are
 * base64-decoded to produce the raw HMAC key.
 */
function verifySvixSignature(opts: {
  secret: string
  id: string
  timestamp: string
  body: string
  signatureHeader: string
}): boolean {
  const { secret, id, timestamp, body, signatureHeader } = opts

  const ts = Number.parseInt(timestamp, 10)
  if (!Number.isFinite(ts)) return false
  const skew = Math.abs(Date.now() / 1000 - ts)
  if (skew > TIMESTAMP_TOLERANCE_SECONDS) return false

  const keyB64 = secret.replace(/^whsec_/, '')
  let key: Buffer
  try {
    key = Buffer.from(keyB64, 'base64')
  } catch {
    return false
  }

  const signedContent = `${id}.${timestamp}.${body}`
  const expected = crypto.createHmac('sha256', key).update(signedContent).digest()

  const provided = signatureHeader
    .split(' ')
    .map((s) => s.trim())
    .filter((s) => s.startsWith('v1,'))
    .map((s) => s.slice(3))

  for (const sig of provided) {
    let buf: Buffer
    try {
      buf = Buffer.from(sig, 'base64')
    } catch {
      continue
    }
    if (buf.length === expected.length && crypto.timingSafeEqual(buf, expected)) {
      return true
    }
  }
  return false
}

function recipientsOf(event: ResendEvent): string {
  const to = event.data?.to
  if (Array.isArray(to)) return to.join(', ')
  if (typeof to === 'string') return to
  return '(unknown)'
}

/**
 * POST /api/resend-webhook
 *
 * Receives signed delivery events from Resend. Logs hard bounces and spam
 * complaints to stdout where they're picked up by Vercel logs. Resend
 * suppresses bounced/complained addresses on its side automatically, so
 * we don't keep a second suppression list — this endpoint is the audit
 * trail and the future seam for Kit-side deactivation.
 *
 * Set RESEND_WEBHOOK_SECRET (Resend dashboard → Webhooks → reveal secret).
 */
export async function POST(req: Request) {
  const secret = process.env.RESEND_WEBHOOK_SECRET
  if (!secret) {
    console.error('[resend-webhook] missing RESEND_WEBHOOK_SECRET')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  const id = req.headers.get('svix-id')
  const timestamp = req.headers.get('svix-timestamp')
  const signature = req.headers.get('svix-signature')

  if (!id || !timestamp || !signature) {
    return NextResponse.json({ error: 'Missing signature headers' }, { status: 400 })
  }

  const raw = await req.text()
  const ok = verifySvixSignature({ secret, id, timestamp, body: raw, signatureHeader: signature })
  if (!ok) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let event: ResendEvent
  try {
    event = JSON.parse(raw) as ResendEvent
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const type = event.type
  const recipients = recipientsOf(event)
  const subject = event.data?.subject || '(no subject)'

  if (type === 'email.bounced') {
    const b = event.data?.bounce
    console.error('[resend-bounce]', {
      to: recipients,
      subject,
      bounceType: b?.type,
      bounceSubtype: b?.subtype,
      message: b?.message,
      emailId: event.data?.email_id,
    })
  } else if (type === 'email.complained') {
    console.error('[resend-complaint]', {
      to: recipients,
      subject,
      emailId: event.data?.email_id,
    })
  } else {
    // Other event types (delivered, delayed, opened, clicked) are noted
    // but not actioned. Cheap to enable later if needed.
    console.log('[resend-webhook] event', { type, to: recipients })
  }

  return NextResponse.json({ received: true })
}
