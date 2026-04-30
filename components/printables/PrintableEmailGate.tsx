'use client'

import { useState } from 'react'
import Link from 'next/link'
import PrintableThumbnail from './PrintableThumbnail'

type Props = {
  printableSlug: string
  /** Where to send the visitor after a successful email submit. */
  printHref: string
  /**
   * Optional override headline. When omitted the default "Send me the
   * printable" copy is used. The skill / activity page passes the
   * specific printable title here so the form reads as a curated
   * recommendation rather than a generic gate.
   */
  headline?: string
  /** Optional override eyebrow ("Free download" by default). */
  eyebrow?: string
  /** Optional override body copy describing what the visitor will get. */
  description?: string
  /** Optional override submit button label ("Get the printable" by default). */
  submitLabel?: string
  /**
   * Render a small preview thumbnail of the printable inside the
   * email-gate box. Used on skill-page analog-companion blocks so the
   * card becomes visually identifiable. Defaults to false on the
   * /printables/[slug] detail page where the full preview is rendered
   * separately.
   */
  showThumbnail?: boolean
}

/**
 * Email-capture gate shown on /printables/[slug]. Posts to /api/subscribe
 * with `source: 'printable'` so the visitor lands on the ConvertKit list
 * (with both a slug-specific tag and a generic "downloaded a printable"
 * tag from lib/kit-tags.ts) and gets a Resend transactional email with
 * a link to the print view.
 *
 * Visual treatment matches the FloatingEmailBar / TripPackSuccessActions
 * "download surface" — forest-green panel (#1f3622), sage eyebrow accent
 * (#c9d4b5), white pill submit button — so every download/results
 * capture across the site reads as the same family.
 */
export default function PrintableEmailGate({
  printableSlug,
  printHref,
  headline = 'Send me the printable',
  eyebrow = 'Free download',
  description = 'Drop your email — we’ll add you to the Trailstead list and email the print view. One-click unsubscribe, no spam.',
  submitLabel = 'Get the printable',
  showThumbnail = false,
}: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

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
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-[#1f3622] text-white border border-[#2a4a30] px-5 py-5 sm:px-7 sm:py-6">
        <p className="text-[11px] uppercase tracking-[0.25em] text-[#c9d4b5] font-semibold mb-1.5">
          You’re in
        </p>
        <p className="text-base sm:text-lg font-semibold leading-tight">Open the printable</p>
        <p className="text-xs sm:text-sm text-stone-300 leading-snug mt-1 mb-4">
          We’ve emailed you the link too. Hit ⌘/Ctrl+P from the print view, or save as PDF for later.
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
          Open the print view
        </Link>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-[#1f3622] text-white border border-[#2a4a30] px-5 py-5 sm:px-7 sm:py-6"
    >
      {showThumbnail && (
        <div className="mb-4 -mx-1">
          <PrintableThumbnail
            slug={printableSlug}
            scale={0.22}
            heightClass="h-32"
          />
        </div>
      )}
      <p className="text-[11px] uppercase tracking-[0.25em] text-[#c9d4b5] font-semibold mb-1.5">
        {eyebrow}
      </p>
      <p className="text-base sm:text-lg font-semibold leading-tight">{headline}</p>
      <p className="text-xs sm:text-sm text-stone-300 leading-snug mt-1 mb-4">
        {description}
      </p>
      <label htmlFor={`printable-email-${printableSlug}`} className="sr-only">
        Email address
      </label>
      <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
        <input
          id={`printable-email-${printableSlug}`}
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
          {status === 'loading' ? 'Sending…' : submitLabel}
        </button>
      </div>
      {status === 'error' && (
        <p className="mt-3 text-xs text-red-300">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}
