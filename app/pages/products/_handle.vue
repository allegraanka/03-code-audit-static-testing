<template>
  <div class="template-product">
    <div class="template-product__container">
      <div class="template-product__gallery">
        <product-gallery :items="media" :product-title="product.title" />
      </div>

      <div class="template-product__aside">
        <product-form v-model="selectedOptions" :product="product" />
      </div>

      <div class="template-product__details">
        <div
          v-for="(detail, index) in enabledDetails"
          :key="index"
          class="template-product__detail"
          @click="openDrawer({ namespace: detail.namespace })"
        >
          <span class="large-body">{{ detail.title }}</span>
          <icon-caret-right />
        </div>
      </div>
    </div>

    <product-details-drawer
      v-for="(detail, index) in enabledDetails"
      :key="index"
      :title="detail.title"
      :namespace="detail.namespace"
      :content="detail.content"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import ProductDetailsDrawer from '~/components/ProductDetailsDrawer'
import ProductForm from '~/components/ProductForm'
import ProductGallery from '~/components/ProductGallery'

import IconCaretRight from '@/assets/icons/directional-caret-right.svg?inline'

import { getHead } from '~/helpers/metadata'
import { getDefaultOptions } from '~/helpers/product'

export default {
  components: {
    IconCaretRight,
    ProductDetailsDrawer,
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
      selectedOptions: product && getDefaultOptions(product)
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
      return this.selectedOptions.Colour
    },

    /**
     * Returns the array of images to show.
     * @returns {Array} - The filtered images.
     */
    media() {
      const media = this.product.media.filter(
        ({ altText }) => altText === this.selectedColor
      )

      return media.length < 1
        ? this.product.media.filter(({ altText }) => altText === null)
        : media
    },

    /**
     * Returns the detail tabs with content.
     * @returns {Array} - The details.
     */
    details() {
      return [
        {
          title: 'Product Details',
          namespace: 'product-details',
          content: this.product.description
        },
        {
          title: 'Delivery Rates & Info',
          namespace: 'product-delivery',
          content: this.$settings.product.deliveryContent
        },
        {
          title: 'Returns',
          namespace: 'product-returns',
          content: this.$settings.product.returnsContent
        }
      ]
    },

    /**
     * Returns the details which are enabled.
     * @returns {Array} - The details.
     */
    enabledDetails() {
      return this.details.filter(({ content }) => content)
    }
  },

  methods: {
    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      openDrawer: 'drawers/openDrawer'
    })
  }
}
</script>

<style lang="scss">
.template-product {
  &__container {
    margin-bottom: $SPACING_2XL;
  }

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
      margin-bottom: 4.688rem;
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
