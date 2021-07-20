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
      collection
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
