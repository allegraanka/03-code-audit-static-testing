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
    link: {
      type: String,
      default: null
    }
  }
}
</script>
