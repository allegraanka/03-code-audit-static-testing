<template>
  <div class="product-gallery">
    <div class="product-gallery__carousel">
      <button
        class="product-gallery__control"
        @click="carousel && carousel.slidePrev()"
      >
        <span class="visually-hidden">Go to previous slide</span>
        <icon-chevron-left />
      </button>

      <div ref="carousel" class="swiper-container">
        <div class="swiper-wrapper">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="product-gallery__item swiper-slide"
          >
            <responsive-image
              :alt="getItemAltText(item, index)"
              :src="item.src"
            />
          </div>
        </div>
      </div>

      <button
        class="product-gallery__control product-gallery__control--right"
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
        @click="carousel && carousel.slideToLoop(index)"
      >
        <span class="visually-hidden">Go to slide {{ index + 1 }}</span>
        <img :alt="getItemAltText(item, index)" :src="item.src" />
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'

import ResponsiveImage from '~/components/ResponsiveImage'

import IconChevronLeft from '@/assets/icons/directional-chevron-left.svg?inline'
import IconChevronRight from '@/assets/icons/directional-chevron-right.svg?inline'

export default {
  components: {
    IconChevronLeft,
    IconChevronRight,
    ResponsiveImage
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
      carousel: null
    }
  },

  mounted() {
    this.constructCarousel()
  },

  methods: {
    /**
     * Constructs the carousel instance.
     */
    constructCarousel() {
      if (this.items.length <= 1) {
        return
      }

      this.carousel = new Swiper(this.$refs.carousel, {
        slidesPerView: 1,
        loop: true,
        observer: true,
        observeParents: true
      })
    },

    /**
     * Returns the classes for the given thumbnail.
     *
     * @param {number} index - The thumbnail index.
     * @returns {object} - The classes.
     */
    getThumbnailClasses(index) {
      return {
        'product-gallery__thumbnail--active':
          this.carousel && this.carousel.realIndex === index
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
  &__carousel {
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
  }

  &__item {
    align-items: center;
    display: flex;
    justify-content: center;
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
