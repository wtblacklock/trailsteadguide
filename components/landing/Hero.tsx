'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const wrapRef = useRef<HTMLElement>(null)
  const imageBoxRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const apply = () => {
      raf = 0
      const wrap = wrapRef.current
      const imageBox = imageBoxRef.current
      const text = textRef.current
      if (!wrap || !imageBox || !text) return

      // Progress: 0 at top of page, 1 when hero has scrolled past its expansion window.
      const rect = wrap.getBoundingClientRect()
      const vh = window.innerHeight || 1
      // Start expanding as soon as user scrolls; fully expanded after ~0.9 * viewport of scroll.
      const start = 0
      const end = vh * 0.9
      const scrolled = Math.max(0, -rect.top + start)
      const progress = Math.max(0, Math.min(1, scrolled / (end - start)))

      // Ease out for more cinematic feel
      const eased = 1 - Math.pow(1 - progress, 2)

      // Set on the root so all descendants (outer, box, text) inherit it.
      wrap.style.setProperty('--hero-progress', String(eased))
      // Also set on the image element so transform picks it up (scoped styles).
      imageBox.style.setProperty('--hero-progress', String(eased))
      text.style.setProperty('--hero-progress', String(eased))
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
    <section ref={wrapRef} className="hero-root">
      <div className="max-w-page mx-auto px-8 pt-14 md:pt-24 pb-10 md:pb-16">
        <div ref={textRef} className="hero-text max-w-4xl">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-stone-950 tracking-tight leading-[1.08] mb-5 md:mb-6">
            Plan your first family camping trip in 2 minutes.
          </h1>
          <p className="text-stone-500 text-lg md:text-xl leading-relaxed mb-8 md:mb-10 max-w-2xl">
            A step-by-step system for first-time campers. Know exactly what to bring, what to do, and what to expect.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-8 py-4 text-base"
            >
              Start Your Trailstead Plan
            </Link>
            <a href="#example" className="text-base text-stone-500 hover:text-stone-700 transition-colors underline underline-offset-4">
              See example plan
            </a>
          </div>
          <p className="text-stone-400 text-sm mt-6">Free · No account required</p>
        </div>
      </div>

      {/* Full-width expanding image — keeps height, widens to full viewport on scroll */}
      <div className="hero-image-outer">
        <div ref={imageBoxRef} className="hero-image-box">
          <Image
            src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1600&auto=format&fit=crop&q=80"
            alt="Family camping in a forest clearing at golden hour"
            fill
            className="object-cover hero-image-img"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-transparent" />
        </div>
      </div>

      <style jsx>{`
        .hero-root {
          --hero-progress: 0;
        }
        .hero-text {
          /* subtle drift & fade as user scrolls past */
          opacity: calc(1 - var(--hero-progress, 0) * 0.35);
          transform: translateY(calc(var(--hero-progress, 0) * -12px));
          transition: opacity 120ms linear;
        }
        /* Horizontal-only expansion: height stays fixed; side padding and
           radius collapse to 0 so the image fills the full viewport width. */
        .hero-image-outer {
          width: 100%;
          padding-bottom: 2rem;
          padding-left: calc((1 - var(--hero-progress, 0)) * 2rem);
          padding-right: calc((1 - var(--hero-progress, 0)) * 2rem);
          max-width: calc(90rem + (100vw - 90rem) * var(--hero-progress, 0));
          margin-left: auto;
          margin-right: auto;
        }
        .hero-image-box {
          position: relative;
          width: 100%;
          height: 55vh;
          min-height: 420px;
          border-radius: calc((1 - var(--hero-progress, 0)) * 1.5rem);
          overflow: hidden;
        }
        .hero-image-img {
          transform: scale(calc(1 + var(--hero-progress, 0) * 0.03));
          transition: none;
        }
        @media (max-width: 767px) {
          .hero-image-outer {
            max-width: none;
            padding-left: calc((1 - var(--hero-progress, 0)) * 1.25rem);
            padding-right: calc((1 - var(--hero-progress, 0)) * 1.25rem);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-text,
          .hero-image-outer,
          .hero-image-box,
          .hero-image-img {
            transition: none;
            transform: none;
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}
