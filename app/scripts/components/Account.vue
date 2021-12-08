<template>
  <div class="account container">
    <div class="row">
      <div class="col xs12">
        <div class="account__inner">
          <div class="account__navigation">
            <div class="account__navigation-header">
              <h1 class="account__title h3">
                {{ $t('account.title') }}
              </h1>

              <nuxt-link
                class="account__highlight-link account__highlight-link--mob"
                to="/"
                @click.native.prevent="logout"
              >
                {{ $t('account.links.logOut') }}
              </nuxt-link>
            </div>

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

              <nuxt-link
                class="account__highlight-link"
                to="/"
                @click.native.prevent="logout"
              >
                {{ $t('account.links.logOut') }}
              </nuxt-link>
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

              <option value="logout">
                {{ $t('account.links.logOut') }}
              </option>
            </select>
          </div>

          <div class="account__overview">
            <p v-if="error">
              {{ $t('account.notFound.prefix') }}

              <span class="text-link" @click="$nuxt.refresh">{{
                $t('account.notFound.affix')
              }}</span
              >.
            </p>

            <slot v-else />
          </div>
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

  computed: {
    /**
     * Pages to be mapped into the sidebar.
     * @returns {Array} - The pages.
     */
    pages() {
      return [
        {
          path: '/account',
          label: this.$t('account.links.dashboard')
        },
        {
          path: '/account/orders',
          label: this.$t('account.links.orders')
        },
        {
          path: '/account/addresses',
          label: this.$t('account.links.addresses')
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
  &__inner {
    padding: $SPACING_XL 0 $SPACING_3XL;
  }

  &__title.h3 {
    margin: 0;
  }

  &__navigation {
    margin-bottom: $SPACING_M;
  }

  &__navigation-header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: $SPACING_L;
  }

  &__link {
    @include button-reset;
    display: block;
    text-decoration: none;

    &.nuxt-link-active,
    &.nuxt-link-exact-active {
      font-weight: $WEIGHT_MEDIUM;
    }

    &#{&}--root {
      &.nuxt-link-active:not(.nuxt-link-exact-active) {
        font-weight: $WEIGHT_BOOK;
      }
    }

    &:not(:last-child) {
      margin-bottom: $SPACING_S;
    }
  }

  &__highlight-link {
    color: $COLOR_TEXT_SECONDARY;
    font-size: ms(-1);
  }

  &__menu {
    display: none;
  }

  .row {
    margin-bottom: 0;
  }

  @include mq($from: large) {
    &__inner {
      display: grid;
      grid-template-columns: 1fr 3fr;
      padding: 0;
    }

    &__navigation {
      margin-bottom: 0;
      padding: $LAYOUT_M 0 $LAYOUT_XL;
      position: relative;

      &::before {
        background-color: $COLOR_BACKGROUND_MID;
        bottom: 0;
        content: '';
        left: -100vw;
        position: absolute;
        right: 0;
        top: 0;
        z-index: -1;
      }
    }

    &__overview {
      padding: $LAYOUT_M 0 $LAYOUT_XL $LAYOUT_XL + $LAYOUT_XS;
    }

    &__navigation-header {
      margin-bottom: $SPACING_XL;
    }

    &__select {
      display: none;
    }

    &__highlight-link {
      color: $COLOR_TEXT_PRIMARY;
      font-size: ms(0);

      &#{&}--mob {
        display: none;
      }
    }

    &__menu {
      display: block;
    }
  }
}
</style>
