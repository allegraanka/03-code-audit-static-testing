<template>
  <drawer namespace="stock-checker">
    <template #body>
      <h3 class="stock-checker__title">In-Store Stock Checker</h3>

      <div class="stock-checker__product">
        <div v-if="productThumbnail" class="stock-checker__product-thumbnail">
          <responsive-image
            :src="productThumbnail"
            :alt="productTitle"
            source="shopify"
          />
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

      <form @submit.prevent="handleFormSubmit">
        <div class="stock-checker__options">
          <div
            v-for="option in options"
            :key="option.name"
            class="stock-checker__option"
          >
            <label :for="option.name" class="visually-hidden">
              {{ option.name }}
            </label>

            <select :id="option.name" v-model="selectedOptions[option.name]">
              <option :value="null">Select {{ option.name }}</option>

              <option
                v-for="value in option.values"
                :key="value"
                :value="value"
                :selected="
                  defaultOptions && defaultOptions[option.name] === value
                "
              >
                {{ value }}
              </option>
            </select>
          </div>
        </div>

        <div class="stock-checker__lookup">
          <label for="Postcode" class="stock-checker__label subtitle-2">
            Postcode
          </label>

          <div class="stock-checker__input">
            <input
              id="Postcode"
              v-model="postcode"
              type="text"
              placeholder="Enter your postcode"
            />

            <button class="stock-checker__submit" :disabled="!hasOptionValues">
              Check
            </button>
          </div>

          <div class="stock-checker__disclaimer body-2">
            Please note, we don’t currently offer stock reservations, but you
            can have have your order delivered to your nearest store for free.
            Select ‘Deliver to my local store’ at checkout.
          </div>
        </div>

        <div class="stock-checker__footer">
          <app-button
            label="Back to product page"
            block
            @click.native="closeDrawer('stock-checker')"
          />
        </div>
      </form>
    </template>
  </drawer>
</template>

<script>
import { mapActions } from 'vuex'

import AppButton from '~/components/AppButton'
import Drawer from '~/components/Drawer'
import ResponsiveImage from '~/components/ResponsiveImage'

import { getDefaultOptions } from '~/helpers/product'
import { titleCase } from '~/helpers/utils'

export default {
  components: {
    AppButton,
    Drawer,
    ResponsiveImage
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

    defaultOptions: {
      type: Object,
      default: null
    },

    variantSkus: {
      type: Array,
      default: null
    }
  },

  data() {
    return {
      selectedOptions:
        this.defaultOptions || getDefaultOptions(null, this.options),
      postcode: '',
      empty: false,
      branches: null,
      longlat: null
    }
  },

  computed: {
    /**
     * Returns if all option values are selected.
     * @returns {boolean} - If the form has values.
     */
    hasOptionValues() {
      return this.options.every((option) => this.selectedOptions[option.name])
    },

    /**
     * Returns the SKU of the selected variant.
     * @returns {string} - The SKU.
     */
    variantSku() {
      return this.variantSkus.find(({ sku, ...rest }) =>
        Object.keys(rest).every(
          (option) => this.selectedOptions[titleCase(option)] === rest[option]
        )
      )?.sku
    },

    /**
     * The serialized postcode.
     * @returns {string} - The postcode.
     */
    serializedPostcode() {
      return this.postcode.replace(' ', '').toLowerCase()
    }
  },

  methods: {
    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      closeDrawer: 'drawers/closeDrawer'
    }),

    /**
     * Handles the checker form submit event.
     */
    handleFormSubmit() {
      if (
        !this.hasOptionValues ||
        this.postcode === '' ||
        !this.variantSkus ||
        !this.variantSku
      ) {
        return
      }

      this.$axios
        .$get(
          `https://pvs.azurewebsites.net/stockfinder/stockfinder.ashx?sku=${this.variantSku}&location=${this.serializedPostcode}`
        )
        .then((response) => {
          if (!response || response === '') {
            this.empty = true
            return
          }

          this.empty = false
          this.branches = response.branches
          this.longlat = { lat: response.latitude, long: response.longitude }
        })
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

  &__product-vendor,
  &__product-vendor.body-1 {
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

  &__lookup {
    border-bottom: 1px solid $COLOR_BORDER_LIGHT;
    margin-top: $SPACING_M;
    padding-bottom: $SPACING_L;
  }

  &__label {
    font-size: ms(-1);
    margin-bottom: calc(#{$SPACING_S} - 1px);
    text-transform: none;
  }

  &__input {
    display: grid;
    grid-template-columns: 3fr minmax(0, 86px);

    input {
      border-right: 0;
    }
  }

  &__submit {
    @include button-reset;
    align-items: center;
    background-color: $COLOR_PRIMARY;
    color: $COLOR_TEXT_INVERSE;
    display: flex;
    font-size: ms(-1);
    font-weight: $WEIGHT_MEDIUM;
    height: 100%;
    justify-content: center;
    padding: $SPACING_S $SPACING_L;
    text-transform: uppercase;
    transition: background-color 0.15s $EASING_EASE_OUT;

    &:hover {
      background-color: $COLOR_BUTTON_HOVER;
    }

    &:disabled {
      background-color: $COLOR_TEXT_LIGHT;
      cursor: not-allowed;
    }
  }

  &__disclaimer,
  &__disclaimer.body-2 {
    color: $COLOR_TEXT_SECONDARY;
    font-size: ms(-1);
    margin-top: $SPACING_M;
  }

  &__footer {
    padding: $SPACING_L 0;
  }

  @include mq($from: large) {
    &__title {
      margin-bottom: $SPACING_L;
    }

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

    &__lookup,
    &__disclaimer {
      margin-top: $SPACING_L;
    }

    &__footer {
      padding: $SPACING_XL 0;
    }
  }
}
</style>
