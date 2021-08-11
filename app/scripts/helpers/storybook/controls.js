/**
 * @file Defines helpers for story controls.
 */

import { transform } from '~/helpers/utils'

/**
 * Creates a consistent template that can be used across sub-stories.
 * - Pass arguments to set prop defaults.
 * 
 * @param {object} component - The component to use.
 * @param {object} args - The default arguments to pass.
 * @returns {Function} - The template function.
 */
export const createTemplate = (component, args) => {
  const { displayName } = component.__docgenInfo

  const template = (_args, { argTypes }) => ({
    components: {
      [displayName]: component
    },

    props: Object.keys(argTypes),

    template: `
      <${transform(component.__docgenInfo.displayName)} v-bind="$props" />
    `
  })

  template.args = {
    ...args
  }

  return template
}
