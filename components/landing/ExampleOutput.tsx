import Image from 'next/image'

export default function ExampleOutput() {
  return (
    <section id="example" className="py-28 bg-stone-100">
      <div className="max-w-wide mx-auto px-6">

        <div className="max-w-content mx-auto mb-14">
          <p className="text-brand-green text-sm font-medium tracking-widest uppercase mb-4">
            Example plan
          </p>
          <h2 className="font-serif text-4xl font-semibold text-stone-900 mb-4">
            This is what you get.
          </h2>
          <p className="text-stone-600 text-lg leading-relaxed">
            A sample from the First Night Camp plan — built for a family with young kids on their first real campsite trip.
          </p>
        </div>

        {/* Plan preview card */}
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">

          {/* Plan hero image */}
          <div className="relative h-64 md:h-80">
            <Image
              src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1200&auto=format&fit=crop&q=80"
              alt="Family at a campsite in the evening light"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <p className="text-stone-300 text-sm mb-1">First Night Camp</p>
              <h3 className="font-serif text-3xl font-semibold text-white">
                Your First Night Camp Plan
              </h3>
            </div>
          </div>

          <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Timeline */}
            <div>
              <h4 className="font-serif text-lg font-medium text-stone-900 mb-5 pb-3 border-b border-stone-100">
                Trip Timeline
              </h4>
              <div className="space-y-4">
                {[
                  { time: 'Night before', event: 'Pack the car completely' },
                  { time: '9:00 AM', event: 'Depart — arrive by noon' },
                  { time: 'Arrival', event: 'Walk site, set up tent first' },
                  { time: '5:00 PM', event: 'Simple camp dinner' },
                  { time: '6:30 PM', event: "Campfire + s'mores" },
                  { time: '8:00 PM', event: 'Wind down + sleep' },
                  { time: '7:00 AM', event: 'Breakfast + morning walk' },
                  { time: '9:30 AM', event: 'Break camp, head home' },
                ].map((item) => (
                  <div key={item.time} className="flex gap-4">
                    <span className="text-stone-400 text-sm w-24 flex-shrink-0 pt-0.5">
                      {item.time}
                    </span>
                    <span className="text-stone-700">{item.event}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gear + Activities */}
            <div className="space-y-8">
              <div>
                <h4 className="font-serif text-lg font-medium text-stone-900 mb-5 pb-3 border-b border-stone-100">
                  Gear Essentials
                </h4>
                <ul className="space-y-2">
                  {['4-person family tent', 'Sleeping bags (temp-rated)', 'Sleeping pads', '2-burner stove + fuel', 'Headlamps × 4', 'Cooler + ice'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-serif text-lg font-medium text-stone-900 mb-5 pb-3 border-b border-stone-100">
                  Kid Activity Plan
                </h4>
                <ul className="space-y-2">
                  {['Rock and stick collection', 'Junior Ranger booklet', "S'mores by the fire", 'Morning walk + explore'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
