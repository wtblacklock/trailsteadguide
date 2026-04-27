import Link from 'next/link'
import Image from 'next/image'
import { GuidePage } from '@/components/guide/GuidePage'
import { QuickAnswer } from '@/components/guide/QuickAnswer'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'
import AmazonLink from '@/components/affiliate/AmazonLink'

const SLUG = '/guides/camping-in-california-for-beginners'
const TITLE = 'Camping in California for Beginners'
const DESCRIPTION =
  'A practical beginner guide to camping in California — coast vs. mountains vs. desert, fire bans, bear country, and how to actually get a reservation at a popular state park.'
const HERO_IMAGE = 'https://images.unsplash.com/photo-1498429089284-41f8cf3ffd39?w=1400&auto=format&fit=crop&q=80'

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
            { name: 'Location-Based Camping', url: `${SITE_URL}/guides/location` },
            { name: TITLE, url: `${SITE_URL}${SLUG}` },
          ],
        })}
      />
      <JsonLd
        data={faqPageGraph([
          {
            q: 'When is the best time to camp in California?',
            a: 'It depends on which California. Coastal sites (Big Sur, Point Reyes, Channel Islands) are best from late spring through mid-fall, with fog mornings even in summer. Sierra Nevada sites (Yosemite, Sequoia, Tahoe) are limited to roughly Memorial Day through mid-October by snow at elevation. Desert parks (Joshua Tree, Death Valley, Anza-Borrego) are October through April only — summer is dangerously hot. Northern coast and redwoods camping works year-round but with heavy winter rain.',
          },
          {
            q: 'How early do I need to book a California state park?',
            a: 'For weekends in summer at popular parks, six months — exactly when the reservation window opens. ReserveCalifornia opens reservations 6 months out at 8am Pacific, and the prime sites at Big Basin, Pfeiffer Big Sur, Henry Cowell, D.L. Bliss, and the Channel Islands fill within minutes. Yosemite campgrounds (federal, on recreation.gov) open 5 months out and fill in the same way. Mid-week and shoulder-season weekends are dramatically easier.',
          },
          {
            q: 'Do I need a bear canister or bear box?',
            a: 'In most of the Sierra Nevada and parts of the north coast, yes. Yosemite, Sequoia, Kings Canyon, and most Tahoe-area campgrounds either provide a bear box at the site or require a hard-sided bear canister. Treat all food, toiletries, trash, and scented items as bear bait — including chapstick and toothpaste. In coastal and desert parks south of Big Sur, bears are not a concern.',
          },
          {
            q: 'How worried should I be about wildfires and fire bans?',
            a: 'Very. Most of California is under some level of fire restriction from June through October. Check the campground page and the state ranger station the week of your trip — restrictions change weekly. Bring a propane stove regardless; under most fire bans, propane stoves are still allowed when wood and charcoal fires are not. Air quality from distant wildfires can shut a clear-skied campground down on short notice; have an alternate plan.',
          },
          {
            q: 'Is dispersed camping allowed in California?',
            a: 'Yes, on most national forest land and BLM land — but it is the harder-mode beginner trip and many forests have layered restrictions during fire season. The easier path: a developed campground in a state or national park. Once you have a few weekends in, dispersed camping in the eastern Sierra (Inyo NF), the BLM lands east of the Sierra crest, or the north coast forests opens up.',
          },
          {
            q: 'Where should a California first-timer actually go?',
            a: 'A coastal or foothill state park within 2 hours of home, with bear boxes if you are in the Sierra foothills. Big Basin Redwoods (since post-fire reopening), Henry Cowell, Mt Tamalpais, Sugarloaf Ridge, Lake Perris, and many of the Sierra-foothill state parks fit. Save Yosemite Valley, Big Sur tent sites, and Joshua Tree for trip three — they are extraordinary but harder to reserve and harder to camp in cold.',
          },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Guides', url: `${SITE_URL}/guides` },
          { name: 'Location-Based Camping', url: `${SITE_URL}/guides/location` },
          { name: TITLE, url: `${SITE_URL}${SLUG}` },
        ]}
      />
    <GuidePage
      slug="camping-in-california-for-beginners"
      eyebrow="California"
      title="Camping in California for Beginners"
      lede="What to expect, what changes, and how to plan your first trip in California."
      heroImage={{
        src: HERO_IMAGE,
        alt: 'Yosemite Valley from Tunnel View — granite walls, El Capitan and Half Dome',
      }}
    >
      <QuickAnswer
        tldr="Four climates, four packing lists — and reservations are the hardest part. Book exactly 6 months out at 8am Pacific."
        summary="California is four different camping states: cool foggy coast (year-round), Sierra Nevada (Memorial Day to mid-October, snow-closed otherwise), redwood north (wet, dense, cool), and southern desert (October–April only — summer is dangerous). The same packing list doesn't work in all four. Reservations are the hardest part: ReserveCalifornia opens 6 months out at 8am Pacific, recreation.gov 5 months out at 7am — popular sites at Yosemite Valley, Big Basin, Pfeiffer Big Sur, and Joshua Tree fill within minutes. Bear boxes are required across the Sierra and parts of the north coast — every scented item (food, toothpaste, chapstick, sunscreen) goes in. Fire restrictions tighten weekly June–October; a propane stove keeps you cooking under most ban levels. For a first trip, pick a coastal or foothill state park within 2 hours of home — save Yosemite Valley for trip three."
      />
      <h2>What camping in California is actually like</h2>
      <ul>
        <li><strong>Four climates in one state.</strong> Coast (cool, foggy, mild year-round), Sierra Nevada (alpine summer, snow-closed winter), redwood north (wet, dense, cool), and desert south (hot summer, glorious winter). The same packing list does not work in all four.</li>
        <li><strong>Reservations are the hardest part.</strong> Popular state and national park sites book months ahead. The trip you want at the campground you want often requires planning before the season even starts.</li>
        <li><strong>Fire is a constant overlay.</strong> Some level of fire restriction is in effect across most of the state from June through October. Plans change on a week of notice.</li>
        <li><strong>Beginner focus:</strong> a coastal or foothill state park 90 minutes to 2 hours from home, in shoulder season, with bear-box or bear-locker amenities if applicable. Save the iconic stuff for trip three.</li>
      </ul>

      <h2>What&apos;s different about camping in California</h2>
      <h3>Pick your climate, not just your park</h3>
      <ul>
        <li><strong>Coast:</strong> 50s–70s daytime, 40s–60s overnight, frequent morning fog. A warm fleece is more useful than sunscreen most of the year.</li>
        <li><strong>Sierra Nevada (Tahoe, Yosemite, Sequoia):</strong> Memorial Day through mid-October. Hot afternoons, cold nights even in July (40s above 7,000 ft is normal). Snow can close access roads into June.</li>
        <li><strong>Desert (Joshua Tree, Death Valley, Anza-Borrego):</strong> October through April. Summer days above 100°F are routine. Spring wildflower bloom is the prime window.</li>
        <li><strong>Redwoods and north coast (Humboldt, Del Norte, Mendocino):</strong> Cool and wet most of the year. Sites under the canopy stay damp.</li>
      </ul>

      <h3>Reservations are competitive, not casual</h3>
      <ul>
        <li>State parks: <a href="https://www.reservecalifornia.com/" rel="noopener" target="_blank">ReserveCalifornia</a> opens 6 months out at 8am Pacific. Be online and signed in at 7:55am for the popular weekends.</li>
        <li>National parks: <a href="https://www.recreation.gov/" rel="noopener" target="_blank">recreation.gov</a> opens 5 months out at 7am Pacific. Yosemite Valley campgrounds disappear within minutes.</li>
        <li>Cancellations happen — check 48–72 hours before your dates if your first try sold out.</li>
        <li>Mid-week (Sun–Thu) and shoulder-season (April, late September, October) are dramatically easier.</li>
      </ul>

      <h3>Bear country in the Sierra and parts of the north coast</h3>
      <ul>
        <li>Bear boxes are provided at most Sierra and north-coast campgrounds. Use them. Black bears in California campgrounds are habituated and will open coolers in the daylight.</li>
        <li>If a bear box is not provided, a hard-sided bear canister is required. Soft food bags do not count.</li>
        <li>Anything with scent goes in the box: food, toothpaste, sunscreen, chapstick, deodorant. Empty the car before you sleep — bears damage cars to get to a snack wrapper.</li>
      </ul>

      <h3>Fire bans and air quality</h3>
      <ul>
        <li>From late spring through fall, expect some restriction in any forested area. Stage 1 typically allows propane stoves and ring fires; Stage 3 prohibits all open flame.</li>
        <li>A propane stove keeps the trip going under almost every fire ban level — wood and charcoal don&apos;t.</li>
        <li>Wildfire smoke from distant fires can drop a clear-sky campground into AQI 200+ in hours. Have an alternate plan.</li>
      </ul>

      <figure className="not-prose my-12">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-stone-100">
          <Image
            src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1400&auto=format&fit=crop&q=80"
            alt="Coastal redwood forest with massive trunks rising into mist"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            unoptimized
          />
        </div>
        <figcaption className="mt-3 text-sm text-stone-500 italic">
          Coastal redwoods — cool, damp, dense canopy. Bring a warmer bag than you think you need.
        </figcaption>
      </figure>

      <h2>Best setup for your first trip in California</h2>
      <p>
        These are the three beginner trip types that work in California, mapped to plans on this site.
      </p>
      <ul>
        <li>
          <strong><Link href="/plans/backyard-test">Backyard Test.</Link></strong> Coastal California weather is mild enough that a backyard night is a low-stakes way to learn your gear. Coastal fog and 50°F overnights at 30 ft of elevation are good practice for the same conditions at the campground.
        </li>
        <li>
          <strong><Link href="/plans/first-night-camp">First Night Camp.</Link></strong> One night, one car, a state park within 2 hours. Pick a coastal park (Half Moon Bay, New Brighton, Sunset State Beach, Refugio) or a foothill park (Henry Cowell, Big Basin, Sugarloaf Ridge) — the gear and mental load are smaller than at altitude.
        </li>
        <li>
          <strong><Link href="/plans/easy-family-basecamp">Easy Family Basecamp.</Link></strong> Two nights at a campground with bear boxes, real bathrooms, and a feature (a beach, a redwood grove, a swimmable creek). Save Yosemite Valley basecamping for after a kid-tested coast or foothill weekend.
        </li>
      </ul>

      <h2>Where beginners should look</h2>
      <h3>California state parks</h3>
      <p>
        California State Parks runs over 280 parks. Reserve at <a href="https://www.parks.ca.gov/" rel="noopener" target="_blank">parks.ca.gov</a> or directly at <a href="https://www.reservecalifornia.com/" rel="noopener" target="_blank">ReserveCalifornia</a>. The 6-month reservation window is competitive for popular coastal and Sierra-foothill parks; mid-week and shoulder season open up substantially.
      </p>

      <h3>National parks and federal lands</h3>
      <p>
        Federal sites (Yosemite, Sequoia, Kings Canyon, Joshua Tree, Death Valley, Pinnacles, Lassen, Redwoods) reserve through <a href="https://www.recreation.gov/" rel="noopener" target="_blank">recreation.gov</a>, 5 months out at 7am Pacific. Each park has different rules: Yosemite Valley campgrounds are a different reservation system than Yosemite&apos;s outlying campgrounds; some Joshua Tree campgrounds are first-come, first-served.
      </p>

      <h3>Private and county campgrounds, KOAs</h3>
      <p>
        California has a big private-campground inventory, particularly along the coast and around major lakes. Quality varies. Read recent reviews. KOAs are predictable but tend to feel more RV-park than wilderness.
      </p>

      <h3>National forest and BLM dispersed</h3>
      <p>
        Free dispersed camping on most national forest and BLM land — Inyo NF on the east side, Stanislaus and Sierra NFs in the west, the BLM lands of the eastern Sierra. Layered fire restrictions and no facilities; a more advanced trip type, not a beginner first weekend.
      </p>

      <figure className="not-prose my-12">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-stone-100">
          <Image
            src="https://images.unsplash.com/photo-1581293738298-451cd74b0b45?w=1400&auto=format&fit=crop&q=80"
            alt="Joshua Tree at sunset in the Mojave Desert, California"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            unoptimized
          />
        </div>
        <figcaption className="mt-3 text-sm text-stone-500 italic">
          Joshua Tree at sunset. Glorious October–April; flat dangerous in July.
        </figcaption>
      </figure>

      <h2>What to bring (for California)</h2>
      <p>
        California&apos;s climate variety means the &ldquo;California list&rdquo; depends on where in California. Adjust the basics by region:
      </p>
      <h3>Coastal and redwood camping</h3>
      <ul>
        <li>30°F to 40°F sleeping bag — coastal lows are colder than the daytime suggests, and redwood sites stay damp.</li>
        <li>Fleece, hoodie, and a windproof outer layer. Sunscreen matters even on foggy days.</li>
        <li>Tent rainfly staked tight; coastal fog is wet enough to soak gear left out.</li>
      </ul>
      <h3>Sierra Nevada (Yosemite, Tahoe, Sequoia)</h3>
      <ul>
        <li>20°F sleeping bag in summer at 7,000+ ft. Nights drop into the 30s and 40s.</li>
        <li>Bear-safe storage: use the campground bear box, or bring a hard-sided canister.</li>
        <li>Headlamp + extra layer for the night walk to the bathroom — afternoon temps can be 80°F and overnight 35°F.</li>
        <li>Sunscreen and lip balm — UV exposure at altitude is intense.</li>
      </ul>
      <h3>Desert (Joshua Tree, Death Valley, Anza-Borrego)</h3>
      <ul>
        <li>October–April only. Day–night swings of 40°F are routine.</li>
        <li>Extra water — minimum 1 gallon per person per day plus extra for cooking and emergencies.</li>
        <li>Wind-resistant tent staking. Desert wind shreds half-staked tents.</li>
      </ul>

      <h2>Common first-time mistakes in California</h2>
      <ol>
        <li>
          <strong>Trying to book the iconic site two weeks ahead.</strong> Yosemite Valley and Big Sur tent sites for July weekends sell out the morning the reservation window opens, six months out. Pick a less-famous park, or shift to mid-week or shoulder-season.
        </li>
        <li>
          <strong>Underdressing for Sierra nights — or trying the trip in early May.</strong> A 90°F afternoon at 7,500 ft can drop into the 30s by 5am, and most Sierra campgrounds don&apos;t even open until May 15. Bring the puffy and the warm hat even in July, and don&apos;t book your first trip before late June.
        </li>
        <li>
          <strong>Leaving a cooler visible through a car window in Yosemite, Tahoe, or Sequoia.</strong> Habituated black bears recognize cars as food storage and will pop a door, break a window, and tear an interior apart for a cooler they can see — even an empty one that has held food in the past. Empty the car of every scented item and use the bear box. Lock the doors.
        </li>
        <li>
          <strong>Skipping the fire-restriction check the week of the trip.</strong> Restrictions tighten weekly through summer and a level you didn&apos;t expect can shut down the campfire and the charcoal grill. The propane stove works under most levels of restriction; plan around it.
        </li>
        <li>
          <strong>Treating Joshua Tree or Death Valley as a summer trip.</strong> Summer in either is dangerous, not just uncomfortable. Plan October–April for desert California.
        </li>
      </ol>

      <h2>Simple gear setup for California</h2>
      <p>
        A working starter kit calibrated for California — built around a 3-season tent, bear-aware storage, and the ability to keep cooking under fire restrictions. Adjust the sleeping system to your specific climate.
      </p>
      <ul>
        <li>
          <strong>Tent.</strong>{' '}
          <AmazonLink productId="fwc-tent-sundome" pageSlug="camping-in-california-for-beginners" />{' '}
          (~$116). Full mesh inner ventilates on warm Sierra afternoons and seals against coastal fog at night.
        </li>
        <li>
          <strong>Stove.</strong>{' '}
          <AmazonLink productId="fwc-stove-coleman-1burner" pageSlug="camping-in-california-for-beginners" />{' '}
          (~$40). Keeps you cooking under nearly every California fire-restriction level.
        </li>
        <li>
          <strong>Cooler.</strong>{' '}
          <AmazonLink productId="fwc-cooler-rolling" pageSlug="camping-in-california-for-beginners" />{' '}
          (~$107). Empty it into the bear box overnight in Yosemite, Tahoe, and Sequoia — bears will pry open coolers in the dark.
        </li>
        <li>
          <strong>Shade or shelter.</strong>{' '}
          <AmazonLink productId="canopy-camp" pageSlug="camping-in-california-for-beginners" />{' '}
          (~$130). Sun in the desert and Sierra; rain shelter on the north coast.
        </li>
        <li>
          <strong>Lantern.</strong>{' '}
          <AmazonLink productId="fwc-lantern-consciot" pageSlug="camping-in-california-for-beginners" />{' '}
          (~$30).
        </li>
        <li>
          <strong>Headlamp.</strong>{' '}
          <AmazonLink productId="headlamp-family" pageSlug="camping-in-california-for-beginners" />{' '}
          (~$50). One per person.
        </li>
        <li>
          <strong>Camp chair.</strong>{' '}
          <AmazonLink productId="fwc-chair-gci-rocker" pageSlug="camping-in-california-for-beginners" />{' '}
          (~$80).
        </li>
        <li>
          <strong>Bear-safe storage.</strong> Use the campground&apos;s bear box where provided. If camping anywhere requiring you to bring your own, a hard-sided BearVault or Garcia canister is the right call — soft &ldquo;bear bags&rdquo; do not meet most California park requirements.
        </li>
      </ul>
      <p>
        <Link href="/gear" className="font-medium underline underline-offset-4">View Full Gear Setup →</Link>
      </p>


      <h2>Frequently asked</h2>
      <h3>When is the best time to camp in California?</h3>
      <p>
        Coast: spring through fall. Sierra Nevada: Memorial Day to mid-October. Desert: October through April. Redwoods and north coast: year-round but expect heavy winter rain.
      </p>
      <h3>How early do I need to book a California state park?</h3>
      <p>
        Six months — the day the reservation window opens at 8am Pacific. Mid-week and shoulder-season weekends are dramatically easier. Cancellations show up 48–72 hours before the date.
      </p>
      <h3>Do I need a bear canister or bear box?</h3>
      <p>
        In Sierra Nevada and most north-coast parks, yes. Use the campground bear box where provided, or bring a hard-sided canister. Anything with scent — food, toothpaste, sunscreen, chapstick — goes in the box.
      </p>
      <h3>How worried should I be about wildfires and fire bans?</h3>
      <p>
        Some level of restriction is in effect across most of the state from June through October. Check the campground page and the ranger station the week of your trip. Bring a propane stove — it works under most ban levels.
      </p>
      <h3>Is dispersed camping allowed?</h3>
      <p>
        Yes on most national forest and BLM land, with layered fire restrictions in season. The easier path for a first trip is a developed campground in a state or national park. Dispersed camping opens up after a few weekends in.
      </p>
      <h3>Where should a California first-timer actually go?</h3>
      <p>
        A coastal or foothill state park within 2 hours of home, with bear boxes if applicable. Save Yosemite Valley, Big Sur tent sites, and Joshua Tree for trip three or four — they are extraordinary, but harder to reserve and harder to camp in cold.
      </p>
    </GuidePage>
    <GuideArticleCTA />
    <RelatedGuides currentSlug="camping-in-california-for-beginners" />
    </>
  )
}
