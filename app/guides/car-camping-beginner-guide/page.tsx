import { GuidePage } from '@/components/guide/GuidePage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Car Camping Beginner Guide — Trailstead Guide',
  description: 'Car camping is the easiest way to start. Here is everything that makes it different — and better — than other kinds of camping.',
}

export default function Page() {
  return (
    <GuidePage
      slug="car-camping-beginner-guide"
      eyebrow="Car camping"
      title="The Car Camping Beginner Guide"
      lede="Car camping is the fastest on-ramp to the outdoors. Here&apos;s what it is, why it&apos;s the right choice for your first trip, and how to do it well."
      heroImage={{
        src: 'https://images.unsplash.com/photo-1519443933981-c665c4a62ad4?w=1400&auto=format&fit=crop&q=80',
        alt: 'An SUV with a roof-top tent set up at a campsite',
      }}
    >
      <h2>What is car camping?</h2>
      <p>
        Car camping means you drive your car to a numbered campsite and pitch a tent next to it. You do not hike in. You do not carry your gear. Your stuff stays in the car. This is camping with training wheels — which is exactly what you want for your first trip.
      </p>

      <h2>Why it&apos;s the right first trip</h2>
      <ul>
        <li><strong>Weight doesn&apos;t matter.</strong> Bring the heavy cooler, the big tent, the real pillows</li>
        <li><strong>The car is your shelter-of-last-resort.</strong> Rainstorm, kid meltdown, bear scare — you sleep in the car.</li>
        <li><strong>It&apos;s forgiving.</strong> Forgot something? You drive into town.</li>
        <li><strong>It&apos;s near bathrooms.</strong> This is a bigger deal than you realize.</li>
      </ul>

      <h2>What makes a good car camping site</h2>
      <ul>
        <li>Level, dry ground for the tent</li>
        <li>A picnic table and a fire ring — almost every established site has both</li>
        <li>Potable water within a short walk</li>
        <li>Bathroom with actual toilets (not a pit latrine) for your first trip</li>
        <li>Shade for the hot part of the day</li>
      </ul>

      <h2>Gear you can get away with</h2>
      <p>
        Because you don&apos;t have to carry it, car camping lets you bring real furniture-like items. This matters more than you&apos;d think:
      </p>
      <ul>
        <li>Camp chairs with a cupholder and a footrest</li>
        <li>A full-size cooler, not a tiny backpacking one</li>
        <li>A queen-size air mattress (optional, but the upgrade is real)</li>
        <li>A full-size pillow</li>
        <li>A proper 2-burner stove, not a little canister stove</li>
      </ul>

      <h2>Logistics that will save you</h2>
      <ul>
        <li>Reserve your site 3–6 weeks ahead; summer weekends fill up fast</li>
        <li>Ask for a site far from the bathroom block (foot traffic, smell, light)</li>
        <li>Arrive during daylight. Always.</li>
        <li>Back the car into the site — so the trunk opens toward your living area</li>
      </ul>

      <p>
        Once you&apos;ve done a car camping trip or two, you&apos;ll know whether you want to go further (backpacking, primitive sites, overlanding). But everyone starts here. It&apos;s the easiest, lowest-risk, highest-fun-per-effort way to be outside with your family.
      </p>
    </GuidePage>
  )
}
