import Link from 'next/link'
import type { ReactNode } from 'react'

export type OffTrailLayoutProps = {
  eyebrow: string
  headline: string
  body: string
  /** Optional element rendered alongside the funnel CTAs (e.g. Try-again button on error pages). */
  extraCta?: ReactNode
}

/**
 * Shared layout for the branded 404 and error pages. Cream background,
 * Source Serif 4 headline, a hand-drawn tipped-lantern mark, and three
 * CTAs that funnel the visitor back into the site.
 */
export function OffTrailLayout({ eyebrow, headline, body, extraCta }: OffTrailLayoutProps) {
  return (
    <main className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-6 py-20 md:py-28">
      <div className="max-w-xl mx-auto text-center">
        <TippedLantern className="mx-auto mb-10 text-stone-700" />
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-5">
          {eyebrow}
        </p>
        <h1 className="font-serif text-[2.5rem] md:text-[3.75rem] leading-[1.05] tracking-[-0.02em] font-semibold text-stone-950">
          {headline}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-[1.55] font-light">
          {body}
        </p>

        <div className="mt-12 flex flex-col items-center gap-3">
          {extraCta}
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm w-full sm:w-auto"
          >
            Start your camping plan
          </Link>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-stone-600 mt-2">
            <Link href="/guides" className="underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition-colors">
              Back to guides
            </Link>
            <Link href="/" className="underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition-colors">
              Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

function TippedLantern({ className }: { className?: string }) {
  // A tipped-over camping lantern in three strokes — handle arc, body, and a small offset flame.
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
      <g transform="rotate(-22 48 48)">
        <path d="M30 22 Q48 8 66 22" />
        <line x1="36" y1="22" x2="36" y2="32" />
        <line x1="60" y1="22" x2="60" y2="32" />
        <rect x="32" y="32" width="32" height="38" rx="2" />
        <line x1="32" y1="42" x2="64" y2="42" />
        <line x1="32" y1="60" x2="64" y2="60" />
        <path d="M48 50 Q44 54 48 58 Q52 54 48 50 Z" fill="currentColor" stroke="none" />
      </g>
    </svg>
  )
}

export default OffTrailLayout
