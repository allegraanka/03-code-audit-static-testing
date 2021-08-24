/**
 * @file Defines the global button component stories.
 */

import { createTemplate, decorators } from '~/helpers/storybook'

import Btn from '~/components/AppButton'

export default {
  title: 'Components/App Button',
  component: Btn,
  decorators: [decorators.card]
}

/**
 * Exports the base template story.
 * @returns {object} - The story object.
 */
export const Base = createTemplate(Btn, {
  label: 'Button label'
})

/**
 * Exports the button as a link.
 * @returns {object} - The link story.
 */
export const AsLink = createTemplate(Btn, {
  label: 'Button label',
  url: '/'
})
