<template>
  <div class="template-error">
    <div class="container template-error__container">
      <div class="row template-error__row">
        <div class="col xs6">
          <h1 class="h3">{{ $t('page.notFound') }}</h1>

          <p v-if="error.statusCode === 404" class="body-2">
            {{ $t('errors.404.message.prefix') }}
          </p>
          <p v-else class="body-2">
            {{ $t('errors.messages.default') }}
          </p>
          <app-button>{{ $t('errors.404.message.affix') }}</app-button>
        </div>
        <div class="col xs6">
          <!-- <responsive-image
            :src=""
            :alt=""
          /> -->
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
    AppButton
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
  // padding: $LAYOUT_XL $SPACING_M;
  text-align: center;

  &__container {
    padding: 0;
  }

  @include mq($from: large) {
    // padding: $LAYOUT_2XL $SPACING_L;
  }
}
</style>
