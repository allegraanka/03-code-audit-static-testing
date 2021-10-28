/**
 * @file Defines the stories for the re-usable drawer.
 */

import { createTemplate, parameterPresets } from '~/helpers/storybook'

import Drawer from '~/components/Drawer'

export default {
  title: 'Components/Drawer',
  component: Drawer,

  parameters: {
    ...parameterPresets.overlay
  }
}

/**
 * Returns the Base instance.
 * @returns {object} - The base instance.
 */
export const Base = createTemplate(Drawer, {
  forceOpen: true
})

/**
 * Returns a drawer with content.
 * @returns {object} - The content drawer.
 */
export const WithContent = () => ({
  components: {
    Drawer
  },

  template: `
    <drawer force-open>
      <template #body>
        <div style="padding: 24px;">
          Drawer content
        </div>
      </template>
    </drawer>
  `
})

/**
 * Returns the Base instance.
 * @returns {object} - The base instance.
 */
export const AsModal = createTemplate(Drawer, {
  forceOpen: true,
  asModal: true
})
