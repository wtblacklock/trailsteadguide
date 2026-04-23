import Image from 'next/image'

export default function SolutionSection() {
  return (
    <section className="py-28 bg-stone-50">
      <div className="max-w-wide mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=900&auto=format&fit=crop&q=80"
              alt="Parent and child reading a map together at a campsite"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-brand-green text-sm font-medium tracking-widest uppercase mb-4">
              The Trailstead approach
            </p>
            <h2 className="font-serif text-4xl font-semibold text-stone-900 mb-6">
              A decision system, not a blog post.
            </h2>
            <div className="space-y-5 text-stone-600 text-lg leading-relaxed">
              <p>
                Trailstead Guide asks you a few questions about your family — experience level, kids&apos; ages, what kind of trip you want — and builds a complete plan around your answers.
              </p>
              <p>
                You get a step-by-step trip timeline, a short gear checklist, a kid activity plan, and safety guidance. All of it calibrated to exactly where your family is right now.
              </p>
              <p>
                Not where you&apos;ll be someday. Not what experts recommend. Where you are now.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
