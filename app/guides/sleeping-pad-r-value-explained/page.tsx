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

const SLUG = '/guides/sleeping-pad-r-value-explained'
const TITLE = 'Sleeping Pad R-Value Explained'
// SEO-optimized <title>; H1/headline keep TITLE.
const META_TITLE = 'Sleeping Pad R-Value Explained: What Families Need'
const DESCRIPTION =
  'Sleeping pad R-value explained for family campers: what the number measures, what R-value you need by season, why pads stack, and the air mattress trap.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1698731048404-1c12d7189e48?w=1400&auto=format&fit=crop&q=80'

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
            q: 'What R-value sleeping pad do I need for fall camping?',
            a: 'For most fall car camping in the lower 48, where overnight lows sit somewhere in the 30s and 40s, aim for an R-value of about 3 to 4 per person. If the forecast low is near or below freezing, step up to 4 or higher. Kids lose heat faster than adults, so give them the warmer pad in the family rather than the leftover one. Summer pads under R 2 are the most common reason families sleep cold on an otherwise reasonable October night.',
          },
          {
            q: 'Can you stack two sleeping pads to add R-value?',
            a: 'Yes. R-values are additive, so a closed-cell foam pad rated around R 2 under an inflatable pad rated R 3 gives you roughly R 5 of total insulation. The usual order is foam on the bottom, against the tent floor, with the inflatable pad on top. Stacking is the cheapest way to turn a three-season sleep setup into a cold-night one, and the foam pad protects the inflatable from punctures as a bonus.',
          },
          {
            q: 'Does an air mattress keep you warm when camping?',
            a: 'A plain air mattress usually does not. Most uninsulated air beds have an R-value around 1 or lower, and the large chamber of air inside cools down to ground temperature overnight and circulates against your back. On a cold night it can sleep colder than a foam pad laid directly on the ground. If you love the air mattress, put a closed-cell foam pad or a folded wool blanket on top of it, under the sleeping bag.',
          },
          {
            q: 'Can I trust the R-value printed on a sleeping pad?',
            a: 'Since 2020, most established pad makers test to a shared lab standard called ASTM F3340, which made R-values comparable across brands for the first time. A pad that cites that standard is giving you a measured number. A pad with an unusually high R-value and no mention of how it was tested is giving you a marketing claim. When in doubt, compare against well-known pads of similar thickness and construction, and leave yourself some margin.',
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
        slug="sleeping-pad-r-value-explained"
        eyebrow="Gear guide"
        title={TITLE}
        lede="The number on a sleeping pad matters more than the number on a sleeping bag once fall nights turn cold. Here is what it means and how much your family actually needs."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'A camper sitting in the doorway of a yellow tent in the forest, unrolling an orange sleeping pad',
        }}
      >
        <QuickAnswer
          tldr="R-value measures how well a pad blocks the cold ground. For fall family camping, aim for about R 3 to 4 per person, and stack pads when the forecast drops near freezing."
          summary="A sleeping pad's R-value measures how well it resists heat flowing out of your body into the ground, and higher numbers mean warmer. Your sleeping bag cannot do this job, because your body weight crushes the insulation underneath you flat. As a rule of thumb, R 1 to 2 suits warm summer nights, R 3 to 4 covers most spring and fall trips, R 4 to 5.5 handles nights near or below freezing, and R 5.5 and up is winter territory. R-values add together, so a foam pad under an inflatable pad is the cheapest way to sleep warmer. Plain air mattresses are usually around R 1 and sleep cold unless you add a layer on top. Give kids the warmer pad, since they lose heat faster than adults do, and look for pads tested to the ASTM F3340 standard."
        />

        <h2>What R-value actually measures</h2>
        <p>
          R-value is a measure of thermal resistance: how hard it is for heat to move through a
          material. On a sleeping pad, the heat in question is leaving your body and heading
          straight down into the ground. The higher the number, the more slowly that happens, and
          the warmer you sleep.
        </p>
        <p>
          This matters because the ground is the biggest heat thief on a cold night. A sleeping
          bag works by trapping still air in its fill, but wherever your shoulders, hips, and back
          press down, that fill compresses to almost nothing. The bag is doing its job on top of
          you and essentially no job underneath you. The pad is the only thing standing between
          you and a patch of dirt that may be 40 degrees colder than your skin, for eight hours
          straight.
        </p>
        <p>
          That is why a family can buy a good bag, sleep cold anyway, and blame the bag. Nine
          times out of ten the fix is underneath.
        </p>

        <h2>What R-value you need by season</h2>
        <p>
          These ranges line up with how most pad makers and outdoor retailers describe their
          lineups. Use the forecast low for your campground, not the daytime high, and round
          toward the warmer pad when you are unsure.
        </p>
        <ul>
          <li>
            <strong>Under R 2: warm summer nights.</strong> Lows in the 50s and up. Most
            uninsulated pads, thin self-inflating pads, and air mattresses live here.
          </li>
          <li>
            <strong>R 2 to 4: three-season camping.</strong> Spring and fall nights in the 40s and
            upper 30s. This is the sweet spot for most family car camping in the lower 48.
          </li>
          <li>
            <strong>R 4 to 5.5: cold nights.</strong> Lows near or a bit below freezing, which is
            normal for October in the mountains and the northern states.
          </li>
          <li>
            <strong>R 5.5 and up: winter.</strong> Frozen ground, snow, and nights well below
            freezing. This is serious cold-weather territory, covered in{' '}
            <Link href="/guides/winter-camping-for-beginners">winter camping for beginners</Link>.
          </li>
        </ul>
        <p>
          Two adjustments matter for families. Kids have more skin surface relative to their body
          weight than adults, so they lose heat faster and should get the warmer pad in the tent,
          not the hand-me-down. And people who run cold, adults included, should add about one
          point of R-value to whatever the chart says.
        </p>

        <h2>R-values stack, and that is the cheapest upgrade there is</h2>
        <p>
          R-values are additive. Put a closed-cell foam pad rated around R 2 under an inflatable
          pad rated R 3, and you are sleeping on roughly R 5. That is the single most
          cost-effective way to take a summer-ready family sleep setup into a cold October
          weekend.
        </p>
        <p>
          A folding foam pad such as the{' '}
          <AmazonLink productId="therm-a-rest-z-lite-sol" pageSlug="sleeping-pad-r-value-explained" />{' '}
          is the classic choice: it cannot pop, it doubles as a sit pad around the fire, and it
          protects whatever is on top of it from sticks and pine needles. The standard order is
          foam on the bottom against the tent floor, inflatable on top, sleeping bag on the
          inflatable.
        </p>
        <p>
          No foam pad? A folded wool blanket, a spare comforter, or a couple of moving blankets
          under each kid adds real insulation for nothing. It is not as efficient per pound as
          foam, but at a car campsite nobody is counting pounds.
        </p>

        <h2>The air mattress trap</h2>
        <p>
          The queen air mattress is the most popular family sleeping surface and the one most
          likely to leave everyone cold. A typical uninsulated air bed rates around R 1 or lower.
          The big open chamber of air inside slowly cools to the temperature of the ground, and
          as you shift around it circulates that cold air right against your back.
        </p>
        <p>
          The result is a bed that feels great at 9 p.m. and freezing at 3 a.m. On a truly cold
          night, an air mattress can sleep colder than a foam pad laid straight on the dirt. If
          your family loves the air mattress, keep it and fix it: lay a foam pad or a thick
          blanket on top of the mattress, under the sleeping bags. Insulation has to sit between
          you and the cold air, not underneath it.
        </p>
        <p>
          The same goes for pads sold as &quot;uninsulated.&quot; They are comfortable and pack
          small, but they are summer pads. Read the label before assuming a thick pad is a warm
          pad, because thickness and warmth are different things.
        </p>

        <SkillMediaBlock
          video={{
            url: 'https://www.youtube-nocookie.com/embed/gsfJIYHwj30',
            title: 'How to Choose Sleeping Pads (REI)',
          }}
        />

        <h2>How to read the label (and when not to trust it)</h2>
        <p>
          For years, every brand tested R-value its own way, so a 4 from one company and a 4 from
          another meant different things. In 2020 most established pad makers adopted a shared
          lab test, ASTM F3340, and published R-values became genuinely comparable for the first
          time. Look for that standard on the box or the product page.
        </p>
        <p>
          Be skeptical of numbers that seem too good. A pad with a very high R-value, a low price,
          and no mention of how it was tested is giving you a marketing claim, not a
          measurement. Compare it against well-known pads of similar thickness and construction,
          and if it looks like an outlier, assume it performs like its peers.
        </p>
        <p>
          A few reference points from the pads we recommend: the{' '}
          <AmazonLink productId="rab-ionosphere-5-5" pageSlug="sleeping-pad-r-value-explained" />{' '}
          is rated R 5.5 and packs small enough to go anywhere, and the{' '}
          <AmazonLink productId="mondoking-3d-pad" pageSlug="sleeping-pad-r-value-explained" /> is
          rated R 7.0 and is about as close to a real mattress as a camping pad gets.
        </p>

        <h2>A practical family setup for fall</h2>
        <p>
          You do not need to buy everyone a new pad. For a typical fall weekend with lows in the
          high 30s or 40s, this is what works:
        </p>
        <ol>
          <li>
            <strong>Kids first.</strong> Give the warmest pads in the family to the smallest
            people. If you only own one insulated pad, it goes under a child.
          </li>
          <li>
            <strong>Add a foam layer for anyone on a summer pad.</strong> One closed-cell foam
            pad per person, under their existing pad, takes most families from R 2 to R 4 for
            the price of one dinner out.
          </li>
          <li>
            <strong>Fix the air mattress.</strong> Blanket or foam on top of it, never just a
            fitted sheet.
          </li>
          <li>
            <strong>Then look at the bags.</strong> A liner like the{' '}
            <AmazonLink productId="sea-to-summit-reactor-extreme-liner" pageSlug="sleeping-pad-r-value-explained" />{' '}
            adds warmth on top once the bottom is sorted out.
          </li>
        </ol>
        <p>
          The pad is one part of a full cold-night system that also includes dry bedtime layers,
          a hat, a snack before bed, and a sheltered tent site. For the rest of that system, see{' '}
          <Link href="/guides/how-to-keep-kids-warm-camping">how to keep kids warm camping</Link>,
          and for matching bag ratings to overnight lows, see{' '}
          <Link href="/guides/best-camping-sleeping-bag-for-kids">
            best camping sleeping bag for kids
          </Link>
          .
        </p>

        <h2>Frequently asked</h2>
        <h3>What R-value sleeping pad do I need for fall camping?</h3>
        <p>
          About R 3 to 4 per person for typical fall lows in the 30s and 40s. Go R 4 or higher
          when the forecast is near freezing, and give kids the warmer pad.
        </p>
        <h3>Can you stack two sleeping pads to add R-value?</h3>
        <p>
          Yes. R-values add together, so foam at R 2 under an inflatable at R 3 gives you about R
          5. Foam goes on the bottom.
        </p>
        <h3>Does an air mattress keep you warm when camping?</h3>
        <p>
          Usually not. Uninsulated air beds rate around R 1 or lower and cool down overnight. Put
          a foam pad or thick blanket on top of the mattress, under the sleeping bag.
        </p>
        <h3>Can I trust the R-value printed on a sleeping pad?</h3>
        <p>
          Trust numbers tested to the ASTM F3340 standard. Treat unusually high numbers with no
          testing standard listed as marketing claims.
        </p>
      </GuidePage>
      <GuideGearShelf
        guideSlug="sleeping-pad-r-value-explained"
        heading="Pads and add-ons for a warmer sleep system"
      />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="sleeping-pad-r-value-explained" />
    </>
  )
}
