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
              :class="page.path === '/account' ? 'account__link--root' : false"
              :to="page.path"
            >
              {{ page.label }}
            </nuxt-link>

            <button class="account__link" @click="logout">Log Out</button>
          </nav>
        </div>

        <div class="col xs12 l9">
          <p v-if="error">
            We couldn't fetch your account details at this moment. Please
            <span class="text-link" @click="$nuxt.refresh">try again</span>.
          </p>

          <slot v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    error: {
      type: Boolean,
      default: false
    }
  },

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
  },

  methods: {
    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      logout: 'customer/logout'
    })
  }
}
</script>

<style lang="scss">
.account {
  margin: 3.75rem 0;

  &__link {
    @include button-reset;
    display: block;

    &.nuxt-link-active,
    &.nuxt-link-exact-active {
      font-weight: $WEIGHT_BOLD;
    }

    &#{&}--root {
      &.nuxt-link-active:not(.nuxt-link-exact-active) {
        font-weight: $WEIGHT_BOOK;
      }
    }

    &:not(:last-child) {
      margin-bottom: $SPACING_XS;
    }
  }

  @include mq($until: large) {
    &__menu {
      display: none;
    }
  }
}
</style>
