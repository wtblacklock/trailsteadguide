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

const SLUG = '/guides/poison-ivy-oak-and-sumac-in-kids'
const TITLE = 'Poison Ivy, Oak, and Sumac in Kids at Camp'
// SEO-optimized <title>; H1/headline keep TITLE.
const META_TITLE = 'Poison Ivy, Oak, Sumac at Camp'
const DESCRIPTION =
  'Poison ivy, oak, and sumac at camp: how to spot them, wash exposure off fast, treat the rash, and know when it needs a doctor.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1563201515-8cadff14ad4e?w=1400&auto=format&fit=crop&q=80'

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
            q: 'How fast does a poison ivy rash show up?',
            a: 'Anywhere from a few hours to a few days after contact, with most reactions showing within roughly two to three days. Thin skin reacts sooner than a callused area like a heel, which is one reason a rash can seem to "spread" over several days when it is really just finishing showing up where the oil touched.',
          },
          {
            q: 'Is a poison ivy rash contagious?',
            a: 'No. The rash itself, including fluid from a blister, cannot spread the reaction to someone else. What does spread it is the plant oil, urushiol, which stays active on anything it touches - clothes, shoes, tools, a dog\'s fur, even a tent - until it is washed off. That is why a kid can seem to get new patches days later: more oil on an unwashed jacket or on the dog is still transferring to skin.',
          },
          {
            q: 'What do I do if my child touched poison ivy, oak, or sumac?',
            a: 'Rinse the skin with soap and cool or lukewarm water as soon as you can, a shower or hose-off rather than a bath so the oil does not spread to other parts of the body, and change and wash the clothes that touched the plant. Acting quickly matters more than the exact minute count, since any delay gives the oil more time to bind to skin.',
          },
          {
            q: 'When does a poison ivy rash need a doctor?',
            a: 'Call your child\'s pediatrician if the rash covers a large area of the body, is on the face or near the eyes or genitals, or looks infected with increasing redness, warmth, swelling, or pus. Seek emergency care right away for any trouble breathing or facial swelling, and never burn these plants in a campfire - smoke can carry the oil and cause a serious reaction if inhaled.',
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
        slug="poison-ivy-oak-and-sumac-in-kids"
        eyebrow="Plant safety"
        title={TITLE}
        lede="Leaves of three, let it be - except at a real campsite the plant is tangled into brush at the edge of a trail, not standing alone in a photo. Here's how to actually spot it, keep the oil off skin, and treat the rash fast when a kid finds it anyway."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'Close-up of glossy three-leaflet poison ivy growing along a wooded trail edge',
        }}
        dateModified="2026-11-18"
      >
        <QuickAnswer
          tldr="Three shiny leaflets means ivy or oak; sumac has seven to thirteen leaflets in pairs. Wash skin and clothes with soap and water as soon as you can after contact, treat the itch with calamine or hydrocortisone, and never burn the plant."
          summary="Poison ivy and poison oak both grow three leaflets to a stem, as a vine or a shrub depending on region; poison sumac is a shrub or small tree with seven to thirteen leaflets arranged in pairs and tends to grow in wet, swampy ground. All three cause an itchy rash from an oil called urushiol, not from the leaf itself, and the rash usually shows up within two to three days of contact, though it can take longer on thicker skin. The rash is not contagious between people, but the oil stays active on unwashed clothes, shoes, tools, and pet fur, sometimes for a long time, so wash exposed skin and anything that touched the plant as soon as you reasonably can. Calamine lotion, hydrocortisone cream, or a cool oatmeal soak calm the itch for most kids; call a doctor if the rash is extensive, on the face, or looks infected."
        />

        <p>
          <em>
            This guide is general safety information for parents, based on guidance from Poison
            Control centers, the National Capital Poison Center, and pediatric sources like
            KidsHealth. It is not a substitute for a doctor. If your child has a severe reaction or
            trouble breathing, seek emergency care.
          </em>
        </p>

        <h2>What to actually look for</h2>
        <p>
          The old rhyme covers poison ivy and poison oak but leaves out the plant most families have
          never heard of. All three share the same oily culprit but look different enough that one
          set of eyes should be able to tell them apart.
        </p>
        <ul>
          <li>
            <strong>Poison ivy.</strong> Three glossy leaflets per stem, the middle one on a slightly
            longer stalk than the two side ones. Grows as a climbing vine on trees and fences in the
            East and Midwest, and more often as a low shrub in the West. Leaves can be toothed or
            smooth-edged and turn red in fall, which makes it easy to mistake for a pretty plant.
          </li>
          <li>
            <strong>Poison oak.</strong> Also three leaflets, usually more rounded and lobed, closer
            to an oak leaf's shape, with a fuzzier texture. Grows mostly as a shrub, common on the
            West Coast and in parts of the Southeast.
          </li>
          <li>
            <strong>Poison sumac.</strong> The outlier: seven to thirteen smooth-edged leaflets
            arranged in pairs along a reddish stem, with one leaflet at the tip. Grows as a woody
            shrub or small tree, almost always in standing water or very wet, boggy soil, which
            narrows down where to be careful.
          </li>
        </ul>
        <p>
          All three blend into ordinary brush rather than standing apart from it, which is the real
          problem at a campsite. The patch at the edge of the fire-ring clearing or along the path to
          the bathhouse looks like background green until someone is already in it.
        </p>

        <h2>Where it hides around a campsite</h2>
        <p>
          The pattern is the same one we cover in our{' '}
          <Link href="/guides/ticks-and-lyme-disease-in-kids">ticks and Lyme disease</Link> guide:
          the highest-risk spots are not deep in the woods but the ordinary in-between places a
          family actually walks through.
        </p>
        <ul>
          <li>The brushy, unmowed edge where a trail meets the woods</li>
          <li>Around a wood pile or the unmanicured back corner of a site</li>
          <li>Along a creek bank or in any low, wet ground, where sumac is more likely</li>
          <li>Climbing a tree trunk or fence line as a vine, at kid eye level and below</li>
        </ul>
        <p>
          Before letting kids off-trail to explore, take thirty seconds to scan the immediate area
          for the three-leaflet pattern. It is a habit worth building the same way you would scan for
          a drop-off or a wasp nest before letting them run.
        </p>

        <h2>If skin touches it: wash fast</h2>
        <ol>
          <li>
            Rinse the area with soap and cool or lukewarm water as soon as you reasonably can. A
            shower or hose-off is better than a bath, since sitting in bathwater can spread the oil
            to other parts of the body.
          </li>
          <li>
            Wash under fingernails, where the oil collects easily on little hands that then touch a
            face or another part of the body.
          </li>
          <li>
            Pull off and wash any clothing, shoes, or gear that touched the plant. A camp soap like{' '}
            <AmazonLink
              productId="campsuds-biodegradable-soap"
              pageSlug="poison-ivy-oak-and-sumac-in-kids"
            />{' '}
            works fine for a quick rinse at the site; a full wash in hot water once you are home
            finishes the job.
          </li>
          <li>
            If a dog was in the brush too, give it a bath with gloves on before anyone pets it. Dogs
            rarely react to the oil themselves, but their fur carries it straight to human skin.
          </li>
        </ol>
        <p>
          Exact timing matters less than not shrugging it off. The sooner the oil comes off, the less
          of it binds to skin and the smaller the reaction tends to be.
        </p>

        <h2>Treating the rash at camp</h2>
        <p>
          Most reactions are uncomfortable rather than dangerous, and respond to the same supplies
          already worth keeping in a{' '}
          <Link href="/guides/camping-first-aid-kit-for-families">family first aid kit</Link>.
        </p>
        <ul>
          <li>
            <strong>Calamine lotion or hydrocortisone cream</strong> to cut the itch, applied a few
            times a day.
          </li>
          <li>
            <strong>Cool compresses or a cool bath</strong> with colloidal oatmeal for a larger or
            more widespread rash.
          </li>
          <li>
            <strong>An oral antihistamine</strong> at the dose on the label, if itching is keeping a
            kid up at night. Check with a pharmacist or your child&apos;s doctor on dosing for younger
            kids.
          </li>
          <li>
            <strong>Short fingernails and a distraction.</strong> Scratching will not spread the rash
            to new skin, but it can break the skin open and invite a real infection on top of the
            itch.
          </li>
        </ul>
        <h3>What not to do</h3>
        <ul>
          <li>
            Do not burn poison ivy, oak, or sumac, including as part of a brush pile on a campfire.
            The oil can travel in the smoke, and breathing it in can cause a much more serious
            reaction than skin contact.
          </li>
          <li>
            Do not assume a rash that shows up a few days after the first one means it is
            &quot;spreading.&quot; It is more likely a second, later-arriving reaction on skin that
            had a thinner dose of oil, or new contact from an unwashed sleeve or shoe.
          </li>
          <li>
            Do not share towels or let an affected kid wipe the itch on a sibling&apos;s skin while
            oil may still be present on hands or clothes.
          </li>
        </ul>

        <h2>When to call a doctor</h2>
        <p>
          Home care handles most cases. Call your child&apos;s pediatrician if the rash covers a
          large part of the body, is on the face or near the eyes or genitals, keeps getting worse
          after several days of home treatment, or looks infected (growing redness, warmth,
          swelling, or pus). Get emergency care right away for trouble breathing, facial swelling, or
          after any exposure to smoke from burning these plants.
        </p>

        <h2>Prevention habits worth building</h2>
        <ul>
          <li>Teach kids the three-leaflet pattern before the trip, not during it.</li>
          <li>
            Long sleeves and pants on brushy, off-trail stretches, the same habit that helps with
            ticks.
          </li>
          <li>Stick to the cleared center of a trail instead of the grown-in edge.</li>
          <li>
            Wash gear, shoes, and clothes that brushed through undergrowth before they go back in a
            duffel bag for the next trip; the oil can stay active on an unwashed item for a surprisingly
            long time.
          </li>
        </ul>

        <h2>Frequently asked</h2>
        <h3>How fast does a poison ivy rash show up?</h3>
        <p>
          Anywhere from a few hours to a few days, with most reactions appearing within two to three
          days. Thin skin reacts sooner than a callused area.
        </p>
        <h3>Is a poison ivy rash contagious?</h3>
        <p>
          No. The rash and any blister fluid cannot spread it to someone else. The plant oil on
          unwashed clothes, gear, or pet fur can, which is why it can seem to spread days later.
        </p>
        <h3>What do I do if my child touched poison ivy, oak, or sumac?</h3>
        <p>
          Rinse the skin with soap and cool water as soon as you can, prefer a shower or hose-off
          over a bath, and wash the clothes that touched the plant.
        </p>
        <h3>When does a poison ivy rash need a doctor?</h3>
        <p>
          When it covers a large area, is on the face or near the eyes or genitals, or shows signs of
          infection. Seek emergency care for trouble breathing or after smoke exposure from a burned
          plant.
        </p>
      </GuidePage>
      <GuideGearShelf
        guideSlug="poison-ivy-oak-and-sumac-in-kids"
        heading="Gear for washing up and treating a rash fast"
      />
      <GuidePrintablesBlock guideSlug="poison-ivy-oak-and-sumac-in-kids" />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="poison-ivy-oak-and-sumac-in-kids" />
    </>
  )
}
