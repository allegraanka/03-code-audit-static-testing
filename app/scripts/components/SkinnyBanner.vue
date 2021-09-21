<template>
  <div class="skinny-banner lazyload" :data-bg="imageSource">
    <div class="skinny-banner__content">
      <h5 v-if="title" class="skinny-banner__title">{{ title }}</h5>
      <p v-if="subtitle" class="skinny-banner__subtitle">{{ subtitle }}</p>
    </div>

    <div class="skinny-banner__actions">
      <app-button
        v-if="button && button.label"
        :label="button.label"
        :url="button.link"
        :variant="button.variant || 'light'"
      />
    </div>
  </div>
</template>

<script>
import AppButton from '~/components/AppButton'

export default {
  components: {
    AppButton
  },

  props: {
    imageSource: {
      type: String,
      default: null
    },

    title: {
      type: String,
      default: null
    },

    subtitle: {
      type: String,
      default: null
    },

    button: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss">
.skinny-banner {
  background-position: center;
  background-size: cover;
  color: $COLOR_TEXT_INVERSE;
  display: flex;
  gap: $SPACING_M;
  padding: $SPACING_L $SPACING_XL;
  position: relative;
  width: 100%;
  z-index: 0;

  &__title {
    margin: 0 0 $SPACING_3XS;
  }

  &__subtitle {
    margin: 0;
  }

  &__actions {
    margin-left: auto;
  }

  &::before {
    background-color: rgba($COLOR_BACKGROUND_DARK, 0.3);
    content: '';
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
  }
}
</style>
