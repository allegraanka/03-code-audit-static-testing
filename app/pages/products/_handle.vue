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
    </div>
  </div>
</template>

<script>
import ProductForm from '~/components/ProductForm'
import ProductGallery from '~/components/ProductGallery'

import { getHead } from '~/helpers/metadata'

export default {
  components: {
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

  @include mq($from: large) {
    &__container {
      @include container;
      display: grid;
      gap: $SPACING_3XL;
      grid-template-columns: minmax(0, 2fr) 1fr;
      margin-top: $SPACING_3XL;
    }

    &__gallery {
      .product-gallery {
        border: 0;
      }
    }

    &__aside {
      margin-top: 0;
    }
  }
}
</style>
