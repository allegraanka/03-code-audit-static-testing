<template>
  <div class="layout-default">
    <app-header />
    <nuxt />

    <app-footer />
    <cart-drawer />
    <window-overlay />
  </div>
</template>

<script>
import AppFooter from '~/components/AppFooter'
import AppHeader from '~/components/AppHeader'
import CartDrawer from '~/components/CartDrawer'
import WindowOverlay from '~/components/WindowOverlay'

export default {
  components: {
    AppFooter,
    AppHeader,
    CartDrawer,
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
