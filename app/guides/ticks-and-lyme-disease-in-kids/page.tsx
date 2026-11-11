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
import AmazonLink from '@/components/affiliate/AmazonLink'

const SLUG = '/guides/ticks-and-lyme-disease-in-kids'
const TITLE = 'Ticks and Lyme Disease in Kids at Camp'
// SEO-optimized <title>; H1/headline keep TITLE.
const META_TITLE = 'Ticks and Lyme Disease at Camp'
const DESCRIPTION =
  'Ticks and Lyme disease at camp: how to keep ticks off your family, do an evening tick check, remove one safely, and spot the early signs of Lyme disease.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&auto=format&fit=crop&q=80'

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
            q: 'How long does a tick have to be attached to spread Lyme disease?',
            a: 'Sources vary on the exact cutoff, but the risk is low in roughly the first day and rises the longer a tick stays attached and feeding. That is the real reason for a tick check every evening at camp instead of only at the end of the trip: a tick found and removed the same day it attaches is far less likely to pass anything on than one left overnight.',
          },
          {
            q: 'Where do kids usually pick up ticks at a campground?',
            a: 'Ticks wait on tall grass, low brush, and leaf litter and grab onto anyone who brushes past, especially at the edge of a trail, a mowed site, or a wood pile, not out in the open middle of a field. They do not drop from trees. Kids pick them up walking through unmowed grass to the bathroom, gathering firewood, or cutting through brush off the marked path.',
          },
          {
            q: 'What do I do if I find a tick attached to my child?',
            a: 'Grasp it with fine-tipped tweezers or a tick-removal tool as close to the skin as possible, then pull straight up with slow, steady pressure. Do not twist, squeeze the body, or try to burn or smother it. Clean the bite site and your hands with soap and water or rubbing alcohol afterward, and note the date, in case a doctor asks later.',
          },
          {
            q: 'What are the early signs of Lyme disease to watch for?',
            a: 'Over the following weeks, watch for a rash (sometimes, not always, a bullseye shape), fever, headache, fatigue, or joint and muscle aches. Call your child’s doctor if any of these show up, even if you never found or remember a tick bite. Caught early, Lyme disease typically responds well to a course of antibiotics.',
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
        slug="ticks-and-lyme-disease-in-kids"
        eyebrow="Tick and bug safety"
        title={TITLE}
        lede="Most tick bites on a family camping trip happen on the short walk through tall grass to the bathroom, not deep in the backcountry. A quick habit at the start and end of each day catches almost all of them."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'A parent and child walking a grassy trail through tall brush near a campsite',
        }}
        dateModified="2026-11-11"
      >
        <QuickAnswer
          tldr="Treat clothing and gear with permethrin, use a skin repellent, and run a tick check every evening. Remove an attached tick with steady upward pressure, not a twist, and watch for a rash, fever, or joint pain in the following weeks."
          summary="Ticks live in tall grass, brush, and leaf litter at the edges of trails and campsites, not out in open mowed areas, and they grab on rather than drop from above. The best defense is layered: treat clothes, shoes, and gear with permethrin, use an EPA-registered repellent on skin, tuck pants into socks on brushy trails, and run a full-body tick check on every family member each evening, paying attention to the scalp, ears, armpits, waistband, and behind the knees. An attached tick comes out with fine-tipped tweezers or a tick-removal tool, pulled straight up slowly, never twisted. Most tick bites cause no illness, but watch for a rash, fever, fatigue, or joint pain over the following weeks and call a doctor if any appear, even without remembering a bite."
        />

        <p>
          <em>
            This guide is general safety information for parents, based on CDC guidance on tick
            bite prevention and Lyme disease. It is not a substitute for a doctor. If your child
            develops symptoms after a tick bite, call their pediatrician.
          </em>
        </p>

        <h2>Why a campsite is tick territory</h2>
        <p>
          Ticks do not jump or fall from trees. They climb to the tip of a blade of grass or a low
          branch and wait for something warm to brush past, then grab on and crawl to find a spot
          to attach, often somewhere warm and covered like the scalp, waistband, or behind a knee.
          That means the highest-risk spots at a family campground are not deep woods but the ordinary
          in-between places: the unmowed path to the bathhouse, the brushy edge where you gather
          firewood, the overgrown shortcut between sites, and the field where kids run around after
          dinner.
        </p>
        <p>
          Ticks are most active, and Lyme disease most common, in wooded and grassy parts of the
          Northeast, the upper Midwest, and the Mid-Atlantic, with the Appalachians also seeing a
          lot of tick activity; see our{' '}
          <Link href="/guides/camping-in-the-appalachians-for-beginners">
            camping in the Appalachians
          </Link>{' '}
          guide for more on that region. Ticks exist well beyond those areas too, so the habits
          below are worth building anywhere there is grass and brush.
        </p>

        <h2>Before the trip: treat the gear, not just the skin</h2>
        <p>
          The two defenses work differently, and the strongest setup uses both.
        </p>
        <ul>
          <li>
            <strong>Permethrin on clothes and gear, not skin.</strong> A factory-treated item or a
            DIY spray like{' '}
            <AmazonLink
              productId="sawyer-permethrin-clothing-spray"
              pageSlug="ticks-and-lyme-disease-in-kids"
            />{' '}
            disables ticks on contact rather than just repelling them. Treat shoes, socks, pants, and
            tent doors outdoors, let everything dry fully before wearing it, and see{' '}
            <Link href="/glossary#permethrin">Permethrin</Link> in the glossary for how long each kind
            of treatment lasts.
          </li>
          <li>
            <strong>An EPA-registered repellent on exposed skin.</strong> <Link href="/glossary#deet">DEET</Link>{' '}
            is the most common active ingredient; the AAP recommends 30% or less for kids and no skin
            repellent at all on infants under 2 months. Follow the label, and avoid a child&apos;s
            hands, mouth, and eyes.
          </li>
          <li>
            <strong>Light-colored, long clothing on brushy trails.</strong> Light colors make a tick
            easier to spot before it attaches, and pants tucked into socks keep it crawling on the
            outside of the fabric instead of finding skin.
          </li>
          <li>
            <strong>Stick to the cleared path where you can.</strong> Walking the center of a mowed
            trail instead of the grassy edge cuts down on brush-offs considerably.
          </li>
        </ul>

        <h2>The evening tick check</h2>
        <p>
          Build this into the bedtime routine every night of the trip, not just on travel days.
          A tick found and removed quickly is far less of a concern than one left attached overnight.
        </p>
        <ul>
          <li>Scalp and hairline, and behind and inside the ears</li>
          <li>Back of the neck and under the collar</li>
          <li>Armpits and around the waistband</li>
          <li>Belly button</li>
          <li>Behind the knees and around the groin</li>
          <li>Between the toes and behind the ankles</li>
        </ul>
        <p>
          Check gear too, not just kids: backpacks, jackets, and anything that sat in grass can
          carry a tick inside to the tent. A quick run through a hot dryer for ten minutes kills
          ticks on clothes that cannot be checked by eye.
        </p>

        <h2>How to remove an attached tick</h2>
        <ol>
          <li>
            Grasp the tick with fine-tipped tweezers or a hooked tick-removal tool, as close to the
            skin as possible, avoiding squeezing the body. A dedicated tool like{' '}
            <AmazonLink
              productId="tick-twister-remover"
              pageSlug="ticks-and-lyme-disease-in-kids"
            />{' '}
            slides under the tick and lifts it out, which tends to be easier on a squirming kid than
            tweezers.
          </li>
          <li>
            Pull straight up with slow, steady pressure. Do not twist or jerk; twisting can leave
            mouthparts behind in the skin.
          </li>
          <li>
            Clean the bite site and your own hands afterward with soap and water, rubbing alcohol,
            or an antiseptic wipe from your{' '}
            <AmazonLink productId="thriad-first-aid-430" pageSlug="ticks-and-lyme-disease-in-kids" />.
          </li>
          <li>
            Note the date of the bite somewhere you will remember it, and consider taking a photo of
            the tick before disposing of it. Both can help a doctor later if symptoms appear.
          </li>
        </ol>
        <h3>What not to do</h3>
        <ul>
          <li>Do not twist, jerk, or squeeze the tick&apos;s body while removing it.</li>
          <li>
            Do not try folk remedies like nail polish, petroleum jelly, or a hot match to make the
            tick back out. These delay removal without making it safer, and a tick that is irritated
            rather than removed can release more saliva into the bite.
          </li>
          <li>
            Do not panic if mouthparts stay in the skin after a careful pull. Clean the area and let
            it heal; it is not a reason to dig at the skin with tweezers.
          </li>
        </ul>

        <h2>What to watch for afterward</h2>
        <p>
          Most tick bites do not lead to illness. Still, keep an eye on the bite site and on the
          child&apos;s overall health for the next several weeks.
        </p>
        <ul>
          <li>
            A rash at or near the bite site, sometimes a bullseye shape but often just a plain red
            patch
          </li>
          <li>Fever, chills, or unusual fatigue</li>
          <li>Headache or muscle and joint aches</li>
          <li>A swollen or painful joint</li>
        </ul>
        <p>
          Call your child&apos;s pediatrician if any of these appear, even if you never found a tick
          or do not remember a bite. Caught early, Lyme disease typically responds well to a course
          of antibiotics prescribed by a doctor. For the sting, cut, and burn basics that come up
          alongside tick removal at camp, see our{' '}
          <Link href="/guides/camping-first-aid-kit-for-families">family first aid kit</Link> guide.
        </p>

        <h2>Frequently asked</h2>
        <h3>How long does a tick have to be attached to spread Lyme disease?</h3>
        <p>
          Sources vary on the exact cutoff, but risk is low in roughly the first day and rises the
          longer a tick feeds. That is why an evening check, not just a start-of-trip check, matters.
        </p>
        <h3>Where do kids usually pick up ticks at a campground?</h3>
        <p>
          Tall grass, brush, and leaf litter at the edges of trails and sites, not out in mowed open
          areas. Ticks climb onto whatever brushes past; they do not drop from trees.
        </p>
        <h3>What do I do if I find a tick attached to my child?</h3>
        <p>
          Grasp it close to the skin with fine-tipped tweezers or a tick-removal tool, pull straight
          up slowly, and clean the site afterward. Do not twist or squeeze the body.
        </p>
        <h3>What are the early signs of Lyme disease to watch for?</h3>
        <p>
          A rash, fever, fatigue, headache, or joint and muscle aches in the weeks after a bite. Call
          a doctor if any appear, even without a known bite.
        </p>
      </GuidePage>
      <GuideGearShelf
        guideSlug="ticks-and-lyme-disease-in-kids"
        heading="Gear for keeping ticks off your family"
      />
      <GuidePrintablesBlock guideSlug="ticks-and-lyme-disease-in-kids" />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="ticks-and-lyme-disease-in-kids" />
    </>
  )
}
