<template>
  <section class="product-carousel">
    <ul>
      <li v-for="(product, index) in products" :key="`product-${index}`">
        {{ product.current }}
      </li>
    </ul>
  </section>
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
