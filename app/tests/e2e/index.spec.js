/**
 * @file Tests for landing page
 */

import { setupTest, createPage } from '@nuxt/test-utils'

describe('Landing page', () => {
  /**
   * Set up the tests.
   */
  setupTest({
    browser: true,
    setupTimeout: 100000
  })

  /**
   * Run all tests.
   */
  it('renders correctly', async () => {
    const page = await createPage('/')
    const locator = page.locator('.page-index')

    expect(locator).toBeTruthy()
  }, 100000)
})
