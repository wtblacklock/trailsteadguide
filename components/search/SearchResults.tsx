'use client'

import Link from 'next/link'
import type { SearchDocument } from '@/lib/search/types'
import { SEARCH_TYPE_LABELS } from '@/lib/search/types'

type Props = {
  results: SearchDocument[]
  highlightedIndex: number
  onNavigate: () => void
}

export default function SearchResults({ results, highlightedIndex, onNavigate }: Props) {
  if (results.length === 0) return null

  return (
    <ul role="listbox" className="divide-y divide-stone-100">
      {results.map((doc, i) => {
        const isHighlighted = i === highlightedIndex
        const rowClasses = `flex items-start gap-3 px-4 py-3 transition-colors ${
          isHighlighted ? 'bg-stone-100' : 'hover:bg-stone-50'
        }`
        const inner = (
          <>
            <span className="mt-0.5 shrink-0 text-[10px] font-semibold uppercase tracking-wider text-stone-500 bg-stone-100 rounded px-1.5 py-0.5">
              {SEARCH_TYPE_LABELS[doc.type]}
            </span>
            <span className="min-w-0">
              <span className="block text-stone-900 font-medium truncate">{doc.title}</span>
              <span className="block text-sm text-stone-500 line-clamp-1">{doc.excerpt}</span>
            </span>
          </>
        )

        if (doc.type === 'gear') {
          return (
            <li id={`search-option-${doc.id}`} key={doc.id} role="option" aria-selected={isHighlighted}>
              <a
                href={doc.url}
                target="_blank"
                rel="nofollow sponsored noopener"
                onClick={onNavigate}
                tabIndex={-1}
                className={rowClasses}
              >
                {inner}
              </a>
            </li>
          )
        }

        return (
          <li id={`search-option-${doc.id}`} key={doc.id} role="option" aria-selected={isHighlighted}>
            <Link href={doc.url} onClick={onNavigate} tabIndex={-1} className={rowClasses}>
              {inner}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
