<template functional>
  <div class="product-badges" :class="{ 'product-badges--small': props.small }">
    <responsive-image
      v-for="badge in props.badges"
      :key="badge.src"
      class="product-badges__badge"
      :src="badge.src"
      :max-width="72"
      :alt="badge.alt"
      fade
    />
  </div>
</template>

<script>
import Vue from 'vue'

import ResponsiveImage from '~/components/ResponsiveImage'

Vue.component('ResponsiveImage', ResponsiveImage)

export default {
  props: {
    badges: {
      type: Array,
      default: () => []
    },

    small: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.product-badges {
  $parent: &;
  @include gap($SPACING_XS);
  display: flex;
  flex-flow: row wrap;

  &__badge {
    width: 48px;
  }

  &#{&}--small {
    #{$parent}__badge {
      width: 32px;
    }
  }

  @include mq($from: large) {
    @include gap($SPACING_M);
    right: $SPACING_2XL;
    top: $SPACING_2XL;

    &__badge {
      width: 72px;
    }

    &#{&}--small {
      #{$parent}__badge {
        width: 49px;
      }
    }
  }
}
</style>
