/**
 * @file A checkbox for adding an item to the product.
 */

import ItemAddOn from '~/components/ItemAddOn'

import { createTemplate, decorators } from '~/helpers/storybook'

export default {
  title: 'Components/Item Add On',
  component: ItemAddOn,
  decorators: [decorators.line],

  parameters: {
    layout: 'fullscreen'
  }
}

/**
 * Exports the base component
 */
export const Base = createTemplate(ItemAddOn, {
  label: 'Protect my shoes with IMBOX Shoe Care for £3.99',
  labelAdded: 'IMBOX Shoe Care for £3.99',
  content: 'Content'
})
