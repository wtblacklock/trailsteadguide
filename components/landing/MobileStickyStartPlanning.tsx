'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const SCROLL_THRESHOLD = 240

type Props = {
  /** Hide while another full-screen overlay (mobile menu, search) is open. */
  suppressed: boolean
}

/**
 * Bottom-fixed "Start Planning" bar, mobile only. The compact header drops
 * its own Start Planning button below md (see Nav.tsx) to leave room for the
 * logo and search icon, so this replaces it once the visitor has scrolled
 * far enough that the top nav no longer offers one-tap access to the quiz.
 */
export default function MobileStickyStartPlanning({ suppressed }: Props) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const visible = scrolled && !suppressed

  return (
    <div
      aria-hidden={!visible}
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 px-4 pb-4 pt-3 bg-[#F5F3EE] border-t border-stone-200/60 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] transition-[opacity,transform] duration-300 ease-out ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      <Link
        href="/quiz"
        tabIndex={visible ? 0 : -1}
        className="flex items-center justify-center gap-2 w-full text-base font-medium bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors py-3.5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
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
        Start Planning
      </Link>
    </div>
  )
}
