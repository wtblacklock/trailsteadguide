/**
 * Puppeteer renderer. Environment-aware:
 *  - On Vercel/AWS Lambda: uses @sparticuz/chromium (small headless build)
 *  - Locally: uses your system Chrome via puppeteer-core (no second download)
 *
 * Set PUPPETEER_EXECUTABLE_PATH locally if Chrome is in a non-standard place.
 *
 * Page layout: US Letter (8.5 × 11 in). Per-page footer is rendered by
 * Puppeteer's `footerTemplate` so it lands at the bottom of EVERY printed
 * page, including overflow pages of long sections — the in-HTML footer
 * approach can't see physical page boundaries. The CSS reserves the matching
 * bottom margin so content above the footer is never clipped.
 */

import puppeteer, { type Browser } from 'puppeteer-core'

const FOOTER_TEMPLATE = `
<div style="
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  font-size: 8pt;
  color: #8a9088;
  letter-spacing: 0.4px;
  padding: 0 14mm;
  display: flex;
  justify-content: space-between;
  align-items: center;
">
  <span style="font-weight: 700; letter-spacing: 3px; color: #3a5a3e; text-transform: uppercase;">
    TRAILSTEAD GUIDE
  </span>
  <span style="text-align: right;">trailsteadguide.com</span>
</div>`

// An empty-but-non-zero header is required when displayHeaderFooter is true
// or Chrome falls back to its default header ("date, url"). One non-breaking
// space inside a hidden div is the standard workaround.
const HEADER_TEMPLATE = `<div style="display:none;">&nbsp;</div>`

const isVercel = !!process.env.VERCEL || !!process.env.AWS_LAMBDA_FUNCTION_NAME

async function localExecutablePath(): Promise<string> {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH
  // Default macOS Chrome path; users can override via env.
  if (process.platform === 'darwin') {
    return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  }
  if (process.platform === 'linux') return '/usr/bin/google-chrome'
  if (process.platform === 'win32') {
    return 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  }
  throw new Error('No Chromium found. Set PUPPETEER_EXECUTABLE_PATH.')
}

async function launchBrowser(): Promise<Browser> {
  if (isVercel) {
    const chromium = (await import('@sparticuz/chromium')).default
    return puppeteer.launch({
      args: chromium.args,
      defaultViewport: { width: 1200, height: 1600 },
      executablePath: await chromium.executablePath(),
      headless: true,
    })
  }
  return puppeteer.launch({
    executablePath: await localExecutablePath(),
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
}

/**
 * How long to wait for images (mostly Amazon CDN product photos) before
 * giving up and rendering anyway. The previous `networkidle0` strategy
 * blocked indefinitely when m.media-amazon.com stalled — which made CI
 * fail on slow-network days. With this hard cap, a flaky image at most
 * costs us this many ms of wait time and renders with a broken-image
 * placeholder.
 */
const IMAGE_LOAD_TIMEOUT_MS = 8000

export async function renderHtmlToPdf(html: string): Promise<Buffer> {
  const browser = await launchBrowser()
  try {
    const page = await browser.newPage()
    // domcontentloaded fires as soon as the parser is done — independent of
    // any sub-resource fetch. We then explicitly await fonts and (capped)
    // image loads, so a slow remote image can't stall the whole render.
    await page.setContent(html, { waitUntil: 'domcontentloaded' })
    await page.emulateMediaType('print')
    // Web fonts (Inter) — render-blocking, cheap to await.
    await page.evaluate(() =>
      (document as Document & { fonts: { ready: Promise<void> } }).fonts.ready,
    )
    // Images — best-effort, bounded. Resolve once every image is settled
    // (loaded OR errored), or once the timeout fires, whichever is first.
    await page.evaluate((timeoutMs) => {
      const imgs = Array.from(document.images)
      const settled = Promise.all(
        imgs.map((img) =>
          img.complete && img.naturalWidth > 0
            ? Promise.resolve()
            : new Promise<void>((resolve) => {
                img.addEventListener('load', () => resolve(), { once: true })
                img.addEventListener('error', () => resolve(), { once: true })
              }),
        ),
      )
      const cap = new Promise<void>((resolve) => setTimeout(resolve, timeoutMs))
      return Promise.race([settled.then(() => undefined), cap])
    }, IMAGE_LOAD_TIMEOUT_MS)
    const pdf = await page.pdf({
      format: 'letter',
      printBackground: true,
      // We set margins explicitly here (not via @page in CSS) because
      // displayHeaderFooter needs a non-zero margin to render its templates.
      // Setting preferCSSPageSize: false ensures these margins win.
      preferCSSPageSize: false,
      margin: { top: 0, right: 0, bottom: '12mm', left: 0 },
      displayHeaderFooter: true,
      headerTemplate: HEADER_TEMPLATE,
      footerTemplate: FOOTER_TEMPLATE,
    })
    return Buffer.from(pdf)
  } finally {
    await browser.close()
  }
}
