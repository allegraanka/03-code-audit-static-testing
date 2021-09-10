<template>
  <section class="image-with-text" />
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
    image: {
      type: Object,
      default: null
    },
    imageLink: {
      type: String,
      default: null
    }
  }
}
</script>
