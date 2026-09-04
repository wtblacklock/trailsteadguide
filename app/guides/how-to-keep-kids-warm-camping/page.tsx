import Link from 'next/link'
import { GuidePage } from '@/components/guide/GuidePage'
import { QuickAnswer } from '@/components/guide/QuickAnswer'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import GuideGearShelf from '@/components/guide/GuideGearShelf'
import GuidePrintablesBlock from '@/components/guide/GuidePrintablesBlock'
import SkillMediaBlock from '@/components/skills/SkillMediaBlock'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'
import AmazonLink from '@/components/affiliate/AmazonLink'

const SLUG = '/guides/how-to-keep-kids-warm-camping'
const TITLE = 'How to Keep Kids Warm Camping'
// SEO-optimized <title>; H1/headline keep TITLE.
const META_TITLE = 'How to Keep Kids Warm Camping on Cold Nights'
const DESCRIPTION =
  'How to keep kids warm camping: the ground-up sleep system, what to wear to bed, the mistakes that make kids cold, and how to warm a shivering child at 2 a.m.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1624923686627-514dd5e57bae?w=1400&auto=format&fit=crop&q=80'

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
            q: 'Why do kids get cold camping even in a warm sleeping bag?',
            a: 'Almost always because of what is under them, not over them. A sleeping bag only works by trapping a layer of still air, and a child\'s body weight crushes that insulation flat wherever they touch the ground. Cold ground then pulls heat out of them all night no matter how good the bag is. The fix is an insulating sleeping pad or air mattress with a closed-cell foam pad or blanket layered on top of it. Kids also have more skin surface relative to their body mass than adults, so they lose heat faster and need a warmer setup than the grown-ups in the same tent.',
          },
          {
            q: 'What should a child wear to sleep in a tent when it is cold?',
            a: 'A dry base layer of long underwear (merino wool or synthetic, never cotton), clean dry socks, and a warm hat, because a lot of heat escapes from an uncovered head. Add a fleece midlayer if the night is heading below about 40°F. The important word is dry: change kids out of whatever they wore all day, since even slightly damp clothing from sweat, creek play, or dinner spills will keep pulling heat out of them for hours. Skip the puffy jacket inside the bag; it usually just compresses the bag\'s own insulation.',
          },
          {
            q: 'How cold is too cold to take kids tent camping?',
            a: 'For a family with standard rectangular car-camping bags and no cold-weather experience, roughly 40°F overnight is a sensible floor. Below that you need a real cold-weather sleep system: a 20°F or warmer bag per person, an insulated pad with an R-value around 4 or higher, and enough experience to notice a kid getting cold before they say anything. Younger toddlers and infants have less margin than school-age kids. When forecast lows drop under freezing, a cabin, a yurt, or a rescheduled weekend is a better call than improvising.',
          },
          {
            q: 'What do I do if my child wakes up cold in the middle of the night?',
            a: 'Work the sequence in order: check for damp clothing first and change them into anything dry, add a hat, then add insulation underneath them rather than piling more blankets on top. A quick warm drink and a small snack help, since digesting food genuinely produces heat, and a kid who went to bed hungry runs cold. An air-activated hand warmer tucked into the foot of the bag (never against bare skin) works well. If a child is shivering hard and cannot warm up in about 20 minutes, move them to a heated car or building.',
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
        slug="how-to-keep-kids-warm-camping"
        eyebrow="Cold nights"
        title="How to Keep Kids Warm Camping"
        lede="Cold kids at 2 a.m. end more family camping trips than rain does. The fix is almost always what is under them, not what is on top of them."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'A family dome tent pitched on bare ground in an autumn forest with low golden light through the trees',
        }}
      >
        <QuickAnswer
          tldr="Insulate from the ground up. Cold kids are usually losing heat downward, not upward, and no amount of extra blankets on top fixes that."
          summary="The single biggest reason kids get cold in a tent is that their body weight crushes the sleeping bag flat underneath them, so the cold ground pulls heat out all night. Start with an insulating pad or air mattress under every kid, add a foam pad or folded blanket on top of it, and only then worry about the bag rating. Put kids to bed in dry base layers, dry socks, and a warm hat, never in the clothes they wore all day. Feed them something before bed, because digestion produces real heat and a kid who went to sleep hungry runs cold. Pitch the tent out of the wind and off low ground where cold air pools. For beginners with standard car-camping bags, treat about 40°F as the sensible overnight floor."
        />

        <h2>Why kids get cold when the adults are fine</h2>
        <p>
          Two things work against children in a cold tent. The first is physics: kids have more
          skin surface relative to their body mass than adults do, so they shed heat faster and
          need a warmer setup than the grown-ups sleeping three feet away. The second is that
          kids frequently do not report being cold. They lie there awake and miserable, or they
          wake up crying at 2 a.m. without connecting it to temperature. By the time a child says
          &quot;I&apos;m cold,&quot; they have usually been cold for a while.
        </p>
        <p>
          The practical consequence is that you cannot hand a kid the same bag you would use and
          call it done. Build them the warmer setup on purpose, then check on them before you go
          to sleep yourself.
        </p>

        <h2>Insulate from the ground up, not the top down</h2>
        <p>
          A sleeping bag does not generate heat. It works by trapping a layer of still air around
          the body, and that only works while the insulation stays lofted. Wherever a body presses
          down on the bag, the fill compresses to nothing and stops insulating entirely. The ground
          underneath then acts like a heat sink, conducting warmth out of a child for eight straight
          hours.
        </p>
        <p>This is why the order of operations matters:</p>
        <ol>
          <li>
            <strong>Sleeping pad or air mattress first.</strong> A self-inflating pad such as the{' '}
            <AmazonLink productId="big-agnes-divide" pageSlug="how-to-keep-kids-warm-camping" />{' '}
            puts real insulation between a kid and the ground. Look for an R-value around 4 or
            higher for genuinely cold nights.
          </li>
          <li>
            <strong>A second layer on top of the pad.</strong> A cheap closed-cell foam pad, a
            folded wool blanket, or even a spare comforter under the sleeping bag adds a
            surprising amount of warmth for very little money. If you buy exactly one upgrade,
            buy this one.
          </li>
          <li>
            <strong>Then the bag.</strong> A liner such as the{' '}
            <AmazonLink productId="vumos-bag-liner" pageSlug="how-to-keep-kids-warm-camping" />{' '}
            adds roughly 10 to 15°F to a bag you already own and washes far more easily than the
            bag itself, which matters more with kids than you would think.
          </li>
          <li>
            <strong>Blankets over the top last.</strong> They help, but they are the smallest
            factor. Piling three quilts on a kid sleeping directly on a tent floor still leaves
            them cold.
          </li>
        </ol>
        <p>
          A plain air mattress with no insulation is a common trap. It lifts a child off the
          ground but fills with cold air that circulates all night, and it can sleep colder than a
          foam pad laid straight on the dirt. If you use one, put a blanket or foam pad on top of
          it. For a fuller look at bag ratings and how they translate to real overnight lows, see{' '}
          <Link href="/guides/best-camping-sleeping-bag-for-kids">
            best camping sleeping bag for kids
          </Link>
          .
        </p>

        <SkillMediaBlock
          video={{
            url: 'https://www.youtube-nocookie.com/embed/P6N7OvL0mww',
            title: 'How to Sleep Warm While Camping (REI)',
          }}
        />

        <h2>What kids should actually wear to bed</h2>
        <p>
          Change them. Whatever they wore during the day carries moisture from sweat, creek water,
          spilled hot chocolate, or all three, and damp fabric will pull heat out of a child for
          hours. Bedtime clothes should come out of a dry bag and go on nowhere near the campfire.
        </p>
        <ul>
          <li>
            <strong>Base layer.</strong> Merino wool or synthetic long underwear, top and bottom.
            Never cotton, which holds moisture against the skin and stays cold once damp.
          </li>
          <li>
            <strong>Dry socks.</strong> A fresh pair reserved for sleeping only. Cold feet wake
            kids up more often than anything else.
          </li>
          <li>
            <strong>A hat.</strong> A simple fleece beanie is the highest-value item on this list.
            Sleeping bags leave the head exposed, and that is where the heat goes.
          </li>
          <li>
            <strong>A fleece midlayer</strong> if the low is heading under about 40°F.
          </li>
        </ul>
        <p>
          Skip the puffy jacket inside the sleeping bag. It usually compresses the bag&apos;s own
          insulation more than it adds, and a kid who overheats and sweats at midnight is far
          colder by 4 a.m. than one who went to bed at the right temperature.
        </p>

        <h2>Feed them, and pitch the tent somewhere smart</h2>
        <p>
          Digestion produces real heat, so a kid who went to bed hungry will run cold no matter how
          good the sleep system is. A snack with some fat and protein in it right before bed does
          measurable work overnight. A warm drink helps too, though the warmth of the drink itself
          matters less than the calories.
        </p>
        <p>
          Where you pitch the tent matters more than most beginners expect. Cold air sinks and
          pools in low spots, so a site in a dip or at the bottom of a drainage can run several
          degrees colder overnight than one twenty feet up the slope. Look for something with a
          natural windbreak, since wind strips heat off a tent wall fast, and avoid pitching
          directly beside water where the air is coldest and dampest.{' '}
          <Link href="/guides/how-to-choose-a-family-campsite">
            How to choose a family campsite
          </Link>{' '}
          covers the full site-selection checklist.
        </p>
        <p>
          Condensation is the other cold-night surprise. Bodies put out a lot of moisture, and on
          a cold night it condenses on the inside of the rainfly and drips back down. Keep vents
          open even when it feels wrong to let cold air in, because a damp bag is much colder than
          a slightly drafty one.{' '}
          <Link href="/guides/fall-camping-for-beginners">Fall camping for beginners</Link> goes
          deeper on managing that seasonal turn.
        </p>

        <h2>When a kid wakes up cold at 2 a.m.</h2>
        <p>Work the sequence in this order rather than reaching straight for more blankets:</p>
        <ol>
          <li>
            <strong>Check for damp.</strong> Feel their back and feet. Change anything damp for
            anything dry, even if the dry thing is an adult&apos;s spare shirt.
          </li>
          <li>
            <strong>Put a hat on them</strong> if they lost it in the night, which they will have.
          </li>
          <li>
            <strong>Add insulation underneath.</strong> A folded jacket or blanket under the
            torso and hips does more than the same item laid on top.
          </li>
          <li>
            <strong>Food and a warm drink.</strong> Small, quick, and it genuinely works.
          </li>
          <li>
            <strong>Hand warmers.</strong> An air-activated warmer like{' '}
            <AmazonLink
              productId="hothands-hand-warmers-bulk"
              pageSlug="how-to-keep-kids-warm-camping"
            />{' '}
            tucked into the foot of the bag inside a sock. Never place one against bare skin,
            where it can cause a low-temperature burn over a long night.
          </li>
          <li>
            <strong>Share body heat.</strong> Zipping two bags together or moving a small child
            in with a parent is a legitimate fix, not a failure.
          </li>
        </ol>
        <p>
          The bail-out rule: if a child is shivering hard and cannot warm up within about 20
          minutes of all that, stop troubleshooting and move them to a heated car or building.
          Hard shivering that will not stop, unusual sleepiness, confusion, or clumsiness are
          signs of a child getting genuinely too cold, and that is a get-warm-now situation, not a
          gear problem. Nobody has ever regretted ending a trip early over this.
        </p>
        <p>
          Never run a propane heater, a grill, or a stove inside a tent to warm it up. Carbon
          monoxide from burning fuel in an enclosed space is odorless and kills people every year,
          and a tent is not ventilated enough to make it safe. Warm the kids, not the air.
        </p>

        <h2>How cold is too cold</h2>
        <p>
          For a family using standard rectangular car-camping bags with no cold-weather
          experience, treat about 40°F overnight as the sensible floor. Between 30 and 40°F you
          need the full system above: a 20°F or warmer bag per person, an insulated pad, dry base
          layers, and hats. Below freezing, tent camping with kids becomes a real skill with real
          consequences, and toddlers and infants have less margin than school-age kids do.
        </p>
        <p>
          There is no shame in the cabin-first path when the forecast turns. A cabin or yurt
          weekend that everyone enjoys does more for a kid&apos;s relationship with camping than a
          cold miserable night that becomes the story they tell about why they do not like tents.{' '}
          <Link href="/guides/winter-camping-for-beginners">Winter camping for beginners</Link>{' '}
          lays out where that line sits.
        </p>

        <h2>Frequently asked</h2>
        <h3>Why do kids get cold camping even in a warm sleeping bag?</h3>
        <p>
          Because their weight crushes the bag flat underneath them and the cold ground pulls heat
          out all night. Insulate under them with a pad, plus a foam pad or blanket on top of it.
        </p>
        <h3>What should a child wear to sleep in a tent when it is cold?</h3>
        <p>
          Dry synthetic or merino base layers, dry sleeping-only socks, and a warm hat. Add fleece
          below about 40°F. Never cotton, and never the clothes they wore all day.
        </p>
        <h3>How cold is too cold to take kids tent camping?</h3>
        <p>
          Roughly 40°F is a sensible floor for beginners with standard bags. Below freezing, choose
          a cabin or reschedule rather than improvising a cold-weather system.
        </p>
        <h3>What do I do if my child wakes up cold in the middle of the night?</h3>
        <p>
          Dry clothes, hat, insulation underneath, food and a warm drink, then hand warmers in a
          sock. If hard shivering does not stop in about 20 minutes, move them to a heated car or
          building.
        </p>
      </GuidePage>
      <GuidePrintablesBlock guideSlug="how-to-keep-kids-warm-camping" />
      <GuideGearShelf
        guideSlug="how-to-keep-kids-warm-camping"
        heading="Gear for a cold-night sleep system"
      />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="how-to-keep-kids-warm-camping" />
    </>
  )
}
