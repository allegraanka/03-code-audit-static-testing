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
                <button @click.prevent="toggleMenuDrawer">
                  Menu
                </button>
              </div>

              <nuxt-link
                class="app-header__brand"
                to="/"
              >
                <app-logo />
              </nuxt-link>

              <div class="app-header__navigation">
                <nav v-if="menuItems.length">
                  <nuxt-link
                    v-for="(item, index) in menuItems"
                    :key="index"
                    :to="item.to"
                  >
                    {{ item.title }}
                  </nuxt-link>
                </nav>
              </div>

              <div class="app-header__misc">
                <button @click.prevent="handleCartToggle">
                  {{ itemCount }}
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
import { mapActions, mapGetters } from 'vuex'

import AnnouncementBanner from '~/components/AnnouncementBanner'
import AppLogo from '~/components/AppLogo'

export default {
  components: {
    AnnouncementBanner,
    AppLogo
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
  &__container {
    padding: $SPACING_2XL 0;
  }

  &__masthead {
    align-items: center;
    display: flex;
  }

  &__navigation {
    display: none;
  }

  &__brand {
    display: flex;
    flex-grow: 1;
    justify-content: center;

    .app-logo {
      max-width: 150px;
    }
  }

  @include mq($from: large) {
    &__navigation {
      display: block;
      flex-grow: 1;
      margin-left: $SPACING_4XL;

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
      color: red;
      flex-grow: 0;
      background: none;
    }
  }
}
</style>
