<template functional>
  <div
    class="skinny-banner lazyload"
    :class="{ 'skinny-banner--vert': props.layout === 'vertical' }"
    :data-bg="props.imageSource"
  >
    <div class="skinny-banner__content">
      <h5 v-if="props.title" class="skinny-banner__title">{{ props.title }}</h5>

      <p v-if="props.subtitle" class="skinny-banner__subtitle">
        {{ props.subtitle }}
      </p>
    </div>

    <div class="skinny-banner__actions">
      <app-button
        v-if="props.buttonLabel"
        :label="props.buttonLabel"
        :url="props.buttonLink"
        variant="light"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import AppButton from '~/components/AppButton'

Vue.component('AppButton', AppButton)

export default {
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

    buttonLabel: {
      type: String,
      default: null
    },

    buttonLink: {
      type: String,
      default: null
    },

    layout: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.skinny-banner {
  $parent: &;
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

  &#{&}--vert {
    flex-flow: column;
    margin: $SPACING_M;
    width: calc(100% - #{$SPACING_XL});

    #{$parent}__actions {
      margin-left: 0;
      margin-right: auto;
    }
  }
}
</style>
