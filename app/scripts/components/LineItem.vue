<template>
  <div v-if="lineItem.product" class="line-item">
    <nuxt-link
      class="line-item__thumbnail"
      :to="`/products/${lineItem.handle}`"
    >
      <responsive-image
        v-if="lineItem.product && lineItem.product.featuredMedia"
        :src="lineItem.product.featuredMedia.src"
        :alt="lineItem.product.title"
        source="shopify"
      />
    </nuxt-link>

    <div class="line-item__details">
      <div class="line-item__content">
        <p class="line-item__vendor body-2">{{ lineItem.product.vendor }}</p>

        <nuxt-link
          class="line-item__title body-1"
          :to="`/products/${lineItem.handle}`"
        >
          {{ productTitle }}
        </nuxt-link>

        <div v-if="variant" class="line-item__selected-options">
          <span
            v-for="option in variant.selectedOptions"
            :key="option.name"
            class="body-2"
          >
            <template v-if="option.name === 'Size'">
              {{ $t('cart.lineItem.size') }}
            </template>

            {{ option.value }}
          </span>
        </div>
      </div>

      <div
        v-if="variant"
        class="line-item__price h6"
        :class="{ 'line-item__price--sale': isOnSale }"
      >
        <span>{{ formatPrice(variant.price) }}</span>

        <s v-if="isOnSale">
          {{ formatPrice(variant.compareAtPrice) }}
        </s>
      </div>

      <div class="line-item__quantity">
        <quantity-selector v-model="quantity" />
      </div>

      <button
        class="line-item__remove body-2"
        @click.prevent="handleRemoveEvent"
      >
        {{ $t('cart.lineItem.remove') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import ResponsiveImage from '~/components/ResponsiveImage'
import QuantitySelector from '~/components/QuantitySelector'

import { formatPrice } from '~/helpers/utils'

export default {
  components: {
    ResponsiveImage,
    QuantitySelector
  },

  props: {
    item: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },

  data() {
    return {
      properties: ['title', 'featuredMedia'],
      product: false,
      quantity: this.item.quantity || 1
    }
  },

  computed: {
    /**
     * Decides if the line item requires a fetch for data.
     * - The `item.product` object should have all required properties.
     *
     * @returns {boolean} - The fetch decision.
     */
    shouldFetch() {
      /**
       * If no product data exists at all, fetch.
       */
      if (!this.item.product) {
        return true
      }

      /**
       * If the item wasn't added today, re-fetch.
       */
      const added = new Date(this.item.timestamp).setHours(0, 0, 0, 0)
      const now = new Date().setHours(0, 0, 0, 0)

      if (added !== now) {
        return true
      }

      /**
       * If the product data doesn't have the required properties, re-fetch.
       */
      let hasAllRequiredProperties = true

      this.properties.forEach((property) => {
        if (!this.item.product[property]) {
          hasAllRequiredProperties = false
        }
      })

      return !hasAllRequiredProperties
    },

    /**
     * Returns the final line item object.
     * - If fetched product data exists, use that.
     *
     * @returns {object} - The line item object.
     */
    lineItem() {
      const { product, ...rest } = this.item

      return {
        product: this.product || product,
        ...rest
      }
    },

    /**
     * Returns the variant object for the line item.
     * @returns {object} - The variant object.
     */
    variant() {
      const variant = this.lineItem.product.variants.find(
        (item) => item.id === this.lineItem.variantId
      )

      if (variant) {
        const { price, compareAtPrice, ...rest } = variant

        return {
          price: Number(price),
          compareAtPrice: Number(compareAtPrice),
          ...rest
        }
      }

      return null
    },

    /**
     * Formats and returns the product title.
     * @returns {string} - The product title.
     */
    productTitle() {
      return this.lineItem.product.title.split(' - ')[0]
    },

    /**
     * Returns if the variant is on sale.
     * @returns {boolean} - The sale state.
     */
    isOnSale() {
      return (
        this.variant &&
        this.variant.compareAtPrice &&
        this.variant.compareAtPrice > this.variant.price
      )
    }
  },

  watch: {
    $props: {
      immediate: true,

      handler() {
        this.validateProps()
      }
    },

    /**
     * Watches for changes to the quantity.
     * - Updates the cart state on change.
     *
     * @param {number} value - The quantity value.
     */
    quantity(value) {
      this.setItemQuantity({
        cartItemId: this.item.cartItemId,
        quantity: value
      })
    }
  },

  mounted() {
    if (this.shouldFetch) {
      this.fetchLineItemProduct()
    }
  },

  methods: {
    formatPrice,

    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      addProductToLineItem: 'cart/addProductToItem',
      removeItemFromCart: 'cart/removeItem',
      setItemQuantity: 'cart/setItemQuantity'
    }),

    /**
     * Returns if the required properties exist.
     */
    validateProps() {
      if (this.item.handle || this.item.product) {
        return
      }

      throw Error(this.$t('cart.lineItem.invalidProps'))
    },

    /**
     * Fetches the line item product data.
     */
    async fetchLineItemProduct() {
      const product = await this.$nacelle.productByHandle(this.item.handle)

      if (product) {
        this.product = product

        /**
         * Caches the product on the line item.
         */
        this.addProductToLineItem({
          cartItemId: this.item.cartItemId,
          product
        })
      }
    },

    /**
     * Handles the click event on the remove button.
     */
    handleRemoveEvent() {
      this.removeItemFromCart(this.item.cartItemId)
    }
  }
}
</script>

