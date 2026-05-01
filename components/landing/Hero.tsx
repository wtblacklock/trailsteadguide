'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

/**
 * Hero with cinematic scroll-driven expansion.
 *
 * IMPORTANT: the resting (un-scrolled) state uses plain Tailwind classes so
 * it renders correctly on the very first paint — even in production where
 * styled-jsx CSS can arrive a frame late. The scroll-driven transforms are
 * applied as inline styles on a rAF-throttled scroll handler; at rest we
 * remove them entirely so the Tailwind classes win.
 */
export default function Hero() {
  const wrapRef = useRef<HTMLElement>(null)
  const outerRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0

    const apply = () => {
      raf = 0
      const wrap = wrapRef.current
      const outer = outerRef.current
      const box = boxRef.current
      const imgWrap = imgWrapRef.current
      const text = textRef.current
      if (!wrap || !outer || !box || !imgWrap || !text) return

      const rect = wrap.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const end = vh * 0.9
      const scrolled = Math.max(0, -rect.top)
      const progress = Math.max(0, Math.min(1, scrolled / end))
      const eased = 1 - Math.pow(1 - progress, 2)

      // Match Tailwind's responsive side padding: px-4 (1rem) on mobile, px-8 (2rem) on md+
      const sidePadRem = window.innerWidth <= 767 ? 1.25 : 2

      if (eased <= 0.001) {
        // At rest: let Tailwind base classes own layout. This is the fix for
        // the "huge-then-settles" flash on first paint.
        outer.style.removeProperty('padding-left')
        outer.style.removeProperty('padding-right')
        outer.style.removeProperty('max-width')
        box.style.removeProperty('border-radius')
        imgWrap.style.removeProperty('transform')
        text.style.removeProperty('opacity')
        text.style.removeProperty('transform')
        return
      }

      outer.style.paddingLeft = `calc((1 - ${eased}) * ${sidePadRem}rem)`
      outer.style.paddingRight = `calc((1 - ${eased}) * ${sidePadRem}rem)`
      outer.style.maxWidth = `calc(90rem + (100vw - 90rem) * ${eased})`
      box.style.borderRadius = `calc((1 - ${eased}) * 1.5rem)`
      imgWrap.style.transform = `scale(${1 + eased * 0.03})`
      text.style.opacity = String(1 - eased * 0.35)
      text.style.transform = `translateY(${eased * -12}px)`
    }

    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(apply)
    }

    // Respect reduced motion — never apply the transforms
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!reduce) {
      apply()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section ref={wrapRef}>
      <div className="max-w-page mx-auto px-8 pt-14 md:pt-24 pb-10 md:pb-16">
        <div ref={textRef} className="max-w-4xl" style={{ willChange: 'opacity, transform' }}>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-stone-950 tracking-tight leading-[1.08] mb-5 md:mb-6">
            Plan your first camping trip in minutes.
          </h1>
          <p className="text-stone-500 text-lg md:text-xl leading-relaxed mb-8 md:mb-10 max-w-2xl">
            Get a clear, personalized camping plan based on who you&rsquo;re going with, your experience level, and the type of trip you want.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-8 py-4 text-base"
            >
              Start Your Camping Plan
            </Link>
            <Link
              href="/guides"
              className="text-base text-stone-500 hover:text-stone-700 transition-colors underline underline-offset-4"
            >
              Explore Guides
            </Link>
          </div>
          <p className="text-stone-400 text-sm mt-6">Free · No account required</p>
        </div>
      </div>

      {/* Resting state: max-w-page with Tailwind padding + rounded-2xl. No CSS
          vars, no styled-jsx — renders correctly on the very first paint. */}
      <div
        ref={outerRef}
        className="w-full max-w-page mx-auto px-4 md:px-8 pb-8"
      >
        <div
          ref={boxRef}
          className="relative w-full h-[55vh] min-h-[420px] rounded-2xl overflow-hidden"
        >
          <div ref={imgWrapRef} className="absolute inset-0" style={{ willChange: 'transform' }}>
            <Image
              src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1600&auto=format&fit=crop&q=80"
              alt="Family camping in a forest clearing at golden hour"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) calc(100vw - 4rem), 80rem"
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  )
}
