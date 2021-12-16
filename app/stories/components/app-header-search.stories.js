/**
 * @file A search input field used in the header.
 */

import AppHeaderSearch from '~/components/AppHeaderSearch'

import { createTemplate, decorators } from '~/helpers/storybook'

export default {
  title: 'Components/App Header Search',
  component: AppHeaderSearch,
  decorators: [decorators.card],

  parameters: {
    layout: 'fullscreen'
  }
}

/**
 * The base version of the search component.
 */
export const Base = createTemplate(AppHeaderSearch)
