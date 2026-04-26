import { GuidePage } from '@/components/guide/GuidePage'
import { QuickAnswer } from '@/components/guide/QuickAnswer'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/guides/camping-for-beginners'
const TITLE = 'Camping for Beginners'
const DESCRIPTION =
  'A real, grown-up guide to your first camping trip. No gear worship, no backcountry talk — just what families actually need to know to get outside.'
const HERO_IMAGE = 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=1400&auto=format&fit=crop&q=80'

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
            { name: 'Camping Basics', url: `${SITE_URL}/guides/basics` },
            { name: TITLE, url: `${SITE_URL}${SLUG}` },
          ],
        })}
      />
      <JsonLd
        data={faqPageGraph([
          {
            q: 'Do I need a 4-season tent for my first camping trip?',
            a: 'No. A standard 3-season dome tent like a Coleman Sundome is the right pick for car camping. Four-season tents are built for mountaineering and are overkill for an established campground.',
          },
          {
            q: 'Is it safe to camp with young kids?',
            a: 'At an established campground, yes. You are in a managed site with bathrooms, rangers, and other families nearby. Give each kid a whistle and teach them the site number.',
          },
          {
            q: 'What if it rains on my first camping trip?',
            a: 'A dome tent with its rainfly handles regular rain fine, as long as you stake the rainfly out. If the forecast is genuinely bad, reschedule — there is no reason to camp in a downpour on your first trip.',
          },
          {
            q: 'Do I need to reserve a campsite ahead of time?',
            a: 'Yes. Walk-up sites exist but are unreliable, especially in summer. Book 3 to 6 weeks ahead through ReserveAmerica or Recreation.gov.',
          },
          {
            q: 'How long should a first camping trip be?',
            a: 'One night. Go home Saturday, assess what worked, and book a two-night trip for next month. One night teaches you almost everything you need to know.',
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
      slug="camping-for-beginners"
      eyebrow="Start here"
      title="Camping for Beginners"
      lede="If you&apos;ve never camped, start here. This is the shortest, least-intimidating path from zero to a great first trip."
      heroImage={{
        src: HERO_IMAGE,
        alt: 'Tent pitched in a forest clearing at golden hour',
      }}
    >
      <QuickAnswer
        tldr="Make your first trip small, close, and easy to bail on — everything else follows."
        summary="The first camping trip you should plan is one night, under 90 minutes from home, at an established state park or public campground with bathrooms, water, and other families nearby. Borrow or rent gear instead of buying — you don't yet know what you like. Arrive by 3pm, set up the tent before anything else, and start dinner before dark. The trip succeeds if everyone sleeps a few hours and someone says 'can we do this again?' Save scenic backcountry sites for trip three or four."
      />
      <h2>The mindset shift</h2>
      <p>
        Most people overthink their first camping trip. They research tents for three weekends and then never book a site. The truth: your first trip should be <strong>small, close to home, and easy to bail on.</strong> Everything else follows.
      </p>

      <h2>What &quot;camping&quot; actually means for beginners</h2>
      <p>
        There are many kinds of camping. You want <strong>car camping</strong> at an established campground — you drive to a numbered site, park next to it, and pitch a tent. It has bathrooms, running water, and other humans within shouting distance. This is the only kind of camping we&apos;ll talk about here.
      </p>

      <h2>Pick the right first trip</h2>
      <ul>
        <li>One night, not two or three</li>
        <li>Within 90 minutes of home</li>
        <li>A state park or established public campground, not a remote BLM site</li>
        <li>A weekend with a mild, dry forecast — cheat on the weather</li>
      </ul>

      <h2>Gear: borrow, don&apos;t buy</h2>
      <p>
        You don&apos;t know what you actually like yet. Borrow a tent and sleeping bags from a friend. Rent the rest from REI or a local outfitter. After your first trip, you&apos;ll know what&apos;s worth buying.
      </p>

      <h2>The three things that will go wrong</h2>
      <ul>
        <li><strong>You&apos;ll be cold at night.</strong> Overpack warm layers. Sleep in long underwear + a beanie.</li>
        <li><strong>Setup will take longer than you think.</strong> Arrive by 3pm. Not 5pm. Not &quot;after dinner.&quot;</li>
        <li><strong>You&apos;ll forget something.</strong> It&apos;s fine. The camp store and the neighbors exist.</li>
      </ul>

      <h2>What to do when you get there</h2>
      <ul>
        <li>Walk the site with your family. Pick a flat spot for the tent</li>
        <li>Set up the tent first, before you do anything else</li>
        <li>Unpack the kitchen second</li>
        <li>Start dinner prep before it gets dark — you can&apos;t cook by headlamp the first time</li>
        <li>Build the fire after dinner, not before</li>
      </ul>

      <p>
        That&apos;s it. Camping is not complicated. It&apos;s just unfamiliar — and a structured plan removes 90% of the unfamiliarity.
      </p>

      <h2>What to skip on your first trip</h2>
      <p>
        Every first-trip list online is 150 items long. Most of that is gear people bring once and never use again. On your first trip you can safely skip:
      </p>
      <ul>
        <li><strong>A dutch oven.</strong> You will not be baking bread on coals. Cook on the stove.</li>
        <li><strong>A hatchet.</strong> Buy bundled firewood at the camp store. That&apos;s what it&apos;s there for.</li>
        <li><strong>A French press or pour-over kit.</strong> Instant coffee is fine for one weekend. It truly is.</li>
        <li><strong>A second tent &ldquo;just in case.&rdquo;</strong> If your tent fails, sleep in the car. That&apos;s the backup plan.</li>
        <li><strong>Hiking boots.</strong> Sneakers work at a car campsite. Buy boots later if you start hiking seriously.</li>
      </ul>
      <p>
        The pattern: every item you skip is one less thing to pack, unpack, keep dry, and lose. Under-packing is a feature.
      </p>

      <h2>How much a first trip actually costs</h2>
      <p>
        People assume camping requires a thousand dollars of gear before you can start. It doesn&apos;t. A realistic first-trip budget, if you borrow a tent and sleeping bags:
      </p>
      <ul>
        <li>Campsite for one night: $25–$45</li>
        <li>Firewood from the camp store: $8</li>
        <li>Block of ice: $5</li>
        <li>Groceries for 2 meals + snacks: $40–$60</li>
        <li>Gas (under 90 minutes each way): $20</li>
      </ul>
      <p>
        Call it ~$120 for a family of four for a one-night trip. That&apos;s cheaper than most movie nights once you factor in dinner. If you buy a $120 Sundome 4P tent, you break even on the second trip — every trip after that is nearly free.
      </p>

      <h2>The first-night routine that works</h2>
      <p>
        The trick to a smooth first evening is doing things in the right order. Cooking while the tent isn&apos;t up, or starting the fire before dinner is prepped, are the two most common rookie errors. Your order of operations:
      </p>
      <ol>
        <li>Park, walk the site, pick the tent spot (flat, no rocks, not under a dead branch)</li>
        <li>Pitch the tent. Throw the sleeping bags inside so it&apos;s ready for later.</li>
        <li>Set up the kitchen on the picnic table</li>
        <li>Start dinner. Eat before sunset.</li>
        <li>Build the campfire after dinner is cleaned up</li>
        <li>S&apos;mores, stories, bed</li>
      </ol>
      <p>
        Do it in this sequence and the first night is genuinely enjoyable. Skip the sequence and you end up cooking pasta by headlamp with a hungry 6-year-old on your lap.
      </p>

      <h2>What &ldquo;a good first trip&rdquo; actually looks like</h2>
      <p>
        A good first trip isn&apos;t a transcendent wilderness experience. Set the bar at the right height:
      </p>
      <ul>
        <li>You arrive before sunset and the tent goes up without a fight</li>
        <li>You cook one hot meal outdoors</li>
        <li>Everyone sleeps at least 5 hours</li>
        <li>Nobody gets hurt, nobody gets lost</li>
        <li>You wake up, drink coffee, and stay another few hours before heading home</li>
        <li>At least one kid says &ldquo;can we do this again?&rdquo;</li>
      </ul>
      <p>
        That&apos;s it. Notice what&apos;s not on the list: perfect weather, gorgeous photos, a deep wilderness vibe, seeing wildlife. Those are nice when they happen. They are not the measure of success on trip one.
      </p>

      <h2>Frequently asked</h2>
      <h3>Do I need a 4-season tent?</h3>
      <p>
        No. Unless you&apos;re camping in snow, a standard 3-season dome tent — Coleman Sundome or similar — is the right pick. Four-season tents are built for mountaineering and are overkill (and uncomfortable) for car camping.
      </p>
      <h3>Is it safe to camp with young kids?</h3>
      <p>
        At an established campground, yes. You&apos;re not in the wilderness — you&apos;re in a managed site with bathrooms, rangers, and other families nearby. The main risks are small: sunburn, bug bites, a kid wandering off. Give each kid a whistle and teach them the site number.
      </p>
      <h3>What if it rains?</h3>
      <p>
        A dome tent with its rainfly handles a regular rainstorm fine. Problems start when people don&apos;t stake the rainfly out or leave gear outside. If the forecast is genuinely bad — steady rain all weekend, storms — cancel and rebook. You&apos;re not obligated to camp in a downpour on trip one.
      </p>
      <h3>Do I need to reserve a site?</h3>
      <p>
        Yes — and earlier than you probably think. Walk-up sites exist but are unreliable, especially in summer. Most reservation windows open <strong>6 months out</strong> (recreation.gov, ReserveCalifornia, many state systems), and the prime-weather weekends at popular state and national parks can fill within minutes. For lesser-known parks and shoulder-season weekends, 3–6 weeks ahead is usually enough; for headliner parks (Yosemite, RMNP, Olympic, Acadia) plan a year out. If everything is booked, mid-week is dramatically easier, and private campgrounds (KOA, Hipcamp) are usually open with shorter lead time.
      </p>
      <h3>How long should the first trip be?</h3>
      <p>
        One night. Seriously. Go home Saturday, sleep in your bed Saturday night, remember what worked and what didn&apos;t, and book a two-night trip for next month.
      </p>
    </GuidePage>
    <GuideArticleCTA />
    <RelatedGuides currentSlug="camping-for-beginners" />
    </>
  )
}
