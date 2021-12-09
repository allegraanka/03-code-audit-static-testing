<template>
  <app-link
    class="lifestyle-block"
    :class="{ lazyload: !!imageSource }"
    :href="buttonLink"
    :data-bg="imageSource"
  >
    <video
      v-if="videoSource"
      class="lifestyle-block__video"
      autoplay
      playsinline
      muted
    >
      <source :src="videoSource" type="video/mp4" />
    </video>

    <div v-if="hasContent" class="lifestyle-block__content">
      <h3 v-if="title" class="lifestyle-block__title">{{ title }}</h3>
      <div v-if="body" class="lifestyle-block__body body-2">{{ body }}</div>

      <span v-if="buttonLink" class="lifestyle-block__button body-1">
        {{ buttonLabel || $t('collection.lifestyleBlock.button') }}
        <icon-arrow-right />
      </span>
    </div>
  </app-link>
</template>

<script>
import AppLink from '~/components/AppLink'

import IconArrowRight from '@/assets/icons/directional-arrow-forward.svg?inline'

export default {
  components: {
    AppLink,
    IconArrowRight
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

    buttonLabel: {
      type: String,
      default: ''
    },

    buttonLink: {
      type: String,
      default: ''
    },

    imageSource: {
      type: String,
      default: ''
    },

    videoSource: {
      type: String,
      default: ''
    }
  },

  computed: {
    /**
     * Returns if content should be shown.
     * @returns {boolean} - The content state.
     */
    hasContent() {
      return !!this.title || !!this.body || !!this.buttonLink
    }
  }
}
</script>

<style lang="scss">
.lifestyle-block {
  align-items: flex-end;
  background-color: $COLOR_BACKGROUND_LIGHT;
  background-position: center;
  background-size: cover;
  display: flex;
  padding-top: 100%;
  position: relative;
  width: 100%;

  &__content {
    background-color: $COLOR_BACKGROUND_LIGHT;
    bottom: $SPACING_XS;
    left: $SPACING_XS;
    padding: ($SPACING_M + $SPACING_2XS) $SPACING_L $SPACING_L;
    position: absolute;
  }

  &__title {
    margin: 0 0 $SPACING_XS 0;
  }

  &__body,
  &__body.body-2 {
    color: $COLOR_TEXT_SECONDARY;
    margin: 0 0 $SPACING_XS 0;
  }

  &__button,
  &__button.body-1 {
    align-items: center;
    display: flex;
    text-decoration: none;

    .icon {
      height: 20px;
      margin-left: ($SPACING_XS + $SPACING_3XS);
      width: 20px;
    }
  }

  &__video {
    height: 100%;
    left: 0;
    object-fit: cover;
    position: absolute;
    top: 0;
    width: 100%;
  }

  @include mq($from: large) {
    padding-top: 78%;

    &__content {
      bottom: $SPACING_L;
      left: $SPACING_L;
      padding: $SPACING_XL $LAYOUT_M $SPACING_XL $SPACING_XL;
    }

    &__title {
      margin-bottom: $SPACING_S;
    }

    &__body,
    &__body.body-2 {
      margin-bottom: $SPACING_S;
    }
  }
}
</style>
