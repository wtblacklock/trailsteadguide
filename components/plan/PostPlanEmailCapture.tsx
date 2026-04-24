'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'

type Props = {
  planSlug: string
}

export default function PostPlanEmailCapture({ planSlug }: Props) {
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

  return (
    <section className="py-16">
      <div className="max-w-content mx-auto px-6 text-center">
        <h2 className="text-2xl font-serif font-medium text-stone-900 mb-3">Save your plan</h2>
        <p className="text-stone-500 mb-8">Get your full trip plan and gear list sent to your inbox.</p>
        {status === 'success' ? (
          <p className="text-brand-green font-medium">Plan sent! Check your inbox.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <label htmlFor="post-plan-email" className="sr-only">Email address</label>
            <input
              id="post-plan-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 rounded-md px-4 py-2.5 bg-white text-stone-900 placeholder:text-stone-400 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-green"
            />
            <Button type="submit" disabled={status === 'loading'} variant="primary">
              {status === 'loading' ? 'Sending…' : 'Email My Plan'}
            </Button>
          </form>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-400 text-sm">Something went wrong. Please try again.</p>
        )}
      </div>
    </section>
  )
}
