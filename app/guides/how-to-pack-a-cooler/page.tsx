import Link from 'next/link'
import { GuidePage } from '@/components/guide/GuidePage'
import { QuickAnswer } from '@/components/guide/QuickAnswer'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import GuideGearShelf from '@/components/guide/GuideGearShelf'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/guides/how-to-pack-a-cooler'
const TITLE = 'How to Pack a Cooler for Camping'
const META_TITLE = 'How to Pack a Cooler for Camping'
const DESCRIPTION =
  'How to pack a camping cooler so ice actually lasts: pre-chilling, block vs. cubed ice, the two-cooler split, and the packing order that keeps food cold for days.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1685395802119-674108d9c7b8?w=1400&auto=format&fit=crop&q=80'

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
            q: 'Should ice go on the bottom or top of a cooler?',
            a: 'Both. A layer of block ice on the bottom cools from below and lasts the longest, since cold air sinks and settles there anyway. Fill the remaining gaps around and on top of food with cubed ice, which cools faster but melts faster — the combination covers both jobs.',
          },
          {
            q: 'How long does ice actually last in a packed cooler?',
            a: 'A budget cooler holds ice 2-3 days with good packing technique. A mid-tier cooler with thicker insulation gets 4-5 days. A premium rotomolded cooler (Yeti/RTIC tier) can hold ice 7-10 days. Packing technique — pre-chilling, block ice, minimizing how often it\'s opened — affects this as much as the cooler itself.',
          },
          {
            q: 'Do I need a separate cooler for drinks?',
            a: 'Not required, but it\'s the single highest-leverage change if you want food to last longer. Drinks get grabbed constantly, and every opening lets warm air in and speeds up melt. A cheap second cooler just for drinks keeps the food cooler sealed and stable.',
          },
          {
            q: 'Can I use dry ice in a camping cooler?',
            a: 'Yes, for extending a multi-day trip, but handle it carefully: never touch it bare-handed, keep it wrapped in newspaper or cardboard (not directly on food), and make sure the cooler isn\'t airtight — dry ice releases CO2 gas that needs somewhere to vent.',
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
        slug="how-to-pack-a-cooler"
        eyebrow="How-to"
        title="How to Pack a Cooler for Camping"
        lede="Pre-chilling, block vs. cubed ice, the two-cooler split, and the packing order that actually keeps food cold for a multi-day trip."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'A cooler and camp chair on the shore of a lake at golden hour',
        }}
      >
        <QuickAnswer
          tldr="Pre-chill the cooler, use block ice on the bottom plus cubed ice to fill gaps, pack in reverse meal order, and keep drinks in a separate cooler."
          summary="How you pack a cooler matters more than which cooler you own. Pre-chill it the night before so it isn't absorbing warmth the moment you load it. Put a layer of block ice on the bottom — it melts slowly and cools from below, where cold air naturally settles. Pack food on top, then fill every remaining gap with cubed ice, which cools fast but melts fast. Pack in reverse meal order so the first meal you'll eat sits on top, not buried at the bottom. And keep drinks in a separate, cheaper cooler — they get opened constantly, and every opening is warm air getting into the cooler that actually needs to stay cold."
        />

        <h2>Pre-chill before you pack</h2>
        <p>
          A room-temperature cooler absorbs heat from its own walls the moment you load it, which
          wastes a meaningful chunk of your ice before the trip even starts. The night before, put
          a bag of ice in the empty cooler and leave the lid closed. By packing time, the interior
          is already cold and the ice you add is working to maintain temperature, not create it
          from scratch.
        </p>

        <h2>Block ice vs. cubed ice — use both</h2>
        <p>
          Block ice has less surface area relative to its volume, so it melts slowly and holds a
          low temperature for days. Cubed ice has more surface area, so it chills faster on
          contact but disappears faster too. Neither one alone is optimal: block ice for the
          multi-day base layer, cubed ice to fill the odd-shaped gaps around food that a block
          can&apos;t reach.
        </p>
        <p>
          If you only have access to one, block ice is the better single choice for a trip longer
          than two nights. Freeze water in a clean milk jug or reusable container at home if bagged
          block ice isn&apos;t available where you&apos;re buying groceries.
        </p>

        <h2>The layering order</h2>
        <ol>
          <li><strong>Bottom: block ice.</strong> Cold air sinks, so ice on the bottom cools the entire cooler from the coldest point up.</li>
          <li><strong>Middle: food, packed tight.</strong> Less air space inside the cooler means less room for warm air to circulate. Fill gaps with extra ice rather than leaving them empty.</li>
          <li><strong>Top: cubed ice, filling every remaining gap.</strong> This is also where anything you&apos;ll grab most often should sit, since the top gets disturbed every time the lid opens.</li>
        </ol>

        <h2>Pre-freeze what you can</h2>
        <p>
          Proteins you&apos;re not cooking until day two or three can go into the cooler frozen solid —
          they act as extra ice blocks on the way down and are perfectly thawed by the time you
          need them. The same trick works for juice boxes and water bottles: a few frozen ahead of
          time add cooling capacity and become cold drinks later in the trip.
        </p>

        <h2>Split food and drinks into two coolers</h2>
        <p>
          This is the single highest-leverage change if ice keeps disappearing faster than
          expected. Drinks get grabbed constantly throughout the day, and every time the lid opens,
          warm air moves in and cold air spills out. A second, cheaper cooler dedicated to drinks
          means the food cooler — the one that actually needs to stay cold for food safety — gets
          opened a fraction as often.
        </p>

        <h2>Pack in reverse meal order</h2>
        <p>
          Load the cooler in the reverse order you&apos;ll eat: the last meal of the trip goes in first,
          at the bottom, and the very first meal sits on top, easy to reach. Digging through three
          days of food to find tonight&apos;s dinner defeats the packing effort and lets warm air sit in
          an open cooler far longer than it should. This is the same principle covered in the{' '}
          <Link href="/guides/camping-meal-plan-family">family camping meal plan</Link>, applied
          specifically to how the cooler itself gets loaded.
        </p>

        <h2>What not to put in the cooler</h2>
        <ul>
          <li>
            <strong>Bread, buns, and chips.</strong> They get crushed or soggy from ice contact.
            Pack them in a separate dry box or bin instead.
          </li>
          <li>
            <strong>Anything without a sealed container.</strong> Melt water will find its way in;
            loose items get waterlogged. Use zip-top bags or hard containers for everything.
          </li>
          <li>
            <strong>A full trip&apos;s worth of snacks.</strong> Shelf-stable snacks belong in the dry
            bin, not competing for cooler space that ice and perishables actually need.
          </li>
        </ul>

        <h2>Managing melt water</h2>
        <p>
          Check the drain plug daily and drain accumulated water rather than letting food sit in
          it — standing water speeds up temperature loss and risks contaminating unsealed items.
          If the cooler doesn&apos;t have a drain plug, tilt it to pour water out instead of opening it
          fully, which limits how much warm air gets in during the process.
        </p>

        <h2>How long ice actually lasts by cooler type</h2>
        <p>
          Packing technique matters, but the cooler itself sets the ceiling. A budget hard cooler
          typically holds ice 2-3 days with good packing. A mid-tier cooler with thicker walls
          stretches that to 4-5 days. A premium rotomolded cooler can hold ice 7-10 days. See the{' '}
          <Link href="/compare/best-beginner-cooler">best beginner cooler comparison</Link> for
          picks across all three tiers, or{' '}
          <Link href="/compare/rolling-cooler-vs-steel-belted-cooler">
            rolling vs. steel-belted
          </Link>{' '}
          if portability is the deciding factor.
        </p>

        <h2>Frequently asked</h2>
        <h3>Should ice go on the bottom or top of a cooler?</h3>
        <p>
          Both — block ice on the bottom for the long-lasting base layer, cubed ice filling the
          gaps around and on top of food.
        </p>
        <h3>How long does ice actually last in a packed cooler?</h3>
        <p>
          2-3 days for a budget cooler, 4-5 for mid-tier, 7-10 for a premium rotomolded cooler,
          assuming good packing technique in each case.
        </p>
        <h3>Do I need a separate cooler for drinks?</h3>
        <p>
          Not required, but it&apos;s the highest-leverage change available — drinks get opened far
          more often than food, and every opening lets warm air into whichever cooler it&apos;s in.
        </p>
        <h3>Can I use dry ice in a camping cooler?</h3>
        <p>
          Yes, for longer trips. Never touch it bare-handed, keep it wrapped rather than
          touching food directly, and don&apos;t seal the cooler completely airtight.
        </p>
      </GuidePage>
      <GuideGearShelf guideSlug="how-to-pack-a-cooler" heading="Coolers that hold up on a real trip" />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="how-to-pack-a-cooler" />
    </>
  )
}
