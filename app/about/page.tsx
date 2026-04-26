import Link from 'next/link'
import { pageMetadata, SITE_URL } from '@/lib/seo'
import Breadcrumbs from '@/components/seo/Breadcrumbs'

export const metadata = pageMetadata({
  title: 'About',
  description:
    'Trailstead Guide is a structured camping planner for first-time families. Built around four scenario plans and a quiz that scales them to your trip.',
  path: '/about',
})

export default function Page() {
  return (
    <main>
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
