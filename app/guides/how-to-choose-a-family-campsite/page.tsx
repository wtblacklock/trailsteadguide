import Link from 'next/link'
import { GuidePage } from '@/components/guide/GuidePage'
import { QuickAnswer } from '@/components/guide/QuickAnswer'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import GuideGearShelf from '@/components/guide/GuideGearShelf'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/guides/how-to-choose-a-family-campsite'
const TITLE = 'How to Choose a Family Campsite'
const META_TITLE = 'How to Choose a Family Campsite — What to Look For'
const DESCRIPTION =
  'How to choose a family campsite: what site features matter with kids, how to read campground maps, and how to book before the good sites disappear.'
const HERO_IMAGE =
  'https://images.unsplash.com/cqv_DVAMByg?w=1400&auto=format&fit=crop&q=80'

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
            q: 'What should I look for in a family campsite?',
            a: 'Drive-up access, shade, proximity to bathrooms (under 2 minutes walk), level ground for the tent, and enough space to set up chairs and a table without being on top of neighbors. For families with young kids, a site near the bathroom is the single most important factor — middle-of-the-night trips happen frequently.',
          },
          {
            q: 'How do you get a good campsite?',
            a: 'Book early through the campground\'s reservation system, know the opening date for reservations (most state parks open 3–6 months in advance), and have a list of 3–5 acceptable sites rather than one must-have. Look for sites with reviews or photos on Campsite Photos or The Dyrt to see what you\'re actually booking.',
          },
          {
            q: 'What campsite type is best for families?',
            a: 'Standard electric sites at a state park are the best starting point for families. Electric hookup ($5–15 more per night) lets you bring a fan for white noise and a phone charger. Standard tent-only sites are fine in good weather but lose the fan option that significantly helps kids sleep.',
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
        slug="how-to-choose-a-family-campsite"
        eyebrow="Planning"
        title="How to Choose a Family Campsite"
        lede="What the booking photo doesn&apos;t tell you, what actually matters with kids in tow, and how to read a campground map before the good sites disappear."
        heroImage={{
          src: HERO_IMAGE,
          alt: 'Family setting up camp at a well-chosen shaded campsite with tent and gear',
        }}
      >
        <QuickAnswer
          tldr="Prioritize: shade, bathroom proximity, drive-up access, level ground, and buffer from neighbors."
          summary="For families with kids, campsite selection is not about the view — it&apos;s about logistics. The features that determine whether a trip is comfortable: drive-up access (no hauling gear down a path), shade (significant in summer heat), a bathroom within a 2-minute walk (middle-of-the-night trips are real), level ground for the tent, and enough site space to set up without being crowded against neighbors. Book early — the best sites go first. Use Campsite Photos or The Dyrt to see real photos of specific sites before booking."
        />

        <h2>What family camping prioritizes vs. what solo/couple camping prioritizes</h2>
        <p>
          Solo campers and couples optimize for privacy, scenery, and isolation. Family campers with young kids optimize for something different:
        </p>
        <ul>
          <li><strong>Bathroom access.</strong> Middle-of-the-night bathroom trips with a 4-year-old happen at least once per night, often twice. A site 5 minutes from the bathroom is a significantly worse night than a site 1 minute away.</li>
          <li><strong>Drive-up access.</strong> Loading and unloading camp gear with kids is not the time for a quarter-mile carry. Park next to the site.</li>
          <li><strong>Space for kids to move around.</strong> A tiny site is fine for two adults with a small tent. With kids, you need enough space for chairs, a cooking setup, a play area, and the tent without everything overlapping.</li>
          <li><strong>Shade.</strong> Kids burn faster and tolerate heat less than adults. A shaded site is significantly more comfortable for afternoon activities.</li>
          <li><strong>Neighbors who aren&apos;t too close.</strong> Kids make noise. Neighbors who are right next to you will hear everything, which adds stress to normal kid behavior like crying at 10pm on night one.</li>
        </ul>

        <h2>How to read a campground map</h2>
        <p>
          Most reservation systems (Reserve America, Recreation.gov) show a campground map with individual sites numbered. What to look for:
        </p>
        <ul>
          <li><strong>Site size.</strong> Shown as dimensions or described as &ldquo;large,&rdquo; &ldquo;medium,&rdquo; or &ldquo;small.&rdquo; For families, choose large or medium.</li>
          <li><strong>Site type.</strong> Tent-only, electric, full hookup. Electric is worth the small premium for the fan and phone-charging options.</li>
          <li><strong>Proximity to bathrooms.</strong> Find the bathroom icons and count sites. Choose a site within 3–5 sites of a bathroom.</li>
          <li><strong>Distance from the road.</strong> Sites directly on the campground road get more traffic noise and light from headlights at night. A site one row back from the main road is usually quieter.</li>
          <li><strong>Corner or end sites.</strong> Sites at the end of a loop have neighbors on fewer sides. Corner sites have more usable space. Both are generally preferable to mid-loop sites.</li>
          <li><strong>Water proximity.</strong> Being near a stream or lake is an asset for activities but adds noise (positive) and potential bug pressure (negative). Evaluate based on your family&apos;s priorities.</li>
        </ul>

        <h2>Using Campsite Photos and The Dyrt</h2>
        <p>
          The campground map tells you the layout. Campsite Photos (campsitephotos.com) and The Dyrt (thedyrt.com) show you actual photos of specific numbered sites taken by campers who stayed there. Before booking any campsite you can&apos;t visit in person, look up the campground on both of these.
        </p>
        <p>
          What to look for in photos:
        </p>
        <ul>
          <li>How much shade the site actually has (maps don&apos;t show this)</li>
          <li>How level the tent pad is</li>
          <li>How close neighbors are in practice vs. on the map</li>
          <li>Whether there&apos;s usable space beyond the tent pad</li>
          <li>The condition of the fire ring and picnic table</li>
        </ul>
        <p>
          Sites with good Campsite Photos reviews at popular campgrounds book fast. If you find a good one, book it.
        </p>

        <h2>Site types and what they mean for families</h2>

        <h3>Tent-only sites</h3>
        <p>
          Basic sites with a tent pad, picnic table, and fire ring. No hookups. At state parks, these are typically $20–30/night. Adequate for 3-season camping in good weather. Limitations: no fan option (affects kids&apos; sleep), and no phone charging without a portable battery pack.
        </p>

        <h3>Electric sites</h3>
        <p>
          Tent pad + a 30-amp or 50-amp electrical outlet. Typically $5–15 more per night than tent-only. The electric outlet lets you bring: a battery-powered fan (run overnight for white noise and cooling — significant positive impact on kids&apos; sleep), phone chargers, a small LED strip for ambient tent light, and a small electric cooler as a backup to the ice cooler.
        </p>
        <p>
          For families with kids, an electric site is almost always worth the premium on the first several trips.
        </p>

        <h3>Full hookup sites</h3>
        <p>
          Electric + water + sewer. Designed for RVs but usable for tent campers. The water connection is useful; the sewer is not relevant for tents. At $35–50/night, you pay more than you need for the hookups you won&apos;t use. Only worth it if the specific campground doesn&apos;t have a good electric-only option.
        </p>

        <h3>Primitive sites</h3>
        <p>
          No hookups, often no established tent pad, sometimes only accessible by hiking in. Avoid for first-time family camping. The logistics of hauling gear with kids and camping without amenity backup are harder than they need to be for a first trip.
        </p>

        <h2>What to avoid when choosing a campsite with kids</h2>
        <ul>
          <li><strong>Sites directly next to the bathroom.</strong> The light, the traffic, and the door sounds are disruptive all night. Close enough to walk to quickly — not adjacent.</li>
          <li><strong>Sites at the campground entrance.</strong> Traffic in and out all evening and morning. These are the last sites to fill for good reason.</li>
          <li><strong>Unshaded sites in summer.</strong> On a hot August weekend, a fully exposed site makes afternoon activities miserable and the tent unlivable until after sundown.</li>
          <li><strong>Sites near group fire rings or group campsites.</strong> Large group sites generate more noise later into the evening than family sites.</li>
          <li><strong>Sites in low areas or near drainages.</strong> They flood in rain and collect cold air at night. Both are problems.</li>
        </ul>

        <h2>How to book before the good sites go</h2>
        <ol>
          <li>Find the campground&apos;s reservation system — Reserve America for most state parks, Recreation.gov for national forests and federal lands.</li>
          <li>Identify the reservation opening date. Most state parks open 3–6 months in advance. Set a calendar reminder.</li>
          <li>Have your list of preferred sites ready before the reservation window opens. Know your top 3 in priority order.</li>
          <li>Book at or before the opening time on opening day for popular summer weekends. High-demand sites sell within hours.</li>
          <li>If your preferred site is gone, book the nearest alternative and check for cancellations. Popular campgrounds get cancellations regularly, especially 2–3 weeks before the date.</li>
        </ol>
        <p>
          Midweek trips (Tuesday–Thursday nights) are almost always available last-minute at any campground and at a lower price. If your schedule is flexible, midweek camping avoids the booking competition entirely.
        </p>

        <h2>Frequently asked</h2>
        <h3>What should I look for in a family campsite?</h3>
        <p>Drive-up access, shade, bathroom within 2 minutes&apos; walk, level ground, and enough space for chairs + cooking setup + tent. For kids, bathroom proximity is the most important factor.</p>
        <h3>How do you get a good campsite?</h3>
        <p>Book early, know the reservation opening date, and have 3 acceptable site choices rather than one must-have. Use Campsite Photos or The Dyrt to preview specific sites.</p>
        <h3>What campsite type is best for families?</h3>
        <p>Standard electric site at a state park. The electrical outlet lets you run a fan overnight, which significantly helps kids sleep at camp.</p>
      </GuidePage>
      <GuideGearShelf guideSlug="how-to-choose-a-family-campsite" />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="how-to-choose-a-family-campsite" />
    </>
  )
}
