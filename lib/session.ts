import type { SessionSnapshot } from '@/types'

const SESSION_KEY = 'trailstead_session'

export function writeSession(snapshot: SessionSnapshot): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(SESSION_KEY, JSON.stringify(snapshot))
}

export function readSession(): SessionSnapshot | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as SessionSnapshot
  } catch {
    return null
  }
}

export function clearSession(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(SESSION_KEY)
}
