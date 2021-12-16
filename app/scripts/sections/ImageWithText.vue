<template>
  <section class="image-with-text" :class="classes">
    <component
      :is="wrapperElement"
      class="image-with-text__image-wrapper"
      :href="imageLink"
    >
      <responsive-image
        v-if="image && image.asset"
        class="image-with-text__image"
        :src="image.asset.url"
        :alt="altText"
      />
    </component>

    <div class="image-with-text__content">
      <h2 v-if="title" class="image-with-text__title">
        {{ title }}
      </h2>

      <p v-if="body">
        {{ body }}
      </p>

      <div v-if="callToAction">
        <app-button
          :label="callToAction.label"
          :url="callToAction.link"
          :class="'image-with-text__button'"
          :variant="callToAction.style === 'outlined' ? 'outlined' : 'light'"
        />
      </div>
    </div>
  </section>
</template>

<script>
import AppButton from '~/components/AppButton'
import AppLink from '~/components/AppLink'
import ResponsiveImage from '~/components/ResponsiveImage'

export default {
  components: {
    AppLink,
    ResponsiveImage,
    AppButton
  },

  props: {
    title: {
      type: String,
      default: ''
    },

    body: {
      type: String,
      default: ''
    },

    callToAction: {
      type: Object,
      default: null
    },

    image: {
      type: Object,
      default: null
    },

    altText: {
      type: String,
      default: ''
    },

    imageLink: {
      type: String,
      default: ''
    },

    styles: {
      type: Object,
      default: null
    }
  },

  computed: {
    /**
     * Returns the dynamic classes.
     * @returns {object} - The class object.
     */
    classes() {
      if (!this.styles) {
        return {}
      }

      return {
        'image-with-text--dark': this.styles.backgroundColor === 'dark',
        'image-with-text--light': this.styles.backgroundColor === 'light',
        'image-with-text--white': this.styles.backgroundColor === 'white',
        'image-with-text--text-dark': this.styles.textColor === 'dark',
        'image-with-text--text-center': this.styles.textAlignment === 'center'
      }
    },

    /**
     * Returns the element for the wrapper.
     * @returns {string} - The element name.
     */
    wrapperElement() {
      return this.imageLink ? 'app-link' : 'div'
    }
  }
}
</script>

<style lang="scss">
.image-with-text {
  background-color: $COLOR_PRIMARY;
  color: $COLOR_TEXT_INVERSE;

  &__image-wrapper {
    display: flex;
  }

  &__image {
    min-height: 200px;
    object-fit: cover;
  }

  &__content {
    padding: $SPACING_XL $SPACING_XL $SPACING_2XL;
  }

  &__title {
    margin-top: 0;
  }

  &__button {
    display: inline-flex;
  }

  &#{&}--dark {
    background-color: $COLOR_BACKGROUND_DARK;
  }

  &#{&}--light {
    background-color: $COLOR_BACKGROUND_LIGHT;
  }

  &#{&}--white {
    background-color: $COLOR_BACKGROUND_WHITE;
  }

  &#{&}--text-dark {
    color: $COLOR_TEXT_PRIMARY;
  }

  &#{&}--text-center {
    text-align: center;
  }

  @include mq($from: large) {
    padding: $LAYOUT_L $LAYOUT_S + $SPACING_XS;

    &__image {
      min-height: auto;
    }

    &__content {
      padding-bottom: 0;
    }
  }
}
</style>
