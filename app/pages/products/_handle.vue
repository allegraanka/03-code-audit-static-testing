<template>
  <div class="template-product">
    {{ product.title }}

    <button @click="handleAddToCart">
      Add to cart
    </button>

    <select v-model="selectedVariant">
      <option
        v-for="(variant, variantIndex) in product.variants"
        :key="`variant-${variant.id}-${variantIndex}`"
        :value="variant.id"
      >
        {{ variant.title }}
      </option>
    </select>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  async asyncData({ app, error, params }) {
    const product = await app.$nacelle.productByHandle(
      params.handle
    )

    if (!product) {
      return error({
        statusCode: 404,
        message: 'Product not found'
      })
    }

    return {
      product
    }
  },

  data() {
    return {
      selectedVariant: false
    }
  },

  methods: {

    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      addItemToCart: 'cart/addItem'
    }),

    /**
     * Handles the add to cart event.
     */
    handleAddToCart() {
      if (!this.selectedVariant) {
        alert('Please select a variant')
        return
      }

      this.addItemToCart({
        variant: this.selectedVariant
      })
    }
  }
}
</script>
