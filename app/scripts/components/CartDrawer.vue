<template>
  <drawer namespace="cart-drawer" :force-open="forceOpen">
    <template #body>
      <div class="cart-drawer__header">
        <h3 class="cart-drawer__title">My Basket</h3>
      </div>

      <div class="cart-drawer__body">
        <template v-if="lineItems.length >= 1">
          <line-item
            v-for="(item, index) in lineItems"
            :key="index"
            :item="item"
            class="cart-drawer__item"
          />
        </template>

        <template v-else>
          <p class="cart-drawer__empty">Your cart is currently empty.</p>
        </template>
      </div>
    </template>

    <template v-if="lineItems.length >= 1" #footer>
      <div class="cart-drawer__footer">
        <div class="cart-drawer__total">
          <span class="subtitle-1">Subtotal:</span>
          <span class="subtitle-1">{{ formattedSubtotal }}</span>
        </div>

        <app-button block @click.native.prevent="goToCheckout">
          Review &amp; checkout
        </app-button>
      </div>
    </template>
  </drawer>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

import AppButton from '~/components/AppButton'
import Drawer from '~/components/Drawer'
import LineItem from '~/components/LineItem'

export default {
  components: {
    AppButton,
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
     * Maps the Vuex state.
     */
    ...mapState({
      cartItems: ({ cart }) => cart.items
    }),

    /**
     * Maps the Vuex getters.
     */
    ...mapGetters({
      subtotal: 'cart/subtotal'
    }),

    /**
     * Returns the transformed line items.
     * @returns {Array} - The line items array.
     */
    lineItems() {
      return this.items && Array.isArray(this.items)
        ? this.items
        : this.cartItems
    },

    /**
     * Formats the subtotal for the front-end.
     * @returns {string} - The subtotal with currency.
     */
    formattedSubtotal() {
      return this.subtotal
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

<style lang="scss">
.cart-drawer {
  &__header {
    border-bottom: 1px solid $COLOR_BORDER_LIGHT;
    margin: 0 auto;
    padding: $SPACING_XL 0;
    width: calc(100% - #{$SPACING_XL * 2});
  }

  &__title {
    margin: 0;
  }

  &__body {
    margin: 0 auto;
    width: calc(100% - #{$SPACING_XL * 2});
  }

  &__item {
    padding: $SPACING_XL 0;

    &:not(:last-child) {
      border-bottom: 1px solid $COLOR_BORDER_LIGHT;
    }
  }

  &__footer {
    box-shadow: 0 -1px 0 $COLOR_BORDER_DARK;
    padding: $SPACING_XL $SPACING_L $SPACING_L;
  }

  &__total {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: $SPACING_L;
  }

  &__empty {
    margin-top: $SPACING_L;
  }
}
</style>
