'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { TOOL_LINKS } from '@/lib/nav-config'

type OpenMenu = 'tools' | null

export default function Nav() {
  const [open, setOpen] = useState<OpenMenu>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  // Close any open menu on route change
  useEffect(() => {
    setOpen(null)
    setMobileOpen(false)
  }, [pathname])

  // Close dropdown on outside click / Escape
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!navRef.current) return
      if (!navRef.current.contains(e.target as Node)) {
        setOpen(null)
        setMobileOpen(false)
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(null)
        setMobileOpen(false)
      }
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
          onClick={() => {
            setOpen(null)
            setMobileOpen(false)
          }}
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

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1 text-sm text-stone-700">
          <NavLink href="/guides">Guides</NavLink>
          <Dropdown
            label="Tools"
            items={TOOL_LINKS}
            isOpen={open === 'tools'}
            onToggle={() => setOpen(open === 'tools' ? null : 'tools')}
            onClose={() => setOpen(null)}
          />
          <NavLink href="/skills">Skills</NavLink>
          <NavLink href="/activities">Activities</NavLink>
          <NavLink href="/gear">Gear Guide</NavLink>
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
          <div className="max-w-page mx-auto px-8 py-6 space-y-6">
            <MobileGroup title="Tools" items={TOOL_LINKS} onNavigate={() => setMobileOpen(false)} />
            <div className="pt-2 border-t border-stone-200">
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
                  <Link href="/activities" onClick={() => setMobileOpen(false)} className="block text-stone-800 text-base">
                    Activities
                  </Link>
                </li>
                <li>
                  <Link href="/gear" onClick={() => setMobileOpen(false)} className="block text-stone-800 text-base">
                    Gear Guide
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

function Dropdown({
  label,
  items,
  isOpen,
  onToggle,
  onClose,
  wide = false,
}: {
  label: string
  items: NavItem[]
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
  wide?: boolean
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="px-3 py-2 rounded-md hover:bg-stone-200/60 transition-colors inline-flex items-center gap-1.5"
      >
        {label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className={`absolute left-0 top-full mt-2 ${wide ? 'w-96' : 'w-80'} bg-white rounded-xl shadow-lg ring-1 ring-stone-200 overflow-hidden max-h-[70vh] overflow-y-auto`}>
          <ul className="py-2">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block px-4 py-3 hover:bg-stone-50 transition-colors"
                >
                  <p className="font-medium text-stone-900">{item.label}</p>
                  {item.description && (
                    <p className="text-sm text-stone-500 mt-0.5">{item.description}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

type NavItem = { label: string; href: string; description?: string }

function MobileGroup({
  title,
  items,
  onNavigate,
}: {
  title: string
  items: NavItem[]
  onNavigate: () => void
}) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-widest uppercase text-stone-500 mb-3">{title}</p>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className="block text-stone-800 text-base"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
