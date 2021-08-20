/**
 * @file Defines the story for the product form.
 */

import { injectProduct } from '~/helpers/storybook'

import ProductForm from '~/components/ProductForm'

export default {
  title: 'Product Form',
  component: ProductForm
}

/**
 * Exports the base story.
 * @returns {object} - The base story.
 */
export const Base = () => ({
  ...injectProduct(),

  components: {
    ProductForm
  },

  template: `
    <product-form v-if="product" :product="product" />
  `
})
