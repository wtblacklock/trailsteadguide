'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Props = {
  printableSlug: string
  /** Where to send the visitor after a successful email submit. */
  printHref: string
}

// Per-pageview dismissal key — cleared on mount so each fresh printable
// view shows the bar; only an explicit X click in the current view
// suppresses it for the rest of the session on this slug.
const STORAGE_KEY = 'tsg:printable-floating-dismissed-v1'

/**
 * Floating bottom bar — renders on every printable landing page from
 * initial mount. Mirrors the FloatingEmailBar pattern used on plan pages
 * so every download/capture surface across the site reads as the same
 * family.
 *
 * Submits to /api/subscribe with source: 'printable' + printableSlug,
 * which both subscribes to ConvertKit (with the printable tag) and
 * fires a transactional Resend email with the print-view link.
 */
export default function PrintableFloatingBar({ printableSlug, printHref }: Props) {
  const [visible, setVisible] = useState(true)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

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
        body: JSON.stringify({
          email,
          source: 'printable',
          printableSlug,
        }),
      })
      if (!res.ok) throw new Error('send failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  function dismiss() {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, printableSlug)
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Get the printable"
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
          <div className="space-y-3">
            <p className="text-sm sm:text-base text-[#c9d4b5] font-medium text-center">
              ✓ Printable on its way to your inbox.
            </p>
            <Link
              href={printHref}
              target="_blank"
              rel="noopener"
              className="flex items-center justify-center gap-2 w-full rounded-lg bg-white text-[#1f3622] text-sm font-semibold px-5 py-2.5 hover:bg-stone-100 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              Open the print view now
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#c9d4b5] font-semibold mb-1.5">
                Take it with you
              </p>
              <p className="text-base sm:text-lg font-semibold leading-tight">Get this printable in your inbox</p>
              <p className="text-xs sm:text-sm text-stone-300 leading-snug mt-1">
                One email with the print-view link. One-click unsubscribe, no spam.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-2.5">
              <label htmlFor="printable-floating-email" className="sr-only">Email address</label>
              <input
                id="printable-floating-email"
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
                {status === 'loading' ? 'Sending…' : 'Email it to me'}
              </button>
            </form>
          </div>
        )}

        {status === 'error' && (
          <p className="mt-2 text-xs text-red-300 text-center">Something went wrong. Please try again.</p>
        )}
      </div>
    </div>
  )
}
