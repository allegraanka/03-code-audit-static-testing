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
              :product="product"
            />
          </div>

          <button
            v-if="hasMorePages"
            @click="handleLoadMoreEvent"
            v-text="loadMoreLabel"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHead } from '~/helpers/metadata'

import ProductCard from '~/components/ProductCard'

export default {
  components: {
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
      return this.pagination.loading ? 'Loading' : 'Load more'
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
    }
  }
}
</script>

<style lang="scss">
.template-collection {
  &__hero {
    padding: $LAYOUT_S;
    text-align: center;
  }

  &__title {
    margin: 0;
  }

  &__grid {
    display: grid;
    gap: $SPACING_XL;
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
