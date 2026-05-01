import Image from 'next/image'

export default function WhyTrailstead() {
  return (
    <section data-reveal className="py-16 md:py-32 max-w-page mx-auto px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center">
        <div className="col-span-1 md:col-span-5">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-stone-950 tracking-tight leading-tight">
            Built to remove first-time camping confusion.
          </h2>
        </div>
        <div className="col-span-1 md:col-span-6 md:col-start-7 space-y-6 text-stone-600 text-lg leading-relaxed">
          <p>
            First-time camping is overloaded with conflicting advice, unnecessary gear lists, and unclear starting points.
          </p>
          <p>
            Trailstead simplifies everything into structured, scenario-based plans so you know exactly what to do, what to bring, and what to expect.
          </p>
        </div>
      </div>

      <div className="relative w-full aspect-[21/9] mt-12 md:mt-16 rounded-2xl overflow-hidden bg-stone-100">
        <Image
          src="https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=1600&auto=format&fit=crop&q=80"
          alt="Parent and child reading a map together at a campsite"
          fill
          sizes="(max-width: 1024px) 100vw, 1440px"
          loading="lazy"
          unoptimized
          className="object-cover"
        />
      </div>
    </section>
  )
}
