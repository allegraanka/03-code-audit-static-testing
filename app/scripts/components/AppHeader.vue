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
                  <nuxt-link
                    v-for="(item, index) in menuItems"
                    :key="index"
                    :to="item.to"
                    class="app-header__link"
                  >
                    {{ item.title }}
                  </nuxt-link>
                </nav>
              </div>

              <div class="app-header__misc">
                <div v-if="isLoggedIn">
                  Logged in.
                  <p @click="logout">Log out</p>
                </div>

                <button
                  class="app-header__action"
                  @click.prevent="handleCartToggle"
                >
                  <icon-bag />

                  <span class="caption"> Basket </span>

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

import IconBag from '@/assets/icons/misc-bag.svg?inline'
import IconMenu from '@/assets/icons/misc-menu.svg?inline'

export default {
  components: {
    AnnouncementBanner,
    AppLogo,
    Bubble,
    IconBag,
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
      toggleDrawer: 'drawers/toggleDrawer',
      logout: 'customer/logout'
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
      margin-left: $SPACING_4XL;
      text-align: center;

      a {
        margin-right: $SPACING_L;
      }
    }

    &__misc {
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
