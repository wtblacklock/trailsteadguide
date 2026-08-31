import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, SITE_URL } from '@/lib/seo'
import { TERMS, slugify, type Term } from '@/lib/glossary/data'

export const metadata = pageMetadata({
  title: 'Camping Glossary — Beginner-Friendly Definitions',
  description:
    'Plain-English definitions of the camping terms beginners hear most. Knots, gear, fire rules, reservations, and more.',
  path: '/glossary',
  type: 'article',
})

const LETTERS = [...new Set(TERMS.map((t) => t.term[0].toUpperCase()))].sort()

const TERMS_BY_LETTER: Record<string, Term[]> = LETTERS.reduce(
  (acc, letter) => {
    acc[letter] = TERMS.filter((t) => t.term[0].toUpperCase() === letter)
    return acc
  },
  {} as Record<string, Term[]>,
)

export default function Page() {
  // Combined JSON-LD: Article (with breadcrumbs) + DefinedTermSet for the
  // glossary itself. DefinedTermSet helps Google parse this as a glossary
  // and AI engines use it as a citable source for "what is X" queries.
  const articleData = articleGraph({
    slug: '/glossary',
    title: 'Camping Glossary — Beginner-Friendly Definitions',
    description:
      'Plain-English definitions of the camping terms beginners hear most. Knots, gear, fire rules, reservations, and more.',
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Glossary', url: `${SITE_URL}/glossary` },
    ],
    articleSection: 'Reference',
    keywords: ['camping glossary', 'camping terms', 'camping vocabulary', 'beginner camping'],
  })

  const definedTermSet = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': `${SITE_URL}/glossary#termset`,
    name: 'Camping Glossary',
    description:
      'Plain-English definitions of common camping terms for beginners.',
    inLanguage: 'en-US',
    hasDefinedTerm: TERMS.map((t) => ({
      '@type': 'DefinedTerm',
      '@id': `${SITE_URL}/glossary#${slugify(t.term)}`,
      name: t.term,
      description: t.definition,
      inDefinedTermSet: { '@id': `${SITE_URL}/glossary#termset` },
    })),
  }

  return (
    <main>
      <JsonLd data={articleData} />
      <JsonLd data={definedTermSet} />
      <Breadcrumbs
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Glossary', url: `${SITE_URL}/glossary` },
        ]}
      />

      {/* Hero */}
      <header className="max-w-page mx-auto px-8 pt-16 md:pt-24 pb-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-500 mb-4">
          Reference
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-stone-950 tracking-tight leading-tight max-w-4xl">
          Camping Glossary
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl">
          Plain-English definitions for the camping terms beginners hear most.
        </p>
      </header>

      {/* A–Z navigator */}
      <nav
        aria-label="Jump to letter"
        className="max-w-page mx-auto px-8 pb-12"
      >
        <ul className="flex flex-wrap gap-2">
          {LETTERS.map((letter) => (
            <li key={letter}>
              <a
                href={`#${letter.toLowerCase()}`}
                className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-stone-200 text-sm font-medium text-stone-700 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-colors"
              >
                {letter}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Term sections */}
      <section className="max-w-page mx-auto px-8 pb-16">
        <div className="max-w-3xl">
          {LETTERS.map((letter) => (
            <div key={letter} className="mb-12 scroll-mt-24" id={letter.toLowerCase()}>
              <h2 className="font-serif text-4xl font-semibold text-stone-950 tracking-tight mb-6 border-b border-stone-200 pb-3">
                {letter}
              </h2>
              <dl className="space-y-6">
                {TERMS_BY_LETTER[letter].map((t) => (
                  <div key={t.term} id={slugify(t.term)} className="scroll-mt-24">
                    <dt className="font-semibold text-stone-950 text-lg">{t.term}</dt>
                    <dd className="mt-1 text-stone-600 leading-relaxed">
                      {t.definition}
                      {t.href && (
                        <>
                          {' '}
                          <Link
                            href={t.href}
                            className="text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition-colors"
                          >
                            {t.linkText ?? 'Learn more'}
                          </Link>
                          .
                        </>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      {/* End CTA */}
      <section className="max-w-page mx-auto px-8 pb-24">
        <div className="max-w-3xl border-t border-stone-200 pt-10">
          <p className="text-stone-600 leading-relaxed">
            Just want to plan your trip?{' '}
            <Link
              href="/quiz"
              className="text-stone-900 font-medium underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition-colors"
            >
              Take the 6-question quiz
            </Link>{' '}
            and we&apos;ll build a starter plan around your kids and your schedule.
          </p>
        </div>
      </section>
    </main>
  )
}
