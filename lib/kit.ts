/**
 * ConvertKit (Kit) subscriber helper. One place that calls the Kit
 * /v3/forms/<id>/subscribe endpoint so every email-capturing surface
 * — quiz, paywall, Stripe webhook — funnels into the same audience.
 *
 * No-op (returns { ok: false, skipped: true }) when CONVERTKIT_API_KEY
 * or NEXT_PUBLIC_CONVERTKIT_FORM_ID is unset, so local dev and tests
 * can run without env wiring.
 */

type KitResult = { ok: boolean; skipped?: boolean; error?: string }

export async function subscribeToKit(input: {
  email: string
  /** Optional Kit tag IDs to attach to the subscriber. */
  tagIds?: number[]
  /** Optional fields object (e.g. first_name) — passed straight to the API. */
  fields?: Record<string, string | number | boolean>
}): Promise<KitResult> {
  const apiKey = process.env.CONVERTKIT_API_KEY
  const formId = process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID
  if (!apiKey || !formId) {
    console.warn('[kit] subscribe skipped — missing env', {
      hasApiKey: !!apiKey,
      hasFormId: !!formId,
    })
    return { ok: false, skipped: true }
  }

  const tags = input.tagIds?.filter((id) => id > 0)
  const body = {
    api_key: apiKey,
    email: input.email,
    ...(tags && tags.length ? { tags } : {}),
    ...(input.fields ? { fields: input.fields } : {}),
  }

  try {
    const res = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error('[kit] subscribe failed', res.status, text)
      return { ok: false, error: `${res.status} ${text}`.slice(0, 200) }
    }
    return { ok: true }
  } catch (err) {
    console.error('[kit] subscribe error', err)
    return { ok: false, error: (err as Error).message }
  }
}
