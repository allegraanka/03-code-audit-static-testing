<template>
  <div class="product-gallery" :class="classes">
    <div class="product-gallery__carousel">
      <button
        class="product-gallery__control"
        :class="previousControlClasses"
        @click="carousel && carousel.slidePrev()"
      >
        <span class="visually-hidden">Go to previous slide</span>
        <icon-chevron-left />
      </button>

      <div v-swiper:carousel="carouselSettings">
        <div class="swiper-wrapper">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="product-gallery__item swiper-slide"
          >
            <responsive-image
              :alt="getItemAltText(item, index)"
              :src="item.src"
              :max-height="768"
              :max-width="768"
              source="shopify"
            />
          </div>
        </div>
      </div>

      <button
        class="product-gallery__control product-gallery__control--right"
        :class="nextControlClasses"
        @click="carousel && carousel.slideNext()"
      >
        <span class="visually-hidden">Go to next slide</span>
        <icon-chevron-right />
      </button>
    </div>

    <div class="product-gallery__thumbnails">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="product-gallery__thumbnail"
        :class="getThumbnailClasses(index)"
        @click="carousel && carousel.slideTo(index)"
      >
        <span class="visually-hidden">Go to slide {{ index + 1 }}</span>

        <responsive-image
          :alt="getItemAltText(item, index)"
          :src="item.src"
          :max-height="64"
          :max-width="64"
          source="shopify"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { directive } from 'vue-awesome-swiper'

import ResponsiveImage from '~/components/ResponsiveImage'

import IconChevronLeft from '@/assets/icons/directional-chevron-left.svg?inline'
import IconChevronRight from '@/assets/icons/directional-chevron-right.svg?inline'

export default {
  components: {
    IconChevronLeft,
    IconChevronRight,
    ResponsiveImage
  },

  directives: {
    swiper: directive
  },

  props: {
    items: {
      type: Array,
      default: () => []
    },

    productTitle: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      realIndex: 0,
      isEnd: false,
      isBeginning: true,

      carouselSettings: {
        slidesPerView: 1,
        observer: true,
        observeParents: true,
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
     * Returns the dynamic classes.
     * @returns {object} - The classes.
     */
    classes() {
      return {
        'product-gallery--single': this.items.length <= 1
      }
    },

    /**
     * Returns the dynamic classes for the previous button.
     * @returns {object} - The classes.
     */
    previousControlClasses() {
      return {
        'product-gallery__control--disabled': this.isBeginning
      }
    },

    /**
     * Returns the dynamic classes for the next button.
     * @returns {object} - The classes.
     */
    nextControlClasses() {
      return {
        'product-gallery__control--disabled': this.isEnd
      }
    }
  },

  watch: {
    /**
     * Watches for changes to the slide items.
     *
     * @param {Array} value - The current value.
     * @param {Array} previous - The previous value.
     */
    items(value, previous) {
      if (value !== previous) {
        this.carousel.slideTo(0)
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
    },

    /**
     * Returns the classes for the given thumbnail.
     *
     * @param {number} index - The thumbnail index.
     * @returns {object} - The classes.
     */
    getThumbnailClasses(index) {
      return {
        'product-gallery__thumbnail--active': this.realIndex === index
      }
    },

    /**
     * Returns the alt text for the item.
     *
     * @param {object} item - The item.
     * @param {number} index - The index of the item.
     * @returns {string} - The alt text.
     */
    getItemAltText(item, index) {
      return item.altText || `${this.productTitle} image ${index}`
    }
  }
}
</script>

<style lang="scss">
@import '~swiper/css/swiper';

.product-gallery {
  $parent: &;
  position: relative;

  &__carousel {
    overflow: hidden;
    position: relative;
    z-index: 0;
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
    left: $SPACING_M;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 32px;
    z-index: 2;

    &#{&}--right {
      left: unset;
      right: $SPACING_M;
    }

    &#{&}--disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  &__item {
    align-items: center;
    display: flex;
    justify-content: center;
    position: relative;

    .responsive-image {
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    &::before {
      content: '';
      display: block;
      padding-top: 100%;
      width: 100%;
    }
  }

  &__thumbnails {
    bottom: $SPACING_M;
    display: flex;
    flex-wrap: wrap;
    gap: $SPACING_XS;
    position: absolute;
    right: $SPACING_M;
    z-index: 2;
  }

  &__thumbnail {
    background-color: $COLOR_BACKGROUND_WHITE;
    border: 1px solid $COLOR_BORDER_LIGHT;
    border-radius: 50%;
    cursor: pointer;
    height: 12px;
    width: 12px;

    img {
      display: none;
    }

    &#{&}--active {
      background-color: $COLOR_PRIMARY;
      border-color: $COLOR_PRIMARY;
    }
  }

  &#{&}--single {
    #{$parent}__control {
      display: none;
    }

    #{$parent}__thumbnails {
      display: none;
    }
  }

  .swiper-wrapper {
    align-items: center;
    display: flex;
  }

  @include mq($from: large) {
    &__carousel {
      border: 1px solid $COLOR_BORDER_LIGHT;
    }

    &__thumbnails {
      margin-top: $SPACING_M;
      position: static;
    }

    &__thumbnail {
      border-radius: 0;
      height: 64px;
      overflow: hidden;
      width: 64px;

      img {
        display: block;
        height: 100%;
        object-fit: cover;
        width: 100%;
      }

      &--active {
        background-color: initial;
        border-color: $COLOR_TEXT_PRIMARY;
      }
    }
  }
}
</style>
