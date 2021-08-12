/**
 * @file Defines stories for the logo component.
 */

import { decorators, createTemplate } from '~/helpers/storybook'

import AppLogo from '~/components/AppLogo'

export default {
  title: 'App Logo',
  component: AppLogo,

  decorators: [
    decorators.card
  ]
}

/**
 * Returns the Base instance.
 * @returns {object} - The base instance.
 */
export const Base = createTemplate(AppLogo)
