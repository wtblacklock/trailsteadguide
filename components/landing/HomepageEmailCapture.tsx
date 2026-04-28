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
    <section data-reveal className="px-8 pb-16">
      {/* Forest-green download surface — same palette as the printable
          email gate, the floating bar, and the trip-pack download CTA so
          every capture surface on the site reads as the same family. */}
      <div className="bg-[#1f3622] text-white rounded-3xl border border-[#2a4a30] p-10 md:p-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="md:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#c9d4b5] font-semibold mb-3">
              Free with email
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight mb-4">
              Get your camping checklist.
            </h2>
            <p className="text-stone-300 text-lg leading-relaxed max-w-xl">
              A simple printable checklist and trip prep timeline to help you get ready.
            </p>
          </div>

          <div className="md:col-span-5">
            {status === 'success' ? (
              <div className="rounded-lg bg-[#2a4a30] border border-[#3a5a3e] px-5 py-4">
                <p className="text-sm font-medium text-[#c9d4b5]">
                  ✓ Check your inbox — your checklist is on the way.
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
                  className="flex-1 min-w-0 rounded-lg px-4 py-3 bg-[#2a4a30] text-white text-sm placeholder:text-stone-400 border border-[#3a5a3e] focus:outline-none focus:ring-2 focus:ring-[#c9d4b5]"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex items-center justify-center rounded-lg bg-white text-[#1f3622] text-sm font-semibold px-6 py-3 hover:bg-stone-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {status === 'loading' ? 'Sending…' : 'Send Me the Checklist'}
                </button>
              </form>
            )}

            {status === 'error' && (
              <p className="mt-3 text-sm text-red-300">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
