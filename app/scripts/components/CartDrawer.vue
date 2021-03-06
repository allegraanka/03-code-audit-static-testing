<template>
  <drawer
    namespace="cart-drawer"
    :force-open="forceOpen"
    :close-label="$t('cart.close')"
  >
    <template #body>
      <div
        class="cart-drawer__header"
        :class="{
          'cart-drawer__header--has-shipping-banner': showShippingBanner
        }"
      >
        <h3 class="cart-drawer__title">
          {{ $t('cart.title') }}
        </h3>
      </div>

      <client-only>
        <shipping-banner
          v-if="showShippingBanner"
          :threshold="$settings.cart.freeShippingThreshold.threshold"
          :subtotal="cartSubtotal"
        />
      </client-only>

      <div class="cart-drawer__body">
        <template v-if="lineItems.length >= 1">
          <line-item
            v-for="(item, index) in transformedLineItems"
            :key="`cart-drawer-line-item-${item.cartItemId}-${index}-${item.quantity}`"
            :item="item"
            class="cart-drawer__item"
          />
        </template>

        <template v-else>
          <p class="cart-drawer__empty">
            {{ $t('cart.empty') }}
          </p>
        </template>
      </div>
    </template>

    <template v-if="lineItems.length >= 1" #footer>
      <div class="cart-drawer__footer">
        <div class="cart-drawer__totals">
          <div class="cart-drawer__total">
            <span class="subtitle-1">{{ $t('cart.totals.subtotal') }}:</span>
            <span class="h4">{{ formattedSubtotal }}</span>
          </div>

          <app-button block url="/cart">
            {{ $t('cart.link') }}
          </app-button>
        </div>

        <div class="cart-drawer__foot">
          <p class="caption">
            {{ $t('cart.disclaimer') }}
          </p>

          <div class="cart-drawer__payment-icons">
            <div
              v-for="icon in paymentIcons"
              :key="icon.name"
              class="cart-drawer__payment-icon"
            >
              <component :is="icon.component" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </drawer>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import AppButton from '~/components/AppButton'
import Drawer from '~/components/Drawer'

import { formatPrice } from '~/helpers/utils'

export default {
  components: {
    AppButton,
    Drawer,
    LineItem: () => import('~/components/LineItem'),
    ShippingBanner: () => import('~/components/ShippingBanner')
  },

  props: {
    items: {
      type: [Boolean, Array],
      default: false
    },

    subtotal: {
      type: Number,
      default: 0
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
      cartSubtotal: 'cart/subtotal'
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
      return formatPrice(this.cartSubtotal || this.subtotal)
    },

    /**
     * Check if the shipping banner should be shown.
     * - Checks that the free shipping threshold setting is greater than 0.
     * @returns {boolean} - Whether the shipping banner should be shown.
     */
    showShippingBanner() {
      return this.$settings.cart.freeShippingThreshold.threshold > 0
    },

    /**
     * Duplicates and reverses the line item array.
     * @returns {Array} - The line items.
     */
    transformedLineItems() {
      return [...this.lineItems].reverse()
    },

    /**
     * Returns the dynamically imported payment icon files.
     * @returns {Array} - The icon components.
     */
    paymentIcons() {
      return ['visa', 'mastercard', 'paypal', 'amazon-pay', 'amex'].map(
        (icon) => ({
          name: icon,
          component: () => import(`@/assets/icons/payment-${icon}.svg?inline`)
        })
      )
    }
  }
}
</script>

<style lang="scss">
.cart-drawer {
  &__header {
    border-bottom: 1px solid $COLOR_BORDER_LIGHT;
    padding-bottom: ($SPACING_M + $SPACING_2XS);

    &#{&}--has-shipping-banner {
      border-bottom: 0;
    }
  }

  &__title {
    margin: 0;
  }

  &__item {
    padding: $SPACING_L 0;

    &:not(:last-child) {
      border-bottom: 1px solid $COLOR_BORDER_LIGHT;
    }
  }

  &__footer {
    background-color: $COLOR_BACKGROUND_MID;
    box-shadow: 0 -2px 10px 0 rgba(0, 0, 0, 0.06);
    padding: $SPACING_M;
  }

  &__total {
    align-items: flex-start;
    display: flex;
    justify-content: space-between;
    margin-bottom: $SPACING_S;

    .h4 {
      margin: 0;
    }
  }

  &__empty {
    margin-top: $SPACING_L;
  }

  &__foot {
    align-items: center;
    color: $COLOR_TEXT_SECONDARY;
    display: flex;
    flex-direction: column;
    padding: $SPACING_S 0 0;
    text-align: center;
  }

  &__payment-icons {
    align-items: center;
    display: flex;
    flex-flow: row wrap;
    gap: $SPACING_S;
    justify-content: center;
    margin: -#{$SPACING_M} 0 $SPACING_2XS 0;
  }

  &__payment-icon {
    background-color: $COLOR_BACKGROUND_WHITE;
    display: flex;

    svg {
      height: 22px;
      width: auto;
    }
  }

  @include mq($from: large) {
    &__header {
      padding-bottom: $SPACING_XL;
    }

    &__footer {
      padding: $SPACING_XL $SPACING_3XL;
    }

    &__totals {
      align-items: flex-start;
      display: flex;
    }

    &__total {
      flex-direction: column;
      margin: 0;
      padding-right: 20%;
    }

    &__foot {
      align-items: flex-start;
      border-top: 1px solid $COLOR_BORDER_DARK;
      flex-direction: row;
      margin-top: $SPACING_L;
      padding-top: $SPACING_L;
      text-align: left;

      .caption {
        margin: 0;
      }
    }

    &__item {
      padding: $SPACING_XL 0;
    }

    &__payment-icons {
      flex: 0 0 63%;
      justify-content: flex-end;
      margin: 0;
    }

    &__payment-icon {
      svg {
        height: 16px;
      }
    }
  }
}
</style>
