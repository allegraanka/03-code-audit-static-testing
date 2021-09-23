<template>
  <form class="product-form" @submit.prevent="handleAddToCart">
    <div class="product-form__section">
      <div class="product-form__header">
        <p v-if="product.vendor" class="product-form__vendor body-2">
          {{ product.vendor }}
        </p>

        <span class="product-form__reviews"></span>
      </div>

      <h1 class="product-form__title h3">{{ title }}</h1>

      <p class="product-form__description">
        {{ description.content }}

        <a
          v-if="description.truncated"
          class="product-form__description-toggle body-2"
          href="#"
        >
          Read Product Description
        </a>
      </p>

      <product-price
        class="product-form__price"
        :price="pricing.price"
        :compare-at="pricing.compareAt"
        :rrp="rrp"
      />

      <p v-if="promotion" class="product-form__promotion body-2">
        {{ promotion }}
      </p>
    </div>

    <div class="product-form__section">
      <div
        v-for="(option, index) in options"
        :key="`product-${product.id}-option-${index}`"
        class="product-form__option"
      >
        <swatch-grid
          v-model="selectedOptions[option.name]"
          :title="option.name"
          :values="option.values"
        />
      </div>
    </div>

    <div class="product-form__section">
      <app-button class="product-form__add-to-cart" block :disabled="disabled">
        {{ addToCartLabel }}
      </app-button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

import AppButton from '~/components/AppButton'
import ProductPrice from '~/components/ProductPrice'
import SwatchGrid from '~/components/SwatchGrid'

/**
 * Returns the options with values from the product.
 *
 * @param {object} product - The product object.
 * @returns {Array} - The options array.
 */
const getProductOptions = (product) => {
  const options = {}

  product.variants.forEach((variant) => {
    variant.selectedOptions.forEach(({ name, value }) => {
      if (options[name]) {
        if (!options[name].values.includes(value)) {
          options[name].values.push(value)
        }

        return
      }

      options[name] = {
        name,
        values: [value]
      }
    })
  })

  return Object.values(options)
}

export default {
  components: {
    AppButton,
    ProductPrice,
    SwatchGrid
  },

  props: {
    product: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },

  data() {
    const productOptions = getProductOptions(this.product)
    const selectedOptions = {}

    /**
     * Sets the first value of each option as default.
     */
    productOptions.forEach((option) => {
      selectedOptions[option.name] = option.values[0]
    })

    return {
      selectedOptions
    }
  },

  computed: {
    /**
     * Splits and returns the product title.
     * @returns {string} - The transformed title.
     */
    title() {
      return this.product.title.split('-')[0].trim()
    },

    /**
     * Truncates the description and returns the template.
     * @returns {object} - The description object.
     */
    description() {
      const limit = 92
      const original = this.product.description
      const truncated = original.substring(0, limit)

      if (original.length > limit) {
        return {
          truncated: true,
          content: `${truncated}...`
        }
      }

      return {
        truncated: false,
        content: original
      }
    },

    /**
     * Creates an object of product options and their values.
     * @returns {object} - The product options and values.
     */
    options() {
      return getProductOptions(this.product)
    },

    /**
     * Returns the selected variant based on selected options.
     * @returns {object} - The selected variant.
     */
    selectedVariant() {
      return this.product.variants.find((variant) => {
        let matchCount = 0

        variant.selectedOptions.forEach((option) => {
          const value = this.selectedOptions[option.name]

          if (value && value === option.value) {
            matchCount++
          }
        })

        return matchCount === variant.selectedOptions.length
      })
    },

    /**
     * Returns the disbaled state for the add to cart form.
     * @returns {boolean} - The disabled state.
     */
    disabled() {
      return !this.selectedVariant || !this.selectedVariant.availableForSale
    },

    /**
     * Returns the label of the add to cart button.
     * @returns {string} - The label.
     */
    addToCartLabel() {
      if (!this.selectedVariant) {
        return 'Unavailable'
      }

      if (!this.selectedVariant.availableForSale) {
        return 'Out of stock'
      }

      return 'Add to cart'
    },

    /**
     * Returns the pricing object as numbers.
     * @returns {object} - The pricing object.
     */
    pricing() {
      return {
        price: Number(this.selectedVariant.price),
        compareAt: Number(this.selectedVariant.compareAtPrice)
      }
    },

    /**
     * Returns the RRP of the product.
     * - Sourced from a metafield.
     *
     * @returns {number|null} - The RRP value.
     */
    rrp() {
      const price = this.$nacelle.helpers.findMetafield(
        this.product.metafields,
        'product.rrp'
      )

      return price ? Number(price / 100) : null
    },

    /**
     * Returns the promotion field.
     * @returns {string|null} - The promotion.
     */
    promotion() {
      return this.$nacelle.helpers.findMetafield(
        this.product.metafields,
        'product.promotion'
      )
    }
  },

  methods: {
    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      addItemToCart: 'cart/addItem'
    }),

    /**
     * Handles the add to cart event.
     */
    handleAddToCart() {
      if (!this.selectedVariant) {
        alert('Please select a variant')
        return
      }

      this.addItemToCart({
        variant: this.selectedVariant.id,
        handle: this.product.handle,
        product: this.product
      })
    }
  }
}
</script>

<style lang="scss">
.product-form {
  $parent: &;
  padding-top: $SPACING_3XL;

  &__header {
    align-items: center;
    display: flex;
    margin-bottom: $SPACING_XS;

    #{$parent}__reviews {
      margin-left: auto;
    }
  }

  &__promotion {
    color: $COLOR_SUPPORT_SUCCESS;
    margin-top: $SPACING_2XS;
  }

  &__section {
    padding: $SPACING_L $SPACING_M;

    &:first-child {
      padding-bottom: 1.25rem;
    }

    &:not(:last-child) {
      border-bottom: 1px solid $COLOR_BORDER_LIGHT;
    }
  }

  &__vendor {
    color: $COLOR_TEXT_LIGHT;
    font-size: ms(-1);
    margin: 0;

    &.body-2 {
      margin: 0;
    }
  }

  &__price {
    margin-bottom: $SPACING_2XS;
  }

  &__description {
    color: $COLOR_TEXT_SECONDARY;
    display: block;
    margin-bottom: $SPACING_M;
    margin-top: $SPACING_S;
  }

  &__description-toggle {
    color: $COLOR_TEXT_PRIMARY;
    display: block;
    font-size: ms(-1);
    margin-top: $SPACING_S;
    text-decoration: underline;
  }

  &__label {
    display: block;
    margin-bottom: $SPACING_XS;
    text-transform: none;
  }

  &__option {
    &:not(:last-of-type) {
      margin-bottom: $SPACING_L;
    }
  }

  @include mq($from: large) {
    float: right;
    max-width: 432px;

    &__section {
      padding-left: 0;
      padding-right: 0;
    }

    &__header {
      margin-bottom: $SPACING_S;
    }

    &__vendor {
      font-size: ms(0);
    }

    &__title {
      font-size: ms(5);
    }

    &__promotion {
      margin-bottom: $SPACING_XS;
      margin-top: 0;

      &.body-2:last-child {
        margin-bottom: $SPACING_XS;
      }
    }

    &__description {
      @include visually-hidden;
    }

    &__price {
      margin-bottom: 0;
      margin-top: $SPACING_M;
    }
  }
}
</style>
