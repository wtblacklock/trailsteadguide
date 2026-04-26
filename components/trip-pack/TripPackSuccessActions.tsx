'use client'

import { useEffect } from 'react'
import { track } from '@/lib/analytics'
import type { PlanSlug } from '@/types'

/**
 * Client wrapper for the trip-pack success page download CTA.
 *
 * Owns two analytics events the surrounding RSC can't fire itself:
 *   - paywall_purchased: emitted once on mount when this page rendered after
 *     a paid Stripe session (i.e. not the free-PDF token path).
 *   - pdf_download_clicked: emitted when the user clicks the download link.
 */
export default function TripPackSuccessActions({
  downloadUrl,
  fileName,
  planSlug,
  tier,
  purchased,
}: {
  downloadUrl: string
  fileName: string
  planSlug: PlanSlug
  tier: 'basic' | 'premium'
  purchased: boolean
}) {
  useEffect(() => {
    if (!purchased) return
    track('paywall_purchased', { plan: planSlug, tier })
  }, [purchased, planSlug, tier])

  return (
    <a
      href={downloadUrl}
      download={fileName}
      onClick={() => {
        track('pdf_download_clicked', {
          plan: planSlug,
          tier,
          source: purchased ? 'stripe' : 'email_gate',
        })
      }}
      className="block w-full text-center bg-[#1f3622] hover:bg-[#2a4a30] text-white font-semibold py-4 rounded-xl transition-colors"
    >
      Download your Trip Pack (PDF)
    </a>
  )
}
