'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const PRIMARY_LINKS = [
  { href: '/guides', label: 'Guides' },
  { href: '/skills', label: 'Skills' },
  { href: '/gear', label: 'Gear' },
  { href: '/about', label: 'About' },
]

const SECONDARY_LINKS = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  // Close mobile panel on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Body scroll lock while the full-screen menu is open. Without this the page
  // underneath scrolls when the user drags inside the overlay.
  useEffect(() => {
    if (!mobileOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileOpen])

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
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </div>

      {/*
        Full-screen mobile menu. Always mounted so the panel can transition
        in and out cleanly; pointer events and visibility are toggled by
        explicit className branches alongside opacity/transform.
      */}
      <div
        id="mobile-menu"
        aria-hidden={!mobileOpen}
        className={`md:hidden fixed inset-0 z-[60] h-[100dvh] bg-[#F5F3EE] flex flex-col transition-[opacity,transform] duration-300 ease-out ${
          mobileOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto visible'
            : 'opacity-0 translate-y-2 pointer-events-none invisible'
        }`}
      >
        {/* Top row inside overlay — mirrors nav height with logo + close */}
        <div className="h-16 flex items-center justify-between px-8 border-b border-stone-200/60 shrink-0">
          <Link
            href="/"
            aria-label="Trailstead Guide home"
            onClick={() => setMobileOpen(false)}
            className="flex items-center"
          >
            <Image
              src="/images/trailsteadguide_logo.svg"
              alt="Trailstead Guide"
              height={28}
              width={160}
              className="h-6 w-auto object-contain mix-blend-multiply"
            />
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="inline-flex items-center justify-center w-12 h-12 -mr-2 rounded-md text-stone-700 hover:bg-stone-200/60 transition-colors"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Primary nav — large serif links, generous tap targets */}
        <div className="flex-1 overflow-y-auto px-8 py-10">
          <ul className="space-y-1">
            {PRIMARY_LINKS.map((item, index) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    style={{ transitionDelay: mobileOpen ? `${80 + index * 40}ms` : '0ms' }}
                    className={`group block py-4 font-serif text-4xl tracking-tight transition-all duration-300 ease-out ${
                      mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                    } ${isActive ? 'text-stone-950' : 'text-stone-800 hover:text-stone-950'}`}
                  >
                    <span className="inline-flex items-baseline gap-3">
                      {item.label}
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="-translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                      >
                        <path d="M5 12h14" />
                        <path d="M13 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="mt-12 pt-8 border-t border-stone-200/60">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">
              More
            </p>
            <ul className="space-y-1">
              {SECONDARY_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-lg text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sticky CTA at bottom — full-width tap target */}
        <div className="px-8 pb-8 pt-4 shrink-0 border-t border-stone-200/60 bg-[#F5F3EE]">
          <Link
            href="/quiz"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full text-base font-medium bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors py-4"
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
      </div>
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
