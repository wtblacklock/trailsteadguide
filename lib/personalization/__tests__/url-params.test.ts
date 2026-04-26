import { describe, it, expect } from 'vitest'
import { parseQuizOutput, serializeQuizOutput } from '../url-params'

describe('parseQuizOutput', () => {
  it('falls back to defaults for legacy adults/kids-only URLs', () => {
    const out = parseQuizOutput('first-night-camp', { adults: '2', kids: '2' })
    expect(out.partySize).toEqual({ adults: 2, kids: 2 })
    expect(out.groupType).toBe('family') // because kids > 0
    expect(out.kidsAge).toBe('5_10') // safe default
    expect(out.activityType).toBe('balanced')
    expect(out.comfortLevel).toBe('balanced')
  })

  it('infers couple/solo for kids=0 when group not specified', () => {
    expect(parseQuizOutput('first-night-camp', { adults: '2', kids: '0' }).groupType).toBe('couple')
    expect(parseQuizOutput('first-night-camp', { adults: '1', kids: '0' }).groupType).toBe('solo')
  })

  it('honors explicit group=family even with no kids', () => {
    const out = parseQuizOutput('first-night-camp', { adults: '2', kids: '0', group: 'family' })
    expect(out.groupType).toBe('family')
    expect(out.hasKids).toBe(false)
    expect(out.kidsAge).toBeUndefined()
  })

  it('rejects invalid enum values and uses defaults', () => {
    const out = parseQuizOutput('first-night-camp', {
      adults: '2',
      kids: '2',
      activity: 'lounging',
      comfort: 'plush',
    })
    expect(out.activityType).toBe('balanced')
    expect(out.comfortLevel).toBe('balanced')
  })

  it('parses a fully specified URL', () => {
    const out = parseQuizOutput('first-weekend-camp', {
      adults: '2',
      kids: '3',
      group: 'family',
      kidsAge: 'under_5',
      activity: 'relaxing',
      comfort: 'comfort-first',
    })
    expect(out).toMatchObject({
      planSlug: 'first-weekend-camp',
      partySize: { adults: 2, kids: 3 },
      peopleBucket: '5+',
      groupType: 'family',
      hasKids: true,
      kidsAge: 'under_5',
      activityType: 'relaxing',
      comfortLevel: 'comfort-first',
    })
  })
})

describe('serializeQuizOutput', () => {
  it('round-trips through parseQuizOutput', () => {
    const original = parseQuizOutput('first-weekend-camp', {
      adults: '2',
      kids: '2',
      group: 'family',
      kidsAge: 'under_5',
      activity: 'active',
      comfort: 'comfort-first',
    })
    const sp = serializeQuizOutput(original)
    const params = Object.fromEntries(sp)
    const reparsed = parseQuizOutput('first-weekend-camp', params)
    expect(reparsed).toEqual(original)
  })

  it('omits kidsAge when no kids', () => {
    const out = parseQuizOutput('first-night-camp', {
      adults: '2',
      kids: '0',
      group: 'couple',
    })
    const sp = serializeQuizOutput(out)
    expect(sp.has('kidsAge')).toBe(false)
  })
})
