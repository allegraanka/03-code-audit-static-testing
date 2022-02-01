<template>
  <div class="product-card" :class="{ 'product-card--mobile': mobile }">
    <nuxt-link :to="productUrl" class="product-card__thumbnail">
      <div class="product-card__badges">
        <product-badges :badges="badges" small />
      </div>

      <responsive-image
        v-if="thumbnail"
        :alt="productTitle"
        :src="thumbnail"
        source="shopify"
      />
    </nuxt-link>

    <div class="product-card__details">
      <p v-if="vendor" class="product-card__vendor body-2">
        {{ vendor }}
      </p>

      <nuxt-link :to="productUrl" class="product-card__title">
        {{ productTitle }}
      </nuxt-link>

      <div class="product-card__price">
        <product-price
          :price="price"
          :compare-at="compareAt"
          :rrp="rrp"
          tertiary
        />
      </div>

      <div v-if="swatches.length >= 1" class="product-card__swatches">
        <product-card-swatches
          :swatches="swatches"
          @swatch-click="updateThumbnailSource"
        />
      </div>
    </div>

    <div v-if="sku" class="product-card__reviews">
      <product-reviews :sku="sku" />
    </div>
  </div>
</template>

<script>
import ResponsiveImage from '~/components/ResponsiveImage'
import ProductBadges from '~/components/ProductBadges'
import ProductCardSwatches from '~/components/ProductCardSwatches'
import ProductPrice from '~/components/ProductPrice'
import ProductReviews from '~/components/ProductReviews'

export default {
  components: {
    ResponsiveImage,
    ProductBadges,
    ProductCardSwatches,
    ProductPrice,
    ProductReviews
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
    },

    swatches: {
      type: Array,
      default: () => []
    },

    badges: {
      type: Array,
      default: () => []
    },

    sku: {
      type: String,
      default: ''
    },

    mobile: {
      type: Boolean,
      default: false
    },

    meta: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      thumbnail: this.thumbnailSrc
    }
  },

  computed: {
    /**
     * Returns the URL for the product.
     * @returns {string} - The product path.
     */
    productUrl() {
      return `/products/${this.handle}`
    },
    /**
     * Returns product title. Swaps if metafield override present.
     * @returns {string} - The product title.
     */
    productTitle() {
      if (this.meta?.product?.product_title) {
        return this.meta.product.product_title
      } else {
        return this.title
      }
    }
  },

  methods: {
    /**
     * Updates the thumbnail source.
     * @param {string} source - The image source.
     */
    updateThumbnailSource(source) {
      this.thumbnail = source
    }
  }
}
</script>

<style lang="scss">
.product-card {
  $parent: &;
  display: inline-block;
  text-decoration: none;
  width: 100%;

  &__badges {
    position: absolute;
    right: $SPACING_XS;
    top: $SPACING_XS;
    z-index: 2;
  }

  &__thumbnail {
    border: 1px solid $COLOR_BORDER_LIGHT;
    display: block;
    margin-bottom: $SPACING_S;
    overflow: hidden;
    padding-top: 100%;
    position: relative;

    > .responsive-image {
      left: 50%;
      object-fit: cover;
      padding: $SPACING_L;
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
    text-decoration: none;
  }

  &__vendor,
  &__vendor.body-2 {
    color: $COLOR_TEXT_LIGHT;
    margin-bottom: $SPACING_3XS;
  }

  &__price {
    margin-top: $SPACING_XS;
  }

  &__swatches {
    margin-top: $SPACING_S;
    overflow: hidden;
  }

  &__reviews {
    margin-top: $SPACING_XS;
  }

  @include mq($until: large) {
    &#{&}--mobile {
      align-items: flex-start;
      display: flex;

      #{$parent}__thumbnail {
        flex: 0 0 25%;
        margin-bottom: 0;
        padding-top: 0;

        &::before {
          content: '';
          display: block;
          padding-top: 100%;
          width: 100%;
        }

        > .responsive-image {
          padding: 0;
        }
      }

      #{$parent}__details {
        flex-grow: 1;
        padding-left: $SPACING_M;
      }

      #{$parent}__vendor {
        margin-bottom: 0;
      }

      #{$parent}__title {
        display: block;
        font-size: ms(-1);
      }

      #{$parent}__price {
        margin-top: $SPACING_3XS;
      }

      #{$parent}__swatches {
        display: none;
      }
    }
  }

  @include mq($from: large) {
    &__badges {
      right: $SPACING_M;
      top: $SPACING_M;
    }

    &__reviews {
      margin-top: $SPACING_S;
    }
  }
}
</style>
