import Link from 'next/link'

export default function SkillsHero() {
  return (
    <section className="bg-[#F5F3EE]">
      <div className="max-w-content mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
        <p className="text-xs uppercase tracking-widest text-[#2d5016] font-medium mb-5">
          The camp skills system
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-stone-900 tracking-tight leading-[1.1] mb-5">
          Camp skills made simple.
          <span className="block text-stone-500">Learn the essentials without overthinking it.</span>
        </h1>
        <p className="text-lg text-stone-600 leading-relaxed mb-8 max-w-prose">
          Twelve categories of practical, scouting-style skills for first-time campers. Each one is
          a short, scannable how-to with safety notes, common mistakes, and pro tips — built for
          families who want to do it right, not just read about it.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#categories"
            className="inline-flex items-center justify-center gap-2 bg-stone-900 text-white text-base font-medium rounded-md hover:bg-stone-800 transition-colors px-6 py-3"
          >
            Browse skills
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
            Start your camping plan
          </Link>
        </div>
      </div>
    </section>
  )
}
