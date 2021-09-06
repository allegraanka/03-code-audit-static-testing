<template>
  <div class="layout-default">
    <app-header :menu-items="menuItems" />

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
     * Returns the main menu items.
     * @returns {Array} - The menu items.
     */
    menuItems() {
      return this.$settings.header.menu?.items
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

    this.setCheckoutPreviewState()
  },

  methods: {
    /**
     * Looks for theme preview parameters and handles.
     * - Sets cookies for use when redirecting to checkout.
     */
    setCheckoutPreviewState() {
      const expires = new Date()
      const previewId = this.$route.query.preview_theme_id
      const checkoutUpgradePreview = this.$route.query.preview_checkout_version

      expires.setDate(expires.getDate() + 2)

      if (previewId) {
        this.$cookies.set('preview_theme_id', previewId, { expires })
      }

      if (checkoutUpgradePreview) {
        this.$cookies.set('preview_checkout_version', checkoutUpgradePreview, {
          expires
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/app';
</style>
