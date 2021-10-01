/**
 * @file A group of links for sharing the current page.
 */

import ShareLinks from '~/components/ShareLinks'

import { createTemplate } from '~/helpers/storybook'

export default {
  title: 'Components/Share Links',
  component: ShareLinks
}

/**
 * Exports the base story.
 */
export const Base = createTemplate(ShareLinks)
