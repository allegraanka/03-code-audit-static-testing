<template>
  <img
    class="responsive-image blur-up lazyload"
    :alt="alt"
    :src="baseSrc"
    :data-src="templateSrc"
    :style="styles"
    data-sizes="auto"
    :data-widths="imageWidths"
  />
</template>

<script>
import { getSizedImageUrl } from '@shopify/theme-images'

export default {
  props: {
    alt: {
      type: String,
      default: null
    },

    src: {
      type: String,
      required: true
    },

    source: {
      type: String,
      default: null
    },

    maxHeight: {
      type: Number,
      default: null
    },

    maxWidth: {
      type: Number,
      default: null
    }
  },

  data() {
    return {
      widths: [
        180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 1944, 2160, 2376, 2592,
        2808, 3024
      ]
    }
  },

  computed: {
    /**
     * Filters pre-defined widths for use in the image tag.
     * @returns {string} - The widths for use in HTML.
     */
    imageWidths() {
      return JSON.stringify(
        this.widths.filter((size) => {
          if (this.maxWidth) {
            return size <= this.maxWidth
          }

          return true
        })
      )
    },

    /**
     * Returns the base source as a fallback.
     * @returns {string} - The source.
     */
    baseSrc() {
      return this.getSizedSrc(
        this.maxWidth && this.maxWidth < 100 ? this.maxWidth : 100
      )
    },

    /**
     * Returns the responsive source.
     * @returns {string} - The source.
     */
    templateSrc() {
      return this.getSizedSrc('{width}')
    },

    /**
     * Returns the inline image styles.
     * @returns {object} - The styles.
     */
    styles() {
      return {
        maxHeight: this.maxHeight && `${this.maxHeight}px`,
        maxWidth: this.maxWidth && `${this.maxWidth}px`
      }
    }
  },

  watch: {
    /**
     * Watches for changes to the source and re-unveils.
     *
     * @param {string} value - The new value.
     * @param {string} previous - The previous value.
     */
    src(value, previous) {
      if (value !== previous) {
        window.lazySizes.loader.unveil(this.$refs.image)
      }
    }
  },

  methods: {
    /**
     * Returns a sized version of the source.
     *
     * @param {number|string} width - The image width.
     * @param {number|string} height - The image height.
     * @returns {string} - The transformed source.
     */
    getSizedSrc(width, height) {
      return this.source === 'shopify'
        ? this.getShopifySizedImage(width, height)
        : this.getBaseSizedImage(width, height)
    },

    /**
     * Returns a sized version of the source for Shopify images.
     *
     * @param {number|string} width - The image width.
     * @param {number|string} height - The image height.
     * @returns {string} - The transformed source.
     */
    getShopifySizedImage(width, height) {
      const dimensions = [
        ...(width ? [width] : []),
        ...(height ? [height] : [])
      ]

      return getSizedImageUrl(
        this.src,
        `${
          dimensions.length <= 1
            ? `${dimensions.join('')}x`
            : dimensions.join('x')
        }`
      )
    },

    /**
     * Returns the base version of the image, sized.
     *
     * @param {number|string} width - The image width.
     * @param {number|string} height - The image height.
     * @returns {string} - The transformed source.
     */
    getBaseSizedImage(width, height) {
      const url = new URL(this.src)

      if (width) {
        url.searchParams.set('w', width)
      }

      if (height) {
        url.searchParams.set('h', height)
      }

      return decodeURIComponent(url.href)
    }
  }
}
</script>

<style lang="scss">
.responsive-image {
  color: transparent;
  filter: blur(0);
  height: 100%;
  transition: filter $TIMING_BASE;
  width: 100%;

  &:not(.lazyloaded) {
    filter: blur(10px);
  }
}
</style>
