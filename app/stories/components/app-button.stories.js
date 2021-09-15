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
export const Primary = createTemplate(Btn, {
  label: 'Button label'
})

/**
 * Exports the secondary template story.
 * @returns {object} - The story object.
 */
export const Secondary = createTemplate(Btn, {
  label: 'Button label',
  buttonStyle: 'secondary'
})

/**
 * Exports the outlined template story.
 * @returns {object} - The story object.
 */
export const Outlined = createTemplate(Btn, {
  label: 'Button label',
  buttonStyle: 'outlined'
})

/**
 * Exports the light template story.
 * @returns {object} - The story object.
 */
export const Light = createTemplate(Btn, {
  label: 'Button label',
  buttonStyle: 'light'
})
