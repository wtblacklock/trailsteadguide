'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { track } from '@/lib/analytics'

/**
 * Single global delegator for affiliate-link clicks. Listens at the document
 * root and fires `affiliate_clicked` whenever the user clicks an `<a>` whose
 * href points at Amazon. Catches every affiliate link site-wide — guides,
 * gear sets, comparisons, plan pages, gear systems — without per-component
 * wiring, and survives any future affiliate links being added.
 *
 * Event props:
 *   - product:  Amazon ASIN if /dp/<ASIN> URL, otherwise the search query
 *   - location: current pathname (e.g. /guides/camping-with-kids-first-time)
 *   - linkText: visible text of the clicked element, capped to 60 chars
 *   - subtag:   ascsubtag from the URL when present (set by amazonAffiliateUrl)
 */
const AMAZON_HOST_RE = /(^|\.)amazon\.(com|co\.uk|ca|de|fr|it|es)$/i

export default function AffiliateClickTracker() {
  const pathname = usePathname()

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as Element | null
      const anchor = target?.closest?.('a') as HTMLAnchorElement | null
      if (!anchor || !anchor.href) return

      let url: URL
      try {
        url = new URL(anchor.href)
      } catch {
        return
      }
      if (!AMAZON_HOST_RE.test(url.hostname)) return

      const dpMatch = url.pathname.match(/\/dp\/([A-Z0-9]{10})/i)
      const product = dpMatch?.[1] ?? url.searchParams.get('k') ?? 'unknown'
      const subtag = url.searchParams.get('ascsubtag') ?? ''
      const linkText = (anchor.innerText || anchor.textContent || '').trim().slice(0, 60)

      track('affiliate_clicked', {
        product,
        location: pathname || '/',
        linkText,
        ...(subtag ? { subtag } : {}),
      })
    }

    // capture: true so we run before any link's own onClick can stopPropagation.
    document.addEventListener('click', onClick, { capture: true })
    // mousedown also fires when the user middle-clicks or cmd-clicks to open in
    // a new tab; covers the case where the click event is suppressed.
    document.addEventListener('auxclick', onClick, { capture: true })
    return () => {
      document.removeEventListener('click', onClick, { capture: true })
      document.removeEventListener('auxclick', onClick, { capture: true })
    }
  }, [pathname])

  return null
}
