<template>
  <picture v-if="responsive" class="responsive-image">
    <source type="image/webp" :data-srcset="getSourceSet('webp')" />
    <source type="image/jpeg" :data-srcset="getSourceSet('jpg')" />

    <img
      :alt="alt"
      :data-src="`${src}?h=3&w=3`"
      class="responsive-image__image"
      :class="!manual ? 'lazyload' : ''"
    />
  </picture>

  <img
    v-else
    :data-src="src"
    :alt="alt"
    class="responsive-image__image"
    :class="!manual ? 'lazyload' : ''"
  />
</template>

<script>
export default {
  props: {
    alt: {
      type: String,
      default: ''
    },

    src: {
      type: String,
      default: ''
    },

    responsive: {
      type: Boolean,
      default: false
    },

    manual: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      sizes: [320, 576, 768, 1024, 1328, 2200]
    }
  },

  methods: {
    /**
     * Generates and returns the srcset value.
     *
     * @param {string} format - The image format.
     * @returns {string} - The source set string.
     */
    getSourceSet(format = 'jpg') {
      const values = []

      this.sizes.forEach((size, index) => {
        const width = index < this.sizes.length / 2 ? size : size

        if (!this.maxWidth || width <= this.maxWidth) {
          values.push(`${this.src}?w=${width}&fm=${format} ${size}w`)
        }
      })

      return values.join(',\n')
    }
  }
}
</script>

<style lang="scss">
.responsive-image {
  &__image {
    opacity: 1;
    transition: opacity 0.3s ease;

    &:not(.lazyloaded) {
      opacity: 0;
    }
  }
}
</style>
