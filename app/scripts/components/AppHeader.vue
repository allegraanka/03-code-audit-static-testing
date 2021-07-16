<template>
  <header class="app-header">
    <div class="container">
      <div class="row no-margin-bottom">
        <div class="col xs12">
          <nuxt-link class="app-header__brand" to="/">
            <app-logo />
          </nuxt-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import AppLogo from '~/components/AppLogo'

export default {
  components: {
    AppLogo
  }
}
</script>

<style lang="scss">
.app-header {
  padding: $SPACING_2XL 0;

  &__brand {
    display: block;
    max-width: 150px;
  }
}
</style>
