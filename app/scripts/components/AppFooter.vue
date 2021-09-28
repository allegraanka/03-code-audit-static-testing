<template>
  <footer class="app-footer">
    <app-footer-contact-details />
    <app-footer-menu :menu-items="menuItems" />
    <app-footer-footnote
      :copyright-notice="copyrightNotice"
      :policies="policies"
    />
  </footer>
</template>

<script>
import AppFooterContactDetails from '~/components/AppFooterContactDetails'
import AppFooterMenu from '~/components/AppFooterMenu'
import AppFooterFootnote from '~/components/AppFooterFootnote'

export default {
  components: {
    AppFooterContactDetails,
    AppFooterMenu,
    AppFooterFootnote
  },

  props: {
    content: {
      type: [Object, null],
      default: () => ({})
    }
  },

  computed: {
    /**
     * Returns the copyright notice.
     * @returns {string} - The copyright notice.
     */
    copyrightNotice() {
      return this.content.copyrightNotice
    },

    /**
     * Returns the policy links.
     * @returns {Array} - The policy links.
     */
    policies() {
      return this.content.linkList
    },

    /**
     * Returns the main menu items.
     * @returns {Array} - The menu items.
     */
    menuItems() {
      return this.content.menu?.items || []
    }
  }
}
</script>
