/**
 * @file Defines stories for the product card component.
 */

import ProductCard from '~/components/ProductCard'

export default {
  title: 'Components/Product Card'
}

export const base = () => ({
  components: {
    ProductCard
  },

  data() {
    return {
      product: null
    }
  },

  async fetch() {
    const product = await this.$root.context.$nacelle.productByHandle(
      'corsham-chelsea-boot-corsham-26268'
    )

    if (product) {
      this.product = product
    }
  },

  template: `
    <product-card v-if="product" :product="product" />
  `
})
