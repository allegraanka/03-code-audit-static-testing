<template>
  <div class="layout-default">
    <app-header :menu-items="mainMenu.links" />

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
    const head = {
      meta: []
    }

    if (this.$settings.seo.metadata.title) {
      head.title = this.$settings.seo.metadata.title
    }

    if (this.$settings.seo.metadata.description) {
      head.meta.push({
        hid: 'description',
        name: 'description',
        content: this.$settings.seo.metadata.description
      })
    }

    return head
  },

  computed: {
    /**
     * Maps the Vuex state.
     */
    ...mapState({
      lists: ({ navigation }) => navigation.lists
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
