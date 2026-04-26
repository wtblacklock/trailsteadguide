import { GuidePage } from '@/components/guide/GuidePage'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/guides/weekend-camping-packing-list'
const TITLE = 'Weekend Camping Packing List'
const DESCRIPTION =
  'Exactly what to bring for 2 nights of family car camping — grouped by shelter, kitchen, clothing, and safety. Nothing on here you will not actually use.'
const HERO_IMAGE = 'https://images.unsplash.com/photo-1455763916899-e8b50eca9967?w=1400&auto=format&fit=crop&q=80'

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: SLUG,
  type: 'article',
  image: HERO_IMAGE,
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={articleGraph({
          slug: SLUG,
          title: TITLE,
          description: DESCRIPTION,
          image: HERO_IMAGE,
          breadcrumbs: [
            { name: 'Home', url: `${SITE_URL}/` },
            { name: 'Guides', url: `${SITE_URL}/guides` },
            { name: 'Camping Basics', url: `${SITE_URL}/guides/camping-basics` },
            { name: TITLE, url: `${SITE_URL}${SLUG}` },
          ],
        })}
      />
      <JsonLd
        data={faqPageGraph([
          {
            q: 'How much food should I pack for a weekend camping trip?',
            a: 'For a family of four over two nights: two dinners, two breakfasts, one lunch, and roughly double the snacks you think you need. Outdoor activity and cool weather both push kids to eat more than at home. Plan five real meals plus continuous grazing.',
          },
          {
            q: 'What is the one thing people forget most often?',
            a: 'A lighter or matches in a dry bag. The second most forgotten item is a dish towel or sponge. Both are cheap to replace at the camp store but add a needless half-hour detour on arrival day.',
          },
          {
            q: 'Do I need a sleeping pad if I have a sleeping bag?',
            a: 'Yes. The sleeping bag insulates against air; the pad insulates against the ground, which pulls heat out of you even faster. Without a pad you will be cold no matter how warm the bag.',
          },
          {
            q: 'Block ice or cube ice for the cooler?',
            a: 'Block ice. A 10-pound block lasts 3 to 5 days; the same weight in cubes melts in about 24 hours. Use cubes only for drinks. Freeze water bottles at home too — they act as ice and become drinking water.',
          },
          {
            q: 'How much water should I bring for a weekend?',
            a: 'Plan on 1 gallon per person per day for drinking, cooking, and dishwashing. A family of four for two nights needs roughly 8 gallons. Most established campgrounds have potable water spigots, so two 2.5-gallon jugs plus a refill is usually enough.',
          },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Guides', url: `${SITE_URL}/guides` },
          { name: 'Camping Basics', url: `${SITE_URL}/guides/camping-basics` },
          { name: TITLE, url: `${SITE_URL}${SLUG}` },
        ]}
      />
    <GuidePage
      slug="weekend-camping-packing-list"
      eyebrow="Packing"
      title="Weekend Camping Packing List"
      lede="Two nights. Four people. One car. Here&apos;s the complete packing list, grouped by category — and nothing is on here that you don&apos;t need."
      heroImage={{
        src: HERO_IMAGE,
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

      <h2>Weekend meal plan (copy this)</h2>
      <p>
        The shortcut most first-timers miss: prep food at home so camp cooking is 15 minutes, not 60. A proven two-night menu:
      </p>
      <ul>
        <li><strong>Friday dinner:</strong> Hot dogs, buns, bagged salad, chips. No cooking except a stove boil or the fire.</li>
        <li><strong>Saturday breakfast:</strong> Scrambled eggs (pre-cracked into a bottle at home), pre-cooked bacon, bagels with cream cheese.</li>
        <li><strong>Saturday lunch:</strong> PB&amp;J, carrots, apples, trail mix. Eaten on a hike or at the site.</li>
        <li><strong>Saturday dinner:</strong> Foil-packet dinners (potato, sausage, peppers, onion). Assemble at home, cook on the fire coals.</li>
        <li><strong>Sunday breakfast:</strong> Instant oatmeal + coffee. Cleaning up for the drive home, not performance cooking.</li>
      </ul>
      <p>
        Snacks throughout: granola bars, trail mix, jerky, oranges, cheese sticks, s&apos;mores supplies. Each kid gets their own labeled snack bag.
      </p>

      <h2>What to skip (and what to add)</h2>
      <p>
        Things that show up on most packing lists but almost never get used on a weekend car camping trip:
      </p>
      <ul>
        <li><strong>Skip:</strong> A full cast-iron set. Bring one skillet if anything.</li>
        <li><strong>Skip:</strong> Bear spray for established East-Coast or Midwestern campgrounds. Check your park&apos;s guidance.</li>
        <li><strong>Skip:</strong> A saw or hatchet. Buy bundled firewood at the camp store.</li>
        <li><strong>Skip:</strong> More than one change of &ldquo;nice&rdquo; clothes. You will live in the same fleece all weekend.</li>
      </ul>
      <p>
        Things that aren&apos;t always listed but make a real difference:
      </p>
      <ul>
        <li><strong>Add:</strong> A picnic tablecloth with clips — food prep on raw wood is gross.</li>
        <li><strong>Add:</strong> Baby wipes, even if you have no babies. Quick hand cleanup.</li>
        <li><strong>Add:</strong> A small deck of playing cards or a travel game for rain evenings.</li>
        <li><strong>Add:</strong> A packable rain tarp with paracord to rig over the picnic table.</li>
        <li><strong>Add:</strong> A collapsible water jug — refilling from a spigot 100 yards away gets old fast.</li>
      </ul>

      <h2>Pre-departure checklist (the night before)</h2>
      <ul>
        <li>Charge all phones, the portable battery pack, and every headlamp</li>
        <li>Freeze water bottles and two gallon jugs — these double as ice and drinking water</li>
        <li>Pre-chop vegetables, crack eggs into a bottle, assemble foil packets</li>
        <li>Screenshot driving directions and your reservation confirmation</li>
        <li>Print one copy of the packing list and physically check items off as they go in the car</li>
        <li>Pack the car fully before bed. Not partially. Fully.</li>
      </ul>

      <h2>Cold-weather and rain adjustments</h2>
      <p>
        The base list above works for a mild, dry forecast. Two quick additions if the forecast changes:
      </p>
      <ul>
        <li><strong>Rain likely:</strong> add a 10×10 rain tarp with 30 feet of paracord. Rig it over the picnic table. Add rubber boots or waterproof overshoes. Double the socks per person. Bring a pack of microfiber towels.</li>
        <li><strong>Overnight lows under 50&deg;F:</strong> swap 40&deg;F sleeping bags for 20&deg;F bags. Add thermal base layers. Add a thicker sleeping pad (R-value 3+). Bring a hot-water bottle for each kid to clip into their bag before bedtime.</li>
        <li><strong>Wind likely (gusts 20+ mph):</strong> add extra tent stakes and guy-line cord. Orient the tent door downwind. Don&apos;t rely on the canopy — it becomes a sail.</li>
      </ul>

      <h2>Packing bins, not loose piles</h2>
      <p>
        Loose gear in the trunk is chaos. Use three clear plastic bins or duffels, each with a single purpose — and label them. This is the single biggest upgrade to a car camping setup:
      </p>
      <ul>
        <li><strong>Kitchen bin:</strong> stove, fuel, pot, pan, utensils, plates, cups, dish tub, soap, towels, lighter, foil, ziplocs. If it relates to food-prep, it lives here.</li>
        <li><strong>Shelter/sleep duffel:</strong> tent, stakes, footprint, sleeping bags, pillows, pads. First bag out when you arrive.</li>
        <li><strong>Misc bin:</strong> headlamps, first aid, lanterns, rope, tape, bug spray, sunscreen, games. The &ldquo;I need a thing&rdquo; bin.</li>
      </ul>
      <p>
        Everything else — chairs, cooler, firewood, personal duffels — is loose but has a natural home. Bins mean setup is three trips from the car, not 30.
      </p>

      <h2>Frequently asked</h2>
      <h3>How much food for a weekend?</h3>
      <p>
        Two dinners, two breakfasts, one lunch, and roughly double your usual snacks for a family of four. Outdoor activity pushes calories way up.
      </p>
      <h3>What do people forget most?</h3>
      <p>
        A lighter or matches. Followed by dish towels and the can opener.
      </p>
      <h3>Do I need a sleeping pad with a sleeping bag?</h3>
      <p>
        Yes. The pad blocks ground cold, which the bag can&apos;t do on its own.
      </p>
      <h3>Block ice or cubes?</h3>
      <p>
        Block ice for the main cooler — lasts days. Cubes are for drinks only.
      </p>
      <h3>How much water for a weekend?</h3>
      <p>
        1 gallon per person per day. A family of four for two nights: roughly 8 gallons, easy to refill if the site has a spigot.
      </p>
      <h3>Can I rent camping gear instead of buying?</h3>
      <p>
        Yes. REI rents tents, sleeping bags, pads, and stoves at most stores. A weekend rental for a family of four runs about $60–$90. It&apos;s the right move for trip one before you know what you actually like, and cheaper than guessing wrong on a full gear purchase.
      </p>
      <h3>How do I keep food cold for two days?</h3>
      <p>
        Pre-chill the cooler with a bag of ice the night before, then drain it. Pack with block ice on the bottom, then frozen meats, then cold drinks on top. Keep the cooler in the shade. A quality cooler like the Coleman Steel-Belted holds ice for 3+ days in summer.
      </p>
    </GuidePage>
    <GuideArticleCTA matchedPlanId="first-weekend-camp" />
    <RelatedGuides currentSlug="weekend-camping-packing-list" />
    </>
  )
}
