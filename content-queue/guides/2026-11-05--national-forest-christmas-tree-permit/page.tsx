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

const SLUG = '/guides/national-forest-christmas-tree-permit'
const TITLE = 'Cutting a Christmas Tree on National Forest Land With Kids'
const META_TITLE = 'National Forest Christmas Tree Permits'
const DESCRIPTION =
  'How to get a national forest Christmas tree permit, the cutting rules that come with it, winter road safety, and what to bring for a family tree outing.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1439871846984-851e435a999b?w=1400&auto=format&fit=crop&q=80'

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
            q: 'How do I get a Christmas tree permit for a national forest?',
            a: 'Many national forests sell Christmas tree permits online through recreation.gov, and some also sell them at ranger district offices or through local vendors. Not every forest offers tree cutting, and each forest sets its own season, price, limits, and cutting areas. Search recreation.gov for the forest by name, or check the forest\'s page on the Forest Service website, and read the forest-specific rules and map before you buy.',
          },
          {
            q: 'What are the rules for cutting a Christmas tree in a national forest?',
            a: 'The details vary by forest, but common rules include cutting only in the designated areas shown on the forest\'s map, staying out of wilderness areas, campgrounds, and other closed sites, keeping a set distance from roads, cutting the stump low to the ground, staying under a maximum tree height, and attaching or displaying the permit before you drive away with the tree. Read the rules that come with your permit, since they are the ones that apply.',
          },
          {
            q: 'Can 4th graders get a free Christmas tree permit?',
            a: 'In past seasons, families with a fourth grader who had an Every Kid Outdoors pass could get a free Christmas tree permit at many participating national forests. Whether that offer is running this season, and which forests take part, can change, so check recreation.gov and your forest\'s Christmas tree page before you plan around it.',
          },
          {
            q: 'What should I bring to cut a Christmas tree in the forest?',
            a: 'Your printed or downloaded permit and map, a hand saw, work gloves, a tape measure, rope or straps to tie the tree to the car, and a tarp or old blanket to protect the roof. For the family, bring warm layers, waterproof boots, blaze orange if hunting season is open, snacks, a thermos of something hot, a first aid kit, and a full tank of gas, since forest roads in December can be slow, snowy, and out of cell range.',
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
        slug="national-forest-christmas-tree-permit"
        eyebrow="Holiday outing"
        title="Cutting a Christmas Tree on National Forest Land With Kids"
        lede="A small permit, a hand saw, and a snowy forest road turn the Christmas tree into a family adventure. Here is how national forest tree permits work, the rules that come with them, and how to make the day fun and safe for kids."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'Snow falling on young fir trees at the edge of a forest',
        }}
        dateModified="2026-11-05"
      >
        <QuickAnswer
          tldr="Buy a permit for your national forest on recreation.gov or at a ranger office, read its map and rules, go early in the day with a saw and warm layers, and tag the tree before you drive away."
          summary="Many national forests let families cut their own Christmas tree with an inexpensive permit, usually sold online through recreation.gov and sometimes at ranger district offices or local vendors. Each forest sets its own season, often starting in November, plus its own price, household limit, and cutting areas. The permit comes with a map and rules: cut only in designated areas, stay out of wilderness and campgrounds, keep away from roads, cut the stump low, stay under the height limit, and attach or display the permit before you drive off. Pick a small tree growing in a crowded spot, since forest trees look smaller than they are. Go early, because December daylight is short and forest roads can be snowy, unplowed, and out of cell range. Bring a hand saw, gloves, rope, a tarp, warm layers, blaze orange during hunting season, and a thermos."
        />

        <h2>How national forest tree permits work</h2>
        <p>
          The Forest Service lets the public cut a limited number of Christmas trees in many
          national forests each year. Thinning small trees from crowded stands is part of the
          point, so a permit is cheap compared with a tree lot and comes with a real day in the
          woods.
        </p>
        <ul>
          <li>
            <strong>Where to buy.</strong> Many forests sell permits online through recreation.gov.
            Search for the forest name plus Christmas tree permit. Some forests also sell them at
            ranger district offices or through local stores. A forest that does not appear on
            recreation.gov may still offer permits in person, so check its page on the Forest
            Service website.
          </li>
          <li>
            <strong>When.</strong> Sales often open in November and run into December, but every
            forest sets its own dates. Since this is early November, now is the time to check
            whether your nearest forest has opened sales.
          </li>
          <li>
            <strong>What it covers.</strong> A permit is usually for one tree, with a limit per
            household, and the price and limits differ from forest to forest. It is not valid in
            other forests.
          </li>
          <li>
            <strong>Not every forest offers it.</strong> Some forests skip tree cutting in years
            with fire damage, road closures, or other problems. Check before you plan the trip.
          </li>
        </ul>
        <p>
          <strong>Fourth graders:</strong> in past seasons, families with a fourth grader who had an
          Every Kid Outdoors pass could get a free tree permit at many participating forests. Check
          recreation.gov and your forest&apos;s Christmas tree page to see whether that offer is
          running this year and how to claim it.
        </p>

        <h2>The rules that come with the permit</h2>
        <p>
          Every forest prints its own rules and a map of where you can cut. Read them at home,
          because they are what a ranger will hold you to. Common rules include:
        </p>
        <ul>
          <li>
            <strong>Cut only in designated areas</strong> shown on the forest&apos;s map. Wilderness
            areas, campgrounds, picnic areas, research areas, and plantations are usually off
            limits.
          </li>
          <li>
            <strong>Stay back from roads.</strong> Many forests require you to cut a set distance
            away from main roads, which also leaves the roadside trees for everyone else to enjoy.
          </li>
          <li>
            <strong>Cut the stump low.</strong> Forests usually set a maximum stump height so you
            do not leave a tall, hazardous stump behind.
          </li>
          <li>
            <strong>Stay under the height limit.</strong> Most forests cap the height of the tree
            you can take.
          </li>
          <li>
            <strong>Never top a larger tree.</strong> Cut the whole small tree at the base, not the
            top of a big one.
          </li>
          <li>
            <strong>Tag it before you drive.</strong> Most forests require you to attach the permit
            to the tree or display it in your vehicle before you leave the cutting area. Check the
            exact rule for your forest.
          </li>
        </ul>
        <p>
          Some forests also restrict which species you can cut or ban chainsaws in certain areas.
          A hand saw is all a family-size tree needs anyway.
        </p>

        <h2>Plan the drive like a winter trip</h2>
        <p>
          The trip to the trees is the riskiest part of the day. Forest roads in late November and
          December can be unplowed, icy, muddy, or closed for the season, and cell service often
          drops out a few miles past the pavement.
        </p>
        <ul>
          <li>
            <strong>Check road conditions</strong> with the ranger district before you go, and turn
            around if the road is worse than your vehicle can handle. Bring chains or traction
            devices where they are needed.
          </li>
          <li>
            <strong>Download the map</strong> and save it offline, and tell someone where you are
            going and when you will be back.
          </li>
          <li>
            <strong>Start early.</strong> Sunset comes before 5pm in many places in December.
            Aim to be heading back to the car by mid-afternoon.
          </li>
          <li>
            <strong>Fill the tank</strong> and pack extra water, food, and warm layers in the car in
            case you get stuck.
          </li>
        </ul>

        <h2>Hunting season and blaze orange</h2>
        <p>
          Christmas tree season overlaps hunting seasons in many national forests, and hunting is
          allowed on most national forest land. Put every family member in blaze orange, a{' '}
          <AmazonLink
            productId="quietwear-youth-blaze-vest"
            pageSlug="national-forest-christmas-tree-permit"
          />{' '}
          for the kids and an{' '}
          <AmazonLink productId="allen-blaze-orange-vest" pageSlug="national-forest-christmas-tree-permit" />{' '}
          for adults, and keep kids close and talking. The full routine is in{' '}
          <Link href="/guides/camping-during-hunting-season">camping during hunting season</Link>.
        </p>

        <h2>Choosing and cutting the tree with kids</h2>
        <ul>
          <li>
            <strong>Measure before you leave home.</strong> Measure your ceiling height and your
            stand, and bring a tape measure. Trees look much smaller in the open forest than in a
            living room, and nearly every family brings home a tree that is too big.
          </li>
          <li>
            <strong>Look in crowded spots.</strong> Small trees growing close together, often along
            the edge of a stand, are the ones thinning helps most. They are also often a bit sparse
            on one side, which is part of the charm.
          </li>
          <li>
            <strong>Let the kids choose, within the rules.</strong> Give them the job of finding
            three candidates, then vote as a family.
          </li>
          <li>
            <strong>Adults run the saw.</strong> Older kids can help hold the trunk or take a few
            strokes with an adult&apos;s hands on the saw. Everyone else stands well back, uphill
            and out of the direction the tree will fall.
          </li>
          <li>
            <strong>Cut low and drag it out carefully.</strong> A small sled makes hauling the tree
            through snow easier and gives young kids a job. Watch for branches at eye level.
          </li>
        </ul>

        <h2>What to bring</h2>
        <ul>
          <li>
            <strong>For the tree:</strong> the printed or downloaded permit and map, a hand saw,
            work gloves, a tape measure, rope or{' '}
            <AmazonLink productId="paracord-550-50ft" pageSlug="national-forest-christmas-tree-permit" />{' '}
            to tie it down, and an old blanket or tarp to protect the car roof.
          </li>
          <li>
            <strong>For the family:</strong> waterproof boots, warm layers, hats, and mittens,
            plus{' '}
            <AmazonLink
              productId="hothands-hand-warmers-bulk"
              pageSlug="national-forest-christmas-tree-permit"
            />{' '}
            for small hands. Our{' '}
            <Link href="/guides/how-to-keep-kids-warm-camping">keeping kids warm</Link> guide
            covers layering.
          </li>
          <li>
            <strong>For the break:</strong> snacks and a{' '}
            <AmazonLink
              productId="thermos-stainless-king-40oz"
              pageSlug="national-forest-christmas-tree-permit"
            />{' '}
            of hot cocoa, which is half the reason kids remember the day.
          </li>
          <li>
            <strong>For safety:</strong> a{' '}
            <AmazonLink productId="thriad-first-aid-430" pageSlug="national-forest-christmas-tree-permit" />
            , headlamps, a charged phone, and blaze orange.
          </li>
        </ul>

        <h2>Make it a camping trip</h2>
        <p>
          A tree-cutting day pairs well with a night out if your family is ready for cold weather.
          Some national forests allow free{' '}
          <Link href="/guides/dispersed-camping-on-blm-and-national-forest-land">
            dispersed camping
          </Link>
          , though winter conditions make that a trip for experienced campers. For most families,
          a state park cabin nearby is the better plan, and{' '}
          <Link href="/guides/state-park-cabin-camping-with-kids">
            state park cabin camping with kids
          </Link>{' '}
          covers how to book one. If you are looking ahead to the holidays, the{' '}
          <Link href="/guides/winter-break-camping-with-kids">winter break camping</Link> guide has
          the next trip.
        </p>
        <p>
          At home, cut a thin slice off the base of the trunk and get the tree into water quickly.
          Keep the stand full and the tree away from heaters and fireplaces.
        </p>

        <h2>Frequently asked</h2>
        <h3>How do I get a Christmas tree permit for a national forest?</h3>
        <p>
          Many forests sell permits online at recreation.gov, and some also sell them at ranger
          district offices or local vendors. Each forest sets its own season, price, limits, and
          cutting areas, so read its rules and map first.
        </p>
        <h3>What are the rules for cutting a Christmas tree in a national forest?</h3>
        <p>
          Common rules: cut only in designated areas, avoid wilderness and campgrounds, stay back
          from roads, cut the stump low, stay under the height limit, and tag or display the permit
          before you drive away.
        </p>
        <h3>Can 4th graders get a free Christmas tree permit?</h3>
        <p>
          In past seasons, fourth graders with an Every Kid Outdoors pass could get a free permit
          at many participating forests. Check recreation.gov and your forest&apos;s page to see if
          it is offered this year.
        </p>
        <h3>What should I bring to cut a Christmas tree in the forest?</h3>
        <p>
          The permit and map, a hand saw, gloves, a tape measure, rope, and a tarp, plus warm
          layers, waterproof boots, blaze orange during hunting season, snacks, a hot drink, and a
          first aid kit.
        </p>
      </GuidePage>
      <GuideGearShelf
        guideSlug="national-forest-christmas-tree-permit"
        heading="Gear for a tree-cutting day"
      />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="national-forest-christmas-tree-permit" />
    </>
  )
}
