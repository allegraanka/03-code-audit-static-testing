<template>
  <section class="image-banner" />
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      default: null
    },

    contain: {
      type: Boolean,
      default: false
    },

    link: {
      type: String,
      default: null
    }
  }
}
</script>
