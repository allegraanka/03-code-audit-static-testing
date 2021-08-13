/**
 * @file Defines the story for the Cart Drawer.
 */

import { createTemplate, products } from '~/helpers/storybook'

import CartDrawer from '~/components/CartDrawer'

export default {
  title: 'Cart Drawer',
  component: CartDrawer
}

/**
 * Exports the base story with example line items.
 */
export const Base = createTemplate(CartDrawer, {
  forceOpen: true,
  items: [
    {
      handle: products.default.handle
    },
    ...products.supporting
  ]
})
