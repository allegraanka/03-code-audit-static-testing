<template>
  <div class="product-form">
    <form @submit.prevent="handleAddToCart">
      <div
        class="product-form__section"
        :class="{
          'product-form__section--tight-bottom': codes.length >= 1
        }"
      >
        <div class="product-form__header">
          <p v-if="product.vendor" class="product-form__vendor body-2">
            {{ product.vendor }}
          </p>

          <span v-if="reviewsSku" class="product-form__reviews">
            <product-reviews :sku="reviewsSku" />
          </span>
        </div>

        <h1 class="product-form__title h3">{{ title }}</h1>

        <span
          v-if="reviewsSku"
          class="product-form__reviews product-form__reviews--desktop"
        >
          <product-reviews :sku="reviewsSku" />
        </span>

        <div class="product-form__description">
          <div class="body-1" v-html="description.content" />

          <button
            v-if="description.truncated"
            class="product-form__description-toggle body-2"
            type="button"
            @click="$emit('toggle-description')"
          >
            {{ $t('product.descriptionToggle') }}
          </button>
        </div>

        <div class="product-form__price">
          <h4 v-if="hasBackOrder" class="product-form__out-of-stock">
            {{ $t('product.outOfStock') }}
          </h4>

          <product-price
            :price="
              manipulatePriceForDiscount(pricing.price, product, $settings)
            "
            :compare-at="pricing.compareAt"
            :rrp="rrp"
            :secondary="hasBackOrder"
          />
        </div>

        <div
          v-if="hasAdditionalDiscount(product, $settings)"
          class="product-form__discount-notification"
        >
          <product-discount-notification
            :title="$settings.product.discountNotification.title"
            :subtitle="$settings.product.discountNotification.subtitle"
            :percentage="$settings.product.discountNotification.percentage"
            :tags="$settings.product.discountNotification.tags"
            :price-text="$settings.product.discountNotification.priceText"
            :price="pricing.price"
          />
        </div>

        <p v-if="promotion" class="product-form__promotion body-2">
          {{ promotion }}
        </p>

        <div v-if="codes.length >= 1" class="product-form__codes">
          <span
            v-for="code in codes"
            :key="code.name"
            class="product-form__code label"
          >
            {{ code.label }}: {{ code.value }}
          </span>
        </div>
      </div>

      <div
        v-if="!hasOnlyDefaultVariant || variantSkus.length > 0"
        class="product-form__section"
      >
        <template v-if="!hasOnlyDefaultVariant">
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
              :siblings="(optionIsColor(option) && siblings) || []"
              :allow-disabled="stockNotification.allow"
            />
          </div>
        </template>

        <button
          v-if="hasStockChecker"
          class="product-form__stock-checker"
          type="button"
          @click="openDrawer({ namespace: 'stock-checker' })"
        >
          <icon-pin />
          <span class="body-2">{{ $t('product.openStockChecker') }}</span>
        </button>
      </div>

      <div class="product-form__section">
        <div v-if="hasBackOrder" class="product-form__back-order body-1">
          <strong>{{ $t('product.preOrder') }}</strong>
          <br />
          {{ $tc('product.estimatedDelivery', 1, { date: backOrderDate }) }}
        </div>

        <item-add-on
          v-if="showItemAddOn"
          v-model="sibling"
          class="product-form__add-on"
          :label="$settings.product.itemAddOn.label"
          :label-added="$settings.product.itemAddOn.addedLabel"
          :content="$settings.product.itemAddOn.details"
        />

        <div
          v-if="
            stockNotification.allow &&
            selectedVariant &&
            !selectedVariant.availableForSale
          "
          class="product-form__notification body-1"
          :class="{
            'product-form__notification--success': stockNotification.success,
            'product-form__notification--error': stockNotification.error
          }"
        >
          {{
            stockNotification.success ||
            stockNotification.error ||
            $t('product.stockNotification.content')
          }}
        </div>

        <app-button
          v-show="!isStockNotificationActive"
          class="product-form__add-to-cart"
          block
          :disabled="disabled"
        >
          {{ addToCartLabel }}
        </app-button>

        <div
          class="product-form__stock-notification"
          :class="{
            'product-form__stock-notification--active':
              isStockNotificationActive
          }"
        >
          <label class="visually-hidden" for="StockNotificationEmail">
            {{ $t('forms.labels.email') }}
          </label>

          <input
            id="StockNotificationEmail"
            ref="stockNotificationEmail"
            v-model="stockNotification.email"
            type="email"
            :disabled="stockNotification.loading"
            :placeholder="$t('product.stockNotification.emailPlaceholder')"
          />

          <app-button
            block
            :label="$t('product.stockNotification.submit')"
            type="button"
            :disabled="stockNotification.loading"
            @click.native.prevent="handleStockNotification"
          />
        </div>

        <delivery-countdown class="product-form__delivery-countdown" />
      </div>
    </form>

    <size-guide
      v-if="hasSizeGuide"
      :content="
        $settings.product &&
        $settings.product.sizeGuide &&
        $settings.product.sizeGuide.content
      "
      :guides="sizeGuides"
    />

    <stock-checker
      v-if="hasStockChecker"
      :product-thumbnail="product.featuredMedia && product.featuredMedia.src"
      :product-vendor="product.vendor"
      :product-title="title"
      :product-sku="sku"
      :options="options"
      :default-options="selectedOptions"
      :variant-skus="variantSkus"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppButton from '~/components/AppButton'
