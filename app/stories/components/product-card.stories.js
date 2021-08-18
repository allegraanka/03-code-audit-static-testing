/**
 * @file Defines stories for the product card component.
 */

import { decorators, injectProduct } from '~/helpers/storybook'

import ProductCard from '~/components/ProductCard'

export default {
  title: 'Product Card',
  component: ProductCard,
  decorators: [decorators.card]
}

/**
 * Returns the Base instance.
 * @returns {object} - The base instance.
 */
export const Base = () => ({
  ...injectProduct(),

  components: {
    ProductCard
  },

  template: `
    <product-card
      v-if="product"
      :product="product"
    />
  `
})
