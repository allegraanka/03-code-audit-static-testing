/**
 * @file Defines stories for the header component.
 */

import { createTemplate } from '~/helpers/storybook'

import AppHeader from '~/components/AppHeader'

export default {
  title: 'App Header',
  component: AppHeader,

  parameters: {
    layout: 'fullscreen'
  }
}

/**
 * Returns the Base instance.
 * @returns {object} - The base instance.
 */
export const Base = createTemplate(AppHeader)
