import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbList, type BreadcrumbItem } from '@/lib/seo'

/**
 * Visible breadcrumb navigation. Renders a semantic <nav> with an ordered
 * list, plus optional JSON-LD BreadcrumbList schema.
 *
 * Pass `emitSchema: true` only on pages that don't already emit
 * articleGraph (which already includes breadcrumb schema).
 */
export default function Breadcrumbs({
  items,
  emitSchema = false,
}: {
  items: BreadcrumbItem[]
  emitSchema?: boolean
}) {
  if (items.length === 0) return null
  return (
    <>
      {emitSchema && (
        <JsonLd
          data={{ '@context': 'https://schema.org', ...breadcrumbList(items) }}
        />
      )}
      <nav
        aria-label="Breadcrumb"
        className="max-w-page mx-auto px-8 pt-6 md:pt-8"
      >
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-stone-500">
          {items.map((item, i) => {
            const isLast = i === items.length - 1
            return (
              <li key={item.url} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page" className="text-stone-700">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url.replace(/^https?:\/\/[^/]+/, '') || '/'}
                    className="hover:text-stone-900 transition-colors underline-offset-4 hover:underline"
                  >
                    {item.name}
                  </Link>
                )}
                {!isLast && <span aria-hidden="true" className="text-stone-300">›</span>}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
