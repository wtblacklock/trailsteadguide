import Link from 'next/link'
import {
  pageMetadata,
  SITE_URL,
  personNode,
  organizationNode,
  AUTHOR_NAME,
  AUTHOR_JOB_TITLE,
  AUTHOR_BIO,
  AUTHOR_KNOWS_ABOUT,
} from '@/lib/seo'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import JsonLd from '@/components/seo/JsonLd'

export const metadata = pageMetadata({
  title: 'About',
  description:
    'Meet Will Blacklock — Eagle Scout and founder of Trailstead Guide, a structured camping planner that turns five questions into a confident first family trip.',
  path: '/about',
})

const ABOUT_PERSON_GRAPH = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationNode,
    {
      ...personNode,
      mainEntityOfPage: `${SITE_URL}/about`,
    },
  ],
}

export default function Page() {
  return (
    <main>
      <JsonLd data={ABOUT_PERSON_GRAPH} />
      <Breadcrumbs
        emitSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'About', url: `${SITE_URL}/about` },
        ]}
      />
      <header className="max-w-page mx-auto px-8 pt-16 md:pt-24 pb-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-500 mb-4">About</p>
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-stone-950 tracking-tight leading-tight max-w-4xl">
          A structured camping planner.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl">
          Trailstead Guide turns five questions into a complete first-trip plan: timeline, gear, meals, kid activities, and safety notes — built around four scenario templates.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
          >
            Start Planning
          </Link>
          <Link
            href="/guides"
            className="inline-flex items-center justify-center rounded-md font-medium bg-transparent text-stone-900 ring-1 ring-stone-300 hover:bg-stone-100 transition-colors px-6 py-3 text-sm"
          >
            Read the guides
          </Link>
        </div>
      </header>

      <section className="max-w-page mx-auto px-8 pb-16">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight mb-6">
            What we do
          </h2>
          <div className="space-y-6 text-stone-700 leading-relaxed text-lg">
            <p>
              We build structured camping plans. Five questions in, you get a complete trip: hour-by-hour timeline, gear list, meal plan, shopping list scaled to your party size, age-appropriate kid activity plan, and safety notes.
            </p>
            <p>
              Plans are templates, not fantasies. They map to four pacing archetypes — backyard test, first night, first weekend, easy basecamp — and adjust to your family rather than the other way around.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-page mx-auto px-8 pb-16">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight mb-6">
            What we don&apos;t do
          </h2>
          <ul className="space-y-3 text-stone-700 leading-relaxed text-lg list-none">
            <li>Review 14 tents to tell you to pick one.</li>
            <li>Use inspirational photography as a substitute for a plan.</li>
            <li>Pretend camping is easy the first time, or hard once you have a plan.</li>
            <li>Sell anything we wouldn&apos;t buy ourselves.</li>
          </ul>
        </div>
      </section>

      <section className="max-w-page mx-auto px-8 pb-16">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight mb-6">
            Why this exists
          </h2>
          <div className="space-y-6 text-stone-700 leading-relaxed text-lg">
            <p>
              First-time camping is overloaded with conflicting advice, unnecessary gear lists, and unclear starting points. The information exists; the structure doesn&apos;t. A stack of blog posts is not a plan.
            </p>
            <p>
              Trailstead Guide is the missing structure: a short planner that hands you a complete weekend instead of a reading list, plus four ready-made plans you can run as-is.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-page mx-auto px-8 pb-16">
        <div className="max-w-3xl rounded-2xl bg-amber-50/60 ring-1 ring-amber-100 p-8 md:p-12">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">
            About the founder
          </p>
          <div className="flex flex-col md:flex-row gap-8 md:items-start">
            <div className="flex-shrink-0">
              <div
                className="h-32 w-32 md:h-40 md:w-40 rounded-2xl bg-stone-200 ring-1 ring-stone-300"
                aria-hidden="true"
              />
            </div>
            <div className="flex-1">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight mb-2">
                {AUTHOR_NAME}
              </h2>
              <p className="text-sm font-medium text-stone-500 mb-5">
                {AUTHOR_JOB_TITLE}
              </p>
              <div className="space-y-4 text-stone-700 leading-relaxed text-lg">
                <p>
                  I earned my Eagle Scout at 13 — rare; most Scouts hit it at 16 or 17 — and have spent the years since paying it forward as a Cub Master, Scout Master, and Wood Badge Antelope.
                </p>
                <p>
                  As part of my Wood Badge ticket, I founded <strong>ScoutNerd</strong>, a site that reviewed apps and workflows to help Scouting leaders run better troops. A Philmont alum from a 12-day backcountry expedition in New Mexico, I now camp regularly with my three outdoor-active kids out of Austin, Texas.
                </p>
                <p>
                  Trailstead Guide started as the planning system I wished I had as a young dad: structured, beginner-aware, and built to make the first trip work.
                </p>
                <p className="text-stone-600">
                  The promise: read less, plan once, sleep outside.
                </p>
              </div>
              <p className="mt-6 text-sm text-stone-500">
                Knows about: {AUTHOR_KNOWS_ABOUT.join(' · ')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-page mx-auto px-8 pb-24">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight mb-6">
            How we make money
          </h2>
          <div className="space-y-6 text-stone-700 leading-relaxed text-lg">
            <p>
              The plans, guides, and quiz are free. We earn an Amazon Associate commission when you buy gear through links on our gear pages, and we sell printable Trip Pack PDFs of each plan. Both fund the writing; neither changes what we recommend.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
