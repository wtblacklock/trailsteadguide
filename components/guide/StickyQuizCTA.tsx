'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const SHOW_AFTER_PX = 600
const HIDE_NEAR_BOTTOM_PX = 400

export default function StickyQuizCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let frame = 0

    function update() {
      const scrollY = window.scrollY
      const viewport = window.innerHeight
      const fullHeight = document.documentElement.scrollHeight
      const distanceFromBottom = fullHeight - (scrollY + viewport)
      const nextVisible = scrollY > SHOW_AFTER_PX && distanceFromBottom > HIDE_NEAR_BOTTOM_PX
      setVisible((prev) => (prev === nextVisible ? prev : nextVisible))
    }

    function onScroll() {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        update()
      })
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      aria-hidden={!visible}
      className={`fixed right-4 md:right-6 z-40 transition-opacity duration-300 ease-out ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
    >
      <Link
        href="/quiz"
        tabIndex={visible ? 0 : -1}
        className="inline-flex items-center gap-2 rounded-full bg-brand-green text-cream hover:bg-brand-green-light transition-colors px-5 py-3 text-sm font-medium shadow-lg shadow-stone-900/15 ring-1 ring-stone-900/5"
      >
        Start your camping plan
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  )
}
