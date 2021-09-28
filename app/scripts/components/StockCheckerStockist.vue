<template>
  <div class="stock-checker-stockist">
    <div class="stock-checker-stockist__icon">
      <icon-pin />
    </div>

    <div class="stock-checker-stockist__body">
      <div class="stock-checker-stockist__header">
        <span class="stock-checker-stockist__attribute body-1">Store Name</span>

        <span class="stock-checker-stockist__status body-1">
          <icon-tick />
          In Stock
        </span>
      </div>

      <span class="stock-checker-stockist__attribute body-1">
        Address line 1, Town, City, Postcode
      </span>

      <span class="stock-checker-stockist__attribute body-1">
        01234 567890
      </span>

      <div class="stock-checker-stockist__footer">
        <span class="stock-checker-stockist__attribute body-1">0.6 miles</span>

        <nuxt-link class="stock-checker-stockist__attribute body-1" to="/">
          Get directions
        </nuxt-link>
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
