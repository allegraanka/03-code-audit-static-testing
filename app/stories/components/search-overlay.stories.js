/**
 * @file A search input field used in the header.
 */

import SearchOverlay from '~/components/SearchOverlay'

import { createTemplate } from '~/helpers/storybook'

export default {
  title: 'Components/Search Overlay',
  component: SearchOverlay,

  parameters: {
    layout: 'fullscreen'
  }
}

/**
 * The base version of the search component.
 */
export const Base = createTemplate(SearchOverlay)
