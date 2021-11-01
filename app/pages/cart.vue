<template>
  <div class="cart">
    <div class="container">
      <div class="row">
        <div class="col col--left xs12 l7">
          <div class="cart__content">
            <h1 class="cart__title h2">{{ $t('cart.title') }}</h1>

            <shipping-banner
              v-if="$settings.cart.freeShippingThreshold.threshold > 0"
              :threshold="$settings.cart.freeShippingThreshold.threshold"
              :subtotal="cartSubtotal"
            />

            <div class="cart__items">
              <line-item
                v-for="(item, index) in transformedLineItems"
                :key="`cart-line-item-${item.cartItemId}-${index}`"
                :item="item"
                class="cart__item"
                wide
              />
            </div>

            <div
              v-if="
                $settings.cart.highlights &&
                $settings.cart.highlights.length > 0
              "
              class="cart__highlights"
            >
              <highlight-list :items="$settings.cart.highlights" />
            </div>
          </div>
        </div>

        <div class="col col--right xs12 l5">
          <div class="cart__summary">
            <h2 class="cart__summary-title">Order Summary</h2>

            <div class="cart__summary-item">
              <span class="body-1">{{ $t('cart.totals.subtotal') }}:</span>
              <span class="h6">{{ formattedSubtotal }}</span>
            </div>

            <div class="cart__summary-item">
              <span class="body-1">{{ $t('cart.delivery') }}:</span>
              <span class="body-1">{{ $t('cart.deliveryDisclaimer') }}</span>
            </div>

            <div class="cart__summary-border" />

            <div class="cart__summary-item cart__summary-item--total">
              <span class="subtitle-1">{{ $t('cart.totals.total') }}:</span>
              <span class="h4">{{ formattedSubtotal }}</span>
            </div>

            <app-button block url="/cart">
              {{ $t('cart.checkout') }}
            </app-button>

            <div class="cart__payment-icons">
              <div
                v-for="icon in paymentIcons"
                :key="icon.name"
                class="cart__payment-icon"
              >
                <component :is="icon.component" />
              </div>
            </div>

            <delivery-countdown class="cart__delivery-countdown" />

            <button
              v-for="detail in details"
              :key="detail.namespace"
              class="cart__summary-detail body-1 text-link"
              @click.prevent="openDrawer({ namespace: detail.namespace })"
            >
              {{ detail.title }}
            </button>
          </div>
          <div class="cart__summary-background" />
        </div>
      </div>
    </div>

    <product-details
      v-for="detail in details"
      :key="detail.namespace"
      :title="detail.title"
      :namespace="detail.namespace"
      :content="detail.content"
      :highlights="detail.highlights"
      :specifications="detail.specifications"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

import AppButton from '~/components/AppButton'
import DeliveryCountdown from '~/components/DeliveryCountdown'
import LineItem from '~/components/LineItem'
import ProductDetails from '~/components/ProductDetails'
import ShippingBanner from '~/components/ShippingBanner'
import HighlightList from '~/components/HighlightList'

import { formatPrice } from '~/helpers/utils'

export default {
  components: {
    AppButton,
    DeliveryCountdown,
    LineItem,
    ProductDetails,
    ShippingBanner,
    HighlightList
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
    },

    /**
     * Returns the detail tabs with content.
     * @returns {Array} - The details.
     */
    details() {
      return [
        {
          title: this.$t('product.delivery'),
          namespace: 'product-delivery',
          highlights: this.$settings.product.deliveryContent?.highlights,
          content: this.$settings.product.deliveryContent?.content
        },
        {
          title: this.$t('product.returns'),
          namespace: 'product-returns',
          content: this.$settings.product.returnsContent
        },
        {
          title: this.$t('cart.customerService'),
          namespace: 'customer-service',
          // TODO: Reference corresponding content
          content: null
        }
      ]
    }
  },

  methods: {
    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      openDrawer: 'drawers/openDrawer'
    })
  }
}
</script>

<style lang="scss">
.cart {
  h1,
  h2 {
    margin-top: 0;
  }

  &__summary-background {
    background-color: $COLOR_BACKGROUND_MID;
  }

  &__content {
    padding-top: $SPACING_L;
  }

  &__highlights {
    border-top: 1px solid $COLOR_BORDER_LIGHT;
    padding: $SPACING_L 0;
  }

  &__item {
    padding: $SPACING_XL 0;

    @include mq($until: large) {
      &:first-child {
        padding-top: $SPACING_L;
      }
    }

    &:not(:last-child) {
      border-bottom: 1px solid $COLOR_BORDER_LIGHT;
    }
  }

  &__delivery-countdown {
    background-color: $COLOR_BACKGROUND_WHITE;
    margin: $SPACING_L 0;
  }

  @include mq($until: large) {
    &__summary {
      background-color: $COLOR_BACKGROUND_MID;
      margin-left: -$GUTTER_WIDTH;
      margin-right: -$GUTTER_WIDTH;
      padding: $SPACING_XL $SPACING_M;
    }
  }

  &__title {
    margin-bottom: $SPACING_M;
  }

  &__summary-title {
    margin-bottom: $SPACING_M;
  }

  &__summary-item {
    display: flex;
    justify-content: space-between;

    &--total {
      margin-top: $SPACING_M;
    }
  }

  &__summary-border {
    border-bottom: 1px solid $COLOR_BORDER_DARK;
  }

  &__payment-icons {
    display: flex;
    justify-content: center;
    margin: $SPACING_L 0;
  }

  &__payment-icon {
    background-color: $COLOR_BACKGROUND_WHITE;
    display: flex;

    &:not(:last-of-type) {
      margin-right: $SPACING_S;
    }

    svg {
      height: 22px;
      width: auto;
    }
  }

  &__summary-detail,
  &__summary-details.text-link {
    @include button-reset;
    color: $COLOR_TEXT_PRIMARY;
    display: block;

    &:not(:last-of-type) {
      margin-bottom: $SPACING_S;
    }
  }

  @include mq($from: large) {
    overflow-x: hidden;

    .col--left.col {
      padding-right: 0;
    }

    .col--right.col {
      padding-left: 0;
      position: relative;
    }

    &__content {
      margin-right: $LAYOUT_L;
      margin-top: $LAYOUT_M;
    }

    &__summary {
      padding: $LAYOUT_M 0 $LAYOUT_M $LAYOUT_L;
    }

    &__summary-background {
      height: 100%;
      position: absolute;
      top: 0;
      width: 100vw;
      z-index: -1;
    }

    &__title {
      margin-bottom: $SPACING_M + $SPACING_2XS;
    }

    &__payment-icon {
      svg {
        height: 16px;
      }
    }

    &__delivery-countdown {
      margin-bottom: $SPACING_2XL;
    }
  }
}
</style>
