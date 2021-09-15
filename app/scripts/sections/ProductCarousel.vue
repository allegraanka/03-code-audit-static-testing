<template>
  <section class="product-carousel"></section>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      default: () => []
    }
  }
}
</script>
