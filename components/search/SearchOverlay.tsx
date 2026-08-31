'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { getSearchEngine, searchDocuments, type SearchEngine } from '@/lib/search/client'
import type { SearchDocType, SearchDocument } from '@/lib/search/types'
import { SEARCH_TYPE_LABELS } from '@/lib/search/types'
import SearchResults from './SearchResults'

type Props = {
  open: boolean
  onClose: () => void
}

type Status = 'idle' | 'loading' | 'ready' | 'error'

// Empirically, broad prefix matches (e.g. "camp") can match well over 100 of
// the ~314 indexed documents. An overlay showing 100+ results defeats the
// purpose of "instant search" — cap what's displayed to the top N
// (MiniSearch already returns results ranked by relevance, best first).
const MAX_DISPLAYED_RESULTS = 30

const TYPE_CHIPS: Array<{ id: SearchDocType | 'all'; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'guide', label: SEARCH_TYPE_LABELS.guide + 's' },
  { id: 'skill', label: SEARCH_TYPE_LABELS.skill + 's' },
  { id: 'activity', label: SEARCH_TYPE_LABELS.activity + 's' },
  { id: 'printable', label: SEARCH_TYPE_LABELS.printable + 's' },
  { id: 'gear', label: SEARCH_TYPE_LABELS.gear },
  { id: 'glossary', label: SEARCH_TYPE_LABELS.glossary },
  { id: 'compare', label: SEARCH_TYPE_LABELS.compare },
  { id: 'plan', label: SEARCH_TYPE_LABELS.plan + 's' },
]

const POPULAR_LINKS = [
  { href: '/guides', label: 'Browse all guides' },
  { href: '/quiz', label: 'Take the 5-second quiz' },
  { href: '/gear', label: 'See the gear guide' },
]

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'input, button:not([tabindex="-1"]), a:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])',
    ),
  )
}

