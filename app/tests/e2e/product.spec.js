/**
 * @file Tests for the product page.
 */

import { setupTest, createPage } from '@nuxt/test-utils'

describe('Product page', () => {
  /**
   * Set up the tests.
   */
  setupTest({ browser: true })

  /**
   * Run all tests.
   */
  it('renders correctly', async () => {
    const page = await createPage(
      '/products/wedge-sandals-with-buckle-gab31512-317-897'
    )
    const locator = page.locator('.template-product')

    expect(locator).toBeTruthy()
  })
})
