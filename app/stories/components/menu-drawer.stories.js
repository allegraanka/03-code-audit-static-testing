/**
 * @file Defines the stories for the menu drawer.
 */

import { createTemplate } from '~/helpers/storybook'

import MenuDrawer from '~/components/MenuDrawer'

export default {
  title: 'Components/Menu Drawer',
  component: MenuDrawer
}

/**
 * Exports the base story.
 */
export const Base = createTemplate(MenuDrawer, {
  forceOpen: true
})
