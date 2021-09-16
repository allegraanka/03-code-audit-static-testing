<template>
  <div class="template-error">
    <div class="container">
      <div class="row">
        <div class="col xs12 l6 push-l3">
          <h1 class="h3">{{ error.message }}</h1>

          <p v-if="error.statusCode === 404" class="body-2">
            The page you are trying to view doesn’t exist. Try going
            <nuxt-link to="/">back to the homepage</nuxt-link>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
  padding: $LAYOUT_XL $SPACING_M;
  text-align: center;

  @include mq($from: large) {
    padding: $LAYOUT_2XL $SPACING_L;
  }
}
</style>
