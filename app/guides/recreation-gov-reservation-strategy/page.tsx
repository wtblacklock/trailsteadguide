import Link from 'next/link'
import { GuidePage } from '@/components/guide/GuidePage'
import { QuickAnswer } from '@/components/guide/QuickAnswer'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import GuideGearShelf from '@/components/guide/GuideGearShelf'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/guides/recreation-gov-reservation-strategy'
const TITLE = 'Recreation.gov Reservation Strategy'
// SEO-optimized <title>; H1/headline keep TITLE.
const META_TITLE = 'Recreation.gov Reservation Strategy'
const DESCRIPTION =
  'How recreation.gov actually works: the 6-month rolling window, the 7am ET drop, and what to do when nothing’s available — a real booking playbook for beginners.'
const HERO_IMAGE = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&auto=format&fit=crop&q=80'

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
            { name: 'Camping Basics', url: `${SITE_URL}/guides/basics` },
            { name: TITLE, url: `${SITE_URL}${SLUG}` },
          ],
        })}
      />
      <JsonLd
        data={faqPageGraph([
          {
            q: 'How far in advance can I book on recreation.gov?',
            a: 'Most National Park campgrounds release sites on a 6-month rolling window — at 7 a.m. Mountain Time on the day exactly six months before the first night of your stay. Some popular parks (Yosemite, Rocky Mountain, Zion) use a full-month release instead, dropping a calendar month at once. National Forest sites also commonly use a 6-month window. Always check the specific campground page for its release rule.',
          },
          {
            q: 'What time do recreation.gov reservations open?',
            a: 'For most rolling-window campgrounds, 7 a.m. Mountain Time / 9 a.m. Eastern. For full-month-release parks (Yosemite is the canonical example), 7 a.m. Pacific Time / 10 a.m. Eastern on the 15th of the month, five months ahead. Have your account logged in 5 minutes before, payment saved, and the exact site URL bookmarked.',
          },
          {
            q: 'What do I do if everything is booked?',
            a: 'Three moves: set up cancellation alerts (recreation.gov offers free notify-me, and paid tools like Campnab, Campflare, and Schnerp scan more aggressively); shift to Sunday-Thursday nights, which are dramatically easier; or pivot to alternatives — state parks (separate booking system), private campgrounds, or first-come-first-served / dispersed sites.',
          },
          {
            q: 'Are there sites you don’t need to reserve?',
            a: 'Yes — first-come-first-served (FCFS) campgrounds and dispersed camping on BLM and National Forest land. FCFS sites fill quickly on Friday afternoons in summer; arrive Thursday or before noon Friday. Dispersed camping is free and has no reservation system. See the dispersed camping guide for the rules.',
          },
          {
            q: 'Can I book a state park on recreation.gov?',
            a: 'No. Recreation.gov handles federal lands only — National Parks, National Forests, BLM, Army Corps of Engineers. Each state runs its own reservation system (ReserveCalifornia, Texas State Parks, Reserve America for many eastern states). Bookmark your state’s system separately.',
          },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Guides', url: `${SITE_URL}/guides` },
          { name: 'Camping Basics', url: `${SITE_URL}/guides/basics` },
          { name: TITLE, url: `${SITE_URL}${SLUG}` },
        ]}
      />
    <GuidePage
      slug="recreation-gov-reservation-strategy"
      eyebrow="Booking strategy"
      title="Recreation.gov Reservation Strategy"
      lede="How the booking system actually works — rolling windows, the 7 a.m. drop, refresh strategy, and what to do when there’s nothing left two weeks out."
      heroImage={{
        src: HERO_IMAGE,
        alt: 'A National Park valley at sunrise — the kind of campground that requires a 6-month-out reservation strategy',
      }}
    >
      <QuickAnswer
        tldr="Three things matter: the 6-month rolling window, the 7 a.m. local drop, and a Plan B for when nothing’s open."
        summary={
          <>
            Recreation.gov releases most National Park and National Forest campsites on a 6-month rolling window — sites for the first night of your stay drop at 7 a.m. local time exactly six months out. Have an account ready, be logged in 5 minutes early, and refresh-and-book at the second the clock turns. If everything’s gone, three plays: set up cancellation alerts (free on recreation.gov; aggressive via Campnab/Campflare/Schnerp), shift to Sunday–Thursday nights (much easier), or pivot to a state park, FCFS site, or dispersed camping. Always have a Plan B before booking.
          </>
        }
      />

      <h2>How recreation.gov actually works</h2>
      <p>
        <a href="https://www.recreation.gov/" rel="nofollow noopener" target="_blank">Recreation.gov</a> is the central reservation portal for federal lands — National Parks, National Forests, the Bureau of Land Management, and Army Corps of Engineers sites. It does <strong>not</strong> handle state parks. Each state runs its own system, and that’s the most common beginner mistake — searching for a state park on recreation.gov, finding nothing, and assuming the park is fully booked when it just lives on a different website.
      </p>
      <p>
        Most federally-managed campgrounds use a <strong>6-month rolling window</strong>. On June 5, you can book the first night of a stay starting December 5 — and only that night. December 6 drops on June 6, December 7 on June 7, and so on. To lock a 3-night stay, you typically book on the morning the first night opens, then immediately add the next nights (which were already released on previous days).
      </p>
      <p>
        A handful of high-demand parks use a different cadence — the most famous is <strong>Yosemite</strong>, which releases an entire month of inventory at once on the 15th of the month, five months ahead. Rocky Mountain National Park, parts of Zion, and a few others use similar full-month or block releases. The campground page on recreation.gov tells you which rule applies — read it before you set an alarm.
      </p>
      <p>
        Sites that aren’t reservable are tagged <strong>First-Come, First-Served (FCFS)</strong>. These don’t use the booking system at all — you show up, drive the loop, and grab an open site. FCFS is dramatically more available than reservation tier sites, but only if you can arrive on a Thursday or before noon Friday in summer.
      </p>

      <h2>When to book each type of trip</h2>
      <div className="not-prose my-8 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-stone-300">
              <th className="text-left py-2 pr-4 font-semibold text-stone-900">Trip type</th>
              <th className="text-left py-2 pr-4 font-semibold text-stone-900">Booking window</th>
              <th className="text-left py-2 font-semibold text-stone-900">Where to book</th>
            </tr>
          </thead>
          <tbody className="text-stone-700">
            <tr className="border-b border-stone-200">
              <td className="py-3 pr-4 align-top">National Park (Yosemite, RMNP, Zion, Yellowstone, Grand Canyon, Acadia)</td>
              <td className="py-3 pr-4 align-top">5–6 months out, on the day the window opens</td>
              <td className="py-3 align-top">recreation.gov</td>
            </tr>
            <tr className="border-b border-stone-200">
              <td className="py-3 pr-4 align-top">National Forest campground</td>
              <td className="py-3 pr-4 align-top">Typically 6 months out, often less competitive than NPs</td>
              <td className="py-3 align-top">recreation.gov</td>
            </tr>
            <tr className="border-b border-stone-200">
              <td className="py-3 pr-4 align-top">State park</td>
              <td className="py-3 pr-4 align-top">Varies — usually 6–11 months out</td>
              <td className="py-3 align-top">State-specific (ReserveCalifornia, Texas State Parks, etc.)</td>
            </tr>
            <tr className="border-b border-stone-200">
              <td className="py-3 pr-4 align-top">BLM dispersed</td>
              <td className="py-3 pr-4 align-top">Show up — no reservation</td>
              <td className="py-3 align-top">No system; see the dispersed camping guide</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 align-top">FCFS campground</td>
              <td className="py-3 pr-4 align-top">Show up Thursday or before noon Friday</td>
              <td className="py-3 align-top">No system; drive the loop</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        For state-park trips specifically, check <Link href="/guides/best-state-parks-for-families">best state parks for family camping</Link> — many are easier to book than a National Park and just as good for a beginner trip.
      </p>

      <h2>Strategies that actually work</h2>
      <p>
        Booking a popular site is mostly a logistical exercise, not a luck one. Six patterns, in order of how often they decide whether you get a site:
      </p>

      <h3>1. Build a roster of 3–5 backup sites in the same region</h3>
      <p>
        The biggest single mistake is fixating on one campground at one park. Before the booking morning, identify 3–5 campgrounds within 60 miles of your target — including a state park, a National Forest site, and an FCFS option. If your first choice is gone at 7:00:30 a.m., your second pick is still open at 7:01. Have all 3–5 URLs bookmarked and ready in tabs.
      </p>

      <h3>2. Refresh-and-buy at the exact drop time</h3>
      <p>
        For rolling-window campgrounds, the booking morning is mostly about reflexes:
      </p>
      <ul>
        <li>Create your recreation.gov account at least 24 hours ahead. Don’t be filling in a credit card at 7:01.</li>
        <li>Save a payment method to your account.</li>
        <li>Be on the campground page, logged in, 5 minutes early. Phone hotspot ready in case home Wi-Fi blips.</li>
        <li>At 6:59:50, do a hard refresh.</li>
        <li>The dates you want will turn green. Click the first night, walk through checkout in under 90 seconds, then go back and add adjacent nights to the same reservation.</li>
        <li>Don’t pause to read the cancellation policy — read it before, or after. The window where popular sites are available is often under 60 seconds.</li>
      </ul>

      <h3>3. Watch for cancellations</h3>
      <p>
        Cancellations happen constantly — health issues, weather, plans changing — and a site that was “booked solid 6 months out” often has 2–3 nights re-open at random hours.
      </p>
      <ul>
        <li><strong>Recreation.gov’s built-in “Notify Me” feature</strong> is free. You set a date range and a campground, and it emails you when something opens up. Slower than paid tools but costs nothing.</li>
        <li><strong>Campnab</strong>, <strong>Campflare</strong>, and <strong>Schnerp</strong> are paid services that scan recreation.gov and state-park systems on a tighter loop and can text you when a site opens. Free trials usually exist; ongoing use is a few dollars a month. Mentioned factually — none are required, and recreation.gov’s own alerts work fine for less-popular trips.</li>
        <li>Cancellation activity spikes in the <strong>2 weeks before</strong> a peak weekend — that’s when other people’s plans fall apart. If you missed the 6-month window, the cancellation play often works at the 14-day mark.</li>
      </ul>

      <h3>4. Book Sunday through Thursday</h3>
      <p>
        Friday–Saturday nights are the bottleneck at every popular campground. Sunday–Thursday nights — same campground, same site, same view — are often available the same week. If your work and school schedule allow, even a single Monday-night swap dramatically expands what you can book.
      </p>

      <h3>5. Book the “off-section” of a campground</h3>
      <p>
        Most campgrounds have a back loop, a walk-in tent section, or a no-hookups area that books slower than the main RV-friendly loop. The view, the bathroom, and the trail access are usually identical. If the “Loop A premium” sites are gone, check Loop C, the walk-in section, or the tent-only area.
      </p>

      <h3>6. Have a Plan B that’s a dispersed or first-come site</h3>
      <p>
        The most reliable guarantee that you’re going camping this weekend is a Plan B that doesn’t depend on the reservation system at all — a known FCFS campground or a <Link href="/guides/dispersed-camping-on-blm-and-national-forest-land">dispersed camping site on BLM or National Forest land</Link>. If your reservation play falls through, you’re still going. If it doesn’t, you have a backup for the next trip.
      </p>

      <h2>What to do when there’s nothing available 2 weeks out</h2>
      <p>
        You missed the booking window, and now you’re trying to put together a trip in 14 days. Three plays, in order of effort:
      </p>
      <ul>
        <li><strong>Accept a worse site at the same campground.</strong> Loop C, no shade, or right next to the bathroom. They’re open for a reason — and for a beginner, “a campsite at all” beats “the perfect site never.”</li>
        <li><strong>Pivot to a state park.</strong> State park systems often have last-minute openings that recreation.gov doesn’t. Check <Link href="/guides/best-state-parks-for-families">your state’s parks</Link>.</li>
        <li><strong>Try a private campground.</strong> KOA, Jellystone, and independent campgrounds often have weekend availability when the federal system is full. They’re more expensive but reliable.</li>
        <li><strong>Go dispersed.</strong> If the weather is good and you have a moderate amount of camping experience, dispersed camping on BLM or National Forest land is the no-reservation option.</li>
        <li><strong>Shift the dates.</strong> If you can move from a Friday–Sunday to a Sunday–Tuesday, your options multiply by roughly 5x.</li>
      </ul>

      <h2>Common first-time mistakes</h2>
      <ul>
        <li><strong>Not knowing about the rolling window.</strong> Searching in March for a July 4 weekend at a popular National Park, finding everything booked, and assuming the system is broken. (It isn’t — those sites dropped on January 4 and were gone in 90 seconds.)</li>
        <li><strong>Trying to book Friday–Saturday at a flagship park.</strong> The hardest possible play. Move to Sunday–Thursday or pick a less-iconic park.</li>
        <li><strong>Not setting up the recreation.gov account before the drop morning.</strong> Account creation, email verification, and saved payment can take 10 minutes — way too long when you have 60 seconds.</li>
        <li><strong>No Plan B.</strong> Treating one campground as the only option, then having no trip when it’s gone.</li>
        <li><strong>Not reading the cancellation policy before locking in dates.</strong> Most reservations have a $10 cancellation fee plus a per-night penalty if you cancel inside 14 days. Know what you’re committing to before you book.</li>
        <li><strong>Booking the wrong number of nights.</strong> Some campgrounds have a 2-night minimum on weekends. Try to book one night and the system rejects you with a vague error.</li>
      </ul>

      <h2>Recommended next step</h2>
      <p>
        Booking a site is half the trip. The other half is the plan — what to bring, how to arrive, what the first night actually looks like. If you’re booking your very first family trip, take the <Link href="/quiz">5-second quiz</Link> for a custom plan, or jump to the <Link href="/plans/first-weekend-camp">first-weekend camp plan</Link> for a 2-night structured walkthrough. For the broader fundamentals, <Link href="/guides/how-to-plan-a-camping-trip">how to plan a camping trip</Link> covers the full sequence from picking a park to the morning-of checklist.
      </p>

      <h2>Frequently asked</h2>
      <h3>How far ahead can I book?</h3>
      <p>
        Most federal sites: 6 months out via a rolling daily release. Yosemite and a few other top-tier parks: a full month released on the 15th, five months out. State parks: 6–11 months depending on the state.
      </p>
      <h3>What time do reservations open?</h3>
      <p>
        For rolling-window sites, 7 a.m. local time on the day six months out. For Yosemite-style block releases, 7 a.m. Pacific on the 15th of the month. The campground page lists the exact rule.
      </p>
      <h3>What do I do if everything’s booked?</h3>
      <p>
        Set cancellation alerts (free via recreation.gov, faster via Campnab/Campflare/Schnerp), shift to Sunday–Thursday, or pivot to state parks, FCFS sites, or dispersed camping.
      </p>
      <h3>Can I book a state park on recreation.gov?</h3>
      <p>
        No. State parks use state-specific systems (ReserveCalifornia, Texas State Parks, etc.). Bookmark the right one for your state.
      </p>
      <h3>Are FCFS sites reliable?</h3>
      <p>
        For Sunday–Thursday in summer, yes. For Friday afternoons in July, no. Arrive Thursday or before noon Friday if you’re depending on a first-come site.
      </p>
    </GuidePage>
    <GuideGearShelf guideSlug="recreation-gov-reservation-strategy" />
    <GuideArticleCTA />
    <RelatedGuides currentSlug="recreation-gov-reservation-strategy" />
    </>
  )
}
