<template>
  <section class="image-with-text">
    <responsive-image v-if="image" :src="image.asset.url" />
  </section>
</template>

<script>
import ResponsiveImage from '~/components/ResponsiveImage'

export default {
  components: {
    ResponsiveImage
  },

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

<style lang="scss">
.image-with-text {
  .responsive-image {
    width: 100%;
  }
}
</style>
