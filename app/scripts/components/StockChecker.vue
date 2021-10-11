<template>
  <drawer namespace="stock-checker" :force-open="forceOpen">
    <template #body>
      <h3 class="stock-checker__title">
        {{ $t('product.stockChecker.title') }}
      </h3>

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

            <select
              :id="`stock-checker-${option.name}`"
              v-model="selectedOptions[option.name]"
              :name="`stock-checker-${option.name}`"
            >
              <option :value="null">
                {{
                  $tc('product.stockChecker.selectOption', 1, {
                    option: option.name
                  })
                }}
              </option>

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
            {{ $t('product.stockChecker.postcode') }}
          </label>

          <div class="stock-checker__input">
            <input
              id="Postcode"
              v-model="postcode"
              type="text"
              :placeholder="$tc('product.stockChecker.postcodePlaceholder')"
              :disabled="loading"
            />

            <button
              class="stock-checker__submit"
              :disabled="loading || !hasOptionValues"
            >
              {{ $t('product.stockChecker.submit') }}
            </button>
          </div>

          <div class="stock-checker__disclaimer body-2">
            {{ $t('product.stockChecker.disclaimer') }}
          </div>

          <p v-if="empty" class="body-2">
            {{ $tc('product.stockChecker.empty', 1, { postcode }) }}
          </p>

          <p v-if="error" class="body-1">
            {{ $t('product.stockChecker.error') }}
          </p>

          <stock-checker-stockist
            v-for="stockist in stockists"
            :key="stockist.branch_code"
            class="stock-checker__stockist"
            :name="stockist.name"
            :address="stockist.address"
            :phone="stockist.telephone"
            :available="stockist.stock_available > 0"
            :miles="stockist.miles"
            :origin="postcode"
          />
        </div>

        <div class="stock-checker__footer">
          <app-button
            :label="$t('product.stockChecker.back')"
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
import haversine from 'haversine-distance'

import AppButton from '~/components/AppButton'
import Drawer from '~/components/Drawer'
import ResponsiveImage from '~/components/ResponsiveImage'
import StockCheckerStockist from '~/components/StockCheckerStockist'

import { getDefaultOptions } from '~/helpers/product'
import { titleCase } from '~/helpers/utils'

export default {
  components: {
    AppButton,
    Drawer,
    ResponsiveImage,
    StockCheckerStockist
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
    },

    forceOpen: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      selectedOptions:
        this.defaultOptions || getDefaultOptions(null, this.options),
      postcode: '',
      empty: false,
      branches: [],
      longlat: null,
      loading: false,
      error: false
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
    },

    /**
     * Transforms and returns the stockists.
     * @returns {Array} - The stockists.
     */
    stockists() {
      return this.branches.map(({ latitude, longitude, ...rest }) => ({
        miles: (
          haversine({ latitude, longitude }, this.longlat) * 0.000621371
        ).toFixed(2),
        ...rest
      }))
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

      this.loading = true
      this.empty = false
      this.branches = []

      this.$axios
        .$get(
          `https://pvs.azurewebsites.net/stockfinder/stockfinder.ashx?sku=${this.variantSku}&location=${this.serializedPostcode}`
        )
        .then((response) => {
          if (!response || response === '') {
            this.empty = true
            this.loading = false
            this.error = false
            return
          }

          this.empty = response && response.branches.length === 0
          this.loading = false
          this.error = false
          this.branches = response.branches

          this.longlat = {
            latitude: response.latitude,
            longitude: response.longitude
          }
        })
        .catch(() => (this.error = true))
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

  &__stockist {
    border-top: 1px solid $COLOR_BORDER_LIGHT;
    padding: $SPACING_L 0;

    &:last-child {
      margin-bottom: -$SPACING_L;
    }
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
