<template>
  <section class="call-to-action">
    <div class="container">
      <h3 v-if="title" class="call-to-action__title">
        {{ title }}
      </h3>

      <app-button
        v-if="button"
        :label="button.label"
        :url="button.link"
        class="call-to-action__button"
        :variant="button.style === 'outlined' ? 'outlined' : 'primary'"
      />
    </div>
  </section>
</template>

<script>
import AppButton from '~/components/AppButton'

export default {
  components: {
    AppButton
  },

  props: {
    title: {
      type: String,
      default: ''
    },

    button: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss">
.call-to-action {
  text-align: center;

  &__title {
    margin-top: 0;
  }

  &.content-sections__section {
    margin-bottom: $SPACING_2XL;
    margin-top: $SPACING_2XL;
  }

  @include mq($from: large) {
    &__title {
      margin-bottom: $SPACING_L;
    }

    &__button {
      display: inline-flex;
    }

    &.content-sections__section {
      margin-bottom: $SPACING_3XL;
      margin-top: $LAYOUT_M;
    }
  }
}
</style>
