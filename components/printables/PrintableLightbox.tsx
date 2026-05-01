'use client'

import { useEffect, useId, useState, useCallback } from 'react'
import PrintableThumbnail from './PrintableThumbnail'
import PrintablePreview from './PrintablePreview'

type Props = {
  /** Printable slug — resolves the renderer in PrintableThumbnail / PrintablePreview. */
  slug: string
  /**
   * Visual size of the trigger thumbnail. `card` is for the /printables hub
   * cards (~h-56). `compact` fits the analog-companion block on skill pages
   * (~h-40).
   */
  triggerVariant?: 'card' | 'compact'
  /** Optional accessible label for the trigger button. */
  triggerLabel?: string
}

/**
 * Click-to-enlarge lightbox for printable previews.
 *
 * Renders a `<PrintableThumbnail />` as the trigger; clicking opens a
 * full-screen modal that displays the same artwork at large scale via
 * `<PrintablePreview />`. Closes on Escape, on backdrop click, or on
 * the explicit close button. Body scroll is locked while open so the
 * page underneath doesn't jump on scroll-wheel.
 */
export default function PrintableLightbox({
  slug,
  triggerVariant = 'card',
  triggerLabel = 'Click to enlarge preview',
}: Props) {
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

  const heightClass = triggerVariant === 'compact' ? 'h-40' : 'h-56 md:h-64'
  const scale = triggerVariant === 'compact' ? 0.22 : 0.32

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={triggerLabel}
        className="group relative block w-full text-left rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F3EE]"
      >
        <PrintableThumbnail slug={slug} scale={scale} heightClass={heightClass} />
        {/* Hover hint badge */}
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
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* Content frame */}
          <div className="relative max-w-5xl max-h-[90vh] w-full overflow-auto rounded-2xl bg-[#F5F3EE] shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-stone-200 bg-[#F5F3EE]/95 backdrop-blur px-5 py-3">
              <p id={titleId} className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                Preview · {slug.replace(/-/g, ' ')}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Close preview"
                className="inline-flex items-center justify-center w-9 h-9 rounded-md text-stone-700 hover:bg-stone-200/60 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-8 sm:px-10 sm:py-12">
              <PrintablePreview slug={slug} printHref={`/printables/${slug}/print`} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
