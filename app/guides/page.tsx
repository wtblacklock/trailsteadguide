import Link from 'next/link'
import { GUIDE_LINKS } from '@/lib/nav-config'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, collectionPageGraph, SITE_URL } from '@/lib/seo'

const GUIDES_TITLE = 'Camping Guides'
const GUIDES_DESCRIPTION =
  'Beginner-focused camping guides for families: checklists, planning walkthroughs, packing lists, and what to do when kids come along.'

export const metadata = pageMetadata({
  title: GUIDES_TITLE,
  description: GUIDES_DESCRIPTION,
  path: '/guides',
})

const GUIDES_COLLECTION = collectionPageGraph({
  slug: '/guides',
  title: GUIDES_TITLE,
  description: GUIDES_DESCRIPTION,
  items: GUIDE_LINKS.map((g) => ({
    name: g.label,
    url: `${SITE_URL}${g.href}`,
  })),
})

export default function Page() {
  return (
    <main>
      <JsonLd data={GUIDES_COLLECTION} />
      <Breadcrumbs
        emitSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Guides', url: `${SITE_URL}/guides` },
        ]}
      />
      <header className="max-w-page mx-auto px-8 pt-16 md:pt-24 pb-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-500 mb-4">Guides</p>
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-stone-950 tracking-tight leading-tight max-w-4xl">
          Start from zero. Leave with a plan.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl">
          Plain-spoken camping guides written for families doing this for the first time. No gear obsession, no hardcore backcountry talk — just what you actually need to know.
        </p>
      </header>

      <section className="max-w-page mx-auto px-8 pb-24">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GUIDE_LINKS.map((guide, i) => (
            <li key={guide.href}>
              <Link
                href={guide.href}
                className="block p-8 rounded-2xl ring-1 ring-stone-200 hover:bg-stone-100 transition-colors h-full"
              >
                <p className="text-xs uppercase tracking-widest text-stone-500 mb-3">
                  Guide {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="font-serif text-2xl md:text-3xl font-medium text-stone-900 mb-3 tracking-tight">
                  {guide.label}
                </h2>
                {guide.description && (
                  <p className="text-stone-500 leading-relaxed">{guide.description}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-page mx-auto px-8 pb-24">
        <div className="bg-stone-900 rounded-3xl p-10 md:p-16 text-white">
          <h2 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight mb-4 max-w-2xl">
            Or skip the reading.
          </h2>
          <p className="text-stone-300 text-lg mb-8 max-w-xl">
            Answer 5 questions. Get a full trip plan — timeline, gear, meals, activities — in about 2 minutes.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-md font-medium bg-white text-stone-900 hover:bg-stone-100 transition-colors px-6 py-3 text-sm"
          >
            Start Planning
          </Link>
        </div>
      </section>
    </main>
  )
}
