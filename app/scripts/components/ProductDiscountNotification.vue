<template>
  <div class="product-discount-notification">
    <div class="product-discount-notification__inner">
      <div class="product-discount-notification__text">
        <div v-if="title" class="product-discount-notification__title">
          {{ title }}
        </div>
        <div v-if="subtitle" class="product-discount-notification__subtitle">
          {{ subtitle }}
        </div>
      </div>
      <div class="product-discount-notification__price">
        <span
          v-if="priceText"
          class="product-discount-notification__price-text"
        >
          {{ priceText }}
        </span>
        <span v-if="price" class="product-discount-notification__price-amount">
          {{ formatPrice(price) }}
        </span>
      </div>
    </div>
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
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    priceText: {
      type: String,
      default: ''
    }
  },
  methods: {
    formatPrice
  }
}
</script>

<style lang="scss">
.product-discount-notification {
  $parent: &;
  border: 1px solid $COLOR_SALE;
  display: flex;
  flex-flow: row wrap;
  font-size: ms(-1);
  margin-top: $SPACING_M;
  width: 100%;

  &__inner {
    display: flex;
    flex-flow: row nowrap;
    gap: $SPACING_3XS;
    justify-content: space-between;
    padding: $SPACING_S;
    width: 100%;
  }

  &__title {
    font-weight: $WEIGHT_MEDIUM;
  }

  &__text {
    display: flex;
    flex-flow: column wrap;
  }

  &__subtitle {
    color: $COLOR_TEXT_SECONDARY;
    white-space: nowrap;
  }

  &__price-text {
    color: $COLOR_TEXT_SECONDARY;
  }

  &__price-amount {
    color: $COLOR_TEXT_SECONDARY;
  }

  @include mq($from: wide) {
    &__inner {
      flex-flow: row wrap;
      gap: $SPACING_M;
      padding: $SPACING_M;
    }

    &__text {
      flex-flow: row wrap;
      gap: $SPACING_M;
    }
  }
}
</style>
