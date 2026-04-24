import Link from 'next/link'
import { notFound } from 'next/navigation'
import { signToken, verifyToken } from '@/lib/pdf/token'
import { stripeEnabled } from '@/lib/stripe'
import type { PlanSlug } from '@/types'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const PLAN_TITLES: Record<PlanSlug, string> = {
  'backyard-test': 'Backyard Test Night',
  'first-night-camp': 'First Night Camp',
  'first-weekend-camp': 'First Weekend Camp',
  'easy-family-basecamp': 'Easy Family Basecamp',
}

const PLAN_SLUGS: PlanSlug[] = [
  'backyard-test',
  'first-night-camp',
  'first-weekend-camp',
  'easy-family-basecamp',
]

type Props = {
  params: Promise<{ planSlug: string }>
  searchParams: Promise<{ session_id?: string; token?: string }>
}

export default async function TripPackSuccessPage({ params, searchParams }: Props) {
  const { planSlug } = await params
  const { session_id, token: tokenParam } = await searchParams

  if (!PLAN_SLUGS.includes(planSlug as PlanSlug)) notFound()
  const plan = planSlug as PlanSlug
  const title = PLAN_TITLES[plan]

  let downloadUrl: string | null = null
  let email: string | null = null
  let tier: 'basic' | 'premium' = 'basic'
  let errorMessage: string | null = null

  // Email-gate (non-Stripe) path: token handed directly from the paywall.
  if (tokenParam) {
    const payload = verifyToken(tokenParam)
    if (payload && payload.plan === plan) {
      downloadUrl = `/api/generate-pdf?token=${encodeURIComponent(tokenParam)}`
      email = payload.email || null
    } else {
      errorMessage = 'Your download link is invalid or has expired. Please try again.'
    }
  } else if (!session_id) {
    errorMessage = 'Missing session reference. If you just purchased, check your email for the download link.'
  } else if (!stripeEnabled()) {
    errorMessage = 'Checkout is not currently enabled on this site.'
  } else {
    try {
      const Stripe = (await import('stripe')).default
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
      const session = await stripe.checkout.sessions.retrieve(session_id)

      if (session.payment_status !== 'paid') {
        errorMessage = 'Your payment is still processing. Check your email shortly — the download link is on its way.'
      } else {
        const meta = session.metadata || {}
        const metaPlan = (meta.plan as PlanSlug) || plan
        const adults = Number(meta.adults || 2)
        const kids = Number(meta.kids || 0)
        const nights = Number(meta.nights || 1)
        const sessionEmail = session.customer_email || meta.email || undefined
        tier = meta.tier === 'premium' ? 'premium' : 'basic'

        const token = signToken({ plan: metaPlan, adults, kids, nights, email: sessionEmail })
        downloadUrl = `/api/generate-pdf?token=${encodeURIComponent(token)}`
        email = sessionEmail || null
      }
    } catch (err) {
      console.error('[trip-pack success] stripe lookup failed', err)
      errorMessage = 'We could not verify this checkout session. Please check your email for the download link.'
    }
  }

  return (
    <main className="min-h-screen bg-[#f5efe2] py-20 px-6">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="bg-[#1f3622] text-white px-8 py-10 text-center">
          <div className="text-[11px] tracking-[0.3em] uppercase text-[#c9d4b5] font-semibold mb-3">
            Trailstead Trip Pack
          </div>
          <h1 className="text-3xl font-serif font-semibold leading-tight">
            {downloadUrl ? `Your ${title} pack is ready.` : `Thanks for your order.`}
          </h1>
          <p className="mt-3 text-sm text-[#c9d4b5]">
            {downloadUrl
              ? `${tier === 'premium' ? 'Premium' : 'Basic'} tier · Download below`
              : 'Finalizing your Trip Pack'}
          </p>
        </div>

        <div className="px-8 py-8 space-y-6">
          {downloadUrl ? (
            <>
              <a
                href={downloadUrl}
                download={`trailstead-${plan}.pdf`}
                className="block w-full text-center bg-[#1f3622] hover:bg-[#2a4a30] text-white font-semibold py-4 rounded-xl transition-colors"
              >
                Download your Trip Pack (PDF)
              </a>
              <div className="text-sm text-stone-600 space-y-2">
                <p>
                  {email ? (
                    <>We also sent a copy to <strong>{email}</strong>.</>
                  ) : (
                    <>A copy is on its way to your email as well.</>
                  )}
                </p>
                <p className="text-xs text-stone-500">
                  Link valid for 24 hours. Save the PDF to your device &mdash; it&rsquo;s yours to keep forever.
                </p>
              </div>

              <div className="pt-6 border-t border-stone-100 space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-semibold text-center">
                  What&rsquo;s next
                </p>
                <Link
                  href={`/plan/${plan}`}
                  className="block w-full text-center bg-white hover:bg-stone-50 border border-[#1f3622] text-[#1f3622] font-semibold py-3 rounded-xl transition-colors"
                >
                  Open your {title} itinerary
                </Link>
                <Link
                  href="/quiz"
                  className="block text-center text-sm text-stone-500 hover:text-[#1f3622] underline underline-offset-4"
                >
                  Plan another trip &mdash; start a new quiz
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="text-sm text-stone-700 space-y-3">
                <p>{errorMessage}</p>
                <p className="text-xs text-stone-500">
                  If you don&rsquo;t see the email within a few minutes, check your spam folder or reply to
                  any Trailstead email and we&rsquo;ll resend it.
                </p>
              </div>
              <div className="pt-4 border-t border-stone-100 text-center space-y-2">
                <Link
                  href={`/plan/${plan}`}
                  className="block w-full text-center bg-[#1f3622] hover:bg-[#2a4a30] text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  ← Back to your {title} plan
                </Link>
                <Link
                  href="/"
                  className="block text-xs text-stone-500 hover:text-[#1f3622] underline underline-offset-4 pt-1"
                >
                  Return to home
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
