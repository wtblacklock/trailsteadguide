import Link from 'next/link'

export default function SkillsHero() {
  return (
    <header className="max-w-page mx-auto px-8 pt-16 md:pt-24 pb-14 md:pb-20">
      <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-6">
        The camp skills system
      </p>
      <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-stone-950 tracking-tight leading-[1.04] max-w-4xl">
        Camp skills made simple.
        <span className="block text-stone-500">Learn the essentials without overthinking it.</span>
      </h1>
      <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl">
        A practical, scouting-style library of camp skills for first-time campers. Filter by
        category, difficulty, or safety level — each skill is a short, scannable how-to with
        safety notes, common mistakes, and pro tips.
      </p>
      <p className="mt-4 text-base text-stone-500 leading-relaxed max-w-2xl">
        The library spans fire-starting, knots, shelter setup, navigation, cooking, safety, fishing, and stargazing — all written for beginners with no prior outdoor experience. Where a video or illustrated guide exists, it&apos;s embedded directly on the skill page so you don&apos;t have to search for it separately.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-6">
        <a
          href="#filter-bar"
          className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
        >
          Browse skills
        </a>
        <Link
          href="/quiz"
          className="inline-flex items-center justify-center text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors"
        >
          Not sure where to start? Take the quiz →
        </Link>
      </div>
    </header>
  )
}
