'use client'

import { useEffect } from 'react'
import { OffTrailLayout } from '@/components/site/OffTrailLayout'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (typeof console !== 'undefined') {
      console.error(error)
    }
  }, [error])

  return (
    <OffTrailLayout
      eyebrow="Something went sideways"
      headline="The lantern blew out."
      body="Something went wrong on our end loading this page. Try again, or pick a different route back."
      extraCta={
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-md font-medium ring-1 ring-stone-300 text-stone-900 hover:bg-stone-100 transition-colors px-6 py-3 text-sm w-full sm:w-auto"
        >
          Try again
        </button>
      }
    />
  )
}
