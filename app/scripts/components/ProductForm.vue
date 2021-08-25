<template>
  <div class="product-form">
    <div class="product-form__section">
      <p v-if="product.vendor" class="product-form__vendor">
        {{ product.vendor }}
      </p>

      <h1 class="product-form__title h2">{{ product.title }}</h1>

      <p class="product-form__description">
        {{ description.content }}

        <a
          v-if="description.truncated"
          class="product-form__description-toggle"
          href="#"
        >
          Read Product Description
        </a>
      </p>

      <h6 class="product-form__price">£{{ product.priceRange.min }}</h6>
    </div>

    <div class="product-form__section">
      <label class="product-form__label subtitle-1" for="Variant">
        Select a variant
      </label>

      <select id="Variant" v-model="selectedVariant">
        <option
          v-for="(variant, variantIndex) in product.variants"
          :key="`variant-${variant.id}-${variantIndex}`"
          :value="variant.id"
        >
          {{ variant.title }}
        </option>
      </select>
    </div>

    <div class="product-form__section">
      <app-button
        class="product-form__add-to-cart"
        block
        @click.native.prevent="handleAddToCart"
      >
        Add to cart
      </app-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppButton from '~/components/AppButton'

export default {
  components: {
    AppButton
  },

  props: {
    product: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },

  data() {
    return {
      selectedVariant: false
    }
  },

  computed: {
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
        variant: this.selectedVariant,
        handle: this.product.handle,
        product: this.product
      })
    }
  }
}
</script>

<style lang="scss">
.product-form {
  padding-top: $SPACING_5XL;

  &__section {
    padding: $SPACING_M 0;

    &:not(:last-child) {
      border-bottom: 1px solid $COLOR_BORDER_LIGHT;
    }
  }

  &__vendor {
    color: $COLOR_TEXT_SECONDARY;
    margin: 0 0 $SPACING_M;
  }

  &__title {
    margin-bottom: 0;
  }

  &__description {
    display: block;
    margin-top: $SPACING_S;
  }

  &__description-toggle {
    color: $COLOR_TEXT_PRIMARY;
    display: block;
    margin-bottom: $SPACING_M;
    margin-top: $SPACING_S;
    text-decoration: underline;
  }

  &__price {
    margin: 0;
  }

  &__label {
    display: block;
    margin-bottom: $SPACING_XS;
    text-transform: none;
  }

  @include mq($from: large) {
    float: right;
    max-width: 432px;

    &__vendor {
      margin: 0 0 $SPACING_2XS;
    }

    &__description {
      @include visually-hidden;
    }

    &__price {
      margin-top: $SPACING_M;
    }
  }
}
</style>
