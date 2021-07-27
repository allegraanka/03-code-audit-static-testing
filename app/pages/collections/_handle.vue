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
              v-for="(product, index) in collection.products"
              :key="index"
              :product="product"
            />

            <button
              v-if="currentPage < collection.pages"
              @click="fetchPaginatedProducts"
            >
              Load more
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '~/components/ProductCard'

export default {
  components: {
    ProductCard
  },

  async asyncData({ app, error, params }) {
    const collection = await app.$nacelle.collectionByHandle(
      params.handle
    )

    if (!collection) {
      return error({
        statusCode: 404,
        message: 'Collection not found'
      })
    }

    return {
      collection,
      currentPage: collection.initialPage
    }
  },

  methods: {

    /**
     * Fetches the next page of products.
     * - Appends to the current product array.
     */
    async fetchPaginatedProducts() {
      const handle = this.$route.params.handle
      const page = this.currentPage + 1
      const products = await this.$nacelle.collectionProducts(handle, page)

      if (products) {
        this.collection.products.push(...products)
        this.currentPage = this.currentPage + 1
      }
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
