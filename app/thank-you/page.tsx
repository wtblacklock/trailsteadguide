import { Metadata } from 'next'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'You\'re all set | Trailstead Guide',
  description: 'Your camping plan is on its way.',
}

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
      <div className="max-w-content mx-auto text-center py-32">
        <div className="text-5xl mb-6" aria-hidden="true">⛺</div>
        <h1 className="text-4xl font-serif font-semibold text-stone-900 tracking-tight mb-4">
          You&apos;re all set.
        </h1>
        <p className="text-lg text-stone-600 mb-10 leading-relaxed">
          Your plan is on its way to your inbox. Check your email and you&apos;re ready to go.
        </p>
        <Link href="/">
          <Button variant="secondary">Back to Trailstead</Button>
        </Link>
      </div>
    </main>
  )
}
