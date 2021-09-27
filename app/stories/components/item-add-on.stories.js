/**
 * @file A checkbox for adding an item to the product.
 */

import ItemAddOn from '~/components/ItemAddOn'

import { createTemplate } from '~/helpers/storybook'

export default {
  title: 'Components/Item Add On',
  component: ItemAddOn
}

/**
 * Exports the base component
 */
export const Base = createTemplate(ItemAddOn)
