<template>
  <div class="template-product">
    <div class="template-product__container">
      <div class="template-product__gallery">
        <product-gallery :items="media" :product-title="product.title" />
      </div>

      <div class="template-product__aside">
        <product-form
          :product="product"
          @selected-variant="handleSelectedVariantChange"
        />
      </div>

      <div class="template-product__details">
        <div
          v-for="(detail, index) in details"
          :key="index"
          class="template-product__detail"
        >
          <span class="large-body">{{ detail.title }}</span>
          <icon-caret-right />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductForm from '~/components/ProductForm'
import ProductGallery from '~/components/ProductGallery'

import IconCaretRight from '@/assets/icons/directional-caret-right.svg?inline'

import { getHead } from '~/helpers/metadata'

export default {
  components: {
    IconCaretRight,
    ProductForm,
    ProductGallery
  },

  async asyncData({ app, error, params }) {
    const product = await app.$nacelle
      .productByHandle(params.handle)
      .catch(() => {
        error({
          statusCode: 404,
          message: 'Product not found'
        })
      })

    return {
      product,
      selectedVariant: product.variants[0]
    }
  },

  data() {
    return {
      details: [
        {
          title: 'Product Details',
          namespace: 'details'
        },
        {
          title: 'Delivery Rates & Info',
          namespace: 'delivery'
        },
        {
          title: 'Returns',
          namespace: 'returns'
        }
      ]
    }
  },

  head() {
    return getHead({
      title: this.product.title,
      description: this.product.description
    })
  },

  computed: {
    /**
     * Returns the currently selected color.
     * @returns {string} - The color value.
     */
    selectedColor() {
      return this.selectedVariant.selectedOptions.find(
        ({ name }) => name === 'Colour'
      )?.value
    },

    /**
     * Returns the array of images to show.
     * @returns {Array} - The filtered images.
     */
    media() {
      return this.product.media.filter(
        ({ altText }) => altText === this.selectedColor
      )
    }
  },

  methods: {
    /**
     * Handles the variant change event.
     * @param {object} variant - The variant object.
     */
    handleSelectedVariantChange(variant) {
      this.selectedVariant = variant
    }
  }
}
</script>

<style lang="scss">
.template-product {
  &__gallery {
    .product-gallery {
      border-bottom: 1px solid $COLOR_BORDER_LIGHT;
      width: 100%;
    }
  }

  &__aside {
    margin-top: 1.875rem;
  }

  &__detail {
    align-items: center;
    border-bottom: 1px solid $COLOR_BORDER_LIGHT;
    color: $COLOR_TEXT_PRIMARY;
    cursor: pointer;
    display: flex;
    padding: 1.125rem $SPACING_M $SPACING_M;

    &:first-child {
      border-top: 1px solid $COLOR_BORDER_LIGHT;
    }

    .icon {
      color: $COLOR_PRIMARY;
      margin-left: auto;
    }
  }

  @include mq($from: large) {
    &__container {
      @include container;
      display: grid;
      gap: $SPACING_3XL;
      grid-template-areas: 'gallery aside' 'details aside';
      grid-template-columns: minmax(0, 2fr) 1fr;
      margin-top: $SPACING_3XL;
    }

    &__gallery {
      grid-area: gallery;

      .product-gallery {
        border: 0;
      }
    }

    &__aside {
      grid-area: aside;
      margin-top: 0;
    }

    &__details {
      grid-area: details;
    }

    &__detail {
      border-bottom: 1px solid $COLOR_BORDER_DARK;
      border-top: none;
      padding: 1.125rem 0;

      span {
        margin-top: $SPACING_M;
      }

      &:first-child {
        border-top: none;
      }
    }
  }
}
</style>
