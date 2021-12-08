<template>
  <div v-if="hasContent" class="account-callout">
    <responsive-image
      class="account-callout__image"
      :src="content.image.asset.url"
      :alt="content.altText"
      :max-height="350"
    />

    <div class="account-callout__content">
      <h4 v-if="content.title">
        {{ content.title }}
      </h4>

      <p class="body-2">
        {{ content.text }}
      </p>

      <app-button
        v-if="content.buttonText && content.buttonLink"
        :url="content.buttonLink"
      >
        {{ content.buttonText }}
      </app-button>
    </div>
  </div>
</template>

<script>
import AppButton from '~/components/AppButton'
import ResponsiveImage from '~/components/ResponsiveImage'

export default {
  components: {
    ResponsiveImage,
    AppButton
  },

  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    /**
     * Returns if callout has an image & text.
     * @returns {boolean} - If the callout has an image & text.
     */
    hasContent() {
      return (
        this.content &&
        this.content.image &&
        this.content.image.asset.url &&
        this.content.text
      )
    }
  }
}
</script>

<style lang="scss">
.account-callout {
  border: 1px solid $COLOR_BORDER_DARK;
  display: flex;
  flex-flow: column;
  grid-column: 1 / -1;
  padding: 0;

  &__image {
    height: 215px;
    object-fit: cover;
  }

  &__content {
    padding: $SPACING_L;

    h4 {
      margin-bottom: $SPACING_S;
      margin-top: 0;
    }

    p.body-2 {
      margin-bottom: $SPACING_M;
    }
  }

  @include mq($from: medium) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    &__image {
      height: 100%;
    }

    &__content {
      padding: $SPACING_2XL $SPACING_3XL $SPACING_2XL $LAYOUT_M;

      p.body-2 {
        margin-bottom: $SPACING_L;
      }
    }
  }
}
</style>
