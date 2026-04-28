'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

const CATEGORIES: { slug: string; label: string }[] = [
  { slug: 'general', label: 'General question' },
  { slug: 'press', label: 'Press / interview' },
  { slug: 'partnership', label: 'Partnership / collaboration' },
  { slug: 'affiliate', label: 'Affiliate or sponsorship' },
  { slug: 'bug', label: 'Bug or issue with the site' },
  { slug: 'feedback', label: 'Plan or quiz feedback' },
  { slug: 'other', label: 'Other' },
]

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        opts: { sitekey: string; callback: (token: string) => void; 'error-callback'?: () => void },
      ) => string
      reset: (widgetId?: string) => void
    }
  }
}

export default function ContactForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [category, setCategory] = useState('general')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorText, setErrorText] = useState<string | null>(null)
  const turnstileRef = useRef<HTMLDivElement>(null)

  // Lazy-load the Turnstile script only when a site key is configured.
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileRef.current) return

    const SCRIPT_SRC =
      'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

    function render() {
      if (!window.turnstile || !turnstileRef.current) return
      window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY!,
        callback: (token) => setTurnstileToken(token),
        'error-callback': () => setTurnstileToken(null),
      })
    }

    if (window.turnstile) {
      render()
      return
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`,
    )
    if (existing) {
      existing.addEventListener('load', render)
      return () => existing.removeEventListener('load', render)
    }

    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.defer = true
    script.onload = render
    document.head.appendChild(script)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorText(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          category,
          message,
          honeypot,
          turnstileToken: turnstileToken || undefined,
        }),
      })

      if (res.ok) {
        router.push('/contact/sent')
        return
      }

      const data = (await res.json().catch(() => null)) as { error?: string } | null
      setErrorText(data?.error || 'Something went wrong. Please try again.')
      setStatus('error')
    } catch {
      setErrorText('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  const inputBase =
    'w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-base text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-colors'

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-cream rounded-2xl border border-stone-200 p-6 md:p-10 space-y-6"
    >
      {/* Honeypot — bots fill it, humans don't. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: 'none' }}
      />

      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-stone-800 mb-2">
          Your name
        </label>
        <input
          id="contact-name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputBase}
          placeholder="Jane Camper"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-stone-800 mb-2">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputBase}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="contact-category" className="block text-sm font-medium text-stone-800 mb-2">
          What&rsquo;s this about?
        </label>
        <select
          id="contact-category"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={inputBase}
        >
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-stone-800 mb-2">
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputBase} resize-y min-h-[140px]`}
          placeholder="Tell us what's going on…"
        />
      </div>

      {TURNSTILE_SITE_KEY && (
        <div ref={turnstileRef} className="flex justify-start" />
      )}

      {errorText && (
        <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {errorText}
        </p>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center rounded-md font-medium bg-brand-green text-white hover:bg-brand-green-light transition-colors px-6 py-3 text-sm shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Sending…' : 'Send message'}
        </button>
        <p className="mt-3 text-xs text-stone-500">
          We read every message and reply within 48 hours.
        </p>
      </div>
    </form>
  )
}
