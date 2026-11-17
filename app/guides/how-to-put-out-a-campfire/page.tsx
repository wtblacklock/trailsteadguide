import Link from 'next/link'
import { GuidePage } from '@/components/guide/GuidePage'
import { QuickAnswer } from '@/components/guide/QuickAnswer'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import GuideGearShelf from '@/components/guide/GuideGearShelf'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'
import AmazonLink from '@/components/affiliate/AmazonLink'

const SLUG = '/guides/how-to-put-out-a-campfire'
const TITLE = 'How to Put Out a Campfire Completely'
// SEO-optimized <title>; H1/headline keep TITLE.
const META_TITLE = 'How to Put Out a Campfire Completely'
const DESCRIPTION =
  'How to put out a campfire the right way: drown, stir, and feel, how much water it takes, why dirt and snow fall short, and how to give kids a real job.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1763249102450-446388dfc3e7?w=1400&auto=format&fit=crop&q=80'

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
            q: 'How do you know a campfire is completely out?',
            a: 'Hold the back of your hand just above the ashes, then over the rocks of the ring, then carefully touch the stirred ashes and any leftover wood. If anything is warm, it is not out: add more water, stir again, and check again. There should be no steam, no hissing, no smoke, and no glowing bits when you stir to the bottom of the ring. The Smokey Bear rule is simple: if it is too hot to touch, it is too hot to leave.',
          },
          {
            q: 'How much water does it take to put out a campfire?',
            a: 'More than most people expect. A typical family campfire that has burned all evening usually needs several gallons, often two or three full buckets, poured slowly and stirred in between. Keep a full bucket or water jug next to the ring from the moment you light the fire, and refill it before you start putting the fire out so you are not walking to the spigot in the dark halfway through.',
          },
          {
            q: 'Can you put out a campfire with dirt instead of water?',
            a: 'Only when you truly have no water, and even then it takes care. Burying a fire under dirt can trap hot coals that keep smoldering for many hours and can burn through roots or flare up later. If you must use dirt or sand, mix it into the embers while stirring, never just pile it on top, and keep stirring and feeling until everything is cool. Water is always the better choice.',
          },
          {
            q: 'How long before bedtime should I start putting out the campfire?',
            a: 'Stop adding wood about an hour before bed or before you plan to leave, so the fire burns down to small coals and ash. Then give yourself at least 20 to 30 minutes for the drown, stir, and feel process itself. Big logs that are still burning take the longest, so let the fire burn small rather than trying to drown a roaring fire at the last minute.',
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
        slug="how-to-put-out-a-campfire"
        eyebrow="How-to"
        title={TITLE}
        lede="A campfire is not out when the flames are gone. Here is the drown, stir, and feel method, how much water to have ready, and how to make it the kids' favorite job of the night."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'A small campfire burning down on a wide bed of white ash inside a ring of stones at dusk',
        }}
        dateModified="2026-11-04"
      >
        <QuickAnswer
          tldr="Let the fire burn small, then drown it with water, stir the ashes, drown it again, and feel for heat. If it is too hot to touch, it is too hot to leave."
          summary="To put out a campfire completely, use the drown, stir, and feel method the U.S. Forest Service and Smokey Bear teach. Stop adding wood about an hour before bed so the fire burns down to coals. Pour water slowly over every ember until the hissing stops, then stir the ashes and coals with a stick or shovel to expose hidden heat, scrape the burnt ends off any logs, and drown everything again. Finally, hold the back of your hand over the ashes and rocks and carefully feel them. If anything is still warm, repeat. Expect to use several gallons of water, often two or three full buckets. Do not bury a fire with dirt, since buried coals can smolder for hours, and do not count on snow or a light rain to do the job. Never leave a fire unattended, even for a quick walk."
        />

        <h2>Why gone is not the same as out</h2>
        <p>
          A fire that stopped flaming an hour ago can still be sitting on coals hot enough to burn
          a hand or reignite in a gust of wind. Ash insulates those coals, so the top of the ring
          can look gray and dead while the bottom is still glowing. Escaped campfires are one of
          the common human causes of wildfires, and many of them start from fires the campers
          believed were out.
        </p>
        <p>
          Fall and early winter make this easy to underestimate. Leaves are dry and piling up
          around fire rings, nights are colder so families build bigger and longer fires, and it is
          dark by the time anyone thinks about bed. The method below works in any season. It just
          matters more right now.
        </p>

        <h2>Plan the ending when you light it</h2>
        <p>
          Putting a fire out well starts before you light it. Fill a bucket or water jug and set it
          next to the ring before the first match, the same habit covered in{' '}
          <Link href="/guides/how-to-start-a-campfire">how to start a campfire</Link>. A collapsible
          bucket like the{' '}
          <AmazonLink productId="eurow-collapsible-bucket-10l">Eurow 10 liter bucket</AmazonLink>{' '}
          folds flat in the bin and holds about two and a half gallons. If your site&apos;s spigot is
          a long walk away, a large water jug parked by the fire saves trips in the dark.
        </p>
        <p>
          Then stop feeding the fire about an hour before bedtime or before you plan to leave. A
          fire that has burned down to small coals and ash goes out in a fraction of the time and
          water that a fire with two fresh logs on it needs.
        </p>

        <h2>Step 1: Drown it</h2>
        <p>
          Pour water slowly over the whole fire, not just the glowing center. Start at the edges and
          work in, and keep pouring until the hissing and popping stop. Pouring slowly matters for
          two reasons: it soaks the coals instead of running off, and it keeps the cloud of steam
          and ash manageable. Steam can scald, so stand back and upwind, pour from arm&apos;s length,
          and keep kids a few steps behind you for this part.
        </p>

        <h2>Step 2: Stir it</h2>
        <p>
          Now take a sturdy stick or a small shovel and stir the wet ashes and coals all the way to
          the bottom of the ring. This is the step most people skip, and it is the one that finds
          the heat. Turn over every coal, break up clumps, and scrape the blackened ends off any
          log that is left, since logs hold heat in their charred outer layer. Roll larger pieces
          over and wet all sides. Check the rocks of the ring too, and under the cooking grate if
          there is one.
        </p>

        <h2>Step 3: Drown it again</h2>
        <p>
          Stirring always uncovers coals the first round of water missed. Pour again over
          everything you just turned over, until there is no hiss and no steam. On a big fire that
          burned all evening, expect to repeat stir and drown two or three times. Several gallons
          in total is normal.
        </p>

        <h2>Step 4: Feel it</h2>
        <p>
          Hold the back of your hand just above the ashes, then over the rocks. If you feel no
          heat, carefully touch the stirred ashes, the wet wood, and the stones of the ring. Smokey
          Bear&apos;s line is the one to remember: if it is too hot to touch, it is too hot to leave.
          Anything warm gets more water and more stirring. When the whole ring is cold to the touch
          and you see no smoke or steam, the fire is out.
        </p>

        <h2>Why dirt and snow fall short</h2>
        <p>
          Throwing dirt on a fire smothers the flames, which makes it look finished, but it can
          trap live coals underneath. Buried coals can smolder for many hours, creep along roots,
          and surprise the next campers or flare up when wind uncovers them. If you truly have no
          water, mix dirt or sand into the embers while stirring rather than piling it on top, and
          keep stirring and feeling until everything is cool.
        </p>
        <p>
          Snow is better than nothing but less reliable than it looks. It melts into a thin layer
          of water on top of the coals, and the coals underneath keep burning. A light rain does
          the same thing. Treat both as help, not as the job done, and still drown, stir, and feel.
        </p>

        <h2>Give kids a real job</h2>
        <p>
          Kids love putting the fire out, and turning it into their job is the best way to teach
          them it matters. Younger kids can carry small containers of water from the jug and help
          count buckets. Older kids can pour under supervision, and a careful nine or ten year old
          can do the stirring with a long stick while you watch. Keep the touch test for an adult,
          and let kids do the &quot;back of the hand&quot; hover check over the rocks once the ring
          is cool.
        </p>
        <p>
          Do it with headlamps on. A bright headlamp such as the{' '}
          <AmazonLink productId="black-diamond-spot-400">Black Diamond Spot 400</AmazonLink> makes
          it much easier to spot a last orange glow at the bottom of the ring. Keep a basic first
          aid kit near the fire for small burns, and run any burn under cool water right away.
        </p>

        <h2>Morning fires and breaking camp</h2>
        <p>
          Fires feel safest in daylight, which is exactly when people leave them. A breakfast fire
          or a fire someone restarted from last night&apos;s coals needs the same full drown, stir,
          and feel before you pack the car. Put it on the list right next to taking down the tent:
          our <Link href="/guides/how-to-break-camp">how to break camp</Link> guide puts the fire
          check near the start, so it is never the rushed last task. A small fire extinguisher
          spray such as{' '}
          <AmazonLink productId="first-alert-ez-fire-spray">First Alert EZ Fire Spray</AmazonLink>{' '}
          is handy for a sudden flare-up, but it is a backup, not a way to put a campfire out.
        </p>
        <p>
          Propane fire pits are simpler: close the valve on the tank as well as the knob on the
          pit, let it cool, and check that the burner is not still hot before covering it. They
          are also the fire you are most likely to be allowed during restrictions, which{' '}
          <Link href="/guides/camping-during-a-burn-ban">camping during a burn ban</Link> covers in
          detail.
        </p>

        <h2>If a fire gets away from you</h2>
        <p>
          If embers have spread outside the ring and you cannot put them out quickly with the water
          you have, get everyone away from the fire and call 911. Tell the dispatcher which
          campground and site you are at. Then let the camp host know. A small spot fire caught in
          the first minute is easy; trying to fight a growing one with a bucket is not a job for a
          family.
        </p>

        <h2>Frequently asked</h2>
        <h3>How do you know a campfire is completely out?</h3>
        <p>
          Feel it. Hover the back of your hand over the ashes and rocks, then carefully touch the
          stirred ashes and leftover wood. No heat, no steam, no hiss, and no glow when you stir to
          the bottom means it is out. If it is too hot to touch, it is too hot to leave.
        </p>
        <h3>How much water does it take to put out a campfire?</h3>
        <p>
          Usually several gallons for a family fire that burned all evening, often two or three
          full buckets, poured slowly with stirring in between.
        </p>
        <h3>Can you put out a campfire with dirt instead of water?</h3>
        <p>
          Only when you have no water. Burying a fire can trap coals that smolder for hours. Mix
          dirt or sand into the embers while stirring, never just pile it on, and feel for heat
          before you leave.
        </p>
        <h3>How long before bedtime should I start putting out the campfire?</h3>
        <p>
          Stop adding wood about an hour before bed, then plan on 20 to 30 minutes for the drown,
          stir, and feel process.
        </p>
      </GuidePage>
      <GuideGearShelf guideSlug="how-to-put-out-a-campfire" heading="Gear that makes putting the fire out easy" />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="how-to-put-out-a-campfire" />
    </>
  )
}
