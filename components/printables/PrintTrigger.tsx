'use client'

/**
 * Tiny client island that fires the browser's print dialog. Used on
 * /printables/[slug]/print so the user can print or save-as-PDF without
 * digging through a menu.
 */
export default function PrintTrigger() {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== 'undefined') window.print()
      }}
      className="print-button"
    >
      Print this page
    </button>
  )
}
