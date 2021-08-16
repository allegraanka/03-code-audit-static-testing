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

    <div class="cart-drawer__footer">
      <button @click.prevent="goToCheckout">
        Go to checkout
      </button>
    </div>
  </drawer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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
  },

  methods: {

    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      goToCheckout: 'cart/goToCheckout'
    })
  }
}
</script>
