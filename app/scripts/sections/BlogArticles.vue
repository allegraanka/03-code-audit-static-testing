<template>
  <section class="blog-articles"></section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    body: {
      type: String,
      default: null
    },
    callToAction: {
      type: Object,
      default: null
    },
    articles: {
      type: Array,
      default: () => []
    }
  }
}
</script>