import DeliveryCountdown from '~/components/DeliveryCountdown'
import ItemAddOn from '~/components/ItemAddOn'
import ProductPrice from '~/components/ProductPrice'
import SizeGuide from '~/components/SizeGuide'
import SwatchGrid from '~/components/SwatchGrid'
import ProductReviews from '~/components/ProductReviews'

import IconPin from '@/assets/icons/misc-pin.svg?inline'

import {
  hasAdditionalDiscount,
  manipulatePriceForDiscount
} from '~/helpers/utils'

import {
  getDefaultOptions,
  getProductOptions,
  getProductSwatches,
  getProductTitle,
  getSelectedVariant,
  getReviewsSku
} from '~/helpers/product'

export default {
  components: {
    AppButton,
    DeliveryCountdown,
    IconPin,
    ItemAddOn,
    ProductPrice,
    ProductDiscountNotification: () =>
      import('~/components/ProductDiscountNotification'),
    SizeGuide,
    StockChecker: () => import('~/components/StockChecker'),
    SwatchGrid,
    ProductReviews
  },

  props: {
    product: {
      type: Object,
      required: true
    },

    value: {
      type: Object,
      default() {
        return this.product && getDefaultOptions(this.product)
      }
    },

    siblings: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      selectedOptions: this.value || getDefaultOptions(this.product),
      options: getProductOptions(this.product),
      primaryOptionIndex: 0,
      sibling: false,
      variantSkus: [],
      stockNotification: {
        email: '',
        allow: true,
        active: false,
        success: null,
        error: null,
        loading: false
      }
    }
  },

  computed: {
    /**
     * Returns if the product only has it's default variant.
     * @returns {boolean} - The default variant state.
     */
    hasOnlyDefaultVariant() {
      return (
        this.product.variants.length === 1 &&
        this.product.variants[0].title.includes('Default')
      )
    },

    /**
     * Splits and returns the product title.
     * @returns {string} - The transformed title.
     */
    title() {
      return getProductTitle(this.product, this)
    },

    /**
     * Truncates the description and returns the template.
     * @returns {object} - The description object.
     */
    description() {
      const limit = 92
      const original = this.product.description.replace(/(<([^>]+)>)/gi, '')
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
     * Returns the product SKU from metafields.
     * @returns {string|null} - The product SKU.
     */
    sku() {
      return this.$nacelle.helpers.findMetafield(
        this.product.metafields,
        'product.sku'
      )
    },

    /**
     * Returns the SKU to use for product reviews.
     * @returns {string} - The reviews SKU.
     */
    reviewsSku() {
      return getReviewsSku(this.product, this.selectedVariant)
    },

    /**
     * Returns the selected variant based on selected options.
     * @returns {object} - The selected variant.
     */
    selectedVariant() {
      return getSelectedVariant(this.product.variants, this.selectedOptions)
    },

    /**
     * Returns the disbaled state for the add to cart form.
     * @returns {boolean} - The disabled state.
     */
    disabled() {
      return (
        !this.selectedVariant ||
        (!this.stockNotification.allow &&
          (!this.selectedVariant || !this.selectedVariant.availableForSale))
      )
    },

    /**
     * Returns the label of the add to cart button.
     * @returns {string} - The label.
     */
    addToCartLabel() {
      if (!this.selectedVariant) {
        return this.$t('product.unavailable')
      }

      if (!this.selectedVariant.availableForSale) {
        if (this.stockNotification.allow) {
          return 'Notify me when available'
        }

        return this.$t('product.outOfStock')
      }

      return this.$t('product.addToCart')
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
      return getProductSwatches(this.product)
    },

    /**
     * Returns the inventory status notice.
     * @returns {string|null} - The status.
     */
    inventoryStatus() {
      const available = this.selectedVariant?.quantityAvailable
      const threshold = this.$settings.product?.lowStockThreshold.threshold

      if (available && available > 0 && threshold && available < threshold) {
        return this.$t('product.lowInventory', 1, { available })
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
      return this.sizeGuides?.length > 0
    },

    /**
     * Returns the size guides applicable to this product.
     * @returns {Array} - The filtered size guides.
     */
    sizeGuides() {
      return this.$settings.product?.sizeGuide?.guides.filter((guide) => {
        const conditions = guide.conditions

        if (!conditions) {
          return false
        }

        const handle =
          conditions.productHandle &&
          conditions.productHandle === this.product.handle
        const brand =
          conditions.brand && conditions.brand === this.product.vendor
        const tag =
          conditions.productTag &&
          this.product.tags.includes(conditions.productTag)
        const type =
          conditions.productType &&
          conditions.productType === this.product.productType

        return (
          handle || (brand && tag) || (brand && type) || brand || tag || type
        )
      })
    },

    /**
     * Returns if the item add on should show.
     * @returns {boolean} - The itme add on.
     */
    showItemAddOn() {
      const metafields =
        this.selectedVariant?.metafields || this.product.metafields
      const imbox = this.$nacelle.helpers.findMetafield(
        metafields,
        'global.imbox'
      )

      return (
        imbox === 'Yes' &&
        this.$settings.product &&
        this.$settings.product.itemAddOn &&
        this.$settings.product.itemAddOn.handle &&
        this.$settings.product.itemAddOn.variant
      )
    },

    /**
     * Returns the back order date metafield value.
     * @returns {string|null} - The back order date string.
     */
    backOrderDate() {
      const metafields =
        this.selectedVariant?.metafields || this.product.metafields

      return this.$nacelle.helpers.findMetafield(
        metafields,
        'global.backorderdate'
      )
    },

    /**
     * Returns if the selected variant can be back ordered.
     * @returns {boolean} - The out of stock state.
     */
    hasBackOrder() {
      return (
        [0, null].indexOf(this.selectedVariant?.quantityAvailable) > -1 &&
        !!this.backOrderDate
      )
    },

    /**
     * Returns a set of product codes.
     * @returns {Array} - The product codes.
     */
    codes() {
      const paths = {
        reference: 'product.name',
        order: 'product.tvcode'
      }

      return Object.keys(paths).reduce((accumulator, name) => {
        const value = this.$nacelle.helpers.findMetafield(
          this.product.metafields,
          paths[name]
        )

        const label = `product.codes.${name}`

        if (value) {
          accumulator.push({
            name,
            value,
            label: this.$te(label) && this.$t(label)
          })
        }

        return accumulator
      }, [])
    },

    /**
     * Returns if the product should show the stock checker.
     * @returns {boolean} - The stock checker state.
     */
    hasStockChecker() {
      return this.variantSkus.length > 0
    },

    /**
     * Returns if the stock notification form is active.
     * @returns {boolean} - The active state.
     */
    isStockNotificationActive() {
      return (
        this.stockNotification.allow &&
        this.stockNotification.active &&
        !this.selectedVariant.availableForSale
      )
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
      this.$emit('input', value)
    }
  },

  mounted() {
    if (this.sku) {
      this.setVariantSkus()
    }
  },

  methods: {
    hasAdditionalDiscount,
    manipulatePriceForDiscount,
    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      addItemToCart: 'cart/addItem',
      openDrawer: 'drawers/openDrawer'
    }),

    /**
     * Handles the add to cart event.
     */
    handleAddToCart() {
      if (!this.selectedVariant) {
        alert(this.$t('product.selectVariant'))
        return
      }

      if (!this.selectedVariant.availableForSale) {
        this.revealStockNotification()
        return
      }

      this.addItemToCart({
        variant: this.selectedVariant.id,
        handle: this.product.handle,
        product: this.product,
        sibling: this.sibling
      })

      this.sibling = false
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
        linkLabel:
          this.hasSizeGuide && isSize ? this.$t('product.openSizeGuide') : null,
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

        if (!variant.availableForSale) {
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
      this.openDrawer({ namespace: 'size-guide' })
    },

    /**
     * Sets the variant skus.
     */
    async setVariantSkus() {
      const { subskus } = await this.$axios.$get(
        `https://pvs.azurewebsites.net/stockfinder/stockinfo.ashx?sku=${this.sku}`
      )

      if (subskus) {
        this.variantSkus = subskus
      }
    },

    /**
     * Reveals the stock notifications panel.
     */
    revealStockNotification() {
      this.stockNotification.active = true
    },

    /**
     * Handles the stock notification submit event.
     */
    handleStockNotification() {
      if (!this.selectedVariant) {
        this.setStockNotificationError(this.$t('product.selectVariant'))
        return
      }

      if (!this.stockNotification.email) {
        this.setStockNotificationError(
          this.$t('product.stockNotification.emailRequired')
        )
        return
      }

      if (!this.$refs.stockNotificationEmail.checkValidity()) {
        this.setStockNotificationError(
          this.$refs.stockNotificationEmail.validationMessage
        )
        return
      }

      this.stockNotification.loading = true

      this.$axios
        .$post(`https://d2eb188kx61o0e.cloudfront.net/backinstock.ashx`, {
          email: this.stockNotification.email,
          sku: this.selectedVariant.sku,
          source: 'pvstest'
        })
        .then(({ result, message }) => {
          this.stockNotification.loading = false

          if (result) {
            this.setStockNotificationSuccess(message)
            return
          }

          this.setStockNotificationError(message)
        })
        .catch((error) => {
          console.error(error)

          this.stockNotification.loading = false
          this.setStockNotificationError(this.$t('errors.messages.default'))
        })
    },

    /**
     * Throws an error in the stock notification form.
     * @param {string} message - The message to show.
     */
    setStockNotificationError(message) {
      this.stockNotification.success = ''
      this.stockNotification.error = message
    },

    /**
     * Throws a success message in the stock notification form.
     * @param {string} message - The message to show.
     */
    setStockNotificationSuccess(message) {
      this.stockNotification.email = ''
      this.stockNotification.error = ''
      this.stockNotification.success = message
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

  &__reviews {
    &#{&}--desktop {
      display: none;
    }
  }

  &__promotion {
    color: $COLOR_SUPPORT_SUCCESS;
    margin-top: $SPACING_2XS;
  }

  &__section {
    padding: $SPACING_L $SPACING_M;

    &:first-child {
      padding-bottom: ($SPACING_M + $SPACING_2XS);
      padding-top: 0;
    }

    &:not(:last-child) {
      border-bottom: 1px solid $COLOR_BORDER_LIGHT;
    }

    &#{&}--tight-bottom {
      padding-bottom: $SPACING_S;
    }
  }

  &__vendor,
  &__vendor.body-2 {
    color: $COLOR_TEXT_LIGHT;
    font-size: ms(-1);
    margin: 0;

    &.body-2 {
      margin: 0;
    }
  }

  &__price {
    align-items: baseline;
    display: flex;
    gap: $SPACING_XS;
    margin-bottom: $SPACING_2XS;
  }

  &__out-of-stock {
    color: $COLOR_SALE;
    margin: 0;
  }

  &__description {
    color: $COLOR_TEXT_SECONDARY;
    display: block;
    margin-bottom: $SPACING_M;
    margin-top: $SPACING_S;

    .body-1 {
      margin-bottom: $SPACING_S;
    }
  }

  &__description-toggle,
  &__description-toggle.body-2 {
    @include button-reset;
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

  &__add-on {
    margin-bottom: $SPACING_M;
  }

  &__stock-notification {
    display: none;

    .button {
      margin-top: ($SPACING_M + $SPACING_2XS);
    }

    &#{&}--active {
      display: block;
    }
  }

  &__notification {
    margin-bottom: ($SPACING_M + $SPACING_2XS);
    text-align: center;

    &#{&}--success {
      color: $COLOR_SUPPORT_SUCCESS;
    }

    &#{&}--error {
      color: $COLOR_SUPPORT_ERROR;
    }
  }

  &__stock-checker {
    @include button-reset;
    align-items: center;
    display: flex;
    margin-top: $SPACING_L;

    span {
      text-decoration: underline;
    }

    .icon {
      color: $COLOR_PRIMARY;
      margin-right: $SPACING_XS;
    }

    &:only-child {
      margin-top: 0;
    }
  }

  &__back-order,
  &__back-order.body-1 {
    margin-bottom: ($SPACING_M + $SPACING_2XS);
    text-align: center;
  }

  &__delivery-countdown {
    margin-top: $SPACING_M;
  }

  &__codes {
    display: flex;
    flex-wrap: wrap;
    margin-top: ($SPACING_M + $SPACING_2XS);
  }

  &__code {
    color: $COLOR_TEXT_LIGHT;
    text-transform: uppercase;

    &:not(:last-child) {
      border-right: 1px solid $COLOR_BORDER_LIGHT;
      margin-right: $SPACING_XS;
      padding-right: $SPACING_XS;
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

    &__vendor,
    &__vendor.body-2 {
      font-size: ms(0);
    }

    &__reviews {
      display: none;

      &#{&}--desktop {
        display: block;
      }
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
      gap: $SPACING_M;
      margin-bottom: 0;
      margin-top: $SPACING_M;
    }

    &__back-order,
    &__back-order.body-1 {
      margin-bottom: $SPACING_L;
    }

    &__codes {
      margin-top: $SPACING_L;
    }

    &__stock-notification {
      .button {
        margin-top: $SPACING_M;
      }
    }

    &__notification {
      margin-bottom: $SPACING_L;
    }
  }
}
</style>
