import Link from 'next/link'

export default function ActivitiesHero() {
  return (
    <header className="max-w-page mx-auto px-8 pt-16 md:pt-24 pb-14 md:pb-20">
      <p className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-500 mb-6">
        The activities system
      </p>
      <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-stone-950 tracking-tight leading-[1.04] max-w-4xl">
        What to do at camp
        <span className="block text-stone-500">(without overthinking it).</span>
      </h1>
      <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl">
        Activities, games, and challenges built for real campsites. Filter by age, group size, and
        energy level — pick one and go.
      </p>
      <p className="mt-4 text-base text-stone-500 leading-relaxed max-w-2xl">
        The library covers exploration walks, classic campsite games, creative and craft activities, nighttime games, and nature-based challenges — all designed for families who don&apos;t want to rely on screens or equipment they don&apos;t already have. Each activity includes step-by-step instructions, suggested age ranges, and a time estimate so you can slot it into your day without planning ahead.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-6">
        <a
          href="#filter-bar"
          className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-6 py-3 text-sm"
        >
          Browse activities
        </a>
        <Link
          href="/quiz"
          className="inline-flex items-center justify-center text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors"
        >
          Plan your trip with the quiz →
        </Link>
      </div>
    </header>
  )
}
