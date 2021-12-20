<template>
  <div class="template-product">
    <div class="template-product__container">
      <div class="template-product__grid">
        <div
          v-if="media.length > 0 || videoId"
          class="template-product__gallery"
        >
          <product-gallery
            :items="media"
            :product-title="product.title"
            :video-id="videoId"
            :badges="getProductBadges(product)"
          />
        </div>

        <div class="template-product__aside">
          <product-form
            v-model="selectedOptions"
            :product="product"
            :siblings="siblings"
            @toggle-description="openDrawer({ namespace: 'product-details' })"
          />
        </div>

        <div class="template-product__details">
          <button
            v-for="detail in enabledDetails"
            :key="detail.namespace"
            class="template-product__detail"
            @click.prevent="openDrawer({ namespace: detail.namespace })"
          >
            <span class="large-body">{{ detail.title }}</span>
            <icon-caret-right />
          </button>

          <div class="template-product__share">
            <share-links />
          </div>
        </div>
      </div>
    </div>

    <div v-if="reviewsSku" class="template-product__reviews">
      <product-reviews
        layout="detailed"
        :sku="reviewsSku"
        :title="product.title"
      />
    </div>

    <product-details
      v-for="detail in enabledDetails"
      :key="detail.namespace"
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
import ProductReviews from '~/components/ProductReviews'

import IconCaretRight from '@/assets/icons/directional-caret-right.svg?inline'

import { getHead } from '~/helpers/metadata'
import {
  getDefaultOptions,
  fetchProductSiblings,
  getProductBadges,
  getSelectedVariant,
  getReviewsSku
} from '~/helpers/product'

export default {
  components: {
    IconCaretRight,
    ProductDetails,
    ProductForm,
    ProductGallery,
    ShareLinks,
    ProductReviews
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
      siblings: await fetchProductSiblings(product, app),
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

      if (media && media.length > 0) {
        return media
      }

      const variant = this.product.variants.find((variant) => {
        const color = variant.selectedOptions.find(
          ({ name }) => name === this.$t('product.color')
        )

        return color && color.value === this.selectedColor
      })

      if (variant && variant.featuredMedia) {
        return [variant.featuredMedia]
      }

      return this.product.media?.filter(({ altText }) => altText !== null) || []
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
          title: this.$t('product.description'),
          namespace: 'product-details',
          content: this.product.description,
          specifications: this.specifications
        },
        {
          title: this.$t('product.delivery'),
          namespace: 'product-delivery',
          highlights: this.$settings.product.deliveryContent?.highlights,
          content: this.$settings.product.deliveryContent?.content
        },
        {
          title: this.$t('product.returns'),
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
        gender: this.$t('product.specifications.gender'),
        upper: this.$t('product.specifications.upper'),
        Lining: this.$t('product.specifications.lining'),
        Sole: this.$t('product.specifications.sole'),
        width: this.$t('product.specifications.width'),
        heelheight: this.$t('product.specifications.heelHeight')
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
    },

    /**
     * Returns the selected variant based on selected options.
     * @returns {object} - The selected variant.
     */
    selectedVariant() {
      return getSelectedVariant(this.product.variants, this.selectedOptions)
    },

    /**
     * Returns the SKU to use for product reviews.
     * @returns {string} - The reviews SKU.
     */
    reviewsSku() {
      return getReviewsSku(this.product, this.selectedVariant)
    }
  },

  mounted() {
    if (window.Trustpilot) {
      window.Trustpilot.loadFromElement(this.$refs.trustpilotWidget)
    }
  },

  methods: {
    getProductBadges,

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
    margin-top: ($SPACING_M * 1.875);
  }

  &__detail {
    @include button-reset;
    align-items: center;
    border-bottom: 1px solid $COLOR_BORDER_LIGHT;
    color: $COLOR_TEXT_PRIMARY;
    cursor: pointer;
    display: flex;
    padding: ($SPACING_M + $SPACING_3XS) $SPACING_M $SPACING_M;
    width: 100%;

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

  &__reviews {
    background-color: $COLOR_BACKGROUND_MID;
    padding: $SPACING_XL;
  }

  @include mq($from: large) {
    &__container {
      @include container;
      margin-bottom: ($LAYOUT_M * 1.172);
      margin-top: $SPACING_3XL;
    }

    &__grid {
      display: grid;
      grid-template-areas: 'gallery aside' 'details aside';
      grid-template-columns: minmax(0, 576px) 1fr;
      width: 100%;
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
      padding-left: $SPACING_3XL;
    }

    &__details {
      grid-area: details;
    }

    &__detail {
      border-bottom: 1px solid $COLOR_BORDER_DARK;
      border-top: none;
      padding: ($SPACING_M + $SPACING_3XS) 0;

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

    &__reviews {
      padding: $LAYOUT_L;
    }
  }

  @include mq($from: wide) {
    &__grid {
      grid-template-columns: minmax(0, 768px) 1fr;
    }
  }
}
</style>
