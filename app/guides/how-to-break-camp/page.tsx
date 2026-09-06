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

const SLUG = '/guides/how-to-break-camp'
const TITLE = 'How to Break Camp'
const META_TITLE = 'How to Break Camp (Complete Guide)'
const DESCRIPTION =
  'How to break camp the right way: putting the fire out cold, packing a dry tent, the site sweep for Leave No Trace, and loading the car in a smart order.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1526491109672-74740652b963?w=1400&auto=format&fit=crop&q=80'

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
            a: 'It is out when the ashes are cool enough to touch with a bare hand, not just when the flames are gone. Drown it, stir the ashes, drown it again, and repeat until there is no heat or hissing left. Start this at least 30 minutes before you plan to leave, since coals can hold enough heat to reignite for hours after they stop glowing.',
          },
          {
            q: 'Do you need to pack up a tent that is wet?',
            a: 'Yes, if it is the only way to leave on time, but never store it wet for longer than the drive home. Shake off what you can, roll it loosely instead of stuffing it tight, and set it up in a garage or over a fence within a day to dry completely. A wet tent left balled up in its bag for a week grows mold and mildew that ruins the fabric for good.',
          },
          {
            q: 'What is the fastest way to break camp with kids?',
            a: 'Give kids the low-stakes jobs first: collecting trash and checking the ground for stray toys or gear, while adults handle the fire and the tent, the two jobs that actually need attention. Pack the car the night before with everything except what is still in use, so morning is just the tent, the cooler, and the drive.',
          },
          {
            q: 'What should you never leave behind at a campsite?',
            a: 'Trash and food scraps, even small ones like fruit peels or twist ties, which draw wildlife to the site for the next camper. Microtrash, things like bottle caps, zip ties, and bits of foil, is the easiest to miss in a quick walk-through, so do a slow final sweep of the ground where the tent and cook area stood before you drive off.',
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
        slug="how-to-break-camp"
        eyebrow="How-to"
        title="How to Break Camp"
        lede="Fire out cold, tent packed dry, trash gone, and the car loaded once instead of twice. The order that turns a rushed teardown into a calm one."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'A tent packed up at a quiet campsite overlooking water and mountains in early morning light',
        }}
      >
        <QuickAnswer
          tldr="Fire out first since it needs real cooldown time, then trash and the cooler, then the tent, then a slow walk of the site, then load the car in reverse-need order."
          summary="Breaking camp well comes down to sequencing, not effort. Put the fire out first, since a bed of coals needs real time to cool completely, and never leave that step until last. Deal with the cooler and trash next: toss spoiled food and melted ice, and bag trash tight enough that a walk to the dumpster does not leave a trail behind it. Break the tent down third, once nothing else needs the ground it is sitting on, and never pack it away wet for longer than the drive home, since mold sets in within a day. Finish with a slow walk of the site looking for stakes, bottle caps, and other microtrash that is easy to miss, then load the car in reverse-need order so the first thing you will want at home comes out last. Doing the non-essential packing the night before turns a rushed morning into a calm one."
        />

        <h2>Why the order matters</h2>
        <p>
          Breaking camp out of order is how families end up repacking the car twice, driving back
          for a phone charger left in a tent pocket, or getting home with a wet tent balled up
          inside a trash bag. The sequence below works the same for a one-night stay or a five-day
          trip: fire first, because it needs a real cooldown; food and trash next, while there is
          still daylight to see what spilled where; the tent third, once nothing else needs the
          ground it is sitting on; then a final sweep before the car gets loaded.
        </p>

        <h2>The order, step by step</h2>
        <ol>
          <li>
            <strong>Put the fire out completely.</strong> Start this first and give it time to
            work while everything else gets done.
          </li>
          <li>
            <strong>Handle the cooler, food, and trash.</strong> Toss what spoiled, seal what did
            not, and bag trash before it has a chance to blow around or draw animals in.
          </li>
          <li>
            <strong>Break down the tent.</strong> Shake it out, dry it as much as conditions allow,
            and pack it so it is not the thing holding up the whole departure.
          </li>
          <li>
            <strong>Walk the site once more.</strong> Look at the ground where the tent and cook
            area stood, not just the surface of the picnic table.
          </li>
          <li>
            <strong>Load the car in reverse-need order.</strong> The last thing you packed should
            be the first thing you need at home.
          </li>
        </ol>

        <h2>Put the fire out completely, first</h2>
        <p>
          A fire is not out when the flames disappear. Coals hold enough heat to reignite or burn
          a bare foot for hours after they stop glowing, so this has to start well before you
          actually plan to leave, not as the last thing before pulling out. Drown it, stir the
          ashes so no dry pocket is hiding underneath, drown it again, and repeat until the whole
          ring is cool enough to touch with a bare hand. The full method, including what to do when
          water is limited, is in{' '}
          <Link href="/guides/how-to-start-a-campfire">how to start a campfire</Link>, and the
          complete safety technique is in{' '}
          <Link href="/skills/fire/extinguishing-a-fire">extinguishing a fire</Link>.
        </p>

        <h2>Cooler, food, and trash</h2>
        <p>
          Do this while the fire is cooling rather than after, since it is the one job that
          genuinely can happen in parallel. Drain the cooler and toss anything that spent the trip
          above a safe temperature, along with the last of the melted ice. Seal what is left, and
          bag trash tight, including anything small: fruit peels, twist ties, and foil wrappers
          draw wildlife to a site just as fast as a full bag left open. See{' '}
          <Link href="/guides/how-to-pack-a-cooler">how to pack a cooler</Link> for the packing
          side of this same routine on the way in.
        </p>

        <h2>Break down the tent, dry if you can</h2>
        <p>
          Reverse the setup order: guylines and stakes first, then the rainfly, then collapse the
          poles. Shake out dirt and debris before it gets folded in. If the tent is wet, it is fine
          to pack it that way to get on the road, but never store it wet for longer than the drive
          home, since mold and mildew set in within a day and ruin the fabric permanently. Hang it
          in a garage or over a fence to finish drying as soon as you get home. The full setup
          walkthrough, including this same teardown step in more detail, is in{' '}
          <Link href="/guides/how-to-set-up-a-tent">how to set up a family tent</Link>. If this is
          the last trip of the season, the drying step becomes the first move in{' '}
          <Link href="/guides/how-to-store-camping-gear">
            how to store camping gear for the off-season
          </Link>
          .
        </p>

        <h2>The site sweep: Leave No Trace and what gets forgotten</h2>
        <p>
          Walk the exact footprint where the tent and cook area stood, not just the picnic table
          and the ground around the car. Tent stakes, phone chargers, and kids&apos; small toys are
          the most commonly left-behind items, and they are hardest to spot once the tent is down
          and the ground looks empty again. Microtrash, bottle caps, zip ties, bits of foil, is
          the other easy miss: it looks like nothing until the next camper finds it. The{' '}
          <Link href="/printables/leave-no-trace-quick-reference">
            Leave No Trace quick reference
          </Link>{' '}
          is worth keeping in the glovebox as a standing checklist for this exact walk-through.
        </p>

        <h2>Load the car so you do not have to unpack again</h2>
        <p>
          Pack in reverse order of need: things you will not touch again until you unload at home
          go in first and deepest, and anything you might need on the drive, snacks, chargers,
          a change of clothes for a car-sick kid, stays out or goes in last, on top. Keep wet or
          muddy gear separate from everything else, in a trash bag or a tarp, so it does not
          soak into dry bags on the ride home.
        </p>

        <h2>Timing it: the night-before shortcut</h2>
        <p>
          The single biggest time-saver is doing the non-essential packing the evening before you
          leave: games, extra chairs, anything not actively in use that night. That leaves morning
          for exactly three things: the fire, the tent, and the final sweep. This matters even more
          on a busy checkout morning like the one after{' '}
          <Link href="/guides/labor-day-weekend-camping">Labor Day weekend</Link>, when every site
          in a popular campground is trying to break camp and hit the road within the same
          two-hour window.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li>
            <strong>Leaving the fire until last.</strong> It needs the most cooldown time of
            anything on this list, so it has to start first, not squeezed in right before you
            drive away.
          </li>
          <li>
            <strong>Packing a wet tent and forgetting about it.</strong> Fine for the drive home,
            not fine for a week in the garage. Set a reminder to unpack and dry it the same day.
          </li>
          <li>
            <strong>Skipping the final sweep.</strong> A site that looks clean from the picnic
            table often is not clean at ground level, where stakes and microtrash actually hide.
          </li>
          <li>
            <strong>Packing the car with no order at all.</strong> Loading whatever is closest
            first almost always buries something you need on the drive underneath everything
            else.
          </li>
        </ul>

        <h2>Frequently asked</h2>
        <h3>How do you know a campfire is completely out?</h3>
        <p>
          It is out when the ashes are cool enough to touch with a bare hand. Drown it, stir the
          ashes, drown it again, and repeat until there is no heat or hissing left.
        </p>
        <h3>Do you need to pack up a tent that is wet?</h3>
        <p>
          Yes if it is the only way to leave on time, but never store it wet for longer than the
          drive home. Dry it completely the same day to avoid mold and mildew.
        </p>
        <h3>What is the fastest way to break camp with kids?</h3>
        <p>
          Give kids the low-stakes jobs, trash and a ground check, while adults handle the fire
          and tent. Pack the car the night before with everything not still in use.
        </p>
        <h3>What should you never leave behind at a campsite?</h3>
        <p>
          Trash and food scraps, which draw wildlife, and microtrash like bottle caps and foil
          bits, which are the easiest things to miss in a quick walk-through.
        </p>
      </GuidePage>
      <GuidePrintablesBlock guideSlug="how-to-break-camp" />
      <GuideGearShelf guideSlug="how-to-break-camp" heading="Gear that makes breaking camp faster" />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="how-to-break-camp" />
    </>
  )
}
