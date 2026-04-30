import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import PrintableLightbox from '@/components/printables/PrintableLightbox'
import { pageMetadata, collectionPageGraph, SITE_URL } from '@/lib/seo'
import { PRINTABLES } from '@/lib/printables'

const TITLE = 'Printables'
const META_TITLE = 'Free Camping Printables — Star Charts, Knot Cards'
const DESCRIPTION =
  'Free, printable camping reference cards — star charts, knot guides, fire-starting checklists. Single-page analog tools for the campsite.'

export const metadata = pageMetadata({
  title: META_TITLE,
  description: DESCRIPTION,
  path: '/printables',
})

const COLLECTION = collectionPageGraph({
  slug: '/printables',
  title: TITLE,
  description: DESCRIPTION,
  items: PRINTABLES.map((p) => ({
    name: p.title,
    url: `${SITE_URL}/printables/${p.slug}`,
  })),
})

export default function Page() {
  return (
    <main>
      <JsonLd data={COLLECTION} />
      <Breadcrumbs
        emitSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Printables', url: `${SITE_URL}/printables` },
        ]}
      />

      <header className="max-w-page mx-auto px-8 pt-16 md:pt-24 pb-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-500 mb-4">
          Printables
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-stone-950 tracking-tight leading-tight max-w-4xl">
          Analog tools for the campsite.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl">
          One-page printables you can fold into a pack — star charts, knot cards, packing lists. Free with email signup.
        </p>
      </header>

      <section className="max-w-page mx-auto px-8 pb-24">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {PRINTABLES.map((p) => (
            <li
              key={p.slug}
              className="group h-full flex flex-col p-6 md:p-8 rounded-2xl ring-1 ring-stone-200 bg-white hover:ring-stone-900 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
            >
              <PrintableLightbox slug={p.slug} triggerVariant="card" />
              <Link href={`/printables/${p.slug}`} className="mt-6 block">
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-3">
                  {p.formatNote}
                </p>
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-stone-950 tracking-tight leading-tight mb-2 group-hover:text-stone-600 transition-colors">
                  {p.title}
                </h2>
                <p className="text-stone-600 leading-relaxed mb-5">{p.description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-900 group-hover:text-stone-600 transition-colors">
                  Get the printable
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
