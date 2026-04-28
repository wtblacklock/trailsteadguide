import { GuidePage } from '@/components/guide/GuidePage'
import { QuickAnswer } from '@/components/guide/QuickAnswer'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/guides/how-to-plan-a-camping-trip'
const TITLE = 'How to Plan a Camping Trip'
// SEO-optimized <title>; H1/headline keep TITLE.
const META_TITLE = 'How to Plan a Camping Trip (3-Week Guide)'
const DESCRIPTION =
  'How to plan a camping trip: book the site, inventory the gear, plan the meals, and arrive calm — a 5-step framework for a confident first weekend.'
const HERO_IMAGE = 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=1400&auto=format&fit=crop&q=80'

export const metadata = pageMetadata({
  title: META_TITLE,
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
            { name: 'Camping Basics', url: `${SITE_URL}/guides/basics` },
            { name: TITLE, url: `${SITE_URL}${SLUG}` },
          ],
        })}
      />
      <JsonLd
        data={faqPageGraph([
          {
            q: 'How far in advance should I book a campsite?',
            a: 'Earlier than you think. Most reservation windows open 6 months out, and at popular state and national parks the prime-weather weekends fill within minutes of the window opening. Headliner parks (Yosemite, Rocky Mountain, Olympic, Acadia) effectively require booking the day the window opens — six months to a year ahead. For lesser-known state parks and shoulder-season weekends, 3 to 6 weeks ahead is usually enough. Mid-week reservations are dramatically easier across the board, and private campgrounds (KOA, Hipcamp) typically have shorter lead time.',
          },
          {
            q: 'What is the best camping reservation website?',
            a: 'Recreation.gov for federal sites (national parks, national forests, Army Corps lakes). ReserveAmerica for many state park systems. Individual state parks sometimes run their own booking systems — start with the state park website directly if those two do not list the site.',
          },
          {
            q: 'How do I pick between campsites on a booking site?',
            a: 'Look for level ground, shade during the afternoon, proximity to water and bathrooms but not right next to them, and avoid sites labeled walk-in or primitive for first trips. Check the photos — they are usually accurate.',
          },
          {
            q: 'What time should I arrive at a campsite?',
            a: 'Aim to arrive between noon and 3pm. You need at least two hours of daylight to set up the tent, organize the kitchen, and start cooking before dark. Arriving at dusk is the single biggest cause of first-trip stress.',
          },
          {
            q: 'Should I plan every meal in advance?',
            a: 'Yes. Write down Friday dinner, Saturday breakfast, Saturday lunch, Saturday dinner, and Sunday breakfast. Then build one grocery list from that. Planning meals at the grocery store parking lot is how you end up with no butter and three bags of marshmallows.',
          },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Guides', url: `${SITE_URL}/guides` },
          { name: 'Camping Basics', url: `${SITE_URL}/guides/basics` },
          { name: TITLE, url: `${SITE_URL}${SLUG}` },
        ]}
      />
    <GuidePage
      slug="how-to-plan-a-camping-trip"
      eyebrow="Planning"
      title="How to Plan a Camping Trip"
      lede="A step-by-step planning walkthrough. Start 3 weeks out and you&apos;ll arrive calm instead of frazzled."
      heroImage={{
        src: HERO_IMAGE,
        alt: 'Topo map, planning notebook, and pen on a wooden table — three weeks out from a family camping trip',
      }}
    >
      <QuickAnswer
        tldr="Start three weeks out, book the site first, test gear two weeks ahead, plan every meal, leave by 9am."
        summary="Plan a family camping trip on a three-week runway. Three weeks out, book a site within 90 minutes of home (Recreation.gov for federal, ReserveAmerica or the state site for state parks), prioritizing level ground, afternoon shade, and proximity — but not adjacency — to bathrooms. Two weeks out, pitch the tent in the yard and light the stove. One week out, write down every meal and build a single grocery list. The day before, pack the car completely. Leave by 9am and arrive by noon — never at dusk. The single biggest cause of first-trip stress is arriving late."
      />
      <h2>3 weeks out: pick the trip</h2>
      <p>
        <strong>One caveat on lead time:</strong> 3 weeks works for lesser-known state parks, county parks, and most weeknights. For popular state or national parks on a prime-weather weekend (May–September), you need to book the day the reservation window opens — typically 6 months ahead, sometimes a year for headliners like Yosemite, Rocky Mountain, Olympic, or Acadia. If your target weekend is inside that window and the parks you want are full, switch to mid-week, a smaller park, or a private campground (KOA, Hipcamp).
      </p>
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

      <h2>How to actually pick a campsite (not just a campground)</h2>
      <p>
        Most booking sites let you pick a specific site within the campground. This matters more than the campground itself. A few heuristics:
      </p>
      <ul>
        <li><strong>Look at the satellite view.</strong> Google Maps overlays the campground. Check tree cover, distance from the main road, proximity to a creek or beach.</li>
        <li><strong>Avoid sites next to the bathroom block.</strong> Foot traffic all night, loud doors, automatic lights.</li>
        <li><strong>Avoid the first site at the entrance.</strong> Everyone drives past you with headlights on.</li>
        <li><strong>Avoid the ones backing onto the main road.</strong> Road noise ruins the quiet you came for.</li>
        <li><strong>Target mid-loop sites on a dead-end spur.</strong> Quiet, walkable, often the best sites.</li>
      </ul>
      <p>
        If you can choose, pick an even-numbered or odd-numbered side of a loop based on morning sun — east-facing for warmth, west-facing if you hate being woken at 6am by the sun.
      </p>

      <h2>The pre-trip gear test</h2>
      <p>
        Two weeks out, do this in one afternoon and save yourself a disaster at camp:
      </p>
      <ol>
        <li><strong>Pitch the tent in the yard.</strong> Check every pole, zipper, and stake. Tent should fully assemble in under 15 minutes.</li>
        <li><strong>Light the stove.</strong> Fuel canister attached, knob turned, spark lit. If it doesn&apos;t work now, it won&apos;t work at camp.</li>
        <li><strong>Test headlamps.</strong> Batteries die sitting in a drawer for a year.</li>
        <li><strong>Inflate the air mattress</strong> if you&apos;re bringing one. Listen for leaks for an hour.</li>
        <li><strong>Check the cooler drain plug.</strong> You&apos;d be surprised.</li>
      </ol>

      <h2>Backup plans (because things go wrong)</h2>
      <p>
        Every well-planned trip still hits a snag. The plan includes knowing what to do when it does:
      </p>
      <ul>
        <li><strong>Rain all weekend:</strong> most state parks let you reschedule for a small fee up to 48 hours out. Check the cancellation policy when you book.</li>
        <li><strong>Sick kid day-of:</strong> go home or don&apos;t leave. Camping with a sick kid is a recipe for a sicker kid.</li>
        <li><strong>Forgot something essential:</strong> note the nearest Walmart or camp store before you leave. Usually 15–20 minutes out.</li>
        <li><strong>Gear fails at camp:</strong> Sleep in the car. Buy a replacement in the morning or drive home.</li>
        <li><strong>Unexpected weather alert:</strong> rangers will come around. Listen to them. Severe storms at unfamiliar sites are serious.</li>
      </ul>

      <h2>Planning with other families</h2>
      <p>
        Camping with another family is easier in some ways and harder in others. A few things to line up before you book two adjacent sites:
      </p>
      <ul>
        <li><strong>Match ages roughly.</strong> Kids within 3 years of each other entertain themselves. Wider gaps and you&apos;re managing more than one peer group.</li>
        <li><strong>Align on bedtime.</strong> One family that wants quiet by 9 and another that wants to stay up by the fire until midnight is a recipe for resentment.</li>
        <li><strong>Split the kitchen.</strong> One family cooks dinner Saturday, the other Sunday breakfast. Nobody duplicates pots and pans.</li>
        <li><strong>Book adjacent sites, not sharing a site.</strong> Everyone needs their own tent pad and picnic table. Hanging out together is easy. Sharing a site is not.</li>
        <li><strong>Agree on an alcohol baseline.</strong> Wildly different norms on drinking is a common source of quiet camping friction.</li>
      </ul>

      <h2>Budgeting a weekend trip</h2>
      <p>
        People assume camping is free. It isn&apos;t, but it&apos;s the cheapest real family weekend there is. A realistic budget for a family of four, two nights, if you already own the major gear:
      </p>
      <ul>
        <li>Campsite × 2 nights: $50–$90</li>
        <li>Firewood (2 bundles per night): $30</li>
        <li>Block ice × 2: $10</li>
        <li>Groceries (2 dinners, 2 breakfasts, lunch, snacks): $80–$120</li>
        <li>Gas: $25–$50 depending on distance</li>
        <li>Reservation fee: $8</li>
      </ul>
      <p>
        About $200–$300 for two nights out. Compare to a hotel weekend anywhere interesting and it&apos;s roughly a quarter the cost. The marginal cost of the third trip of the year is even lower — gear is paid off, routines are in place.
      </p>

      <h2>Frequently asked</h2>
      <h3>How far in advance should I book?</h3>
      <p>
        3 to 6 weeks for summer weekends. Premium sites at top parks open 6 months out and fill in minutes.
      </p>
      <h3>Best booking website?</h3>
      <p>
        Recreation.gov for federal sites. ReserveAmerica for many state parks. Check the state park website directly if neither lists it.
      </p>
      <h3>How do I pick between sites?</h3>
      <p>
        Level ground, afternoon shade, near but not next to bathrooms. Use the satellite view on Google Maps to scout.
      </p>
      <h3>What time should I arrive?</h3>
      <p>
        Noon to 3pm. You need at least two hours of daylight for setup and dinner prep.
      </p>
      <h3>Should I plan every meal?</h3>
      <p>
        Yes. Write out every meal, build one grocery list, and prep what you can at home.
      </p>
      <h3>What if my campsite has no cell signal?</h3>
      <p>
        Assume it doesn&apos;t. Screenshot your reservation, download offline maps, and tell someone at home your itinerary and expected return time. Many state parks have a pay phone or ranger station; note the emergency numbers on paper.
      </p>
      <h3>Can I bring my dog camping?</h3>
      <p>
        Most state parks and national forests allow dogs on a leash at campsites and on trails. Always confirm on the park website. Bring a tie-out stake, extra water, a bed, and poop bags. Never leave a dog alone at a site.
      </p>
    </GuidePage>
    <GuideArticleCTA />
    <RelatedGuides currentSlug="how-to-plan-a-camping-trip" />
    </>
  )
}
