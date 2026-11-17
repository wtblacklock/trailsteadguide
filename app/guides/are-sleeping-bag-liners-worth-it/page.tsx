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

const SLUG = '/guides/are-sleeping-bag-liners-worth-it'
const TITLE = 'Are Sleeping Bag Liners Worth It?'
// SEO-optimized <title>; H1/headline keep TITLE.
const META_TITLE = 'Are Sleeping Bag Liners Worth It?'
const DESCRIPTION =
  'Are sleeping bag liners worth it for family camping? How much warmth each type really adds, when a liner beats a new bag, and when it is a waste of money.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1667793237543-feacd41e0c13?w=1400&auto=format&fit=crop&q=80'

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
            q: 'How much warmer does a sleeping bag liner make you?',
            a: 'Less than the package usually says. Makers rate silk and cotton liners at roughly 2 to 9 degrees of added warmth, fleece liners around 8 to 15 degrees, and insulated synthetic liners like the Sea to Summit Reactor Extreme up to 25 degrees. Independent reviewers and most campers report closer to 5 to 15 degrees for the warmest liners in real use. Plan on the low end of the claim, and treat a liner as a way to stretch a bag by one season, not to turn a summer bag into a winter one.',
          },
          {
            q: 'Is a liner cheaper than buying a warmer sleeping bag?',
            a: 'Usually, yes. An insulated liner costs about $40 to $70, while a good synthetic 20 degree bag costs $60 to $150 and a winter bag more. If your family already owns 30 to 40 degree bags and your coldest trips have lows in the mid 30s, a liner per person is the cheaper fix. If you are planning nights in the 20s or colder, the liner is not enough on its own and a properly rated bag is the better buy.',
          },
          {
            q: 'Do kids need sleeping bag liners?',
            a: 'They are not required, but they are useful for kids for two reasons. A liner adds a few degrees to a child bag that is borderline for the forecast, and it keeps the bag itself clean, since kids climb in sweaty, sandy, and sticky. A liner goes in the washing machine after every trip, which is far easier than washing a full sleeping bag. Choose a liner sized for the bag, and make sure a restless sleeper is not getting tangled in it.',
          },
          {
            q: 'Can you use a sleeping bag liner by itself?',
            a: 'Yes, on warm nights. A silk, cotton, or light fleece liner works as a sheet on summer nights when a sleeping bag is too hot, and in heated cabins and yurts where a full bag is more than you need. On its own a liner is not warm enough for nights much below the 60s, so pack a blanket or an unzipped sleeping bag to throw over it if the temperature drops.',
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
        slug="are-sleeping-bag-liners-worth-it"
        eyebrow="Gear guide"
        title={TITLE}
        lede="A liner is the cheapest way to squeeze another month of camping out of the bags you already own. It is also oversold. Here is what a liner really adds, and when it is the right buy for a family."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'A green dome tent at night under a starry sky, with an orange sleeping bag visible through the open door',
        }}
      >
        <QuickAnswer
          tldr="Yes, for most families heading into fall and early winter with bags rated in the 30s or 40s. An insulated liner adds real warmth and keeps bags clean, but expect less warmth than the box claims."
          summary="A sleeping bag liner is worth it when your bags are close to warm enough but not quite. Insulated liners like the Sea to Summit Reactor Extreme are rated to add up to 25 degrees, but reviewers and campers usually report something closer to 5 to 15 degrees, which is still enough to take a 40 degree bag into a night in the low 30s. Silk and cotton liners add only a few degrees and are mostly about comfort and keeping the bag clean. A liner is not a substitute for a winter bag or an insulated sleeping pad. If you are cold from below, fix the pad first. For families, the biggest win is often hygiene: a liner goes in the washing machine after every trip, so the expensive bag rarely needs washing. Skip the liner if your bag is already rated well below the forecast low."
        />

        <h2>What a sleeping bag liner actually does</h2>
        <p>
          A liner is a thin sack that goes inside your sleeping bag, shaped like a mummy or a
          rectangle to match it. You sleep inside the liner, and the liner sits inside the bag. It
          does three jobs, and which one matters most to you decides whether it is worth buying.
        </p>
        <ul>
          <li>
            <strong>Warmth.</strong> A liner adds a layer of insulation and cuts the dead air space
            inside a roomy bag, so your body has less to heat.
          </li>
          <li>
            <strong>Cleanliness.</strong> Skin oil, sweat, sunscreen, and campsite dirt end up on
            the liner instead of the bag. Insulation that stays clean stays lofty and warm for
            longer.
          </li>
          <li>
            <strong>Flexibility.</strong> On a warm night, the liner alone is a sheet. In a heated
            cabin, it turns a bare vinyl mattress into a bed.
          </li>
        </ul>

        <h2>How much warmth each type of liner adds</h2>
        <p>
          Liner warmth ratings come from the brands, not from a shared lab test like the one used
          for sleeping bags, so treat them as best-case numbers. Here is roughly what each material
          claims and what campers tend to report.
        </p>
        <ul>
          <li>
            <strong>Silk.</strong> Claimed at a few degrees up to about 9. Light, packs to the size
            of a fist, and feels great on warm nights. Mostly a comfort and cleanliness liner.
          </li>
          <li>
            <strong>Cotton or poly-cotton.</strong> A few degrees at most. Cheap and easy to wash,
            but heavy and slow to dry. Fine for car camping in summer and for cabins.
          </li>
          <li>
            <strong>Fleece.</strong> Claimed around 8 to 15 degrees. Cozy and warm, but bulky.
            Good for car campers who have trunk space and cold-sleeping kids.
          </li>
          <li>
            <strong>Insulated synthetic.</strong> The warmest kind. The{' '}
            <AmazonLink
              productId="sea-to-summit-reactor-extreme-liner"
              pageSlug="are-sleeping-bag-liners-worth-it"
            />{' '}
            is rated to add up to 25 degrees, and independent reviews tend to land closer to 10 to
            15. That is still the biggest boost you can buy for about $60.
          </li>
        </ul>
        <p>
          The honest rule of thumb: plan on about half of the claimed number. A liner that turns a
          40 degree bag into a comfortable 30 degree night is doing its job well.
        </p>

        <h2>When a liner is worth it</h2>
        <p>
          A liner earns its place in these situations, which cover most families camping from
          October into early winter.
        </p>
        <ul>
          <li>
            <strong>Your bags are rated in the 30s or 40s and the forecast low is in the 30s.</strong>{' '}
            A roomy rectangular bag like the{' '}
            <AmazonLink productId="coleman-brazos-bag" pageSlug="are-sleeping-bag-liners-worth-it" />{' '}
            is comfortable into the 40s. An insulated liner closes most of the gap to a
            low-30s night for far less than a second bag. For more on how bag shape affects
            warmth, see{' '}
            <Link href="/compare/mummy-vs-rectangular-sleeping-bag">
              mummy vs rectangular sleeping bags
            </Link>
            .
          </li>
          <li>
            <strong>You camp with kids.</strong> Kids climb into bags dirty, and the liner takes
            the hit. Wash the liner after every trip and the bag only needs a wash once a season.
          </li>
          <li>
            <strong>Someone in the family sleeps cold.</strong> Give the cold sleeper a liner
            instead of a new bag, and see if that fixes it before you spend more.
          </li>
          <li>
            <strong>You stay in cabins or yurts.</strong> In a heated cabin, a liner plus a light
            blanket is often all the bedding you need. In an unheated one, it adds warmth to the
            bags you brought. Our{' '}
            <Link href="/guides/state-park-cabin-camping-with-kids">
              state park cabin camping guide
            </Link>{' '}
            covers the rest of the cabin packing list.
          </li>
        </ul>

        <h2>When a liner is a waste of money</h2>
        <ul>
          <li>
            <strong>You are cold from below.</strong> If you wake up with a cold back and hips,
            the problem is your pad, not your bag. A bag liner cannot fix heat lost into the
            ground. Read{' '}
            <Link href="/guides/sleeping-pad-r-value-explained">sleeping pad R-value explained</Link>{' '}
            and add a foam pad like the{' '}
            <AmazonLink productId="therm-a-rest-z-lite-sol" pageSlug="are-sleeping-bag-liners-worth-it" />{' '}
            under your current one first.
          </li>
          <li>
            <strong>The forecast is well below your bag rating.</strong> A liner stretches a bag
            by a season, not two. For nights in the 20s, a properly rated bag such as the{' '}
            <AmazonLink productId="teton-trailhead-20" pageSlug="are-sleeping-bag-liners-worth-it" />{' '}
            is the right tool, and you can still add a liner on top of that.
          </li>
          <li>
            <strong>Your bag is already rated well below the forecast low.</strong> Then the
            liner only adds warmth you do not need, and you will just unzip the bag at 2 a.m. Buy
            a silk or cotton liner for cleanliness instead, or skip it.
          </li>
          <li>
            <strong>Restless toddlers.</strong> A child who spins all night ends up wrapped in a
            twisted liner. For the youngest campers, a properly rated kids bag or a wearable
            blanket is simpler.
          </li>
        </ul>

        <h2>How to get the most warmth out of a liner</h2>
        <ol>
          <li>
            <strong>Match the shape.</strong> A mummy liner in a mummy bag, a rectangular liner in
            a rectangular bag. A mismatched liner bunches up and leaves cold spots.
          </li>
          <li>
            <strong>Get in dry.</strong> Change into dry base layers right before bed. A liner
            holds moisture against you just like a bag does.
          </li>
          <li>
            <strong>Use the hood.</strong> Many mummy liners have a hood. Pull it up inside the
            bag hood, or wear a warm hat.
          </li>
          <li>
            <strong>Add a hand warmer at the feet.</strong> A{' '}
            <AmazonLink productId="hothands-hand-warmers-bulk" pageSlug="are-sleeping-bag-liners-worth-it" />{' '}
            packet in the footbox, outside the liner and never against bare skin, warms cold feet
            on the coldest nights.
          </li>
          <li>
            <strong>Air it out every morning.</strong> Turn the liner inside out and let it dry in
            the sun or the car while you eat breakfast, so it starts the next night dry.
          </li>
        </ol>
        <p>
          A liner is one piece of a full cold-night system. For the rest of it, including bedtime
          layers, snacks, and campsite choice, see{' '}
          <Link href="/guides/how-to-keep-kids-warm-camping">how to keep kids warm camping</Link>.
        </p>

        <h2>Frequently asked</h2>
        <h3>How much warmer does a sleeping bag liner make you?</h3>
        <p>
          Less than the package says. Silk and cotton add a few degrees, fleece around 8 to 15 by
          the makers&apos; numbers, and insulated liners up to 25 by the label but closer to 5 to
          15 in real use. Plan on the low end.
        </p>
        <h3>Is a liner cheaper than buying a warmer sleeping bag?</h3>
        <p>
          Usually. An insulated liner runs about $40 to $70, against $60 to $150 for a good
          synthetic 20 degree bag. For lows in the mid 30s with 30 to 40 degree bags, the liner is
          the cheaper fix. For nights in the 20s, buy the warmer bag.
        </p>
        <h3>Do kids need sleeping bag liners?</h3>
        <p>
          Not required, but useful. A liner adds a few degrees to a borderline kids bag and keeps
          the bag clean, and it goes straight in the washing machine after the trip.
        </p>
        <h3>Can you use a sleeping bag liner by itself?</h3>
        <p>
          Yes, on warm nights and in heated cabins. Below the 60s, keep a blanket or unzipped bag
          nearby to throw over it.
        </p>
      </GuidePage>
      <GuideGearShelf
        guideSlug="are-sleeping-bag-liners-worth-it"
        heading="Liners and add-ons for a warmer night"
      />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="are-sleeping-bag-liners-worth-it" />
    </>
  )
}