export default function SearchOverlay({ open, onClose }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [engine, setEngine] = useState<SearchEngine | null>(null)
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [activeType, setActiveType] = useState<SearchDocType | 'all'>('all')
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  // Load the engine the first time the overlay opens.
  useEffect(() => {
    if (!open || engine) return
    setStatus('loading')
    getSearchEngine()
      .then((e) => {
        setEngine(e)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [open, engine])

  // Reset transient state whenever the overlay opens, and focus the input.
  useEffect(() => {
    if (!open) return
    setQuery('')
    setDebouncedQuery('')
    setActiveType('all')
    setHighlightedIndex(0)
    const id = setTimeout(() => inputRef.current?.focus(), 0)
    return () => clearTimeout(id)
  }, [open])

  // Debounce the query.
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), 120)
    return () => clearTimeout(id)
  }, [query])

  const allResults = useMemo<SearchDocument[]>(() => {
    if (!engine) return []
    return searchDocuments(engine, debouncedQuery)
  }, [engine, debouncedQuery])

  const filteredResults = useMemo(() => {
    const byType = activeType === 'all' ? allResults : allResults.filter((r) => r.type === activeType)
    // See MAX_DISPLAYED_RESULTS comment above — cap after type filtering so
    // a narrowed-down chip view still shows up to N relevant matches within
    // that type, rather than N matches from the unfiltered top of the list.
    return byType.slice(0, MAX_DISPLAYED_RESULTS)
  }, [allResults, activeType])

  useEffect(() => {
    setHighlightedIndex(0)
  }, [debouncedQuery, activeType])

  function handleDialogKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') {
      onClose()
      return
    }

    if (e.key === 'Tab') {
      const dialog = dialogRef.current
      if (!dialog) return
      const focusable = getFocusableElements(dialog)
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
      return
    }

    // Arrow/Enter navigation only makes sense while the input is focused —
    // chip buttons have their own native button behavior and shouldn't have
    // arrow-key side effects.
    if (document.activeElement !== inputRef.current) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex((i) => Math.min(i + 1, Math.max(filteredResults.length - 1, 0)))
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex((i) => Math.max(i - 1, 0))
      return
    }
    if (e.key === 'Enter') {
      const target = filteredResults[highlightedIndex]
      if (!target) return
      e.preventDefault()
      // Delegate to the result's own anchor rather than reimplementing
      // navigation (e.g. via router.push): the rendered <Link>/<a> already
      // handles gear's target="_blank" and, critically, in-page hash anchors
      // (glossary entries link to `/glossary#term-id`) — router.push updates
      // the URL but doesn't scroll to the fragment the way a real anchor
      // click does, which left keyboard users stranded at the top of the
      // page instead of at the highlighted entry.
      document.getElementById(`search-option-${target.id}`)?.querySelector('a')?.click()
    }
  }

  if (!open) return null

  // Drives aria-activedescendant below — SearchResults gives each option an
  // id of `search-option-${doc.id}`, added specifically so the input can
  // reference the virtually-highlighted option for screen readers, since
  // DOM focus intentionally stays on the input (see SearchResults' tabIndex={-1}
  // on each result link — arrow keys/Enter drive navigation, not Tab).
  const activeDescendantId = filteredResults[highlightedIndex]
    ? `search-option-${filteredResults[highlightedIndex].id}`
    : undefined

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center pt-24 px-4">
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/40 backdrop-blur-sm"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site search"
        onKeyDown={handleDialogKeyDown}
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl ring-1 ring-stone-200 overflow-hidden flex flex-col max-h-[70vh]"
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-stone-200 shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-stone-400 shrink-0">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides, skills, gear, and more…"
            className="flex-1 outline-none text-stone-900 placeholder:text-stone-400"
            aria-label="Search"
            role="combobox"
            aria-expanded={filteredResults.length > 0}
            aria-controls="search-results-listbox"
            aria-activedescendant={activeDescendantId}
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="text-xs text-stone-400 border border-stone-200 rounded px-1.5 py-0.5"
          >
            Esc
          </button>
        </div>

        <div className="flex gap-1.5 px-4 py-2 border-b border-stone-100 overflow-x-auto shrink-0">
          {TYPE_CHIPS.map((chip) => (
            <button
              key={chip.id}
              type="button"
              onClick={() => setActiveType(chip.id)}
              className={`shrink-0 text-xs font-medium rounded-full px-3 py-1 transition-colors ${
                activeType === chip.id
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        <div className="overflow-y-auto flex-1">
          {status === 'error' && (
            <div className="p-6 text-center text-sm text-stone-600">
              Search is temporarily unavailable.
              <button
                type="button"
                onClick={() => {
                  setStatus('loading')
                  getSearchEngine()
                    .then((e) => {
                      setEngine(e)
                      setStatus('ready')
                    })
                    .catch(() => setStatus('error'))
                }}
                className="block mx-auto mt-2 text-stone-900 font-medium underline underline-offset-4"
              >
                Try again
              </button>
            </div>
          )}

          {status !== 'error' && debouncedQuery.trim() === '' && (
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2 px-2">
                Popular
              </p>
              <ul>
                {POPULAR_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="block px-2 py-2 rounded-lg text-stone-700 hover:bg-stone-50"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {status !== 'error' && debouncedQuery.trim() !== '' && filteredResults.length === 0 && (
            <div className="p-6 text-center text-sm text-stone-600">
              No results for &ldquo;{debouncedQuery}&rdquo;.
              <div className="mt-2">
                <Link href="/guides" onClick={onClose} className="text-stone-900 font-medium underline underline-offset-4">
                  Browse all guides
                </Link>
              </div>
            </div>
          )}

          {status !== 'error' && filteredResults.length > 0 && (
            <div id="search-results-listbox">
              <SearchResults results={filteredResults} highlightedIndex={highlightedIndex} onNavigate={onClose} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
