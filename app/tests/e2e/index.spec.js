/**
 * @file Tests for landing page
 */

import { setupTest, createPage } from '@nuxt/test-utils'

describe('Landing page', () => {
  /**
   * Set up the tests.
   */
  jest.setTimeout(10000)
  setupTest({ browser: true })

  /**
   * Run all tests.
   */
  it('renders correctly', async () => {
    const page = await createPage('/')
    const locator = page.locator('.page-index')

    expect(locator).toBeTruthy()
  })
})
