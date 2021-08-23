<template>
  <drawer namespace="cart-drawer" :force-open="forceOpen">
    <template #body>
      <line-item v-for="(item, index) in lineItems" :key="index" :item="item" />
    </template>

    <template #footer>
      <button @click.prevent="goToCheckout">Go to checkout</button>
    </template>
  </drawer>
</template>

<script>
import { mapActions, mapState } from 'vuex'

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
    ...mapState({
      cartItems: ({ cart }) => cart.items
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
  },

  methods: {
    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      goToCheckout: 'checkout/goToCheckout'
    })
  }
}
</script>
