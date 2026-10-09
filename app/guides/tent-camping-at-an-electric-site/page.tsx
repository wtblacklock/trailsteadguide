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

const SLUG = '/guides/tent-camping-at-an-electric-site'
const TITLE = 'Tent Camping at an Electric Site'
// SEO-optimized <title>; H1/headline keep TITLE.
const META_TITLE = 'Tent Camping at an Electric Site: A Family Guide'
const DESCRIPTION =
  'Tent camping at an electric site: what the pedestal outlets are, the cord and adapter to bring, what to plug in on a cold night, and how to run power safely.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1768224703190-6f3f0410c9ec?w=1400&auto=format&fit=crop&q=80'

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
            q: 'Can you tent camp at an electric campsite?',
            a: 'Yes, at most state parks and many private campgrounds. Electric sites are usually built with RVs in mind, but the reservation simply buys you the site and the power pedestal, and a tent is allowed on most of them. Check the campground rules for a tent limit or a requirement that the tent sit on the pad, and read the site details for the pad surface, since some electric sites are gravel or asphalt that will not take a stake. Expect to pay a few dollars to around $15 more per night than a non-electric site in the same loop.',
          },
          {
            q: 'What do I need to plug into a campground power pedestal with a tent?',
            a: 'A single outdoor-rated extension cord long enough to reach your tent door, ideally 12-gauge and labeled SJTW or similar. Most pedestals have a 20-amp outlet that accepts an ordinary three-prong household plug, so the cord plugs straight in. A small 30-amp-to-15-amp adapter is worth carrying as a backup, because the 20-amp outlet is sometimes broken or tripped and the 30-amp RV outlet is the only one left. Avoid daisy-chaining several light indoor cords, which overheat and leave connections lying in wet grass.',
          },
          {
            q: 'Is it safe to use an electric blanket in a tent?',
            a: 'An electric blanket is one of the safest and most useful things to plug in at a powered site, because it draws far less power than a heater and puts the warmth where people are. Follow its label: most blankets go over you rather than under you, and should not be folded, bunched, or zipped inside a sleeping bag. Use one with an auto shutoff, keep it away from babies and kids too young to work the control, and plan the night so the sleep system is still warm enough if the power or the blanket fails.',
          },
          {
            q: 'Can I run a space heater in my tent at an electric site?',
            a: 'Only with care, and never overnight. An electric heater burns no fuel, so carbon monoxide is not the concern, but a typical 1,500-watt heater pulls about 12.5 amps, close to the limit of a 15-amp cord, and it is a fire risk against tent fabric and sleeping bags. Some campgrounds ban heaters on their pedestals outright. If it is allowed, run it only while someone is awake, on a hard surface with three feet of clear space, and switch it off before anyone falls asleep.',
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
        slug="tent-camping-at-an-electric-site"
        eyebrow="Cold nights"
        title="Tent Camping at an Electric Site"
        lede="Late fall is when a powered site starts to earn its extra few dollars. Here is what is actually on the pedestal, what to bring for a tent, and what is worth plugging in."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'Several tents glowing from inside across a grassy campground at night, with a string of lights by one site',
        }}
      >
        <QuickAnswer
          tldr="Book the electric site, bring one heavy outdoor cord and a small adapter, plug in low-wattage comforts, and build a sleep system that works without the power."
          summary="Most electric campsites allow tents, and in late fall the power makes a family trip noticeably easier. A typical pedestal has a 20-amp outlet that takes an ordinary household plug, plus a 30-amp RV outlet and sometimes a 50-amp one. A tent camper needs one outdoor-rated 12-gauge extension cord long enough to reach the tent door, and a cheap 30-amp-to-15-amp adapter as a backup. Run that single cord straight into the tent so the only outdoor connection is at the covered pedestal. The best uses are low-wattage: an electric blanket to warm the bags before bed, a kettle for hot water bottles, phone and headlamp charging, and soft lights. A 1,500-watt space heater is the risky outlier and should never run overnight. Campground power fails in exactly the weather you want it, so pack pads and bags rated for the forecast low anyway."
        />

        <h2>Why an electric site is worth booking in late fall</h2>
        <p>
          In summer, power at a tent site is a nice extra. From October on it changes the trip. The
          nights are long, a phone battery drains fast in the cold, and the hour between dinner and
          bedtime is dark, chilly, and often the part that sends a family home early. A pedestal
          turns that hour into something closer to a living room: real light, hot drinks on demand,
          and bags that are already warm when the kids climb in.
        </p>
        <p>
          Electric sites also tend to stay open longer. Plenty of state parks close their tent-only
          and walk-in loops at the end of the season but keep a powered loop running through
          winter, since that is where the RV campers go.{' '}
          <Link href="/guides/when-do-campgrounds-close">When do campgrounds close</Link> walks
          through how to tell which loops will still be open on your dates.
        </p>
        <p>
          The trade-offs are small but real. Electric sites usually cost a few dollars to around $15
          more per night, they sit in the busier RV loops, and some have a gravel or paved pad that
          will not take a tent stake. Read the site details before you book, and look for a note
          about the pad surface or a tent limit. If the site photos show a long asphalt pull-through,
          that is a site built for a trailer, and your tent may end up on a strip of grass beside it.{' '}
          <Link href="/guides/how-to-choose-a-family-campsite">How to choose a family campsite</Link>{' '}
          covers the rest of what to look for.
        </p>

        <h2>What is actually on the pedestal</h2>
        <p>
          The metal post at the back of the site is the power pedestal. Open the cover and you will
          usually find some combination of these:
        </p>
        <ul>
          <li>
            <strong>A 20-amp outlet</strong> that looks like a household outlet with a sideways slot
            on one side. It accepts an ordinary three-prong plug, and on most pedestals it is GFCI
            protected. This is the one a tent camper uses.
          </li>
          <li>
            <strong>A 30-amp RV outlet</strong> with three larger, angled slots. It is built for a
            camper plug and will not take a household cord without an adapter.
          </li>
          <li>
            <strong>A 50-amp RV outlet</strong> with four slots, found on newer or full-hookup
            sites. You will not need it.
          </li>
          <li>
            <strong>A breaker for each outlet</strong>, usually right above it. If your power cuts
            out, this is the first place to look.
          </li>
        </ul>
        <p>
          Before you plug anything in, flip the 20-amp breaker off and on once and check that the
          outlet cover closes over your cord. Leave the cover shut as far as the cord allows, since
          it keeps rain off the one connection that has to live outside.
        </p>

        <h2>The cord and adapter to bring</h2>
        <p>
          The whole electrical kit for a tent is two items. The first is a single outdoor-rated
          extension cord long enough to run from the pedestal to the tent door without being pulled
          tight. Fifty feet covers almost every site layout. Get a heavy 12-gauge cord marked SJTW
          or similar, which means it is built for outdoor use and stays flexible in the cold. A
          cord such as the{' '}
          <AmazonLink
            productId="powgrn-50ft-12-3-outdoor-cord"
            pageSlug="tent-camping-at-an-electric-site"
          />{' '}
          handles anything sensible you would plug in at a campsite without warming up.
        </p>
        <p>
          The second is a small adapter that turns the 30-amp RV outlet into a household one. It
          rides in the bin for the night the 20-amp outlet is broken, tripped beyond resetting, or
          simply missing, which happens on older pedestals more often than it should. The{' '}
          <AmazonLink
            productId="camco-powergrip-30m-15f-adapter"
            pageSlug="tent-camping-at-an-electric-site"
          />{' '}
          is the common one and costs under $10.
        </p>
        <p>
          What to leave at home: the thin orange or white indoor cords from the garage. Joining two
          or three of them to reach the tent means extra connections lying in wet grass and wire too
          light for the load, which is how cords get hot.
        </p>

        <h2>Running power into the tent safely</h2>
        <p>
          The goal is one continuous cord from the pedestal into the tent, so the only connection
          exposed to weather is the one under the pedestal cover. A few habits keep it that way:
        </p>
        <ul>
          <li>
            <strong>Route the cord along the edge of the site</strong>, not across the path to the
            picnic table or the bathroom. Kids and adults both walk this route in the dark.
          </li>
          <li>
            <strong>Bring it in through the door</strong>, not under the tent floor. Close the
            zipper down to the cord, and let the cord dip toward the ground just before it enters
            so rain runs off the low point instead of following the cord inside.
          </li>
          <li>
            <strong>Keep the end connection inside and dry.</strong> If you need more than one
            outlet in the tent, plug a small indoor power strip into the cord inside the tent, off
            the floor if you can, and never in a corner where water collects.
          </li>
          <li>
            <strong>Never run it through a window or under a guyline</strong> where wind will saw
            it against a zipper or a stake all night.
          </li>
          <li>
            <strong>Unplug at the pedestal first</strong> when you leave camp for the day or pack
            up, then coil the cord.
          </li>
        </ul>
        <p>
          If the GFCI or the pedestal breaker trips in rain, do not keep resetting it. That trip is
          the outlet telling you water has reached a connection. Find the wet spot, dry it, and
          move it off the ground before you try again.
        </p>

        <h2>What is worth plugging in</h2>
        <p>
          The best things to run from a campsite pedestal are small, low-wattage comforts that make
          the cold evening easier and do not need watching:
        </p>
        <ol>
          <li>
            <strong>An electric blanket to warm the bags.</strong> This is the single best use of
            the power. Lay it over the sleeping bags for twenty minutes before bed, then unplug it
            and put the kids in warm bags. Follow the label: most blankets go over you, not under
            you, and should never be bunched up or zipped inside a bag. Skip it for babies and for
            any child too young to work the control.
          </li>
          <li>
            <strong>An electric kettle.</strong> Hot water on demand for cocoa, oatmeal, washing
            up, and a hot water bottle wrapped in a sock at the foot of each bag. Run it outside
            the tent on the picnic table and then unplug it.
          </li>
          <li>
            <strong>Charging.</strong> Phones, headlamps, and a{' '}
            <AmazonLink productId="anker-zolo-power-bank" pageSlug="tent-camping-at-an-electric-site" />{' '}
            topped off overnight, so you leave on Sunday with a full battery instead of a dead one.
          </li>
          <li>
            <strong>Soft light.</strong> A plug-in lamp or a string of low-wattage lights makes the
            long evening feel shorter. Keep a headlamp for every person anyway, since the power can
            drop at any time.
          </li>
          <li>
            <strong>Medical equipment.</strong> A CPAP or a nebulizer is a very good reason to book
            a powered site. Bring a battery backup for it all the same.
          </li>
        </ol>
        <p>
          Check the load before you add things up. A 20-amp outlet and a 15-amp cord can safely
          carry about 1,800 watts in total. An electric blanket and chargers together are a small
          fraction of that. A kettle alone is often 1,000 to 1,500 watts, so run it by itself and
          switch it off.
        </p>

        <h2>The space heater question</h2>
        <p>
          A powered site is the one place an electric heater has any role near a tent, because it
          burns no fuel and produces no carbon monoxide. It is still the riskiest thing on this
          page. A typical 1,500-watt heater draws about 12.5 amps on its own, close to what the cord
          is rated for, and it sits a few feet from nylon walls and sleeping bags that catch or melt
          quickly. Some campgrounds prohibit heaters on their pedestals entirely.
        </p>
        <p>
          If it is allowed and you bring one, use it the way you would use the electric blanket:
          to take the chill off while everyone is awake and changing into sleep clothes, then off
          before anyone lies down. Never overnight, never near the door, always on a hard flat
          surface with three feet of clear space around it.{' '}
          <Link href="/guides/tent-heater-safety">Tent heater safety</Link> explains why
          fuel-burning heaters of every kind stay outside the tent, including the ones sold with an
          oxygen sensor.
        </p>

        <h2>Plan for the power going out</h2>
        <p>
          Campground power fails most often on the nights you most want it: wind, freezing rain,
          and full RV loops all running furnaces at once. Treat the pedestal as a comfort layer,
          never as the thing keeping your family warm.
        </p>
        <p>
          That means the same sleep system you would bring without power. An insulated pad under
          every person, such as the{' '}
          <AmazonLink productId="mondoking-3d-pad" pageSlug="tent-camping-at-an-electric-site" />,
          matters more than anything you plug in. A bag rated below the forecast low, dry base
          layers, a hat, and a snack before bed do the rest. Air-activated{' '}
          <AmazonLink
            productId="hothands-hand-warmers-bulk"
            pageSlug="tent-camping-at-an-electric-site"
          />{' '}
          tucked into a sock at the foot of a bag are the no-power version of the electric blanket.{' '}
          <Link href="/guides/how-to-keep-kids-warm-camping">How to keep kids warm camping</Link>{' '}
          covers that full ground-up system, and{' '}
          <Link href="/guides/camping-in-40-degree-weather">camping in 40-degree weather</Link>{' '}
          explains how to match it to the low on the forecast.
        </p>

        <h2>Frequently asked</h2>
        <h3>Can you tent camp at an electric campsite?</h3>
        <p>
          Yes, at most state parks and many private campgrounds. Check for a tent limit and the pad
          surface before booking, and expect to pay a few dollars to around $15 more per night.
        </p>
        <h3>What do I need to plug into a campground power pedestal with a tent?</h3>
        <p>
          One outdoor-rated 12-gauge extension cord long enough to reach the tent door, plus a small
          30-amp-to-15-amp adapter as a backup. Skip joined-together indoor cords.
        </p>
        <h3>Is it safe to use an electric blanket in a tent?</h3>
        <p>
          It is one of the safest and most useful things to plug in. Follow the label, use one with
          an auto shutoff, keep it away from babies, and make sure the sleep system still works
          without it.
        </p>
        <h3>Can I run a space heater in my tent at an electric site?</h3>
        <p>
          Only if the campground allows it, only while someone is awake, with three feet of clear
          space, and never overnight. It draws close to the full rating of the cord and is a real
          fire risk against tent fabric.
        </p>
      </GuidePage>
      <GuideGearShelf
        guideSlug="tent-camping-at-an-electric-site"
        heading="Gear for a powered tent site"
      />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="tent-camping-at-an-electric-site" />
    </>
  )
}
