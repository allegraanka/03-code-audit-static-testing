<template>
  <div class="template-product">
    <div class="template-product__container">
      <div v-if="media.length > 0 || videoId" class="template-product__gallery">
        <product-gallery
          :items="media"
          :product-title="product.title"
          :video-id="videoId"
        />
      </div>

      <div class="template-product__aside">
        <product-form
          v-model="selectedOptions"
          :product="product"
          @toggle-description="openDrawer({ namespace: 'product-details' })"
        />
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

        <share-links class="template-product__share" />
      </div>
    </div>

    <product-details
      v-for="(detail, index) in enabledDetails"
      :key="index"
      :title="detail.title"
      :namespace="detail.namespace"
      :content="detail.content"
      :highlights="detail.highlights"
      :specifications="detail.specifications"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import ProductDetails from '~/components/ProductDetails'
import ProductForm from '~/components/ProductForm'
import ProductGallery from '~/components/ProductGallery'
import ShareLinks from '~/components/ShareLinks'

import IconCaretRight from '@/assets/icons/directional-caret-right.svg?inline'

import { getHead } from '~/helpers/metadata'
import { getDefaultOptions } from '~/helpers/product'

export default {
  components: {
    IconCaretRight,
    ProductDetails,
    ProductForm,
    ProductGallery,
    ShareLinks
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
      const media = this.product.media?.filter(
        ({ altText }) => altText === this.selectedColor
      )

      const variant = this.product.variants.find((variant) => {
        const color = variant.selectedOptions.find(
          ({ name }) => name === 'Colour'
        )

        return color && color.value === this.selectedColor
      })

      if (media && media.length > 0) {
        return media
      }

      if (variant && variant.featuredMedia) {
        return [variant.featuredMedia]
      }

      return this.product.media?.filter(({ altText }) => altText === null) || []
    },

    /**
     * Returns the video identifier if it exists.
     * @returns {string} - The video identifier.
     */
    videoId() {
      return this.$nacelle.helpers.findMetafield(
        this.product.metafields,
        'product.clockno'
      )
    },

    /**
     * Returns the detail tabs with content.
     * @returns {Array} - The details.
     */
    details() {
      return [
        {
          title: 'Product Description',
          namespace: 'product-details',
          content: this.product.description,
          specifications: this.specifications
        },
        {
          title: 'Delivery Rates & Info',
          namespace: 'product-delivery',
          highlights: this.$settings.product.deliveryContent?.highlights,
          content: this.$settings.product.deliveryContent?.content
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
      return this.details.filter(
        ({ content, highlights, specifications }) =>
          content || highlights || specifications
      )
    },

    /**
     * Builds an array of specifications to build the table.
     * @returns {Array} - The items.
     */
    specifications() {
      const items = {
        gender: 'Gender',
        upper: 'Upper',
        Lining: 'Lining',
        Sole: 'Sole',
        width: 'Width',
        heelheight: 'Heel Height'
      }

      return Object.keys(items).reduce((accumulator, key) => {
        const value = this.$nacelle.helpers.findMetafield(
          this.product.metafields,
          `product.${key}`
        )

        if (value) {
          accumulator.push({
            label: items[key],
            value
          })
        }

        return accumulator
      }, [])
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

  &__share {
    margin-top: $SPACING_M;
    padding-left: $SPACING_M;
  }

  @include mq($from: large) {
    &__container {
      @include container;
      display: grid;
      gap: $SPACING_3XL;
      grid-template-areas: 'gallery aside' 'details aside';
      grid-template-columns: minmax(0, 576px) 1fr;
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

    &__share {
      margin-top: $SPACING_XL;
      padding-left: 0;
    }
  }

  @include mq($from: wide) {
    &__container {
      grid-template-columns: minmax(0, 768px) 1fr;
    }
  }
}
</style>
