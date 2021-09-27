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
          :values="getOptionValues(option)"
          :show-selection="optionIsColor(option)"
          :images="getOptionProperties(option).images"
          :status="getOptionProperties(option).status"
          :link-label="getOptionProperties(option).linkLabel"
          :link-handler="getOptionProperties(option).linkHandler"
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

import { getDefaultOptions, getProductOptions } from '~/helpers/product'

export default {
  components: {
    AppButton,
    ProductPrice,
    SwatchGrid
  },

  props: {
    product: {
      type: Object,
      required: true
    },

    value: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      selectedOptions: this.value || getDefaultOptions(this.product),
      options: getProductOptions(this.product),
      primaryOptionIndex: 0
    }
  },

  computed: {
    /**
     * Splits and returns the product title.
     * @returns {string} - The transformed title.
     */
    title() {
      return (
        this.$nacelle.helpers.findMetafield(
          this.product.metafields,
          'product.product_title'
        ) || this.product.title
      )
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
      const variant = this.selectedVariant || this.product.variants[0]

      return {
        price: Number(variant.price),
        compareAt: Number(variant.compareAtPrice)
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
    },

    /**
     * Returns all images for colors.
     * @returns {Array} - The images.
     */
    colorImages() {
      const images = []
      const colorOption = this.options.find(this.optionIsColor)

      this.product.variants.forEach((variant) => {
        const color = variant.selectedOptions.find(
          ({ name }) => name === colorOption.name
        )?.value
        const exists = images.find((image) => image.color === color)

        if (color && variant.featuredMedia && !exists) {
          images.push({
            color,
            image: variant.featuredMedia.src
          })
        }
      })

      return images.map(({ image }) => image)
    },

    /**
     * Returns the inventory status notice.
     * @returns {string|null} - The status.
     */
    inventoryStatus() {
      const available = this.selectedVariant?.quantityAvailable
      const threshold = this.$settings.product.lowStockThreshold.threshold

      if (available && available < threshold) {
        return `Hurry, only ${available} left!`
      }

      return null
    },

    /**
     * Returns the primary option.
     * @returns {object} - The primary option.
     */
    primaryOption() {
      return this.options[this.primaryOptionIndex]
    },

    /**
     * Returns if any size guides exist for the product.
     * @returns {boolean} - The size guide state.
     */
    hasSizeGuide() {
      return this.$settings.product.sizeGuides.length > 0
    }
  },

  watch: {
    /**
     * Watches for changes to the selected options.
     * - Emits to parent component.
     *
     * @param {object} value - The new options object.
     */
    selectedOptions(value) {
      this.$emit('selected-options', value)
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
    },

    /**
     * Returns if the given option is color.
     *
     * @param {object} option - The option to check.
     * @returns {boolean} - The color state.
     */
    optionIsColor(option) {
      return (
        option.name.toLowerCase() === 'colour' ||
        option.name.toLowerCase() === 'color'
      )
    },

    /**
     * Returns if the given option is size.
     *
     * @param {object} option - The option to check.
     * @returns {boolean} - The size state.
     */
    optionIsSize(option) {
      return option.name.toLowerCase() === 'size'
    },

    /**
     * Returns the properties for the given option.
     *
     * @param {object} option - The option.
     * @returns {object} - The option properties.
     */
    getOptionProperties(option) {
      const isColor = this.optionIsColor(option)
      const isSize = this.optionIsSize(option)

      return {
        images: isColor ? this.colorImages : [],
        status: isSize ? this.inventoryStatus : null,
        linkLabel: this.hasSizeGuide && isSize ? 'Size Guide' : null,
        linkHandler:
          this.hasSizeGuide && isSize ? this.handleSizeGuideClick : null
      }
    },

    /**
     * Returns the disabled state for a secondary value.
     *
     * @param {string} optionName - The option name.
     * @param {string} optionValue - The value to check.
     * @returns {boolean} - The disabled state.
     */
    getValueDisabledState(optionName, optionValue) {
      /**
       * If the option is the primary one it will never be disabled.
       */
      if (this.primaryOption.name === optionName) {
        return false
      }

      /**
       * Find variants which have both the first option's value and this value.
       */
      const variants = this.product.variants.filter((variant) => {
        const firstOption = this.primaryOption.name

        if (variant.quantityAvailable && variant.quantityAvailable < 1) {
          return false
        }

        const first = variant.selectedOptions.find(
          (option) =>
            option.name === firstOption &&
            option.value === this.selectedOptions[firstOption]
        )

        const current = variant.selectedOptions.find(
          (option) => option.name === optionName && option.value === optionValue
        )

        return first && current
      })

      return variants.length <= 0
    },

    /**
     * Returns the values of an option.
     *
     * @param {object} option - The option.
     * @returns {Array} - The option values, with disabled states.
     */
    getOptionValues(option) {
      return option.values.map((value) => ({
        value,
        disabled: this.getValueDisabledState(option.name, value)
      }))
    },

    /**
     * Handles the size guide click event.
     */
    handleSizeGuideClick() {
      //
    }
  }
}
</script>

<style lang="scss">
.product-form {
  $parent: &;

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
      padding-top: 0;
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

    &.body-2 {
      margin-top: $SPACING_S;
    }
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
    width: 100%;

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
