'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Props = {
  planSlug: string
  adults?: number
  kids?: number
}

// Per-pageview dismissal key. Reset across navigations so the bar
// reliably appears on every plan view; only an X click in the current
// view suppresses it.
const STORAGE_KEY = 'tsg:floating-email-dismissed-v2'

/**
 * Floating bottom bar — renders on every plan page from initial mount.
 * Two calls to action:
 *   1. Email this plan (lightweight capture to /api/subscribe)
 *   2. Download the Trip Pack PDF — routes to /trip-pack/<slug>
 *
 * Dismissal is sticky for the session via sessionStorage.
 */
export default function FloatingEmailBar({ planSlug, adults, kids }: Props) {
  const [visible, setVisible] = useState(true)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  // Clear any stale per-tab dismissal so each fresh plan view shows the
  // bar. Dismissal still works within the current view via dismiss().
  useEffect(() => {
    if (typeof window === 'undefined') return
    sessionStorage.removeItem(STORAGE_KEY)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, planSlug, source: 'post-plan' }),
      })
      if (!res.ok) throw new Error('send failed')
      setStatus('success')
      setTimeout(() => setVisible(false), 2800)
    } catch {
      setStatus('error')
    }
  }

  function dismiss() {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, planSlug)
    }
    setVisible(false)
  }

  const tripPackHref = (() => {
    const params = new URLSearchParams()
    if (typeof adults === 'number') params.set('adults', String(adults))
    if (typeof kids === 'number') params.set('kids', String(kids))
    const qs = params.toString()
    return `/trip-pack/${planSlug}${qs ? `?${qs}` : ''}`
  })()

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Get this plan"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] max-w-2xl"
      style={{ animation: 'tsg-slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      <style jsx global>{`
        @keyframes tsg-slide-up {
          from { transform: translate(-50%, calc(100% + 1rem)); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
      `}</style>
      <div className="relative bg-[#1f3622] text-white rounded-2xl shadow-2xl shadow-stone-900/30 border border-[#2a4a30] px-5 py-5 sm:px-7 sm:py-6">
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#2a4a30] border border-[#3a5a3e] text-stone-200 hover:text-white hover:bg-[#3a5a3e] transition-colors flex items-center justify-center"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {status === 'success' ? (
          <p className="text-sm sm:text-base text-[#c9d4b5] font-medium text-center py-2">
            ✓ Plan sent to your inbox.
          </p>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#c9d4b5] font-semibold mb-1.5">
                Take it with you
              </p>
              <p className="text-base sm:text-lg font-semibold leading-tight">Get this plan in your inbox</p>
              <p className="text-xs sm:text-sm text-stone-300 leading-snug mt-1">
                Email a link, or grab the print-ready Trip Pack PDF.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-2.5">
              <label htmlFor="floating-email" className="sr-only">Email address</label>
              <input
                id="floating-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 min-w-0 rounded-lg px-3.5 py-2.5 bg-[#2a4a30] text-white text-sm placeholder:text-stone-400 border border-[#3a5a3e] focus:outline-none focus:ring-2 focus:ring-[#c9d4b5]"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="rounded-lg bg-white text-[#1f3622] text-sm font-semibold px-5 py-2.5 hover:bg-stone-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === 'loading' ? 'Sending…' : 'Email my plan'}
              </button>
            </form>

            <div className="flex items-center gap-3 text-[11px] text-stone-400 uppercase tracking-widest">
              <span className="flex-1 h-px bg-[#3a5a3e]" />
              <span>or</span>
              <span className="flex-1 h-px bg-[#3a5a3e]" />
            </div>

            <Link
              href={tripPackHref}
              className="flex items-center justify-center gap-2 w-full rounded-lg bg-transparent border-2 border-white/90 text-white text-sm font-semibold px-5 py-2.5 hover:bg-white hover:text-[#1f3622] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download PDF
            </Link>
          </div>
        )}

        {status === 'error' && (
          <p className="mt-2 text-xs text-red-300 text-center">Something went wrong. Please try again.</p>
        )}
      </div>
    </div>
  )
}
