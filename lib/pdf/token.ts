/**
 * Stateless signed download tokens. Encodes the plan + party + nights + a
 * timestamp; HMAC-signed with TRIP_PACK_SECRET. No DB needed — the link
 * itself proves entitlement.
 *
 * Tokens are valid for 24 hours so an email link works the next morning
 * but expired ones can't be replayed indefinitely.
 */

import crypto from 'node:crypto'
import type { PartySize, PlanSlug } from '@/types'

const TTL_MS = 24 * 60 * 60 * 1000 // 24h

export type TripPackTokenPayload = {
  plan: PlanSlug
  adults: number
  kids: number
  nights: number
  /** issued-at, ms */
  iat: number
  /** Optional purchaser email (for analytics, not displayed) */
  email?: string
}

function getSecret(): string {
  return (
    process.env.TRIP_PACK_SECRET ||
    // Dev fallback so local works without env setup. NOT for production.
    'dev-only-trailstead-trip-pack-secret-change-in-prod'
  )
}

function b64url(buf: Buffer): string {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromB64url(s: string): Buffer {
  const pad = s.length % 4 === 0 ? '' : '='.repeat(4 - (s.length % 4))
  return Buffer.from(s.replace(/-/g, '+').replace(/_/g, '/') + pad, 'base64')
}

export function signToken(p: Omit<TripPackTokenPayload, 'iat'>): string {
  const payload: TripPackTokenPayload = { ...p, iat: Date.now() }
  const body = b64url(Buffer.from(JSON.stringify(payload)))
  const sig = b64url(
    crypto.createHmac('sha256', getSecret()).update(body).digest(),
  )
  return `${body}.${sig}`
}

export function verifyToken(token: string): TripPackTokenPayload | null {
  const [body, sig] = token.split('.')
  if (!body || !sig) return null
  const expected = b64url(
    crypto.createHmac('sha256', getSecret()).update(body).digest(),
  )
  if (
    sig.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  ) {
    return null
  }
  try {
    const payload: TripPackTokenPayload = JSON.parse(fromB64url(body).toString('utf8'))
    if (Date.now() - payload.iat > TTL_MS) return null
    return payload
  } catch {
    return null
  }
}

export function tokenToInput(p: TripPackTokenPayload): {
  planSlug: PlanSlug
  party: PartySize
  nights: number
} {
  return {
    planSlug: p.plan,
    party: { adults: p.adults, kids: p.kids },
    nights: p.nights,
  }
}
