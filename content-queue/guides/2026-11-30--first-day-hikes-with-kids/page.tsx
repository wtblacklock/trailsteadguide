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

const SLUG = '/guides/first-day-hikes-with-kids'
const TITLE = 'First Day Hikes With Kids'
const META_TITLE = 'First Day Hikes With Kids on January 1'
const DESCRIPTION =
  'First Day Hikes with kids: how the New Year\'s Day state park hikes work, how to find a guided one near you, and what to pack for a cold January 1 morning.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1611735547606-7b45fe8b137d?w=1400&auto=format&fit=crop&q=80'

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
            q: 'What are First Day Hikes?',
            a: 'First Day Hikes is a New Year\'s Day program in which state parks across the country host hikes on January 1, coordinated nationally by America\'s State Parks. It began in Massachusetts in 1992 and has grown into a nationwide tradition with events in every state. Many hikes are led by rangers or volunteers and are short, family-friendly walks, while some parks also suggest self-guided routes for the day.',
          },
          {
            q: 'How do I find a First Day Hike near me?',
            a: 'Start with the America\'s State Parks website, which collects First Day Hikes listings from around the country, and your own state park agency\'s website or events calendar. Most parks post their New Year\'s Day hikes in December. Each listing usually gives the meeting place, start time, distance, terrain, and whether you need to register, so read it closely and sign up early if registration is required, because popular hikes can fill.',
          },
          {
            q: 'Are First Day Hikes good for young kids?',
            a: 'Many are. Plenty of parks offer short guided walks of a mile or two on easy trails, and some are stroller-friendly or fully accessible. Read the listing for distance and terrain, pick a hike that matches the shortest legs in the family, and plan on a slow pace with stops. A guided hike is especially good with kids, because the ranger stops to point things out and the kids get breaks without asking for them.',
          },
          {
            q: 'What should kids wear on a New Year\'s Day hike?',
            a: 'Layers that are not cotton: a synthetic or wool base layer, a fleece or puffy jacket, and a windproof or waterproof shell, plus a warm hat, gloves, warm socks, and waterproof boots. Bring a spare pair of gloves and socks for each child, because snow and puddles soak them fast. Dress kids so they are slightly cool at the start, since they warm up quickly once they move, and add a layer every time you stop.',
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
        slug="first-day-hikes-with-kids"
        eyebrow="New Year's Day"
        title="First Day Hikes With Kids"
        lede="Every January 1, state parks across the country open their trails for First Day Hikes, many of them guided and short enough for small legs. It is one of the easiest outdoor family traditions to start, and now, a month ahead, is the time to plan it."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'A leaf-covered dirt trail winding through a forest dusted with fresh snow',
        }}
        dateModified="2026-11-30"
      >
        <QuickAnswer
          tldr="On January 1, state parks nationwide host First Day Hikes. Find one on the America's State Parks site or your state park website in December, register if needed, and pack layers, snacks, and something warm to drink."
          summary="First Day Hikes is a New Year's Day tradition in which state parks across the country host hikes on January 1, coordinated nationally by America's State Parks. It started in Massachusetts in 1992 and now happens in every state. Many hikes are guided by a ranger or volunteer and are short, family-friendly walks, which makes them a great fit for kids. To find one, check the America's State Parks website and your state park agency's events page, where most listings appear in December. Read each listing for distance, terrain, start time, and whether registration is required, and sign up early if it is. Then plan for a cold morning: non-cotton layers, a warm hat and gloves, spare socks, snacks, and a thermos of cocoa. January 1, 2027 falls on a Friday, so it can anchor a long holiday weekend."
        />

        <h2>What First Day Hikes are</h2>
        <p>
          First Day Hikes is a simple idea: start the new year outside. On New Year&apos;s Day, state
          parks across the country host hikes, and America&apos;s State Parks, the national group for
          state park systems, coordinates and promotes them. The tradition began in Massachusetts in
          1992 and grew into a nationwide event with hikes in every state.
        </p>
        <p>
          What each park offers varies. Common types include:
        </p>
        <ul>
          <li>
            <strong>Guided hikes.</strong> A ranger, naturalist, or volunteer leads the group and
            stops along the way to talk about wildlife, history, or the landscape. These are the
            best choice with kids.
          </li>
          <li>
            <strong>Self-guided hikes.</strong> Some parks suggest a trail for the day and let you
            walk it on your own schedule, which works well for families with nap times to protect.
          </li>
          <li>
            <strong>Themed walks.</strong> Some parks run birding walks, history hikes, or
            accessible strolls on paved paths.
          </li>
        </ul>
        <p>
          Some parks add extras such as a campfire or hot drinks at the trailhead, but that varies
          from park to park, so check the listing rather than counting on it.
        </p>

        <h2>How to find one near you</h2>
        <ol>
          <li>
            <strong>Check the America&apos;s State Parks website.</strong> It gathers First Day
            Hikes information from around the country and points you to each state&apos;s listings.
          </li>
          <li>
            <strong>Check your state park agency&apos;s site.</strong> Most state systems post their
            New Year&apos;s Day hikes on their events calendar in December. Searching for
            &ldquo;First Day Hikes&rdquo; plus your state usually finds the page.
          </li>
          <li>
            <strong>Read the listing closely.</strong> Note the meeting spot, start time, distance,
            terrain, whether dogs or strollers are allowed, and whether you need to register.
          </li>
          <li>
            <strong>Register early if required.</strong> Popular guided hikes near cities can fill
            up. If the listing asks you to sign up, do it the day you decide.
          </li>
          <li>
            <strong>Check again on December 31.</strong> Winter weather can cancel or change a hike,
            and parks usually post updates on the same page.
          </li>
        </ol>
        <p>
          For a broader look at parks worth getting to know, see{' '}
          <Link href="/guides/best-state-parks-for-families">the best state parks for families</Link>.
        </p>

        <h2>Picking the right hike for your kids</h2>
        <p>
          The best First Day Hike for a family is the one that ends with everyone wanting to do it
          again next year. That usually means picking shorter than you think.
        </p>
        <ul>
          <li>
            <strong>Match the shortest legs.</strong> A mile or two is plenty for preschoolers on a
            cold morning, especially with snow or mud underfoot.
          </li>
          <li>
            <strong>Prefer a loop.</strong> On an out-and-back, the walk back can feel twice as long
            to a tired kid.
          </li>
          <li>
            <strong>Check the start time.</strong> A late-morning or early-afternoon hike is far
            easier on kids than one at sunrise, and it is a lot warmer.
          </li>
          <li>
            <strong>Look for a restroom at the trailhead.</strong> The listing or the park map will
            usually show one.
          </li>
          <li>
            <strong>Bring the stroller or carrier only if the listing allows it.</strong> Some hikes
            are on paved or accessible paths, others are on rocky trail.
          </li>
        </ul>
        <p>
          The general rules for reading trail difficulty and kid pacing are in{' '}
          <Link href="/guides/hiking-with-kids-from-camp">hiking with kids from camp</Link>.
        </p>

        <h2>What to bring for a cold January morning</h2>
        <p>
          New Year&apos;s Day is cold in most of the country, and kids lose heat faster than adults
          when they stop moving. Dress them in layers and pack for the stops, not the walking.
        </p>
        <ul>
          <li>
            <strong>Non-cotton layers.</strong> A synthetic or wool base layer, a fleece or puffy, and
            a windproof shell. Cotton stays wet and cold once it gets sweaty or snowy.
          </li>
          <li>
            <strong>Hat, gloves, and spares.</strong> Bring an extra pair of gloves and socks per kid
            in a zip bag. Wet hands are the fastest way to end a hike early.
          </li>
          <li>
            <strong>Hand warmers.</strong> A pair of{' '}
            <AmazonLink productId="hothands-hand-warmers-bulk" pageSlug="first-day-hikes-with-kids" />{' '}
            in each pocket turns a complaint into a treat.
          </li>
          <li>
            <strong>Something warm to drink.</strong> A{' '}
            <AmazonLink productId="thermos-stainless-king-40oz" pageSlug="first-day-hikes-with-kids" />{' '}
            full of cocoa is the best motivation on any winter trail. A{' '}
            <AmazonLink productId="thermos-funtainer-food-jar" pageSlug="first-day-hikes-with-kids" />{' '}
            keeps oatmeal or soup warm for a trailhead lunch.
          </li>
          <li>
            <strong>Snacks.</strong> More than you think, and easy to eat with gloves on.
          </li>
          <li>
            <strong>A small first aid kit.</strong> Bandages and blister care for everyone. A
            compact family kit like the{' '}
            <AmazonLink productId="thriad-first-aid-430" pageSlug="first-day-hikes-with-kids" />{' '}
            lives in the car for the drive home.
          </li>
          <li>
            <strong>Headlamps.</strong> Winter days are short. If the hike starts in the afternoon,
            bring{' '}
            <AmazonLink productId="everbrite-headlamp-5-pack" pageSlug="first-day-hikes-with-kids" />{' '}
            in case you are on the trail later than planned.
          </li>
        </ul>
        <p>
          For more on keeping small kids warm, including dressing them in layers and warming up a
          child who is already cold, see{' '}
          <Link href="/guides/how-to-keep-kids-warm-camping">how to keep kids warm camping</Link>.
        </p>
        <p>
          In some states, hunting seasons still run into early January, and some state parks and
          nearby public lands allow hunting. If you are hiking where that is possible, put kids in a
          bright orange hat or a{' '}
          <AmazonLink productId="quietwear-youth-blaze-vest" pageSlug="first-day-hikes-with-kids" />.{' '}
          <Link href="/guides/camping-during-hunting-season">Camping during hunting season</Link>{' '}
          explains what to look for.
        </p>

        <h2>Turn it into a camping trip</h2>
        <p>
          January 1, 2027 falls on a Friday, which makes New Year&apos;s weekend a natural time for a
          short trip. Many state parks keep cabins, yurts, or a winterized campground loop open all
          year, and staying in the park means the First Day Hike starts at your door. Cabins over
          the holidays book up early, so if this sounds good, look now, not in late December.{' '}
          <Link href="/guides/state-park-cabin-camping-with-kids">
            State park cabin camping with kids
          </Link>{' '}
          covers what to pack, and{' '}
          <Link href="/guides/winter-break-camping-with-kids">winter break camping with kids</Link>{' '}
          covers where campgrounds are open in late December and how to plan around the long nights.
        </p>

        <h2>Make it a family tradition</h2>
        <p>
          The best part of a First Day Hike is doing it again. A few small rituals make it stick:
          take a family photo at the same spot each year, let each kid pick one thing they want to
          see on the trail, or start a hike journal with the date, the park, and the weather. Kids
          who start this at four will remember it at fourteen.
        </p>

        <h2>Frequently asked</h2>
        <h3>What are First Day Hikes?</h3>
        <p>
          A New Year&apos;s Day program in which state parks across the country host hikes on
          January 1, coordinated by America&apos;s State Parks. It began in Massachusetts in 1992 and
          now happens in every state.
        </p>
        <h3>How do I find a First Day Hike near me?</h3>
        <p>
          Check the America&apos;s State Parks website and your state park agency&apos;s events page,
          where most listings go up in December. Register early if the listing requires it.
        </p>
        <h3>Are First Day Hikes good for young kids?</h3>
        <p>
          Many are. Look for short guided walks of a mile or two on easy or accessible trails, and
          pick a hike that matches the shortest legs in the family.
        </p>
        <h3>What should kids wear on a New Year&apos;s Day hike?</h3>
        <p>
          Non-cotton layers, a windproof shell, a warm hat, gloves, warm socks, and waterproof boots,
          plus spare gloves and socks for each child.
        </p>
      </GuidePage>
      <GuideGearShelf
        guideSlug="first-day-hikes-with-kids"
        heading="Gear for a cold New Year's Day hike"
      />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="first-day-hikes-with-kids" />
    </>
  )
}
