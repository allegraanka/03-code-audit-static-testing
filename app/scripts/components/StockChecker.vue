<template>
  <drawer namespace="stock-checker">
    <template #body>
      <h3 class="stock-checker__title">In-Store Stock Checker</h3>

      <div class="stock-checker__product">
        <div v-if="productThumbnail" class="stock-checker__product-thumbnail">
          <img :src="productThumbnail" :alt="productTitle" />
        </div>

        <div class="stock-checker__product-details">
          <div
            v-if="productVendor"
            class="stock-checker__product-vendor body-1"
          >
            {{ productVendor }}
          </div>

          <div
            v-if="productTitle"
            class="stock-checker__product-title large-body"
          >
            {{ productTitle }}
          </div>
        </div>
      </div>

      <div class="stock-checker__options">
        <select
          v-for="option in options"
          :key="option.name"
          :name="option.name"
        >
          <option disabled>Select {{ option.name }}</option>

          <option
            v-for="value in option.values"
            :key="value"
            :value="value"
            :selected="
              selectedOptions && selectedOptions[option.name] === value
            "
          >
            {{ value }}
          </option>
        </select>
      </div>
    </template>
  </drawer>
</template>

<script>
import Drawer from '~/components/Drawer'

export default {
  components: {
    Drawer
  },

  props: {
    productThumbnail: {
      type: String,
      default: null
    },

    productVendor: {
      type: String,
      default: null
    },

    productTitle: {
      type: String,
      default: null
    },

    options: {
      type: Array,
      default: () => []
    },

    selectedOptions: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss">
.stock-checker {
  &__product {
    align-items: center;
    display: grid;
    gap: $SPACING_M;
    grid-template-columns: minmax(0, 70px) 2fr;
    margin-bottom: $SPACING_M;
  }

  &__product-thumbnail {
    border: 1px solid $COLOR_BORDER_LIGHT;
    height: 70px;
    overflow: hidden;

    img {
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
  }

  &__product-vendor {
    color: $COLOR_TEXT_LIGHT;
    margin-bottom: 1px;
  }

  &__options {
    border-bottom: 1px solid $COLOR_BORDER_LIGHT;
    display: grid;
    gap: $SPACING_XS;
    grid-template-columns: repeat(2, 1fr);
    padding-bottom: $SPACING_M;
  }

  @include mq($from: large) {
    &__product {
      gap: $SPACING_L;
      grid-template-columns: minmax(0, 78px) 2fr;
      margin-bottom: $SPACING_L;
    }

    &__product-thumbnail {
      height: 78px;
    }

    &__product-vendor {
      margin-bottom: $SPACING_3XS;
    }

    &__options {
      gap: $SPACING_S;
      padding-bottom: $SPACING_L;
    }
  }
}
</style>
