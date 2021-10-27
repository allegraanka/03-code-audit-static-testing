<template>
  <drawer namespace="imbox-modal" as-modal>
    <h3 v-if="settings && settings.title">{{ settings.title }}</h3>

    <rich-content
      v-if="settings && settings.content"
      :content="settings.content"
    />
  </drawer>
</template>

<script>
import Drawer from '~/components/Drawer'
import RichContent from '~/components/RichContent'

export default {
  components: {
    Drawer,
    RichContent
  },

  computed: {
    /**
     * Retruns the modal settings.
     * @returns {object} - The settings object.
     */
    settings() {
      return (
        this.$settings &&
        this.$settings.product &&
        this.$settings.product.itemAddOn &&
        this.$settings.product.itemAddOn.modal
      )
    }
  }
}
</script>
