'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function FinalCTA() {
  const wrapRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let raf = 0
    const apply = () => {
      raf = 0
      const wrap = wrapRef.current
      if (!wrap) return
      const rect = wrap.getBoundingClientRect()
      const vh = window.innerHeight || 1
      // Progress 0 when CTA is just entering viewport from the bottom,
      // 1 when its top is ~20% down from the viewport top.
      const start = vh * 1.0
      const end = vh * 0.2
      const distance = start - end
      const pos = start - rect.top
      const raw = Math.max(0, Math.min(1, pos / distance))
      const eased = 1 - Math.pow(1 - raw, 2)
      wrap.style.setProperty('--cta-progress', String(eased))
    }
    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(apply)
    }
    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section ref={wrapRef} data-reveal className="final-cta-root pb-16">
      <div className="final-cta-outer">
        <div className="relative bg-stone-900 final-cta-box overflow-hidden min-h-[480px] flex items-end">
          <Image
            src="https://images.unsplash.com/photo-1478827536114-da961b7f86d2?w=1400&auto=format&fit=crop&q=80"
            alt="Family camping under a starlit sky"
            fill
            className="object-cover opacity-40"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 p-10 md:p-16 w-full items-end">
            <div className="col-span-1 md:col-span-7">
              <h2 className="font-serif text-5xl md:text-6xl font-semibold text-white tracking-tight leading-tight mb-8">
                Your first camping trip starts here.
              </h2>
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center rounded-md font-medium bg-white text-stone-900 hover:bg-stone-100 transition-colors px-8 py-4 text-base"
              >
                Start Your Trailstead Plan
              </Link>
            </div>
            <div className="col-span-1 md:col-span-4 md:col-start-9 flex items-end pb-1">
              <p className="text-stone-400 leading-relaxed">
                Answer 5 questions. Get a complete trip plan — timeline, gear list, kid activities, and safety guidance. About 2 minutes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .final-cta-root {
          --cta-progress: 0;
        }
        .final-cta-outer {
          width: 100%;
          padding-left: calc((1 - var(--cta-progress)) * 2rem);
          padding-right: calc((1 - var(--cta-progress)) * 2rem);
          max-width: calc(90rem + (100vw - 90rem) * var(--cta-progress));
          margin-left: auto;
          margin-right: auto;
        }
        .final-cta-box {
          border-radius: calc((1 - var(--cta-progress)) * 1.5rem);
        }
        @media (max-width: 767px) {
          .final-cta-outer {
            max-width: none;
            padding-left: calc((1 - var(--cta-progress)) * 1.25rem);
            padding-right: calc((1 - var(--cta-progress)) * 1.25rem);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .final-cta-outer,
          .final-cta-box {
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}
