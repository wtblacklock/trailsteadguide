// @vitest-environment node
/**
 * Trip Pack cart-abandon email test. Resend SDK mocked at the module
 * level so no real email goes out, but sendTripPackAbandonEmail still
 * constructs Resend(apiKey) and calls emails.send with the correct
 * call shape.
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

import { sendTripPackAbandonEmail } from '@/lib/pdf/email'

beforeAll(() => {
  process.env.RESEND_API_KEY = 'test_resend_key'
  process.env.EMAIL_FROM = 'trips@trailsteadguide.test'
})

beforeEach(() => {
  sendMock.mockClear()
})

describe('sendTripPackAbandonEmail', () => {
  it('sends a recovery email with retry URL and human-readable plan title', async () => {
    const retryUrl = 'https://www.trailsteadguide.com/trip-pack/first-night-camp?recover=1'
    const result = await sendTripPackAbandonEmail({
      to: 'maybe-buyer@example.com',
      plan: 'first-night-camp',
      retryUrl,
    })

    expect(result.ok).toBe(true)
    expect(sendMock).toHaveBeenCalledTimes(1)

    const call = sendMock.mock.calls[0][0]
    expect(call.to).toBe('maybe-buyer@example.com')
    expect(call.from).toBe('trips@trailsteadguide.test')
    expect(call.subject).toMatch(/First Night Camp/)
    expect(call.subject).toMatch(/still waiting/i)
    expect(call.html).toContain(retryUrl)
    expect(call.text).toContain(retryUrl)
  })

  it('skips cleanly when Resend env is unset', async () => {
    const prev = process.env.RESEND_API_KEY
    delete process.env.RESEND_API_KEY
    try {
      const result = await sendTripPackAbandonEmail({
        to: 'noenv@example.com',
        plan: 'backyard-test',
        retryUrl: 'https://example.com/x',
      })
      expect(result.ok).toBe(false)
      expect(result.skipped).toBe(true)
      expect(sendMock).not.toHaveBeenCalled()
    } finally {
      process.env.RESEND_API_KEY = prev
    }
  })

  it('returns error when Resend reports a send error', async () => {
    sendMock.mockResolvedValueOnce({ data: null, error: { message: 'Resend fault' } })
    const result = await sendTripPackAbandonEmail({
      to: 'fault@example.com',
      plan: 'easy-family-basecamp',
      retryUrl: 'https://example.com/x',
    })
    expect(result.ok).toBe(false)
    expect(result.skipped).toBeUndefined()
    expect(result.error).toContain('Resend fault')
  })
})
