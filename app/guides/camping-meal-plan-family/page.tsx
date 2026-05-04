import Link from 'next/link'
import { GuidePage } from '@/components/guide/GuidePage'
import { QuickAnswer } from '@/components/guide/QuickAnswer'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/guides/camping-meal-plan-family'
const TITLE = 'Family Camping Meal Plan'
const META_TITLE = 'Family Camping Meal Plan — 3-Day Template'
const DESCRIPTION =
  'A complete 3-day family camping meal plan: every meal from arrival through pack-out, what to prep at home, and a shopping list you can print and take to the store.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1472745433479-4556f22e32c2?w=1400&auto=format&fit=crop&q=80'

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
      <Breadcrumbs
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Guides', url: `${SITE_URL}/guides` },
          { name: TITLE, url: `${SITE_URL}${SLUG}` },
        ]}
      />
      <GuidePage
        slug="camping-meal-plan-family"
        eyebrow="Camp food"
        title="Family Camping Meal Plan"
        lede="A complete 3-day plan — from arrival dinner through pack-out breakfast — with what to prep at home, what to cook at camp, and a complete shopping list."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'Family eating a meal together at a picnic table at their campsite',
        }}
      >
        <QuickAnswer
          tldr="Prep proteins and vegetables at home. Keep arrival meals simple. Over-pack snacks."
          summary="A 3-day family camping meal plan has three principles: arrival meals should require no prep (hot dogs, pre-made wraps, sandwiches), days 2 and 3 meals can be more involved if you prepped at home (marinated proteins, pre-cut vegetables, eggs cracked into a jar), and pack-out morning is always a no-cook meal. Snacks are a parallel food category — over-pack them by 50%. The meals that consistently work for families: scrambled eggs and bacon for breakfast, deli sandwiches for lunch, foil packet meals or skillet dinners for dinner."
        />

        <h2>Before you leave home: prep list</h2>
        <p>
          The most important camp cooking happens before you leave the house. Anything that can be prepped in advance should be:
        </p>
        <ul>
          <li><strong>Crack and whisk eggs</strong> into a sealed mason jar (salt and a splash of milk). At camp, pour directly into the skillet — no cracking with cold hands in the dark.</li>
          <li><strong>Marinate proteins.</strong> Chicken thighs, sausage, or steak in a sealed bag with marinade. Refrigerate overnight. Arrives at camp ready to cook.</li>
          <li><strong>Pre-cut vegetables.</strong> Peppers, onions, potatoes, and zucchini for foil packets or skillet meals. Stored in labeled bags.</li>
          <li><strong>Pre-assemble dry ingredients.</strong> Pancake mix in a zip-lock bag. Spice mixes in small bags. Coffee and filters pre-portioned.</li>
          <li><strong>Build and freeze the ice.</strong> Start with a frozen cooler (put ice in the night before) to extend ice life significantly.</li>
        </ul>

        <h2>Day 1 — Arrival (Friday evening)</h2>

        <h3>Dinner: Hot dogs and sausages</h3>
        <p>
          Hot dogs or pre-cooked sausages cooked over the fire or on the camp stove grill. Sides: pre-cut vegetables, chips, and fruit. This meal requires zero prep at camp, cooks in 10 minutes, and is something almost every kid will eat.
        </p>
        <p>
          Why this specifically: You arrive later than planned. Camp setup takes longer than expected. Kids are wired from the car. A meal that requires nothing from you is the right Friday meal.
        </p>

        <h3>Dessert: S&apos;mores</h3>
        <p>
          Required on the first night. Graham crackers, chocolate bars, and marshmallows. The campfire s&apos;more is the ritual that gets kids invested in future camping trips.
        </p>

        <h2>Day 2 — Full camp day (Saturday)</h2>

        <h3>Breakfast: Scrambled eggs and bacon</h3>
        <ul>
          <li>Pre-whisked eggs from the mason jar, poured directly into a buttered skillet</li>
          <li>Bacon in a separate pan or in the same skillet before the eggs</li>
          <li>Pre-sliced bread toasted on the grill grate or in the skillet</li>
          <li>Coffee on the second burner, hot chocolate packets for kids</li>
        </ul>
        <p>
          This is the breakfast camp families remember. Something about the air and the camp stove makes scrambled eggs taste better than they do at home. Budget 30 minutes total.
        </p>

        <h3>Lunch: Deli sandwich bar</h3>
        <ul>
          <li>Deli meat (turkey, ham, salami)</li>
          <li>Sliced cheese</li>
          <li>Bread, rolls, or wraps</li>
          <li>Condiment packets (mustard, mayo, ketchup)</li>
          <li>Apples, carrot sticks, snap peas</li>
          <li>Chips or crackers</li>
        </ul>
        <p>
          No cooking. Lay everything on the picnic table and let kids build their own. Self-assembly improves eating compliance and gives kids something to do during the 10 minutes while adults get set up.
        </p>

        <h3>Afternoon snack</h3>
        <p>
          Plan a structured snack time around 3:30–4pm. Camp kids burn more energy than home kids and have a consistent crash window in the late afternoon. Having the snack ready before anyone gets hungry prevents the meltdown.
        </p>
        <ul>
          <li>Trail mix, string cheese, fruit pouches, crackers and peanut butter packs</li>
        </ul>

        <h3>Dinner: Foil packet meals</h3>
        <p>
          One packet per person. Each packet contains a portion of the pre-marinated protein, pre-cut vegetables, and seasoning, wrapped in a double layer of aluminum foil. Cooked on the campfire grill grate for 25–35 minutes, turning once.
        </p>
        <p>
          <strong>Chicken foil packet:</strong> 1 boneless chicken thigh (marinated in Italian dressing), ½ cup diced potato, ¼ cup sliced pepper and onion, olive oil, salt, pepper, garlic powder. 30–35 minutes over medium coals.
        </p>
        <p>
          <strong>Kid-friendly option:</strong> Pre-cooked sausage slices + corn + baked beans. 15 minutes.
        </p>
        <p>
          No dishes to wash. One piece of foil per person. This is the simplest high-satisfaction family camp dinner.
        </p>

        <h2>Day 3 — Final camp day (Sunday)</h2>

        <h3>Breakfast: Pancakes</h3>
        <p>
          Pre-portioned pancake mix (just add water — the kind in a zip-lock bag mixed at home), cooked on the camp skillet. Bring maple syrup in a small squeeze bottle. This is a Sunday morning camp tradition worth building — the smell and the ritual make it memorable.
        </p>
        <p>
          <strong>Variation:</strong> Add blueberries, chocolate chips, or banana slices to the batter. Kids who helped add their own mix-in eat the pancakes more reliably.
        </p>

        <h3>Lunch: Campfire nachos</h3>
        <p>
          A pan of tortilla chips with shredded cheese and black beans, covered in foil and heated over the fire or on the stove for 5–8 minutes until the cheese melts. Top with salsa, sour cream, and any remaining vegetable scraps. Fast, requires almost no fresh ingredients (mostly pantry items), and kids love it.
        </p>

        <h3>Dinner: Camp skillet</h3>
        <p>
          A one-pan dinner: cooked pasta or rice (pre-cooked at home in a bag), protein, and whatever vegetables are left in the cooler, combined in the camp skillet with olive oil, garlic, and a sauce packet or canned tomatoes. 15 minutes of active cooking. One pan to wash.
        </p>

        <h2>Day 4 — Pack-out day (Monday morning)</h2>

        <h3>Breakfast: No-cook</h3>
        <p>
          The pack-out morning should never involve cooking. Every minute you spend cooking is a minute you&apos;re not packing up, and packing up takes longer than expected.
        </p>
        <ul>
          <li>Cereal with boxed shelf-stable milk</li>
          <li>Granola bars and fruit</li>
          <li>Pre-made overnight oats (made the night before in the cooler)</li>
        </ul>
        <p>
          Everything eaten out of its container. Zero cooking. Zero dishes. Pack up the kitchen while kids eat.
        </p>

        <h2>Complete shopping list for a family of 4 (3 nights)</h2>

        <h3>Proteins</h3>
        <ul>
          <li>8 hot dogs or sausages (Day 1 dinner)</li>
          <li>12 eggs (Day 2 breakfast + extra)</li>
          <li>1 lb bacon (Day 2 breakfast)</li>
          <li>4 boneless chicken thighs + marinade (Day 2 dinner foil packets)</li>
          <li>1 lb Italian sausage or bratwurst (foil packet option / Day 3 skillet)</li>
          <li>Deli turkey and ham, ½ lb each (Day 2 lunch)</li>
        </ul>

        <h3>Produce</h3>
        <ul>
          <li>4 bell peppers (pre-slice, foil packets + skillet)</li>
          <li>2 onions (pre-slice)</li>
          <li>1 lb small potatoes or Yukon Gold (pre-dice, foil packets)</li>
          <li>Bag of baby carrots (snacks + lunch)</li>
          <li>Snap peas (lunch)</li>
          <li>2 apples or oranges per person (snacks + lunches)</li>
          <li>Bananas (pancake topping, snacks)</li>
        </ul>

        <h3>Dry and pantry</h3>
        <ul>
          <li>Hot dog buns, bread or rolls, and tortillas</li>
          <li>Pancake mix (just-add-water variety)</li>
          <li>Maple syrup (small bottle)</li>
          <li>Pasta (1 lb) or pre-cooked rice pouches</li>
          <li>Canned tomatoes or jarred pasta sauce</li>
          <li>1 can black beans</li>
          <li>Tortilla chips (nachos + snacks)</li>
          <li>Shredded cheese (nachos + foil packets)</li>
          <li>Graham crackers, chocolate bars, marshmallows (s&apos;mores)</li>
          <li>Cereal (pack-out breakfast)</li>
          <li>Boxed shelf-stable milk (2–3 boxes)</li>
          <li>Oats + mix-ins if doing overnight oats</li>
        </ul>

        <h3>Snacks</h3>
        <ul>
          <li>Trail mix (1 large bag per 2 people)</li>
          <li>Granola bars (2 per person per day)</li>
          <li>String cheese or Babybel rounds (12)</li>
          <li>Peanut butter packet packs</li>
          <li>Crackers (2 boxes)</li>
          <li>Fruit pouches or applesauce packets (12)</li>
          <li>One &ldquo;camp only&rdquo; treat</li>
        </ul>

        <h3>Condiments and cooking</h3>
        <ul>
          <li>Olive oil (small bottle)</li>
          <li>Butter (stick in a sealed container)</li>
          <li>Salt, pepper, garlic powder in a small bag</li>
          <li>Italian dressing (marinade + dressing)</li>
          <li>Ketchup, mustard, mayo (packets or small bottles)</li>
          <li>Salsa (small jar, nachos)</li>
          <li>Hot sauce (optional)</li>
          <li>Coffee and filters (or pods)</li>
          <li>Hot chocolate packets (one per kid per day)</li>
        </ul>

        <h3>Camp coffee and drinks</h3>
        <ul>
          <li>Ground coffee or pods</li>
          <li>Hot chocolate packets</li>
          <li>Juice boxes (2–3 per kid)</li>
          <li>Electrolyte packets (hot days)</li>
          <li>Sparkling water or soda (one special can per adult evening)</li>
        </ul>

        <h2>Tips for the cooler</h2>
        <p>
          Pack in reverse meal order: last meal in first, first meal on top. Pre-freeze proteins to extend ice life. Keep drinks in a second small cooler. Drain melt water daily. See the <Link href="/guides/easy-family-camping-meals">easy family camping meals guide</Link> for full cooler management details.
        </p>
      </GuidePage>
      <GuideArticleCTA />
      <RelatedGuides currentSlug="camping-meal-plan-family" />
    </>
  )
}
