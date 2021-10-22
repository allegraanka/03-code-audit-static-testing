<template functional>
  <div class="shipping-banner">
    <icon-shipping v-if="props.threshold > props.subtotal" />
    <icon-tick v-else />

    <span class="shipping-banner__text subtitle-1">
      <template v-if="props.threshold > props.subtotal">
        {{
          parent.$tc('cart.freeShippingThreshold.message', 1, {
            remaining: $options.methods.formatPrice(
              props.threshold > props.subtotal
                ? props.threshold - props.subtotal
                : 0
            )
          })
        }}
      </template>

      <template v-else>
        {{ parent.$t('cart.freeShippingThreshold.reached') }}
      </template>
    </span>
  </div>
</template>

<script>
import Vue from 'vue'

import { formatPrice } from '~/helpers/utils'

import IconShipping from '@/assets/icons/misc-shipping.svg?inline'
import IconTick from '@/assets/icons/misc-tick.svg?inline'

Vue.component('IconShipping', IconShipping)
Vue.component('IconTick', IconTick)

export default {
  components: {
    IconShipping,
    IconTick
  },

  props: {
    subtotal: {
      type: Number,
      required: true
    },

    threshold: {
      type: Number,
      required: true
    }
  },

  methods: {
    formatPrice
  }
}
</script>

<style lang="scss">
.shipping-banner {
  align-items: center;
  background-color: $COLOR_BACKGROUND_LIGHT;
  display: flex;
  padding: $SPACING_S $SPACING_M;

  &__text {
    color: $COLOR_PRIMARY;
    margin-left: $SPACING_M;
  }

  .icon {
    color: $COLOR_PRIMARY;
  }
}
</style>
