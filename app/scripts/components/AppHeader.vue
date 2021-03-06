<template>
  <header class="app-header" :class="classes" @keyup="handleKeyUp" tabindex="0">
    <announcement-banner
      v-if="announcementItems.length"
      class="app-header__announcement"
      :items="announcementItems"
      :links="announcementLinks"
    />

    <div class="app-header__container">
      <div class="app-header__grid-wrapper">
        <div class="app-header__grid">
          <div class="app-header__misc app-header__misc--left">
            <button
              class="app-header__action"
              @click.prevent="toggleMenuDrawer"
            >
              <icon-menu />

              <span class="caption">{{ $t('menu.title') }}</span>
            </button>
          </div>

          <div class="app-header__brand">
            <nuxt-link to="/">
              <app-logo />

              <span class="visually-hidden">
                {{ $t('general.title') }}
              </span>
            </nuxt-link>
          </div>

          <div class="app-header__search">
            <app-header-search
              v-model="search"
              @focus="handleSearchOverlayOpenRequest"
              @submit="handleSearchSubmit"
              @cleared="closeSearchOverlay"
            />
          </div>

          <div class="app-header__misc">
            <div
              class="app-header__account"
              :class="{ 'is-active': showAccountDropdown }"
              @mouseenter="showAccountDropdown = isLoggedIn"
              @mouseleave="showAccountDropdown = false"
            >
              <nuxt-link
                class="app-header__action app-header__action--desktop"
                :to="isLoggedIn ? '/account' : '/account/login'"
              >
                <icon-account />

                <span v-if="isLoggedIn" class="caption">
                  {{ $t('header.account.loggedIn') }}
                </span>

                <span v-else class="caption">
                  {{ $t('header.account.loggedOut') }}
                </span>
              </nuxt-link>

              <button
                v-if="isLoggedIn"
                class="app-header__account-toggle"
                @click.prevent="showAccountDropdown = !showAccountDropdown"
              >
                <icon-caret-down />

                <span class="visually-hidden">
                  {{ $t('header.account.toggle') }}
                </span>
              </button>

              <ul
                v-if="isLoggedIn"
                ref="accountDropdown"
                class="app-header__account-dropdown body-2"
              >
                <li class="app-header__account-item">
                  <nuxt-link class="app-header__account-link" to="/account">
                    {{ $t('header.account.loggedIn') }}
                  </nuxt-link>
                </li>

                <li class="app-header__account-item">
                  <nuxt-link
                    class="app-header__account-link"
                    to="/account/orders"
                  >
                    {{ $t('header.account.orders') }}
                  </nuxt-link>
                </li>

                <li class="app-header__account-item">
                  <nuxt-link
                    class="app-header__account-link"
                    to="/account/addresses"
                  >
                    {{ $t('header.account.addressBook') }}
                  </nuxt-link>
                </li>

                <li class="app-header__account-item">
                  <nuxt-link
                    class="app-header__account-link"
                    to="/"
                    @click.native.prevent="$store.dispatch('customer/logout')"
                  >
                    {{ $t('header.account.logout') }}
                  </nuxt-link>
                </li>
              </ul>
            </div>

            <button
              class="app-header__action app-header__action--bordered"
              @click.prevent="handleCartToggle"
            >
              <icon-basket />

              <span class="caption">{{ $t('cart.titleShort') }}</span>

              <bubble v-if="itemCount >= 1">
                {{ itemCount }}
              </bubble>
            </button>
          </div>
        </div>

        <div ref="searchOverlay" class="app-header__search-overlay">
          <span
            class="app-header__search-background"
            @click="closeSearchOverlay"
          />

          <search-overlay
            v-if="searchOverlayRequested"
            ref="searchOverlayComponent"
            :query="search"
            :search-requested="searchRequested"
            @hook:mounted="handleSearchOverlayMounted"
          />
        </div>
      </div>

      <div class="app-header__navigation">
        <app-nav v-if="menuItems.length > 0" :items="menuItems" />

        <div class="app-header__search">
          <app-header-search
            v-model="search"
            @focus="handleSearchOverlayOpenRequest"
            @submit="handleSearchSubmit"
            @cleared="closeSearchOverlay"
          />
        </div>

        <div class="app-header__misc">
          <button
            class="app-header__action app-header__action--bordered"
            @click.prevent="handleCartToggle"
          >
            <icon-basket />

            <span class="caption">{{ $t('cart.titleShort') }}</span>

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
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

