import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1600&auto=format&fit=crop&q=80"
          alt="Family camping in a forest clearing at golden hour"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/40 to-stone-900/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-content mx-auto px-6 py-32">
        <div className="max-w-2xl">
          <p className="text-stone-300 text-sm font-medium tracking-widest uppercase mb-6">
            For first-time families
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-white leading-tight mb-6">
            Your first camping trip,
            <br />
            planned in 10 minutes.
          </h1>
          <p className="text-stone-200 text-xl leading-relaxed mb-10 max-w-lg">
            Answer a few questions. Get a personalized plan — trip timeline, gear checklist, kid activities, and safety guidance. Built for families who have never done this before.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors duration-150 bg-stone-900 text-white hover:bg-stone-800 px-8 py-4 text-lg"
            >
              Start Your Trailstead Plan
            </Link>
            <a
              href="#example"
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors duration-150 border border-white/30 text-white bg-white/10 hover:bg-white/20 px-8 py-4 text-lg"
            >
              See Example Plan
            </a>
          </div>

          <p className="text-stone-400 text-sm mt-6">
            Free · No account required · Takes about 2 minutes
          </p>
        </div>
      </div>
    </section>
  )
}
