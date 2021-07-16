<template>
  <nuxt-link :to="productUrl" class="product-card">
    <img
      v-if="featuredMediaIsImage"
      class="product-card__thumbnail"
      :alt="product.featuredMedia.alt"
      :src="product.featuredMedia.src"
    />

    {{ product.title }}
  </nuxt-link>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },

  computed: {

    /**
     * Returns the URL for the product.
     * @returns {string}
     */
    productUrl() {
      return `/products/${this.product.handle}`
    },

    /**
     * Checks if the product featured media is an image.
     * @returns {boolean}
     */
    featuredMediaIsImage() {
      return this.product.featuredMedia.type === 'image'
    }
  }
}
</script>
