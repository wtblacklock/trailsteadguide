import Image from 'next/image'

export default function ExampleOutput() {
  return (
    <section id="example" data-reveal className="py-8 max-w-page mx-auto px-8 scroll-mt-24 md:scroll-mt-32">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10 md:mb-12">
        <div className="col-span-1 md:col-span-5">
          <h2 className="font-serif text-5xl font-semibold text-stone-950 tracking-tight">
            This is what you get.
          </h2>
        </div>
        <div className="col-span-1 md:col-span-4 md:col-start-7 flex items-end">
          <p className="text-stone-500 text-lg leading-relaxed">
            A sample from the First Night Camp plan — built for a family with young kids on their first real campsite trip.
          </p>
        </div>
      </div>

      {/* Plan card — dark, rounded, like an Anthropic feature card */}
      <div className="bg-stone-900 rounded-3xl overflow-hidden">
        {/* Image */}
        <div className="relative h-72 md:h-96">
          <Image
            src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&auto=format&fit=crop&q=80"
            alt="Family at a campsite in the evening light"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12">
            <p className="text-stone-400 text-sm mb-1">First Night Camp</p>
            <h3 className="font-serif text-3xl font-semibold text-white">Your First Night Camp Plan</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Timeline */}
          <div>
            <h4 className="text-stone-400 text-xs uppercase tracking-widest mb-6">Trip Timeline</h4>
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
                <div key={item.time} className="flex gap-4 border-t border-stone-800 pt-4">
                  <span className="text-stone-500 text-sm w-24 flex-shrink-0">{item.time}</span>
                  <span className="text-stone-200">{item.event}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gear + Activities */}
          <div className="space-y-10">
            <div>
              <h4 className="text-stone-400 text-xs uppercase tracking-widest mb-6">Gear Essentials</h4>
              <ul className="space-y-3">
                {['4-person family tent', 'Sleeping bags (temp-rated)', 'Sleeping pads', '2-burner stove + fuel', 'Headlamps × 4', 'Cooler + ice'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-stone-300 border-t border-stone-800 pt-3">
                    <span className="w-1 h-1 rounded-full bg-stone-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-stone-400 text-xs uppercase tracking-widest mb-6">Kid Activity Plan</h4>
              <ul className="space-y-3">
                {['Rock and stick collection', 'Junior Ranger booklet', "S'mores by the fire", 'Morning walk + explore'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-stone-300 border-t border-stone-800 pt-3">
                    <span className="w-1 h-1 rounded-full bg-stone-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Meal plan preview — truncated */}
        <div className="px-8 md:px-12 pb-8 md:pb-12">
          <div className="border-t border-stone-800 pt-8 md:pt-10 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-stone-400 text-xs uppercase tracking-widest mb-6">Meal Plan (2 adults · 2 kids)</h4>
              <ul className="space-y-4">
                {[
                  { slot: 'Fri dinner', title: 'Foil-packet dinner', note: 'Ground beef, potatoes, peppers over fire' },
                  { slot: 'Sat breakfast', title: 'Eggs, bacon, toast', note: 'On the 2-burner stove' },
                  { slot: 'Sat snacks', title: "Trail mix + s'mores bin", note: 'Keep it accessible, reduce meltdowns' },
                ].map((m) => (
                  <li key={m.slot} className="border-t border-stone-800 pt-3">
                    <div className="flex items-baseline justify-between gap-4 mb-0.5">
                      <span className="text-stone-200 font-medium">{m.title}</span>
                      <span className="text-stone-500 text-xs uppercase tracking-wider">{m.slot}</span>
                    </div>
                    <p className="text-stone-400 text-sm">{m.note}</p>
                  </li>
                ))}
                <li className="text-stone-500 text-sm italic pt-2">+ Sunday breakfast &amp; full shopping list in your plan</li>
              </ul>
            </div>
            <div>
              <h4 className="text-stone-400 text-xs uppercase tracking-widest mb-6">Shopping List Preview</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Ground beef', qty: '1 × 1 lb pack' },
                  { name: 'Eggs', qty: '1 dozen' },
                  { name: 'Bacon', qty: '1 × 1 lb pack' },
                  { name: 'Baby potatoes', qty: '2 × 1.5 lb bag' },
                  { name: 'Granola bars', qty: '2 × 6-pack box' },
                  { name: 'Water', qty: '2 gallons' },
                ].map((item) => (
                  <li key={item.name} className="flex items-baseline justify-between gap-4 text-stone-300 border-t border-stone-800 pt-3">
                    <span>{item.name}</span>
                    <span className="text-stone-500 text-sm tabular-nums">{item.qty}</span>
                  </li>
                ))}
                <li className="text-stone-500 text-sm italic pt-2">Scales automatically to your party size.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
