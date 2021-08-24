/**
 * @file Defines the global button component stories.
 */

import { decorators } from '~/helpers/storybook'

import Btn from '~/components/Button'

export default {
  title: 'Components/Button',
  component: Btn,
  decorators: [decorators.card]
}

/**
 * Exports the base template story.
 * @returns {object} - The story object.
 */
export const Base = () => ({
  components: {
    Btn
  },

  template: `
    <btn>Button label</btn>
  `
})

/**
 * Exports the button as a link.
 * @returns {object} - The link story.
 */
export const AsLink = () => ({
  components: {
    Btn
  },

  template: `
    <btn to="/">Button label</btn>
  `
})
