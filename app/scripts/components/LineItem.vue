<template>
  <div
    v-if="lineItem.product"
    class="line-item"
    :class="{ 'line-item--wide': wide }"
  >
    <div class="line-item__container">
      <nuxt-link
        class="line-item__thumbnail"
        :to="`/products/${lineItem.handle}`"
      >
        <responsive-image
          v-if="media"
          :src="media"
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

        <div class="line-item__notices">
          <span
            v-for="(notice, index) in notices"
            :key="notice.content"
            class="line-item__notice"
            :class="{
              [`line-item__notice--${notice.modifier}`]: notice.modifier
            }"
          >
            <span v-html="notice.content" />
            <br v-if="index < notices.length - 1" />
          </span>
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

    <div class="line-item__add-on">
      <line-item-add-on
        v-if="item.sibling"
        :title="item.sibling.title"
        :thumbnail-src="item.sibling.featuredMedia.src"
        :handle="item.sibling.handle"
        :price="Number(item.sibling.variants[0].price)"
        :wide="wide"
        @remove="handleAddOnRemove"
      />

      <item-add-on
        v-else-if="
          showItemAddOn && $settings.product && $settings.product.itemAddOn
        "
        v-model="sibling"
        :label="$settings.product.itemAddOn.label"
        :label-added="$settings.product.itemAddOn.addedLabel"
        :content="$settings.product.itemAddOn.details"
        :namespace="`line-item-${item.cartItemId}`"
        :wide="wide"
        small
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import LineItemAddOn from '~/components/LineItemAddOn'
import ResponsiveImage from '~/components/ResponsiveImage'
import QuantitySelector from '~/components/QuantitySelector'

import { formatPrice } from '~/helpers/utils'

export default {
  components: {
    ItemAddOn: () => import('~/components/ItemAddOn'),
    LineItemAddOn,
    ResponsiveImage,
    QuantitySelector
  },

  props: {
    item: {
      type: Object,
      default: () => ({}),
      required: true
    },

    wide: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      properties: ['title', 'featuredMedia'],
      product: this.item.product || false,
      quantity: this.item.quantity || 1,
      sibling: false
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
    },

    /**
     * Returns if the product add on should show for this item.
     * - Will show if false and already added to the parent line item.
     *
     * @returns {boolean} - The add on state.
     */
    showItemAddOn() {
      return this.$nacelle.helpers.findMetafield(
        this.variant.metafields || this.product.metafields,
        'global.imbox'
      )
    },

    /**
     * Returns the back order date metafield value.
     * @returns {string|null} - The back order date string.
     */
    backOrderDate() {
      const metafields = this.variant?.metafields || this.product.metafields

      return this.$nacelle.helpers.findMetafield(
        metafields,
        'global.backorderdate'
      )
    },

    /**
     * Returns if the product has no inventory.
     * - Note that the product could be back-ordered.
     *
     * @returns {boolean} - The out of stock state.
     */
    outOfStock() {
      return (
        [0, null].indexOf(this.variant?.quantityAvailable) > -1 &&
        !!this.backOrderDate
      )
    },

    /**
     * Returns the promotion field.
     * @returns {string|null} - The promotion.
     */
    promotion() {
      return this.$nacelle.helpers.findMetafield(
        this.product?.metafields,
        'product.promotion'
      )
    },

    /**
     * Builds an array of notices for the line item.
     * @returns {Array} - The array of notices.
     */
    notices() {
      const notices = []

      if (this.outOfStock && this.backOrderDate) {
        notices.push({
          content: `
            <strong>${this.$t('cart.lineItem.backOrder')}</strong>
            ${this.$tc('cart.lineItem.estimatedDelivery', 1, {
              date: this.backOrderDate
            })}
          `
        })
      }

      if (this.promotion) {
        notices.push({
          modifier: 'green',
          content: this.promotion
        })
      }

      return notices
    },

    /**
     * Returns the image source for the selected variant.
     * @returns {string} - The image source.
     */
    media() {
      if (this.variant && this.variant.featuredMedia) {
        return this.variant.featuredMedia.src
      }

      return this.product.featuredMedia.src
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
    },

    /**
     * Handles the add-on select event.
     * @param {object} sibling - The sibling product.
     */
    sibling(sibling) {
      if (sibling) {
        this.addSiblingToLineItem({
          cartItemId: this.item.cartItemId,
          sibling
        })
        return
      }

      this.removeSiblingFromLineItem(this.item.cartItemId)
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
      setItemQuantity: 'cart/setItemQuantity',
      addSiblingToLineItem: 'cart/addSiblingToItem',
      removeSiblingFromLineItem: 'cart/removeSiblingFromItem'
    }),

    /**
     * Returns if the required properties exist.
     */
    validateProps() {
      if (this.item.handle || this.item.product) {
        return
      }

      throw Error(this.$t('cart.lineItem.errors.handleOrProduct'))
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
    },

    /**
     * Handles the add on remove event.
     * - Sets the local checkbox state + removes sibling from state.
     */
    handleAddOnRemove() {
      this.sibling = false
      this.removeSiblingFromLineItem(this.item.cartItemId)
    }
  }
}
</script>

<style lang="scss">
.line-item {
  $parent: &;

  &__container {
    display: grid;
    grid-template-columns: 76px 2fr;
    width: 100%;
  }

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

  &__notices {
    grid-column: 1 / 3;
    grid-row: 2 / 3;
    margin-bottom: $SPACING_XS;
    margin-top: -$SPACING_XS;
  }

  &__notice {
    color: $COLOR_PRIMARY;
    font-size: ms(-1);
    letter-spacing: $LETTER_SPACING_SUBTITLE;
    line-height: $LINE_HEIGHT_BODY;

    &#{&}--green {
      color: $COLOR_SUPPORT_SUCCESS;
    }
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
    grid-row: 3 / 4;

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
    grid-row: 3 / 4;
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

  &__add-on {
    padding: $SPACING_L 0 0 $SPACING_M;

    &:empty {
      display: none;
    }
  }

  &#{&}--wide {
    #{$parent}__details {
      margin-top: 0;
    }
  }

  @include mq($from: large) {
    &__container {
      grid-template-columns: 126px 2fr;
    }

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

    &__add-on {
      padding: $SPACING_L 0 0 $SPACING_L;
    }

    &#{&}--wide {
      #{$parent}__container {
        grid-template-columns: 92px 2fr;
      }

      #{$parent}__thumbnail {
        height: 92px;
      }

      #{$parent}__details {
        grid-template-columns: 3fr 1fr 1fr 1fr;
        margin-left: $SPACING_M;
      }

      #{$parent}__quantity {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
        margin-top: $SPACING_M;
      }

      #{$parent}__price {
        grid-column: 3 / 4;
        grid-row: 1 / 2;
      }

      #{$parent}__remove {
        align-self: start;
        grid-column: 4 / 5;
        grid-row: 1 / 2;
        margin-top: ($SPACING_M + $SPACING_2XS);
      }
    }
  }
}
</style>
