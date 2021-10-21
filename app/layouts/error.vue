<template>
  <div class="template-error">
    <div class="container template-error__container">
      <div class="row template-error__row">
        <div class="col xs12 l5">
          <div class="container">
            <div class="row">
              <div class="col xs12 template-error__content">
                <h1 class="h2 template-error__content-title">
                  {{ $t('page.notFound') }}
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
                <app-button>{{ $t('errors.404.message.affix') }}</app-button>
              </div>
            </div>
          </div>
        </div>

        <div class="col xs12 l7 template-error__image-wrapper">
          <responsive-image
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
import ResponsiveImage from '../scripts/components/ResponsiveImage.vue'

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
    overflow: hidden;
    padding: 0;
  }

  &__content {
    margin: $SPACING_XL 0 $SPACING_L;
    padding: $SPACING_XL 0;
    text-align: center;

    &-title {
      margin-bottom: $SPACING_M;
    }

    &-body {
      color: $COLOR_TEXT_SECONDARY;
      margin-bottom: $SPACING_M;
    }

    .button {
      margin: auto;
      min-height: 40px;
    }
  }

  &__image-wrapper {
    padding: 0;
  }

  &__image {
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
        min-height: 48px;
      }

      &-body {
        margin-bottom: $SPACING_L;
      }
    }

    &__row {
      flex-direction: row;
    }

    &__image-wrapper {
      align-self: stretch;
    }
  }
}
</style>
