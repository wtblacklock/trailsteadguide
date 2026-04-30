'use client'

import { useCallback, useEffect, useId, useState } from 'react'
import Image from 'next/image'
import type { SkillIllustration } from '@/lib/skills/types'

type Props = {
  illustration: SkillIllustration
}

/**
 * Click-to-enlarge for skill-page illustrations (knot diagrams,
 * planet ecliptic charts, anything in `skill.illustration`).
 *
 * Renders the existing <Image> with a transparent button overlay so
 * the diagram is interactive without disrupting the layout. Clicking
 * opens a full-screen modal showing the same image at large scale.
 * Closes on Escape, backdrop click, or the close button. Body scroll
 * is locked while open.
 */
export default function IllustrationLightbox({ illustration }: Props) {
  const [open, setOpen] = useState(false)
  const titleId = useId()
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [open, close])

  const isSvg = illustration.url.endsWith('.svg')

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Click to enlarge diagram"
        className="group relative aspect-video w-full overflow-hidden rounded-lg bg-white ring-1 ring-stone-200 hover:ring-stone-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F3EE]"
      >
        <Image
          src={illustration.url}
          alt={illustration.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain p-4"
          unoptimized={isSvg}
        />
        {/* Hover hint */}
        <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-stone-700 ring-1 ring-stone-200 shadow-sm opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          Enlarge
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
        >
          <div
            className="absolute inset-0 bg-stone-950/85 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />
          <div className="relative max-w-5xl max-h-[92vh] w-full overflow-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-stone-200 bg-white/95 backdrop-blur px-5 py-3">
              <p id={titleId} className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 line-clamp-1">
                {illustration.alt}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Close diagram"
                className="inline-flex items-center justify-center w-9 h-9 rounded-md text-stone-700 hover:bg-stone-200/60 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-8 sm:px-10 sm:py-10 flex items-center justify-center bg-white">
              {/*
                Render the same image at large scale. We deliberately use
                a plain <img> here (not next/image) so the lightbox can
                size the asset to its natural dimensions without forcing
                a fixed-aspect container.
              */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={illustration.url}
                alt={illustration.alt}
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>
            <p className="px-6 pb-5 text-xs text-stone-500">{illustration.attribution}</p>
          </div>
        </div>
      )}
    </>
  )
}
