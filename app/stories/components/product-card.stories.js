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
      product: {
        title: 'My Product',
        handle: 'my-product'
      }
    }
  },

  template: `
    <product-card :product="product" />
  `
})
