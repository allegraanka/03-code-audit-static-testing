<template>
  <div v-if="lineItem.product" class="line-item" :class="classes">
    <a class="line-item__thumbnail" :href="`/products/${lineItem.handle}`">
      <img
        :src="lineItem.product.featuredMedia.src"
        :alt="lineItem.product.title"
      />
    </a>

    <div class="line-item__details">
      <div class="line-item__content">
        <p class="line-item__vendor body-2">{{ lineItem.product.vendor }}</p>

        <a
          class="line-item__title body-1"
          :href="`/products/${lineItem.handle}`"
        >
          {{ productTitle }}
        </a>

        <p v-if="variant" class="line-item__variant-title body-2">
          {{ variant.title }}
        </p>
      </div>

      <div v-if="variant" class="line-item__price body-2">
        £{{ variant.price }}
        <s v-if="isOnSale">£{{ variant.compareAtPrice }}</s>
      </div>

      <div class="line-item__quantity">
        <quantity-selector />
      </div>

      <button class="line-item__remove" @click.prevent="handleRemoveEvent">
        Remove
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import QuantitySelector from '~/components/QuantitySelector'

export default {
  components: {
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
      product: false
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
      return this.lineItem.product.variants.find(
        (item) => item.id === this.lineItem.variantId
      )
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
     * @returns {boolean} - If the item is on sale.
     */
    isOnSale() {
      if (!this.variant?.compareAtPrice) {
        return false
      }

      return Number(this.variant?.compareAtPrice) > Number(this.variant?.price)
    },

    /**
     * Returns the dynamic classes.
     * @returns {object} - The classes.
     */
    classes() {
      return {
        'line-item--sale': this.isOnSale
      }
    }
  },

  watch: {
    $props: {
      immediate: true,

      handler() {
        this.validateProps()
      }
    }
  },

  mounted() {
    if (this.shouldFetch) {
      this.fetchLineItemProduct()
    }
  },

  methods: {
    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      addProductToLineItem: 'cart/addProductToItem',
      removeItemFromCart: 'cart/removeItem'
    }),

    /**
     * Returns if the required properties exist.
     */
    validateProps() {
      if (this.item.handle || this.item.product) {
        return
      }

      throw Error('Please provide either a handle or product object.')
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

  &__details {
    display: grid;
    grid-auto-rows: max-content;
    grid-template-columns: 2fr 1fr;
    margin: 0 0 0 $SPACING_M;
  }

  &__content {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    margin-bottom: 0.8rem;
  }

  &__vendor,
  &__vendor.body-2 {
    color: $COLOR_TEXT_SECONDARY;
    margin-bottom: $SPACING_3XS;
  }

  &__title {
    color: $COLOR_TEXT_PRIMARY;
    margin-bottom: $SPACING_3XS;
  }

  &__price {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    text-align: right;
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

  &__remove {
    @include button-reset;
    cursor: pointer;
    font-size: ms(-2);
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    text-align: right;
    text-decoration: underline;
  }

  &#{&}--sale {
    #{$parent}__price {
      color: $COLOR_SUPPORT_ERROR;

      s {
        color: $COLOR_TEXT_PRIMARY;
        display: block;
      }
    }
  }
}
</style>
