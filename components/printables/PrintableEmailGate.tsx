'use client'

import { useState } from 'react'
import Link from 'next/link'

type Props = {
  printableSlug: string
  /** Where to send the visitor after a successful email submit. */
  printHref: string
}

/**
 * Email-capture gate shown on /printables/[slug]. Posts to /api/subscribe
 * with `source: 'printable'` so the visitor lands on the ConvertKit list
 * with both a slug-specific tag and a generic "downloaded a printable"
 * tag (configured in lib/kit-tags.ts). On success, surfaces the
 * print-optimized HTML view as a button + an autofocus link the user can
 * tap or open in a new tab.
 */
export default function PrintableEmailGate({ printableSlug, printHref }: Props) {
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
      <div className="rounded-2xl bg-stone-900 text-white px-6 py-6 md:px-8 md:py-7">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-300 mb-2">
          You’re in
        </p>
        <h3 className="font-serif text-2xl md:text-3xl tracking-tight mb-3">
          Open the printable.
        </h3>
        <p className="text-stone-300 mb-5 text-sm leading-relaxed">
          The print view is ready in your browser. Hit ⌘/Ctrl+P or use your browser&apos;s print menu — or save as PDF for later.
        </p>
        <Link
          href={printHref}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center justify-center gap-2 rounded-md font-medium bg-white text-stone-900 hover:bg-stone-100 transition-colors px-5 py-3 text-sm"
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
      className="rounded-2xl bg-stone-900 text-white px-6 py-6 md:px-8 md:py-7"
    >
      <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-300 mb-2">
        Free download
      </p>
      <h3 className="font-serif text-2xl md:text-3xl tracking-tight mb-3">
        Send me the printable.
      </h3>
      <p className="text-stone-300 mb-5 text-sm leading-relaxed">
        Drop your email — we&apos;ll add you to the Trailstead list and unlock the print view in one tap. One-click unsubscribe, no spam.
      </p>
      <label htmlFor={`printable-email-${printableSlug}`} className="sr-only">
        Email address
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id={`printable-email-${printableSlug}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 rounded-md px-4 py-3 bg-white text-stone-900 placeholder:text-stone-400 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center rounded-md font-medium bg-white text-stone-900 hover:bg-stone-100 transition-colors px-6 py-3 text-sm disabled:opacity-60"
        >
          {status === 'loading' ? 'Sending…' : 'Get the printable'}
        </button>
      </div>
      {status === 'error' && (
        <p className="mt-3 text-sm text-red-300">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}
