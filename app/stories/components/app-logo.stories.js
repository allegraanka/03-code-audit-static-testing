/**
 * @file Defines stories for the logo component.
 */

import { createTemplate } from '~/helpers/storybook'

import AppLogo from '~/components/AppLogo'

export default {
  title: 'Components/App Logo',
  component: AppLogo
}

/**
 * Returns the Base instance.
 * @returns {object} - The base instance.
 */
export const Base = createTemplate(AppLogo)
