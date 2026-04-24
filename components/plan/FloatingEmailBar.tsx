'use client'

import { useEffect, useState } from 'react'

type Props = {
  planSlug: string
}

const STORAGE_KEY = 'tsg:floating-email-dismissed'

export default function FloatingEmailBar({ planSlug }: Props) {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Honor prior dismissal within this session
    if (sessionStorage.getItem(STORAGE_KEY) === planSlug) return

    const onScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true)
        window.removeEventListener('scroll', onScroll)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // handle initial scroll if user already scrolled
    return () => window.removeEventListener('scroll', onScroll)
  }, [planSlug])

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

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Email my plan"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] max-w-xl animate-[slide-up_0.35s_cubic-bezier(0.16,1,0.3,1)]"
      style={{
        // Inline keyframes so we don't need a tailwind plugin
        animation: 'tsg-slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <style jsx global>{`
        @keyframes tsg-slide-up {
          from { transform: translate(-50%, calc(100% + 1rem)); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
      `}</style>
      <div className="relative bg-stone-900 text-white rounded-2xl shadow-2xl shadow-stone-900/20 border border-stone-800 px-4 py-3 sm:px-5 sm:py-4">
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-stone-800 border border-stone-700 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors flex items-center justify-center"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {status === 'success' ? (
          <p className="text-sm sm:text-base text-green-400 font-medium text-center py-1">
            ✓ Plan sent to your inbox.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <div className="flex-1 min-w-0">
              <p className="hidden sm:block text-sm font-medium text-white leading-tight">Get this plan in your inbox</p>
              <p className="hidden sm:block text-xs text-stone-400 leading-tight mt-0.5">Save it, share it, reference it anytime.</p>
              <p className="sm:hidden text-sm font-medium text-white mb-2 leading-tight">Email this plan to yourself</p>
            </div>
            <label htmlFor="floating-email" className="sr-only">Email address</label>
            <input
              id="floating-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 sm:flex-initial sm:w-56 rounded-md px-3 py-2 bg-stone-800 text-white text-sm placeholder:text-stone-500 border border-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-md bg-white text-stone-900 text-sm font-medium px-4 py-2 hover:bg-stone-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {status === 'loading' ? 'Sending…' : 'Email my plan'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-2 text-xs text-red-400 text-center">Something went wrong. Please try again.</p>
        )}
      </div>
    </div>
  )
}
