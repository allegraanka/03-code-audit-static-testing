<template>
  <div class="template-product">
    {{ product.title }}
  </div>
</template>

<script>
export default {
  async asyncData({ app, error, params }) {
    const product = await app.$nacelle.productByHandle(
      params.handle
    )

    if (!product) {
      return error({
        statusCode: 404,
        message: 'Product not found'
      })
    }

    return {
      product
    }
  }
}
</script>
