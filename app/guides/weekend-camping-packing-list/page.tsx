import { GuidePage } from '@/components/guide/GuidePage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Weekend Camping Packing List — Trailstead Guide',
  description: 'Exactly what to bring for 2 nights of family car camping — grouped by category, nothing unnecessary.',
}

export default function Page() {
  return (
    <GuidePage
      slug="weekend-camping-packing-list"
      eyebrow="Packing"
      title="Weekend Camping Packing List"
      lede="Two nights. Four people. One car. Here&apos;s the complete packing list, grouped by category — and nothing is on here that you don&apos;t need."
      heroImage={{
        src: 'https://images.unsplash.com/photo-1455763916899-e8b50eca9967?w=1400&auto=format&fit=crop&q=80',
        alt: 'Camping gear laid out before packing the car for a weekend trip',
      }}
    >
      <h2>Shelter</h2>
      <ul>
        <li>Tent (rated for 1 more person than you are)</li>
        <li>Tent footprint or ground tarp</li>
        <li>Sleeping bags × party size</li>
        <li>Sleeping pads × party size</li>
        <li>Pillows</li>
        <li>Small broom or whisk to keep dirt out of the tent</li>
      </ul>

      <h2>Kitchen</h2>
      <ul>
        <li>2-burner camp stove</li>
        <li>One full propane canister (plus a spare for 2 nights)</li>
        <li>Matches or lighter in a dry bag</li>
        <li>Cooler + block ice</li>
        <li>Nesting pot set (one pot, one pan, one lid)</li>
        <li>Spatula, wooden spoon, tongs</li>
        <li>Sharp knife + small cutting board</li>
        <li>Plates, bowls, mugs, utensils × party size</li>
        <li>Dish tub, sponge, biodegradable soap, dish towel</li>
        <li>Reusable water jugs (2+ gallons)</li>
        <li>Trash bags, ziplocs, foil</li>
      </ul>

      <h2>Clothing (per person)</h2>
      <ul>
        <li>1 warm layer (fleece or puffy)</li>
        <li>1 rain jacket</li>
        <li>2 shirts</li>
        <li>2 pairs pants (one hiking, one cozy)</li>
        <li>3 pairs socks (two thick, one spare)</li>
        <li>Hat with a brim</li>
        <li>Beanie for night</li>
        <li>Close-toed shoes + camp sandals</li>
      </ul>

      <h2>Lighting &amp; power</h2>
      <ul>
        <li>Headlamp per person + spare batteries</li>
        <li>Lantern for the picnic table</li>
        <li>Portable phone charger (10,000+ mAh)</li>
      </ul>

      <h2>Safety &amp; misc</h2>
      <ul>
        <li>First aid kit</li>
        <li>Multi-tool</li>
        <li>Bug spray, sunscreen, lip balm</li>
        <li>Toilet paper in a ziplock (campground TP is unreliable)</li>
        <li>Toiletries bag</li>
        <li>Towels</li>
        <li>Camp chairs × party size</li>
        <li>Printed directions + campsite confirmation</li>
      </ul>

      <h2>For kids (add to the list above)</h2>
      <ul>
        <li>Comfort item (stuffed animal, blanket)</li>
        <li>Glow stick for the tent</li>
        <li>Whistle per kid</li>
        <li>Small activity kit (magnifier, notebook, crayons)</li>
        <li>2 extra outfit changes per kid</li>
      </ul>

      <p>
        <strong>How to pack the car:</strong> heaviest on the bottom, frequently-used on top. Cooler goes in last so you can pull it out at dinner without unloading the car. Sleeping bags live in a duffel, not loose.
      </p>
    </GuidePage>
  )
}
