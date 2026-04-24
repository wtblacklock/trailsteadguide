import { GuidePage } from '@/components/guide/GuidePage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'First Camping Trip Checklist — Trailstead Guide',
  description: 'The one-page checklist for your first family camping trip. Everything to pack, book, and plan.',
}

export default function Page() {
  return (
    <GuidePage
      slug="first-camping-trip-checklist"
      eyebrow="Checklist"
      title="The First Camping Trip Checklist"
      lede="One page. Everything you actually need to book, pack, and plan before your first family camping trip."
      heroImage={{
        src: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=1400&auto=format&fit=crop&q=80',
        alt: 'Campfire crackling at dusk at a forest campsite',
      }}
    >
      <h2>Before you leave home</h2>
      <ul>
        <li>Book a drive-up campsite (under 90 minutes from home for your first trip)</li>
        <li>Confirm the site has water and a fire ring; note the check-in time</li>
        <li>Pack the car the night before — not the morning of</li>
        <li>Test every piece of gear in the backyard first, including the tent</li>
        <li>Check the weather 48 hours and 24 hours before</li>
      </ul>

      <h2>Shelter &amp; sleep</h2>
      <ul>
        <li>Tent that fits your family + one (easier entry/exit with kids)</li>
        <li>Ground tarp or footprint</li>
        <li>Sleeping bag per person, temperature-rated for the forecast</li>
        <li>Sleeping pads — skip the air mattress for the first trip</li>
        <li>A pillow for each person (stuff sack with a fleece works)</li>
      </ul>

      <h2>Kitchen</h2>
      <ul>
        <li>2-burner camp stove + fuel (test it before you go)</li>
        <li>Cooler + block ice (lasts longer than cubes)</li>
        <li>One pot, one pan, one spatula, one big spoon</li>
        <li>Plates, bowls, cups, utensils for each person</li>
        <li>Dish tub, biodegradable soap, towel</li>
        <li>Trash bags and a way to hang them</li>
      </ul>

      <h2>Light &amp; comfort</h2>
      <ul>
        <li>One headlamp per person (plus spare batteries)</li>
        <li>Camp chairs</li>
        <li>Bug spray and sunscreen</li>
        <li>Warm layer per person — nights are colder than you think</li>
        <li>Rain jacket per person, even if the forecast is clear</li>
      </ul>

      <h2>For the kids</h2>
      <ul>
        <li>One familiar comfort item per kid (stuffed animal, blanket)</li>
        <li>A small activity kit — magnifying glass, notebook, crayons</li>
        <li>Extra snacks. Then more extra snacks.</li>
        <li>Extra clothes. Kids get wet and dirty; plan for it.</li>
      </ul>

      <h2>The 10 essentials</h2>
      <ul>
        <li>Map + compass (or downloaded offline map)</li>
        <li>First aid kit</li>
        <li>Knife or multi-tool</li>
        <li>Fire starter + lighter</li>
        <li>Extra food and water</li>
        <li>Emergency shelter (space blanket)</li>
        <li>Whistle per kid</li>
        <li>Phone + portable charger</li>
        <li>Written address of campsite + nearest hospital</li>
        <li>Printed list of emergency contacts</li>
      </ul>

      <p>
        <strong>One note:</strong> this is the generic list. Your trip will need 80% of it and none of the stuff you don&apos;t. That&apos;s what the planner builds — a list scaled to your actual family, your actual weather, and your actual campsite.
      </p>
    </GuidePage>
  )
}
