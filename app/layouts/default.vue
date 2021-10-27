<template>
  <div class="layout-default">
    <app-header
      :menu-items="menuItems"
      :announcement-items="announcementItems"
      :announcement-links="announcementLinks"
    />

    <nuxt />

    <app-footer />
    <cart-drawer />
    <menu-drawer />
    <window-overlay />
    <imbox-modal />
  </div>
</template>

<script>
import AppFooter from '~/components/AppFooter'
import AppHeader from '~/components/AppHeader'
import CartDrawer from '~/components/CartDrawer'
import MenuDrawer from '~/components/MenuDrawer'
import WindowOverlay from '~/components/WindowOverlay'
import ImboxModal from '~/components/ImboxModal'

import { getHead } from '~/helpers/metadata'

export default {
  components: {
    AppFooter,
    AppHeader,
    CartDrawer,
    ImboxModal,
    MenuDrawer,
    WindowOverlay
  },

  head() {
    const head = {
      ...getHead(this.$settings.seo.metadata),

      /**
       * Defines the app title template.
       * - If the chunk is the same as the base, just show one.
       *
       * @param {string} chunk - The part to insert.
       * @returns {string} - The title template.
       */
      titleTemplate(chunk) {
        const base = this.$settings.seo.metadata.title

        if (base === chunk) {
          return base
        }

        return `${chunk} | ${base}`
      }
    }

    /**
     * Adds the favicon from Sanity if defined.
     */
    if (this.$settings.seo.favicon) {
      head.link = [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: this.$settings.seo.favicon.asset.url
        }
      ]
    }

    return head
  },

  computed: {
    /**
     * Returns the main menu items.
     * @returns {Array} - The menu items.
     */
    menuItems() {
      return this.$settings.header.menuItems
    },

    /**
     * Returns the announcement bar items.
     * @returns {Array} - The announcement items.
     */
    announcementItems() {
      return this.$settings.header.announcementBar?.items
    },

    /**
     * Returns the announcement bar links.
     * @returns {Array} - The announcement links.
     */
    announcementLinks() {
      return this.$settings.header.announcementBar?.links
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
