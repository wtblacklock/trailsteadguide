'use client'

import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface MidQuizEmailCaptureProps {
  onSkip: () => void
}

export default function MidQuizEmailCapture({ onSkip }: MidQuizEmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const formId = process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID
      const res = await fetch(
        `https://app.convertkit.com/forms/${formId}/subscriptions`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email_address: email }),
        }
      )

      if (!res.ok) {
        throw new Error('Something went wrong. Please try again.')
      }

      onSkip()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-lg mx-auto">
      <h2 className="font-serif text-2xl text-stone-900 mb-2">
        Want your plan in your inbox?
      </h2>
      <p className="text-stone-500 mb-6">
        Drop your email and we&apos;ll send your personalized camping plan straight to
        you — no spam, ever.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full border border-stone-300 rounded-lg px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400"
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <Button type="submit" disabled={loading} className="w-full justify-center">
          {loading ? 'Saving…' : 'Save My Plan'}
        </Button>
      </form>

      <button
        onClick={onSkip}
        className="mt-4 w-full text-center text-sm text-stone-400 hover:text-stone-600 transition-colors"
      >
        No thanks, continue →
      </button>
    </Card>
  )
}
