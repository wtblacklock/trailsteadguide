import Link from 'next/link'
import Image from 'next/image'

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-[#F5F3EE]/95 backdrop-blur-sm">
      <div className="max-w-page mx-auto px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center shrink-0" aria-label="Trailstead Guide home">
          <Image
            src="/images/trailsteadguide_logo.svg"
            alt="Trailstead Guide"
            height={28}
            width={160}
            className="h-6 md:h-7 w-auto object-contain mix-blend-multiply"
            priority
          />
        </Link>
        <Link
          href="/quiz"
          aria-label="Start Your Plan"
          className="shrink-0 inline-flex items-center justify-center gap-2 text-sm font-medium bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors px-3 py-2.5 md:px-5"
        >
          {/* Checklist icon — always visible */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          {/* Text — hidden on mobile */}
          <span className="hidden md:inline">Start Your Plan</span>
        </Link>
      </div>
    </nav>
  )
}
