import Image from 'next/image'
import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section className="pb-16 max-w-page mx-auto px-8">
      <div className="relative bg-stone-900 rounded-3xl overflow-hidden min-h-[480px] flex items-end">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1478827536114-da961b7f86d2?w=1400&auto=format&fit=crop&q=80"
          alt="Family camping under a starlit sky"
          fill
          className="object-cover opacity-40"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 p-10 md:p-16 w-full items-end">
          <div className="col-span-1 md:col-span-7">
            <h2 className="font-serif text-5xl md:text-6xl font-semibold text-white tracking-tight leading-tight mb-8">
              Your first camping trip starts here.
            </h2>
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-md font-medium bg-white text-stone-900 hover:bg-stone-100 transition-colors px-8 py-4 text-base"
            >
              Start Your Trailstead Plan
            </Link>
          </div>
          <div className="col-span-1 md:col-span-4 md:col-start-9 flex items-end pb-1">
            <p className="text-stone-400 leading-relaxed">
              Answer 5 questions. Get a complete trip plan — timeline, gear list, kid activities, and safety guidance. About 2 minutes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
