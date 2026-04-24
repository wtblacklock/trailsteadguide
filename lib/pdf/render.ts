/**
 * Puppeteer renderer. Environment-aware:
 *  - On Vercel/AWS Lambda: uses @sparticuz/chromium (small headless build)
 *  - Locally: uses your system Chrome via puppeteer-core (no second download)
 *
 * Set PUPPETEER_EXECUTABLE_PATH locally if Chrome is in a non-standard place.
 */

import puppeteer, { type Browser } from 'puppeteer-core'

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

export async function renderHtmlToPdf(html: string): Promise<Buffer> {
  const browser = await launchBrowser()
  try {
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle0' })
    await page.emulateMediaType('print')
    // Make sure web fonts (Inter) finish loading before rendering. Without
    // this, SVG <text> and text-heavy sections can snapshot in a fallback
    // font or — worse — render invisibly.
    await page.evaluate(() => (document as Document & { fonts: { ready: Promise<void> } }).fonts.ready)
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    })
    return Buffer.from(pdf)
  } finally {
    await browser.close()
  }
}
