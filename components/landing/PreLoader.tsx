'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const SESSION_KEY = 'trailstead_preloader_shown'

export default function PreLoader() {
  // Show by default on mount; only skip if sessionStorage says already shown
  const [state, setState] = useState<'showing' | 'fading' | 'gone'>('showing')

  useEffect(() => {
    // If already shown this session, skip immediately
    try {
      if (sessionStorage.getItem(SESSION_KEY) === '1') {
        setState('gone')
        return
      }
    } catch {
      // ignore
    }

    // Prevent page scroll while loader is up
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const holdMs = 2200
    const fadeMs = 700
    const t1 = window.setTimeout(() => setState('fading'), holdMs)
    const t2 = window.setTimeout(() => {
      setState('gone')
      try { sessionStorage.setItem(SESSION_KEY, '1') } catch { /* ignore */ }
      document.body.style.overflow = prevOverflow
    }, holdMs + fadeMs)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      document.body.style.overflow = prevOverflow
    }
  }, [])

  if (state === 'gone') return null

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F5F3EE] transition-opacity duration-[600ms] ease-out ${
        state === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="preloader-logo">
        <Image
          src="/images/trailsteadguide_logo.svg"
          alt=""
          width={260}
          height={48}
          priority
          className="h-10 md:h-12 w-auto mix-blend-multiply"
        />
      </div>
      <p className="preloader-tagline mt-5 text-stone-500 text-sm md:text-base tracking-wide">
        Plans that get families outside.
      </p>

      <style jsx>{`
        .preloader-logo {
          opacity: 0;
          transform: translateY(6px);
          animation: preloader-in 1100ms cubic-bezier(0.22, 1, 0.36, 1) 120ms forwards;
        }
        .preloader-tagline {
          opacity: 0;
          animation: preloader-tag 900ms cubic-bezier(0.22, 1, 0.36, 1) 900ms forwards;
        }
        @keyframes preloader-in {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes preloader-tag {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
