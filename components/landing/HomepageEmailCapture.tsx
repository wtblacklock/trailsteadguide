'use client'

import { useState } from 'react'

export default function HomepageEmailCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'homepage' }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section data-reveal className="py-16 md:py-32 max-w-page mx-auto px-8">
      <div className="max-w-2xl">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-stone-950 tracking-tight leading-tight mb-4">
          Get your camping checklist.
        </h2>
        <p className="text-stone-500 text-lg leading-relaxed mb-8">
          A simple printable checklist and trip prep timeline to help you get ready.
        </p>

        {status === 'success' ? (
          <div className="rounded-xl bg-stone-100 border border-stone-200 px-5 py-4">
            <p className="text-sm font-medium text-stone-900">
              Check your inbox — your checklist is on the way.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="homepage-email" className="sr-only">
              Email address
            </label>
            <input
              id="homepage-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 rounded-md px-4 py-3 bg-white text-stone-900 placeholder:text-stone-400 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-stone-900"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm disabled:opacity-60"
            >
              {status === 'loading' ? 'Sending…' : 'Send Me the Checklist'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-3 text-sm text-red-700">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  )
}
