// @vitest-environment node
/**
 * /api/affiliate-alert route test. Resend is mocked at the module level so
 * no real email is sent, but the handler runs for real - origin check,
 * validation, rate limit, dedupe, and the send call.
 *
 * The route's rate limiter and deduper are module-scoped, so each test uses
 * a distinct IP to stay isolated from its neighbours.
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
  delete process.env.AFFILIATE_ALERTS
  delete process.env.AFFILIATE_ALERT_TO
})

beforeEach(() => {
  sendMock.mockClear()
})

let ipCounter = 0
function post(body: unknown, headers: Record<string, string> = {}) {
  ipCounter += 1
  return POST(
    new Request('https://www.trailsteadguide.com/api/affiliate-alert', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        origin: 'https://www.trailsteadguide.com',
        'x-forwarded-for': `10.0.0.${ipCounter}`,
        ...headers,
      },
      body: JSON.stringify(body),
    }),
  )
}

const VALID = {
  product: 'B003ZBI2LK',
  location: '/guides/camping-with-kids-first-time',
  linkText: 'Coleman Sundome 4-Person Tent',
  subtag: 'camping-with-kids-first-time',
}

describe('/api/affiliate-alert', () => {
  it('sends an email for a valid click', async () => {
    const res = await post(VALID)
    expect(res.status).toBe(200)
    expect(sendMock).toHaveBeenCalledTimes(1)

    const sent = sendMock.mock.calls[0][0]
    expect(sent.from).toBe(process.env.EMAIL_FROM)
    expect(sent.to).toBe('wtblacklock+affiliate@gmail.com')
    expect(sent.subject).toContain('Coleman Sundome 4-Person Tent')
    expect(sent.html).toContain('B003ZBI2LK')
    expect(sent.text).toContain('/guides/camping-with-kids-first-time')
  })

  it('preserves spaces and hyphens in the link text', async () => {
    await post(VALID)
    const sent = sendMock.mock.calls[0][0]
    expect(sent.subject).toBe('[Trailstead] Amazon click: Coleman Sundome 4-Person Tent')
  })

  it('links an ASIN to the product page and a query to search', async () => {
    await post(VALID)
    expect(sendMock.mock.calls[0][0].text).toContain('https://www.amazon.com/dp/B003ZBI2LK')

    sendMock.mockClear()
    await post({ ...VALID, product: 'family tent' })
    expect(sendMock.mock.calls[0][0].text).toContain('https://www.amazon.com/s?k=family%20tent')
  })

  it('escapes HTML so link text cannot inject markup into the email', async () => {
    await post({ ...VALID, linkText: '<img src=x onerror=alert(1)>' })
    const sent = sendMock.mock.calls[0][0]
    expect(sent.html).not.toContain('<img src=x')
    expect(sent.html).toContain('&lt;img src=x')
  })

  it('rejects a foreign origin without sending', async () => {
    const res = await post(VALID, { origin: 'https://evil.example.com' })
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true, skipped: 'origin' })
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('accepts a request with no origin or referer', async () => {
    ipCounter += 1
    const res = await POST(
      new Request('https://www.trailsteadguide.com/api/affiliate-alert', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-forwarded-for': `10.1.0.${ipCounter}`,
        },
        body: JSON.stringify(VALID),
      }),
    )
    expect(res.status).toBe(200)
    expect(sendMock).toHaveBeenCalledTimes(1)
  })

  it('skips a missing product or a non-path location', async () => {
    expect(await (await post({ ...VALID, product: '' })).json()).toEqual({
      ok: true,
      skipped: 'invalid',
    })
    expect(await (await post({ ...VALID, location: 'https://evil.com' })).json()).toEqual({
      ok: true,
      skipped: 'invalid',
    })
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('collapses a repeat click on the same product from the same IP', async () => {
    const headers = { 'x-forwarded-for': '10.9.9.9' }
    const first = await POST(
      new Request('https://www.trailsteadguide.com/api/affiliate-alert', {
        method: 'POST',
        headers: { origin: 'https://www.trailsteadguide.com', ...headers },
        body: JSON.stringify(VALID),
      }),
    )
    expect(first.status).toBe(200)
    expect(sendMock).toHaveBeenCalledTimes(1)

    const second = await POST(
      new Request('https://www.trailsteadguide.com/api/affiliate-alert', {
        method: 'POST',
        headers: { origin: 'https://www.trailsteadguide.com', ...headers },
        body: JSON.stringify(VALID),
      }),
    )
    expect(await second.json()).toEqual({ ok: true, skipped: 'duplicate' })
    expect(sendMock).toHaveBeenCalledTimes(1)
  })

  it('rate limits a flood from one IP', async () => {
    const headers = { 'x-forwarded-for': '10.8.8.8' }
    const results: string[] = []
    for (let i = 0; i < 12; i += 1) {
      const res = await POST(
        new Request('https://www.trailsteadguide.com/api/affiliate-alert', {
          method: 'POST',
          headers: { origin: 'https://www.trailsteadguide.com', ...headers },
          // Distinct product each time so dedupe is not what stops it.
          body: JSON.stringify({ ...VALID, product: `B00000000${i}` }),
        }),
      )
      results.push((await res.json()).skipped ?? 'sent')
    }
    expect(results).toContain('rate-limited')
    expect(sendMock.mock.calls.length).toBeLessThanOrEqual(8)
  })

  it('sends nothing when disabled by env', async () => {
    process.env.AFFILIATE_ALERTS = 'off'
    const res = await post(VALID)
    expect(await res.json()).toEqual({ ok: true, skipped: 'disabled' })
    expect(sendMock).not.toHaveBeenCalled()
    delete process.env.AFFILIATE_ALERTS
  })
})
