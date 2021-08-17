/**
 * @file Tests for landing page
 */

import { setupTest, createPage } from '@nuxt/test-utils'

describe('Landing page', () => {
  setupTest({ browser: true })

  it('renders correctly', async () => {
    const page = await createPage('/')
    const locator = page.locator('.page-index')

    expect(locator).toBeTruthy()
  })
})
