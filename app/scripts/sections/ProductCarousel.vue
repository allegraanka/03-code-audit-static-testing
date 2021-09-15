<template>
  <section class="product-carousel">
    <div class="container">
      <div class="row">
        <div class="col xs12">
          <div class="product-carousel__carousel">
            <product-card
              v-for="(product, index) in items"
              :key="index"
              :product="product"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProductCard from '~/components/ProductCard'

export default {
  components: {
    ProductCard
  },

  props: {
    products: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      items: []
    }
  },

  fetch() {
    this.fetchProducts()
  },

  methods: {
    /**
     * Requests and sets the product data.
     */
    fetchProducts() {
      this.$nacelle.client.data
        .products({ handles: this.products })
        .then((response) => (this.items = response))
        .catch((error) => void error)
    }
  }
}
</script>

<style lang="scss">
.product-carousel {
  &__carousel {
    display: grid;
    gap: $SPACING_5XL;
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
