// @vitest-environment node
/**
 * parsePartySize is the single entry point for URL-derived adult/kid
 * counts on plan and Trip Pack pages. Defaults, clamping, and
 * NaN-safety must hold or the downstream PDF/checklist scales wrong.
 */

import { describe, expect, it } from 'vitest'
import { parsePartySize } from '@/lib/party-size'

describe('parsePartySize', () => {
  it('defaults to 2 adults / 2 kids when params are absent', () => {
    expect(parsePartySize({})).toEqual({ adults: 2, kids: 2 })
  })

  it('parses well-formed numeric strings', () => {
    expect(parsePartySize({ adults: '3', kids: '4' })).toEqual({ adults: 3, kids: 4 })
  })

  it('falls back to defaults on non-numeric input', () => {
    expect(parsePartySize({ adults: 'banana', kids: 'pear' })).toEqual({ adults: 2, kids: 2 })
  })

  it('clamps adults to a minimum of 1 — using default when below', () => {
    // adults=0 fails the `>= 1` guard, defaults to 2.
    expect(parsePartySize({ adults: '0', kids: '3' })).toEqual({ adults: 2, kids: 3 })
  })

  it('allows kids=0 (a valid party with no kids)', () => {
    expect(parsePartySize({ adults: '2', kids: '0' })).toEqual({ adults: 2, kids: 0 })
  })

  it('rejects negative kids — falls back to default', () => {
    expect(parsePartySize({ adults: '2', kids: '-3' })).toEqual({ adults: 2, kids: 2 })
  })

  it('clamps adults to 12 max', () => {
    expect(parsePartySize({ adults: '50', kids: '2' })).toEqual({ adults: 12, kids: 2 })
  })

  it('clamps kids to 12 max', () => {
    expect(parsePartySize({ adults: '2', kids: '99' })).toEqual({ adults: 2, kids: 12 })
  })

  it('parses leading-numeric strings via parseInt semantics', () => {
    // parseInt('3 adults', 10) === 3 — documenting intentional behavior.
    expect(parsePartySize({ adults: '3 adults', kids: '4 kids' })).toEqual({ adults: 3, kids: 4 })
  })

  it('handles independent failure of each field', () => {
    expect(parsePartySize({ adults: 'oops', kids: '5' })).toEqual({ adults: 2, kids: 5 })
    expect(parsePartySize({ adults: '3', kids: undefined })).toEqual({ adults: 3, kids: 2 })
  })
})
