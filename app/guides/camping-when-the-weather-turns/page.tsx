import Link from 'next/link'
import Image from 'next/image'
import { GuidePage } from '@/components/guide/GuidePage'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/guides/camping-when-the-weather-turns'
const TITLE = 'Camping When the Weather Turns'
const DESCRIPTION =
  'A practical guide for the moment a forecast shifts on you mid-trip — lightning rules, the bail decision, what to do if you are stuck in place, the gear that buys you safety, and how to call it without second-guessing.'
const HERO_IMAGE = 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=1400&auto=format&fit=crop&q=80'

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
            { name: 'Scenario Camping', url: `${SITE_URL}/guides/scenario` },
            { name: TITLE, url: `${SITE_URL}${SLUG}` },
          ],
        })}
      />
      <JsonLd
        data={faqPageGraph([
          {
            q: 'What is the safest place to be during a thunderstorm at a campground?',
            a: 'Inside a hard-roof building or inside your car with the windows up. A tent is not lightning-safe — it has no metal frame to conduct a strike around you. If the campground has a bathroom or shelter, that is the right place. If not, the car is the second-best choice. Pick a spot in the campground away from the tallest trees and ridges before the storm arrives, not during.',
          },
          {
            q: 'How close does lightning need to be before I should stop what I am doing?',
            a: 'Use the 30-30 rule: if you can hear thunder less than 30 seconds after you see lightning, the storm is within 6 miles and you should be in shelter. Stay in shelter for 30 minutes after the last thunder. Lightning routinely strikes 10+ miles from the storm cell — the "blue sky bolt" is real.',
          },
          {
            q: 'When should I bail on a trip versus stay and ride out the weather?',
            a: 'Bail when you have lost a critical piece of gear (sleeping bag wet, tent poles broken, stove not working) or when the forecast updates to severe weather (thunderstorms, tornado watch, sustained winds over 40 mph, flash flood watch). Stay when the conditions are uncomfortable but manageable: light rain, cool nights, broken sleep. The decision rule: leave preventively, in daylight, with the option to come back.',
          },
          {
            q: 'What if I cannot leave because the road is washed out or closed?',
            a: 'Stay calm and stay put. Move to the highest, safest tent site available, away from creek beds and the tallest trees. Inventory water and food. Tell a ranger or fellow camper your situation if possible. Most weather closures clear within 12 to 24 hours — wait it out, do not try to drive a flooded road. Flash floods kill more people than any other camping weather hazard, almost always in cars trying to cross water.',
          },
          {
            q: 'How do I know when to pack up?',
            a: 'Pack up at the first hard signal: a forecast revision to severe weather, a new flash flood watch, sustained gusts that lift your tarp, the first close lightning. Earlier is always cleaner — wet pack-up is fine; dangerous pack-up is not. If you are debating whether to leave, the answer is usually yes.',
          },
          {
            q: 'What is the single most important piece of bad-weather gear?',
            a: 'A real waterproof rain jacket and rain pants for every person in your party. Not a poncho, not a "water-resistant" shell — a sealed-seam jacket with a hood and proper rain pants. Hypothermia is possible at 50°F if you are wet, and wet kids cool faster than wet adults. Dry layers are the second priority; the jacket and pants are the first.',
          },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Guides', url: `${SITE_URL}/guides` },
          { name: 'Scenario Camping', url: `${SITE_URL}/guides/scenario` },
          { name: TITLE, url: `${SITE_URL}${SLUG}` },
        ]}
      />
      <GuidePage
        slug="camping-when-the-weather-turns"
        eyebrow="Bad weather"
        title="Camping When the Weather Turns"
        lede="The bail decision, the lightning rules, and what to do when the forecast shifts on you mid-trip."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'Dark storm clouds gathering over an open landscape',
        }}
      >
        <h2>The decision frame</h2>
        <p>
          A forecast turning during a trip is a normal camping experience. It is not an emergency by default — but it becomes one if you treat &ldquo;we already drove here&rdquo; as a reason to stay. The question is not whether to camp in bad weather. The question is which kind of bad weather you stay for and which kind you leave for.
        </p>
        <ul>
          <li><strong>Stay-and-camp:</strong> rain, cool nights, broken sleep, light wind, brief showers.</li>
          <li><strong>Leave preventively:</strong> thunderstorm in the next 6 hours, flash flood watch, sustained 30+ mph winds, snow on a 3-season setup.</li>
          <li><strong>Leave immediately:</strong> tornado watch, flood arriving, lightning in the campground, hypothermia symptoms in anyone.</li>
          <li><strong>Default rule:</strong> earlier is always cleaner. If you are asking whether to leave, the answer is usually yes.</li>
        </ul>

        <h2>Lightning — the rules nobody teaches</h2>
        <p>
          Lightning is the most-misjudged camping risk. Most strikes happen at the leading and trailing edges of a storm, not the middle — meaning &ldquo;the rain hasn&apos;t started yet&rdquo; and &ldquo;the rain has stopped&rdquo; are both high-risk windows.
        </p>
        <h3>The 30-30 rule</h3>
        <ul>
          <li><strong>30 seconds:</strong> if you hear thunder less than 30 seconds after seeing lightning, the strike is under 6 miles away. You should already be in shelter.</li>
          <li><strong>30 minutes:</strong> stay in shelter for 30 minutes after the last thunder. The storm cell can drift past and still throw bolts behind it.</li>
        </ul>

        <h3>Where to be</h3>
        <ul>
          <li><strong>Best:</strong> a hard-roof building. Most state parks have a bathroom or shelter within walking distance — that is the answer.</li>
          <li><strong>Good:</strong> inside your car with the windows up. The metal frame routes the strike around you. A convertible with the soft top up does not count.</li>
          <li><strong>Bad:</strong> a tent. Tents are not lightning shelters — there is no metal frame to conduct around you, and the rainfly does nothing for electrical risk.</li>
          <li><strong>Worst:</strong> open ground, ridge tops, the tallest tree in the area, water, or near metal fences.</li>
        </ul>

        <h3>If you cannot reach shelter</h3>
        <ul>
          <li>Move to lower ground if you are on a ridge or summit.</li>
          <li>Get away from isolated tall trees. A grove of similar-height trees is safer than a single big one.</li>
          <li>Lightning crouch (squatting on the balls of your feet, hands over ears, head tucked) reduces strike likelihood — but is a last resort, not a substitute for shelter.</li>
          <li>Spread out — if your group is together, lightning that strikes one person can side-flash to others within 20 ft.</li>
        </ul>

        <h2>Flash floods — the underestimated killer</h2>
        <p>
          Flash floods kill more campers and hikers than lightning, hypothermia, and bear attacks combined — almost always in cars trying to cross flooded roads. The rain at your site is not the rain that matters. The rain upstream is.
        </p>
        <h3>Flash flood awareness:</h3>
        <ul>
          <li><strong>Know your watershed.</strong> Is your campground in a canyon? Downstream of mountain terrain? On a creek floodplain? If yes, take any flash flood watch seriously.</li>
          <li><strong>Watch for upstream rain.</strong> A clear sky over your site does not mean it isn&apos;t pouring 10 miles up the canyon.</li>
          <li><strong>Move to high ground.</strong> If you are camped on a creek bank or in a low-lying tent pad, move during the watch — not during the warning.</li>
          <li><strong>Never drive through flowing water.</strong> &ldquo;Turn around, don&apos;t drown.&rdquo; Six inches of moving water can sweep a small car. Two feet can move a truck.</li>
          <li><strong>Wait it out.</strong> Most flash floods clear in 2–6 hours. A wait at a high point is always safer than a drive across water.</li>
        </ul>

        <figure className="not-prose my-12">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-stone-100">
            <Image
              src="https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=1400&auto=format&fit=crop&q=80"
              alt="Mountains at dusk under a heavy, color-shifted sky as weather moves through"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              unoptimized
            />
          </div>
          <figcaption className="mt-3 text-sm text-stone-500 italic">
            A weather front you can see is one you can plan for. A front you cannot see is the one to worry about — refresh the forecast often.
          </figcaption>
        </figure>

        <h2>The bail decision</h2>
        <p>
          Bailing is a skill, not a failure. The earlier you decide, the cleaner the bail. Wet pack-up is fine. Dangerous pack-up is not.
        </p>
        <h3>Conditions that should trigger a bail:</h3>
        <ul>
          <li><strong>Forecast revision to severe weather:</strong> thunderstorms in the next 6 hours, tornado watch, flash flood watch, sustained 30+ mph winds.</li>
          <li><strong>Critical gear failure:</strong> sleeping bag soaked, tent poles broken, fly torn, stove not working in cold rain.</li>
          <li><strong>Hypothermia signs in anyone:</strong> shivering that does not stop, slurred speech, confusion, withdrawal, fumbling motor skills. Pack the car immediately.</li>
          <li><strong>Cold-injury risk in kids.</strong> Kids cool faster than adults and report it later. Cold + wet + tired in a kid = leave now.</li>
          <li><strong>Driving access at risk.</strong> Forest service dirt roads turn impassable in rain. If the road is borderline, leave before it gets worse.</li>
        </ul>

        <h3>How to bail cleanly</h3>
        <ol>
          <li>Get the dry stuff into the car first: sleeping bags, dry clothes, electronics, kid comfort items. Wrap in trash bags or dry bags.</li>
          <li>Get people warm and dry next: kids in the car with the heater on, adults in dry layers.</li>
          <li>Break the tent down with the fly still over the body — the wet outside ends up on the outside of your bundle.</li>
          <li>Wet tent into a contractor trash bag, then into the trunk. Do not roll it tight — wet rolled tents grow mildew in 24 hours.</li>
          <li>Drive out at a normal speed. Bail decisions are about leaving safely, not racing the storm.</li>
          <li>Set the tent up at home within 24 hours to dry. Re-book for next weekend.</li>
        </ol>

        <h2>If you are stuck in place</h2>
        <p>
          Sometimes leaving is not safe — the road is closed, the storm is overhead, or driving in conditions is more dangerous than staying. In that case, the goal shifts from &ldquo;leave&rdquo; to &ldquo;ride it out safely.&rdquo;
        </p>
        <h3>Ride-it-out plan:</h3>
        <ul>
          <li><strong>Move to the safest tent site available.</strong> Higher ground, away from creek beds, away from the tallest trees, near a hard-roof building if possible.</li>
          <li><strong>Stage gear inside the car.</strong> Sleeping bags, dry clothes, kid comfort, food, water, headlamps. Make the car your shelter-of-last-resort.</li>
          <li><strong>Tell someone.</strong> A neighboring campsite, a ranger, or a check-in text to a friend. Someone who is not at your site should know your status.</li>
          <li><strong>Inventory water and food.</strong> If you might be there 24 more hours, plan for it. Drinking water first.</li>
          <li><strong>Stay put through the worst of it.</strong> Lightning, high wind, heavy rain — wait inside a building or the car. Tent cannot do this work.</li>
          <li><strong>Re-evaluate when conditions ease.</strong> Most weather closures clear in 12–24 hours. Reassess every few hours.</li>
        </ul>

        <h3>What not to do</h3>
        <ul>
          <li>Do not try to drive across flowing water. Wait.</li>
          <li>Do not stay in the tent through close lightning. Move to a building or the car.</li>
          <li>Do not panic-pack in the dark in heavy rain. If conditions are dangerous, shelter in place until daylight or until conditions ease.</li>
          <li>Do not split the party. Stay together; account for everyone every 30 minutes during the worst of it.</li>
        </ul>

        <h2>Pre-trip prep that buys you safety later</h2>
        <ul>
          <li><strong>Real rain layers.</strong> Jacket and pants per person. Not a poncho, not a windbreaker. The single highest-leverage piece of bad-weather gear.</li>
          <li><strong>20°F synthetic-fill sleeping bag.</strong> Stays warm when damp. Down does not.</li>
          <li><strong>Sleeping pad with R-value 4 or higher.</strong> Cold ground steals heat fast in wet conditions.</li>
          <li><strong>Tarp + paracord + extra stakes.</strong> A 10x10 tarp over the picnic table is the difference between a usable evening and six hours in the tent.</li>
          <li><strong>Dry bags or contractor trash bags.</strong> For sleeping bags, dry clothes, electronics, the wet tent on the drive home.</li>
          <li><strong>Two changes of socks per person.</strong> Wet feet at sundown is how trips become dangerous.</li>
          <li><strong>NOAA weather radio or weather app with severe-weather alerts on.</strong> Cell coverage at most state parks is spotty — a battery-powered radio works when the phone does not.</li>
          <li><strong>Headlamp per person, plus a spare.</strong> Most weather decisions get made in the dark.</li>
          <li><strong>The ranger station phone number saved offline.</strong> Park status and road closures.</li>
        </ul>

        <h2>Common mistakes when the weather turns</h2>
        <ol>
          <li>
            <strong>Waiting too long to call it.</strong> &ldquo;We will see how it goes&rdquo; is how a 2pm bail becomes an 11pm scramble in the dark. Leave preventively, in daylight.
          </li>
          <li>
            <strong>Treating the tent as shelter.</strong> Tents are not lightning shelters and not severe-weather shelters. The car or a hard-roof building is.
          </li>
          <li>
            <strong>Trying to drive flooded water.</strong> Six inches of moving water can move a car. Wait. The road will reopen.
          </li>
          <li>
            <strong>Splitting the party.</strong> One person at the tent, one at the bathroom, one in the car during a storm — do not do this. Stay together.
          </li>
          <li>
            <strong>Skipping the rain layers because the forecast was clear.</strong> A clear-weekend forecast can revise overnight. Pack rain gear every trip.
          </li>
        </ol>

        <h2>Simple gear setup for weather-uncertain trips</h2>
        <p>
          A bad-weather-ready kit. The differences from a normal kit are in the rain layers, the synthetic-fill bag, and the tarp. Everything else stays the same.
        </p>
        <ul>
          <li>
            <strong>Tent.</strong>{' '}
            <a href="https://amzn.to/4sUKHJs" rel="nofollow sponsored noopener" target="_blank">
              Coleman Sundome 4-Person
            </a>{' '}
            (~$116). Full-coverage rainfly, sealed seams. Pitch with every guy-out staked.
          </li>
          <li>
            <strong>Sleeping bag.</strong>{' '}
            <a href="https://amzn.to/4mVpMom" rel="nofollow sponsored noopener" target="_blank">
              Kelty Tuck 20
            </a>{' '}
            (~$95). 20°F synthetic fill — handles damp without losing insulation.
          </li>
          <li>
            <strong>Sleeping pad.</strong>{' '}
            <a href="https://amzn.to/4vG4xdY" rel="nofollow sponsored noopener" target="_blank">
              TETON Sports ComfortLite
            </a>{' '}
            (~$75). High R-value lifts you off cold wet ground.
          </li>
          <li>
            <strong>Stove.</strong>{' '}
            <a href="https://amzn.to/4uc7DVG" rel="nofollow sponsored noopener" target="_blank">
              Coleman 1-Burner Propane Stove
            </a>{' '}
            (~$40). Lights in wind, runs in light rain.
          </li>
          <li>
            <strong>Cooler.</strong>{' '}
            <a href="https://amzn.to/4d3oHXX" rel="nofollow sponsored noopener" target="_blank">
              Coleman Classic Rolling Cooler
            </a>{' '}
            (~$107). Wheels matter when you are wet-packing.
          </li>
          <li>
            <strong>Lighting.</strong>{' '}
            <a href="https://amzn.to/4tz86RT" rel="nofollow sponsored noopener" target="_blank">
              Consciot LED Camping Lantern (2-pack)
            </a>{' '}
            (~$30). One on the picnic table, one inside the tent. Most decisions get made after dark.
          </li>
          <li>
            <strong>Headlamp.</strong>{' '}
            <a href="https://amzn.to/4mXLRTe" rel="nofollow sponsored noopener" target="_blank">
              Black Diamond Spot 400
            </a>{' '}
            (~$50). Waterproof rated for real weather.
          </li>
          <li>
            <strong>Camp chair.</strong>{' '}
            <a href="https://amzn.to/4e8dK8O" rel="nofollow sponsored noopener" target="_blank">
              GCI Outdoor Freestyle Rocker
            </a>{' '}
            (~$80). The chair you actually want under a covered tarp.
          </li>
          <li>
            <strong>Rain layers, tarp, weather radio.</strong> Real waterproof rain jacket + rain pants per person, 10x10 tarp + 50 ft paracord + 4 extra stakes, NOAA weather radio or weather app with alerts on. Brand-agnostic essentials.
          </li>
        </ul>
        <p>
          <Link href="/gear" className="font-medium underline underline-offset-4">View Full Gear Setup →</Link>
        </p>

        <h2>Where this fits in the larger plan</h2>
        <p>
          A weather-shifted trip is a trip-three problem, not a trip-one problem. If your first or second trip was clear, you have not yet had to make these calls under pressure. Build the bad-weather muscle on a{' '}
          <Link href="/plans/first-weekend-camp">First Weekend Camp</Link> in the shoulder season — short enough to bail cleanly, long enough that the forecast might shift. The{' '}
          <Link href="/plans/easy-family-basecamp">Easy Family Basecamp</Link> is the right call for a forecast you trust; do not pick it for a forecast that is uncertain.
        </p>
        <p>
          See also: <Link href="/guides/rainy-camping-trips">Rainy Camping Trips</Link> for the more contained version of the same problem, and{' '}
          <Link href="/guides/spring-camping-for-beginners">Spring Camping for Beginners</Link> for the season most weather-shift drama happens in.
        </p>

        <h2>Frequently asked</h2>
        <h3>Where do I shelter during a thunderstorm?</h3>
        <p>
          A hard-roof building first, your car second. Tents are not lightning-safe.
        </p>
        <h3>How close is too close for lightning?</h3>
        <p>
          The 30-30 rule: thunder under 30 seconds after a flash means under 6 miles — be in shelter. Stay 30 minutes after the last thunder.
        </p>
        <h3>When should I bail versus stay?</h3>
        <p>
          Bail when you have lost critical gear, when severe weather is forecast in the next 6 hours, or when anyone shows hypothermia signs. Stay for uncomfortable-but-manageable weather.
        </p>
        <h3>What if the road is closed and I cannot leave?</h3>
        <p>
          Move to higher, safer ground, stage gear in the car, tell a ranger, and wait it out. Most closures clear in 12–24 hours. Never drive flooded water.
        </p>
        <h3>What is the most important bad-weather gear?</h3>
        <p>
          Real waterproof rain layers — jacket and pants — for every person in the party. Hypothermia is possible at 50°F when you are wet.
        </p>
        <h3>How do I know when to pack up?</h3>
        <p>
          At the first hard signal: forecast revision, flash flood watch, gusts that lift the tarp, close lightning. Earlier is always cleaner.
        </p>
      </GuidePage>
      <GuideArticleCTA />
      <RelatedGuides currentSlug="camping-when-the-weather-turns" />
    </>
  )
}
