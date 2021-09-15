<template>
  <div class="account">
    <div class="container container--tight">
      <div class="row">
        <div class="col xs12">
          <h1 class="account__title h2">My Account</h1>
        </div>
      </div>

      <div class="row">
        <div class="col xs12 l3">
          <div class="account__navigation">
            <nav class="account__menu">
              <nuxt-link
                v-for="(page, index) in pages"
                :key="`page-${index}`"
                class="account__link"
                :class="
                  page.path === '/account' ? 'account__link--root' : false
                "
                :to="page.path"
              >
                {{ page.label }}
              </nuxt-link>

              <button class="account__link" @click="logout">Log Out</button>
            </nav>

            <select
              ref="select"
              class="account__select"
              @change="handleSelectChange"
            >
              <option
                v-for="(page, index) in pages"
                :key="`page-select-${index}`"
                :value="page.path"
                :selected="$route.path === page.path"
              >
                {{ page.label }}
              </option>

              <option value="logout">Log out</option>
            </select>
          </div>
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
    }),

    /**
     * Handles the navigation select event.
     */
    handleSelectChange() {
      if (this.$refs.select) {
        if (this.$refs.select.value === 'logout') {
          this.logout()
          return
        }

        this.$router.push(this.$refs.select.value)
      }
    }
  }
}
</script>

<style lang="scss">
.account {
  margin: $SPACING_3XL 0;

  &__navigation {
    margin-bottom: $SPACING_L;
  }

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

  &__menu {
    display: none;
  }

  &__title {
    margin: 0;
  }

  @include mq($from: large) {
    margin: 3.75rem 0;

    &__navigation {
      margin-bottom: 0;
    }

    &__select {
      display: none;
    }

    &__menu {
      display: block;
    }
  }
}
</style>
