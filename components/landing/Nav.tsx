'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import SearchOverlay from '@/components/search/SearchOverlay'
import { useBodyScrollLock } from '@/lib/hooks/useBodyScrollLock'
import { OPEN_SEARCH_EVENT, type OpenSearchDetail } from '@/lib/search/open-event'
import type { SearchDocType } from '@/lib/search/types'

const PRIMARY_LINKS = [
  { href: '/guides', label: 'Guides' },
  { href: '/skills', label: 'Skills' },
  { href: '/activities', label: 'Activities' },
  { href: '/gear', label: 'Gear' },
  { href: '/printables', label: 'Printables' },
]

const SECONDARY_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchType, setSearchType] = useState<SearchDocType | 'all'>('all')
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  // Close mobile panel on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Close search on route change. Belt-and-suspenders alongside the
  // onClose/onNavigate callbacks passed into SearchOverlay: those callbacks
  // fire synchronously on click, but Next.js Link navigations run inside a
  // transition, and empirically the resulting setState can lose the race
  // against the route change committing - leaving the overlay stuck open on
  // top of the newly-navigated page. Reacting to pathname directly guarantees
  // the overlay closes whenever the route actually changes.
  useEffect(() => {
    setSearchOpen(false)
  }, [pathname])

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Global search shortcut - works from anywhere on the site since Nav
  // is rendered in the root layout.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchType('all')
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Lets surfaces outside this subtree open the overlay, optionally scoped to
  // one result type. See lib/search/open-event.ts.
  useEffect(() => {
    function onOpenSearch(e: Event) {
      const detail = (e as CustomEvent<OpenSearchDetail>).detail
      setSearchType(detail?.type ?? 'all')
      setSearchOpen(true)
    }
    window.addEventListener(OPEN_SEARCH_EVENT, onOpenSearch)
    return () => window.removeEventListener(OPEN_SEARCH_EVENT, onOpenSearch)
  }, [])

  // Body scroll lock while the full-screen menu is open. Without this the page
  // underneath scrolls when the user drags inside the overlay.
  useBodyScrollLock(mobileOpen)

  // Fragment, not a single <nav> wrapper: <nav> has backdrop-blur-sm, and
  // backdrop-filter establishes a new containing block for `position: fixed`
  // descendants per spec. SearchOverlay's `fixed inset-0` dismiss backdrop
  // relies on anchoring to the real viewport - nested inside <nav> it was
  // silently resolving against <nav>'s own ~64px-tall box instead, so
  // clicking anywhere below the header to close search never worked.
  // Keeping it as a sibling of <nav> avoids that.
  return (
    <>
      <nav ref={navRef} className="sticky top-0 z-50 bg-[#F5F3EE]/95 backdrop-blur-sm border-b border-stone-200/60">
        <div className="max-w-page mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between gap-3 md:gap-6">
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

          {/* Desktop links - primary catalog entries on the left, primary CTA on the right rail */}
          <div className="hidden md:flex items-center gap-1 text-sm text-stone-700">
            <NavLink href="/guides">Guides</NavLink>
            <NavLink href="/skills">Skills</NavLink>
            <NavLink href="/activities">Activities</NavLink>
            <NavLink href="/gear">Gear</NavLink>
            <NavLink href="/printables">Printables</NavLink>
          </div>

          {/* Right side: CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSearchType('all')
                setSearchOpen(true)
              }}
              aria-label="Search"
              className="inline-flex items-center justify-center w-10 h-10 rounded-md text-stone-700 hover:bg-stone-200/60 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            <Link
              href="/quiz"
              aria-label="Start Planning"
              className="hidden md:inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors px-5 py-2.5"
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
              Start Planning
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
          {/* Top row inside overlay - mirrors nav height with logo + close */}
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
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false)
                  setSearchType('all')
                  setSearchOpen(true)
                }}
                aria-label="Search"
                className="inline-flex items-center justify-center w-12 h-12 rounded-md text-stone-700 hover:bg-stone-200/60 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
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
          </div>

          {/* Primary nav - large serif links, generous tap targets */}
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

          {/* Sticky CTA at bottom - full-width tap target */}
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
      <SearchOverlay
        open={searchOpen}
        initialType={searchType}
        onClose={() => setSearchOpen(false)}
      />
    </>
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
