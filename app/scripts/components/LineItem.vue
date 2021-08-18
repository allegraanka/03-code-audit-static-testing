<template>
  <div v-if="lineItem.product" class="line-item">
    <a class="line-item__thumbnail" :href="`/products/${lineItem.handle}`">
      <img
        :src="lineItem.product.featuredMedia.src"
        :alt="lineItem.product.title"
      />
    </a>

    <div class="line-item__details">
      <a class="line-item__title" :href="`/products/${lineItem.handle}`">
        {{ lineItem.product.title }}
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
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
      addProductToLineItem: 'cart/addProductToItem'
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
    }
  }
}
</script>

<style lang="scss">
.line-item {
  display: grid;
  grid-template-columns: 1fr 2fr;

  &__details {
    margin: $SPACING_M $SPACING_M 0 $SPACING_M;
  }
}
</style>
