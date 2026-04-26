import { describe, it, expect, beforeEach } from 'vitest'

const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
  }
})()

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock })
Object.defineProperty(globalThis, 'window', { value: globalThis })

import { writeSession, readSession, clearSession } from '../session'
import type { SessionSnapshot } from '@/types'

const mockSnapshot: SessionSnapshot = {
  experience: 'none',
  kidsAgeGroup: ['under_5'],
  intent: 'real-trip',
  activityType: 'relaxing',
  comfortLevel: 'balanced',
  partySize: { adults: 2, kids: 2 },
  planSlug: 'first-night-camp',
  timestamp: 1714000000000,
}

describe('session helpers', () => {
  beforeEach(() => localStorageMock.clear())

  it('writeSession stores snapshot as JSON', () => {
    writeSession(mockSnapshot)
    const raw = localStorageMock.getItem('trailstead_session')
    expect(JSON.parse(raw!)).toEqual(mockSnapshot)
  })

  it('readSession returns null when nothing stored', () => {
    expect(readSession()).toBeNull()
  })

  it('readSession returns the stored snapshot', () => {
    writeSession(mockSnapshot)
    expect(readSession()).toEqual(mockSnapshot)
  })

  it('readSession returns null on corrupt JSON', () => {
    localStorageMock.setItem('trailstead_session', 'not-json')
    expect(readSession()).toBeNull()
  })

  it('clearSession removes stored snapshot', () => {
    writeSession(mockSnapshot)
    clearSession()
    expect(readSession()).toBeNull()
  })
})
