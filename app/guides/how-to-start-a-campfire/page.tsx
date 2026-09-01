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

const SLUG = '/guides/how-to-start-a-campfire'
const TITLE = 'How to Start a Campfire'
const META_TITLE = 'How to Start a Campfire (Complete Guide)'
const DESCRIPTION =
  'How to start a campfire from checking for fire bans to lighting it: gathering materials, picking a structure, wet-weather backups, and putting it out safely.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1464808646948-8f732deb6e4b?w=1400&auto=format&fit=crop&q=80'

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
            q: 'Do I need special tools to start a campfire?',
            a: 'No - a lighter or matches, tinder, kindling, and fuel wood are all you need. Stormproof matches and fire starter cubes are worth carrying as backups for wind or damp conditions, but they\'re not required for a normal, dry-conditions fire.',
          },
          {
            q: 'How long does it take for a campfire to become cookable coals?',
            a: 'About 30-45 minutes from ignition. A fire with visible flames is too hot and unpredictable to cook over - wait until it burns down to a bed of glowing orange coals with no active flame.',
          },
          {
            q: 'What if my firewood is wet?',
            a: 'Split it - wet wood is usually only wet on the surface, and splitting exposes dry wood underneath. Build a larger-than-usual tinder and kindling base, since wet fuel needs more sustained heat to catch, and consider a fire starter cube to buy extra time. See fire in wet conditions for the full technique.',
          },
          {
            q: 'Is it legal to build my own fire ring?',
            a: 'Usually not at developed campgrounds, which require using the existing ring or grate provided at the site. On dispersed public land, rules vary by area and season - check current fire restrictions before assuming an open fire is allowed at all.',
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
        slug="how-to-start-a-campfire"
        eyebrow="How-to"
        title="How to Start a Campfire"
        lede="Checking before you build, gathering materials, picking a structure, and the order that actually catches - plus what to do when everything is wet."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'A campfire with a teepee log structure burning at night',
        }}
      >
        <QuickAnswer
          tldr="Check for fire bans and use an existing ring, gather tinder/kindling/fuel before lighting, build a teepee for quick heat, and have water ready first."
          summary="Starting a campfire well comes down to preparation, not the actual lighting. Check fire restrictions and use an existing ring or grate - most developed campgrounds require it. Gather tinder, kindling, and fuel wood before striking anything; running out mid-build is the most common first-timer mistake. A teepee structure lights fastest and gives quick heat; a log cabin structure burns longer and is better for building toward cooking coals. Have water or a shovel within reach before you light anything, and never leave a fire unattended, even for a few minutes."
        />

        <h2>Check before you build</h2>
        <p>
          Before gathering a single stick, confirm a fire is actually allowed. Check current fire
          restrictions for the area - many regions suspend all open fires during dry seasons, and
          the penalty for an illegal fire is a real fine, not a warning. At a developed campground,
          use the fire ring or grate already at the site rather than building a new one; most
          campgrounds require this, and it&apos;s also just safer - that ring exists because
          someone already checked the ground and clearance around it.
        </p>
        <p>
          Confirm the ring is at least 10 feet from your tent and any overhanging branches, and
          clear a few feet of ground around it down to bare dirt if it isn&apos;t already.
        </p>

        <h2>Gather your materials before you light anything</h2>
        <p>
          Running out of kindling halfway through a build is the single most common first-fire
          mistake - by the time you scramble to find more, the tinder has burned out and you&apos;re
          starting over. Gather more than feels necessary: a double handful of tinder, kindling
          from pencil- to thumb-width, and fuel wood from wrist- to forearm-width, all before
          striking a match. See <Link href="/skills/fire/tinder-and-kindling">tinder and kindling</Link>{' '}
          for what actually catches and where to find it at most campsites.
        </p>

        <h2>Pick a structure</h2>
        <p>
          A teepee structure - kindling leaned into a cone shape over tinder - lights fastest and
          throws heat quickly, the right call for warmth or boiling water fast. A log cabin
          structure - fuel wood stacked in a squared-off frame - takes longer to establish but
          burns down into a steady, even coal bed better suited for cooking. Full build details for
          both are in <Link href="/skills/fire/fire-structures">fire structures</Link>.
        </p>

        <h2>Lighting it</h2>
        <p>
          Light the tinder at its base, not the top, so the flame climbs up into the kindling as it
          catches. Add kindling gradually as the flame establishes - smothering a small flame with
          too much fuel too fast is the second most common mistake. Once kindling is reliably
          burning, add fuel wood a piece or two at a time. The full order and technique is in{' '}
          <Link href="/skills/fire/starting-a-fire">starting a fire</Link>.
        </p>

        <h2>When everything is wet</h2>
        <p>
          Wet wood is usually only wet on the surface - splitting it open exposes dry wood
          underneath, which is often enough on its own. Build a larger tinder and kindling base
          than you would in dry conditions, since damp fuel needs more sustained heat to catch. A
          stormproof match or fire starter cube buys real time here - both burn hot enough to dry
          out slightly damp kindling as they go. Full technique in{' '}
          <Link href="/skills/fire/fire-in-wet-conditions">fire in wet conditions</Link>.
        </p>

        <h2>Getting to cookable coals</h2>
        <p>
          A fire with visible flame is too hot and unpredictable to cook over - it burns the
          outside of food before the inside is done. Let the fire burn down to a bed of
          glowing orange coals with no active flame, which typically takes 30-45 minutes from
          ignition. That&apos;s the point to start foil packets, a pie iron, or anything else going
          directly into the coals - see{' '}
          <Link href="/guides/campfire-recipes-for-kids">campfire recipes for kids</Link> for
          exactly what to cook once you&apos;re there.
        </p>

        <h2>Fire safety with kids around</h2>
        <p>
          Establish a perimeter around the ring that kids don&apos;t cross without an adult, and
          keep water or a shovel within reach the entire time the fire is burning, not just at
          lighting. The full rule set - the ones that don&apos;t change trip to trip - is in{' '}
          <Link href="/skills/fire/fire-safety-rules">fire safety rules</Link>.
        </p>

        <h2>Putting it out</h2>
        <p>
          A fire isn&apos;t out when the flames are gone - coals hold enough heat to reignite or
          burn a foot for hours after they stop glowing visibly. Drown it, stir the ashes, drown it
          again, and repeat until the whole ring is cool enough to touch with a bare hand. Start
          this process at least 30 minutes before you actually want to leave. Full method in{' '}
          <Link href="/skills/fire/extinguishing-a-fire">extinguishing a fire</Link>.
        </p>

        <h2>Frequently asked</h2>
        <h3>Do I need special tools to start a campfire?</h3>
        <p>
          No - a lighter or matches plus tinder, kindling, and fuel wood cover it. Stormproof
          matches and fire starter cubes are worth carrying as backups for wind or damp conditions.
        </p>
        <h3>How long does it take for a campfire to become cookable coals?</h3>
        <p>
          About 30-45 minutes from ignition. Wait for a bed of glowing coals with no active flame
          before cooking over it.
        </p>
        <h3>What if my firewood is wet?</h3>
        <p>
          Split it to expose dry wood underneath, build a larger tinder and kindling base than
          usual, and consider a fire starter cube to buy extra time catching.
        </p>
        <h3>Is it legal to build my own fire ring?</h3>
        <p>
          Usually not at developed campgrounds, which require the existing ring. On dispersed
          land, check current fire restrictions before assuming an open fire is allowed at all.
        </p>
      </GuidePage>
      <GuidePrintablesBlock guideSlug="how-to-start-a-campfire" />
      <GuideGearShelf guideSlug="how-to-start-a-campfire" heading="Backup fire-starting gear worth carrying" />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="how-to-start-a-campfire" />
    </>
  )
}
