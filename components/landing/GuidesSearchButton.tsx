'use client'

import { OPEN_SEARCH_EVENT, type OpenSearchDetail } from '@/lib/search/open-event'

/**
 * Opens the site search overlay, pre-scoped to guides.
 *
 * The overlay's open state lives in <Nav>'s local useState, and this button
 * renders inside <GuidesSection> in a different subtree, so the two talk
 * over a window event rather than a context provider - one listener in Nav
 * against a whole provider wrapping the app.
 */
export default function GuidesSearchButton({ count }: { count: number }) {
  return (
    <button
      type="button"
      onClick={() => {
        const detail: OpenSearchDetail = { type: 'guide' }
        window.dispatchEvent(new CustomEvent(OPEN_SEARCH_EVENT, { detail }))
      }}
      className="self-start inline-flex items-center gap-2 rounded-md ring-1 ring-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-900 hover:ring-stone-900 transition-colors"
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
      Search all {count} guides
    </button>
  )
}
