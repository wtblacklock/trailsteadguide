'use client'

import { useEffect } from 'react'

/**
 * Global scroll-reveal effect. Finds any element with [data-reveal] and
 * toggles `data-reveal-state="in"` when it enters the viewport, driving
 * the CSS transitions defined in globals.css.
 */
export default function ScrollRevealer() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (prefersReducedMotion) {
      els.forEach((el) => el.setAttribute('data-reveal-state', 'in'))
      return
    }

    // Set initial state
    els.forEach((el) => {
      if (!el.getAttribute('data-reveal-state')) {
        el.setAttribute('data-reveal-state', 'out')
      }
    })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            ;(e.target as HTMLElement).setAttribute('data-reveal-state', 'in')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return null
}
