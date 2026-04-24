import { GuidePage } from '@/components/guide/GuidePage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Camping for Beginners — Trailstead Guide',
  description: 'A real, grown-up guide to your first camping trip. No gear worship, no backcountry talk — just what families actually need to know.',
}

export default function Page() {
  return (
    <GuidePage
      slug="camping-for-beginners"
      eyebrow="Start here"
      title="Camping for Beginners"
      lede="If you&apos;ve never camped, start here. This is the shortest, least-intimidating path from zero to a great first trip."
      heroImage={{
        src: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=1400&auto=format&fit=crop&q=80',
        alt: 'Tent pitched in a forest clearing at golden hour',
      }}
    >
      <h2>The mindset shift</h2>
      <p>
        Most people overthink their first camping trip. They research tents for three weekends and then never book a site. The truth: your first trip should be <strong>small, close to home, and easy to bail on.</strong> Everything else follows.
      </p>

      <h2>What &quot;camping&quot; actually means for beginners</h2>
      <p>
        There are many kinds of camping. You want <strong>car camping</strong> at an established campground — you drive to a numbered site, park next to it, and pitch a tent. It has bathrooms, running water, and other humans within shouting distance. This is the only kind of camping we&apos;ll talk about here.
      </p>

      <h2>Pick the right first trip</h2>
      <ul>
        <li>One night, not two or three</li>
        <li>Within 90 minutes of home</li>
        <li>A state park or established public campground, not a remote BLM site</li>
        <li>A weekend with a mild, dry forecast — cheat on the weather</li>
      </ul>

      <h2>Gear: borrow, don&apos;t buy</h2>
      <p>
        You don&apos;t know what you actually like yet. Borrow a tent and sleeping bags from a friend. Rent the rest from REI or a local outfitter. After your first trip, you&apos;ll know what&apos;s worth buying.
      </p>

      <h2>The three things that will go wrong</h2>
      <ul>
        <li><strong>You&apos;ll be cold at night.</strong> Overpack warm layers. Sleep in long underwear + a beanie.</li>
        <li><strong>Setup will take longer than you think.</strong> Arrive by 3pm. Not 5pm. Not &quot;after dinner.&quot;</li>
        <li><strong>You&apos;ll forget something.</strong> It&apos;s fine. The camp store and the neighbors exist.</li>
      </ul>

      <h2>What to do when you get there</h2>
      <ul>
        <li>Walk the site with your family. Pick a flat spot for the tent</li>
        <li>Set up the tent first, before you do anything else</li>
        <li>Unpack the kitchen second</li>
        <li>Start dinner prep before it gets dark — you can&apos;t cook by headlamp the first time</li>
        <li>Build the fire after dinner, not before</li>
      </ul>

      <p>
        That&apos;s it. Camping is not complicated. It&apos;s just unfamiliar — and a structured plan removes 90% of the unfamiliarity.
      </p>
    </GuidePage>
  )
}
