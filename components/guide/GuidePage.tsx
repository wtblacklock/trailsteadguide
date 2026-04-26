import Link from 'next/link'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { getCategoryForGuide } from '@/lib/guides'

export type GuidePageProps = {
  eyebrow?: string
  title: string
  lede: string
  heroImage?: { src: string; alt: string }
  slug: string // current guide slug — used by RelatedGuides and to derive the category back-link
  children: ReactNode
}

export function GuidePage({ eyebrow = 'Guide', title, lede, heroImage, slug, children }: GuidePageProps) {
  const category = getCategoryForGuide(slug)

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
