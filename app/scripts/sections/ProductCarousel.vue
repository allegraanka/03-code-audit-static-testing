<template>
  <section class="product-carousel">
    <div class="container">
      <div class="row">
        <div class="col xs12">
          <div v-if="subtitle || title" class="product-carousel__header">
            <h3 v-if="subtitle" class="product-carousel__subtitle body-1">
              {{ subtitle }}
            </h3>

            <h2 v-if="title" class="product-carousel__title">
              {{ title }}
            </h2>
          </div>
        </div>
      </div>
    </div>

    <div ref="carousel" class="product-carousel__carousel">
      <div class="swiper-wrapper">
        <product-card
          v-for="(product, index) in items"
          :id="product.id"
          :key="`${product.handle}-${index}`"
          class="swiper-slide"
          :title="product.title"
          :handle="product.handle"
          :vendor="product.vendor"
          :thumbnail-src="product.featuredMedia && product.featuredMedia.src"
          :price="getProductPriceObject(product).price"
          :compare-at="getProductPriceObject(product).compareAt"
          :sku="getReviewsSku(product)"
          :swatches="getProductSwatches(product)"
        />
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col xs12">
          <div class="product-carousel__navigation">
            <button
              class="product-carousel__control"
              @click.prevent="goToPreviousSlide"
            >
              <span class="visually-hidden">
                {{ $t('sections.productCarousel.goToPreviousSlide') }}
              </span>

              <icon-chevron-left />
            </button>

            <span
              v-if="carousel"
              class="product-carousel__pagination subtitle-2"
            >
              {{ carousel.realIndex + 1 }} / {{ items.length }}
            </span>

            <button
              class="product-carousel__control"
              @click.prevent="goToNextSlide"
            >
              <span class="visually-hidden">
                {{ $t('sections.productCarousel.goToNextSlide') }}
              </span>

              <icon-chevron-right />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Swiper from 'swiper'

import ProductCard from '~/components/ProductCard'

import IconChevronLeft from '@/assets/icons/directional-chevron-left.svg?inline'
import IconChevronRight from '@/assets/icons/directional-chevron-right.svg?inline'

import { getReviewsSku, getProductSwatches } from '~/helpers/product'

export default {
  components: {
    IconChevronLeft,
    IconChevronRight,
    ProductCard
  },

  props: {
    title: {
      type: String,
      default: ''
    },

    subtitle: {
      type: String,
      default: ''
    },

    products: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      carousel: null,
      items: []
    }
  },

  async mounted() {
    await this.fetchProducts()
    this.constructCarousel()
  },

  methods: {
    getReviewsSku,
    getProductSwatches,

    /**
     * Requests and sets the product data.
     */
    async fetchProducts() {
      await this.$nacelle.client.data
        .products({ handles: this.products })
        .then((response) => {
          this.items = response
        })
        .catch((error) => void error)
    },

    /**
     * Returns the price object for a product.
     *
     * @param {object} product - The product returned from Nacelle.
     * @returns {object} - An object of price and compare at price.
     */
    getProductPriceObject(product) {
      const compareAtPrices = product.variants.map(({ compareAtPrice }) =>
        Number(compareAtPrice)
      )

      return {
        price: Number(product.priceRange.min),
        compareAt: Math.min(...compareAtPrices)
      }
    },

    /**
     * Creates a new carousel instance.
     */
    constructCarousel() {
      this.carousel = new Swiper(this.$refs.carousel, {
        slidesPerView: 1.5,
        spaceBetween: 32,
        centeredSlides: true,
        loop: true,
        breakpoints: {
          768: {
            centeredSlides: false,
            slidesPerView: 4,
            spaceBetween: 56
          },

          1600: {
            slidesPerView: 6
          }
        }
      })
    },

    /**
     * Navigates to the previous slide in the carousel.
     */
    goToPreviousSlide() {
      if (!this.carousel) {
        return
      }

      this.carousel.slidePrev()
    },

    /**
     * Navigates to the next slide in the carousel.
     */
    goToNextSlide() {
      if (!this.carousel) {
        return
      }

      this.carousel.slideNext()
    }
  }
}
</script>

<style lang="scss">
@import '~swiper/css/swiper';

.product-carousel {
  overflow: hidden;
  position: relative;

  &__header {
    margin-bottom: ($SPACING_M + $SPACING_2XS);
    text-align: center;
  }

  &__subtitle,
  &__subtitle.body-1 {
    color: $COLOR_TEXT_SECONDARY;
    margin-bottom: $SPACING_S;
    text-transform: uppercase;
  }

  &__title {
    margin: $SPACING_S 0 0;
  }

  &__navigation {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-top: ($SPACING_M + $SPACING_2XS);
    width: 100%;
  }

  &__control {
    @include button-reset;
    align-items: center;
    background-color: $COLOR_BACKGROUND_WHITE;
    border: 1px solid $COLOR_BORDER_LIGHT;
    border-radius: 50%;
    color: $COLOR_PRIMARY;
    display: flex;
    height: 32px;
    justify-content: center;
    width: 32px;

    .icon {
      height: 22.4px;
      width: 22.4px;
    }
  }

  @include mq($from: large) {
    &__header {
      margin-bottom: ($SPACING_3XL + $SPACING_XS);
    }

    &__subtitle,
    &__subtitle.body-1 {
      margin-bottom: $SPACING_XS;
    }

    &__title {
      margin: $SPACING_XS 0 0;
    }

    &__carousel {
      padding: 0 ($SPACING_3XL + $SPACING_XS);
    }

    &__pagination {
      display: none;
    }

    &__navigation {
      left: 0;
      padding: 0 $SPACING_XL;
      position: absolute;
      top: 60%;
      transform: translateY(-50%);
      z-index: 2;
    }
  }

  .product-card {
    width: 100%;

    &__reviews {
      overflow: hidden;
    }
  }

  @include mq($from: wide) {
    &__control {
      height: 48px;
      width: 48px;

      .icon {
        height: 33.6px;
        width: 33.6px;
      }
    }
  }
}
</style>
