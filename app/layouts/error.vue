<template>
  <div class="template-error">
    <div class="container template-error__container">
      <div class="row template-error__row">
        <div class="col xs12 m6">
          <div class="container">
            <div class="row">
              <div class="col xs12 m11 offset-m1 template-error__content">
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

        <div class="col xs12 m6">
          <responsive-image
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
    padding: 0;
  }

  &__content {
    padding: $SPACING_XL 0;
    text-align: center;

    &-title {
      margin-bottom: $SPACING_M;
    }

    &-body {
      color: $COLOR_TEXT_SECONDARY;
    }

    .button {
      margin: auto;
    }
  }

  &__row {
    align-items: center;
    flex-direction: column-reverse;
  }

  @include mq($from: large) {
    &__content {
      text-align: left;

      .button {
        margin: unset;
      }
    }

    &__row {
      flex-direction: row;
    }
  }
}
</style>
