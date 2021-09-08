<template>
  <div class="product-price">
    <span v-if="price">{{ formattedPrice }}</span>

    <s v-if="compareAt && compareAt > price" class="product-price__compare-at">
      {{ formattedCompareAt }}
    </s>
  </div>
</template>

<script>
import { formatPrice } from '~/helpers/utils'

export default {
  props: {
    price: {
      type: Number,
      default: null
    },
    compareAt: {
      type: Number,
      default: null
    }
  },

  computed: {
    /**
     * Returns the formatted price.
     * @returns {string} - The price.
     */
    formattedPrice() {
      return formatPrice(this.price)
    },

    /**
     * Returns the formatted price.
     * @returns {string} - The price.
     */
    formattedCompareAt() {
      return formatPrice(this.compareAt)
    }
  }
}
</script>

<style lang="scss">
.product-price {
  &__compare-at {
    color: $COLOR_SUPPORT_ERROR;
  }
}
</style>
