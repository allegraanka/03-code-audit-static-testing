<template>
  <div class="template-error">
    <div class="container template-error__container">
      <div class="row template-error__row">
        <div class="template-error__content-wrapper col xs12 l5">
          <div class="container">
            <div class="row">
              <div class="col xs12 template-error__content">
                <h1 class="h2 template-error__content-title">
                  {{ $t('errors.404.title') }}
                </h1>

                <p
                  v-if="error.statusCode === 404"
                  class="large-body template-error__content-body"
                >
                  {{ $t('errors.404.message.prefix') }}
                </p>

                <p v-else class="large-body template-error__content-body">
                  {{ $t('errors.messages.default') }}
                </p>

                <app-button url="/">
                  {{ $t('errors.404.message.affix') }}
                </app-button>
              </div>
            </div>
          </div>
        </div>

        <div class="col xs12 l7 template-error__image-wrapper">
          <responsive-image
            v-if="$settings.errorPage.image.asset.url"
            class="template-error__image"
            :src="$settings.errorPage.image.asset.url"
            :alt="$settings.errorPage.altText"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '~/components/AppButton'
import ResponsiveImage from '~/components/ResponsiveImage.vue'

export default {
  components: {
    AppButton,
    ResponsiveImage
  },

  props: {
    error: {
      type: Object,
      default: null
    }
  },

  head() {
    return {
      title: this.error.message
    }
  }
}
</script>

<style lang="scss">
.template-error {
  text-align: center;

  > .container {
    max-height: 650px;
    max-width: unset;
    overflow: hidden;
    padding: 0;
  }

  &__content {
    margin: $SPACING_XL 0 $SPACING_L;
    padding: $SPACING_XL 0;
    text-align: center;

    .button {
      margin: auto;
      width: fit-content;
    }
  }

  &__content-title {
    margin-bottom: $SPACING_M;
  }

  &__content-body {
    color: $COLOR_TEXT_SECONDARY;
    margin-bottom: $SPACING_M;
  }

  &__image-wrapper {
    padding: 0;
  }

  &__image {
    max-height: 650px;
    min-height: 360px;
    object-fit: cover;
  }

  &__row {
    align-items: center;
    background-color: $COLOR_BACKGROUND_MID;
    flex-direction: column-reverse;
    margin-bottom: 0;
  }

  @include mq($from: large) {
    &__content {
      text-align: left;

      .button {
        margin: unset;
      }
    }

    &__content-body {
      margin-bottom: $SPACING_L;
    }

    &__row {
      flex-direction: row;
    }

    &__image-wrapper {
      align-self: stretch;
    }
  }

  @include mq($from: wide) {
    &__row {
      justify-content: flex-end;
    }

    &__content-wrapper.col {
      flex: 1;
      /* stylelint-disable-next-line */
      max-width: 100% !important; // Fix for issue with base styles sometimes overriding
      position: absolute;
      width: 100%;
    }
  }
}
</style>
