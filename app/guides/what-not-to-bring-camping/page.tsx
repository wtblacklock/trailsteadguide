import Link from 'next/link'
import { GuidePage } from '@/components/guide/GuidePage'
import { QuickAnswer } from '@/components/guide/QuickAnswer'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import GuideGearShelf from '@/components/guide/GuideGearShelf'
import AmazonLink from '@/components/affiliate/AmazonLink'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/guides/what-not-to-bring-camping'
const TITLE = 'What Not to Bring Camping: 15 Things to Leave Home'
const META_TITLE = 'What Not to Bring Camping (15 Things)'
const DESCRIPTION =
  'What not to bring camping: firewood from home, cotton layers, glass, drones, fireworks, untested gear and 9 more, plus what to pack instead of each one.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1455763916899-e8b50eca9967?w=1400&auto=format&fit=crop&q=80'

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
            q: 'What should you not bring camping?',
            a: 'Leave home firewood from more than a short drive away, cotton as your warm layer, glass bottles, fireworks, drones for national parks, valuables, gear you have never tested, fuel-burning heaters for inside the tent, and a car full of extra clothes, toys, and kitchen gadgets. Most of these are either against the rules, a safety problem, or simply weight that makes setting up and packing out harder.',
          },
          {
            q: 'Can you bring your own firewood camping?',
            a: 'Often not from far away, and it is better not to. Firewood can carry invasive insects such as the emerald ash borer, which cannot travel far on their own but can ride hundreds of miles in a car. Many parks and several states restrict moving firewood. The standard advice is to buy it where you burn it, from the campground or a local seller near it.',
          },
          {
            q: 'Can you fly a drone at a campground?',
            a: 'Not in a national park. The National Park Service has prohibited launching, landing, or operating drones on land and water it manages since 2014, apart from limited permitted exceptions. State parks and other public land set their own rules, so check before you pack one, and remember that a drone over a full campground bothers other campers even where it is allowed.',
          },
          {
            q: 'Are fireworks allowed at campgrounds?',
            a: 'Not on federal land. Fireworks are always prohibited on national forest land, and they are not allowed in national parks either. Other campgrounds set their own rules, but expect a no, especially during dry weather or a burn ban.',
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
        slug="what-not-to-bring-camping"
        eyebrow="Packing"
        title="What Not to Bring Camping: 15 Things to Leave Home"
        lede="Every packing list tells you what to add. This one tells you what to take out: the things that break rules, cause trouble, or just fill the car and make every setup and pack-out slower."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'A single small tent glowing from a light inside below desert cliffs at dusk',
        }}
        dateModified="2026-10-06"
      >
        <QuickAnswer
          tldr="Leave firewood from home, cotton warm layers, glass, fireworks, drones, valuables, untested gear, and the extra stuff. Bring the simpler version of each."
          summary="The things not to bring camping fall into three groups. Some are against the rules or the law: firewood carried in from far away, fireworks (always banned on national forest land and in national parks), and drones in national parks. Some are a safety problem: fuel-burning heaters used inside a tent, food and scented toiletries kept in the tent in bear country, glass that breaks on a rocky site, and cotton as your only warm layer. The rest are just too much: extra outfits, every pot in the kitchen, a bin of toys, valuables, and gear you have never set up. For each one there is a simpler thing to pack instead."
        />

        <p>
          This is the counter-list to our{' '}
          <Link href="/guides/weekend-camping-packing-list">weekend camping packing list</Link>. Use
          that list to make sure the essentials are in the car, then use this one to take things
          out.
        </p>

        <h2>Against the rules (or the law)</h2>

        <h3>1. Firewood from home</h3>
        <p>
          Firewood is one of the main ways tree-killing insects and diseases move around the
          country. Pests like the emerald ash borer cannot travel far on their own, but they can
          ride hundreds of miles in a trunk, and new infestations are often found first in
          campgrounds. Many parks and several states restrict moving firewood. The rule of thumb
          from the{' '}
          <a href="https://www.dontmovefirewood.org/" target="_blank" rel="noopener noreferrer">
            Don&apos;t Move Firewood
          </a>{' '}
          campaign is simple: buy it where you burn it.
        </p>
        <p>
          <strong>Bring instead:</strong> cash for a bundle at the campground or a nearby store,
          plus a reliable way to light it, such as{' '}
          <AmazonLink productId="uco-stormproof-matches" pageSlug="what-not-to-bring-camping" /> or{' '}
          <AmazonLink productId="esbit-fire-cubes" pageSlug="what-not-to-bring-camping" />. Local
          wood is sometimes damp, and a good starter matters more than the wood. See{' '}
          <Link href="/guides/how-to-start-a-campfire">how to start a campfire</Link>.
        </p>

        <h3>2. Fireworks</h3>
        <p>
          Fireworks and other pyrotechnics are always prohibited on national forest land, and the
          Forest Service treats violations seriously, with fines and possible jail time. They are
          not allowed in national parks either. Other campgrounds set their own rules, but plan on a
          no, especially in a dry season or during{' '}
          <Link href="/guides/camping-during-a-burn-ban">a burn ban</Link>.
        </p>
        <p>
          <strong>Bring instead:</strong> glow sticks. A bulk pack of{' '}
          <AmazonLink productId="glow-stick-necklaces-bulk" pageSlug="what-not-to-bring-camping" />{' '}
          lights up an evening for kids with no fire risk at all.
        </p>

        <h3>3. A drone, if you are headed to a national park</h3>
        <p>
          The National Park Service has prohibited launching, landing, or flying drones on the
          land and water it manages since 2014, with only limited permitted exceptions. State parks
          and national forests set their own rules, so check before you pack one. Even where flying
          is legal, a buzzing drone over a full campground is one of the quickest ways to annoy
          your neighbors.
        </p>

        <h2>A safety problem</h2>

        <h3>4. A fuel-burning heater for inside the tent</h3>
        <p>
          Propane heaters, camp stoves, charcoal, and fuel lanterns all produce carbon monoxide,
          which you cannot see or smell, and a tent lets it build up while everyone sleeps. Do not
          plan on heating a tent with any of them. The honest options are covered in{' '}
          <Link href="/guides/tent-heater-safety">tent heater safety</Link>.
        </p>
        <p>
          <strong>Bring instead:</strong> a warmer sleep system. A closed-cell foam pad such as the{' '}
          <AmazonLink productId="therm-a-rest-z-lite-sol" pageSlug="what-not-to-bring-camping" />{' '}
          under your usual pad does more for a cold night than most heaters, and a box of{' '}
          <AmazonLink productId="hothands-hand-warmers-bulk" pageSlug="what-not-to-bring-camping">
            hand warmers
          </AmazonLink>{' '}
          covers cold fingers in the morning. For a cold forecast, read{' '}
          <Link href="/guides/camping-in-40-degree-weather">camping in 30 and 40 degree weather</Link>
          .
        </p>

        <h3>5. Food and scented toiletries in the tent</h3>
        <p>
          You will bring snacks, toothpaste, and sunscreen, but they do not belong in the tent
          overnight. Animals from raccoons to bears follow their noses, and in bear country many
          campgrounds require all food and scented items to be locked in a car or a food locker.
          Check the rules where you are staying, and see{' '}
          <Link href="/guides/camping-in-bear-country-with-kids">camping in bear country with kids</Link>{' '}
          for the full routine.
        </p>

        <h3>6. Glass bottles and jars</h3>
        <p>
          Glass breaks on picnic tables, rocky tent pads, and cooler lids, and broken glass in the
          grass is a real hazard for kids and dogs walking around barefoot or in sandals. Some parks,
          beaches, and rivers ban glass containers outright.
        </p>
        <p>
          <strong>Bring instead:</strong> cans, plastic jars, and reusable bottles. Decant sauces and
          condiments into small plastic containers at home.
        </p>

        <h3>7. Cotton as your warm layer</h3>
        <p>
          Jeans and a cotton hoodie feel fine at 4 p.m. and miserable at 10 p.m. Cotton soaks up
          sweat, dew, and campfire-side drizzle, and it stops insulating once it is damp. A cotton
          T-shirt on a warm afternoon is fine. Cotton as the thing that keeps you warm at night is
          not.
        </p>
        <p>
          <strong>Bring instead:</strong> a fleece or synthetic jacket, a warm hat, and a dry set of
          synthetic or wool layers kept just for sleeping.
        </p>

        <h3>8. Gear you have never set up</h3>
        <p>
          A tent pitched for the first time in the dark, a stove whose fuel fitting does not match,
          an air mattress with a slow leak, or brand-new boots on a long hike are some of the most
          common ways a first trip goes sideways. It is the second item on our list of{' '}
          <Link href="/guides/first-time-camping-mistakes">first-time camping mistakes</Link> for a
          reason.
        </p>
        <p>
          <strong>Bring instead:</strong> the same gear, after one practice run. Pitch the tent in
          the yard, boil a pot of water on the stove, and sleep one night on the pad. A{' '}
          <Link href="/guides/backyard-camping-with-kids">backyard campout</Link> covers all three
          at once.
        </p>

        <h2>Just too much</h2>

        <h3>9. A full outfit for every day, plus spares</h3>
        <p>
          Clothes are the most overpacked category on almost every family trip. For a weekend, each
          person needs what they wear on the drive, one change of clothes, a warm layer, rain gear,
          a dry set for sleeping, and extra socks. Socks and underwear are the only things worth
          doubling.
        </p>

        <h3>10. Every pot in the kitchen</h3>
        <p>
          A camp kitchen needs one pot, one pan, a spatula, tongs, a knife, a cutting board, and
          plates and utensils for everyone. The waffle iron, the extra mixing bowls, and the third
          frying pan make cleanup the longest job of the trip. Plan meals that use one pot or one
          pan, like the ones in{' '}
          <Link href="/guides/easy-family-camping-meals">easy family camping meals</Link>, and pack
          a compact set such as the{' '}
          <AmazonLink productId="thtybros-cookware-mess-kit" pageSlug="what-not-to-bring-camping" />
          .
        </p>

        <h3>11. A bin of toys and screens</h3>
        <p>
          Kids at a campsite play with sticks, rocks, dirt, and each other for hours. The bin of
          toys from home gets scattered, lost under the tent, or ignored. Bring a few open-ended
          things instead: a deck of cards, a ball, a{' '}
          <AmazonLink productId="peterson-first-guide-trees" pageSlug="what-not-to-bring-camping">
            pocket tree guide
          </AmazonLink>
          , and a set of{' '}
          <AmazonLink productId="carpathen-smores-sticks" pageSlug="what-not-to-bring-camping">
            roasting sticks
          </AmazonLink>
          . Our <Link href="/activities">camping activities</Link> need almost nothing at all.
        </p>

        <h3>12. Valuables and jewelry</h3>
        <p>
          Rings get lost in the grass, watches get scratched on rocks, and a laptop has no good
          place to live in a tent. Leave jewelry and anything irreplaceable at home, and lock the
          few things you do bring, like wallets and car keys, in the car when you leave the site.
        </p>

        <h3>13. A generator or a big speaker</h3>
        <p>
          Many campgrounds ban generators in tent loops or limit them to a few hours a day, and
          quiet hours, commonly 10 p.m. to 6 a.m., apply to music too. The noise also carries much
          farther across a quiet campground than you expect.
        </p>
        <p>
          <strong>Bring instead:</strong> a{' '}
          <AmazonLink productId="anker-zolo-power-bank" pageSlug="what-not-to-bring-camping" /> for
          phones and headlamps, and a{' '}
          <AmazonLink productId="luminaid-packlite-max" pageSlug="what-not-to-bring-camping">
            solar lantern
          </AmazonLink>{' '}
          for the picnic table.
        </p>

        <h3>14. One big flashlight for the whole family</h3>
        <p>
          The single family flashlight is always in the wrong person&apos;s hand. Everyone needs
          their own light, especially kids walking to the bathhouse after dark.
        </p>
        <p>
          <strong>Bring instead:</strong> a headlamp per person. A{' '}
          <AmazonLink productId="everbrite-headlamp-5-pack" pageSlug="what-not-to-bring-camping" />{' '}
          costs about the same as one premium headlamp.
        </p>

        <h3>15. Disposable everything</h3>
        <p>
          Paper plates blow away, plastic cutlery snaps, and a weekend of single-use items fills a
          trash bag that you then have to store away from animals and carry out. Reusable plates
          and cups wash in a minute and pack flat. If you do bring disposables, bring a{' '}
          <AmazonLink productId="fwc-trash-can-wakeman" pageSlug="what-not-to-bring-camping">
            lidded collapsible trash can
          </AmazonLink>{' '}
          so the trash does not end up spread across the site overnight.
        </p>

        <h2>A quick way to edit your pile</h2>
        <p>
          Before loading the car, lay everything out by category and ask one question about each
          item: will we definitely use this, and is there nothing else that does the same job? If
          the answer is not a clear yes, it stays home. The{' '}
          <Link href="/guides/first-camping-trip-checklist">first camping trip checklist</Link> is
          deliberately short for the same reason, and the{' '}
          <Link href="/guides/family-camping-gear-list">family camping gear list</Link> shows what
          is worth buying when you are building a kit from scratch.
        </p>

        <h2>Frequently asked</h2>
        <h3>What should you not bring camping?</h3>
        <p>
          Firewood from far away, cotton as your warm layer, glass, fireworks, a drone for a
          national park, valuables, untested gear, fuel-burning heaters for inside the tent, and
          more clothes, toys, and kitchen gear than you will use.
        </p>
        <h3>Can you bring your own firewood camping?</h3>
        <p>
          Usually not from far away. Firewood can spread invasive insects, and many parks and
          several states restrict moving it. Buy it at or near the campground.
        </p>
        <h3>Can you fly a drone at a campground?</h3>
        <p>
          Not in a national park, where drones have been prohibited since 2014 apart from limited
          permitted exceptions. Other public land sets its own rules, so check first.
        </p>
        <h3>Are fireworks allowed at campgrounds?</h3>
        <p>
          Not on federal land: they are always banned on national forest land and not allowed in
          national parks. Other campgrounds set their own rules, but expect a no.
        </p>
      </GuidePage>
      <GuideGearShelf
        guideSlug="what-not-to-bring-camping"
        heading="What to pack instead"
      />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="what-not-to-bring-camping" />
    </>
  )
}
