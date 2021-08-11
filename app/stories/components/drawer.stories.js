/**
 * @file Defines the stories for the re-usable drawer.
 */

import { createTemplate } from '~/helpers/storybook'

import Drawer from '~/components/Drawer'

export default {
  title: 'Components/Drawer',
  component: Drawer
}

/**
 * Returns the Base instance.
 * @returns {object} - The base instance.
 */
export const Base = createTemplate(Drawer)
