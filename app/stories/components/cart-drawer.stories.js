/**
 * @file Defines the story for the Cart Drawer.
 */

import { createTemplate, products, parameterPresets } from '~/helpers/storybook'

import CartDrawer from '~/components/CartDrawer'

export default {
  title: 'Components/Cart Drawer',
  component: CartDrawer,

  parameters: {
    ...parameterPresets.overlay
  }
}

/**
 * Exports the base story with example line items.
 */
export const Base = createTemplate(CartDrawer, {
  forceOpen: true,
  items: [products.default, ...products.supporting],
  subtotal: 124.97
})

/**
 * Exports the empty items story.
 */
export const Empty = createTemplate(CartDrawer, {
  forceOpen: true
})
