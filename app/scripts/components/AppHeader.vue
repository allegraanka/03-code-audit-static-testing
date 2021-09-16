<template>
  <header class="app-header">
    <announcement-banner
      v-if="announcementItems.length"
      :items="announcementItems"
    />

    <div class="app-header__container">
      <div class="container">
        <div class="row no-margin-bottom">
          <div class="col xs12">
            <div class="app-header__masthead">
              <div class="app-header__misc app-header__misc--left">
                <button
                  class="app-header__action"
                  @click.prevent="toggleMenuDrawer"
                >
                  <icon-menu />

                  <span class="caption">Menu</span>
                </button>
              </div>

              <nuxt-link class="app-header__brand" to="/">
                <app-logo />
              </nuxt-link>

              <div class="app-header__navigation">
                <nav v-if="menuItems.length">
                  <template v-for="(item, index) in menuItems">
                    <nuxt-link
                      v-if="item.link"
                      :key="index"
                      :to="item.link"
                      class="app-header__link"
                      :class="{
                        'app-header__link--highlight': item.highlight
                      }"
                    >
                      {{ item.name }}
                    </nuxt-link>

                    <span
                      v-else
                      :key="index"
                      class="app-header__link"
                      :class="{
                        'app-header__link--highlight': item.highlight
                      }"
                    >
                      {{ item.name }}
                    </span>
                  </template>
                </nav>
              </div>

              <div class="app-header__misc">
                <nuxt-link
                  class="app-header__action app-header__action--desktop"
                  :to="isLoggedIn ? '/account' : '/account/login'"
                >
                  <icon-basket />

                  <span v-if="isLoggedIn" class="caption">Account</span>
                  <span v-else class="caption">Sign In / Register</span>
                </nuxt-link>

                <button
                  class="app-header__action"
                  @click.prevent="handleCartToggle"
                >
                  <icon-basket />

                  <span class="caption">Basket</span>

                  <bubble v-if="itemCount >= 1">
                    {{ itemCount }}
                  </bubble>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

import AnnouncementBanner from '~/components/AnnouncementBanner'
import AppLogo from '~/components/AppLogo'
import Bubble from '~/components/Bubble'

import IconBasket from '@/assets/icons/misc-basket.svg?inline'
import IconMenu from '@/assets/icons/misc-menu.svg?inline'

export default {
  components: {
    AnnouncementBanner,
    AppLogo,
    Bubble,
    IconBasket,
    IconMenu
  },

  props: {
    announcementItems: {
      type: Array,
      default: () => []
    },

    menuItems: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    /**
     * Maps the Vuex state.
     */
    ...mapState({
      isLoggedIn: ({ customer }) => customer.loggedIn
    }),

    /**
     * Maps the Vuex getters.
     */
    ...mapGetters({
      itemCount: 'cart/itemCount'
    })
  },

  methods: {
    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      toggleDrawer: 'drawers/toggleDrawer'
    }),

    /**
     * Handles the cart toggle event.
     */
    handleCartToggle() {
      this.toggleDrawer({ namespace: 'cart-drawer' })
    },

    /**
     * Toggles the menu drawer open/closed.
     */
    toggleMenuDrawer() {
      this.toggleDrawer({ namespace: 'menu-drawer' })
    }
  }
}
</script>

<style lang="scss">
.app-header {
  border-bottom: 1px solid $COLOR_BORDER_LIGHT;

  &__container {
    padding: $SPACING_XS 0;
  }

  &__masthead {
    align-items: center;
    display: flex;
    padding: 0 $SPACING_XS;
    width: 100%;
  }

  &__navigation {
    display: none;
  }

  &__brand {
    display: flex;
    flex-grow: 1;
    justify-content: center;

    .app-logo {
      max-width: 100px;
    }
  }

  &__action {
    @include button-reset;
    align-items: center;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    position: relative;

    .icon {
      margin-bottom: -1px;
    }

    .bubble {
      position: absolute;
      right: -$SPACING_XS;
      top: -$SPACING_2XS;
    }
  }

  &__link {
    color: $COLOR_TEXT_PRIMARY;
    font-size: ms(-1);

    &#{&}--highlight {
      color: $COLOR_SUPPORT_ERROR;
    }
  }

  @include mq($until: large) {
    &__action {
      &#{&}--desktop {
        display: none;
      }
    }
  }

  @include mq($from: large) {
    &__masthead {
      padding: 0;
    }

    &__container {
      padding: 1.375rem 0;
    }

    &__navigation {
      display: block;
      flex-grow: 1;
      margin-left: $SPACING_2XL;
      text-align: center;
    }

    &__link {
      margin-right: $SPACING_L;
    }

    &__misc {
      column-gap: $SPACING_2XL;
      display: flex;

      &#{&}--left {
        display: none;
      }
    }

    &__brand {
      flex-grow: 0;
    }

    &__action {
      flex-direction: row;

      .icon {
        margin: 0 0 0 0.625rem;
        order: 2;
      }
    }
  }
}
</style>
