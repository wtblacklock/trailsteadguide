import { GuidePage } from '@/components/guide/GuidePage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Plan a Camping Trip — Trailstead Guide',
  description: 'A step-by-step walkthrough for planning a family camping trip from scratch.',
}

export default function Page() {
  return (
    <GuidePage
      slug="how-to-plan-a-camping-trip"
      eyebrow="Planning"
      title="How to Plan a Camping Trip"
      lede="A step-by-step planning walkthrough. Start 3 weeks out and you&apos;ll arrive calm instead of frazzled."
      heroImage={{
        src: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=1400&auto=format&fit=crop&q=80',
        alt: 'Map and planning notebook on a wooden table',
      }}
    >
      <h2>3 weeks out: pick the trip</h2>
      <ul>
        <li>Choose a weekend. Block it on the calendar like it&apos;s already paid for</li>
        <li>Pick 3 candidate campgrounds within 90 minutes</li>
        <li>Check availability on ReserveAmerica or the state park site</li>
        <li>Book the one that has bathrooms and a water spigot near the site</li>
      </ul>

      <h2>2 weeks out: inventory your gear</h2>
      <ul>
        <li>Lay everything out on the floor of the garage</li>
        <li>Pitch the tent. Look for missing poles, tears, leaks</li>
        <li>Light the stove. Check the fuel canister is not empty</li>
        <li>Make a list of everything you need to buy, borrow, or rent</li>
      </ul>

      <h2>1 week out: meals &amp; shopping</h2>
      <ul>
        <li>Write down every meal: Fri dinner, Sat breakfast, Sat lunch, Sat dinner, Sun breakfast</li>
        <li>Keep it simple. Don&apos;t plan anything that requires more than one pot</li>
        <li>Pre-chop vegetables at home and bag them</li>
        <li>Freeze water bottles — they become ice, then drinking water</li>
      </ul>

      <h2>The day before</h2>
      <ul>
        <li>Pack the car completely. Not partially. Completely.</li>
        <li>Charge phones, headlamps, and the portable battery</li>
        <li>Pull up driving directions and screenshot them (no signal at the campsite)</li>
        <li>Tell someone where you&apos;re going and when you&apos;ll be back</li>
      </ul>

      <h2>Morning of</h2>
      <ul>
        <li>Leave by 9am. Arrive by noon.</li>
        <li>Don&apos;t stop for a long lunch. Eat in the car or at a gas station.</li>
        <li>Grocery store run, if needed, goes on the way, not from the site.</li>
      </ul>

      <h2>When to stop planning</h2>
      <p>
        Over-planning is a real failure mode. Once you have a site booked, a gear list, a meal plan, and a packed car, you&apos;re done. The rest is execution — and execution is much easier once you&apos;re physically there.
      </p>
    </GuidePage>
  )
}
