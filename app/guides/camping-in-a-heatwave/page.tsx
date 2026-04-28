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

const SLUG = '/guides/camping-in-a-heatwave'
const TITLE = 'Camping in a Heatwave'
// SEO-optimized <title>; H1/headline keep TITLE.
const META_TITLE = 'Camping in a Heatwave — Shade & Hydration'
const DESCRIPTION =
  'Camping in a heatwave: shade siting, hydration math, electrolytes, and the line where you reschedule. Avoid the heat-stroke mistakes first-timers make.'
const HERO_IMAGE = 'https://images.unsplash.com/photo-1592190057402-2bf1ee02118d?w=1400&auto=format&fit=crop&q=80'

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
            { name: 'Scenario Camping', url: `${SITE_URL}/guides/scenario` },
            { name: TITLE, url: `${SITE_URL}${SLUG}` },
          ],
        })}
      />
      <JsonLd
        data={faqPageGraph([
          {
            q: 'Should I cancel a camping trip if a heatwave is forecast?',
            a: 'For first-timers, yes — reschedule when daytime highs are forecast above 95°F or overnight lows above 78°F for multiple consecutive days. The tent becomes unusable in heat, sleep is broken, and the small mistakes that beginners make in normal weather become dangerous in a heatwave. For experienced campers, a heatwave trip is camp-able with shade, water, and an early-morning/late-evening rhythm — but it stops being a relaxing trip and starts being a managed one.',
          },
          {
            q: 'How much water do I need in a heatwave?',
            a: 'A minimum of 1 gallon per person per day for drinking, doubled in extreme heat or with active hiking. Plus another 2 gallons per person per day for cooking, dishes, and basic cleanup. For a family of four on a two-night trip in a heatwave: 16 gallons of water in the car. Do not assume the campground spigot will keep up with peak demand — bring it.',
          },
          {
            q: 'What is the most important piece of heatwave camping gear?',
            a: 'A 10x10 ft canopy or shade tarp. The most-used piece of gear at a hot-weather campsite is shade. The picnic table, the cooler, the sleeping kids — all need to be under shade from 11am to 6pm. Without it, the campsite is uninhabitable mid-day.',
          },
          {
            q: 'Can I sleep in a tent in 90°F+ heat?',
            a: 'Sometimes, with the right setup. A mesh-bodied tent with the rainfly off and good cross-ventilation is sleepable in dry heat with a 75°F night. In humid heat with overnight lows above 78°F, even the right tent does not cool down — and a hammock with a tarp, a cabin, or sleeping in the car with windows cracked becomes a better choice. Listen to the night-time forecast more than the daytime one.',
          },
          {
            q: 'When should I leave a hot trip early?',
            a: 'When you or someone in your party shows heat exhaustion or heatstroke signs: heavy sweating that suddenly stops, headache, nausea, confusion, vomiting, very high body temperature. Leave to air conditioning immediately and seek medical attention if symptoms persist. Leave preventively if a sustained 100°F+ stretch is forecast and your shade or water situation is marginal.',
          },
          {
            q: 'Is the desert worse than the forest in a heatwave?',
            a: 'Different problems. Desert heat is dry and intense in the daytime but cools sharply overnight — a 105°F day can be a 65°F night, which is a sleepable tent. Forest heat is humid, cooler in the day but the overnight low stays high — 95°F day to 78°F night means a tent that never cools. The desert is harder to be outside in midday; the forest is harder to sleep through.',
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
        slug="camping-in-a-heatwave"
        eyebrow="Heatwave"
        title="Camping in a Heatwave"
        lede="Shade strategy, hydration math, and the line where you reschedule the trip."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'Sun-baked desert mountains rising under a bright summer sky',
        }}
      >
        <QuickAnswer
          tldr="Reschedule if highs are above 95°F with overnight lows above 78°F for multiple days — especially for a first trip."
          summary="A heatwave is multi-day extreme heat that doesn't let up at night, and it changes camping from uncomfortable to a managed risk. For a first trip, reschedule when daytime highs over 95°F and overnight lows over 78°F are forecast for multiple days — the tent never cools and sleep breaks down. If you go, the most-used piece of gear is a 10×10 ft canopy. Run the day backwards from heat: outside hours are dawn (5:30am–9am) and dusk (4–9pm), with shade and water from 11am–4pm. Plan 16–20 gallons of water for a family of four on two nights, plus electrolyte tabs — plain water alone in heavy sweat causes cramps and headaches. Know the line between heat exhaustion (act immediately) and heatstroke (911)."
        />
        <h2>The honest call on heatwave camping</h2>
        <p>
          A heatwave is not a normal hot weekend. It is a multi-day stretch of heat that does not let up at night, and it changes camping from &ldquo;a little uncomfortable&rdquo; to &ldquo;a managed risk.&rdquo; First-timers should not learn to camp in a heatwave — the tent becomes unusable, sleep breaks down, and small mistakes get amplified.
        </p>
        <ul>
          <li><strong>Daytime highs over 95°F + overnight lows over 78°F + several consecutive days = reschedule, especially for a first trip.</strong> These nights do not cool the tent down, and sleep deprivation compounds.</li>
          <li><strong>Daytime 90–95°F + nights below 75°F = camp-able with shade, water, and an early-morning/late-evening rhythm.</strong> The tent cools down enough at night to sleep.</li>
          <li><strong>Desert heatwave = different problem than forest heatwave.</strong> Desert is brutal mid-day, sleepable at night. Forest is more bearable mid-day but the night never cools.</li>
          <li><strong>Always option:</strong> reschedule. The trip happens; it just shifts to a different weekend.</li>
        </ul>

        <h2>Pick the right site for heat</h2>
        <h3>Site features that make heatwave camping survivable</h3>
        <ul>
          <li><strong>Shade.</strong> Mature tree cover at the picnic table and the tent pad — not just at the parking spot. Walk the site at noon, not at check-in. The tree shadow at 9am is not where it is at 2pm.</li>
          <li><strong>Elevation.</strong> Every 1,000 ft of elevation drops the temperature by about 3.5°F. A campground at 4,000 ft is meaningfully cooler than the same area at 1,000 ft.</li>
          <li><strong>Water access.</strong> A swimmable river, lake, or creek at the campground turns mid-day from &ldquo;hide in the tent&rdquo; into &ldquo;float in cool water.&rdquo; This is the single best heatwave amenity.</li>
          <li><strong>Real bathrooms with running water.</strong> Cold-water hand-rinse, drinking fountains, the option to soak a bandana — all matter more in heat.</li>
          <li><strong>Electric hookup, if available.</strong> A small box fan or a battery-powered fan in the tent at night is the difference between sleeping and not sleeping.</li>
        </ul>

        <h3>What to avoid</h3>
        <ul>
          <li>Treeless desert sites — Joshua Tree, Big Bend lowland, Death Valley — in active heatwave. These are spring/fall trips, not summer ones.</li>
          <li>South-facing exposures with no shade. The tent is in full sun from 9am onward.</li>
          <li>Black-pavement parking pads that radiate heat into the night.</li>
          <li>RV parks with all sites in a treeless gravel lot.</li>
        </ul>

        <h2>Shade — the whole strategy</h2>
        <p>
          The single most-used piece of gear at a hot campsite is a 10x10 ft canopy or shade tarp. Without it, the picnic table is uninhabitable from 11am to 6pm. With it, you have a covered outdoor room, the cooler stays cooler, and the kids have somewhere to be that is not the tent.
        </p>
        <h3>Canopy setup for heat</h3>
        <ul>
          <li>Pitch over the picnic table, oriented to block afternoon sun (3pm direction is hotter than noon direction).</li>
          <li>Add a side panel or a beach tarp on the sun-facing side — direct horizontal sun is what cooks you, not vertical sun.</li>
          <li>If the site has trees, use the canopy to extend shade where the trees do not reach. Combination shade is cooler than any single source.</li>
          <li>Stake every leg. Heat afternoons spawn sudden gusty thunderstorms; an unstaked canopy leaves the site like a kite.</li>
          <li>Reflective sunshade for the car windshield. The car becomes a 140°F box without it.</li>
        </ul>

        <figure className="not-prose my-12">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-stone-100">
            <Image
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&auto=format&fit=crop&q=80"
              alt="A road winding between red rock canyon walls in dry desert heat"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              unoptimized
            />
          </div>
          <figcaption className="mt-3 text-sm text-stone-500 italic">
            Shade is the whole strategy in heat country. The canopy and the picnic-table tarp are the most-used gear at any hot-weather campsite.
          </figcaption>
        </figure>

        <h2>Hydration — the math nobody runs</h2>
        <p>
          People bring half the water they need and run out by the second afternoon. Hot-weather hydration is a calculation, not a vibe.
        </p>
        <h3>How much water for a heatwave trip:</h3>
        <ul>
          <li><strong>Drinking:</strong> 1 gallon per adult per day, 2 gallons in extreme heat or active hiking. Half a gallon per kid; full gallon if active.</li>
          <li><strong>Cooking and dishes:</strong> 1–2 gallons per person per day.</li>
          <li><strong>Hand-washing, hygiene, dog water:</strong> 1 gallon per person per day.</li>
          <li><strong>Buffer:</strong> 2 gallons per trip for emergencies and drive-home water.</li>
        </ul>
        <p>
          For a family of four on a two-night heatwave trip: roughly <strong>16–20 gallons of water in the car.</strong> Pack it in 5-gallon jugs at the bottom of the trunk, plus a 2-gallon dispenser for the picnic table.
        </p>

        <h3>Electrolytes — not optional</h3>
        <ul>
          <li>Sweating in 95°F+ heat strips out salt and potassium faster than water alone replaces. Dehydration headaches and muscle cramps are the warning sign.</li>
          <li>Electrolyte tabs (LMNT, Liquid IV, Nuun, Gatorade powder) — one per adult per day, more if hiking.</li>
          <li>Salty snacks count: jerky, pretzels, nut mixes with salt.</li>
          <li>Watch for over-hydration with low electrolytes — drinking lots of plain water without salt can cause hyponatremia, which feels like dehydration but is the opposite. The fix is salt, not more water.</li>
        </ul>

        <h2>Heat exhaustion and heatstroke — what to watch for</h2>
        <p>
          Heat exhaustion is the warning. Heatstroke is the emergency. Knowing the difference and acting on the warning prevents the emergency.
        </p>
        <h3>Heat exhaustion (act now):</h3>
        <ul>
          <li>Heavy sweating with cool, clammy skin.</li>
          <li>Headache, dizziness, nausea, weakness.</li>
          <li>Pulse fast and weak.</li>
          <li>Cramping in legs or stomach.</li>
        </ul>
        <p><strong>Action:</strong> move to shade or air conditioning, lie flat with feet up, drink electrolyte water in small sips, wet skin with cool water and fan. Recovery is usually 30–60 minutes. If symptoms worsen, treat as heatstroke.</p>

        <h3>Heatstroke (medical emergency):</h3>
        <ul>
          <li>High body temperature (above 103°F).</li>
          <li>Hot, red, dry skin — sweating has stopped.</li>
          <li>Confusion, slurred speech, loss of consciousness.</li>
          <li>Rapid strong pulse.</li>
          <li>Vomiting.</li>
        </ul>
        <p><strong>Action:</strong> call 911 or drive to the nearest ER immediately. While waiting or driving, cool the person — wet skin, ice in armpits and groin, fan air. Heatstroke kills; treat it as the emergency it is.</p>

        <h2>Daily rhythm for a heat trip</h2>
        <p>
          Run the day backwards from the heat. Active outside hours are dawn and dusk. Mid-day is for shade, water, and rest.
        </p>
        <ul>
          <li><strong>5:30am:</strong> wake up. The coolest hour of the day.</li>
          <li><strong>6–9am:</strong> hike, paddle, fish, photograph. The trip happens here.</li>
          <li><strong>9–11am:</strong> breakfast at the campsite under the canopy. Refill water bottles for the day.</li>
          <li><strong>11am–4pm:</strong> shade and water. Float in the river, nap in the tent at peak heat (still warm but tolerable with a fan), read, play cards. This is not wasted time — it is survival rhythm.</li>
          <li><strong>4–7pm:</strong> the second outdoor block. Light dinner prep, swim, evening walk.</li>
          <li><strong>7–9pm:</strong> dinner, sit, talk. The temperature drops noticeably after sundown.</li>
          <li><strong>9–10pm:</strong> tent prep — door open, fan on, bedding kicked back. Sleep with minimum layers.</li>
        </ul>

        <h2>What to bring (heatwave-specific)</h2>
        <h3>Add</h3>
        <ul>
          <li>10x10 ft canopy + side panel or sunshade for direct sun blocking.</li>
          <li>20+ gallons of water for a family of four on a two-night trip.</li>
          <li>Battery-powered tent fan or 12V box fan if you have power. Sleep changer.</li>
          <li>Electrolyte tabs (1 per adult per day, plus extra).</li>
          <li>Reflective car sunshade. Keeps the car under 130°F.</li>
          <li>Lightweight long-sleeve sun shirts and wide-brim hats. Dark cotton T-shirts cook you.</li>
          <li>Cooling towel — soaked in cool water, draped on the back of the neck.</li>
          <li>Block ice in the cooler, not cubed. Block ice lasts 2–3 days; cubes are gone by day one.</li>
          <li>A second cooler — one for drinks (opened constantly), one for food (stays closed).</li>
        </ul>

        <h3>Skip or downsize</h3>
        <ul>
          <li>Heavy sleeping bags. A 50–60°F bag or a sheet is enough.</li>
          <li>Heavy jackets. Even early-morning chill rarely needs more than a long-sleeve shirt.</li>
          <li>Open-fire dependence. Most heatwaves coincide with burn bans — bring the propane stove.</li>
        </ul>

        <h2>Common heatwave mistakes</h2>
        <ol>
          <li>
            <strong>Treating the daytime forecast as the trip forecast.</strong> Daytime 95°F + nighttime 75°F is camp-able. Daytime 95°F + nighttime 80°F is a different trip — the tent never cools.
          </li>
          <li>
            <strong>Underpacking water.</strong> Most first-timers bring half what they need. The math is straightforward — run it for your party size and the trip length.
          </li>
          <li>
            <strong>Skipping electrolytes.</strong> Plain water alone in heavy sweat strips salt and triggers cramps and headaches even when you are drinking plenty.
          </li>
          <li>
            <strong>Pitching the tent in full sun.</strong> A tent in direct sun by 9am is unusable until sundown. Walk the site at noon to find the real shadow.
          </li>
          <li>
            <strong>Taking a kid hike at 11am.</strong> Kids overheat faster than adults and report it later. Hike at dawn or after 5pm; never midday.
          </li>
        </ol>

        <h2>Simple gear setup for hot-weather camping</h2>
        <p>
          A heat-calibrated kit. The shade gear is more important than the sleep gear.
        </p>
        <ul>
          <li>
            <strong>Tent.</strong>{' '}
            <AmazonLink productId="fwc-tent-sundome" pageSlug="camping-in-a-heatwave" />{' '}
            (~$116). Full mesh inner is the part that matters in heat. Stake the rainfly off the body for max airflow.
          </li>
          <li>
            <strong>Shade.</strong>{' '}
            <AmazonLink productId="canopy-camp" pageSlug="camping-in-a-heatwave" />{' '}
            (~$130). Two minutes to set up; runs the whole hot stretch of the day.
          </li>
          <li>
            <strong>Stove.</strong>{' '}
            <AmazonLink productId="fwc-stove-coleman-1burner" pageSlug="camping-in-a-heatwave" />{' '}
            (~$40). Works under burn bans, which open fires do not.
          </li>
          <li>
            <strong>Cooler.</strong>{' '}
            <AmazonLink productId="fwc-cooler-rolling" pageSlug="camping-in-a-heatwave" />{' '}
            (~$107). Wheels matter when the parking lot is a long walk in 95°F.
          </li>
          <li>
            <strong>Lighting.</strong>{' '}
            <AmazonLink productId="fwc-lantern-consciot" pageSlug="camping-in-a-heatwave" />{' '}
            (~$30). One on the picnic table, one inside the tent.
          </li>
          <li>
            <strong>Headlamp.</strong>{' '}
            <AmazonLink productId="headlamp-family" pageSlug="camping-in-a-heatwave" />{' '}
            (~$50). Useful for the early-morning dawn hike before it gets hot.
          </li>
          <li>
            <strong>Camp chair.</strong>{' '}
            <AmazonLink productId="fwc-chair-gci-rocker" pageSlug="camping-in-a-heatwave" />{' '}
            (~$80). The chair you actually want under the canopy for the long midday rest.
          </li>
          <li>
            <strong>Hydration.</strong> 5-gallon water jugs (3+ for a family weekend), electrolyte tabs, insulated water bottles, cooling towels.
          </li>
        </ul>
        <p>
          <Link href="/gear" className="font-medium underline underline-offset-4">View Full Gear Setup →</Link>
        </p>

        <h2>The reschedule option</h2>
        <p>
          The most underused tool in heat camping is the calendar. Most heatwaves are 5–10 days. The same campground that is uninhabitable next weekend is comfortable two weekends later. State park reservations can usually be moved with a small fee or no fee. The trip is not lost — it is shifted.
        </p>
        <p>
          For a first trip in particular, the right move is almost always to reschedule. A first-trip win is &ldquo;we want to do this again.&rdquo; A first-trip in 100°F is &ldquo;we are never doing this again.&rdquo; Read the forecast a week out, and if it shows a heat dome, move the trip.
        </p>

        <h2>Where this fits in the larger plan</h2>
        <p>
          The right plan for a heatwave is the smallest one — a{' '}
          <Link href="/plans/backyard-test">Backyard Test</Link> if you have not camped in heat before, or a{' '}
          <Link href="/plans/first-night-camp">First Night Camp</Link> at a park with good shade and water access. Save the{' '}
          <Link href="/plans/easy-family-basecamp">Easy Family Basecamp</Link> for cooler weather; multi-night heatwave trips compound fatigue.
        </p>
        <p>
          See also: <Link href="/guides/summer-camping-for-beginners">Summer Camping for Beginners</Link> for the broader summer playbook, and <Link href="/guides/camping-in-texas-for-beginners">Camping in Texas</Link> or{' '}
          <Link href="/guides/camping-in-the-desert-southwest-for-beginners">Desert Southwest</Link> if you camp in regions where heat is the default summer condition.
        </p>

        <h2>Frequently asked</h2>
        <h3>Should I cancel a trip if a heatwave is forecast?</h3>
        <p>
          For a first trip, yes. Reschedule when daytime highs over 95°F and overnight lows over 78°F are forecast for multiple consecutive days.
        </p>
        <h3>How much water do I need?</h3>
        <p>
          1 gallon per person per day for drinking, doubled in extreme heat. Plus 2 gallons per person per day for cooking and cleanup. For a family of four on a two-night heatwave trip: 16–20 gallons.
        </p>
        <h3>What is the most important heat-camping piece of gear?</h3>
        <p>
          A 10x10 canopy. Without shade the campsite is uninhabitable mid-day.
        </p>
        <h3>Can I sleep in a tent in 90°F+?</h3>
        <p>
          Sometimes — with a full mesh inner, the rainfly off, and an overnight low under 75°F. With overnight lows above 78°F, the tent never cools and sleep breaks down.
        </p>
        <h3>When should I leave a hot trip early?</h3>
        <p>
          When anyone in your party shows heat exhaustion or heatstroke signs. Or preventively if the forecast revises upward and your shade or water situation is marginal.
        </p>
        <h3>Is desert worse than forest in a heatwave?</h3>
        <p>
          Different problems. Desert is brutal mid-day but cools at night. Forest is more bearable mid-day but the night never cools. Pick the one your sleep system can handle.
        </p>
      </GuidePage>
      <GuideArticleCTA />
      <RelatedGuides currentSlug="camping-in-a-heatwave" />
    </>
  )
}
