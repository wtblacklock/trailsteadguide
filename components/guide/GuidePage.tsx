import Link from 'next/link'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { getCategoryForGuide } from '@/lib/guides'
import { AUTHOR_NAME } from '@/lib/seo'

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
        <p className="mt-8 text-sm text-stone-500">
          By <Link href="/about" className="text-stone-700 hover:text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors">{AUTHOR_NAME}</Link>
          {updatedLabel && <span> · Last updated {updatedLabel}</span>}
        </p>
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

      {/* Divider + inline CTA */}
      <section className="max-w-3xl mx-auto px-8 mt-20">
        <div className="border-t border-stone-200 pt-12">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">
            Make it yours
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-4 max-w-xl">
            Get Your Camping Plan.
          </h2>
          <p className="text-stone-600 text-lg leading-relaxed mb-6 max-w-xl">
            Answer 5 questions. We scale the timeline, gear, and meals to your kids&apos; ages and your party size.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
          >
            Start Planning
          </Link>
        </div>
      </section>

    </article>
  )
}
