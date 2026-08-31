import Link from 'next/link'
import { GuidePage } from '@/components/guide/GuidePage'
import { QuickAnswer } from '@/components/guide/QuickAnswer'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import GuideGearShelf from '@/components/guide/GuideGearShelf'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/guides/campfire-recipes-for-kids'
const TITLE = 'Campfire Recipes for Kids'
const META_TITLE = 'Campfire Recipes for Kids - 10 Ideas'
const DESCRIPTION =
  'Campfire recipes for kids beyond s\'mores: build-your-own foil packets, pie iron sandwiches, roasting stick foods, and desserts kids can help make themselves.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1756719097664-82e33a1b1ac2?w=1400&auto=format&fit=crop&q=80'

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
            q: 'What age can kids start roasting things over a campfire?',
            a: 'Most kids can handle a long telescoping roasting stick with close supervision starting around age 5-6 - old enough to understand to keep the stick tip away from their body and to stay seated while roasting. Younger kids can still participate by choosing and loading foil packet ingredients, which keeps them well back from the coals entirely.',
          },
          {
            q: 'Can kids help build their own foil packet dinner?',
            a: 'Yes, and it\'s one of the best campfire activities for kids precisely because it\'s hands-on and forgiving. Set out pre-cut ingredients in bowls and let each kid assemble their own packet - there\'s no wrong combination, and cooking their own food is a reliable way to get a picky eater to actually eat it.',
          },
          {
            q: 'What\'s a good campfire dessert besides s\'mores?',
            a: 'Banana boats - a banana split lengthwise, stuffed with chocolate chips and mini marshmallows, wrapped in foil and warmed in the coals - are the most popular alternative. Campfire cones (crescent roll dough wrapped around a stick and toasted, then filled) are a close second.',
          },
          {
            q: 'Do I need a pie iron for campfire cooking?',
            a: 'No, it\'s a nice-to-have, not a requirement. A pie iron makes grilled-cheese and pizza-pocket style sandwiches easy, but foil packets and roasting sticks cover the same ground - build-your-own meals and toasted foods - without any special equipment.',
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
        slug="campfire-recipes-for-kids"
        eyebrow="Camp food"
        title="Campfire Recipes for Kids"
        lede="Beyond s'mores: build-your-own foil packets, pie iron sandwiches, roasting stick foods, and desserts kids can actually help make."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'A child eating a toasted marshmallow off a roasting stick',
        }}
      >
        <QuickAnswer
          tldr="Coals, not flames. Let kids build their own foil packets and roast their own food on a long stick - hands-on cooking is the point, not just the meal."
          summary="The best campfire food for kids is hands-on: something they assemble or roast themselves, not just something handed to them cooked. Build-your-own foil packets let kids pick their own combination of ingredients with zero wrong answers. Roasting sticks turn hot dogs, garlic bread, and marshmallows into an activity, not just a meal. A pie iron makes grilled-cheese and pizza-pocket sandwiches with almost no skill required. And banana boats give kids a dessert beyond s'mores that they can build themselves before it goes in the coals. All of it depends on the fire being coals, not flames - wait 30-45 minutes after lighting before cooking over it."
        />

        <h2>Coals, not flames</h2>
        <p>
          Every recipe here depends on cooking over glowing orange coals, not active flame - the
          same rule that applies to any campfire cooking. Flames burn the outside of food before
          the inside cooks and are unpredictable to work near with kids close to the fire. Give the
          fire 30-45 minutes to burn down before starting to cook, and keep kids on stick-roasting
          duty seated, not standing and reaching.
        </p>

        <h2>Build-your-own foil packets</h2>
        <p>
          Set out small bowls of pre-cut ingredients - diced chicken or sausage, sliced potatoes,
          peppers, onions, corn, a pat of butter, seasoning - and let each kid build their own foil
          packet. There&apos;s no wrong combination, and a kid who cooked their own dinner is far more
          likely to actually eat it. Double-wrap in foil, seal the edges tightly, and cook directly
          on the coals for 15-20 minutes, flipping once.
        </p>

        <h2>Roasting stick foods beyond marshmallows</h2>
        <p>
          A good telescoping roasting stick is good for more than s&apos;mores. Hot dogs work exactly
          the same way. Garlic bread - a slice buttered and garlic-seasoned, held over the coals
          until golden - is a fast side. Refrigerated biscuit or crescent dough wrapped in a spiral
          around the stick and toasted until golden makes a &ldquo;campfire twist&rdquo; that can
          be filled with jam or butter after.
        </p>

        <h2>Pie iron sandwiches</h2>
        <p>
          A pie iron - two hinged metal plates on long handles - turns bread and fillings into a
          sealed, toasted pocket in the coals. Butter both outer sides of two bread slices, fill
          with cheese (grilled cheese) or pizza sauce, cheese, and pepperoni (pizza pocket), close
          the iron, and hold in the coals for 3-4 minutes per side. It&apos;s not required equipment,
          but it&apos;s an easy win if you already have one.
        </p>

        <h2>Campfire desserts beyond s&rsquo;mores</h2>
        <h3>Banana boats</h3>
        <p>
          Slice a banana lengthwise without cutting all the way through, stuff the slit with
          chocolate chips and mini marshmallows, wrap in foil, and warm in the coals for 5-8
          minutes until melted. Eat straight out of the peel with a spoon - no plate needed.
        </p>
        <h3>Campfire cones</h3>
        <p>
          Fill a waffle cone with marshmallows, chocolate chips, and fruit, wrap in foil, and warm
          at the edge of the coals for a few minutes until everything softens. A good low-mess
          option for a group of kids who each want their own.
        </p>

        <h2>Keeping kids safe around the coals</h2>
        <ul>
          <li>
            <strong>Long sticks, seated roasting.</strong> A telescoping stick keeps hands well
            back from heat, and roasting from a seated position prevents the stumble-into-the-fire
            scenario that standing and reaching invites.
          </li>
          <li>
            <strong>One adult on fire duty during active cooking.</strong> Foil packets and pie
            irons go directly into or next to the coals - that part is adult work even when kids
            built the packet themselves.
          </li>
          <li>
            <strong>Establish a fire perimeter</strong> kids don&apos;t cross without an adult, the same
            rule that applies any time a campfire is going.
          </li>
        </ul>
        <p>
          For the fire itself - building it, keeping it burning at the right stage for cooking -
          see <Link href="/skills/fire/starting-a-fire">starting a fire</Link> and{' '}
          <Link href="/skills/fire/fire-structures">fire structures</Link>.
        </p>

        <h2>What to prep at home</h2>
        <p>
          Pre-cut all foil packet vegetables and proteins at home and store them in labeled bags or
          containers - cutting boards and knives are not a kid-camp-cooking activity. Pre-butter
          bread for pie irons if you&apos;re bringing one. The more that&apos;s ready to simply assemble at
          the picnic table, the more of this is actually kid-led rather than parent-led with kids
          watching.
        </p>
        <p>
          For the rest of the meal plan around these recipes, see{' '}
          <Link href="/guides/easy-family-camping-meals">easy family camping meals</Link> or the
          full <Link href="/guides/camping-meal-plan-family">family camping meal plan</Link>.
        </p>

        <h2>Frequently asked</h2>
        <h3>What age can kids start roasting things over a campfire?</h3>
        <p>
          Around age 5-6 with close supervision and a long telescoping stick. Younger kids can
          still help by building foil packets well back from the coals.
        </p>
        <h3>Can kids help build their own foil packet dinner?</h3>
        <p>
          Yes - set out pre-cut ingredients and let them assemble their own combination. It&apos;s
          forgiving, hands-on, and gets picky eaters to actually eat what they made.
        </p>
        <h3>What&apos;s a good campfire dessert besides s&apos;mores?</h3>
        <p>
          Banana boats - a banana stuffed with chocolate chips and marshmallows, foil-wrapped and
          warmed in the coals - are the most popular alternative, with campfire cones a close second.
        </p>
        <h3>Do I need a pie iron for campfire cooking?</h3>
        <p>
          No. It&apos;s a nice-to-have for sealed toasted sandwiches, but foil packets and roasting
          sticks cover the same hands-on ground without any special equipment.
        </p>
      </GuidePage>
      <GuideGearShelf guideSlug="campfire-recipes-for-kids" heading="Gear that makes campfire cooking kid-led" />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="campfire-recipes-for-kids" />
    </>
  )
}
