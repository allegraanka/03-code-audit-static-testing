<template>
  <div class="product-price" :class="classes">
    <h2 v-if="price" class="product-price__price h4">
      <span v-if="(tertiary && rrp) || (tertiary && compareAt)" class="label">
        {{ $t('product.price.now') }}
      </span>

      {{ formatPrice(price) }}
    </h2>

    <span v-if="compareAt && compareAt > price" class="product-price__compare">
      <span class="label">{{ $t('product.price.was') }}</span>
      <s>{{ formatPrice(compareAt) }}</s>
    </span>

    <span v-if="rrp" class="product-price__compare">
      <span class="label">{{ $t('product.price.rrp') }}</span>
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
    },

    secondary: {
      type: Boolean,
      default: false
    },

    tertiary: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    /**
     * Returns dynamic classes.
     * @returns {object} - The classes.
     */
    classes() {
      return {
        'product-price--sale':
          !this.secondary && this.compareAt && this.compareAt > this.price,
        'product-price--secondary': this.secondary,
        'product-price--tertiary': this.tertiary,
        'product-price--tertiary-simple':
          this.tertiary && !this.rrp && !this.compareAt
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
  color: $COLOR_TEXT_PRIMARY;
  display: flex;
  gap: ($SPACING_M * 0.875);

  &__price,
  &__price.h4 {
    margin: 0;
  }

  &__compare {
    color: $COLOR_TEXT_LIGHT;

    s {
      font-family: $FONT_HEADING;
    }
  }

  .label {
    text-transform: uppercase;
  }

  &#{&}--sale {
    #{$parent}__price {
      color: $COLOR_SALE;
    }
  }

  &#{&}--secondary {
    #{$parent}__price {
      @extend %h6;
      color: $COLOR_TEXT_LIGHT;
      margin: 0;
    }
  }

  &#{&}--tertiary {
    #{$parent}__price {
      font-size: ms(0);

      span {
        color: $COLOR_TEXT_LIGHT;
        display: block;
        font-family: $FONT_BODY;
        margin-bottom: $SPACING_3XS;
      }
    }

    #{$parent}__compare {
      display: flex;
      flex-direction: column;

      s {
        font-size: ms(-1);
      }

      span {
        margin-bottom: $SPACING_3XS;
      }
    }
  }

  &#{&}--tertiary-simple {
    #{$parent}__price {
      font-size: ms(-1);
    }
  }

  @include mq($from: large) {
    &__compare {
      s {
        font-size: ms(1);
      }
    }

    &#{&}--tertiary {
      gap: ($SPACING_M + $SPACING_2XS);

      #{$parent}__price {
        font-size: ms(1);

        span {
          margin-bottom: 0;
        }
      }

      #{$parent}__compare {
        s {
          font-size: ms(0);
        }
      }
    }

    &#{&}--tertiary-simple {
      #{$parent}__price {
        font-size: ms(0);
      }
    }
  }
}
</style>
