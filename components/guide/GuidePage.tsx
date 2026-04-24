import Link from 'next/link'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { GUIDE_LINKS } from '@/lib/nav-config'

export type GuidePageProps = {
  eyebrow?: string
  title: string
  lede: string
  heroImage?: { src: string; alt: string }
  slug: string // current guide slug, to suggest a different related one
  children: ReactNode
}

export function GuidePage({ eyebrow = 'Guide', title, lede, heroImage, slug, children }: GuidePageProps) {
  // Pick a "next guide" that isn't the current one
  const related = GUIDE_LINKS.find((g) => !g.href.endsWith(slug)) ?? GUIDE_LINKS[0]

  return (
    <article>
      {/* Editorial header — text-first, narrow column, oversized serif title */}
      <header className="max-w-3xl mx-auto px-8 pt-16 md:pt-28 pb-8">
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
            Turn this into a plan for your family.
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

      {/* Related — two quiet links, not cards */}
      <section className="max-w-3xl mx-auto px-8 mt-20 mb-32">
        <div className="border-t border-stone-200 pt-12">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-8">
            Keep reading
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Link href={related.href} className="group block">
              <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Next guide</p>
              <p className="font-serif text-2xl md:text-3xl font-medium text-stone-900 tracking-tight leading-snug group-hover:text-stone-600 transition-colors">
                {related.label}
              </p>
              {related.description && (
                <p className="text-stone-500 mt-2 leading-relaxed">{related.description}</p>
              )}
            </Link>
            <Link href="/#example" className="group block">
              <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">See it in action</p>
              <p className="font-serif text-2xl md:text-3xl font-medium text-stone-900 tracking-tight leading-snug group-hover:text-stone-600 transition-colors">
                Example plan
              </p>
              <p className="text-stone-500 mt-2 leading-relaxed">
                What the final plan actually looks like.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
