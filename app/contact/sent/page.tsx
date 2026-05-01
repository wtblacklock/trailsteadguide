import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Message sent — Trailstead Guide',
  description: "Thanks for reaching out. We'll be in touch within 48 hours.",
  robots: { index: false, follow: true },
}

export default function ContactSentPage() {
  return (
    <main className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-6 py-20 md:py-28">
      <div className="max-w-xl mx-auto text-center">
        <CheckMark className="mx-auto mb-10 text-brand-green" />
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-5">
          Message received
        </p>
        <h1 className="font-serif text-[2.5rem] md:text-[3.75rem] leading-[1.05] tracking-[-0.02em] font-semibold text-stone-950">
          Got it — we&rsquo;ll be in touch within 48 hours.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-[1.55] font-light">
          Your message just landed in our inbox. While you wait, the camping plan quiz is the best place to start.
        </p>

        <div className="mt-12 flex flex-col items-center gap-3">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-md font-medium bg-brand-green text-white hover:bg-brand-green-light transition-colors px-6 py-3 text-sm w-full sm:w-auto"
          >
            Build your camping plan
          </Link>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-stone-600 mt-2">
            <Link
              href="/guides"
              className="underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition-colors"
            >
              Browse guides
            </Link>
            <Link
              href="/"
              className="underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

function CheckMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 96"
      width="84"
      height="84"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="48" cy="48" r="36" />
      <path d="M32 48 L44 60 L66 38" />
    </svg>
  )
}
