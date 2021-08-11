/**
 * @file Defines stories for the header component.
 */

import { createTemplate } from '~/helpers/storybook'

import AppHeader from '~/components/AppHeader'

export default {
  title: 'Components/App Header',
  component: AppHeader
}

/**
 * Returns the Base instance.
 * @returns {object} - The base instance.
 */
export const Base = createTemplate(AppHeader)
