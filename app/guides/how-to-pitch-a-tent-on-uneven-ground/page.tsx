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

const SLUG = '/guides/how-to-pitch-a-tent-on-uneven-ground'
const TITLE = 'How to Pitch a Tent on Uneven Ground or a Slope'
const META_TITLE = 'Pitch a Tent on Uneven Ground or a Slope'
const DESCRIPTION =
  'How to pitch a tent on uneven ground or a slope: pick the flattest spot, point heads uphill, stop sliding, and avoid low spots that flood when it rains.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1653526167310-714293464c9c?w=1400&auto=format&fit=crop&q=80'

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
            q: 'Which way should your head point when camping on a slope?',
            a: 'Uphill. Sleeping with your head higher than your feet keeps blood from pooling in your head and keeps you from sliding into the tent wall. Lying across the slope is the next best choice, though you may roll toward the low side. Sleeping with your head downhill is uncomfortable and best avoided. Position the tent so the door faces across the slope rather than down it, so gear and shoes do not roll out when you unzip.',
          },
          {
            q: 'How do you level a tent site without digging?',
            a: 'Do not dig, since digging scars the ground and most campgrounds and parks prohibit it. Instead, clear loose rocks, sticks, and pinecones by hand, then set them back afterward. Put the tent in the flattest part of the site, and if a small tilt remains, make up the difference inside by placing a folded jacket or a flat stuff sack under the low edge of the sleeping pad. A change of a few inches is manageable. A pitch with a steep tilt is a reason to move.',
          },
          {
            q: 'Why does my sleeping pad slide around in the tent?',
            a: 'Nylon tent floors are slippery, and even a slight slope lets a smooth pad slide downhill all night. Slide a thin rubber shelf liner or a wool blanket under the pad, Putting heavier gear at the downhill end of the pad also helps. If the slide persists, the slope is too steep, and moving the tent is better than fighting it.',
          },
          {
            q: 'Is it bad to camp in a low spot?',
            a: 'Yes. Cold air and rainwater both flow downhill and collect in dips, so a hollow can leave you with a colder night and a wet floor. A site that is slightly higher than its surroundings drains better, as long as it is not so exposed that wind becomes a problem. Skip dry creek beds, shallow bowls, and the bottom of any slope, especially when rain is in the forecast.',
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
        slug="how-to-pitch-a-tent-on-uneven-ground"
        eyebrow="How-to"
        title="How to Pitch a Tent on Uneven Ground or a Slope"
        lede="Perfectly flat tent pads are rare. Most family campsites tilt a little, hide a few rocks, or dip in the middle, and a kid who slides into the tent wall at 2am is the result. Here is how to read a site, set the tent on it, and fix the small tilt that remains."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'A tan dome tent pitched on a grassy field beneath a large flowering tree',
        }}
        dateModified="2026-11-16"
      >
        <QuickAnswer
          tldr="Walk the site first, pick the flattest and highest spot, clear it by hand, point heads uphill, and move the tent if the tilt is more than a few inches."
          summary="The best way to pitch a tent on uneven ground is to choose well before you build. Walk the whole site, lie down where you plan to sleep, and pick the flattest spot that is slightly higher than the ground around it, never a dip or dry creek bed where cold air and rainwater collect. Clear rocks, sticks, and pinecones by hand without digging. If a gentle slope remains, point the sleeping heads uphill and put the door across the slope. Stake the downhill corners first and keep stakes angled away from the tent. Handle any leftover tilt inside by shimming under the low edge of the sleeping pad, and add a grippy layer under pads so they stop sliding. If the tilt is more than a few inches, move the tent or the whole camp."
        />

        <h2>Walk the site before you unpack</h2>
        <p>
          Most uneven-ground problems are solved in the first five minutes, before a single pole is
          out of the bag. Walk the whole campsite and look at where water would run, where the ground
          is flattest, and what is overhead. If the campground has several tent pads, the flat one is
          usually the pad that has been used the most, and it is worth taking. The full site-picking
          checklist is in{' '}
          <Link href="/guides/how-to-choose-a-family-campsite">how to choose a family campsite</Link>.
        </p>
        <p>
          Then do the test that matters. Lie down on the spot where the tent floor will go, the way
          you will sleep. A tilt you cannot see from standing is often easy to feel from the ground.
          Roll once to each side. If you roll easily, the site is too sloped and you should keep
          looking.
        </p>

        <h2>Pick the high, flat spot, not the low one</h2>
        <p>
          Cold air and rainwater both flow downhill and settle in the lowest ground. A shallow bowl,
          a dry creek bed, or the base of a hill can mean a colder night and a damp tent floor, even
          if it looked like the most level patch. Choose ground that is flat and also slightly higher
          than its surroundings so water has somewhere to go. Below a hillside is the worst place to
          be when it is raining, and a rainy forecast makes this the first thing to check. Our{' '}
          <Link href="/guides/rainy-camping-trips">rainy camping trips</Link> guide covers what else
          to do when the forecast turns.
        </p>
        <p>
          Higher ground is not always better. A bare hilltop gets the wind, and a tent in a gale is
          a bigger problem than a slight tilt. Look for a spot that is a little raised, with some
          cover on the windward side. See{' '}
          <Link href="/guides/camping-in-high-wind">camping in high wind</Link> for how to pitch
          when it is gusty.
        </p>

        <h2>Clear the ground without digging</h2>
        <p>
          Walk the tent footprint and remove rocks, sticks, pinecones, and acorns by hand. A small
          pebble feels like a baseball under a sleeping child. Set what you moved to the side and put
          it back when you leave. Do not dig out a high spot or build up a low one, and do not dig a
          trench around the tent. Many campgrounds and parks prohibit it, and it damages the site for
          the next family.
        </p>
        <p>
          A ground tarp or footprint goes under the tent to protect the floor from rough ground, but
          it should be slightly smaller than the tent floor so the edges do not stick out and collect
          rain. A{' '}
          <AmazonLink productId="geertop-17x10-tarp" pageSlug="how-to-pitch-a-tent-on-uneven-ground" />{' '}
          cut or folded under the tent works well for this and also gives you a dry place to sit
          while you set up.
        </p>

        <h2>Point heads uphill and the door across the slope</h2>
        <p>
          If a slight slope is unavoidable, use it. Lay the tent so that everyone sleeps with their
          head uphill and feet downhill. Sleeping with your head lower than your feet is
          uncomfortable and makes for a poor night. The next best choice
          is lying across the slope, though you will tend to roll toward the low side.
        </p>
        <p>
          Put the door across the slope, not at the downhill end. That keeps shoes and gear from
          rolling out each time the zipper opens and keeps the doorway from becoming a water channel.
          Heavy bags and the cooler go at the low end inside, where their weight holds the pad in
          place.
        </p>

        <h2>Stake the downhill side first</h2>
        <p>
          Spread the tent floor out, then stake the downhill corners first. They take the most
          strain on a slope, and a floor that is pegged on the low side stays put while you pull the
          high side taut. Drive stakes at about a 45 degree angle pointing away from the tent so the
          pull is against the stake, not along it. On hard, rocky ground, a{' '}
          <AmazonLink
            productId="eurmax-galvanized-tent-stakes"
            pageSlug="how-to-pitch-a-tent-on-uneven-ground"
          />{' '}
          holds better than the thin stakes that come in the bag. The full pitching sequence, from
          laying out the floor to the rainfly, is in{' '}
          <Link href="/guides/how-to-set-up-a-tent">how to set up a tent</Link>.
        </p>
        <p>
          Once the tent is up, walk around and check that the floor is not bunched or pulled to one
          side, then re-tighten the guy lines on the side that faces the wind.
        </p>

        <h2>Fix a small tilt inside the tent</h2>
        <p>
          A tilt of a few inches is manageable. The fix is inside the tent, not underneath it. Put
          a folded jacket, a flat stuff sack, or a small towel under the low edge of each sleeping
          pad to bring it level, or turn the pad so the long edge runs across the slope. For kids who
          sleep on the floor, the shim goes under the pad, not under the child.
        </p>
        <p>
          The second problem is sliding. Nylon tent floors and smooth pads are slippery, and a slight
          slope lets a pad creep downhill all night. A thin sheet of rubber shelf liner or a wool
          blanket under the pad grips well. A wide pad such as the{' '}
          <AmazonLink productId="big-agnes-divide" pageSlug="how-to-pitch-a-tent-on-uneven-ground" />{' '}
          gives a kid more room to stay on it. Insulation matters here too, since the pad is what
          separates a kid from cold ground. Our{' '}
          <Link href="/guides/sleeping-pad-r-value-explained">sleeping pad R-value guide</Link>{' '}
          explains how to choose one.
        </p>

        <h2>When to move instead of fixing it</h2>
        <p>
          Some sites cannot be saved, and that is fine. Move the tent, or the whole camp, if:
        </p>
        <ul>
          <li>You roll easily to one side when you lie down on the floor spot.</li>
          <li>The tilt is more than a few inches across the tent floor.</li>
          <li>The ground dips in the middle or is a drainage channel or creek bed.</li>
          <li>There are dead branches overhead, since uneven ground often means older trees.</li>
          <li>Rain is forecast and the tent would sit lower than the ground around it.</li>
        </ul>
        <p>
          If you arrive late and the best spot is poor, take it for the night and do the in-tent
          fixes above. Our guide to{' '}
          <Link href="/guides/setting-up-camp-in-the-dark">setting up camp in the dark</Link> has the
          shortcuts for a late arrival.
        </p>

        <h2>Frequently asked</h2>
        <h3>Which way should your head point when camping on a slope?</h3>
        <p>
          Uphill. It is more comfortable and keeps you from sliding into the tent wall. Put the door
          across the slope so gear does not roll out when you open it.
        </p>
        <h3>How do you level a tent site without digging?</h3>
        <p>
          Do not dig. Clear rocks and sticks by hand, choose the flattest spot, and shim under the
          low edge of the sleeping pad with a folded jacket or a stuff sack. A tilt of more than a
          few inches means it is time to move.
        </p>
        <h3>Why does my sleeping pad slide around in the tent?</h3>
        <p>
          Nylon floors are slippery. Put rubber shelf liner or a wool blanket under the pad, and
          keep heavy gear at the downhill end. If it still slides, the slope is too steep.
        </p>
        <h3>Is it bad to camp in a low spot?</h3>
        <p>
          Yes. Cold air and rainwater settle in dips, so a hollow means a colder, wetter night. Pick
          ground that is flat and slightly higher than what is around it.
        </p>
      </GuidePage>
      <GuideGearShelf
        guideSlug="how-to-pitch-a-tent-on-uneven-ground"
        heading="Gear for pitching on rough ground"
      />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="how-to-pitch-a-tent-on-uneven-ground" />
    </>
  )
}
