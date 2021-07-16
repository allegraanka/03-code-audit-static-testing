<template>
  <div class="template-collection">
    {{ collection.title }}

    <ul>
      <li
        v-for="(product, index) in collection.allProducts"
        :key="index"
      >
        <nuxt-link :to="`/products/${product.handle}`">
          {{ product.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { collectionByHandle } from '~/helpers/data-fetching'

export default {
  async asyncData(context) {
    return {
      collection:
        await collectionByHandle(context)
    }
  }
}
</script>
