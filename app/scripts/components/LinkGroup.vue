<template>
  <div class="link-group">
    <template v-if="!isDesktop">
      <div v-swiper:carousel="carouselSettings">
        <div class="swiper-wrapper">
          <div v-for="link in links" :key="link.id" class="swiper-slide">
            <app-link class="link-group__link body-1" :href="link.href">
              {{ link.label }}
            </app-link>
          </div>
        </div>
      </div>

      <button
        v-if="!isDesktop && hasMoreSlides"
        class="link-group__control"
        :class="{ 'link-group__control--end': isEnd }"
        @click.prevent="handleControlClick"
      >
        <span class="visually-hidden">{{ controlLabel }}</span>
        <icon-arrow-forward />
      </button>
    </template>

    <div v-else>
      <div class="link-group__row">
        <app-link
          v-for="link in links"
          :key="link.id"
          class="link-group__link body-1"
          :href="link.href"
        >
          {{ link.label }}
        </app-link>
      </div>
    </div>
  </div>
</template>

<script>
import { directive } from 'vue-awesome-swiper'

import AppLink from '~/components/AppLink'

import IconArrowForward from '@/assets/icons/directional-arrow-forward.svg?inline'

export default {
  components: {
    AppLink,
    IconArrowForward
  },

  directives: {
    swiper: directive
  },

  props: {
    links: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      isDesktop: false,
      isEnd: false,
      hasMoreSlides: false,
      carouselSettings: {
        slidesPerView: 2.5,
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
          768: {
            slidesPerView: 4.5
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
      return this.isEnd
        ? this.$t('product.swatches.goToStart')
        : this.$t('product.swatches.next')
    }
  },

  mounted() {
    window.addEventListener('resize', this.handleResizeEvent)

    this.handleResizeEvent()
    this.setCarouselDefaults()
  },

  unmounted() {
    window.removeEventListener('resize', this.handleResizeEvent)
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
     * Handles the resize event method.
     * - Constructs carousels on mobile, destorys on desktop.
     */
    handleResizeEvent() {
      this.isDesktop = window.matchMedia('(min-width: 1024px)').matches
    }
  }
}
</script>

<style lang="scss">
@import '~swiper/css/swiper';

.link-group {
  display: flex;

  &__row {
    display: flex;
    flex-wrap: wrap;
  }

  &__link,
  &__link.body-1 {
    align-items: center;
    background-color: $COLOR_BACKGROUND_WHITE;
    border: 1px solid $COLOR_BORDER_LIGHT;
    color: $COLOR_BACKGROUND_DARK;
    display: flex;
    justify-content: center;
    margin: 0 $SPACING_S 0 0;
    padding: ($SPACING_XS + $SPACING_3XS) $SPACING_XL;
    text-align: center;
    text-decoration: none;
    transition: all 0.15s $EASING_EASE_OUT;
    white-space: nowrap;

    &:hover {
      background-color: $COLOR_PRIMARY;
      border-color: $COLOR_PRIMARY;
      color: $COLOR_TEXT_INVERSE;
    }
  }

  &__control {
    @include button-reset;
    align-items: center;
    background-color: $COLOR_BACKGROUND_MID;
    display: flex;
    flex: 0 0 40px;
    justify-content: center;
    width: 40px;

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

  .swiper-container {
    margin-left: 0;
  }
}
</style>
