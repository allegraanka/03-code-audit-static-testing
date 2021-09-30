<template>
  <div class="stock-checker-stockist">
    <div class="stock-checker-stockist__icon">
      <icon-pin />
    </div>

    <div class="stock-checker-stockist__body">
      <div class="stock-checker-stockist__header">
        <span v-if="name" class="stock-checker-stockist__attribute body-1">
          {{ name }}
        </span>

        <span v-if="available" class="stock-checker-stockist__status body-1">
          <icon-tick />
          In Stock
        </span>
      </div>

      <span v-if="address" class="stock-checker-stockist__attribute body-1">
        {{ address }}
      </span>

      <span v-if="phone" class="stock-checker-stockist__attribute body-1">
        {{ phone }}
      </span>

      <div class="stock-checker-stockist__footer">
        <span v-if="miles" class="stock-checker-stockist__attribute body-1">
          {{ miles }} miles
        </span>

        <a
          v-if="directions"
          class="stock-checker-stockist__attribute body-1"
          :href="directions"
        >
          Get directions
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import IconPin from '@/assets/icons/misc-pin.svg?inline'
import IconTick from '@/assets/icons/misc-tick.svg?inline'

export default {
  components: {
    IconPin,
    IconTick
  },

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
  },

  computed: {
    /**
     * Returns the directions link.
     * @returns {string|null} - The link.
     */
    directions() {
      return this.origin && this.address
        ? `https://www.google.com/maps/dir/?api=1&origin=${this.origin}&destination=${this.address}`
        : null
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
      margin-right: 1.25rem;

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
