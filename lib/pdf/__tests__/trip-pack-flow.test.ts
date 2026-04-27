// @vitest-environment node
/**
 * Trip Pack flow integration test.
 *
 * Exercises the real code path a paying user follows after Stripe webhook:
 *   sign token → render HTML → Puppeteer PDF → send email
 *
 * Resend is mocked at the SDK level so no real email goes out, but the
 * actual Resend code path executes (constructor + emails.send call shape
 * verified). The PDF render uses real Puppeteer against the local Chrome
 * binary — CI sets PUPPETEER_EXECUTABLE_PATH to a setup-chrome install.
 */

import { describe, expect, it, vi, beforeAll } from 'vitest'

// Capture send mock with vi.hoisted so the mock factory below can reference it.
const { sendMock } = vi.hoisted(() => ({
  sendMock: vi.fn().mockResolvedValue({ data: { id: 'test_message_id' }, error: null }),
}))

vi.mock('resend', () => ({
  Resend: class FakeResend {
    emails = { send: sendMock }
  },
}))

import { signToken, verifyToken, tokenToInput } from '@/lib/pdf/token'
import { renderTripPackHtml } from '@/lib/pdf/template'
import { renderHtmlToPdf } from '@/lib/pdf/render'
import { sendTripPackEmail } from '@/lib/pdf/email'

beforeAll(() => {
  process.env.RESEND_API_KEY = 'test_resend_key'
  process.env.EMAIL_FROM = 'trips@trailsteadguide.test'
  process.env.TRIP_PACK_SECRET = 'integration-test-secret'
})

describe('trip-pack purchase → PDF → email', () => {
  it(
    'signs a token, renders a valid PDF, and dispatches the email',
    async () => {
      // 1. Sign the token the same way the Stripe webhook does.
      const token = signToken({
        plan: 'first-night-camp',
        adults: 2,
        kids: 1,
        nights: 1,
        email: 'buyer@example.com',
      })

      const payload = verifyToken(token)
      expect(payload, 'token should round-trip through verifyToken').not.toBeNull()
      expect(payload!.plan).toBe('first-night-camp')

      // 2. Render the HTML the user would see in /api/generate-pdf.
      const html = renderTripPackHtml(tokenToInput(payload!))
      expect(html).toContain('First Night Camp')
      expect(html).toMatch(/<html/i)

      // 3. Real Puppeteer render. Buffer must be a valid PDF.
      const pdf = await renderHtmlToPdf(html)
      expect(pdf, 'PDF buffer returned').toBeInstanceOf(Buffer)
      expect(pdf.byteLength, 'PDF should be non-trivial').toBeGreaterThan(20_000)
      expect(pdf.subarray(0, 5).toString('ascii')).toBe('%PDF-')

      // 4. Email dispatch — Resend SDK is mocked, but sendTripPackEmail
      //    still constructs Resend(apiKey) and calls emails.send().
      const downloadUrl = `https://www.trailsteadguide.com/api/generate-pdf?token=${token}`
      const result = await sendTripPackEmail({
        to: 'buyer@example.com',
        plan: 'first-night-camp',
        downloadUrl,
        tier: 'basic',
      })
      expect(result.ok, JSON.stringify(result)).toBe(true)
      expect(result.skipped).toBeUndefined()

      // 5. Verify the SDK got the right call shape.
      expect(sendMock).toHaveBeenCalledTimes(1)
      const call = sendMock.mock.calls[0][0]
      expect(call.to).toBe('buyer@example.com')
      expect(call.from).toBe('trips@trailsteadguide.test')
      expect(call.subject).toContain('First Night Camp')
      expect(call.subject).toMatch(/Trip Pack/i)
      expect(call.html).toContain(downloadUrl)
      expect(call.text).toContain(downloadUrl)
    },
    60_000, // Puppeteer launch + render headroom
  )

  it('skips cleanly when Resend env is unset', async () => {
    sendMock.mockClear()
    const prevKey = process.env.RESEND_API_KEY
    delete process.env.RESEND_API_KEY
    try {
      const result = await sendTripPackEmail({
        to: 'noenv@example.com',
        plan: 'backyard-test',
        downloadUrl: 'https://example.com/pdf',
      })
      expect(result.ok).toBe(false)
      expect(result.skipped).toBe(true)
      expect(sendMock).not.toHaveBeenCalled()
    } finally {
      process.env.RESEND_API_KEY = prevKey
    }
  })
})
