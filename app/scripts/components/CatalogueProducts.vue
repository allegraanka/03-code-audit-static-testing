<template>
  <div v-if="items.length > 0" class="catalogue-products">
    <div class="container">
      <h3 v-if="title" class="catalogue-products__title">
        {{ title }}
      </h3>

      <div class="catalogue-products__grid">
        <nuxt-link
          v-for="(product, index) in items"
          :key="index"
          class="catalogue-products__item"
          :to="`/products/${product.handle}`"
        >
          <responsive-image
            v-if="product.featuredMedia.thumbnailSrc"
            class="catalogue-products__image"
            :max-width="96"
            :alt="product.title"
            :src="product.featuredMedia.thumbnailSrc"
          />

          <div class="catalogue-products__details">
            <p class="catalogue-products__subtitle subtitle-1">
              {{ product.title }}
            </p>

            <p class="catalogue-products__price body-1">
              <template v-if="getCompareAtPrice(product)">
                <s>{{ getCompareAtPrice(product) }}</s>
              </template>

              {{ getPrice(product) }}
            </p>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { formatPrice } from '~/helpers/utils'

import ResponsiveImage from '~/components/ResponsiveImage'

export default {
  components: {
    ResponsiveImage
  },

  props: {
    products: {
      type: Array,
      default: () => []
    },

    title: {
      type: String,
      default: ''
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

  watch: {
    /**
     * Update product data when prop changes.
     */
    products() {
      this.fetchProducts()
    }
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
    },

    /**
     * Gets product price.
     * @param {object} product - Shopify product.
     * @returns {string} - Formatted price.
     */
    getPrice(product) {
      return formatPrice(product.priceRange.min)
    },

    /**
     * Gets product compare at price.
     * @param {object} product - Shopify product.
     * @returns {string} - Formatted price.
     */
    getCompareAtPrice(product) {
      const price = Math.min(
        ...product.variants.map(({ compareAtPrice }) => Number(compareAtPrice))
      )

      if (!price || price <= 0) {
        return null
      }

      return formatPrice(price)
    }
  }
}
</script>

<style lang="scss">
.catalogue-products {
  background-color: $COLOR_BACKGROUND_MID;
  border-radius: 24px 24px 0 0;
  margin-top: $SPACING_2XL;
  padding: $SPACING_2XL 0;

  &__title {
    margin-bottom: $SPACING_XL;
    margin-top: 0;
    text-align: center;
  }

  &__item {
    color: $COLOR_TEXT_PRIMARY;
    display: grid;
    grid-gap: $SPACING_L;
    grid-template-columns: 76px 1fr;
    text-decoration: none;

    &:not(:last-child) {
      padding-bottom: $SPACING_L;
    }
  }

  &__image {
    height: auto;
  }

  &__details {
    display: flex;
    flex-flow: column;
    justify-content: center;
  }

  &__subtitle {
    margin-bottom: $SPACING_2XS;
  }

  &__price {
    color: $COLOR_TEXT_SECONDARY;
  }

  @include mq($from: large) {
    margin-top: $SPACING_3XL + $SPACING_XS;
    padding: $SPACING_3XL + $SPACING_XS 0;

    &__title {
      margin-bottom: $SPACING_3XL;
    }

    &__grid {
      display: grid;
      grid-gap: $SPACING_L;
      grid-template-columns: repeat(4, 1fr);
    }

    &__item {
      grid-template-columns: 96px 1fr;

      &:not(:last-child) {
        padding-bottom: 0;
      }
    }
  }
}
</style>
