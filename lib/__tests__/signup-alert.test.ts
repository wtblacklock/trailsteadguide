// @vitest-environment node
/**
 * sendSignupAlert test. Resend is mocked at the module level so no real
 * email is sent, but the helper runs for real - env gating, the kill
 * switch, recipient override, escaping, and the failed-Kit variant.
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

import { sendSignupAlert } from '../signup-alert'

beforeAll(() => {
  process.env.RESEND_API_KEY = 'test_resend_key'
  process.env.EMAIL_FROM = 'Trailstead <hello@trailsteadguide.test>'
})

beforeEach(() => {
  sendMock.mockClear()
  delete process.env.SIGNUP_ALERTS
  delete process.env.SIGNUP_ALERT_TO
})

describe('sendSignupAlert', () => {
  it('sends an alert with the source and requested plan', async () => {
    await sendSignupAlert({
      email: 'camper@example.com',
      source: 'post-plan',
      planSlug: 'first-night-camp',
      tagIds: [123],
      kitOk: true,
    })

    expect(sendMock).toHaveBeenCalledTimes(1)
    const arg = sendMock.mock.calls[0][0]
    expect(arg.subject).toBe('[Trailstead] Signup: camper@example.com')
    expect(arg.to).toBe('wtblacklock+signup@gmail.com')
    expect(arg.text).toContain('Post-plan capture')
    expect(arg.text).toContain('first-night-camp')
    expect(arg.text).toContain('123')
  })

  it('flags a failed Kit write in the subject and body', async () => {
    await sendSignupAlert({
      email: 'lost@example.com',
      source: 'homepage',
      kitOk: false,
    })

    const arg = sendMock.mock.calls[0][0]
    expect(arg.subject).toBe('[Trailstead] Signup (Kit FAILED): lost@example.com')
    expect(arg.text).toContain('NOT on the list')
    expect(arg.html).toContain('NOT on the list')
  })

  it('respects the SIGNUP_ALERTS=off kill switch', async () => {
    process.env.SIGNUP_ALERTS = 'off'
    await sendSignupAlert({ email: 'quiet@example.com', kitOk: true })
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('honours SIGNUP_ALERT_TO', async () => {
    process.env.SIGNUP_ALERT_TO = 'someone@else.test'
    await sendSignupAlert({ email: 'camper@example.com', kitOk: true })
    expect(sendMock.mock.calls[0][0].to).toBe('someone@else.test')
  })

  it('escapes HTML in the address so a crafted signup cannot inject markup', async () => {
    await sendSignupAlert({
      email: '"><img src=x onerror=alert(1)>@example.com',
      kitOk: true,
    })

    const arg = sendMock.mock.calls[0][0]
    expect(arg.html).not.toContain('<img src=x')
    expect(arg.html).toContain('&lt;img src=x')
  })

  it('does nothing when Resend is not configured', async () => {
    const key = process.env.RESEND_API_KEY
    delete process.env.RESEND_API_KEY
    await sendSignupAlert({ email: 'camper@example.com', kitOk: true })
    expect(sendMock).not.toHaveBeenCalled()
    process.env.RESEND_API_KEY = key
  })
})
