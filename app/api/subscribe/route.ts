import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import {
  PLAN_TAG_IDS,
  PRINTABLE_TAG_IDS,
  PRINTABLE_GENERIC_TAG_ID,
  QUIZ_STARTED_TAG_ID,
} from '@/lib/kit-tags'
import { getPlanEmail, getPrintableEmail } from '@/lib/email-templates'

type SubscribeBody = {
  email: string
  planSlug?: string
  printableSlug?: string
  source?: 'mid-quiz' | 'post-plan' | 'homepage' | 'printable'
}

export async function POST(req: Request) {
  const kitApiKey = process.env.CONVERTKIT_API_KEY
  const formId = process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID
  const resendApiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.EMAIL_FROM // e.g. "Trailstead Guide <hello@trailsteadguide.com>"

  if (!kitApiKey || !formId) {
    return NextResponse.json(
      { error: 'Email service not configured' },
      { status: 500 }
    )
  }

  let body: SubscribeBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const { email, planSlug, printableSlug, source } = body
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  // Build tag list
  const tagIds: number[] = []
  if (source === 'post-plan' && planSlug && PLAN_TAG_IDS[planSlug]) {
    tagIds.push(PLAN_TAG_IDS[planSlug])
  }
  if (source === 'mid-quiz' && QUIZ_STARTED_TAG_ID) {
    tagIds.push(QUIZ_STARTED_TAG_ID)
  }
  if (source === 'printable') {
    if (printableSlug && PRINTABLE_TAG_IDS[printableSlug]) {
      tagIds.push(PRINTABLE_TAG_IDS[printableSlug])
    }
    if (PRINTABLE_GENERIC_TAG_ID) {
      tagIds.push(PRINTABLE_GENERIC_TAG_ID)
    }
  }

  // 1. Subscribe to Kit (store for newsletters / tagging)
  try {
    const kitRes = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: kitApiKey,
          email,
          tags: tagIds.length ? tagIds : undefined,
        }),
      }
    )

    if (!kitRes.ok) {
      const text = await kitRes.text()
      console.error('Kit subscribe failed', kitRes.status, text)
      // Don't fail the user-facing flow — continue to Resend.
    }
  } catch (err) {
    console.error('Kit subscribe error', err)
    // Continue — we'd rather send the plan than block on Kit.
  }

  // 2. Send the source-specific transactional email via Resend.
  //    - post-plan → plan email with the link to the personalized plan
  //    - printable → printable email with the link to the print view
  //    Anything else (homepage, mid-quiz) lands in Kit only and gets a
  //    welcome sequence from there.
  let emailTemplate: ReturnType<typeof getPlanEmail> = null
  if (source === 'post-plan' && planSlug) {
    emailTemplate = getPlanEmail(planSlug)
  } else if (source === 'printable' && printableSlug) {
    emailTemplate = getPrintableEmail(printableSlug)
  }

  if (emailTemplate && resendApiKey && fromEmail) {
    try {
      const resend = new Resend(resendApiKey)
      const { error } = await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
      })
      if (error) {
        console.error('Resend send failed', error)
        return NextResponse.json(
          { error: 'Email send failed' },
          { status: 502 }
        )
      }
    } catch (err) {
      console.error('Resend error', err)
      return NextResponse.json(
        { error: 'Email send error' },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ ok: true })
}
