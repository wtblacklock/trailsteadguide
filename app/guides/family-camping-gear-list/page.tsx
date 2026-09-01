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

const SLUG = '/guides/family-camping-gear-list'
const TITLE = 'Family Camping Gear List'
const META_TITLE = 'Family Camping Gear List - The Real One'
const DESCRIPTION =
  'A realistic family camping gear list for beginners: what you actually need, what to skip on the first trip, and what order to buy it in.'
const HERO_IMAGE =
  'https://images.unsplash.com/DM2UgXpV5uE?w=1400&auto=format&fit=crop&q=80'

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
            q: 'What gear do I need for camping with a family?',
            a: 'The essentials for a family car camping trip: a tent sized one category above headcount, sleeping bags rated at least 10°F below the forecast low, sleeping pads for every person, a two-burner propane stove, a cooler, a camp lantern, and one headlamp per person. Everything else is optional on the first trip.',
          },
          {
            q: 'How much does it cost to gear up for family camping?',
            a: 'For a family of four buying everything new: $300-500 if you buy entry-level gear from Coleman, REI Co-op, or similar. A 6-person tent ($100-130), four sleeping bags ($30-60 each), sleeping pads ($20-40 each), a two-burner stove ($50-80), and a cooler ($40-80) are the main costs. Everything else adds up but is optional for trip one.',
          },
          {
            q: 'Can you rent camping gear for a family?',
            a: 'Yes. REI rents tents, sleeping bags, sleeping pads, and camp stoves at most locations. Local outfitters in camping-heavy areas often rent full family setups. Renting makes sense for a first trip before you decide camping is a regular habit - the rental cost is less than buying gear you might use once.',
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
        slug="family-camping-gear-list"
        eyebrow="Gear"
        title="Family Camping Gear List"
        lede="The real list - not 200 items. What a family of four actually needs for a car camping weekend, organized by priority."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'Camping gear laid out for a family trip: tent, sleeping bags, stove, cooler',
        }}
      >
        <QuickAnswer
          tldr="Six categories of gear make a complete family car camping setup. You do not need more for trip one."
          summary="A complete family car camping kit comes down to six categories: shelter (tent + sleeping bags + pads), cooking (stove + fuel + cooler + basic cookware), lighting (one headlamp per person + a camp lantern), safety and comfort (first aid + bug spray + sunscreen + camp chairs), hygiene (hand soap + biodegradable dish soap + small towels), and clothing (layering system for temperature swings + rain jacket per person). Skip specialty items on trip one. Borrow before you buy if possible."
        />

        <h2>The complete family car camping list</h2>

        <h3>Shelter - the non-negotiables</h3>
        <ul>
          <li><strong>Tent, sized one category up from your headcount.</strong> Family of 4 = 6-person tent. Family of 5 = 8-person tent. See the <Link href="/guides/best-family-tent-for-beginners">best family tent for beginners</Link> guide for specific picks.</li>
          <li><strong>Sleeping bags, one per person.</strong> Rated at least 10&deg;F below the coldest forecast night. Kids need kid-sized bags - adult bags are too long and don&apos;t retain warmth properly for children&apos;s smaller bodies.</li>
          <li><strong>Sleeping pads or air mattresses, one per person.</strong> Ground insulation matters more than sleeping bag rating for temperature. A foam pad ($15-25) works fine. A self-inflating pad is more comfortable. A queen car camping air mattress covers two adults.</li>
          <li><strong>Tent footprint or tarp</strong> (optional but recommended). Placed under the tent floor, it extends tent life significantly by protecting the floor from ground debris.</li>
        </ul>

        <h3>Cooking</h3>
        <ul>
          <li><strong>Two-burner propane camp stove.</strong> The most important cooking piece. Cook coffee and bacon simultaneously. Coleman two-burner is the standard starting point at $50-80.</li>
          <li><strong>Propane fuel canisters.</strong> Bring one 16oz canister per two days of cooking. Green Coleman 1lb canisters are available at any hardware store or Walmart.</li>
          <li><strong>Camp pot (2qt or 3qt).</strong> For boiling water, pasta, hot chocolate, and soups.</li>
          <li><strong>Camp skillet (10-inch).</strong> For eggs, bacon, and anything you would do on a stovetop burner.</li>
          <li><strong>Spatula, tongs, and a ladle.</strong> Covers nearly all camp cooking operations.</li>
          <li><strong>Plates, bowls, and utensils for every person.</strong> Stainless steel or durable plastic camp sets work well. Bring one extra set.</li>
          <li><strong>Cups or mugs.</strong> Insulated camp mugs keep coffee hot and keep small children from burning themselves.</li>
          <li><strong>Can opener and multi-tool.</strong> You will need these eventually. Pack them.</li>
          <li><strong>Cutting board and camp knife.</strong> One small board and a sharp knife handle most camp food prep.</li>
          <li><strong>Cooler, 50qt minimum for a family of 4.</strong> See the <Link href="/guides/easy-family-camping-meals">family camping meals guide</Link> for cooler management tips.</li>
          <li><strong>Small wash basin, biodegradable dish soap, and a dish towel.</strong> For washing dishes away from water sources.</li>
          <li><strong>Aluminum foil.</strong> For foil packet meals and improvised cooking.</li>
          <li><strong>Resealable plastic bags in multiple sizes.</strong> For food storage, keeping dry items dry, and organizing small gear.</li>
        </ul>

        <h3>Lighting</h3>
        <ul>
          <li><strong>One headlamp per person, plus two spares.</strong> Headlamps go missing in tents. Every person needs their own. Kids&apos; headlamps with a red-light mode don&apos;t wake sleeping siblings. Buy 2-3 extra budget headlamps as spares.</li>
          <li><strong>Camp lantern.</strong> For the picnic table and tent interior. LED lanterns run for days on D-cell batteries and are safer around kids than propane lanterns. One or two per family.</li>
          <li><strong>Spare batteries.</strong> For headlamps and lantern. Pack them even if everything is fully charged.</li>
        </ul>

        <h3>Safety and comfort</h3>
        <ul>
          <li><strong>First aid kit.</strong> At minimum: bandages in multiple sizes, antiseptic wipes, antibiotic ointment, tweezers (tick removal), moleskin (blisters), ibuprofen and children&apos;s acetaminophen, and any family-specific medications. Pre-packaged camp first aid kits are fine and save time.</li>
          <li><strong>Bug spray.</strong> DEET (30% for adults, lower concentration for kids) or picaridin for tick country. Permethrin spray for treating clothing adds another layer of protection.</li>
          <li><strong>Sunscreen.</strong> SPF 30+ for adults, SPF 50 for kids. Reapply every 2 hours outside.</li>
          <li><strong>Camp chairs, one per person.</strong> Kids sit more and fight less when they have their own chair. Lightweight folding chairs pack flat. Budget $20-30 per chair.</li>
          <li><strong>Camp table</strong> (if your site doesn&apos;t have a picnic table, or to supplement one). Folding camp tables are heavy but add significant setup quality.</li>
          <li><strong>Camp rug or outdoor mat.</strong> Placed in front of the tent door, it catches dirt and mud before it enters the tent. A $15 outdoor mat from a hardware store extends the life of your tent floor.</li>
          <li><strong>Portable battery pack.</strong> For phone charging and emergency lighting. A 10,000 mAh pack charges 2 phones and a headlamp.</li>
        </ul>

        <h3>Hygiene and cleaning</h3>
        <ul>
          <li><strong>Biodegradable hand soap.</strong> For camp hand washing. Squirt bottle preferred over bars, which get gritty.</li>
          <li><strong>Hand sanitizer.</strong> Before handling food when a sink isn&apos;t nearby.</li>
          <li><strong>Toilet paper and a trowel</strong> (if your site doesn&apos;t have flush toilets). Even with flush toilets nearby, having your own is good practice.</li>
          <li><strong>Small personal towels per person.</strong> Microfiber camp towels pack small and dry fast.</li>
          <li><strong>Wet wipes.</strong> For quick cleanups, kid face-washing, and the morning when the water is too cold to care about using the spigot.</li>
          <li><strong>Trash bags.</strong> Pack out everything. Bring more than you think you need.</li>
          <li><strong>Bear canister or bear bag</strong> if required in your area. Most car camping sites in bear country have a bear box - know before you go.</li>
        </ul>

        <h3>Camp kitchen extras</h3>
        <ul>
          <li><strong>Camp coffee setup.</strong> A percolator for the stove, an AeroPress, or a Moka pot. Coffee made at camp tastes better than coffee at home - this is a documented phenomenon with no scientific explanation.</li>
          <li><strong>Cast iron skillet</strong> (optional on trip one, irreplaceable later). For campfire cooking, cast iron distributes heat evenly and goes from fire to table. Heavy but durable for decades.</li>
          <li><strong>Grill grate</strong> (check if your site has one - most state park sites do). A portable camp grill grate lets you cook over the fire regardless of what&apos;s built into the site.</li>
        </ul>

        <h3>What to skip on trip one</h3>
        <ul>
          <li>Camp kitchen organizer systems</li>
          <li>French press or elaborate coffee setups</li>
          <li>Camp hammocks (always a conflict over who gets in)</li>
          <li>Camping-specific dishware sets with matching cups and plates</li>
          <li>Camp shower setups (use the facilities at the campground)</li>
          <li>Generator or camp fans (unless camping with a toddler in summer heat)</li>
          <li>Anything sold as &ldquo;camp organization&rdquo;</li>
        </ul>

        <h2>Clothing for family camping</h2>
        <p>
          Camp clothing is layering more than specific gear. The system that works for most families:
        </p>
        <ul>
          <li><strong>Base layer:</strong> Long underwear top and bottom for every person (kids included). Worn sleeping in cold weather or under everything else when layering.</li>
          <li><strong>Mid layer:</strong> Fleece or down jacket. The primary warmth layer. Everyone needs one, even on summer trips.</li>
          <li><strong>Outer layer:</strong> Rain jacket per person. Waterproof and breathable. Also serves as a windbreaker on cool mornings.</li>
          <li><strong>Camp shoes:</strong> Something easy to slip on for bathroom trips - Crocs, sandals, or slip-on sneakers. You do not want to lace up full shoes at 2am.</li>
          <li><strong>Wool or synthetic socks:</strong> Cotton socks get wet and stay wet. Two pairs of wool or synthetic hiking socks per person.</li>
          <li><strong>Beanie and gloves for every person.</strong> Even in summer, early mornings at elevation can be cold. Kids in particular lose body heat faster than adults.</li>
        </ul>

        <h2>Budget breakdown for a family of 4</h2>
        <ul>
          <li>6-person tent: $100-130 (Coleman Skydome or similar)</li>
          <li>4 sleeping bags (2 adult, 2 kid): $150-250 total</li>
          <li>4 sleeping pads: $60-160 total</li>
          <li>Two-burner stove: $50-80</li>
          <li>50qt cooler: $40-80</li>
          <li>Cookware set: $40-60</li>
          <li>4 headlamps: $30-60 total</li>
          <li>Camp lantern: $20-40</li>
          <li>4 camp chairs: $80-120 total</li>
          <li>First aid kit: $20-30</li>
          <li>Miscellaneous (bags, soap, wipes, foil, trash bags): $30-50</li>
        </ul>
        <p>
          <strong>Total for a complete new setup: $620-1,000.</strong> You can reduce this significantly by borrowing a tent or sleeping bags from friends, buying sleeping bags at end-of-season sales, or using an air mattress you already own.
        </p>

        <h2>Where to buy family camping gear</h2>
        <ul>
          <li><strong>REI</strong> - high quality, good return policy, rental program for trying before buying, and an annual dividend if you become a member. Best for sleeping bags and sleeping pads where quality matters.</li>
          <li><strong>Walmart or Target</strong> - Coleman gear is widely available and reliable for tents, stoves, and lanterns at much lower prices than REI. Good for trip one.</li>
          <li><strong>Amazon</strong> - useful for specific items where reviews are dense enough to make confident choices. Avoid no-name tents and sleeping bags.</li>
          <li><strong>Facebook Marketplace or garage sales</strong> - camp gear depreciates heavily once it has been used. Used Coleman gear from someone who &ldquo;tried camping once&rdquo; is often a good find.</li>
        </ul>

        <h2>Frequently asked</h2>
        <h3>What gear do I need for camping with a family?</h3>
        <p>Tent (one size up from headcount), sleeping bags rated 10&deg;F below forecast low, sleeping pads, two-burner stove, cooler, headlamps for every person, and a camp lantern. That&apos;s the complete minimum.</p>
        <h3>How much does it cost to gear up for family camping?</h3>
        <p>$300-500 buying entry-level gear strategically. More if you want quality sleeping bags and a comfortable tent. Less if you borrow or buy used.</p>
        <h3>Can you rent camping gear for a family?</h3>
        <p>Yes. REI rents tents, bags, pads, and stoves at most locations. Renting makes sense before you know camping is a regular habit.</p>
      </GuidePage>
      <GuidePrintablesBlock guideSlug="family-camping-gear-list" />
      <GuideGearShelf guideSlug="family-camping-gear-list" />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="family-camping-gear-list" />
    </>
  )
}
