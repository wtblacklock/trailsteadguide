import { describe, it, expect } from 'vitest'
import { classifyAmazonProductHtml, asinFromUrl } from '../lib/amazon-page.mjs'

const productPage = (buyBox: string) =>
  `<html><body><span id="productTitle">Example Tent</span><div id="rightCol">${buyBox}</div></body></html>`

describe('classifyAmazonProductHtml', () => {
  it('treats a page with an Add to Cart button as buyable', () => {
    const r = classifyAmazonProductHtml(productPage('<input id="add-to-cart-button" type="submit">'))
    expect(r.status).toBe('buyable')
  })

  it('flags "Currently unavailable" listings', () => {
    const r = classifyAmazonProductHtml(
      productPage("<div id=\"availability\">Currently unavailable. We don't know when or if this item will be back in stock.</div>"),
    )
    expect(r).toEqual({ status: 'not-buyable', reason: 'Currently unavailable' })
  })

  it('flags listings with only third-party offers', () => {
    const r = classifyAmazonProductHtml(
      productPage('<span>No featured offers available</span><a>See All Buying Options</a>'),
    )
    expect(r.status).toBe('not-buyable')
    expect(r.reason).toMatch(/third-party/)
  })

  it('flags "See All Buying Options" without a buy box', () => {
    const r = classifyAmazonProductHtml(productPage('<span>High price</span><a>See All Buying Options</a>'))
    expect(r.status).toBe('not-buyable')
  })

  it('flags a variation page that needs a selection', () => {
    const r = classifyAmazonProductHtml(productPage('<div>To buy, select Size</div>'))
    expect(r.status).toBe('not-buyable')
    expect(r.reason).toMatch(/variant/)
  })

  it('does not report the 200-status robot check page as OK', () => {
    const r = classifyAmazonProductHtml(
      '<html><body><form action="/errors/validateCaptcha"><h4>Type the characters you see in this image:</h4></form></body></html>',
    )
    expect(r.status).toBe('robot-check')
  })

  it('reports other non-product responses as unknown', () => {
    expect(classifyAmazonProductHtml('<html><body>Page Not Found</body></html>').status).toBe('unknown')
    expect(classifyAmazonProductHtml('').status).toBe('unknown')
  })

  it('serializes cleanly so the browser audit snippet can embed it', () => {
    // The --browser-audit snippet evaluates this function's source in a
    // page; it must not depend on anything outside its own body.
    const fn = new Function(`return (${classifyAmazonProductHtml.toString()})`)()
    expect(fn(productPage('<input id="add-to-cart-button">')).status).toBe('buyable')
  })
})

describe('asinFromUrl', () => {
  it('extracts ASINs from /dp/ and /gp/product/ URLs', () => {
    expect(asinFromUrl('https://www.amazon.com/dp/B0D7QHY574?tag=trailsteadgui-20')).toBe('B0D7QHY574')
    expect(asinFromUrl('https://www.amazon.com/Coleman-Tent/dp/B0D7QHY574/ref=x')).toBe('B0D7QHY574')
    expect(asinFromUrl('https://www.amazon.com/gp/product/B0D7QHY574')).toBe('B0D7QHY574')
  })

  it('returns null for non-product URLs', () => {
    expect(asinFromUrl('https://www.amazon.com/s?k=family%20tent')).toBeNull()
    expect(asinFromUrl('https://amzn.to/4hYGaE3')).toBeNull()
  })
})
