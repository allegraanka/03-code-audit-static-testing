<template>
  <header class="app-header">
    <div class="container">
      <div class="row no-margin-bottom">
        <div class="col xs12">
          <div class="app-header__masthead">
            <nuxt-link
              class="app-header__brand"
              to="/"
            >
              <app-logo />
            </nuxt-link>

            <nav
              v-if="menu"
              class="app-header__navigation"
            >
              <nuxt-link
                v-for="(link, index) in menu.links"
                :key="index"
                :to="link.to"
              >
                {{ link.title }}
              </nuxt-link>
            </nav>

            <div class="app-header__misc">
              {{ itemCount }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

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
    margin-left: $SPACING_4XL;

    a {
      margin-right: $SPACING_L;
    }
  }

  &__brand {
    display: block;
    max-width: 150px;
  }
}
</style>
