<template functional>
  <div class="stock-checker-stockist">
    <div class="stock-checker-stockist__icon">
      <icon-pin />
    </div>

    <div class="stock-checker-stockist__body">
      <div class="stock-checker-stockist__header">
        <span
          v-if="props.name"
          class="stock-checker-stockist__attribute body-1"
        >
          {{ props.name }}
        </span>

        <span
          v-if="props.available"
          class="stock-checker-stockist__status body-1"
        >
          <icon-tick />
          {{ parent.$t('product.stockChecker.available') }}
        </span>
      </div>

      <span
        v-if="props.address"
        class="stock-checker-stockist__attribute body-1"
      >
        {{ props.address }}
      </span>

      <span v-if="props.phone" class="stock-checker-stockist__attribute body-1">
        {{ props.phone }}
      </span>

      <div class="stock-checker-stockist__footer">
        <span
          v-if="props.miles"
          class="stock-checker-stockist__attribute body-1"
        >
          {{
            parent.$tc('product.stockChecker.miles', 1, { miles: props.miles })
          }}
        </span>

        <a
          v-if="props.origin && props.address"
          class="stock-checker-stockist__attribute body-1"
          :href="`https://www.google.com/maps/dir/?api=1&origin=${props.origin}&destination=${props.address}`"
          target="_blank"
        >
          {{ parent.$t('product.stockChecker.directions') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import IconPin from '@/assets/icons/misc-pin.svg?inline'
import IconTick from '@/assets/icons/misc-tick.svg?inline'

Vue.component('IconPin', IconPin)
Vue.component('IconTick', IconTick)

export default {
  props: {
    name: {
      type: String,
      default: null
    },

    address: {
      type: String,
      default: null
    },

    phone: {
      type: String,
      default: null
    },

    available: {
      type: Boolean,
      default: false
    },

    miles: {
      type: [Number, String],
      default: null
    },

    origin: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">
.stock-checker-stockist {
  $parent: &;
  display: flex;

  &__icon {
    color: $COLOR_PRIMARY;
    margin-right: $SPACING_S;
  }

  &__body {
    margin-top: 1px;
    width: 100%;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    margin: 0 0 $SPACING_XS;

    #{$parent}__attribute,
    #{$parent}__attribute.body-1 {
      margin: 0;
    }
  }

  &__status {
    align-items: center;
    color: $COLOR_SUPPORT_SUCCESS;
    display: flex;

    .icon {
      height: 16px;
      margin-right: $SPACING_XS;
      width: 16px;
    }
  }

  &__attribute,
  &__attribute.body-1 {
    display: block;
    margin: 0 0 $SPACING_XS;
  }

  &__footer {
    color: $COLOR_TEXT_SECONDARY;
    display: flex;
    gap: $SPACING_M;

    #{$parent}__attribute,
    #{$parent}__attribute.body-1 {
      margin: 0;
    }

    a {
      color: inherit;
    }
  }

  @include mq($from: large) {
    &__icon {
      margin-right: ($SPACING_M + $SPACING_2XS);

      .icon {
        height: 32px;
        width: 32px;
      }
    }

    &__status {
      .icon {
        height: 20px;
        width: 20px;
      }
    }
  }
}
</style>
