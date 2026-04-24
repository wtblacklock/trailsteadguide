import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section>
      {/* Upper: open cream space with large serif headline offset to right */}
      <div className="max-w-page mx-auto px-8 pt-24 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left col: small label anchored bottom */}
          <div className="hidden md:flex md:col-span-4 items-end pb-2">
            <p className="text-stone-400 text-sm">For first-time families</p>
          </div>
          {/* Right col: big headline + CTA */}
          <div className="col-span-1 md:col-span-8">
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-semibold text-stone-950 tracking-tight leading-[1.05] mb-10">
              Your family&apos;s first camping trip, planned in 10 minutes.
            </h1>
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
