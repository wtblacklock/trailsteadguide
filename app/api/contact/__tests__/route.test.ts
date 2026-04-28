// @vitest-environment node
/**
 * /api/contact route test. Resend SDK mocked at the module level so no
 * real email is sent, but the actual handler executes — including
 * validation, honeypot short-circuit, and the two send calls (inbound +
 * auto-reply).
 */

import { describe, expect, it, vi, beforeAll, beforeEach } from 'vitest'

const { sendMock } = vi.hoisted(() => ({
  sendMock: vi.fn().mockResolvedValue({ data: { id: 'test_id' }, error: null }),
}))

vi.mock('resend', () => ({
  Resend: class FakeResend {
    emails = { send: sendMock }
  },
}))

import { POST } from '../route'

beforeAll(() => {
  process.env.RESEND_API_KEY = 'test_resend_key'
  process.env.EMAIL_FROM = 'Trailstead <hello@trailsteadguide.test>'
  delete process.env.TURNSTILE_SECRET_KEY
})

beforeEach(() => {
  sendMock.mockClear()
})

function buildRequest(body: unknown): Request {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

const validBody = {
  name: 'Jane Camper',
  email: 'jane@example.com',
  category: 'general',
  message: 'Hi! Loved the first-night camping plan. Quick question about gear.',
}

describe('POST /api/contact', () => {
  it('rejects malformed JSON', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'not-json',
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('silently 200s when honeypot is filled and never calls Resend', async () => {
    const res = await POST(buildRequest({ ...validBody, honeypot: 'bot-was-here' }))
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toEqual({ ok: true })
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('rejects missing name', async () => {
    const res = await POST(buildRequest({ ...validBody, name: '' }))
    expect(res.status).toBe(400)
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('rejects bad email format', async () => {
    const res = await POST(buildRequest({ ...validBody, email: 'nope' }))
    expect(res.status).toBe(400)
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('rejects unknown category', async () => {
    const res = await POST(buildRequest({ ...validBody, category: 'spam-attempt' }))
    expect(res.status).toBe(400)
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('rejects empty message', async () => {
    const res = await POST(buildRequest({ ...validBody, message: '   ' }))
    expect(res.status).toBe(400)
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('happy path: routes to +trailsteadguide alias, reply-to submitter, sends auto-reply', async () => {
    const res = await POST(buildRequest({ ...validBody, category: 'press' }))
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })

    expect(sendMock).toHaveBeenCalledTimes(2)

    const inbound = sendMock.mock.calls[0][0]
    expect(inbound.to).toBe('wtblacklock+trailsteadguide@gmail.com')
    expect(inbound.replyTo).toBe('jane@example.com')
    expect(inbound.subject).toMatch(/^\[Trailstead \/ Press \/ interview\]/)
    expect(inbound.from).toBe(process.env.EMAIL_FROM)
    expect(inbound.html).toContain('Jane Camper')
    expect(inbound.html).toContain('jane@example.com')

    const auto = sendMock.mock.calls[1][0]
    expect(auto.to).toBe('jane@example.com')
    expect(auto.subject).toBe('We got your message — Trailstead Guide')
    expect(auto.html).toContain('Hey Jane')
  })

  it('escapes HTML in user input to prevent injection', async () => {
    const res = await POST(
      buildRequest({
        ...validBody,
        name: 'Bobby <script>alert(1)</script>',
        message: '<img src=x onerror=alert(1)>',
      }),
    )
    expect(res.status).toBe(200)
    const inbound = sendMock.mock.calls[0][0]
    expect(inbound.html).not.toContain('<script>alert(1)</script>')
    expect(inbound.html).not.toContain('<img src=x')
    expect(inbound.html).toContain('&lt;script&gt;')
  })

  it('returns 500 when inbound send errors out', async () => {
    sendMock.mockResolvedValueOnce({ data: null, error: { message: 'Resend down' } })
    const res = await POST(buildRequest(validBody))
    expect(res.status).toBe(500)
    // Auto-reply should not be attempted if inbound failed.
    expect(sendMock).toHaveBeenCalledTimes(1)
  })

  it('still returns 200 if only the auto-reply fails (inbound is the load-bearing email)', async () => {
    sendMock
      .mockResolvedValueOnce({ data: { id: 'inbound_ok' }, error: null })
      .mockResolvedValueOnce({ data: null, error: { message: 'Auto-reply failed' } })
    const res = await POST(buildRequest(validBody))
    expect(res.status).toBe(200)
    expect(sendMock).toHaveBeenCalledTimes(2)
  })
})

describe('POST /api/contact — strict Turnstile enforcement', () => {
  beforeAll(() => {
    process.env.TURNSTILE_SECRET_KEY = 'test_turnstile_secret'
  })

  beforeEach(() => {
    sendMock.mockClear()
    vi.restoreAllMocks()
  })

  it('rejects 400 when secret is configured but no token submitted', async () => {
    const res = await POST(buildRequest(validBody))
    expect(res.status).toBe(400)
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('rejects 400 when token fails Cloudflare siteverify', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ success: false }), { status: 200 }),
      ),
    )
    const res = await POST(buildRequest({ ...validBody, turnstileToken: 'bad-token' }))
    expect(res.status).toBe(400)
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('accepts and sends when token passes Cloudflare siteverify', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ success: true }), { status: 200 }),
      ),
    )
    const res = await POST(buildRequest({ ...validBody, turnstileToken: 'good-token' }))
    expect(res.status).toBe(200)
    expect(sendMock).toHaveBeenCalledTimes(2)
  })
})
