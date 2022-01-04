<template>
  <section class="contact-form">
    <div class="container">
      <h3 class="contact-form__title">{{ title }}</h3>

      <client-only>
        <script :src="form"></script>
      </client-only>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },

    form: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.contact-form {
  &__title {
    margin-bottom: $SPACING_L;
    margin-top: 0;
    text-align: center;
  }

  @include mq($from: large) {
    border-top: 1px solid $COLOR_BORDER_LIGHT;

    &__title {
      margin-bottom: $SPACING_XL;
      margin-top: $LAYOUT_L;
    }
  }
}
</style>
