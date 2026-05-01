'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

/**
 * Smooth page-change fade-out → navigate → fade-in.
 *
 * Uses plain CSS transitions on inline styles. State machine:
 *   - 'visible'  — normal; opacity 1, no translate
 *   - 'leaving'  — link clicked, playing fade-out
 *   - 'entering' — pathname just changed; start invisible, then flip to
 *                  'visible' on the next animation frame so the browser
 *                  interpolates the opacity/transform back to normal.
 *
 * A document-level click listener (capture phase) catches same-origin links
 * BEFORE next/link's own handler, so we can play the fade-out before calling
 * router.push.
 */
const FADE_OUT_MS = 550
const FADE_IN_MS = 700
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

type Phase = 'visible' | 'leaving' | 'entering'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('visible')
  const firstPaint = useRef(true)

  // Intercept same-origin link clicks so we can fade out first
  useEffect(() => {
    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    const handler = (e: MouseEvent) => {
      if (reducedMotion) return
      if (e.defaultPrevented) return
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      const anchor = (e.target as HTMLElement | null)?.closest('a')
      if (!anchor) return
      if (anchor.hasAttribute('download')) return
      const targetAttr = anchor.getAttribute('target')
      if (targetAttr && targetAttr !== '_self') return

      const href = anchor.getAttribute('href')
      if (!href) return
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return

      let url: URL
      try {
        url = new URL(href, window.location.href)
      } catch {
        return
      }
      if (url.origin !== window.location.origin) return
      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        return
      }

      // Beat next/link's own click handler
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()

      const destination = url.pathname + url.search + url.hash
      setPhase('leaving')
      window.setTimeout(() => {
        router.push(destination)
      }, FADE_OUT_MS)
    }

    // Capture phase runs before bound React handlers on <a>
    document.addEventListener('click', handler, true)
    return () => document.removeEventListener('click', handler, true)
  }, [router])

  // When the pathname changes, drop into 'entering' (invisible) and then flip
  // to 'visible' on the next frame so the transition interpolates.
  useEffect(() => {
    if (firstPaint.current) {
      firstPaint.current = false
      return
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
    setPhase('entering')
    // Double rAF: first frame commits 'entering' styles, next frame swaps to
    // 'visible' so the browser has a 'from' state to transition from.
    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(() => setPhase('visible'))
      ;(window as unknown as { __pt_r2: number }).__pt_r2 = r2
    })
    return () => {
      cancelAnimationFrame(r1)
      const w = window as unknown as { __pt_r2?: number }
      if (w.__pt_r2) cancelAnimationFrame(w.__pt_r2)
    }
  }, [pathname])

  const duration = phase === 'leaving' ? FADE_OUT_MS : FADE_IN_MS
  const opacity = phase === 'visible' ? 1 : 0
  const translateY =
    phase === 'leaving' ? '-8px' : phase === 'entering' ? '14px' : '0px'

  // IMPORTANT: when idle ('visible'), drop the transform entirely. A non-'none'
  // transform creates a containing block, which breaks `position: fixed` for
  // descendants (e.g. the floating email bar). Only apply transform while
  // actually transitioning.
  const isIdle = phase === 'visible'

  return (
    <div
      style={{
        opacity,
        transform: isIdle ? undefined : `translate3d(0, ${translateY}, 0)`,
        transition: `opacity ${duration}ms ${EASE}, transform ${duration}ms ${EASE}`,
        willChange: isIdle ? 'opacity' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
