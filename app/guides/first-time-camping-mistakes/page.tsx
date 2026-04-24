import { GuidePage } from '@/components/guide/GuidePage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'First-Time Camping Mistakes — Trailstead Guide',
  description: 'The 12 avoidable mistakes that ruin most first family camping trips — and how to dodge them.',
}

export default function Page() {
  return (
    <GuidePage
      slug="first-time-camping-mistakes"
      eyebrow="Mistakes"
      title="First-Time Camping Mistakes"
      lede="We&apos;ve watched a lot of first trips go sideways. Here are the 12 most common, most avoidable mistakes — and what to do instead."
      heroImage={{
        src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&auto=format&fit=crop&q=80',
        alt: 'Campsite at dusk with a tent lit from inside — the classic late-arrival scramble',
      }}
    >
      <h2>1. Arriving after dark</h2>
      <p>
        Setting up a tent in a headlamp beam while hungry kids cry in the car is a uniquely American horror. <strong>Arrive by 3pm.</strong> That means leaving in the morning.
      </p>

      <h2>2. Not testing gear at home first</h2>
      <p>
        That tent you bought two years ago at a Costco sale? Pitch it in the backyard. Pole might be snapped. Rainfly might be missing. You want to learn this in your driveway, not at dusk in the woods.
      </p>

      <h2>3. Overpacking</h2>
      <p>
        More gear ≠ more comfortable. It means more time setting up, more time breaking down, more stuff getting wet, more stuff getting lost.
      </p>

      <h2>4. Underpacking warm layers</h2>
      <p>
        Nights are 15–20°F colder than the daytime high. Everyone brings a fleece and a beanie. Everyone.
      </p>

      <h2>5. Booking too far from home</h2>
      <p>
        First trip? Under 90 minutes. Bail-outs need to be easy. Save the dramatic scenery for trip four.
      </p>

      <h2>6. Booking two nights</h2>
      <p>
        One night for the first trip. You learn what works, what doesn&apos;t, and you get to go home. Two nights when something&apos;s going wrong is a punishment.
      </p>

      <h2>7. Complicated meals</h2>
      <p>
        Skip the cast-iron dutch oven bread. Eat hot dogs, pasta, foil-packet dinners. Your job at camp is not to plate food — it&apos;s to feed people before they melt down.
      </p>

      <h2>8. Ignoring the weather</h2>
      <p>
        First trip: wait for a dry, mild forecast. Camping in the rain is a skill; first trips are not where you build it.
      </p>

      <h2>9. No plan for kids</h2>
      <p>
        &quot;They&apos;ll just play&quot; is a myth at unfamiliar campsites. Bring activities. Plan three per day.
      </p>

      <h2>10. Forgetting the boring essentials</h2>
      <p>
        Trash bags. Toilet paper. Lighter. Dish soap. These are the things you&apos;ll drive an hour back into town for.
      </p>

      <h2>11. Unpacking everything immediately</h2>
      <p>
        Set up the tent. Set up sleep. Then cook dinner. The rest can stay in the car. You don&apos;t need the spice rack deployed.
      </p>

      <h2>12. Planning it all yourself from scratch</h2>
      <p>
        This is the mistake that causes the other eleven. The details are solved — campsite distance, gear list, meal plan, kid activities, weather-aware layers. <strong>Use a template.</strong> Edit it to fit your family. Go.
      </p>
    </GuidePage>
  )
}
