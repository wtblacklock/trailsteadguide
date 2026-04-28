// @vitest-environment node
/**
 * Resend webhook signature + event-handler test. Reproduces the Svix
 * signing scheme the real route verifies against, then asserts that
 * bounced + complaint events log on stderr while unrelated events
 * pass through quietly.
 */

import { describe, expect, it, vi, beforeAll, beforeEach } from 'vitest'
import crypto from 'node:crypto'

import { POST } from '../route'

const KEY_BYTES = crypto.randomBytes(32)
const SECRET = `whsec_${KEY_BYTES.toString('base64')}`

beforeAll(() => {
  process.env.RESEND_WEBHOOK_SECRET = SECRET
})

beforeEach(() => {
  vi.restoreAllMocks()
})

function sign(body: string, id: string, timestamp: string): string {
  const sig = crypto
    .createHmac('sha256', KEY_BYTES)
    .update(`${id}.${timestamp}.${body}`)
    .digest('base64')
  return `v1,${sig}`
}

function buildRequest(opts: {
  body: object
  id?: string
  timestamp?: string
  signatureOverride?: string
  omitHeader?: 'id' | 'timestamp' | 'signature'
}): Request {
  const id = opts.id ?? `msg_${Math.random().toString(36).slice(2)}`
  const timestamp = opts.timestamp ?? Math.floor(Date.now() / 1000).toString()
  const raw = JSON.stringify(opts.body)
  const signature = opts.signatureOverride ?? sign(raw, id, timestamp)

  const headers = new Headers({ 'Content-Type': 'application/json' })
  if (opts.omitHeader !== 'id') headers.set('svix-id', id)
  if (opts.omitHeader !== 'timestamp') headers.set('svix-timestamp', timestamp)
  if (opts.omitHeader !== 'signature') headers.set('svix-signature', signature)

  return new Request('http://localhost/api/resend-webhook', {
    method: 'POST',
    headers,
    body: raw,
  })
}

const bouncedEvent = {
  type: 'email.bounced',
  created_at: '2026-04-28T12:00:00Z',
  data: {
    email_id: 'eml_123',
    from: 'hello@trailsteadguide.com',
    to: ['nope@example.com'],
    subject: 'Your first night plan',
    bounce: { type: 'Permanent', subtype: 'General', message: 'Mailbox does not exist' },
  },
}

const complaintEvent = {
  type: 'email.complained',
  data: { email_id: 'eml_456', to: ['angry@example.com'], subject: 'Promo' },
}

describe('POST /api/resend-webhook', () => {
  it('rejects 400 when signature headers are missing', async () => {
    const res = await POST(buildRequest({ body: bouncedEvent, omitHeader: 'signature' }))
    expect(res.status).toBe(400)
  })

  it('rejects 401 with a tampered signature', async () => {
    const res = await POST(
      buildRequest({ body: bouncedEvent, signatureOverride: 'v1,bm90LWEtcmVhbC1zaWc=' }),
    )
    expect(res.status).toBe(401)
  })

  it('rejects 401 when the body is mutated after signing', async () => {
    const id = 'msg_x'
    const ts = Math.floor(Date.now() / 1000).toString()
    const goodBody = JSON.stringify(bouncedEvent)
    const signature = sign(goodBody, id, ts)

    const headers = new Headers({
      'Content-Type': 'application/json',
      'svix-id': id,
      'svix-timestamp': ts,
      'svix-signature': signature,
    })
    const req = new Request('http://localhost/api/resend-webhook', {
      method: 'POST',
      headers,
      body: goodBody + ' ',
    })
    const res = await POST(req)
    expect(res.status).toBe(401)
  })

  it('rejects 401 when timestamp is outside the tolerance window', async () => {
    const stale = (Math.floor(Date.now() / 1000) - 60 * 60).toString() // 1h old
    const res = await POST(buildRequest({ body: bouncedEvent, timestamp: stale }))
    expect(res.status).toBe(401)
  })

  it('logs structured bounce data and returns 200 on email.bounced', async () => {
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const res = await POST(buildRequest({ body: bouncedEvent }))
    expect(res.status).toBe(200)
    expect(errSpy).toHaveBeenCalledWith(
      '[resend-bounce]',
      expect.objectContaining({
        to: 'nope@example.com',
        bounceType: 'Permanent',
        emailId: 'eml_123',
      }),
    )
  })

  it('logs and returns 200 on email.complained', async () => {
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const res = await POST(buildRequest({ body: complaintEvent }))
    expect(res.status).toBe(200)
    expect(errSpy).toHaveBeenCalledWith(
      '[resend-complaint]',
      expect.objectContaining({ to: 'angry@example.com', emailId: 'eml_456' }),
    )
  })

  it('passes through unrelated event types without error logging', async () => {
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const delivered = { type: 'email.delivered', data: { to: ['ok@example.com'] } }
    const res = await POST(buildRequest({ body: delivered }))
    expect(res.status).toBe(200)
    expect(errSpy).not.toHaveBeenCalled()
    expect(logSpy).toHaveBeenCalledWith(
      '[resend-webhook] event',
      expect.objectContaining({ type: 'email.delivered' }),
    )
  })
})