import timings from '~/helpers/timings'

import AnnouncementBanner from '~/components/AnnouncementBanner'
import AppHeaderSearch from '~/components/AppHeaderSearch'
import AppLogo from '~/components/AppLogo'
import AppNav from '~/components/AppNav'
import Bubble from '~/components/Bubble'

import IconAccount from '@/assets/icons/misc-account.svg?inline'
import IconBasket from '@/assets/icons/misc-basket.svg?inline'
import IconCaretDown from '@/assets/icons/directional-caret-down.svg?inline'
import IconMenu from '@/assets/icons/misc-menu.svg?inline'

export default {
  components: {
    AnnouncementBanner,
    AppHeaderSearch,
    AppLogo,
    AppNav,
    Bubble,
    IconAccount,
    IconBasket,
    IconCaretDown,
    IconMenu,
    SearchOverlay: () => import('~/components/SearchOverlay')
  },

  props: {
    announcementItems: {
      type: Array,
      default: () => []
    },

    announcementLinks: {
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
      },
      showAccountDropdown: false,
      search: '',
      searchRequested: false,
      searchOverlayRequested: false,
      searchOverlayMounted: false
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

  watch: {
    $route() {
      this.closeSearchOverlay()
    },

    /**
     * Watches for changes to the search overlay mounted state.
     * - If is mounted and requested, open it.
     *
     * @param {boolean} value - The mounted state.
     */
    searchOverlayMounted(value) {
      if (value && this.searchOverlayRequested) {
        this.openSearchOverlay()
      }
    }
  },

  mounted() {
    if (this.$route.query.q) {
      this.search = this.$route.query.q
    }

    window.addEventListener('scroll', this.handleScrollEvent)
  },

  methods: {
    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      toggleDrawer: 'drawers/toggleDrawer'
    }),

    /**
     * Handles the search overlay mounted hook.
     * - Sets the local state.
     */
    handleSearchOverlayMounted() {
      this.searchOverlayMounted = true
    },

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
    },

    /**
     * Entry point for a request to open the search overlay.
     * - Sets a request if not mounted, which will be picked up in a watcher.
     * - If mounted, open the overlay.
     */
    handleSearchOverlayOpenRequest() {
      if (!this.searchOverlayMounted) {
        this.searchOverlayRequested = true
        return
      }

      this.openSearchOverlay()
    },

    /**
     * Opens the search overlay element.
     * - Adds a transition and eventual active class.
     */
    openSearchOverlay() {
      const container = this.$refs.searchOverlay
      const component = this.$refs.searchOverlayComponent

      if (!component) {
        return
      }

      disableBodyScroll(component.$el)
      container.classList.add('is-transitioning')

      setTimeout(() => {
        container.classList.add('is-active')
      }, 0)
    },

    /**
     * Closes the search overlay element.
     * - Removes transition class after active transition ends.
     */
    closeSearchOverlay() {
      const container = this.$refs.searchOverlay
      const component = this.$refs.searchOverlayComponent

      if (!component) {
        return
      }

      container.addEventListener(
        'transitionend',
        () => {
          if (!container.classList.contains('is-active')) {
            container.classList.remove('is-transitioning')
          }
        },
        { once: true }
      )

      container.classList.remove('is-active')
      enableBodyScroll(component.$el)
    },

    /**
     * Handles the search input key up event.
     * @param {object} event - The event payload.
     */
    handleKeyUp(event) {
      if (event.keyCode === 27) {
        if (event.target instanceof HTMLInputElement) {
          this.$el.querySelectorAll('input').forEach((element) => {
            element.blur()
          })
        }

        setTimeout(() => this.closeSearchOverlay(), 0)
        return
      }
    },

    /**
     * Handles the search submit request.
     *
     * - Updates the local data.
     * - Fed into the search overlay to react.
     * - Resets to allow for change detection.
     */
    handleSearchSubmit() {
      this.searchRequested = true

      setTimeout(() => {
        this.searchRequested = false
      }, 0)
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

  &__grid-wrapper {
    position: relative;
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
    white-space: nowrap;

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

  &__account {
    display: flex;
    position: relative;

    &.is-active {
      #{$parent}__account-dropdown {
        opacity: 1;
        visibility: visible;
      }

      #{$parent}__action {
        background-color: $COLOR_BACKGROUND_MID;
      }
    }
  }

  &__account-dropdown {
    @include animation-overlay(all);
    background-color: $COLOR_BACKGROUND_WHITE;
    border: 1px solid $COLOR_BORDER_LIGHT;
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-end;
    list-style-type: none;
    margin: 0;
    opacity: 0;
    overflow: hidden;
    padding: $SPACING_M;
    position: absolute;
    top: calc(100%);
    visibility: hidden;
    width: 100%;
  }

  &__account-item {
    color: $COLOR_TEXT_PRIMARY;

    &:not(:last-child) {
      margin-bottom: $SPACING_S;
    }
  }

  &__account-link {
    color: $COLOR_TEXT_PRIMARY;
    text-decoration: none;
  }

  &__account-toggle {
    @include button-reset;

    &:not(:focus) {
      @include visually-hidden;
    }
  }

  &__misc {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  &__search-overlay {
    $height: calc(var(--visual-viewport) - 135px);
    display: none;
    height: $height;
    pointer-events: none;
    position: absolute;
    top: 100%;
    width: 100%;
    z-index: 1;

    .search-overlay {
      box-shadow: 0 1px 4px 0 rgba($COLOR_BACKGROUND_DARK, 0.15) inset;
      left: 0;
      max-height: $height;
      overflow: auto;
      position: absolute;
      top: 0;
    }

    &.is-transitioning {
      @include animation-overlay;
      display: block;
      opacity: 0;
    }

    &.is-active {
      opacity: 1;
      pointer-events: auto;
    }
  }

  &__search-background {
    background-color: rgba($COLOR_BACKGROUND_DARK, 0.4);
    height: 100vh;
    left: 0;
    position: absolute;
    top: 0;
    width: 100vw;
  }

  &#{&}--rearrange {
    #{$parent}__announcement {
      display: none;
    }
  }

  &#{&}--hidden {
    transform: translateY(-100%);

    #{$parent}__search-overlay {
      opacity: 0;
      pointer-events: none;
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
      @include container;
      grid-template-columns: 1fr 208px 208px 1fr;
      margin: 0 auto;
      padding-bottom: 1.25rem;
      padding-top: 1.25rem;
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
      column-gap: $SPACING_M;
      display: flex;
      justify-content: flex-end;
      padding-left: $SPACING_L;

      &#{&}--left {
        display: none;
      }
    }

    &__action {
      @include animation-overlay(all);
      border: 1px solid transparent;
      flex-direction: row;
      min-height: 44px;
      padding: $SPACING_XS $SPACING_M;
      text-align: right;

      &#{&}--bordered {
        border-color: $COLOR_PRIMARY;

        &:hover {
          background-color: $COLOR_PRIMARY;
          color: $COLOR_TEXT_INVERSE;
        }
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

      &:hover {
        background-color: $COLOR_BACKGROUND_MID;
      }
    }

    &__search {
      grid-area: middle;
    }

    &__search-overlay {
      height: calc(var(--visual-viewport) - 122px);

      .search-overlay {
        border-top: 1px solid $COLOR_BORDER_LIGHT;
        box-shadow: none;
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

        .app-nav__item {
          max-height: 84px;
          padding-bottom: 1.875rem;
          padding-top: 1.875rem;
          white-space: nowrap;
        }

        .app-nav__item::before {
          height: calc(100% + 1px);
        }

        #{$parent}__misc {
          display: block;
        }

        #{$parent}__search {
          display: block;
        }

        /* prettier-ignore */
        #{$parent}__search input[type=search] {
          max-height: 44px;
        }
      }

      #{$parent}__search {
        width: 322px;
      }

      #{$parent}__grid-wrapper {
        left: 0;
        position: fixed;
        top: 0;
        width: 100%;
      }

      #{$parent}__search-overlay {
        height: calc(var(--visual-viewport) - 84px);
        top: 84px;
      }

      .app-nav__link {
        padding: 1.875rem 0;
      }
    }
  }
}
</style>
