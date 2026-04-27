'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  // Close mobile panel on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Close on outside click / Escape
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!navRef.current) return
      if (!navRef.current.contains(e.target as Node)) {
        setMobileOpen(false)
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <nav ref={navRef} className="sticky top-0 z-50 bg-[#F5F3EE]/95 backdrop-blur-sm border-b border-stone-200/60">
      <div className="max-w-page mx-auto px-8 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center shrink-0"
          aria-label="Trailstead Guide home"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/images/trailsteadguide_logo.svg"
            alt="Trailstead Guide"
            height={28}
            width={160}
            className="h-6 md:h-7 w-auto object-contain mix-blend-multiply"
            priority
          />
        </Link>

        {/* Desktop links — primary library entries on the left, primary CTA on the right rail */}
        <div className="hidden md:flex items-center gap-1 text-sm text-stone-700">
          <NavLink href="/guides">Guides</NavLink>
          <NavLink href="/skills">Skills</NavLink>
          <NavLink href="/gear">Gear</NavLink>
          <NavLink href="/about">About</NavLink>
        </div>

        {/* Right side: CTA + mobile toggle */}
        <div className="flex items-center gap-2">
          <Link
            href="/quiz"
            aria-label="Start Planning"
            className="shrink-0 inline-flex items-center justify-center gap-2 text-sm font-medium bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors px-3 py-2.5 md:px-5"
          >
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
            <span className="hidden sm:inline">Start Planning</span>
          </Link>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-stone-700 hover:bg-stone-200/60"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#F5F3EE]">
          <div className="max-w-page mx-auto px-8 py-6">
            <ul className="space-y-3">
              <li>
                <Link href="/guides" onClick={() => setMobileOpen(false)} className="block text-stone-800 text-base">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/skills" onClick={() => setMobileOpen(false)} className="block text-stone-800 text-base">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/gear" onClick={() => setMobileOpen(false)} className="block text-stone-800 text-base">
                  Gear
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={() => setMobileOpen(false)} className="block text-stone-800 text-base">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 rounded-md hover:bg-stone-200/60 transition-colors"
    >
      {children}
    </Link>
  )
}
