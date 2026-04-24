'use client'
import { useState } from 'react'
import Link from 'next/link'

type Props = {
  planSlug: string
  adults?: number
  kids?: number
}

/**
 * The end-of-plan conversion block. Two paths:
 *  1. Email this plan (lightweight capture → /api/subscribe)
 *  2. Download the full Trip Pack PDF → routes to /trip-pack/<slug>
 *     (which is where the paywall + email-gate live; Stripe is disabled
 *      for now, so the flow is identical to clicking "Download PDF" after
 *      entering an email on the paywall.)
 */
export default function PostPlanEmailCapture({ planSlug, adults, kids }: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, planSlug, source: 'post-plan' }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const tripPackHref = (() => {
    const params = new URLSearchParams()
    if (typeof adults === 'number') params.set('adults', String(adults))
    if (typeof kids === 'number') params.set('kids', String(kids))
    const qs = params.toString()
    return `/trip-pack/${planSlug}${qs ? `?${qs}` : ''}`
  })()

  return (
    <section className="py-20 bg-gradient-to-b from-[#f5efe2] to-[#ece4d2]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-5">
          {/* Card 1 — Download the Trip Pack PDF */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-7 flex flex-col">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#3a5a3e] font-semibold mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3a5a3e]" />
                Trip Pack PDF
              </div>
              <h3 className="text-2xl font-serif font-semibold text-[#1f3622] mb-2 leading-tight">
                Print-ready trip plan
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed mb-5">
                7-page PDF with your timeline, packing list, gear set, and mistake-prevention guide. Scaled to your party size.
              </p>
              <ul className="text-xs text-stone-500 space-y-1.5 mb-6">
                <li>&middot; Hour-by-hour timeline</li>
                <li>&middot; Packing list &amp; curated gear</li>
                <li>&middot; Yours to keep forever</li>
              </ul>
            </div>
            <Link
              href={tripPackHref}
              className="block w-full text-center bg-[#1f3622] hover:bg-[#2a4a30] text-white font-semibold py-3.5 rounded-xl transition-colors"
            >
              Download PDF
            </Link>
          </div>

          {/* Card 2 — Email the plan */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-7 flex flex-col">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#3a5a3e] font-semibold mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3a5a3e]" />
                Email it to me
              </div>
              <h3 className="text-2xl font-serif font-semibold text-[#1f3622] mb-2 leading-tight">
                Read it later
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed mb-5">
                Get a link to this plan in your inbox. Read it on your commute, or forward it to whoever&rsquo;s packing the car.
              </p>
            </div>

            {status === 'success' ? (
              <div className="bg-[#f5efe2] border border-[#c9d4b5] rounded-xl px-4 py-3.5 text-center">
                <p className="text-sm font-medium text-[#1f3622]">
                  Plan sent &mdash; check your inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2.5">
                <label htmlFor="post-plan-email" className="sr-only">Email address</label>
                <input
                  id="post-plan-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-xl px-4 py-3 bg-white text-stone-900 placeholder:text-stone-400 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#3a5a3e] focus:border-[#3a5a3e]"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full text-center bg-white hover:bg-stone-50 border-2 border-[#1f3622] text-[#1f3622] font-semibold py-3 rounded-xl transition-colors disabled:opacity-60"
                >
                  {status === 'loading' ? 'Sending…' : 'Email my plan'}
                </button>
                {status === 'error' && (
                  <p className="text-xs text-red-600 text-center pt-1">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-stone-500 mt-8 max-w-md mx-auto">
          No account required. The PDF takes about 20 seconds to generate.
        </p>
      </div>
    </section>
  )
}
