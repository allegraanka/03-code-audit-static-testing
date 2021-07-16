<template>
  <div class="template-collection">
    <div class="template-collection__hero">
      <h1 class="template-collection__title">{{ collection.title }}</h1>

      <p v-if="collection.description">
        {{ collection.description }}
      </p>
    </div>

    <div class="container">
      <div class="row">
        <div class="col xs12">
          <div class="template-collection__grid">
            <product-card
              v-for="(product, index) in collection.allProducts"
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

import { collectionByHandle } from '~/helpers/data-fetching'

export default {
  components: {
    ProductCard
  },

  async asyncData(context) {
    return {
      collection:
        await collectionByHandle(context)
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