<style lang="scss">
.line-item {
  $parent: &;
  display: grid;
  grid-template-columns: 76px 2fr;

  &__thumbnail {
    background-color: $COLOR_BACKGROUND_WHITE;
    border: 1px solid $COLOR_BORDER_LIGHT;
    height: 76px;
    overflow: hidden;

    .responsive-image {
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
  }

  &__details {
    display: grid;
    grid-auto-rows: max-content;
    grid-template-columns: 2fr 1fr;
    margin: ($SPACING_M * 0.625) 0 0 $SPACING_M;
  }

  &__content {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    margin-bottom: ($SPACING_M * 0.8);
  }

  &__vendor,
  &__vendor.body-2 {
    color: $COLOR_TEXT_SECONDARY;
    margin-bottom: $SPACING_3XS;
  }

  &__title,
  a#{&}__title.body-1 {
    color: $COLOR_TEXT_PRIMARY;
    margin-bottom: $SPACING_3XS;
    text-decoration: none;
  }

  &__price {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    margin-top: $SPACING_L;
    text-align: right;

    s {
      color: $COLOR_SALE;
      display: block;
      margin-top: $SPACING_3XS;
    }

    &#{&}--sale {
      span {
        color: $COLOR_TEXT_LIGHT;
        font-size: ms(-1);
      }
    }
  }

  &__variant-title {
    color: $COLOR_TEXT_SECONDARY;
  }

  &__quantity {
    grid-column: 1 / 2;
    grid-row: 2 / 3;

    .quantity-selector {
      max-width: 100px;
    }
  }

  &__remove,
  &__remove.body-2 {
    @include button-reset;
    cursor: pointer;
    font-size: ms(-1);
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    text-align: right;
    text-decoration: underline;
  }

  &__selected-options {
    align-items: center;
    color: $COLOR_TEXT_LIGHT;
    display: flex;
    flex-flow: row wrap;

    span {
      align-items: center;
      display: flex;
      margin-bottom: 0;
      margin-right: $SPACING_XS;

      &:not(:last-child) {
        &::after {
          background-color: $COLOR_BORDER_LIGHT;
          content: '';
          display: inline-block;
          height: 14px;
          margin-left: $SPACING_XS;
          width: 1px;
        }
      }
    }
  }

  @include mq($from: large) {
    grid-template-columns: 126px 2fr;

    &__thumbnail {
      height: 126px;
    }

    &__details {
      margin-left: $SPACING_XL;
    }

    &__remove,
    &__remove.body-2 {
      font-size: ms(0);
    }
  }
}
</style>
