import Link from 'next/link'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { getCategoryForGuide } from '@/lib/guides'
import { AUTHOR_NAME, AUTHOR_IMAGE } from '@/lib/seo'

export type GuidePageProps = {
  eyebrow?: string
  title: string
  lede: string
  heroImage?: { src: string; alt: string }
  slug: string // current guide slug — used by RelatedGuides and to derive the category back-link
  /** ISO date string (YYYY-MM-DD). Falls back to the schema default modifier. */
  dateModified?: string
  children: ReactNode
}

const DEFAULT_DATE_MODIFIED = '2026-04-24'

function formatUpdatedLabel(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
}

export function GuidePage({ eyebrow = 'Guide', title, lede, heroImage, slug, dateModified, children }: GuidePageProps) {
  const category = getCategoryForGuide(slug)
  const updatedLabel = formatUpdatedLabel(dateModified ?? DEFAULT_DATE_MODIFIED)

  return (
    <article>
      {/* Editorial header — text-first, narrow column, oversized serif title */}
      <header className="max-w-3xl mx-auto px-8 pt-16 md:pt-28 pb-8">
        {category && (
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-6">
            <Link
              href={`/guides/${category.slug}`}
              className="hover:text-stone-900 transition-colors"
            >
              ← {category.label}
            </Link>
          </p>
        )}
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-8">
          {eyebrow}
        </p>
        <h1 className="font-serif text-[2.75rem] md:text-[4.25rem] leading-[1.02] tracking-[-0.02em] font-semibold text-stone-950">
          {title}
        </h1>
        <p className="mt-8 text-xl md:text-2xl text-stone-600 leading-[1.5] font-light">
          {lede}
        </p>
        <div className="mt-8 flex items-center gap-3 text-sm text-stone-500">
          <Image
            src={AUTHOR_IMAGE}
            alt={`${AUTHOR_NAME} headshot`}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full ring-1 ring-stone-200 object-cover"
          />
          <p>
            By <Link href="/about#author" className="text-stone-700 hover:text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors">{AUTHOR_NAME}</Link>
            {updatedLabel && <span> · Last updated {updatedLabel}</span>}
          </p>
        </div>
      </header>

      {/* Hero image — sits BELOW the lede, full-bleed within page max, editorial caption feel */}
      {heroImage && (
        <figure className="max-w-5xl mx-auto px-8 mt-6 mb-20">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-stone-100">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1024px"
              unoptimized
            />
          </div>
        </figure>
      )}

      {/* Body — narrow reading column, quiet typography */}
      <section className="max-w-3xl mx-auto px-8">
        <div className="prose-editorial">{children}</div>
      </section>
    </article>
  )
}
