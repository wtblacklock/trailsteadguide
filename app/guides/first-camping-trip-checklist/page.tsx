import { GuidePage } from '@/components/guide/GuidePage'
import RelatedGuides from '@/components/guide/RelatedGuides'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/guides/first-camping-trip-checklist'
const TITLE = 'First Camping Trip Checklist'
const DESCRIPTION =
  'The one-page checklist for your first family camping trip. Everything to book, pack, and plan — shelter, kitchen, safety, and kid essentials.'
const HERO_IMAGE = 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=1400&auto=format&fit=crop&q=80'

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
            q: 'What are the 10 essentials for camping?',
            a: 'Navigation (map or offline GPS), first aid kit, knife or multi-tool, fire starter and lighter, extra food and water, emergency shelter like a space blanket, whistle, phone and portable charger, written address of the site and nearest hospital, and a list of emergency contacts. This is the baseline safety kit.',
          },
          {
            q: 'What should I pack for my first camping trip?',
            a: 'Tent, sleeping bags and pads, a 2-burner camp stove with fuel, a cooler with block ice, basic cook set and utensils, headlamps, camp chairs, first aid kit, warm layer and rain jacket per person, and bug spray. Start with this short list and add rather than subtract.',
          },
          {
            q: 'Do I need a sleeping pad or an air mattress?',
            a: 'A sleeping pad, for the first trip. Air mattresses are comfortable but cold — the air inside them conducts ground cold straight to your back. They also leak. A closed-cell or self-inflating pad is more reliable and warmer.',
          },
          {
            q: 'How many changes of clothes do I need for camping?',
            a: 'For two nights: two shirts, two pairs of pants (one hiking, one cozy), three pairs of socks, one fleece, one rain jacket, a hat with a brim, and a beanie. Kids need an extra outfit per day because they get wet and dirty.',
          },
          {
            q: 'Should I bring firewood from home?',
            a: 'No. Most parks ban transporting firewood because of invasive insects. Buy bundled firewood at the camp store or a gas station near the park. Expect to pay $7 to $10 per bundle, and plan on two bundles per evening if you want a real fire.',
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
      slug="first-camping-trip-checklist"
      eyebrow="Checklist"
      title="The First Camping Trip Checklist"
      lede="One page. Everything you actually need to book, pack, and plan before your first family camping trip."
      heroImage={{
        src: HERO_IMAGE,
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

      <h2>How to use the checklist (the right way)</h2>
      <p>
        A list is useless if you don&apos;t actually use it as a list. The mistake most people make is mentally checking things off while packing, which means they forget the item that was always in the other closet. Do it physically:
      </p>
      <ol>
        <li>Print the list the day before</li>
        <li>Lay everything out in one pile in the living room or garage</li>
        <li>Check each item off with a pen as it goes into a bag or bin</li>
        <li>Load bags into the car as each category is complete</li>
        <li>Don&apos;t start loading until a category is fully checked — mixed piles cause confusion</li>
      </ol>
      <p>
        This is 20 extra minutes of work and prevents the one-in-three chance that you forget the stove fuel, the tent stakes, or the can opener.
      </p>

      <h2>The &ldquo;first aid&rdquo; kit you actually need</h2>
      <p>
        Most prepackaged first aid kits contain 200 adhesive bandages and one gauze pad. Useless. Build a minimal kit that covers the real injuries at a car campsite:
      </p>
      <ul>
        <li>Adhesive bandages in two sizes — regular and finger-wrap</li>
        <li>Butterfly closures for cuts that would otherwise need stitches</li>
        <li>Gauze pads + medical tape</li>
        <li>Antiseptic wipes</li>
        <li>Tweezers (splinters, ticks)</li>
        <li>Benadryl or Zyrtec — bee stings, unknown plant reactions</li>
        <li>Ibuprofen and acetaminophen, adult and kid doses</li>
        <li>Moleskin for blisters</li>
        <li>Ace bandage</li>
        <li>A pair of nitrile gloves</li>
      </ul>
      <p>
        Put it all in one small dry bag. Keep it in the top of the car trunk, not buried. If you need it, you need it fast.
      </p>

      <h2>Documents and digital prep</h2>
      <p>
        Most campgrounds have no cell signal. Before you leave:
      </p>
      <ul>
        <li>Screenshot the reservation confirmation (site number, check-in code)</li>
        <li>Download the campground map offline</li>
        <li>Download offline Google Maps for the area — just in case GPS fails</li>
        <li>Write the campground&apos;s physical address and phone number on paper</li>
        <li>Note the nearest hospital or urgent care with address</li>
        <li>Tell someone at home where you&apos;re going and when you&apos;ll be back</li>
      </ul>

      <h2>The morning-of quick-check</h2>
      <p>
        Even with everything packed the night before, the morning adds one last sweep. Thirty seconds per item, done while drinking coffee:
      </p>
      <ul>
        <li>Phone chargers in the car — not in a kitchen drawer</li>
        <li>Cooler has ice or frozen bottles in it, not waiting in the freezer</li>
        <li>Wallet and campground reservation confirmation in the glove box</li>
        <li>Dog&apos;s food and leash (if dog is coming)</li>
        <li>Kids&apos; medications and EpiPens if applicable</li>
        <li>Trash bag in the car for the drive home&apos;s snacks</li>
        <li>House locked, lights off, thermostat turned down</li>
      </ul>
      <p>
        These are the items that miss the main list because they live in the kitchen or the bedroom, not with the camping gear. Keep a small morning-of sticky note on the fridge.
      </p>

      <h2>What&apos;s on every list that you can actually skip</h2>
      <p>
        Camping checklists on the internet are copy-pasted from one another and never questioned. A few things that show up constantly but rarely earn their weight:
      </p>
      <ul>
        <li><strong>Hatchet or saw.</strong> Firewood bundles come pre-split. You won&apos;t use it.</li>
        <li><strong>Cast-iron dutch oven.</strong> Cook on the stove. Dutch oven cooking is a hobby, not a first-trip tool.</li>
        <li><strong>Solar charger.</strong> A $25 portable battery pack is cheaper, smaller, and works in shade.</li>
        <li><strong>Paracord by the hundred feet.</strong> 20 feet is plenty for a first trip.</li>
        <li><strong>A &ldquo;camp kitchen&rdquo; folding prep table.</strong> The picnic table works.</li>
        <li><strong>Snake-bite kit.</strong> Not recommended by any medical authority. Just don&apos;t stick your hand in places you can&apos;t see.</li>
      </ul>
      <p>
        Every skipped item is one less thing to pack, store, and forget somewhere. The best camping setup is the one you don&apos;t need to reorganize.
      </p>

      <h2>Frequently asked</h2>
      <h3>What are the 10 essentials?</h3>
      <p>
        Navigation, first aid, knife, fire starter, extra food/water, emergency shelter, whistle, phone + battery, site + hospital address, emergency contacts. Baseline safety.
      </p>
      <h3>What should I pack for a first trip?</h3>
      <p>
        Tent, sleeping gear, 2-burner stove with fuel, cooler, cook set, headlamps, chairs, first aid, layers, bug spray. Start here; add rather than subtract.
      </p>
      <h3>Sleeping pad or air mattress?</h3>
      <p>
        Pad. Air mattresses are cold and leak. A self-inflating pad is more reliable and warmer.
      </p>
      <h3>How many changes of clothes?</h3>
      <p>
        Two shirts, two pants, three socks, one fleece, one rain jacket, hat, beanie. One extra outfit per day for each kid.
      </p>
      <h3>Should I bring firewood from home?</h3>
      <p>
        No. Most parks ban it for invasive insect reasons. Buy a bundle at the camp store.
      </p>
    </GuidePage>
    <RelatedGuides currentSlug="first-camping-trip-checklist" />
    </>
  )
}
