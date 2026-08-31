import Link from 'next/link'
import { GuidePage } from '@/components/guide/GuidePage'
import { QuickAnswer } from '@/components/guide/QuickAnswer'
import GuideArticleCTA from '@/components/guide/GuideArticleCTA'
import RelatedGuides from '@/components/guide/RelatedGuides'
import GuideGearShelf from '@/components/guide/GuideGearShelf'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { pageMetadata, articleGraph, faqPageGraph, SITE_URL } from '@/lib/seo'

const SLUG = '/guides/summer-camping-with-kids'
const TITLE = 'Summer Camping With Kids'
const META_TITLE = 'Summer Camping With Kids - Heat & Sun Guide'
const DESCRIPTION =
  'Summer camping with kids: heat and dehydration signs kids won\'t self-report, sunscreen logistics, water play as the daily centerpiece, and bug protection for young skin.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1775582225177-2f3c76c9791f?w=1400&auto=format&fit=crop&q=80'

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
            q: 'How do you know if a kid is overheating at camp?',
            a: 'Kids don\'t reliably self-report the way adults do - watch for behavior instead of waiting to be told. Unusual quietness, stopping mid-play, flushed skin without sweating, and irritability are earlier and more reliable signs than a kid actually saying "I\'m hot." By the time a kid complains, they\'re often already fairly overheated.',
          },
          {
            q: 'How often should sunscreen be reapplied at camp?',
            a: 'Every two hours minimum, and immediately after any water play regardless of the "water-resistant" claim on the bottle. Camp days involve far more sustained outdoor time than a normal day, so reapplication needs to happen on a schedule, not just when someone remembers.',
          },
          {
            q: 'Is bug spray safe for young kids?',
            a: 'DEET-based repellents are generally considered safe for children over 2 months at concentrations of 30% or less, applied to skin but not hands, and not near eyes or mouth. For younger infants or parents who prefer to avoid DEET entirely, physical barriers - mosquito netting over a stroller or pack-n-play, long sleeves at dawn and dusk - are the alternative.',
          },
          {
            q: 'What water activities work for a summer camping trip with kids?',
            a: 'A shallow lake edge or a kiddie pool brought from home both work well and don\'t require a swimming skill level. A sprinkler or misting fan at the campsite itself covers the hours between real water time. Any actual swimming needs the same hands-on supervision it would at a pool - a campground lake is not a safer environment by default.',
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
        slug="summer-camping-with-kids"
        eyebrow="With kids"
        title="Summer Camping With Kids"
        lede="Heat signs kids won't tell you about, sunscreen logistics, water play as the daily centerpiece, and bug protection for young skin."
        heroImage={{
          src: HERO_IMAGE,
          alt: "A child in a sun hat wading at the water's edge with seagulls flying nearby",
        }}
      >
        <QuickAnswer
          tldr="Watch behavior, not complaints, for overheating. Reapply sunscreen every 2 hours. Build the day around water play, not around it."
          summary="Summer camping with kids adds a kid-specific layer on top of general hot-weather camping. Kids don't reliably say they're overheating the way adults do - watch for quietness, flushed skin, and stopping mid-play instead of waiting to be told. Sunscreen needs to go on a schedule (every two hours, always after water) rather than a one-time morning application. Water play - a shallow lake edge, a kiddie pool, a sprinkler at camp - should be the centerpiece of the hottest hours, not an occasional treat, since it does double duty as cooling and entertainment. And bug protection matters more for young skin, which reacts faster to both bites and repellent. For the general hot-weather playbook - site selection, shade, adult hydration math - see camping in a heatwave."
        />

        <h2>Kids don&apos;t self-report overheating</h2>
        <p>
          The same pattern that shows up with cold shows up with heat: kids don&apos;t reliably say
          &ldquo;I&apos;m too hot&rdquo; the way an adult would. Watch behavior instead of waiting
          for a complaint - a kid who goes quiet, stops mid-play, or looks flushed without visible
          sweating is often already meaningfully overheated by the time it&apos;s obvious.
          Irritability that doesn&apos;t match the situation is another early sign worth taking
          seriously rather than chalking up to a bad mood.
        </p>
        <p>
          For the adult-focused version of this - hydration math, heat exhaustion signs, when to
          reschedule entirely - see{' '}
          <Link href="/guides/camping-in-a-heatwave">camping in a heatwave</Link>.
        </p>

        <h2>Sunscreen on a schedule, not a memory</h2>
        <p>
          A single morning application doesn&apos;t cover a full camp day. Reapply every two hours
          minimum, and immediately after any water play regardless of what the bottle&apos;s
          &ldquo;water-resistant&rdquo; claim says - swimming and toweling off both strip most of
          it. A UPF-rated rash guard or sun shirt cuts down how often bare skin needs
          reapplication at all, which matters more than it sounds like when you&apos;re also
          managing meals, naps, and everything else.
        </p>

        <h2>Build the day around water, not just shade</h2>
        <p>
          Water play does double duty at a summer trip with kids - it&apos;s cooling and it&apos;s
          entertainment, and both matter equally during the hottest hours. A shallow lake edge, a
          kiddie pool packed from home, or a sprinkler set up at the campsite all work without
          requiring any real swimming skill. Plan the hottest part of the day, roughly late morning
          through mid-afternoon, around whichever water option is available, and treat shade-only
          activities as the fallback rather than the plan.
        </p>
        <p>
          Any actual swimming - a lake, a river, a campground pool - needs the same hands-on
          supervision it would anywhere else. A campground isn&apos;t a safer water environment by
          default just because it feels more relaxed than a public pool.
        </p>

        <h2>Bug protection for young skin</h2>
        <p>
          Young skin reacts faster to both mosquito bites and to repellent itself. DEET-based
          repellents at 30% concentration or below are generally considered fine for kids over 2
          months, applied to skin but not hands, and kept away from eyes and mouth. For younger
          infants, or parents who&apos;d rather skip DEET, physical barriers do the job instead:
          mosquito netting over a stroller or pack-n-play, and long sleeves at dawn and dusk when
          bugs are most active.
        </p>

        <h2>Cooling gear that actually helps</h2>
        <p>
          A battery or rechargeable camp fan pointed at the shaded rest area makes the midday
          break tolerable instead of just bearable. Electrolyte packets help both kids and adults
          replace what sweat alone doesn&apos;t cover, especially on a day with real water play and
          real sun exposure. A canopy over the main site area extends how long the group can
          comfortably be outside the tent at all during peak sun.
        </p>

        <h2>When to call it and go inside - or home</h2>
        <p>
          If a kid stops responding to shade, water, and a rest break within 30 minutes, that&apos;s
          past the point of waiting it out. Move to full shade or an air-conditioned space (the
          car counts), and if symptoms don&apos;t improve - persistent flushed skin, no sweating,
          confusion or unusual sleepiness - treat it as a medical situation, not a camp
          inconvenience.
        </p>

        <h2>Frequently asked</h2>
        <h3>How do you know if a kid is overheating at camp?</h3>
        <p>
          Watch behavior, not complaints - quietness, stopping mid-play, and flushed skin without
          sweating show up before a kid says anything.
        </p>
        <h3>How often should sunscreen be reapplied at camp?</h3>
        <p>
          Every two hours minimum, and immediately after any water play regardless of the
          water-resistant claim on the label.
        </p>
        <h3>Is bug spray safe for young kids?</h3>
        <p>
          DEET at 30% or below is generally fine for kids over 2 months. For younger infants,
          mosquito netting and long sleeves at dawn/dusk are the alternative.
        </p>
        <h3>What water activities work for a summer trip with kids?</h3>
        <p>
          A shallow lake edge, a kiddie pool from home, or a campsite sprinkler all work without
          requiring swimming skill - but any real swimming still needs hands-on supervision.
        </p>
      </GuidePage>
      <GuideGearShelf guideSlug="summer-camping-with-kids" heading="Gear for the hottest hours" />
      <GuideArticleCTA />
      <RelatedGuides currentSlug="summer-camping-with-kids" />
    </>
  )
}
