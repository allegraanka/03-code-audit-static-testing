<template>
  <div class="layout-default">
    <app-header />
    <nuxt />

    <app-footer />
    <cart-drawer />
    <menu-drawer />
    <window-overlay />
  </div>
</template>

<script>
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
