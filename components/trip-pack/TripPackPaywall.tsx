'use client'

import { useState } from 'react'
import type { PlanSlug } from '@/types'
import type {
  ActivityType,
  ComfortLevel,
  GroupType,
  KidsAgeBucket,
} from '@/lib/personalization/types'

/**
 * Sticky paywall card. Email-gate today (instant download); the Stripe path
 * is wired below but only activates when NEXT_PUBLIC_STRIPE_ENABLED=true.
 */
export default function TripPackPaywall({
  planSlug,
  planTitle,
  adults,
  kids,
  nights,
  group,
  kidsAge,
  activity,
  comfort,
}: {
  planSlug: PlanSlug
  planTitle: string
  adults: number
  kids: number
  nights: number
  group?: GroupType
  kidsAge?: KidsAgeBucket
  activity?: ActivityType
  comfort?: ComfortLevel
}) {
  const stripeEnabled = process.env.NEXT_PUBLIC_STRIPE_ENABLED === 'true'

  const [email, setEmail] = useState('')
  const [tier, setTier] = useState<'basic' | 'premium'>('basic')
  const [submitting, setSubmitting] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleEmailGate(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/trip-pack-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: planSlug,
          adults,
          kids,
          nights,
          email,
          group,
          kidsAge,
          activity,
          comfort,
        }),
      })
      if (!res.ok) {
        const j = (await res.json().catch(() => null)) as { error?: string } | null
        throw new Error(j?.error || 'Could not generate your pack')
      }
      const j = (await res.json()) as { token?: string; downloadUrl: string }
      if (j.token) {
        window.location.href = `/trip-pack/${planSlug}/success?token=${encodeURIComponent(j.token)}`
        return
      }
      setDownloadUrl(j.downloadUrl)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleStripe() {
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: planSlug,
          adults,
          kids,
          nights,
          tier,
          email,
          group,
          kidsAge,
          activity,
          comfort,
        }),
      })
      if (!res.ok) {
        const j = (await res.json().catch(() => null)) as { error?: string } | null
        throw new Error(j?.error || 'Checkout unavailable')
      }
      const j = (await res.json()) as { url: string }
      window.location.href = j.url
    } catch (err) {
      setError((err as Error).message)
      setSubmitting(false)
    }
  }

  return (
    <aside className="lg:sticky lg:top-20 self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-b from-emerald-900 to-emerald-950 text-emerald-50 p-6">
          <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-200 mb-2">
            Trailstead Trip Pack
          </p>
          <h2 className="text-xl font-bold leading-tight">{planTitle}</h2>
          <p className="mt-2 text-sm text-emerald-100/80">
            Print-ready PDF. Yours forever. No subscription.
          </p>
        </div>

        <div className="p-6 space-y-4">
          {stripeEnabled && (
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                Choose your tier
              </label>
              <div className="grid grid-cols-2 gap-2">
                <TierButton selected={tier === 'basic'} onClick={() => setTier('basic')} title="Basic" price="$14" tag="Plan + checklist" />
                <TierButton selected={tier === 'premium'} onClick={() => setTier('premium')} title="Premium" price="$24" tag="+ gear cards" />
              </div>
            </div>
          )}

          {downloadUrl ? (
            <div className="space-y-3 text-center">
              <div className="text-2xl">✓</div>
              <p className="text-sm text-stone-700">
                Your Trip Pack is ready.
              </p>
              <a
                href={downloadUrl}
                className="block bg-emerald-700 hover:bg-emerald-800 transition-colors text-white text-center font-semibold py-3 rounded-lg"
              >
                Download PDF
              </a>
              <p className="text-xs text-stone-500">
                Link valid for 24 hours. We&rsquo;ve also emailed you a copy.
              </p>
            </div>
          ) : (
            <form onSubmit={stripeEnabled ? (e) => { e.preventDefault(); handleStripe() } : handleEmailGate} className="space-y-3">
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-wider text-stone-500 font-semibold mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-stone-300 transition-colors text-white font-semibold py-3 rounded-lg"
              >
                {submitting
                  ? 'Working…'
                  : stripeEnabled
                    ? `Get my Trip Pack — ${tier === 'basic' ? '$14' : '$24'}`
                    : 'Send me my Trip Pack'}
              </button>

              {error && <p className="text-xs text-red-600">{error}</p>}

              <p className="text-[11px] text-stone-500 leading-relaxed text-center">
                {stripeEnabled
                  ? 'Secure checkout via Stripe. Instant download after payment.'
                  : 'Free during early access. Instant download — no spam, ever.'}
              </p>
            </form>
          )}
        </div>

        <div className="bg-stone-50 border-t border-stone-200 px-6 py-4">
          <ul className="text-xs text-stone-600 space-y-1.5">
            <li>· 7 print-ready pages</li>
            <li>· Curated gear with affiliate-ready links</li>
            <li>· Personalized to {adults}A · {kids}K, {nights}N</li>
            <li>&middot; No login. No account. Yours to keep.</li>
          </ul>
        </div>
      </div>
    </aside>
  )
}

function TierButton({
  selected,
  onClick,
  title,
  price,
  tag,
}: {
  selected: boolean
  onClick: () => void
  title: string
  price: string
  tag: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left rounded-lg border-2 px-3 py-2.5 transition-colors ${
        selected
          ? 'border-emerald-700 bg-emerald-50'
          : 'border-stone-200 hover:border-stone-300 bg-white'
      }`}
    >
      <div className="text-xs uppercase tracking-wider font-semibold text-stone-500">{title}</div>
      <div className="text-lg font-bold text-stone-900">{price}</div>
      <div className="text-[11px] text-stone-500 mt-0.5">{tag}</div>
    </button>
  )
}
