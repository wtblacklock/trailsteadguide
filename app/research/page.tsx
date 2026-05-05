import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import {
  pageMetadata,
  collectionPageGraph,
  SITE_URL,
} from '@/lib/seo'

const SLUG = '/research'
const META_TITLE = 'Original Research — Trailstead Guide'
const DESCRIPTION =
  'Reddit-grounded pattern analyses on first-time camping. What beginners regret, what they pack, and what they wish they’d known.'

export const metadata = pageMetadata({
  title: META_TITLE,
  description: DESCRIPTION,
  path: SLUG,
})

type Piece = {
  slug: string
  kicker: string
  title: string
  summary: string
  date: string
}

const PIECES: Piece[] = [
  {
    slug: '/research/what-1000-campers-actually-pack',
    kicker: 'Pattern analysis',
    title: 'What 1,000 First-Time Campers Actually Pack: A Reddit Analysis',
    summary:
      'A year of r/camping, r/CampingGear, r/Tents, and r/CampingandHiking pack-list threads. The eight items beginners forget, the five categories they overpack, and an under-$200 kit synthesized from the patterns.',
    date: 'May 2026',
  },
  {
    slug: '/research/first-time-camping-regrets',
    kicker: 'Pattern analysis',
    title: 'What 500 First-Trip Campers Regret: A Reddit Analysis',
    summary:
      'Five hundred r/camping threads, seven recurring regrets. The mistakes that wreck a first trip are not about the camping — they are about the decisions made the week before.',
    date: 'April 2026',
  },
]

export default function Page() {
  return (
    <>
      <JsonLd
        data={collectionPageGraph({
          slug: SLUG,
          title: META_TITLE,
          description: DESCRIPTION,
          items: PIECES.map((p) => ({
            name: p.title,
            url: `${SITE_URL}${p.slug}`,
          })),
        })}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Research', url: `${SITE_URL}${SLUG}` },
        ]}
        emitSchema
      />

      <header className="max-w-3xl mx-auto px-8 pt-12 md:pt-20 pb-6">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-8">
          Original Research
        </p>
        <h1 className="font-serif text-[2.5rem] md:text-[4rem] leading-[1.02] tracking-[-0.02em] font-semibold text-stone-950">
          Pattern analyses for first-time campers.
        </h1>
        <p className="mt-8 text-xl md:text-2xl text-stone-600 leading-[1.5] font-light">
          Reddit-grounded synthesis on the questions every beginner asks before their
          first trip — what to pack, what to skip, and what they’ll wish they’d known.
        </p>
      </header>

      <section className="max-w-3xl mx-auto px-8 mt-10 mb-24">
        <ul className="space-y-6">
          {PIECES.map((p) => (
            <li key={p.slug}>
              <Link
                href={p.slug}
                className="block rounded-2xl bg-[#efe7d8] border border-[#e2d5bb] px-7 py-7 md:px-10 md:py-9 transition-colors hover:bg-[#e8dec8]"
              >
                <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-stone-700">
                  {p.kicker} · {p.date}
                </p>
                <h2 className="mt-4 font-serif text-2xl md:text-[1.875rem] leading-[1.15] tracking-[-0.015em] font-semibold text-stone-950">
                  {p.title}
                </h2>
                <p className="mt-4 text-[1.0625rem] leading-[1.6] text-stone-700">
                  {p.summary}
                </p>
                <p className="mt-5 text-sm font-semibold text-stone-800">
                  Read the analysis →
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
