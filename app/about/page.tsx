import Image from 'next/image'
import Link from 'next/link'
import {
  pageMetadata,
  SITE_URL,
  personNode,
  organizationNode,
  AUTHOR_NAME,
  AUTHOR_JOB_TITLE,
  AUTHOR_IMAGE,
  AUTHOR_INSTAGRAM,
  AUTHOR_KNOWS_ABOUT,
} from '@/lib/seo'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import JsonLd from '@/components/seo/JsonLd'
import FaqSection from '@/components/site/FaqSection'

// Avatar initials shown behind the portrait — surface gracefully if the
// `<Image>` source ever 404s. The user will swap the photo asset later.
const AUTHOR_INITIALS = AUTHOR_NAME.split(' ')
  .map((part) => part[0])
  .filter(Boolean)
  .join('')

export const metadata = pageMetadata({
  title: 'About',
  description:
    'Meet William Blacklock — Eagle Scout and founder of Trailstead Guide, a structured camping planner that turns six questions into a confident first family trip.',
  path: '/about',
})

const ABOUT_FAQ_ITEMS = [
  {
    question: 'Who built Trailstead Guide?',
    answer:
      'William Blacklock — Eagle Scout (earned at 13), former Cub Master and Scout Master, Wood Badge Antelope, Philmont alum, and dad of three outdoor-active kids based in Austin, Texas. Trailstead Guide is the planning system he wished he had as a young dad.',
  },
  {
    question: 'Is Trailstead Guide affiliated with the Boy Scouts of America?',
    answer:
      'No. Trailstead Guide is independent and not affiliated with, endorsed by, or sponsored by the Boy Scouts of America or Scouting America. The methodology — structured plans, age-appropriate progression, repeatable routines — draws on William’s scouting background, but BSA is not a partner.',
  },
  {
    question: 'Where do the recommendations come from?',
    answer:
      'A blend of personal experience camping with our own families, careful reading of camping subreddits and first-trip post-mortems, and outdoor industry standards from organizations like Leave No Trace. Plans are templates we’ve actually run, not theoretical advice.',
  },
  {
    question: 'Are gear links affiliate links?',
    answer:
      'Yes, transparently. Some gear links are Amazon Associate links that pay Trailstead a small commission if you buy through them. Your price is identical either way, and we only recommend gear we’ve used with our own families.',
  },
  {
    question: 'How is this different from other camping sites?',
    answer:
      'Most camping sites are blog posts you have to assemble yourself. Trailstead Guide hands you a complete trip — timeline, gear, meals, kid activities, safety — built around four pacing archetypes for first-time families. Read less, plan once, sleep outside.',
  },
  {
    question: 'Can I work with William or get in touch?',
    answer:
      'Yes — the easiest way is Instagram (@wtblacklock) or the contact page. For partnerships, guide writing, or feedback on the planner, the contact form goes straight to the inbox.',
  },
]

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
          Trailstead Guide turns six questions into a complete first-trip plan: timeline, gear, meals, kid activities, and safety notes — built around four scenario templates.
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
              We build structured camping plans. Six questions in, you get a complete trip: hour-by-hour timeline, gear list, meal plan, shopping list scaled to your party size, age-appropriate kid activity plan, and safety notes.
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

      <section id="author" className="max-w-page mx-auto px-8 pb-16 scroll-mt-24">
        <div className="max-w-3xl rounded-2xl bg-amber-50/60 ring-1 ring-amber-100 p-8 md:p-12">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-4">
            About the founder
          </p>
          <div className="flex flex-col md:flex-row gap-8 md:items-start">
            <div className="flex-shrink-0">
              {/*
                Portrait slot. AUTHOR_IMAGE points at /images/author-william-blacklock.jpg —
                the user will swap the actual photo file in later. The initials sit
                underneath the <Image> so a missing/404 source surfaces "WB" on stone-200
                instead of a broken-image icon.
              */}
              <div
                className="relative h-32 w-32 md:h-40 md:w-40 rounded-2xl bg-stone-200 ring-1 ring-stone-300 overflow-hidden flex items-center justify-center"
                aria-hidden="true"
              >
                <span className="font-serif text-3xl md:text-4xl font-semibold text-stone-500 select-none">
                  {AUTHOR_INITIALS}
                </span>
                <Image
                  src={AUTHOR_IMAGE}
                  alt={`${AUTHOR_NAME} portrait`}
                  fill
                  sizes="(max-width: 768px) 128px, 160px"
                  className="object-cover"
                />
              </div>
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
              <p className="mt-3 text-sm text-stone-500">
                Follow along:{' '}
                <a
                  href={AUTHOR_INSTAGRAM}
                  rel="me noopener"
                  target="_blank"
                  className="text-stone-700 hover:text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors"
                >
                  @wtblacklock on Instagram
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-page mx-auto px-8 pb-16">
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

      <FaqSection items={ABOUT_FAQ_ITEMS} />
    </main>
  )
}
