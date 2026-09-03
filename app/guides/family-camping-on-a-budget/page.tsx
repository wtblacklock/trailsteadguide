import Link from 'next/link'
import { GuidePage } from '@/components/guide/GuidePage'
import { QuickAnswer } from '@/components/guide/QuickAnswer'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import GuideGearShelf from '@/components/guide/GuideGearShelf'
import GuidePrintablesBlock from '@/components/guide/GuidePrintablesBlock'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/guides/family-camping-on-a-budget'
const TITLE = 'Family Camping on a Budget'
const META_TITLE = 'Family Camping on a Budget'
const DESCRIPTION =
  'Family camping on a budget: gear up for under $300, find free and cheap campsites, and keep the trip cost under $150 total for a family of four.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1620439032751-d2011065c735?w=1400&auto=format&fit=crop&q=80'

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
            { name: TITLE, url: `${SITE_URL}${SLUG}` },
          ],
        })}
      />
      <JsonLd
        data={faqPageGraph([
          {
            q: 'How much does family camping cost for a weekend?',
            a: 'After the initial gear purchase, a family of four can camp for a weekend for $80-120: campsite fee ($25-40 per night × 2 nights) plus food ($40-60 for 2 days). This is comparable to a fast food dinner for four per day. The upfront gear cost is $200-400 if you buy strategically or borrow.',
          },
          {
            q: 'How can I go camping cheap?',
            a: 'Borrow gear you don\'t own yet, cook all your own food rather than buying at camp stores, use a National Forest pass or America the Beautiful pass for free camping access, and camp midweek when rates are lower and sites more available. The biggest cost reduction is in the gear phase - borrow before you buy.',
          },
          {
            q: 'Where can families camp for free?',
            a: 'National Forest dispersed camping is free in most of the U.S. and legal on most Forest Service land - you need a map of the specific forest to find developed and dispersed areas. Bureau of Land Management (BLM) land allows free dispersed camping on most public land in Western states. Some state forest land allows primitive camping. Apps like iOverlander and Campendium list free camping spots.',
          },
          {
            q: 'Is camping cheaper than staying in a hotel with kids?',
            a: 'Yes, significantly. A hotel for a family of four runs $120-250 per night depending on region and season, plus restaurant meals. Camping runs $25-40 per night for the site plus $30-40 per day in food. Over a 3-night trip, camping saves $300-500 compared to a hotel vacation in the same region.',
          },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Guides', url: `${SITE_URL}/guides` },
          { name: TITLE, url: `${SITE_URL}${SLUG}` },
        ]}
      />
      <GuidePage
        slug="family-camping-on-a-budget"
        eyebrow="Planning"
        title="Family Camping on a Budget"
        lede="How to gear up for under $300, where to find cheap and free campsites, and why camping is genuinely one of the most affordable family vacations once the gear is sorted."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'Family eating a simple meal at a campsite with basic gear set up',
        }}
      >
        <QuickAnswer
          tldr="Borrow gear before buying. Use state parks for $25-40/night. Cook your own food. Total trip cost: $80-120 after gear."
          summary="Family camping is one of the cheapest possible vacations once you own the gear. A 2-night family camping trip costs $80-120 after gear: $25-40 per night for a state park site, plus $40-60 for food. The gear investment is the main barrier - $200-400 for a full beginner family setup. Reduce it by borrowing from friends, buying from Facebook Marketplace, using REI&apos;s rental program, or starting with just the critical items (tent + bags + pads) and borrowing the rest. National Forest camping costs nothing and provides an upgrade path from state parks."
        />

        <h2>The two phases of camping economics</h2>
        <p>
          Budget family camping has two phases with completely different economics:
        </p>
        <p>
          <strong>Phase 1: Gear acquisition.</strong> This is the expensive phase. A complete family camping setup costs $300-600 new, $100-250 used or borrowed. This is a one-time cost that gets paid back in years of cheap travel.
        </p>
        <p>
          <strong>Phase 2: Ongoing trips.</strong> After gear is owned, camping is among the cheapest travel options available. A 2-night trip for four costs $80-120. A hotel weekend for four costs $300-600 before food.
        </p>
        <p>
          The families who say camping is expensive are usually in Phase 1 and haven&apos;t crossed into Phase 2 yet. The gear investment looks large in isolation; over 5 years of regular camping it costs less per night than a gas station snack stop.
        </p>

        <h2>How to gear up for under $300</h2>
        <p>
          A complete beginner family camping setup for under $300 is achievable with these strategies:
        </p>

        <h3>Borrow first</h3>
        <p>
          Before buying anything, ask your social network who has camping gear they don&apos;t use. Many families own a tent they&apos;ve used once and a stack of sleeping bags in a closet. Borrowing a tent for your first two trips costs nothing and answers the question of whether camping is a habit worth investing in.
        </p>

        <h3>Buy used strategically</h3>
        <p>
          Facebook Marketplace, Craigslist, REI used gear, and local gear swap Facebook groups are where good camping gear ends up after families try camping once and decide it&apos;s not for them. A Coleman 6-person tent in excellent condition sells used for $30-50. A set of sleeping bags sells for $20-40. The gear doesn&apos;t wear out - it&apos;s been sitting in a closet.
        </p>
        <p>
          What to verify when buying used: tent poles intact and not bent, sleeping bag zippers work fully, no mold or mildew smell, stove igniter functions.
        </p>

        <h3>REI rental program</h3>
        <p>
          REI rents tents, sleeping bags, sleeping pads, and camp stoves. For a first trip before you own gear, renting is often the cheapest option: $30-80 for a full tent package for a weekend. REI members get a slight discount. No commitment, and you can evaluate gear quality before deciding what to buy.
        </p>

        <h3>Buy the minimum new, rest used or borrowed</h3>
        <p>
          If you buy anything new, prioritize sleeping bags - used bags can have mold or mildew from improper storage that is hard to detect until you&apos;re in them. A new Coleman Kids sleeping bag is $30-40. A new Coleman adult bag is $40-60. Buy bags new; borrow or buy used for everything else.
        </p>

        <h3>Budget gear breakdown under $300</h3>
        <ul>
          <li>Coleman Sundome 6-person tent: $80-100 (or borrow)</li>
          <li>2 adult sleeping bags: $80-120 (Coleman or similar)</li>
          <li>2 kids sleeping bags: $60-80</li>
          <li>4 foam sleeping pads: $30-50 total</li>
          <li><em>Total for the sleep system: $250-350 new</em></li>
        </ul>
        <p>
          Borrow or defer on the first trip: camp stove, cooler, cookware, lantern. Use the campground facilities for cooking if a stove isn&apos;t available, and use the host store for ice. You can make a first trip work with less than the full setup.
        </p>

        <h2>Finding cheap and free campsites</h2>

        <h3>State parks: the $25-40 tier</h3>
        <p>
          State park campgrounds are the budget standard for family camping: consistent amenities, established sites, $25-40 per night. This is the right starting point. See <Link href="/guides/best-state-parks-for-families">best state parks for families</Link> for regional picks.
        </p>

        <h3>National Forest dispersed camping: free</h3>
        <p>
          National Forests in the U.S. allow dispersed camping - camping outside of developed campgrounds on National Forest land - for free. No site fee, no reservation, no amenities (no bathrooms, no water, no facilities). Legal on most National Forest land unless specifically prohibited.
        </p>
        <p>
          To find dispersed camping areas, go to the specific National Forest website (fs.usda.gov), find the ranger district nearest your target area, and look for the recreation map. Free camping is marked on the map. Alternatively, apps like Campendium or iOverlander aggregate user-submitted free camping locations.
        </p>
        <p>
          <strong>Requirements for dispersed camping:</strong> You need to pack out all waste (no vault toilets), camp at least 200 feet from water sources and trails, and have a way to handle human waste (shovel and trowel, or a pack-out system). This is a step up in preparedness from a state park campsite - save it for after you&apos;ve done 2-3 state park trips.
        </p>

        <h3>Bureau of Land Management (BLM) land: free in Western states</h3>
        <p>
          BLM manages public land in Western states (Arizona, Nevada, Utah, Colorado, New Mexico, California, Oregon, Washington, Idaho, Montana, Wyoming). Much of this land allows free dispersed camping under the same rules as National Forest camping. The BLM website and the onX Offroad app show land boundaries.
        </p>

        <h3>America the Beautiful Annual Pass: $80</h3>
        <p>
          The federal America the Beautiful pass ($80/year) covers entrance fees at all National Parks, National Forests, BLM land, and Fish and Wildlife sites for the year. If your family will visit any federally managed camping area, it pays for itself on the first trip (Grand Canyon entrance fee alone is $35 per vehicle). Buy it at any National Park entrance station or at store.usgs.gov.
        </p>

        <h3>KOA and private campgrounds: more expensive, more amenities</h3>
        <p>
          Private campgrounds run $40-70 per night for a tent site and often have pools, playgrounds, and camp stores. More expensive than state parks but can be worth it for families with young kids who benefit from the amenities. Not the budget choice, but a comfort option.
        </p>

        <h2>Keeping food costs down at camp</h2>
        <p>
          Camp store food costs 2-3× what grocery store food costs. Buy all food before you leave home and bring enough that you never need to go to a camp store during the trip.
        </p>
        <p>
          The cheapest camp meal framework:
        </p>
        <ul>
          <li><strong>Hot dogs or sausages</strong> ($4-6 for 8): the cheapest possible dinner protein that cooks fast and kids eat reliably</li>
          <li><strong>Eggs and bacon</strong> ($5-8 for breakfast for 4): the cheapest cooked breakfast</li>
          <li><strong>PB&amp;J and deli sandwiches</strong> ($8-12 for lunch for 4): no cooking, no cleanup</li>
          <li><strong>Foil packet meals</strong> ($12-18 for dinner for 4 with chicken thighs and vegetables)</li>
          <li><strong>Cereal and boxed milk</strong> ($6-10 for pack-out breakfast)</li>
        </ul>
        <p>
          Food total for 2 nights for 4 people: $40-60, including snacks. Same or less than a meal at a sit-down restaurant.
        </p>

        <h2>What camping actually costs per year</h2>
        <p>
          If a family of four camps 4 weekends per year (typical for families who get into camping):
        </p>
        <ul>
          <li>Gear (year 1 one-time cost): $300-500</li>
          <li>4 × 2-night trips at $35/night: $280 in site fees</li>
          <li>4 × 2-day food at $50/trip: $200 in food</li>
          <li><strong>Year 1 total: $780-980 for the full year</strong></li>
          <li><strong>Year 2+ total: $480 per year</strong></li>
        </ul>
        <p>
          Equivalent hotel + dining vacation for 4 nights total: $1,200-2,000+. The math is stark. Camping is not expensive - the first year of gear is the only real cost, and it comes back in every trip after.
        </p>

        <h2>Frequently asked</h2>
        <h3>How much does family camping cost for a weekend?</h3>
        <p>After gear is owned: $80-120 for a 2-night trip (site fees + food). Gear cost is $200-400 spread over years of trips.</p>
        <h3>How can I go camping cheap?</h3>
        <p>Borrow gear before buying. Use National Forest dispersed camping for free sites. Cook all your own food. Camp midweek for lower rates and better availability.</p>
        <h3>Where can families camp for free?</h3>
        <p>National Forest dispersed camping and BLM land in Western states. Apps like Campendium and iOverlander map free camping sites.</p>
        <h3>Is camping cheaper than a hotel with kids?</h3>
        <p>Significantly cheaper. Hotel + restaurant dining for 4 runs $400-800 per weekend. Camping runs $80-120 for the same period after gear is owned.</p>
      </GuidePage>
      <GuidePrintablesBlock guideSlug="family-camping-on-a-budget" />
      <GuideGearShelf guideSlug="family-camping-on-a-budget" heading="Budget-tier gear that still holds up" />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="family-camping-on-a-budget" />
    </>
  )
}
