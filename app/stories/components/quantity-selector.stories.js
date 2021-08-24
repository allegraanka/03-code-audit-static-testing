/**
 * @file Defines the stories for the quantity selector.
 */

import { createTemplate, decorators } from '~/helpers/storybook'

import QuantitySelector from '~/components/QuantitySelector'

export default {
  title: 'Components/Quantity Selector',
  component: QuantitySelector,
  decorators: [decorators.tiny]
}

/**
 * Exports the base story.
 */
export const Base = createTemplate(QuantitySelector)
