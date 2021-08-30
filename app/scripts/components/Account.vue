<template>
  <div class="account">
    <div class="container container--tight">
      <div class="row">
        <div class="col xs12">
          <h1 class="h2">My Account</h1>
        </div>
      </div>

      <div class="row">
        <div class="col xs12 l3">
          <nav class="account__menu">
            <nuxt-link
              v-for="(page, index) in pages"
              :key="`page-${index}`"
              class="account__link"
              :to="page.path"
            >
              {{ page.label }}
            </nuxt-link>
          </nav>
        </div>

        <div class="col xs12 l9">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pages: [
        {
          path: '/account',
          label: 'Account Overview'
        },
        {
          path: '/account/orders',
          label: 'Orders'
        },
        {
          path: '/account/addresses',
          label: 'Address Book'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.account {
  margin: 3.75rem 0;

  &__link {
    display: block;

    &.nuxt-link-exact-active {
      font-weight: $WEIGHT_BOLD;
    }

    &:not(:last-child) {
      margin-bottom: $SPACING_XS;
    }
  }
}
</style>
