import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section>
      {/* Upper: open cream space with large serif headline left-aligned */}
      <div className="max-w-page mx-auto px-8 pt-14 md:pt-24 pb-10 md:pb-16">
<div className="max-w-4xl">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-stone-950 tracking-tight leading-[1.08] mb-5 md:mb-6">
              Plan your first family camping trip in 10 minutes.
            </h1>
            <p className="text-stone-500 text-lg md:text-xl leading-relaxed mb-8 md:mb-10 max-w-2xl">
              A step-by-step system for first-time campers. Know exactly what to bring, what to do, and what to expect.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center rounded-md font-medium bg-stone-900 text-white hover:bg-stone-800 transition-colors px-8 py-4 text-base"
              >
                Start Your Trailstead Plan
              </Link>
              <a href="#example" className="text-base text-stone-500 hover:text-stone-700 transition-colors underline underline-offset-4">
                See example plan
              </a>
            </div>
            <p className="text-stone-400 text-sm mt-6">Free · No account required · About 2 minutes</p>
        </div>
      </div>

      {/* Lower: full-width rounded image card */}
      <div className="max-w-page mx-auto px-8 pb-8">
        <div className="relative h-[55vh] min-h-[420px] rounded-3xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1600&auto=format&fit=crop&q=80"
            alt="Family camping in a forest clearing at golden hour"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  )
}
