<template>
  <div class="cart">
    <div class="container">
      <div class="row no-margin-bottom">
        <template v-if="!hydrated">
          <div class="col xs10 push-xs1 l6 push-l3">
            <div class="cart__empty">
              <loader :height="50" :width="50" />
            </div>
          </div>
        </template>

        <template v-else-if="lineItems.length > 0">
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
              <h2 class="cart__summary-title">{{ $t('cart.summaryTitle') }}</h2>

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

              <delivery-countdown class="cart__delivery-countdown" light />

              <app-link
                v-for="link in links"
                :key="link.label"
                class="cart__summary-detail body-1 text-link"
                :href="link.url"
              >
                {{ link.label }}
              </app-link>
            </div>

            <div class="cart__summary-background" />
          </div>
        </template>

        <template v-else>
          <div class="col xs10 push-xs1 l6 push-l3">
            <div class="cart__empty">
              <h1>{{ $t('cart.titleShort') }}</h1>
              <p>{{ $t('cart.empty') }}</p>

              <app-button url="/">
                {{ $t('cart.continue') }}
              </app-button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import AppButton from '~/components/AppButton'
import AppLink from '~/components/AppLink'
import DeliveryCountdown from '~/components/DeliveryCountdown'
import LineItem from '~/components/LineItem'
import ShippingBanner from '~/components/ShippingBanner'
import HighlightList from '~/components/HighlightList'
import Loader from '~/components/Loader'

import { formatPrice } from '~/helpers/utils'

export default {
  components: {
    AppButton,
    AppLink,
    DeliveryCountdown,
    LineItem,
    ShippingBanner,
    HighlightList,
    Loader
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
      cartItems: ({ cart }) => cart.items,
      hydrated: ({ hydrated }) => hydrated
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
     * Returns the customer service links.
     * @returns {Array} - The links.
     */
    links() {
      return this.$settings?.cart?.links
    }
  }
}
</script>

<style lang="scss">
.cart {
  h1,
  h2 {
    margin-top: 0;
  }

  &__empty {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin: $LAYOUT_L 0;
    text-align: center;

    h1 {
      margin: 0 0 $SPACING_S;
    }

    p {
      margin: 0;
    }

    .button {
      margin-top: $SPACING_M;
    }
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
    margin: $SPACING_L 0;
  }

  @include mq($until: large) {
    &__summary {
      background-color: $COLOR_BACKGROUND_MID;
      margin-left: -$GUTTER_WIDTH;
      margin-right: -$GUTTER_WIDTH;
      padding: $SPACING_XL $SPACING_M;
    }

    &__highlights {
      padding-bottom: $SPACING_2XL;
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
  &__summary-detail.text-link {
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

    &__empty {
      margin: $LAYOUT_2XL 0;
    }

    &__content {
      margin-right: $LAYOUT_L;
      margin-top: $LAYOUT_M;
      padding-top: 0;
    }

    &__summary {
      padding: $LAYOUT_M 0 $LAYOUT_2XL $LAYOUT_L;
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

    &__highlights {
      padding: $SPACING_XL 0;

      .highlight-list__item {
        &:not(:last-child) {
          margin-bottom: ($SPACING_M + $SPACING_2XS);
        }
      }
    }
  }
}
</style>
