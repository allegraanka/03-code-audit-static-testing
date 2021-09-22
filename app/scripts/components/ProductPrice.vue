<template>
  <div class="product-price" :class="classes">
    <h4 v-if="price" class="product-price__price">
      {{ formatPrice(price) }}
    </h4>

    <span v-if="compareAt && compareAt > price" class="product-price__compare">
      <span class="label">Was</span>
      <s>{{ formatPrice(compareAt) }}</s>
    </span>

    <span v-if="rrp" class="product-price__compare">
      <span class="label">RRP</span>
      <s>{{ formatPrice(rrp) }}</s>
    </span>
  </div>
</template>

<script>
import { formatPrice } from '~/helpers/utils'

export default {
  props: {
    price: {
      type: Number,
      required: true
    },

    compareAt: {
      type: Number,
      default: null
    },

    rrp: {
      type: Number,
      default: null
    }
  },

  computed: {
    /**
     * Returns dynamic classes.
     * @returns {object} - The classes.
     */
    classes() {
      return {
        'product-price--sale': this.compareAt && this.compareAt > this.price
      }
    }
  },

  methods: {
    formatPrice
  }
}
</script>

<style lang="scss">
.product-price {
  $parent: &;
  align-items: baseline;
  display: flex;
  gap: 0.875rem;

  &__price {
    margin: 0;
  }

  &__compare {
    color: $COLOR_TEXT_LIGHT;

    s {
      font-family: $FONT_HEADING;
    }
  }

  &#{&}--sale {
    #{$parent}__price {
      color: $COLOR_SALE;
    }
  }

  @include mq($from: large) {
    &__compare {
      s {
        font-size: ms(1);
      }
    }
  }
}
</style>
