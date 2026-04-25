import Link from 'next/link'

export default function ActivitiesHero() {
  return (
    <section className="bg-[#F5F3EE]">
      <div className="max-w-content mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
        <p className="text-xs uppercase tracking-widest text-[#2d5016] font-medium mb-5">
          The activities system
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-stone-900 tracking-tight leading-[1.1] mb-5">
          What to do at camp
          <span className="block text-stone-500">(without overthinking it).</span>
        </h1>
        <p className="text-lg text-stone-600 leading-relaxed mb-8 max-w-prose">
          Activities, games, and challenges built for real campsites. Filter by age, group size, and
          energy level — pick one and go.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#filter-bar"
            className="inline-flex items-center justify-center gap-2 bg-stone-900 text-white text-base font-medium rounded-md hover:bg-stone-800 transition-colors px-6 py-3"
          >
            Browse activities
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </a>
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center gap-2 border border-stone-300 text-stone-700 bg-white text-base font-medium rounded-md hover:bg-stone-50 transition-colors px-6 py-3"
          >
            Plan your trip
          </Link>
        </div>
      </div>
    </section>
  )
}
