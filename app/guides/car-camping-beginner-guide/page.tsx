import { GuidePage } from '@/components/guide/GuidePage'
import RelatedGuides from '@/components/guide/RelatedGuides'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/guides/car-camping-beginner-guide'
const TITLE = 'Car Camping Beginner Guide'
const DESCRIPTION =
  'Car camping is the easiest way to start. Here is everything that makes it different — and better — than other kinds of camping for first-time families.'
const HERO_IMAGE = 'https://images.unsplash.com/photo-1519443933981-c665c4a62ad4?w=1400&auto=format&fit=crop&q=80'

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
            { name: TITLE, url: `${SITE_URL}${SLUG}` },
          ],
        })}
      />
      <JsonLd
        data={faqPageGraph([
          {
            q: 'What is the difference between car camping and backpacking?',
            a: 'Car camping means you drive to a numbered campsite and your car stays parked next to you the whole time. Backpacking means you hike in, carrying everything on your back. Car camping has no weight limit and is dramatically easier for first-timers and families.',
          },
          {
            q: 'How far should my car camping site be from home for a first trip?',
            a: 'Under 90 minutes. Bailouts need to be easy, and a short drive gives you enough daylight to set up after arrival. Save longer drives for trip three or four.',
          },
          {
            q: 'Do I need a 4WD vehicle for car camping?',
            a: 'No. Any standard sedan gets you to the vast majority of established campgrounds in state parks and national forests. 4WD only matters for primitive dispersed sites on rough forest roads, which you should skip on a first trip.',
          },
          {
            q: 'Can I sleep in my car instead of a tent?',
            a: 'You can, and it is a legitimate fallback if the weather turns nasty. But a tent is more comfortable for more than one night, and most established sites expect tent pitching on the pad. Treat the car as your backup, not your primary shelter.',
          },
          {
            q: 'How much space does car camping gear take up?',
            a: 'For a family of four on a two-night trip, plan on the full trunk of a mid-size SUV or hatchback. Tent, sleeping bags, cooler, stove, chairs, and a plastic bin of kitchen gear will fill most small vehicles. A roof bag adds useful overflow space.',
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
      slug="car-camping-beginner-guide"
      eyebrow="Car camping"
      title="The Car Camping Beginner Guide"
      lede="Car camping is the fastest on-ramp to the outdoors. Here&apos;s what it is, why it&apos;s the right choice for your first trip, and how to do it well."
      heroImage={{
        src: HERO_IMAGE,
        alt: 'An SUV with a roof-top tent set up at a campsite',
      }}
    >
      <h2>What is car camping?</h2>
      <p>
        Car camping means you drive your car to a numbered campsite and pitch a tent next to it. You do not hike in. You do not carry your gear. Your stuff stays in the car. This is camping with training wheels — which is exactly what you want for your first trip.
      </p>

      <h2>Why it&apos;s the right first trip</h2>
      <ul>
        <li><strong>Weight doesn&apos;t matter.</strong> Bring the heavy cooler, the big tent, the real pillows</li>
        <li><strong>The car is your shelter-of-last-resort.</strong> Rainstorm, kid meltdown, bear scare — you sleep in the car.</li>
        <li><strong>It&apos;s forgiving.</strong> Forgot something? You drive into town.</li>
        <li><strong>It&apos;s near bathrooms.</strong> This is a bigger deal than you realize.</li>
      </ul>

      <h2>What makes a good car camping site</h2>
      <ul>
        <li>Level, dry ground for the tent</li>
        <li>A picnic table and a fire ring — almost every established site has both</li>
        <li>Potable water within a short walk</li>
        <li>Bathroom with actual toilets (not a pit latrine) for your first trip</li>
        <li>Shade for the hot part of the day</li>
      </ul>

      <h2>Gear you can get away with</h2>
      <p>
        Because you don&apos;t have to carry it, car camping lets you bring real furniture-like items. This matters more than you&apos;d think:
      </p>
      <ul>
        <li>Camp chairs with a cupholder and a footrest</li>
        <li>A full-size cooler, not a tiny backpacking one</li>
        <li>A queen-size air mattress (optional, but the upgrade is real)</li>
        <li>A full-size pillow</li>
        <li>A proper 2-burner stove, not a little canister stove</li>
      </ul>

      <h2>Logistics that will save you</h2>
      <ul>
        <li>Reserve your site 3–6 weeks ahead; summer weekends fill up fast</li>
        <li>Ask for a site far from the bathroom block (foot traffic, smell, light)</li>
        <li>Arrive during daylight. Always.</li>
        <li>Back the car into the site — so the trunk opens toward your living area</li>
      </ul>

      <p>
        Once you&apos;ve done a car camping trip or two, you&apos;ll know whether you want to go further (backpacking, primitive sites, overlanding). But everyone starts here. It&apos;s the easiest, lowest-risk, highest-fun-per-effort way to be outside with your family.
      </p>

      <h2>How to pack the car (in the right order)</h2>
      <p>
        A badly-packed car means you&apos;re unloading the whole trunk to find the cooler at 6pm. A well-packed car means the right thing is on top at the right time. Load in this order — first in, last out:
      </p>
      <ol>
        <li><strong>Bottom layer:</strong> tent, sleeping bags, sleeping pads. You won&apos;t touch them until you&apos;re at the site.</li>
        <li><strong>Middle layer:</strong> camp chairs, clothing duffels, lantern, headlamps</li>
        <li><strong>Top layer:</strong> the cooler, the kitchen bin, and the firewood bundle</li>
        <li><strong>Passenger-area ready:</strong> snacks, water bottles, the kids&apos; comfort items, and paper directions to the site</li>
      </ol>
      <p>
        Back the car into the site when you arrive so the trunk opens toward your living area. Sounds fussy; isn&apos;t. It saves you 50 feet of walking every time you grab a beer or a jacket.
      </p>

      <h2>Picking a car-friendly campsite</h2>
      <p>
        Not all car camping sites are equal. A few things to look at when you&apos;re browsing Recreation.gov or ReserveAmerica:
      </p>
      <ul>
        <li><strong>Paved or gravel pad for the car.</strong> Dirt pads turn into mud in rain.</li>
        <li><strong>Tent pad separate from the car parking.</strong> You don&apos;t want exhaust smell where you sleep.</li>
        <li><strong>Not a pull-through.</strong> Dead-end sites have less foot traffic.</li>
        <li><strong>Shade during the hot part of the day.</strong> A south-facing tent at 2pm is brutal.</li>
        <li><strong>Avoid sites labeled &ldquo;walk-in&rdquo;</strong> — those are usually 100+ yards from parking.</li>
      </ul>
      <p>
        Photos on ReserveAmerica are mostly reliable. If a site looks good in photos, it&apos;s probably good. If it looks sketchy in photos, it is.
      </p>

      <h2>Car camping etiquette (the unwritten rules)</h2>
      <p>
        Established campgrounds are neighborhoods. You have neighbors ten feet away. A few things that keep everyone happy:
      </p>
      <ul>
        <li><strong>Quiet hours are real.</strong> Usually 10pm–7am. The campground host will warn you once, then ticket you.</li>
        <li><strong>Don&apos;t cut through other people&apos;s sites</strong> to get to the bathroom. Walk the road.</li>
        <li><strong>Keep your dog on a leash even if it&apos;s friendly.</strong> Most campgrounds require it. Other dogs aren&apos;t always friendly.</li>
        <li><strong>Food away, trash out.</strong> Bears and raccoons are opportunists — your neighbors pay the price if you&apos;re sloppy.</li>
        <li><strong>Don&apos;t leave your fire unattended.</strong> Even a smoldering one. Drown it before bed.</li>
      </ul>

      <h2>The car-camping cooking setup</h2>
      <p>
        Because your kitchen doesn&apos;t need to be portable, car camping cooking can be as good as anything you do at home — if you set it up right. A realistic two-zone kitchen on the picnic table:
      </p>
      <ul>
        <li><strong>Cooking zone:</strong> 2-burner stove at one end. Cutting board, knife, and oil next to it. Pot and pan nested on a small tray.</li>
        <li><strong>Prep zone:</strong> the other end of the table with a wipeable cover. Cooler tucked underneath in shade.</li>
        <li><strong>Cleanup zone:</strong> dish tub, biodegradable soap, and a drying rack on a small side table or a flat rock near the spigot.</li>
      </ul>
      <p>
        The main upgrade over backpacking cooking: real flavors work. Cast-iron skillet pancakes, pan-seared steaks, proper scrambled eggs with cheese. This is why people prefer car camping to backpacking once they&apos;ve tried both.
      </p>

      <h2>Car camping in the shoulder seasons</h2>
      <p>
        Summer campgrounds are full. Shoulder seasons — April, May, late September, October — are the underrated sweet spot for car camping:
      </p>
      <ul>
        <li><strong>Easier reservations.</strong> Premium sites that are booked six months out in July are wide open on a May weekend.</li>
        <li><strong>Fewer bugs.</strong> Mosquitos and biting flies peak in June–August. October has essentially none.</li>
        <li><strong>Better fire weather.</strong> Many western states ban campfires July–September. Shoulder-season fires are usually allowed.</li>
        <li><strong>Nights actually cool.</strong> 65&deg;F and a sleeping bag beats 85&deg;F and sweating in a tent.</li>
        <li><strong>Fewer rowdy neighbors.</strong> Peak-summer campgrounds attract peak-summer crowds.</li>
      </ul>
      <p>
        The tradeoff: colder nights. Bring a warmer sleeping bag (20&deg;F rated instead of 40&deg;F) and a beanie. That&apos;s the only real adjustment.
      </p>

      <h2>Frequently asked</h2>
      <h3>What is the difference between car camping and backpacking?</h3>
      <p>
        Car camping: drive to the site, car stays there. Backpacking: hike in with everything on your back. Car camping is dramatically easier and the right starting point.
      </p>
      <h3>How far should my site be from home for a first trip?</h3>
      <p>
        Under 90 minutes. Easy bailouts matter more than dramatic scenery on trip one.
      </p>
      <h3>Do I need 4WD?</h3>
      <p>
        No. Standard sedans reach nearly all established campgrounds. 4WD only matters for primitive dispersed sites on rough forest roads — which you shouldn&apos;t be doing on a first trip anyway.
      </p>
      <h3>Can I sleep in my car instead of a tent?</h3>
      <p>
        Yes, as a backup. A tent is better for more than one night, but the car is a legitimate shelter-of-last-resort if weather or kid meltdowns force it.
      </p>
      <h3>How much trunk space will the gear take?</h3>
      <p>
        For a family of four on two nights, plan on a full mid-size SUV trunk or a hatchback with a roof bag. Tent, bags, cooler, stove, chairs, kitchen bin — it adds up fast.
      </p>
    </GuidePage>
    <RelatedGuides currentSlug="car-camping-beginner-guide" />
    </>
  )
}
