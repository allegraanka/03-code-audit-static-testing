<template>
  <nuxt-link :to="productUrl" class="product-card">
    <div class="product-card__thumbnail">
      <responsive-image
        v-if="thumbnailSrc"
        :alt="title"
        :src="thumbnailSrc"
        source="shopify"
      />
    </div>

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
  display: inline-block;
  text-decoration: none;

  &__thumbnail {
    border: 1px solid $COLOR_BORDER_LIGHT;
    margin-bottom: $SPACING_S;
    overflow: hidden;
    padding-top: 100%;
    position: relative;

    .responsive-image {
      left: 50%;
      object-fit: cover;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
    }
  }

  &__title {
    color: $COLOR_TEXT_PRIMARY;
    font-family: $FONT_DISPLAY;
    margin: 0;
  }

  &__vendor,
  &__vendor.body-2 {
    color: $COLOR_TEXT_LIGHT;
    margin-bottom: $SPACING_3XS;
  }

  &__price {
    margin-top: $SPACING_XS;
  }
}
</style>
