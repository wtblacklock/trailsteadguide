import Link from 'next/link'
import { GuidePage } from '@/components/guide/GuidePage'
import { QuickAnswer } from '@/components/guide/QuickAnswer'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import GuideGearShelf from '@/components/guide/GuideGearShelf'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/guides/easy-family-camping-meals'
const TITLE = 'Easy Family Camping Meals'
const META_TITLE = 'Easy Family Camping Meals — 15 Proven Recipes'
const DESCRIPTION =
  'Easy family camping meals that actually work: simple recipes for every meal, a two-night meal plan, and what to prep at home so camp cooking is fast and low-stress.'
const HERO_IMAGE =
  'https://images.unsplash.com/hlDlZYORtu8?w=1400&auto=format&fit=crop&q=80'

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
            q: 'What are easy meals for camping with kids?',
            a: 'Hot dogs or sausages over the fire, foil packet meals (chicken, potatoes, vegetables wrapped in foil and cooked on the grill grate), scrambled eggs with bacon on a camp stove, and sandwiches from the cooler for lunch. These four cover most of a two-night family trip with minimal cooking skill and no special equipment.',
          },
          {
            q: 'What food should I bring camping for 2 nights?',
            a: 'Day 1 dinner: hot dogs or sausages. Day 2 breakfast: scrambled eggs and bacon. Day 2 lunch: deli sandwiches or wraps. Day 2 dinner: foil packet meals. Day 3 breakfast: cereal or granola bars before packing up. Snacks throughout: trail mix, fruit, string cheese, crackers. Over-pack snacks by at least 50%.',
          },
          {
            q: 'How do you cook camping meals with kids?',
            a: 'Keep it simple, prep at home, and give kids a real job. Marinate proteins the night before in a sealed bag — no prep needed at camp. Let kids arrange foil packets, stir scrambled eggs, and toast their own marshmallows. The cooking becomes part of the camp activity rather than a chore parents do while kids wait.',
          },
          {
            q: 'What is a foil packet meal?',
            a: 'A foil packet meal is a portion of protein, vegetables, and seasoning wrapped in a double layer of aluminum foil and cooked directly on a campfire grill grate. It takes 25–35 minutes at medium heat. Each person gets their own packet, which means no shared dishes and only the foil to clean up.',
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
        slug="easy-family-camping-meals"
        eyebrow="Camp food"
        title="Easy Family Camping Meals"
        lede="Simple food that travels well, cooks fast, and kids will actually eat — plus a complete two-night meal plan you can use without modification."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'Family cooking over a camp stove at a picnic table with kids helping',
        }}
      >
        <QuickAnswer
          tldr="Prep everything at home. Keep cooking simple. Over-pack snacks."
          summary="Camp food planning has three rules: bring food you know your kids eat, prep as much as possible before leaving home, and pack twice the snacks you think you need. The meals that work best for families are hot dogs (fast, kids love them, minimal cleanup), scrambled eggs (one pan, everyone eats, morning camp ritual), foil packet meals (one packet per person, cooks on the grill grate, no dishes), and sandwiches from the cooler for lunch. Avoid debuting new food at camp — hunger plus unfamiliar food plus exhaustion is a reliable meltdown trigger."
        />

        <h2>The rules of camp food with kids</h2>
        <p>
          Camp cooking with kids is different from camp cooking for adults. The rules that make it work:
        </p>
        <ul>
          <li><strong>Never debut new food.</strong> Whatever your kids will reliably eat at home, bring that. Camp is not the moment to try quinoa bowls or spiced chickpeas. A kid who won&apos;t eat dinner at camp is a problem that lasts through bedtime.</li>
          <li><strong>Prep at home, not at camp.</strong> Chop vegetables, marinate proteins, and portion dry ingredients into labeled bags before you leave. Arriving at a campsite at 5pm with hungry kids and nothing ready is a common mistake. Arrive with food that needs 15 minutes of cooking, not an hour of prep.</li>
          <li><strong>Over-pack snacks by 50%.</strong> Camp kids burn more energy than home kids, eat on a different schedule than adults, and ask for snacks constantly. The one time you run out of snacks will be exactly when someone is hanging by a thread.</li>
          <li><strong>Give kids cooking jobs.</strong> Tearing lettuce, arranging foil packets, stirring eggs, and toasting marshmallows are all achievable for kids 4 and up. Participation improves eating compliance significantly — kids who helped make dinner eat it more willingly.</li>
          <li><strong>Pack-out day: no cooking.</strong> The morning you break camp is not the time for a hot breakfast. Cereal, granola bars, fruit, and boxed milk require zero setup and zero cleanup.</li>
        </ul>

        <h2>Complete two-night family meal plan</h2>
        <p>
          This plan feeds a family of 4 for two nights, assumes you arrive Friday evening, and accounts for real camp conditions: tired kids on arrival, peak hunger on Saturday, and a fast pack-out Sunday morning.
        </p>

        <h3>Friday evening: Arrival dinner</h3>
        <p>
          <strong>Hot dogs or pre-cooked sausages</strong> over the campfire or camp stove grill. Bring pre-sliced buns, condiments in small squeeze bottles, and a bag of chips or pre-cut vegetables. This meal cooks in 10 minutes, requires zero prep, and is something most kids will eat without negotiation. Start the fire while the adults unload the car, cook as soon as the fire has coals.
        </p>
        <p>
          <strong>Why this works:</strong> You arrive later than planned, the kids are wired from the car, and you&apos;ll be setting up camp at the same time. A meal that requires nothing is the right Friday meal.
        </p>

        <h3>Saturday breakfast: Scrambled eggs and bacon</h3>
        <p>
          <strong>Pre-cracked eggs in a sealed jar or zip-lock bag</strong> (crack at home to save camp time), bacon strips, and bread for toast directly on the grill grate. One large skillet, medium heat on the two-burner stove. Bring coffee for adults and hot chocolate packets for kids.
        </p>
        <p>
          <strong>Prep at home:</strong> Crack eggs into a mason jar, whisk with salt and a splash of milk, seal and refrigerate. At camp, pour directly into the skillet — no cracking shells with cold hands.
        </p>
        <p>
          This is consistently the meal families remember most from their first camping trip. Something about the morning air and the camp stove makes scrambled eggs taste better than they ever do at home.
        </p>

        <h3>Saturday lunch: Deli sandwiches from the cooler</h3>
        <p>
          Deli meat, cheese, bread, condiment packets, and whatever produce travels well (apples, carrots, snap peas). No cooking. Lay everything out on the picnic table and let kids assemble their own.
        </p>
        <p>
          <strong>Why self-assembly:</strong> Kids who build their own sandwiches eat them. Kids who are handed a pre-made sandwich often don&apos;t.
        </p>

        <h3>Saturday dinner: Foil packet meals</h3>
        <p>
          Each person gets their own foil packet: protein + vegetables + seasoning, wrapped in double foil, cooked on the campfire grill grate for 25–35 minutes. No shared pot, no dishes, one piece of foil per person.
        </p>

        <p><strong>Basic chicken foil packet (per person):</strong></p>
        <ul>
          <li>1 chicken thigh, boneless and skinless (marinate in Italian dressing at home)</li>
          <li>½ cup diced potatoes (pre-dice at home)</li>
          <li>¼ cup sliced bell pepper and onion (pre-slice at home)</li>
          <li>Salt, pepper, garlic powder</li>
          <li>Drizzle of olive oil</li>
        </ul>
        <p>Wrap tightly in two layers of foil. Cook on the grill grate over medium fire coals, turning once halfway through. 30 minutes for chicken thighs, 25 minutes for sausage.</p>

        <p><strong>Kid-friendly variation:</strong> hot dogs + baked beans + corn — same foil packet method, cook for 15 minutes.</p>
        <p><strong>Vegetarian variation:</strong> black beans + diced potato + cheese + salsa — 25 minutes, open the foil for the last 5 minutes to melt the cheese.</p>

        <h3>Sunday breakfast: No-cook pack-out meal</h3>
        <p>
          Cereal with boxed shelf-stable milk, granola bars, fruit (bananas, clementines), and granola. Everything eaten out of its own container. Zero cooking, zero dishes, everything goes in the trash or recycling.
        </p>
        <p>
          The Sunday morning mantra: the faster camp breaks down, the less cranky everyone gets.
        </p>

        <h2>Snack list for two nights</h2>
        <ul>
          <li>Trail mix (one large bag per 2 people)</li>
          <li>Fruit pouches or applesauce packets (kids eat these constantly)</li>
          <li>String cheese or Babybel rounds (stay cold in the cooler through day 2)</li>
          <li>Crackers and peanut butter packs</li>
          <li>Clementines or bananas (no refrigeration needed)</li>
          <li>One &ldquo;camp treat&rdquo; that only comes out at camp — Oreos, Pringles, whatever yours is</li>
          <li>S&apos;mores kit: graham crackers, chocolate bars, marshmallows</li>
        </ul>

        <h2>Campfire cooking basics</h2>
        <p>
          Most camp cooking mistakes come from cooking over active flame rather than hot coals. A campfire with visible flames is too hot and too unpredictable for most food — it burns the outside and leaves the inside raw. Wait for the fire to burn down to orange-glowing coals before cooking over it. This takes 30–45 minutes from ignition.
        </p>
        <p>
          The camp stove bypasses this entirely — use the stove for breakfast and anything that needs precise heat, and use the campfire for foil packets and hot dogs once you have coals.
        </p>

        <h2>Cooler management</h2>
        <p>
          A cooler that stays cold keeps food safe and saves the trip. The practices that matter:
        </p>
        <ul>
          <li><strong>Pre-chill the cooler before packing.</strong> A warm cooler melts ice immediately. Put a bag of ice in the empty cooler the night before packing.</li>
          <li><strong>Use block ice, not cubed.</strong> Block ice lasts 2–3× longer than cubed. Buy block ice at home, supplement with bag ice at camp.</li>
          <li><strong>Keep drinks in a separate cooler.</strong> Every time you open the cooler for a drink, you let warm air in. A cheap second cooler just for drinks keeps the food cooler sealed and cold for much longer.</li>
          <li><strong>Pack in reverse meal order.</strong> Last meal in first, first meal out on top. You should not have to dig through the cooler to get dinner.</li>
          <li><strong>Drain water daily.</strong> Standing water from melted ice accelerates cooling loss. Drain it or keep food in waterproof bags.</li>
        </ul>

        <h2>Food safety at camp</h2>
        <ul>
          <li>Keep the cooler below 40&deg;F. Check with a thermometer if camping more than two nights.</li>
          <li>Wash hands before handling food — camp hand sanitizer is good enough when a sink isn&apos;t nearby.</li>
          <li>Store all food and trash in a car or bear box overnight. This is required in bear country and strongly advisable everywhere.</li>
          <li>Don&apos;t leave cooked food out for more than 2 hours, 1 hour if the temperature is over 90&deg;F.</li>
        </ul>

        <h2>Frequently asked</h2>
        <h3>What are easy meals for camping with kids?</h3>
        <p>Hot dogs over the fire, scrambled eggs on the stove, foil packet meals on the grill grate, and cooler sandwiches for lunch. These four cover a full two-night trip.</p>
        <h3>What food should I bring camping for 2 nights?</h3>
        <p>Friday dinner: hot dogs. Saturday breakfast: egg skillet. Saturday lunch: deli sandwiches. Saturday dinner: foil packets. Sunday breakfast: cereal + granola bars. Plus heavy snacks throughout.</p>
        <h3>How do you cook camping meals with kids?</h3>
        <p>Prep everything at home, give kids a real job in the cooking, and keep the recipes simple enough to finish in under 20 minutes of active cooking.</p>
        <h3>What is a foil packet meal?</h3>
        <p>Protein + vegetables + seasoning wrapped in double foil, cooked on a campfire grill grate for 25–35 minutes. Each person gets their own packet. No shared dishes.</p>
      </GuidePage>
      <GuideGearShelf guideSlug="easy-family-camping-meals" />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="easy-family-camping-meals" />
    </>
  )
}
