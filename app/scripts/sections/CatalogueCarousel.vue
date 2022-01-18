<template>
  <section v-if="slides.length > 0" class="catalogue-carousel">
    <div class="container">
      <div class="catalogue-carousel__inner">
        <button
          class="catalogue-carousel__control"
          :class="previousControlClasses"
          @click="carousel && carousel.slidePrev()"
        >
          <span class="visually-hidden">
            {{ $t('product.gallery.goToPrevious') }}
          </span>

          <icon-chevron-left />
        </button>

        <div v-swiper:carousel="carouselSettings">
          <div class="swiper-wrapper">
            <div v-for="item in slides" :key="item._key" class="swiper-slide">
              <div class="swiper-zoom-container">
                <responsive-image
                  v-if="item.image && item.image.asset"
                  :src="item.image.asset.url"
                  :alt="item.altText"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          class="catalogue-carousel__control catalogue-carousel__control--right"
          :class="nextControlClasses"
          @click="carousel && carousel.slideNext()"
        >
          <span class="visually-hidden">
            {{ $t('product.gallery.goToNext') }}
          </span>

          <icon-chevron-right />
        </button>

        <div class="catalogue-carousel__zoom-wrapper">
          <button
            class="catalogue-carousel__zoom-control"
            @click="carousel.zoom.in()"
          >
            <span class="visually-hidden">
              {{ $t('sections.catalogueCarousel.zoomIn') }}
            </span>
            <icon-plus />
          </button>

          <button
            class="catalogue-carousel__zoom-control"
            @click="carousel.zoom.out()"
          >
            <span class="visually-hidden">
              {{ $t('sections.catalogueCarousel.zoomOut') }}
            </span>
            <icon-minus />
          </button>
        </div>
      </div>
    </div>

    <catalogue-products :products="products" :title="title" />
  </section>
</template>

<script>
import { directive } from 'vue-awesome-swiper'

import CatalogueProducts from '~/components/CatalogueProducts'
import ResponsiveImage from '~/components/ResponsiveImage'

import IconChevronLeft from '@/assets/icons/directional-chevron-left.svg?inline'
import IconChevronRight from '@/assets/icons/directional-chevron-right.svg?inline'
import IconMinus from '@/assets/icons/misc-minus.svg?inline'
import IconPlus from '@/assets/icons/misc-plus.svg?inline'

export default {
  components: {
    IconChevronLeft,
    IconChevronRight,
    IconMinus,
    IconPlus,
    CatalogueProducts,
    ResponsiveImage
  },

  directives: {
    swiper: directive
  },

  props: {
    slides: {
      type: Array,
      default: () => []
    },

    title: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      realIndex: 0,
      isEnd: false,
      isBeginning: true,
      products: this.slides[0]?.products,

      carouselSettings: {
        slidesPerView: 1,
        zoom: true,
        breakpoints: {
          1024: {
            slidesPerView: 2
          }
        },
        on: {
          realIndexChange: () => {
            this.handleRealIndexChange()
          },

          slideChange: () => {
            this.handleSlideChange()
          }
        }
      }
    }
  },

  computed: {
    /**
     * Returns the dynamic classes for the previous button.
     * @returns {object} - The classes.
     */
    previousControlClasses() {
      return {
        'catalogue-carousel__control--disabled': this.isBeginning
      }
    },

    /**
     * Returns the dynamic classes for the next button.
     * @returns {object} - The classes.
     */
    nextControlClasses() {
      return {
        'catalogue-carousel__control--disabled': this.isEnd
      }
    }
  },

  methods: {
    /**
     * Handles the real index change event.
     */
    handleRealIndexChange() {
      this.realIndex = this.carousel.realIndex
    },

    /**
     * Handles the slide change event.
     */
    handleSlideChange() {
      this.isEnd = this.carousel.isEnd
      this.isBeginning = this.carousel.isBeginning
      this.products = this.slides[this.carousel.realIndex].products
    }
  }
}
</script>

<style lang="scss">
@import '~swiper/css/swiper';

.catalogue-carousel {
  &__inner {
    padding: 0 $SPACING_L + $SPACING_2XS;
    position: relative;
  }

  &__control {
    @include button-reset;
    align-items: center;
    background-color: $COLOR_BACKGROUND_WHITE;
    border: 1px solid $COLOR_BORDER_LIGHT;
    border-radius: 50%;
    color: $COLOR_PRIMARY;
    display: flex;
    height: 28px;
    justify-content: center;
    left: -$SPACING_XS;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 28px;
    z-index: 2;

    &#{&}--right {
      left: unset;
      right: -$SPACING_XS;
    }

    &#{&}--disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  &__zoom-wrapper {
    display: flex;
    justify-content: center;
    margin-top: $SPACING_M;
  }

  &__zoom-control {
    @include button-reset;
    border: 1px solid $COLOR_BORDER_DARK;
    height: 26px;
    width: 26px;

    &:not(:last-child) {
      margin-right: $SPACING_S;
    }
  }

  .swiper-slide {
    display: flex;
  }

  @include mq($from: large) {
    &__inner {
      padding: 0 $LAYOUT_2XL;
    }

    &__control {
      height: 48px;
      left: $LAYOUT_M;
      width: 48px;

      &#{&}--right {
        right: $LAYOUT_M;
      }
    }

    &__zoom-wrapper {
      bottom: 0;
      display: flex;
      flex-direction: column;
      margin-top: 0;
      position: absolute;
      right: $LAYOUT_M + $SPACING_XS;
    }

    &__zoom-control {
      height: 32px;
      width: 32px;

      &:not(:last-child) {
        margin-bottom: $SPACING_S;
        margin-right: 0;
      }

      .icon {
        height: 30px;
        width: 30px;
      }
    }
  }
}
</style>
