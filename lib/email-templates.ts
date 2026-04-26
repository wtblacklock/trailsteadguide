// Plan email templates. One per plan slug.
// Keep emails short and warm — the site is the source of truth.

type PlanEmail = {
  subject: string
  html: string
  text: string
}

const SITE_URL = 'https://www.trailsteadguide.com'

const PLAN_META: Record<string, { label: string; pitch: string }> = {
  'backyard-test': {
    label: 'Backyard Test Run',
    pitch: 'Before you drive anywhere, pitch your tent in the backyard. Here&rsquo;s your step-by-step plan to practice without pressure.',
  },
  'first-night-camp': {
    label: 'First Night Camping',
    pitch: 'One night, close to home, with everything you need. Here&rsquo;s your full plan.',
  },
  'first-weekend-camp': {
    label: 'First Weekend Camping',
    pitch: 'A two-night trip built for first-timers. Here&rsquo;s your complete plan — timeline, gear, meals, kid activities.',
  },
  'easy-family-basecamp': {
    label: 'Easy Family Basecamp',
    pitch: 'A comfortable basecamp trip where you settle in once and explore from there. Your full plan is ready.',
  },
}

export function getPlanEmail(planSlug: string): PlanEmail | null {
  const meta = PLAN_META[planSlug]
  if (!meta) return null

  const planUrl = `${SITE_URL}/plans/${planSlug}`

  const subject = `Your ${meta.label.toLowerCase()} plan is ready`

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${subject}</title>
</head>
<body style="margin:0; padding:0; background:#F5F3EE; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif; color:#1c1917;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F5F3EE;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px; background:#ffffff; border-radius:16px; overflow:hidden;">
          <tr>
            <td style="padding:40px 40px 24px 40px;">
              <img src="${SITE_URL}/images/logo_masthead.png" alt="Trailstead Guide" width="160" style="display:block; height:auto; margin:0 0 28px 0; max-width:160px;">
              <h1 style="margin:0 0 20px 0; font-family:Georgia,serif; font-size:28px; line-height:1.25; font-weight:600; color:#0c0a09;">
                Your ${meta.label.toLowerCase()} plan is ready.
              </h1>
              <p style="margin:0 0 28px 0; font-size:16px; line-height:1.6; color:#44403c;">
                ${meta.pitch}
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:#1c1917; border-radius:8px;">
                    <a href="${planUrl}" style="display:inline-block; padding:14px 28px; font-size:15px; font-weight:500; color:#ffffff; text-decoration:none;">
                      View your full plan &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:32px 0 0 0; font-size:14px; line-height:1.6; color:#78716c;">
                Inside you&rsquo;ll find the timeline, gear list, meals, kid activities, and safety notes &mdash; everything you need to walk out the door confident.
              </p>
              <p style="margin:20px 0 0 0; font-size:14px; line-height:1.6; color:#78716c;">
                Bookmark the link. We&rsquo;ll keep improving the plan as more first-time families try it.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px 32px 40px; border-top:1px solid #e7e5e4;">
              <p style="margin:0; font-size:13px; line-height:1.6; color:#a8a29e;">
                Happy camping,<br>
                Trailstead Guide
              </p>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0 0; font-size:12px; line-height:1.6; color:#a8a29e;">
          You&rsquo;re getting this because you requested your plan at trailsteadguide.com.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`

  const text = `Your ${meta.label.toLowerCase()} plan is ready.

${meta.pitch.replace(/&rsquo;/g, "'")}

View your full plan: ${planUrl}

Inside you'll find the timeline, gear list, meals, kid activities, and safety notes — everything you need to walk out the door confident.

Happy camping,
Trailstead Guide`

  return { subject, html, text }
}

/**
 * Homepage / generic checklist email — sent when a visitor signs up from the
 * homepage capture without picking a plan. Content is the universal "first
 * trip essentials" core + a prep timeline, designed to work for any of the
 * starter plans (backyard test, first night, first weekend, easy basecamp).
 */
export function getHomepageChecklistEmail(): PlanEmail {
  const plansUrl = `${SITE_URL}/plans`

  const subject = 'Your first-trip camping checklist'

  const sectionTitle = (label: string) =>
    `<h2 style="margin:28px 0 10px 0; font-family:Georgia,serif; font-size:18px; line-height:1.3; font-weight:600; color:#0c0a09;">${label}</h2>`

  const list = (items: string[]) =>
    `<ul style="margin:0 0 4px 0; padding:0 0 0 20px; font-size:15px; line-height:1.7; color:#292524;">${items
      .map((i) => `<li style="margin:0 0 4px 0;">${i}</li>`)
      .join('')}</ul>`

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${subject}</title>
</head>
<body style="margin:0; padding:0; background:#F5F3EE; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif; color:#1c1917;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F5F3EE;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; background:#ffffff; border-radius:16px; overflow:hidden;">
          <tr>
            <td style="padding:40px 40px 24px 40px;">
              <img src="${SITE_URL}/images/logo_masthead.png" alt="Trailstead Guide" width="160" style="display:block; height:auto; margin:0 0 28px 0; max-width:160px;">
              <h1 style="margin:0 0 16px 0; font-family:Georgia,serif; font-size:28px; line-height:1.25; font-weight:600; color:#0c0a09;">
                Your first-trip checklist.
              </h1>
              <p style="margin:0 0 8px 0; font-size:16px; line-height:1.6; color:#44403c;">
                This is the universal core &mdash; everything a first-time family camper needs whether you&rsquo;re testing in the backyard or heading out for a full weekend. Print it, check it off, head out.
              </p>

              ${sectionTitle('Shelter &amp; sleep')}
              ${list([
                'Tent (with stakes, poles, rainfly, footprint)',
                'Sleeping bag &mdash; one per person, rated for the lows you&rsquo;ll hit',
                'Sleeping pad or air mattress per person',
                'Pillow (or a stuff sack with clothes)',
              ])}

              ${sectionTitle('Camp kitchen')}
              ${list([
                '2-burner stove + full fuel canister (test it at home first)',
                'Lighter and waterproof matches',
                'One pot, one pan, one cooking utensil',
                'Plates, bowls, cups, eating utensils &mdash; one set per person',
                'Sharp knife and a small cutting board',
                '5-gallon water jug (or two 1-gallon jugs)',
                'Dish soap, sponge, two dishtubs (wash + rinse)',
                'Trash bags &mdash; pack out everything',
              ])}

              ${sectionTitle('Food (1&ndash;2 nights)')}
              ${list([
                'One-pot dinner: chili, pasta, or foil packs',
                'Breakfast: eggs &amp; bacon, oatmeal, or breakfast burritos',
                'Lunch: sandwiches, wraps, or tuna pouches',
                'Snacks: trail mix, granola bars, fruit, jerky',
                'Coffee or tea + filters',
                'Plenty of water (1 gallon per person per day, minimum)',
              ])}

              ${sectionTitle('Light')}
              ${list([
                'Headlamp per person + spare batteries',
                'Lantern for the picnic table (optional but worth it)',
              ])}

              ${sectionTitle('Clothing &amp; personal')}
              ${list([
                'Layers &mdash; nights are colder than you think',
                'Rain shell or poncho per person',
                'Dedicated sleep clothes (kept dry in the tent)',
                'Closed-toe shoes + extra socks',
                'Hat, sunscreen, bug spray',
                'Toiletries, towel, prescription meds',
              ])}

              ${sectionTitle('Safety &amp; comfort')}
              ${list([
                'First-aid kit',
                'Multitool or knife',
                'Duct tape and paracord',
                'Paper towels',
                'Camp chairs (one per person)',
              ])}

              <h2 style="margin:36px 0 12px 0; font-family:Georgia,serif; font-size:20px; line-height:1.3; font-weight:600; color:#0c0a09;">
                Trip prep timeline
              </h2>

              <p style="margin:8px 0 4px 0; font-size:14px; font-weight:600; color:#0c0a09; text-transform:uppercase; letter-spacing:0.05em;">3 weeks before</p>
              ${list([
                'Reserve your campsite',
                'Check weather patterns for the area',
                'Confirm anyone joining can make the dates',
              ])}

              <p style="margin:16px 0 4px 0; font-size:14px; font-weight:600; color:#0c0a09; text-transform:uppercase; letter-spacing:0.05em;">1 week before</p>
              ${list([
                'Pitch the tent in the yard &mdash; check for missing parts',
                'Test the stove and lantern at home',
                'Shop pantry items + non-perishables',
              ])}

              <p style="margin:16px 0 4px 0; font-size:14px; font-weight:600; color:#0c0a09; text-transform:uppercase; letter-spacing:0.05em;">Day before</p>
              ${list([
                'Pack the vehicle (heaviest gear first)',
                'Pre-freeze water bottles to use as cooler ice',
                'Charge headlamps and phones',
                'Buy perishables and ice',
              ])}

              <p style="margin:16px 0 4px 0; font-size:14px; font-weight:600; color:#0c0a09; text-transform:uppercase; letter-spacing:0.05em;">Morning of</p>
              ${list([
                'Top off the cooler with fresh ice',
                'Final weather check',
                'Drive &mdash; aim to arrive 2 hours before sunset',
              ])}

              <p style="margin:36px 0 16px 0; font-size:16px; line-height:1.6; color:#44403c;">
                When you&rsquo;re ready for a structured plan with timeline, meals, and gear bundle picked for your exact trip, we have four to choose from.
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:#1c1917; border-radius:8px;">
                    <a href="${plansUrl}" style="display:inline-block; padding:14px 28px; font-size:15px; font-weight:500; color:#ffffff; text-decoration:none;">
                      Browse the camping plans &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px 32px 40px; border-top:1px solid #e7e5e4;">
              <p style="margin:0; font-size:13px; line-height:1.6; color:#a8a29e;">
                Happy camping,<br>
                Trailstead Guide
              </p>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0 0; font-size:12px; line-height:1.6; color:#a8a29e;">
          You&rsquo;re getting this because you requested the checklist at trailsteadguide.com.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`

  const text = `Your first-trip camping checklist.

This is the universal core — everything a first-time family camper needs whether you're testing in the backyard or heading out for a full weekend. Print it, check it off, head out.

SHELTER & SLEEP
- Tent (with stakes, poles, rainfly, footprint)
- Sleeping bag — one per person, rated for the lows you'll hit
- Sleeping pad or air mattress per person
- Pillow (or a stuff sack with clothes)

CAMP KITCHEN
- 2-burner stove + full fuel canister (test it at home first)
- Lighter and waterproof matches
- One pot, one pan, one cooking utensil
- Plates, bowls, cups, eating utensils — one set per person
- Sharp knife and a small cutting board
- 5-gallon water jug (or two 1-gallon jugs)
- Dish soap, sponge, two dishtubs (wash + rinse)
- Trash bags — pack out everything

FOOD (1–2 NIGHTS)
- One-pot dinner: chili, pasta, or foil packs
- Breakfast: eggs & bacon, oatmeal, or breakfast burritos
- Lunch: sandwiches, wraps, or tuna pouches
- Snacks: trail mix, granola bars, fruit, jerky
- Coffee or tea + filters
- Plenty of water (1 gallon per person per day, minimum)

LIGHT
- Headlamp per person + spare batteries
- Lantern for the picnic table (optional but worth it)

CLOTHING & PERSONAL
- Layers — nights are colder than you think
- Rain shell or poncho per person
- Dedicated sleep clothes (kept dry in the tent)
- Closed-toe shoes + extra socks
- Hat, sunscreen, bug spray
- Toiletries, towel, prescription meds

SAFETY & COMFORT
- First-aid kit
- Multitool or knife
- Duct tape and paracord
- Paper towels
- Camp chairs (one per person)

TRIP PREP TIMELINE

3 weeks before
- Reserve your campsite
- Check weather patterns for the area
- Confirm anyone joining can make the dates

1 week before
- Pitch the tent in the yard — check for missing parts
- Test the stove and lantern at home
- Shop pantry items + non-perishables

Day before
- Pack the vehicle (heaviest gear first)
- Pre-freeze water bottles to use as cooler ice
- Charge headlamps and phones
- Buy perishables and ice

Morning of
- Top off the cooler with fresh ice
- Final weather check
- Drive — aim to arrive 2 hours before sunset

When you're ready for a structured plan with timeline, meals, and gear bundle picked for your exact trip, we have four to choose from:
${plansUrl}

Happy camping,
Trailstead Guide`

  return { subject, html, text }
}
