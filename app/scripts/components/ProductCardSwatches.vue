<template>
  <div class="product-card-swatches">
    <div v-swiper:carousel="carouselSettings">
      <div class="swiper-wrapper">
        <div
          v-for="(swatch, index) in swatches"
          :key="`swatch-${index}`"
          class="swiper-slide"
        >
          <div
            class="product-card-swatches__swatch"
            :class="{
              'product-card-swatches__swatch--active': activeIndex === index
            }"
            @click="handleSwatchClick(index)"
          >
            <responsive-image :src="swatch.src" :alt="swatch.alt" />
          </div>
        </div>
      </div>
    </div>

    <button
      v-if="hasMoreSlides"
      class="product-card-swatches__control"
      :class="{ 'product-card-swatches__control--end': isEnd }"
      @click.prevent="handleControlClick"
    >
      <span class="visually-hidden">{{ controlLabel }}</span>
      <icon-arrow-forward />
    </button>
  </div>
</template>

<script>
import { directive } from 'vue-awesome-swiper'

import ResponsiveImage from '~/components/ResponsiveImage'

import IconArrowForward from '@/assets/icons/directional-arrow-forward.svg?inline'

export default {
  components: {
    IconArrowForward,
    ResponsiveImage
  },

  directives: {
    swiper: directive
  },

  props: {
    swatches: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      isEnd: false,
      hasMoreSlides: false,
      activeIndex: -1,

      carouselSettings: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 8,

        on: {
          resize: () => {
            this.setCarouselDefaults()
          },

          slideChange: () => {
            this.isEnd = this.carousel && this.carousel.isEnd
          },

          transitionEnd: () => {
            this.isEnd = this.carousel && this.carousel.isEnd
          }
        },

        breakpoints: {
          1024: {
            slidesPerView: 7
          }
        }
      }
    }
  },

  computed: {
    /**
     * Returns the dynamic control button label.
     * @returns {string} - The label.
     */
    controlLabel() {
      return 'Next'
    }
  },

  mounted() {
    this.setCarouselDefaults()
  },

  methods: {
    /**
     * Sets the carousel defaults.
     */
    setCarouselDefaults() {
      this.hasMoreSlides = this.carousel.isBeginning !== this.carousel.isEnd
    },

    /**
     * Handles the control click event.
     */
    handleControlClick() {
      if (this.carousel) {
        if (this.carousel.isEnd) {
          this.carousel.slideTo(0)
          return
        }

        this.carousel.slideNext()
      }
    },

    /**
     * Handles the swatch click event.
     * @param {number} index - The swatch index.
     */
    handleSwatchClick(index) {
      this.activeIndex = index

      this.$emit('swatch-click', this.swatches[index].src)
    }
  }
}
</script>

<style lang="scss">
@import '~swiper/css/swiper';

.product-card-swatches {
  align-items: center;
  border-bottom: 1px solid $COLOR_BORDER_LIGHT;
  border-top: 1px solid $COLOR_BORDER_LIGHT;
  display: flex;
  overflow: hidden;
  padding: $SPACING_XS 0;
  width: 100%;

  .swiper-container {
    margin-left: 0;
    margin-right: 0;
    max-width: 136px;
    width: 100%;
  }

  .swiper-slide {
    width: 28px;
  }

  &__control {
    @include button-reset;
    align-items: center;
    background-color: $COLOR_BACKGROUND_MID;
    display: flex;
    flex: 0 0 28px;
    height: 28px;
    justify-content: center;
    margin-left: $SPACING_XS;
    width: 28px;

    .icon {
      @include animation-icon-hover(transform);
      height: 16px;
      width: 16px;
    }

    &#{&}--end {
      .icon {
        transform: scaleX(-1);
      }
    }
  }

  &__swatch {
    cursor: pointer;
    padding-top: 100%;
    position: relative;

    .responsive-image {
      border: 1px solid transparent;
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    &#{&}--active {
      .responsive-image {
        border-color: $COLOR_BORDER_LIGHT;
      }
    }
  }

  @include mq($from: large) {
    .swiper-container {
      max-width: 244px;
    }
  }
}
</style>
