<template>
  <div class="template-collection">
    <div class="template-collection__hero">
      <h1 class="template-collection__title">
        {{ collection.title }}
      </h1>

      <p v-if="collection.description">
        {{ collection.description }}
      </p>
    </div>

    <div class="container">
      <div class="row">
        <div class="col xs12">
          <div class="template-collection__grid">
            <product-card
              v-for="(product, index) in collection.products.items"
              :key="index"
              :title="getProductData(product).title"
              :handle="product.handle"
              :vendor="product.vendor"
              :thumbnail-src="product.featuredMedia.src"
              :price="getProductData(product).pricing.price"
              :compare-at="getProductData(product).pricing.compareAt"
              :rrp="getProductData(product).pricing.rrp"
              :swatches="getProductData(product).swatches || []"
              :badges="getProductData(product).badges"
            />
          </div>

          <div class="template-collection__footer">
            <app-button
              v-if="hasMorePages"
              :disabled="pagination.loading"
              :label="loadMoreLabel"
              @click.native="handleLoadMoreEvent"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHead } from '~/helpers/metadata'

import AppButton from '~/components/AppButton'
import ProductCard from '~/components/ProductCard'

import {
  getProductSwatches,
  getProductBadges,
  getProductTitle,
  getProductPricing
} from '~/helpers/product'

export default {
  components: {
    AppButton,
    ProductCard
  },

  async asyncData({ app, error, params }) {
    const collection = await app.$nacelle
      .collectionByHandle(params.handle)
      .catch(() => {
        error({
          statusCode: 404,
          message: 'Collection not found'
        })
      })

    return {
      collection
    }
  },

  data() {
    return {
      pagination: {
        current: 1,
        loading: false
      }
    }
  },

  head() {
    return getHead({
      title: this.collection.title,
      description: this.collection.description
    })
  },

  computed: {
    /**
     * Returns if there are more pages.
     * @returns {boolean} - If more pages exist.
     */
    hasMorePages() {
      return this.pagination.current < this.collection.products.pages
    },

    /**
     * Returns the label of the load more button.
     * @returns {string} - The current label.
     */
    loadMoreLabel() {
      return this.pagination.loading
        ? this.$t('pagination.loading')
        : this.$t('pagination.loadMore')
    }
  },

  methods: {
    /**
     * Loads additional products into the page.
     * - Injects new products and updates pagination object.
     */
    handleLoadMoreEvent() {
      this.pagination.loading = true

      if (!this.hasMorePages) {
        return
      }

      this.$nacelle
        .collectionProductsByHandle(
          this.$route.params.handle,
          this.pagination.current + 1
        )
        .then((response) => {
          if (response.length) {
            this.collection.products.items.push(...response)
          }

          this.pagination.current += 1
          this.pagination.loading = false
        })
    },

    /**
     * Returns the transformed product data.
     *
     * @param {object} product - The product object.
     * @returns {object} - The product data.
     */
    getProductData(product) {
      return {
        title: getProductTitle(product, this),
        pricing: getProductPricing(product, this),
        swatches: getProductSwatches(product),
        badges: getProductBadges(product)
      }
    }
  }
}
</script>

<style lang="scss">
.template-collection {
  &__hero {
    padding: $LAYOUT_XL;
    text-align: center;
  }

  &__title {
    margin: 0;
  }

  &__grid {
    display: grid;
    gap: $SPACING_XL;
    grid-template-columns: repeat(2, 1fr);
  }

  &__footer {
    display: flex;
    justify-content: center;
    margin-top: $LAYOUT_XL;
    width: 100%;
  }

  @include mq($from: large) {
    &__grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
