<template>
  <div class="template-product">
    {{ product.title }}
  </div>
</template>

<script>
import { productByHandle } from '~/helpers/data-fetching'

export default {
  async asyncData(context) {
    this.test = ''

    return {
      product:
        await productByHandle(context)
    }
  }
}
</script>
