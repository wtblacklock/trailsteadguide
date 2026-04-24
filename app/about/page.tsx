import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Trailstead Guide',
  description: 'Trailstead Guide is a structured camping system for families who want a plan, not a hobby.',
}

export default function Page() {
  return (
    <main>
      <header className="max-w-page mx-auto px-8 pt-16 md:pt-24 pb-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-500 mb-4">About</p>
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-stone-950 tracking-tight leading-tight max-w-4xl">
          A plan, not a hobby.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl">
          Trailstead Guide is built for families who want to get outside a few times a year — without turning camping into another thing to master.
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

      <section className="max-w-page mx-auto px-8 mb-16">
        <div className="relative aspect-[16/9] md:aspect-[21/9] max-w-5xl rounded-2xl overflow-hidden bg-stone-100">
          <Image
            src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1400&auto=format&fit=crop&q=80"
            alt="Family gathered around a campsite in the evening light"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </section>

      <section className="max-w-page mx-auto px-8 pb-16">
        <div className="max-w-3xl space-y-6 text-stone-700 leading-relaxed text-lg">
          <p>
            Most camping content on the internet is made for people who already camp. It assumes you care about the difference between dyneema and silnylon, or that your weekend revolves around a headlamp comparison.
          </p>
          <p>
            Trailstead Guide is for a different audience: <strong>parents who want their kids to grow up knowing what a fire smells like</strong> but don&apos;t have time to curate a gear closet, read fifteen tent reviews, or learn the difference between &ldquo;basecamp&rdquo; and &ldquo;bushcraft.&rdquo;
          </p>
        </div>
      </section>

      <section className="max-w-page mx-auto px-8 pb-16">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight mb-6">
            What we do
          </h2>
          <div className="space-y-6 text-stone-700 leading-relaxed text-lg">
            <p>
              We build structured camping plans. You answer 5 questions and we produce the complete trip: hour-by-hour timeline, gear list, meal plan, shopping list scaled to your party size, age-appropriate kid activity plan, and safety notes.
            </p>
            <p>
              Plans are templates, not fantasies. They&apos;re built around four pacing archetypes — a backyard test, a first night, a first weekend, and an easy basecamp — and they adjust to your family, not the other way around.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-page mx-auto px-8 pb-16">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight mb-6">
            What we don&apos;t do
          </h2>
          <ul className="space-y-4 text-stone-700 leading-relaxed text-lg">
            <li>Review 14 tents to tell you to pick one</li>
            <li>Use inspirational photography as a substitute for a plan</li>
            <li>Pretend camping is easy the first time (it isn&apos;t)</li>
            <li>Pretend camping is hard (it isn&apos;t, with a plan)</li>
          </ul>
        </div>
      </section>

      <section className="max-w-page mx-auto px-8 pb-16">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight mb-6">
            Why we built this
          </h2>
          <div className="space-y-6 text-stone-700 leading-relaxed text-lg">
            <p>
              We kept watching first-time families go through the same loop: research gear for three weekends, never book a site, lose the momentum, give up. The problem wasn&apos;t information — there&apos;s plenty of it. The problem was <strong>structure.</strong> A stack of blog posts is not a plan.
            </p>
            <p>
              So we built the thing that would have saved us on our own first trips: a short, honest planner that hands you a complete weekend — not a reading list.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-page mx-auto px-8 pb-24">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-950 tracking-tight mb-6">
            Who&apos;s behind this
          </h2>
          <div className="space-y-6 text-stone-700 leading-relaxed text-lg">
            <p>
              Trailstead Guide is built by a small team of parents who have camped with their own kids — badly, then better. We&apos;ve made every mistake in the mistakes guide and several that didn&apos;t make the list.
            </p>
            <p>
              If you have feedback, stories, or gear we should look at, we&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
