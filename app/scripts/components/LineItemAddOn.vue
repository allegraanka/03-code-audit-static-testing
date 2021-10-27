<template>
  <div class="line-item-add-on">
    <div class="line-item-add-on__thumbnail">
      <responsive-image :src="thumbnailSrc" :alt="title" />
    </div>

    <div class="line-item-add-on__details">
      <span v-if="title" class="line-item-add-on__title body-2">
        {{ title }}
      </span>

      <button
        v-if="handle"
        class="line-item-add-on__link"
        @click.prevent="
          openDrawer({ namespace: 'imbox-modal', persist: ['cart-drawer'] })
        "
      >
        {{ $t('cart.addOn.link') }}
      </button>
    </div>

    <div class="line-item-add-on__actions">
      <span v-if="price" class="line-item-add-on__price body-serif">
        {{ $tc('cart.addOn.price', 1, { price: formatPrice(price) }) }}
      </span>

      <button class="line-item-add-on__remove" @click="$emit('remove')">
        {{ $t('cart.addOn.remove') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import ResponsiveImage from '~/components/ResponsiveImage'

import { formatPrice } from '~/helpers/utils'

export default {
  components: {
    ResponsiveImage
  },

  props: {
    thumbnailSrc: {
      type: String,
      default: ''
    },

    title: {
      type: String,
      default: ''
    },

    handle: {
      type: String,
      default: ''
    },

    price: {
      type: Number,
      default: null
    }
  },

  methods: {
    formatPrice,

    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      openDrawer: 'drawers/openDrawer'
    })
  }
}
</script>

<style lang="scss">
.line-item-add-on {
  display: flex;

  &__thumbnail {
    border: 1px solid $COLOR_BORDER_LIGHT;
    height: 56px;
    overflow: hidden;
    text-align: center;
    width: 56px;

    .responsive-image {
      padding: $SPACING_2XS;
      width: auto;
    }
  }

  &__details {
    flex-grow: 1;
    padding: $SPACING_XS 0 0 $SPACING_M;
  }

  &__title,
  &__title.body-2 {
    display: block;
    margin-bottom: $SPACING_2XS;
  }

  &__link {
    @include button-reset;
    color: $COLOR_TEXT_PRIMARY;
    display: block;
    font-size: ms(-1);
    text-decoration: underline;
  }

  &__actions {
    padding-top: $SPACING_XS;
    text-align: right;
  }

  &__price {
    display: block;
    margin-bottom: $SPACING_XS;
  }

  &__remove {
    @include button-reset;
    display: block;
    font-size: ms(-1);
    margin-left: auto;
    text-decoration: underline;
  }
}
</style>
