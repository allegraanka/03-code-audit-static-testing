<template>
  <div class="template-product">
    {{ product.title }}
  </div>
</template>

<script>
import { productByHandle } from '~/helpers/data-fetching'

export default {
  async asyncData(context) {
    return {
      product:
        await productByHandle(context)
    }
  }
}
</script>
