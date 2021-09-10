<template>
  <div class="template-product">
    <div class="container">
      <div class="row">
        <div class="col xs12 l6">
          <img :src="product.featuredMedia.src" :alt="product.title" />
        </div>

        <div class="col xs12 l6">
          <product-form :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductForm from '~/components/ProductForm'

import { getHead } from '~/helpers/metadata'

export default {
  components: {
    ProductForm
  },

  async asyncData({ app, error, params }) {
    const product = await app.$nacelle
      .productByHandle(params.handle)
      .catch(() => {
        error({
          statusCode: 404,
          message: 'Product not found'
        })
      })

    return {
      product
    }
  },

  head() {
    return getHead({
      title: this.product.title,
      description: this.product.description
    })
  }
}
</script>
