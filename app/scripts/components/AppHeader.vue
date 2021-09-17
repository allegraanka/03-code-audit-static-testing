<template>
  <header class="app-header app-header--sticky-base">
    <announcement-banner
      v-if="announcementItems.length"
      class="app-header__announcement"
      :items="announcementItems"
    />

    <div class="app-header__container">
      <div class="app-header__grid">
        <div class="app-header__misc app-header__misc--left">
          <button class="app-header__action" @click.prevent="toggleMenuDrawer">
            <icon-menu />

            <span class="caption">Menu</span>
          </button>
        </div>

        <nuxt-link class="app-header__brand" to="/">
          <app-logo />
        </nuxt-link>

        <div class="app-header__search">
          <input type="search" placeholder="Search for products" />
        </div>

        <div class="app-header__misc">
          <nuxt-link
            class="app-header__action app-header__action--desktop"
            :to="isLoggedIn ? '/account' : '/account/login'"
          >
            <icon-account />

            <span v-if="isLoggedIn" class="caption">Account</span>
            <span v-else class="caption">Sign In / Register</span>
          </nuxt-link>

          <button
            class="app-header__action app-header__action--bordered"
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

      <div class="app-header__navigation">
        <nav v-if="menuItems.length > 0">
          <template v-for="(item, index) in menuItems">
            <nuxt-link
              v-if="item.link"
              :key="index"
              :to="item.link"
              class="app-header__link body-1"
              :class="{
                'app-header__link--highlight': item.highlight
              }"
            >
              {{ item.name }}
            </nuxt-link>

            <span
              v-else
              :key="index"
              class="app-header__link body-1"
              :class="{
                'app-header__link--highlight': item.highlight
              }"
            >
              {{ item.name }}
            </span>
          </template>
        </nav>

        <div class="app-header__search">
          <input type="search" placeholder="Search for products" />
        </div>

        <div class="app-header__misc">
          <button
            class="app-header__action app-header__action--bordered"
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
  </header>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

import AnnouncementBanner from '~/components/AnnouncementBanner'
import AppLogo from '~/components/AppLogo'
import Bubble from '~/components/Bubble'

import IconAccount from '@/assets/icons/misc-account.svg?inline'
import IconBasket from '@/assets/icons/misc-basket.svg?inline'
import IconMenu from '@/assets/icons/misc-menu.svg?inline'

export default {
  components: {
    AnnouncementBanner,
    AppLogo,
    Bubble,
    IconAccount,
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
  $parent: &;
  background-color: $COLOR_BACKGROUND_WHITE;
  border-bottom: 1px solid $COLOR_BORDER_LIGHT;
  width: 100%;

  &__grid {
    display: grid;
    grid-template-areas: 'left middle middle right' 'bottom bottom bottom bottom';
    grid-template-columns: 60px auto auto 60px;
  }

  &__navigation {
    display: none;
  }

  &__search {
    grid-area: bottom;

    input {
      background-color: $COLOR_BACKGROUND_MID;
      border: 0;
      padding: $SPACING_L;
    }
  }

  &__brand {
    border-left: 1px solid $COLOR_BORDER_LIGHT;
    border-right: 1px solid $COLOR_BORDER_LIGHT;
    display: flex;
    grid-area: middle;
    justify-content: center;
    padding: 1.125rem 0;

    .app-logo {
      height: 100%;
      max-width: 111px;
      width: 100%;
    }
  }

  &__action {
    @include button-reset;
    align-items: center;
    color: $COLOR_PRIMARY;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    position: relative;
    text-decoration: none;

    .icon {
      margin-bottom: -1px;
    }

    .bubble {
      outline: 2px solid $COLOR_BACKGROUND_WHITE;
      position: absolute;
      right: -$SPACING_3XS;
      top: -$SPACING_3XS;
    }
  }

  &__link {
    color: $COLOR_TEXT_PRIMARY;
    margin: 0;
    padding: $SPACING_M 0;

    &.body-1 {
      margin: 0;
    }

    &#{&}--highlight {
      color: $COLOR_SUPPORT_ERROR;
    }
  }

  &__misc {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  &#{&}--sticky {
    @include animation-modal-slide;
    left: 0;
    position: fixed;
    top: 0;
    transform: translateY(-100%);

    #{$parent}__announcement {
      display: none;
    }

    &.is-active {
      transform: translateY(0);
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
    &__grid {
      grid-template-columns: 1fr 208px 208px 1fr;
      margin: 0 auto;
      max-width: map-get($map: $mq-breakpoints, $key: wide);
      padding: 1.25rem $GUTTER_WIDTH;
    }

    &__brand {
      border: 0;
      grid-area: left;
      justify-content: flex-start;
      padding: 0;

      .app-logo {
        max-width: 159px;
      }
    }

    &__navigation {
      border-top: 1px solid $COLOR_BORDER_LIGHT;
      display: block;

      nav {
        display: flex;
        gap: $SPACING_XL;
        justify-content: center;

        a {
          text-decoration: none;
        }
      }

      #{$parent}__search,
      #{$parent}__misc {
        display: none;
      }
    }

    &__link {
      margin-right: $SPACING_L;
    }

    &__misc {
      column-gap: $SPACING_2XL;
      display: flex;
      justify-content: flex-end;
      padding-left: $SPACING_L;

      &#{&}--left {
        display: none;
      }
    }

    &__action {
      flex-direction: row;
      text-align: right;

      &#{&}--bordered {
        border: 1px solid $COLOR_PRIMARY;
        min-height: 44px;
        padding: $SPACING_XS $SPACING_M;
      }

      .bubble {
        outline-width: 3px;
        right: -$SPACING_S;
        top: -$SPACING_XS;
      }

      span {
        font-size: ms(-1);
      }

      .icon {
        margin: 0 0 0 0.625rem;
        order: 2;
      }
    }

    &__search {
      align-items: center;
      display: flex;
      grid-area: middle;

      input {
        max-height: 48px;
      }
    }

    &#{&}--sticky {
      #{$parent}__container {
        @include container;
      }

      #{$parent}__grid,
      #{$parent}__announcement {
        display: none;
      }

      #{$parent}__navigation {
        align-items: center;
        border: 0;
        display: flex;

        nav {
          margin-right: auto;
        }

        #{$parent}__search,
        #{$parent}__misc {
          display: block;
        }
      }

      #{$parent}__search {
        width: 322px;
      }

      #{$parent}__link {
        padding: 1.875rem 0;
      }
    }
  }
}
</style>
