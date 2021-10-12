<template>
  <section class="image-banner" :class="{ 'image-banner--contain': contain }">
    <div class="image-banner__container">
      <component :is="wrapperElement" :href="link">
        <responsive-image
          v-if="image"
          class="image-banner__image"
          :src="image.asset.url"
          :alt="altText"
        />
      </component>
    </div>
  </section>
</template>

<script>
import AppLink from '~/components/AppLink'
import ResponsiveImage from '~/components/ResponsiveImage'

export default {
  components: {
    AppLink,
    ResponsiveImage
  },

  props: {
    image: {
      type: Object,
      default: null
    },

    altText: {
      type: String,
      default: ''
    },

    contain: {
      type: Boolean,
      default: false
    },

    link: {
      type: String,
      default: ''
    }
  },

  computed: {
    /**
     * Returns the element for the wrapper.
     * @returns {string} - The element name.
     */
    wrapperElement() {
      return this.link ? 'app-link' : 'div'
    }
  }
}
</script>

<style lang="scss">
.image-banner {
  $parent: &;
  overflow: hidden;
  width: 100%;

  &__container {
    height: 200px;
  }

  &__image {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }

  &#{&}--contain {
    #{$parent}__container {
      @include container;
    }
  }

  @include mq($from: large) {
    &__container {
      height: 427px;
    }
  }
}
</style>
