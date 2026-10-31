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

const SLUG = '/guides/day-after-thanksgiving-hike-with-kids'
const TITLE = 'A Day-After-Thanksgiving Hike With Kids'
const META_TITLE = 'Day After Thanksgiving Hike With Kids'
const DESCRIPTION =
  'Start a Black Friday family hike tradition: how to pick the trail, pack leftovers safely, dress for late November, and check for free state park days.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1733127124377-a867313bde45?w=1400&auto=format&fit=crop&q=80'

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
            q: 'What is OptOutside?',
            a: 'OptOutside is a campaign the outdoor retailer REI started in 2015, when it closed its stores on Black Friday and encouraged employees and customers to spend the day outside instead of shopping. The idea caught on, and the day after Thanksgiving has become a popular day for family hikes. You do not need to sign up for anything to take part: pick a trail and go.',
          },
          {
            q: 'Are state parks free on the day after Thanksgiving?',
            a: 'Some are, some years. Several state park systems have marked the Friday after Thanksgiving with free entry or promoted hikes, and Minnesota, for example, has included it among its free state park days in past years. Which states take part, and on what terms, can change from year to year, so check your state park website for this year\'s plans before you go.',
          },
          {
            q: 'How long should a day-after-Thanksgiving hike be with kids?',
            a: 'Short enough that everyone finishes happy. One to three miles on a trail with a payoff, like a waterfall, a lookout, or a lake, suits most families with young kids. Plan around daylight, since late November sunsets come before 5 p.m. in much of the country, and aim to be back at the car by mid-afternoon.',
          },
          {
            q: 'Can you pack Thanksgiving leftovers for a hike?',
            a: 'Yes, with basic food safety. Cooked turkey and sides should go back in the refrigerator within two hours of the meal, and should stay cold on the trail. Pack sandwiches in an insulated bag with an ice pack, and eat them within a few hours. Keep anything that has sat out too long at home, and skip items like gravy and stuffing that are hard to keep cold.',
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
        slug="day-after-thanksgiving-hike-with-kids"
        eyebrow="Holiday weekend"
        title="A Day-After-Thanksgiving Hike With Kids"
        lede="School is out, the fridge is full of leftovers, and everyone else is at the mall. The Friday after Thanksgiving is one of the best hiking days of the year for a family. Here is how to make it a tradition."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'A leaf-covered woodland path running beside a fence under bare and golden-leaved trees in late autumn',
        }}
        dateModified="2026-11-20"
      >
        <QuickAnswer
          tldr="Pick a short trail with a payoff, check your state park site for any free day, pack leftover sandwiches cold, wear blaze orange, and finish by mid-afternoon."
          summary="The day after Thanksgiving, which falls on November 27 this year, is a great day for a family hike. Since REI started its OptOutside campaign in 2015, closing its stores on Black Friday and encouraging people to go outside, a lot of families have made a hike their Black Friday tradition. Some state park systems have marked the day with free entry or featured hikes in past years, but which states take part changes, so check your state park website this week. Pick a trail close to home, one to three miles with a payoff like a waterfall or lookout, and plan to be back by mid-afternoon, since sunset comes before 5 p.m. in much of the country. Pack leftover turkey sandwiches in an insulated bag with an ice pack. Rifle deer season overlaps Thanksgiving in many states, so put everyone in blaze orange on public land."
        />

        <h2>Why the Friday after Thanksgiving works so well</h2>
        <p>
          Most kids are out of school, many parents are off work, and relatives are often in town.
          After a day of cooking and sitting, everyone is ready to move. And while stores and
          parking lots are packed, many trails are quieter than a typical fall weekend, especially
          in the morning.
        </p>
        <p>
          The tradition has a well-known origin. In 2015, the outdoor retailer REI closed its stores
          on Black Friday and encouraged its employees and customers to spend the day outside
          instead, a campaign called OptOutside. The idea spread well beyond REI. You do not need to
          register or buy anything to take part. Pick a trail, bring the family, and go.
        </p>

        <h2>Check your state park site this week</h2>
        <p>
          Several state park systems have used the day after Thanksgiving to get families outside,
          with free entry, waived parking fees, or featured guided hikes. Minnesota, for example,
          has included the Friday after Thanksgiving among its free state park days in past years.
          Other states have run similar promotions under different names.
        </p>
        <p>
          These programs change from year to year, and some years a state skips it entirely. Before
          you plan around a free day, check your state park website or social media for this
          year&apos;s plans, and check whether the park you have in mind needs a reservation or
          timed entry. If your state is not offering anything, a regular day pass is still one of
          the best values of the holiday weekend. For ideas on where to go, see{' '}
          <Link href="/guides/best-state-parks-for-families">best state parks for families</Link>.
        </p>

        <h2>Pick the right trail</h2>
        <p>
          The goal is a hike everyone finishes happy, so the family wants to do it again next year.
          That usually means:
        </p>
        <ul>
          <li>
            <strong>Close to home or to where you are staying.</strong> Within an hour&apos;s drive
            leaves time for a slow morning and a full hike before the light fades.
          </li>
          <li>
            <strong>One to three miles for young kids.</strong> Older kids and teens can go longer.
            Mixed groups with grandparents and toddlers do best on a short loop with benches.
          </li>
          <li>
            <strong>A clear payoff.</strong> A waterfall, a lookout, a lake, a covered bridge, or a
            big old tree gives kids something to hike toward.
          </li>
          <li>
            <strong>A backup plan.</strong> If the parking lot is full at a popular trailhead, have a
            second trail in mind nearby.
          </li>
        </ul>
        <p>
          The basics of choosing a trail by age and pace, and what goes in a day pack, are in{' '}
          <Link href="/guides/hiking-with-kids-from-camp">hiking with kids from camp</Link>.
        </p>

        <h2>Plan around short days and cold mornings</h2>
        <p>
          Late November has some of the shortest days of the year. Sunset comes before 5 p.m. in
          much of the country, and earlier in the north. Mornings can be frosty even when the
          afternoon is pleasant.
        </p>
        <ul>
          <li>Aim for a late-morning start and a mid-afternoon finish.</li>
          <li>
            Dress in layers: a non-cotton base layer, a fleece, and a windproof or waterproof jacket,
            plus hats and gloves. Kids heat up on the uphill and cool fast at the top.
          </li>
          <li>Wear boots or shoes with good grip, since wet leaves on rocks are slippery.</li>
          <li>
            Carry a headlamp per person, like the{' '}
            <AmazonLink
              productId="black-diamond-spot-400"
              pageSlug="day-after-thanksgiving-hike-with-kids"
            />
            , in case the walk back takes longer than planned.
          </li>
        </ul>

        <h2>Blaze orange: it is hunting season</h2>
        <p>
          In many states, rifle deer season overlaps Thanksgiving week, and the holiday weekend is
          one of the busiest hunting times of the year. Many state parks limit or prohibit hunting,
          but state forests, wildlife areas, and national forests often allow it.
        </p>
        <p>
          On any public land where hunting is allowed, put everyone in blaze orange: a youth vest
          like the{' '}
          <AmazonLink
            productId="quietwear-youth-blaze-vest"
            pageSlug="day-after-thanksgiving-hike-with-kids"
          />{' '}
          for kids, an{' '}
          <AmazonLink
            productId="allen-blaze-orange-vest"
            pageSlug="day-after-thanksgiving-hike-with-kids"
          >
            orange vest
          </AmazonLink>{' '}
          or hat for adults, and an orange bandana on the dog. Stay on marked trails. The full rules
          are in{' '}
          <Link href="/guides/camping-during-hunting-season">camping during hunting season</Link>.
        </p>

        <h2>Pack the leftovers, safely</h2>
        <p>
          A turkey sandwich at the lookout might be the best part of the day. A little food safety
          keeps it that way:
        </p>
        <ul>
          <li>
            <strong>Start with leftovers that went into the fridge promptly.</strong> Cooked food
            should be refrigerated within two hours of the meal. Anything that sat out all evening
            stays home.
          </li>
          <li>
            <strong>Keep it cold.</strong> Pack sandwiches in an insulated bag with an ice pack, and
            eat them within a few hours.
          </li>
          <li>
            <strong>Pick foods that travel.</strong> Turkey and cranberry sandwiches, rolls, cheese,
            apples, and pie bars work. Gravy and mashed potatoes do not.
          </li>
          <li>
            <strong>Bring something warm.</strong> A vacuum bottle like the{' '}
            <AmazonLink
              productId="thermos-stainless-king-40oz"
              pageSlug="day-after-thanksgiving-hike-with-kids"
            />{' '}
            full of cocoa or cider makes the summit snack feel like a celebration.
          </li>
        </ul>
        <p>
          If you are packing a cooler for the car too, the order that keeps food coldest is in{' '}
          <Link href="/guides/how-to-pack-a-cooler">how to pack a cooler</Link>.
        </p>

        <h2>Make it a tradition kids look forward to</h2>
        <p>
          The hike itself is the easy part. What turns it into a tradition is a few small rituals
          that repeat every year:
        </p>
        <ul>
          <li>
            <strong>The same photo, every year.</strong> Take a family picture at the same tree,
            sign, or overlook. In ten years it becomes a growth chart.
          </li>
          <li>
            <strong>A gratitude walk.</strong> At each trail marker or bench, everyone names one
            thing they are thankful for. It carries the meaning of Thanksgiving onto the trail.
          </li>
          <li>
            <strong>A nature scavenger hunt.</strong> Find an acorn, a feather, five kinds of leaves,
            and an animal track. A kid-friendly tree guide like the{' '}
            <AmazonLink
              productId="peterson-first-guide-trees"
              pageSlug="day-after-thanksgiving-hike-with-kids"
            />{' '}
            or a{' '}
            <AmazonLink
              productId="magnifying-glass-kids"
              pageSlug="day-after-thanksgiving-hike-with-kids"
            >
              bug-viewer magnifier
            </AmazonLink>{' '}
            makes it a real investigation.
          </li>
          <li>
            <strong>Leave it better.</strong> Bring a bag and pick up trash along the way, a good
            lesson on a day famous for buying more stuff.
          </li>
          <li>
            <strong>A post-hike treat.</strong> Pie at the trailhead or cocoa at home, the same every
            year.
          </li>
        </ul>

        <h2>What to bring</h2>
        <ul>
          <li>Water, the leftovers, and extra snacks.</li>
          <li>Layers, hats, and gloves for everyone.</li>
          <li>Blaze orange if you are on land open to hunting.</li>
          <li>A headlamp per person.</li>
          <li>
            A small first aid kit with blister tape like{' '}
            <AmazonLink
              productId="leukotape-blister-prevention"
              pageSlug="day-after-thanksgiving-hike-with-kids"
            />
            . See{' '}
            <Link href="/guides/camping-first-aid-kit-for-families">
              camping first aid kit for families
            </Link>{' '}
            for the full list.
          </li>
          <li>A trash bag and a phone with an offline trail map.</li>
        </ul>

        <h2>Make a weekend of it</h2>
        <p>
          If the hike goes well, the long weekend has room for more. Families with a campsite booked
          can pair it with the ideas in{' '}
          <Link href="/guides/thanksgiving-camping-with-kids">Thanksgiving camping with kids</Link>.
          If you do want to shop, the online deals will still be there after dinner, and our{' '}
          <Link href="/guides/black-friday-camping-gear">Black Friday camping gear</Link> guide
          covers which upgrades are worth buying on sale. Looking ahead, many state parks host
          guided First Day Hikes on New Year&apos;s Day, a natural next tradition, and the{' '}
          <Link href="/guides/winter-break-camping-with-kids">winter break camping</Link> guide
          covers the longer school break in between.
        </p>

        <h2>Frequently asked</h2>
        <h3>What is OptOutside?</h3>
        <p>
          A campaign REI started in 2015, when it closed its stores on Black Friday and encouraged
          people to spend the day outside. Anyone can take part by going for a hike.
        </p>
        <h3>Are state parks free on the day after Thanksgiving?</h3>
        <p>
          Some states have offered free entry or featured hikes that day in past years, but it
          changes. Check your state park website for this year&apos;s plans.
        </p>
        <h3>How long should a day-after-Thanksgiving hike be with kids?</h3>
        <p>
          One to three miles with a payoff suits most families with young kids. Aim to finish by
          mid-afternoon, since sunset comes early.
        </p>
        <h3>Can you pack Thanksgiving leftovers for a hike?</h3>
        <p>
          Yes. Use leftovers that were refrigerated within two hours, keep them cold with an ice
          pack, and eat them within a few hours.
        </p>
      </GuidePage>
      <GuideGearShelf
        guideSlug="day-after-thanksgiving-hike-with-kids"
        heading="Gear for a Black Friday family hike"
      />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="day-after-thanksgiving-hike-with-kids" />
    </>
  )
}
