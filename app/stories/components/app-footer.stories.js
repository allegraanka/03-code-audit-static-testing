/**
 * @file Defines stories for the footer component.
 */

import { createTemplate } from '~/helpers/storybook'

import AppFooter from '~/components/AppFooter'

export default {
  title: 'App Footer',
  component: AppFooter
}

/**
 * Returns the Base instance.
 * @returns {object} - The base instance.
 */
export const Base = createTemplate(AppFooter)
