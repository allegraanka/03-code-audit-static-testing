<template>
  <header class="app-header" :class="classes">
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
        <app-nav v-if="menuItems.length > 0" :items="menuItems" />

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

import timings from '~/helpers/timings'

import AnnouncementBanner from '~/components/AnnouncementBanner'
import AppLogo from '~/components/AppLogo'
import AppNav from '~/components/AppNav'
import Bubble from '~/components/Bubble'

import IconAccount from '@/assets/icons/misc-account.svg?inline'
import IconBasket from '@/assets/icons/misc-basket.svg?inline'
import IconMenu from '@/assets/icons/misc-menu.svg?inline'

export default {
  components: {
    AnnouncementBanner,
    AppLogo,
    AppNav,
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

  data() {
    return {
      sticky: {
        rearrange: false,
        hide: false
      },
      scroll: {
        previousTop: 0
      }
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
     * Returns the dynamic classes.
     * @returns {object} - The classes.
     */
    classes() {
      return {
        'app-header--rearrange': this.sticky.rearrange,
        'app-header--hidden': this.sticky.hide
      }
    },

    /**
     * Maps the Vuex getters.
     */
    ...mapGetters({
      itemCount: 'cart/itemCount'
    })
  },

  mounted() {
    this.setBodyOffset()
    this.setScrollEvents()
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
    },

    /**
     * Sets the scroll event listeners.
     */
    setScrollEvents() {
      window.addEventListener('scroll', this.handleScrollEvent)
    },

    /**
     * Sets the body offset for the header.
     */
    setBodyOffset() {
      document.body.style.setProperty(
        '--header-offset',
        `${this.$el.offsetHeight}px`
      )
    },

    /**
     * Handles the scroll event.
     */
    async handleScrollEvent() {
      const hide = this.$el.offsetHeight
      const rearrange = hide * 3
      const offset = window.visualViewport.pageTop
      const direction = offset <= this.scroll.previousTop ? 'up' : 'down'

      if (direction === 'up') {
        if (
          offset < rearrange &&
          !(!this.sticky.rearrange && !this.sticky.hide)
        ) {
          /**
           * If behind the rearrange threshold, hide.
           * - Rearrange after the hide transition ends.
           */
          this.sticky.hide = true

          await new Promise((resolve) => {
            setTimeout(() => {
              this.sticky.rearrange = false
              resolve()
            }, timings.base)
          })
        } else {
          /**
           * Otherwise, just hide the header.
           */
          this.sticky.hide = false
        }

        /**
         * If at the top of the page, show the header.
         */
        if (offset < hide) {
          this.sticky.hide = false
        }
      } else {
        /**
         * If scrolling down, hide then rearrange.
         */
        this.sticky.hide = offset >= hide
        this.sticky.rearrange = offset >= rearrange
      }

      this.scroll.previousTop = offset
    }
  }
}
</script>

<style lang="scss">
.app-header {
  $parent: &;
  @include animation-modal-slide;
  background-color: $COLOR_BACKGROUND_WHITE;
  box-shadow: 0 1px 6px 0 rgba($COLOR_BACKGROUND_DARK, 0.15);
  left: 0;
  position: fixed;
  top: 0;
  transform: translateY(0);
  width: 100%;
  z-index: 12;

  &__container {
    position: relative;
    z-index: 0;

    .mega-nav {
      left: 0;
      position: fixed;
      top: 100%;
    }
  }

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

  &__misc {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  &#{&}--rearrange {
    #{$parent}__announcement {
      display: none;
    }
  }

  &#{&}--hidden {
    transform: translateY(-100%);
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

      #{$parent}__search,
      #{$parent}__misc {
        display: none;
      }
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

    &#{&}--rearrange {
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

        .app-nav {
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

      .app-nav__link {
        padding: 1.875rem 0;
      }
    }
  }
}
</style>
