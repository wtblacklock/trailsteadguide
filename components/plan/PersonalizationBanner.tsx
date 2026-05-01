'use client'
import { useEffect, useState } from 'react'
import { readSession } from '@/lib/session'
import { SessionSnapshot } from '@/types'

const AUTO_DISMISS_MS = 6000

export default function PersonalizationBanner() {
  const [session, setSession] = useState<SessionSnapshot | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const s = readSession()
    setSession(s)
    if (s) {
      // small delay so the slide-in reads as an arrival, not a page-load flash
      const showT = setTimeout(() => setVisible(true), 200)
      const hideT = setTimeout(() => setVisible(false), AUTO_DISMISS_MS)
      return () => {
        clearTimeout(showT)
        clearTimeout(hideT)
      }
    }
  }, [])

  if (!session) return null

  const AGE_LABELS: Record<string, string> = {
    under_5: 'under 5',
    '5_10': '5–10',
    '10+': '10+',
  }
  const ageGroups = Array.isArray(session.kidsAgeGroup) ? session.kidsAgeGroup : [session.kidsAgeGroup]
  const labeled = ageGroups
    .filter((a) => a !== 'none')
    .map((a) => AGE_LABELS[a] ?? a)
  const kidsText = labeled.length === 0 ? 'no kids' : `kids aged ${labeled.join(' & ')}`

  const experienceText = {
    none: 'brand new to camping',
    some: 'some camping experience',
    confident: 'confident campers',
  }[session.experience]

  return (
    <div
      aria-live="polite"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[60] transition-all duration-500 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-3 pl-4 pr-2 py-2 rounded-full bg-stone-900 text-white shadow-lg ring-1 ring-stone-800">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/10">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <p className="text-sm leading-tight whitespace-nowrap">
          Personalized for <span className="font-medium">{experienceText}</span> with <span className="font-medium">{kidsText}</span>.
        </p>
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Dismiss"
          className="inline-flex items-center justify-center w-7 h-7 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  )
}
