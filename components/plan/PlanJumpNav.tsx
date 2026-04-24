'use client'

import { useEffect, useState } from 'react'

type JumpLink = { id: string; label: string }

interface PlanJumpNavProps {
  links: JumpLink[]
}

export default function PlanJumpNav({ links }: PlanJumpNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const elements = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer the entry closest to the top that's currently intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      {
        // Account for sticky navbar + jump nav
        rootMargin: '-120px 0px -60% 0px',
        threshold: 0,
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [links])

  return (
    <nav
      aria-label="Plan sections"
      className="sticky top-16 z-40 bg-[#F5F3EE]/95 backdrop-blur-sm border-b border-stone-200/60"
    >
      <div className="max-w-content mx-auto px-6">
        <ul className="flex gap-1 overflow-x-auto no-scrollbar py-3 md:py-4 -mx-1">
          {links.map((link) => {
            const isActive = activeId === link.id
            return (
              <li key={link.id} className="shrink-0">
                <a
                  href={`#${link.id}`}
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-stone-900 text-white'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
