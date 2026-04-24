import Image from 'next/image'

export default function SolutionSection() {
  return (
    <section className="py-8 max-w-page mx-auto px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:items-end">
        {/* Large image — left 7 columns */}
        <div className="col-span-1 md:col-span-7 relative aspect-[4/3] rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=900&auto=format&fit=crop&q=80"
            alt="Parent and child reading a map together at a campsite"
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Text — right 4 columns, aligned to bottom */}
        <div className="col-span-1 md:col-span-4 md:col-start-9 pb-4 md:pb-4">
          <h2 className="font-serif text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-6">
            A decision system, not a blog post.
          </h2>
          <div className="space-y-4 text-stone-500 leading-relaxed">
            <p>Trailstead asks you a few questions about your family and builds a complete plan around your answers.</p>
            <p>Trip timeline, gear checklist, kid activity plan, and safety guidance — all calibrated to exactly where your family is right now.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
