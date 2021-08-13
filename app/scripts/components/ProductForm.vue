<template>
  <div class="product-form">
    <h1>{{ product.title }}</h1>

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
  props: {
    product: {
      type: Object,
      default: () => ({}),
      required: true
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
        variant: this.selectedVariant,
        handle: this.product.handle,
        product: this.product
      })
    }
  }
}
</script>
