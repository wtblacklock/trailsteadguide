import Link from 'next/link'
import { GuidePage } from '@/components/guide/GuidePage'
import { QuickAnswer } from '@/components/guide/QuickAnswer'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import GuideGearShelf from '@/components/guide/GuideGearShelf'
import SkillMediaBlock from '@/components/skills/SkillMediaBlock'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'
import AmazonLink from '@/components/affiliate/AmazonLink'

const SLUG = '/guides/tent-heater-safety'
const TITLE = 'Tent Heater Safety'
// SEO-optimized <title>; H1/headline keep TITLE.
const META_TITLE = 'Are Propane Tent Heaters Safe?'
const DESCRIPTION =
  'Are tent heaters safe? Why no fuel-burning heater belongs in a family tent, what oxygen-depletion sensors do and do not cover, and the warm setup to use instead.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1513781419235-2988ecacab83?w=1400&auto=format&fit=crop&q=80'

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
            q: 'Is it safe to use a propane heater inside a tent?',
            a: 'No. Any appliance that burns fuel produces carbon monoxide, and a tent is far too small and too poorly ventilated to keep that gas at a safe level. Carbon monoxide has no smell and no taste, the early symptoms feel like ordinary tiredness or a headache after a long day outside, and people die in tents and campers from it every year. The Consumer Product Safety Commission is direct about it: never use portable propane heaters, camp stoves, lanterns, or charcoal inside a tent, camper, or vehicle. The rule covers the vestibule too, since a zipped vestibule is part of the same enclosed space.',
          },
          {
            q: 'What about a heater with an oxygen-depletion sensor or a tip-over switch?',
            a: 'Those features are real, but they are designed for ventilated spaces such as a garage, a workshop, or an ice-fishing shanty with a vent, not for a sealed nylon room with sleeping children in it. An oxygen-depletion sensor shuts the heater off when oxygen drops, which is a different measurement from carbon monoxide building up, and it does nothing about a heater that starts burning poorly. Manufacturers themselves specify minimum room volumes and fresh-air openings that a family tent cannot provide. Treat these heaters as cabin, garage, or ice-house equipment.',
          },
          {
            q: 'Can I use an electric heater in a tent at a powered campsite?',
            a: 'An electric heater produces no carbon monoxide, so the poisoning risk goes away, but the fire risk does not. Tent fabric, sleeping bags, and loose clothing melt or ignite fast against a hot element, cords get walked on and pinched, and many campgrounds prohibit heaters on their pedestals outright. If you use one, check the campground rules first, run it only while awake, keep three feet of clear space around it, use an outdoor-rated extension cord sized for the load, and never let it run overnight. Plan your sleep system as though the power will fail, because at some point it will.',
          },
          {
            q: 'Do I need a carbon monoxide alarm for camping?',
            a: 'Bring one for any night your family sleeps in an enclosed structure with a fuel appliance in it: a cabin with a wood stove or propane furnace, a yurt, a rented RV or camper van, or a hunting trailer. A small battery-powered alarm costs about $20 and lives in the camping bin year-round. A tent needs no alarm because nothing that burns should ever be in one, though plenty of families carry the alarm anyway and clip it inside a cabin bunkroom the moment they arrive.',
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
        slug="tent-heater-safety"
        eyebrow="Cold nights"
        title="Tent Heater Safety"
        lede="The first cold weekend of the season is when families start searching for a way to heat a tent. The honest answer is that you warm the people, not the air."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'A lit dome tent glowing orange in a mountain meadow at cold blue-hour dusk',
        }}
      >
        <QuickAnswer
          tldr="No fuel-burning heater belongs in a family tent. Warm the people with a real sleep system instead of trying to warm the air."
          summary="Propane heaters, catalytic heaters, camp stoves, lanterns, charcoal, and a grill pulled into the vestibule all burn fuel, and burning fuel in an enclosed space produces carbon monoxide. The gas is odorless, the early symptoms feel like ordinary end-of-day tiredness, and a tent is far too small to give anyone margin for error. Heaters sold with an oxygen-depletion sensor are built for ventilated spaces such as a garage or an ice shanty, not a sealed nylon room with sleeping kids in it. The safe version of a warm night is a warm sleep system: an insulated pad under every person, a bag rated below the forecast low, dry base layers, and a hat. Electric heaters at powered sites remove the poisoning risk but not the fire risk. If you sleep in a cabin, a yurt, or a rented RV, bring a battery-powered carbon monoxide alarm."
        />

        <h2>The one rule: nothing that burns goes in the tent</h2>
        <p>
          This is the part worth reading even if you skip the rest. Every year families look at a
          forecast low in the thirties, look at a propane heater at the hardware store, and reason
          that a short burn before bed with the door cracked will be fine. It is the exact reasoning
          behind the deaths the{' '}
          <a
            href="https://www.cpsc.gov/Safety-Education/Safety-Education-Centers/Carbon-Monoxide-Information-Center/Portable-Heaters--Camping-Equipment"
            rel="nofollow noopener"
            target="_blank"
          >
            Consumer Product Safety Commission
          </a>{' '}
          documents in tents, campers, and vehicles season after season.
        </p>
        <p>The list of things that must stay outside a tent is longer than most people expect:</p>
        <ul>
          <li>Propane and catalytic heaters of every size, including the small portable ones</li>
          <li>Camp stoves, backpacking stoves, and anything else used to &quot;take the chill off&quot;</li>
          <li>Liquid-fuel and propane lanterns, which burn fuel exactly like a stove does</li>
          <li>Charcoal, briquettes, and grills, including ones that look burned out</li>
          <li>Hot rocks or coals from the fire ring carried in to radiate heat</li>
          <li>A generator or a running vehicle anywhere near the tent door</li>
        </ul>
        <p>
          The vestibule counts as inside. Zipping a vestibule closed makes it part of the same
          enclosed volume as the sleeping area, and cooking there in the rain is the most common way
          careful families end up breaking this rule without realizing it.
        </p>

        <h2>Why carbon monoxide is the specific danger</h2>
        <p>
          Carbon monoxide is produced whenever a fuel burns without enough oxygen to burn cleanly,
          which is the normal state of any flame in a small closed space. It has no color, no smell,
          and no taste, so none of the senses that keep people safe around fire give any warning at
          all.
        </p>
        <p>
          The gas binds to hemoglobin hundreds of times more readily than oxygen does, so the blood
          stops carrying oxygen even though breathing feels normal. The early symptoms are headache,
          dizziness, nausea, weakness, and sleepiness, which is a cruel list: every one of them
          reads as a normal end to a long day outdoors, and the response most people have is to lie
          down. Children show effects sooner than adults because they breathe faster relative to
          their body size, and a sleeping person may never wake up at all.
        </p>
        <p>
          The practical consequence is that there is no safe monitoring routine inside a tent. You
          cannot smell a problem, you cannot count on symptoms, and a cracked door does not move
          enough air to matter. The only reliable control is to keep every source of combustion
          outside the fabric.
        </p>

        <SkillMediaBlock
          video={{
            url: 'https://www.youtube-nocookie.com/embed/NQTO1oqrJfs',
            title: 'Tent Stoves and Carbon Monoxide: Safety Tips (CanvasCamp)',
          }}
        />

        <h2>What an oxygen-depletion sensor does and does not cover</h2>
        <p>
          Portable propane heaters are often sold as safe for indoor use because they carry an
          oxygen-depletion sensor, usually written ODS, plus a tip-over shutoff. Both features are
          genuine engineering, and neither makes a tent an appropriate place for one.
        </p>
        <p>
          An ODS measures oxygen dropping, then cuts the gas. Carbon monoxide building up is a
          different measurement, and a heater burning badly can produce a dangerous amount of it
          well before the oxygen level trips the sensor. Manufacturers publish minimum room volumes
          and fresh-air opening requirements for these heaters, and the numbers assume a garage, a
          workshop, an ice-fishing shanty, or a similar space with real ventilation. A four-person
          family tent is a fraction of that volume with a family breathing inside it.
        </p>
        <p>
          The tip-over switch has the same limit. It handles the heater falling over, which is a
          real hazard with kids and guy lines in the dark, but it does nothing about fabric walls
          two feet from a hot element or a sleeping bag that shifts in the night.
        </p>

        <h2>Electric heaters at powered sites</h2>
        <p>
          A powered site changes the question. An electric heater burns nothing, so carbon monoxide
          is off the table, and this is the one heater category that has any place near a tent at
          all. The remaining risk is fire, which is not a small one: tent fabric, bags, and loose
          clothing melt or ignite quickly against a hot element.
        </p>
        <p>If you go this route, the rules are narrow and worth following exactly:</p>
        <ul>
          <li>
            <strong>Check the campground rules first.</strong> Many parks prohibit heaters on their
            electrical pedestals, and the pedestal amperage is often lower than a heater needs.
          </li>
          <li>
            <strong>Only while awake, never overnight.</strong> The whole point of a heater is the
            cold hours, which is exactly when nobody is watching it.
          </li>
          <li>
            <strong>Three feet of clear space</strong> in every direction, on a hard flat surface,
            nowhere near the door people walk through in the dark.
          </li>
          <li>
            <strong>An outdoor-rated extension cord</strong> sized for the load, run where nobody
            trips on it and no water pools on the connection.
          </li>
          <li>
            <strong>Plan for the power failing</strong>, because campground power fails routinely in
            the weather that makes you want a heater. Your sleep system has to work without it.
          </li>
        </ul>

        <h2>The setup that actually keeps a family warm</h2>
        <p>
          Warming the air in a tent is a losing proposition anyway. Single-wall nylon has essentially
          no insulation value, so every watt of heat you produce leaves within minutes of the source
          going off. Warming the people works, and it works all night without supervision.
        </p>
        <ol>
          <li>
            <strong>Insulation under every person.</strong> Body weight crushes a sleeping bag flat
            underneath, so the ground pulls heat out for eight straight hours. A self-inflating pad
            such as the{' '}
            <AmazonLink productId="mondoking-3d-pad" pageSlug="tent-heater-safety" /> is the single
            highest-value cold-night purchase. Look for an R-value near 4 or above.
          </li>
          <li>
            <strong>A bag rated below the forecast low.</strong> Ratings are survival numbers, not
            comfort numbers, so leave yourself margin. A liner like the{' '}
            <AmazonLink productId="vumos-bag-liner" pageSlug="tent-heater-safety" /> adds roughly 10
            to 15°F to a bag you already own for a fraction of the price of a new one.
          </li>
          <li>
            <strong>Dry base layers, dry socks, and a hat.</strong> Merino or synthetic, never
            cotton, and never the clothes anyone wore all day.
          </li>
          <li>
            <strong>Calories before bed.</strong> Digestion produces real heat, and a kid who went
            to sleep hungry runs cold no matter how good the gear is.
          </li>
          <li>
            <strong>Hand warmers for the margin.</strong> An air-activated warmer such as{' '}
            <AmazonLink productId="hothands-hand-warmers-bulk" pageSlug="tent-heater-safety" />{' '}
            tucked into the foot of a bag inside a sock, never against bare skin.
          </li>
        </ol>
        <p>
          <Link href="/guides/how-to-keep-kids-warm-camping">How to keep kids warm camping</Link>{' '}
          walks through the full ground-up system and what to do when a child wakes up cold at 2
          a.m., and{' '}
          <Link href="/guides/best-camping-sleeping-bag-for-kids">
            best camping sleeping bag for kids
          </Link>{' '}
          covers how bag ratings translate to real overnight lows. If the forecast is genuinely
          below freezing,{' '}
          <Link href="/guides/winter-camping-for-beginners">winter camping for beginners</Link>{' '}
          makes the case for a cabin instead, which is the right answer more often than families
          expect.
        </p>

        <h2>Where a carbon monoxide alarm does belong</h2>
        <p>
          A tent needs no alarm, because nothing that burns should be in one. The alarm is for the
          nights your family sleeps in an enclosed structure that does have a fuel appliance: a
          cabin with a wood stove or a propane furnace, a yurt, a rented RV or camper van, or a
          bunkhouse you have never seen before. Rentals are the real gap. You have no idea when the
          furnace was last serviced or whether the alarm on the wall still has a battery in it.
        </p>
        <p>
          A battery-powered unit such as the{' '}
          <AmazonLink productId="kidde-portable-co-alarm" pageSlug="tent-heater-safety" /> costs
          about $20, needs no wiring, and lives in the camping bin year-round. Put it at sleeping
          height in the room where people sleep, test it when you arrive, and pull the batteries
          when the gear goes into off-season storage so they cannot leak, the same as with every
          other battery in the kit. See{' '}
          <Link href="/guides/how-to-store-camping-gear">how to store camping gear</Link> for that
          end-of-season pass.
        </p>

        <h2>Symptoms, and what to do</h2>
        <p>
          Everyone in the party should know the pattern, because the person best placed to notice it
          is often the one affected. Suspect carbon monoxide when more than one person has the same
          symptoms at the same time, especially if they improve outdoors and return inside.
        </p>
        <ul>
          <li>Headache, dizziness, or a dull pressure behind the eyes</li>
          <li>Nausea or vomiting with no obvious cause</li>
          <li>Weakness, confusion, or clumsiness</li>
          <li>Sleepiness that is out of proportion to the day</li>
        </ul>
        <p>
          If you suspect it, get everyone out into fresh air first and count heads. Do not stop to
          find the source, open windows, or pack anything. Call 911 or the local emergency number
          from outside, and get anyone who is confused, unsteady, unconscious, or pregnant seen by
          medical staff even if they feel better in the open air. Do not go back inside for gear
          until a responder says the space is clear.
        </p>
        <p>
          The mirror-image situation is worth naming too. A family that gets genuinely cold has a
          real problem, and{' '}
          <Link href="/guides/fall-camping-for-beginners">fall camping for beginners</Link> covers
          the seasonal turn that catches people out. The answer is still a warmer sleep system, a
          heated car for twenty minutes, or ending the trip early. Nobody has ever regretted driving
          home at midnight.
        </p>

        <h2>Frequently asked</h2>
        <h3>Is it safe to use a propane heater inside a tent?</h3>
        <p>
          No. Burning fuel in an enclosed space produces carbon monoxide, which is odorless and
          kills people in tents and campers every year. The rule covers stoves, lanterns, charcoal,
          and the vestibule as well as the sleeping area.
        </p>
        <h3>What about a heater with an oxygen-depletion sensor or a tip-over switch?</h3>
        <p>
          Those features are designed for ventilated spaces such as a garage or an ice-fishing
          shanty, with minimum room volumes a family tent cannot meet. An oxygen sensor also
          measures something different from carbon monoxide building up.
        </p>
        <h3>Can I use an electric heater in a tent at a powered campsite?</h3>
        <p>
          It removes the poisoning risk but not the fire risk. Check campground rules, run it only
          while awake, keep three feet of clear space, use an outdoor-rated cord, and build a sleep
          system that works when the power fails.
        </p>
        <h3>Do I need a carbon monoxide alarm for camping?</h3>
        <p>
          Bring one for cabins, yurts, rented RVs, and anywhere else your family sleeps with a fuel
          appliance. A tent needs no alarm because nothing that burns should ever be inside one.
        </p>
      </GuidePage>
      <GuideGearShelf
        guideSlug="tent-heater-safety"
        heading="Gear for a warm night without a heater"
      />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="tent-heater-safety" />
    </>
  )
}
