<template>
  <header class="app-header">
    <div class="container">
      <div class="row no-margin-bottom">
        <div class="col xs12">
          <div class="app-header__masthead">
            <div class="app-header__misc app-header__misc--left" />

            <nuxt-link
              class="app-header__brand"
              to="/"
            >
              <app-logo />
            </nuxt-link>

            <div class="app-header__navigation">
              <nav v-if="menu">
                <nuxt-link
                  v-for="(link, index) in menu.links"
                  :key="index"
                  :to="link.to"
                >
                  {{ link.title }}
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
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppLogo from '~/components/AppLogo'

export default {
  components: {
    AppLogo
  },

  computed: {

    /**
     * Maps the Vuex getters.
     */
    ...mapGetters({
      itemCount: 'cart/itemCount',
      lists: 'navigation/lists'
    }),

    /**
     * Finds and returns the main menu.
     * @returns {object} - The main menu object.
     */
    menu() {
      return this.lists.find(({ handle }) =>
        handle === 'main-menu'
      )
    }
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
    }
  }
}
</script>

<style lang="scss">
.app-header {
  padding: $SPACING_2XL 0;

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
      flex-grow: 0;
    }
  }
}
</style>
