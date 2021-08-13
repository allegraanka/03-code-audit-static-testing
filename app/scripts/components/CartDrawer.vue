<template>
  <drawer
    namespace="cart-drawer"
    :force-open="forceOpen"
  >
    <line-item
      v-for="(item, index) in lineItems"
      :key="index"
      :item="item"
    />
  </drawer>
</template>

<script>
import { mapGetters } from 'vuex'

import Drawer from '~/components/Drawer'
import LineItem from '~/components/LineItem'

export default {
  components: {
    Drawer,
    LineItem
  },

  props: {
    items: {
      type: [Boolean, Array],
      default: false
    },

    forceOpen: {
      type: Boolean,
      default: false
    }
  },

  computed: {

    /**
     * Maps the Vuex getters.
     */
    ...mapGetters({
      cartItems: 'cart/items'
    }),

    /**
     * Returns the transformed line items.
     * @returns {Array} - The line items array.
     */
    lineItems() {
      return this.items && Array.isArray(this.items)
        ? this.items
        : this.cartItems
    }
  }
}
</script>
