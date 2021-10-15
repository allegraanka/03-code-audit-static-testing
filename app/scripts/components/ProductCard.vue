<template>
  <nuxt-link :to="productUrl" class="product-card">
    <responsive-image
      v-if="thumbnailSrc"
      class="product-card__thumbnail"
      :alt="title"
      :src="thumbnailSrc"
      source="shopify"
    />

    <p v-if="vendor" class="product-card__vendor body-2">
      {{ vendor }}
    </p>

    <p class="product-card__title">{{ title }}</p>

    <div class="product-card__price">
      <product-price
        :price="price"
        :compare-at="compareAt"
        :rrp="rrp"
        tertiary
      />
    </div>
  </nuxt-link>
</template>

<script>
import ResponsiveImage from '~/components/ResponsiveImage'
import ProductPrice from '~/components/ProductPrice'

export default {
  components: {
    ResponsiveImage,
    ProductPrice
  },

  props: {
    title: {
      type: String,
      required: true
    },

    handle: {
      type: String,
      required: true
    },

    vendor: {
      type: String,
      default: ''
    },

    price: {
      type: Number,
      default: 0
    },

    compareAt: {
      type: Number,
      default: null
    },

    rrp: {
      type: Number,
      default: null
    },

    thumbnailSrc: {
      type: String,
      default: ''
    }
  },

  computed: {
    /**
     * Returns the URL for the product.
     * @returns {string} - The product path.
     */
    productUrl() {
      return `/products/${this.handle}`
    }
  }
}
</script>

<style lang="scss">
.product-card {
  text-decoration: none;
}
</style>
