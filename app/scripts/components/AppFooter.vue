<template>
  <footer class="app-footer">
    <app-footer-contact-details :contact-details="contactDetails" />
    <app-footer-menu :content="content" :menu-items="menuItems" />
    <app-footer-footnote :content="content" />
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
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    /**
     * Returns the main menu items.
     * @returns {Array} - The menu items.
     */
    menuItems() {
      return this.content.menu?.items || []
    },

    /**
     * Returns the contact details.
     * @returns {object} - The contact details object.
     */
    contactDetails() {
      return this.content.contactDetails || {}
    }
  }
}
</script>
