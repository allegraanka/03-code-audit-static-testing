<template>
  <div class="layout-default">
    <app-header
      :announcement-items="settings.announcement && settings.announcement.items"
      :menu-items="mainMenu.links"
    />

    <nuxt />

    <app-footer />
    <cart-drawer />
    <menu-drawer />
    <window-overlay />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import AppFooter from '~/components/AppFooter'
import AppHeader from '~/components/AppHeader'
import CartDrawer from '~/components/CartDrawer'
import MenuDrawer from '~/components/MenuDrawer'
import WindowOverlay from '~/components/WindowOverlay'

export default {
  components: {
    AppFooter,
    AppHeader,
    CartDrawer,
    MenuDrawer,
    WindowOverlay
  },

  head() {
    return {
      title: this.settings.metadata.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.settings.metadata.description
        }
      ]
    }
  },

  computed: {
    /**
     * Maps the Vuex state.
     */
    ...mapState({
      lists: ({ navigation }) => navigation.lists,
      settings: ({ settings }) => settings.settings
    }),

    /**
     * Finds and returns the main menu.
     * @returns {object} - The main menu object.
     */
    mainMenu() {
      return this.lists.find(({ handle }) => handle === 'main-menu')
    }
  },

  mounted() {
    /**
     * Enable keyboard tabbing.
     */
    document.addEventListener('keydown', ({ keyCode }) => {
      if (keyCode !== 9) {
        return
      }

      document.body.classList.add('is-tabbable')
    })
  }
}
</script>

<style lang="scss">
@import '@/styles/app';
</style>
