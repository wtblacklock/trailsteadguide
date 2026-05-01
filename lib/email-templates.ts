// Plan email templates. One per plan slug.
// Keep emails short and warm — the site is the source of truth.

import { getPrintableBySlug } from './printables'

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
 * Auto-reply sent to a visitor who fills out the /contact form. Mirrors
 * the cream-wrap layout used by the plan + printable emails so the brand
 * stays consistent across every transactional touchpoint.
 */
export function getContactAutoReplyEmail(args: { name: string }): PlanEmail {
  const firstName = args.name.trim().split(/\s+/)[0] || 'there'

  const subject = 'We got your message — Trailstead Guide'

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
                Hey ${firstName}, thanks for reaching out.
              </h1>
              <p style="margin:0 0 20px 0; font-size:16px; line-height:1.6; color:#44403c;">
                Your message landed in our inbox. William will reply within 48 hours &mdash; usually sooner.
              </p>
              <p style="margin:0 0 28px 0; font-size:16px; line-height:1.6; color:#44403c;">
                In the meantime, if you haven&rsquo;t built your camping plan yet, the quiz is the best place to start.
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:#1c1917; border-radius:8px;">
                    <a href="${SITE_URL}/quiz" style="display:inline-block; padding:14px 28px; font-size:15px; font-weight:500; color:#ffffff; text-decoration:none;">
                      Build your plan &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px 32px 40px; border-top:1px solid #e7e5e4;">
              <p style="margin:0; font-size:13px; line-height:1.6; color:#a8a29e;">
                Talk soon,<br>
                William &mdash; Trailstead Guide
              </p>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0 0; font-size:12px; line-height:1.6; color:#a8a29e;">
          You&rsquo;re getting this because you wrote to us via trailsteadguide.com/contact.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`

  const text = `Hey ${firstName}, thanks for reaching out.

Your message landed in our inbox. William will reply within 48 hours — usually sooner.

In the meantime, if you haven't built your camping plan yet, the quiz is the best place to start: ${SITE_URL}/quiz

Talk soon,
William — Trailstead Guide`

  return { subject, html, text }
}

/**
 * Email template for a free printable download. Sent immediately by
 * /api/subscribe when the visitor submits the printable email-gate.
 * Body links straight to the print-optimized view so the user can hit
 * Cmd/Ctrl+P (or save as PDF) without bouncing back to the site.
 */
export function getPrintableEmail(printableSlug: string): PlanEmail | null {
  const printable = getPrintableBySlug(printableSlug)
  if (!printable) return null

  const printUrl = `${SITE_URL}/printables/${printable.slug}/print`
  const landingUrl = `${SITE_URL}/printables/${printable.slug}`

  const subject = `Your ${printable.title} is ready to print`

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
                ${printable.title}
              </h1>
              <p style="margin:0 0 28px 0; font-size:16px; line-height:1.6; color:#44403c;">
                ${printable.tagline}
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:#1c1917; border-radius:8px;">
                    <a href="${printUrl}" style="display:inline-block; padding:14px 28px; font-size:15px; font-weight:500; color:#ffffff; text-decoration:none;">
                      Open the print view &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:32px 0 0 0; font-size:14px; line-height:1.6; color:#78716c;">
                Hit &#8984;/Ctrl+P from the print view to print on a single sheet, or save it as a PDF for later. Letter or A4 both work.
              </p>
              <p style="margin:20px 0 0 0; font-size:14px; line-height:1.6; color:#78716c;">
                Bookmark the <a href="${landingUrl}" style="color:#1c1917; text-decoration:underline;">printable page</a> if you want to come back later — and the rest of the analog guides will land here as we build them.
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
          You&rsquo;re getting this because you requested a printable at trailsteadguide.com.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`

  const text = `${printable.title}

${printable.tagline}

Open the print view: ${printUrl}

Hit Cmd/Ctrl+P from that page to print on a single sheet, or save it as a PDF for later.

Landing page (bookmark if you want to come back): ${landingUrl}

Happy camping,
Trailstead Guide`

  return { subject, html, text }
}
