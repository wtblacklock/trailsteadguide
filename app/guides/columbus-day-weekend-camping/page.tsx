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

const SLUG = '/guides/columbus-day-weekend-camping'
const TITLE = 'Columbus Day Weekend Camping'
// SEO-optimized <title>; H1/headline keep TITLE.
const META_TITLE = 'Columbus Day Weekend Camping With Kids: What to Expect'
const DESCRIPTION =
  'Columbus Day (Indigenous Peoples\' Day) weekend camping: foliage crowds, seasonal campground closures, what still has openings, and packing for cold nights.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1480779735619-f73b30fdc062?w=1400&auto=format&fit=crop&q=80'

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
            q: 'Is Columbus Day weekend a busy camping weekend?',
            a: 'In the Northeast, the Great Lakes states, and the Appalachians, it is one of the busiest weekends of the whole year, because the three-day weekend lands right on peak fall color. Reservable campgrounds near foliage destinations typically book out the day their reservation window opens, often six months ahead. In the desert Southwest, Texas, and Florida it is busy for a different reason: October is when the camping season there finally gets comfortable. Expect full loops almost everywhere that is scenic and within a few hours of a city.',
          },
          {
            q: 'Are campgrounds still open on Columbus Day weekend?',
            a: 'Most are, but it is closing weekend for a lot of them. Across the northern half of the country, many state park and National Forest campgrounds shut down for the season on or right after the holiday, and some close individual loops, turn off water spigots, or lock shower buildings a week or two earlier. Before you drive, check the campground\'s own page or call for three things: that it is still open on your dates, that potable water is on, and whether the restrooms are flush toilets or vault toilets for the rest of the season.',
          },
          {
            q: 'How cold does it get camping in mid-October?',
            a: 'Colder than most families expect. In northern states and at elevation, overnight lows in the 30s are normal by mid-October and a frost is common, even when the afternoon feels like a warm fall day. In the South the nights are milder, often in the 50s. Plan the sleep system for the forecast low minus about 10 degrees, since valley and lakeside campsites run colder than the nearest town, and give every kid a dry set of warm sleep clothes and a hat.',
          },
          {
            q: 'What if every campground near us is booked for Columbus Day weekend?',
            a: 'You have four realistic fallbacks: a private campground with its own booking system, a first-come-first-served campground where you arrive Thursday or early Friday morning, dispersed camping on National Forest or BLM land, and a free cancellation alert on recreation.gov for the campground you actually want. If none of those work, the weekend before or the weekend after usually has the same weather and color with far fewer people, as long as the campground has not closed for the season yet.',
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
        slug="columbus-day-weekend-camping"
        eyebrow="Holiday weekend"
        title="Columbus Day Weekend Camping"
        lede="The last big three-day camping weekend of the year lands on peak fall color and closing week at the same time. Here is how to find a site, check that it is still open, and keep kids warm when the sun sets before dinner is done."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'A tent on a raised tent pad beside a picnic table in a campground under tall trees with golden fall leaves',
        }}
      >
        <QuickAnswer
          tldr="Popular reservable sites near fall color booked out months ago. Private campgrounds, first-come sites, and dispersed land are your real options. Confirm the campground is still open with water on, and pack for nights in the 30s."
          summary="Columbus Day weekend, also observed as Indigenous Peoples' Day, falls on the second Monday of October and is the last big three-day camping weekend of the year. In the Northeast, the Great Lakes, and the Appalachians it collides with peak fall color, so popular reservable campgrounds booked out months ago. Across the northern half of the country it is also closing weekend: many state and federal campgrounds shut off water, close loops, or lock the gate for the season right after the holiday. Your realistic options now are private campgrounds, first-come-first-served sites (arrive Thursday or early Friday), dispersed camping, and cancellation alerts. Confirm your campground is still open and has water before you drive. Then pack for real cold: overnight lows in the 30s are normal up north, the sun sets between about 6 and 7 p.m., and every kid needs a warm, dry sleep setup."
        />

        <h2>Why this weekend is different from Labor Day</h2>
        <p>
          On paper it is just another federal three-day weekend. In practice it stacks three things
          that do not usually happen at once. First, it lands on or near peak fall color across a
          big part of the country, which turns ordinary state parks into destinations. Second, many
          schools and government offices take the Monday off, so a lot of families can actually use it. Third,
          it is the end of the season: across the northern states, this is often the last weekend a
          campground is open at all.
        </p>
        <p>
          The result is a weekend that can feel as crowded as{' '}
          <Link href="/guides/labor-day-weekend-camping">Labor Day weekend</Link>, with longer,
          colder nights and fewer open campgrounds to spread the crowd across. In 2026 the holiday
          is Monday, October 12, so the camping weekend runs Friday, October 9 through Monday,
          October 12.
        </p>

        <h2>Check that your campground is still open</h2>
        <p>
          This is the step families skip, and it is the one that ruins trips. Many campgrounds do
          not close all at once. They shut down in stages through late September and October, and
          the details often only show up on the campground&apos;s own page or a posted notice. Before
          you load the car, confirm three things:
        </p>
        <ul>
          <li>
            <strong>The campground or loop is open on your dates.</strong> A park can be open while
            the loop you camped in last summer is gated off.
          </li>
          <li>
            <strong>Potable water is still on.</strong> Water systems are often winterized early
            to protect the pipes from a hard freeze. If the spigots are off, bring all of your
            drinking, cooking, and dishwashing water from home, roughly 2 gallons per person per day.
          </li>
          <li>
            <strong>What the bathrooms look like now.</strong> Shower buildings and flush toilets
            frequently close before the campground does, leaving vault toilets only. That matters
            more with a potty-training toddler than it does for adults.
          </li>
        </ul>

        <h2>Where to find a site if everything looks booked</h2>
        <p>
          Reservable federal campgrounds on recreation.gov mostly open dates on a rolling six-month
          window, so the most popular October sites near fall color were claimed back in April. See{' '}
          <Link href="/guides/recreation-gov-reservation-strategy">
            recreation.gov reservation strategy
          </Link>{' '}
          for how that window works. If you are looking now, these are the options that still produce
          real sites:
        </p>
        <ul>
          <li>
            <strong>Private campgrounds.</strong> They run their own booking systems and often have
            late openings. Many hold a themed Halloween weekend in October, which kids love and which
            also fills up, so book as soon as you find one. Our{' '}
            <Link href="/guides/halloween-camping-with-kids">Halloween camping guide</Link> covers
            how those weekends work.
          </li>
          <li>
            <strong>First-come-first-served campgrounds.</strong> On a holiday weekend near fall
            color, plan to arrive Thursday afternoon or very early Friday. By Friday evening they
            are usually full.
          </li>
          <li>
            <strong>Dispersed camping.</strong> Free and reservation-free on most National Forest
            and BLM land, with no water or toilets. It is also hunting season in much of the
            country, so dress kids in bright colors on trails. See{' '}
            <Link href="/guides/dispersed-camping-on-blm-and-national-forest-land">
              dispersed camping on BLM &amp; National Forest land
            </Link>{' '}
            for the rules.
          </li>
          <li>
            <strong>Cancellation alerts.</strong> Turn on recreation.gov&apos;s free availability
            alert for the campground you want. People cancel holiday reservations in the final two
            weeks when the forecast turns.
          </li>
        </ul>

        <h2>Plan the weekend around short days</h2>
        <p>
          By mid-October you have roughly 11 hours of daylight, and the sun drops behind trees and
          ridgelines well before the official sunset time. That changes the shape of a family trip:
        </p>
        <ul>
          <li>
            <strong>Arrive with at least two hours of light left.</strong> Pitching a tent, finding
            the water spigot, and figuring out the fire ring are all harder in the dark with tired
            kids.
          </li>
          <li>
            <strong>Start dinner by 5 p.m.</strong> Cooking and cleaning up by headlamp is slower,
            and a hot meal before the temperature drops keeps everyone warmer through the night.
          </li>
          <li>
            <strong>Do the big hike in the late morning.</strong> Frosty mornings warm up by about
            10 a.m., and kids move a lot faster once they have shed a layer.
          </li>
          <li>
            <strong>Plan for a long evening.</strong> Four or five hours of darkness before bedtime
            is a lot. Our guide to{' '}
            <Link href="/guides/camping-after-dark-with-kids">camping after dark with kids</Link>{' '}
            has the lighting setup and ideas for filling that time.
          </li>
        </ul>

        <h2>Pack for a cold night, not a fall afternoon</h2>
        <p>
          The classic mistake on this weekend is packing for the 65-degree afternoon instead of the
          35-degree night. In northern states and at any real elevation, a frost on the tent is
          normal. The priorities, in order:
        </p>
        <ul>
          <li>
            <strong>Insulation under every sleeper.</strong> Cold ground pulls more heat out of a kid
            than cold air does. Put a closed-cell foam pad under or on top of each air mattress.
          </li>
          <li>
            <strong>A sleeping bag rated at or below the forecast low.</strong> If your bags are
            summer-weight, add a liner and a fleece blanket inside the bag.
          </li>
          <li>
            <strong>Dry sleep clothes and a hat for each kid.</strong> Change out of the day&apos;s
            clothes at bedtime, since damp cotton from leaf piles and creek edges keeps pulling heat
            all night.
          </li>
          <li>
            <strong>Morning layers within reach.</strong> Keep tomorrow&apos;s fleece and socks in
            the foot of the sleeping bag so they are warm when kids get dressed.
          </li>
        </ul>
        <p>
          For the full sleep system and what to do when a child wakes up cold, read{' '}
          <Link href="/guides/how-to-keep-kids-warm-camping">how to keep kids warm camping</Link>.
          For broader shoulder-season advice, see{' '}
          <Link href="/guides/fall-camping-for-beginners">fall camping for beginners</Link>.
        </p>

        <h2>Holiday crowds and campground manners</h2>
        <p>
          A full loop on a cold night means neighbors are closer and everyone is huddled
          around their fire at the same time. Keep generator use inside posted hours, keep kids on your own site rather
          than cutting through others, and put the campfire fully out before bed, since fall leaves
          and dry grass catch easily. Buy firewood near the campground instead of bringing it from
          home: moving firewood spreads invasive insects, and many parks prohibit outside wood.
        </p>

        <h2>If the date is flexible</h2>
        <p>
          The last weekend of September and the first weekend of October are often the sweet spot:
          campgrounds are still fully open, water is still on, color is starting in the north, and
          crowds are a fraction of the holiday. If your kids have a school fall break on a different
          week, a Sunday through Wednesday trip at the same campground can feel like a different
          place entirely.
        </p>

        <h2>Frequently asked</h2>
        <h3>Is Columbus Day weekend a busy camping weekend?</h3>
        <p>
          Yes, especially near fall color in the Northeast, Great Lakes, and Appalachians, and across
          the desert Southwest, Texas, and Florida where October starts the comfortable season.
          Reservable sites near popular areas book out months ahead.
        </p>
        <h3>Are campgrounds still open on Columbus Day weekend?</h3>
        <p>
          Most are, but many northern campgrounds close for the season on or right after the
          holiday, and water and showers often shut off earlier. Check the campground&apos;s own page
          before you drive.
        </p>
        <h3>How cold does it get camping in mid-October?</h3>
        <p>
          In northern states and at elevation, lows in the 30s and a morning frost are normal. Plan
          for the forecast low minus about 10 degrees, since campsites in valleys and near water run
          colder than town.
        </p>
        <h3>What if every campground near us is booked?</h3>
        <p>
          Try a private campground, a first-come-first-served site on Thursday, dispersed camping,
          or a recreation.gov cancellation alert. The weekend before or after usually has the same
          weather with far fewer people.
        </p>
      </GuidePage>
      <GuidePrintablesBlock guideSlug="columbus-day-weekend-camping" />
      <GuideGearShelf guideSlug="columbus-day-weekend-camping" heading="Gear for a cold holiday weekend" />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="columbus-day-weekend-camping" />
    </>
  )
}
