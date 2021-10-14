<template>
  <section class="category-blocks">
    <div class="container">
      <div class="row">
        <div class="col xs12 l6 push-l3">
          <div class="category-blocks__header">
            <p v-if="subtitle" class="category-blocks__subtitle body-1">
              {{ subtitle }}
            </p>

            <h2 v-if="title" class="category-blocks__title">{{ title }}</h2>
          </div>
        </div>
      </div>
    </div>

    <div
      v-for="row in rows"
      :key="row._key"
      class="category-blocks__row"
      :class="getRowClasses(row)"
      :data-row="row._key"
    >
      <button
        v-if="getRowLayout(row) === 6"
        class="category-blocks__control"
        @click.prevent="goToPreviousSlide(row._key)"
      >
        <span class="visually-hidden">
          {{ $t('sections.categoryBlocks.goToPreviousSlide') }}
        </span>

        <icon-chevron-left />
      </button>

      <div
        class="category-blocks__blocks"
        :class="{ 'swiper-wrapper': getRowLayout(row) === 6 }"
      >
        <component
          :is="(block.link && 'app-link') || 'div'"
          v-for="block in row.blocks"
          :key="block._key"
          :href="block.link"
          class="category-blocks__block"
          :class="{ 'swiper-slide': getRowLayout(row) === 6 }"
        >
          <div class="category-blocks__block-image">
            <responsive-image v-if="block.image" :src="block.image.asset.url" />
          </div>

          <h6 v-if="block.title" class="category-blocks__block-title">
            {{ block.title }}
          </h6>
        </component>
      </div>

      <button
        v-if="getRowLayout(row) === 6"
        class="category-blocks__control category-blocks__control--right"
        @click.prevent="goToNextSlide(row._key)"
      >
        <span class="visually-hidden">
          {{ $t('sections.categoryBlocks.goToNextSlide') }}
        </span>

        <icon-chevron-right />
      </button>
    </div>
  </section>
</template>

<script>
import Swiper from 'swiper'

import AppLink from '~/components/AppLink'
import ResponsiveImage from '~/components/ResponsiveImage'

import IconChevronLeft from '@/assets/icons/directional-chevron-left.svg?inline'
import IconChevronRight from '@/assets/icons/directional-chevron-right.svg?inline'

export default {
  components: {
    AppLink,
    IconChevronLeft,
    IconChevronRight,
    ResponsiveImage
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

    rows: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      carousels: {},

      selectors: {
        carousel: '.category-blocks__row--6up',
        slide: '.swiper-slide'
      }
    }
  },

  mounted() {
    window.addEventListener('resize', this.handleResizeEvent)
    this.handleResizeEvent()
  },

  unmounted() {
    window.removeEventListener('resize', this.handleResizeEvent)
  },

  methods: {
    /**
     * Returns the layout of a row.
     *
     * @param {object} row - The row object.
     * @returns {number|null} - The row layout number.
     */
    getRowLayout(row) {
      if (!row.blocks) {
        return null
      }

      if (row.blocks.length > 4) {
        return 6
      }

      if (row.blocks.length > 2 && row.blocks.length <= 4) {
        return 4
      }

      if (row.blocks.length <= 2) {
        return 2
      }
    },

    /**
     * Returns the classes for the row.
     *
     * @param {object} row - The row object.
     * @returns {object} - The classes.
     */
    getRowClasses(row) {
      const layout = this.getRowLayout(row)

      return {
        'category-blocks__row--6up': layout === 6,
        'category-blocks__row--4up': layout === 4,
        'category-blocks__row--2up': layout === 2
      }
    },

    /**
     * Constructs any carousel instances.
     * - Stores then in `carousels` for API usage.
     */
    constructCarousels() {
      this.$el.querySelectorAll(this.selectors.carousel).forEach((row) => {
        if (!this.carousels[row.dataset.row]) {
          this.carousels[row.dataset.row] = new Swiper(row, {
            slidesPerView: 2,
            centeredSlides: true,
            loop: true,
            spaceBetween: 8,
            a11y: {
              enabled: true
            },
            on: {
              init: () => {
                this.updateA11yAttributes(row)
              },

              transitionEnd: () => {
                this.updateA11yAttributes(row)
              },

              destroy: () => {
                this.updateA11yAttributes(row, true)
              }
            }
          })
          return
        }
      })
    },

    /**
     * Destroys existing carousels.
     */
    destroyCarousels() {
      Object.keys(this.carousels).forEach((key) => {
        const instance = this.carousels[key]

        if (instance) {
          instance.destroy()
          delete this.carousels[key]
        }
      })
    },

    /**
     * Handles the resize event method.
     * - Constructs carousels on mobile, destorys on desktop.
     */
    handleResizeEvent() {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches

      if (isDesktop) {
        this.destroyCarousels()
        return
      }

      this.constructCarousels()
    },

    /**
     * Goes to the previous slide for a given carousel.
     * @param {string} key - The carousel key.
     */
    goToPreviousSlide(key) {
      const instance = this.carousels[key]

      if (instance) {
        instance.slidePrev()
      }
    },

    /**
     * Goes to the next slide for a given carousel.
     * @param {string} key - The carousel key.
     */
    goToNextSlide(key) {
      const instance = this.carousels[key]

      if (instance) {
        instance.slideNext()
      }
    },

    /**
     * Updates each slide's accessibility attributes.
     * @param {HTMLElement} container - The container to update.
     * @param {boolean} reset - Resets all a11y attributes.
     */
    updateA11yAttributes(container, reset = false) {
      if (reset) {
        container.querySelectorAll(this.selectors.slide).forEach((slide) => {
          slide.removeAttribute('aria-hidden')
          slide.removeAttribute('tabindex')
        })
        return
      }

      container.querySelectorAll(this.selectors.slide).forEach((slide) => {
        const isVisible = slide.classList.contains('swiper-slide-active')
        const slideIsTabbable = slide.tagName === 'A'

        slide.setAttribute('aria-hidden', !isVisible)

        if (slideIsTabbable) {
          slide.setAttribute('tabindex', isVisible ? 0 : -1)
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '~swiper/css/swiper';

.category-blocks {
  $parent: &;
  overflow: hidden;

  &__header {
    text-align: center;
  }

  &__subtitle,
  &__subtitle.body-1 {
    color: $COLOR_TEXT_SECONDARY;
    margin: 0 0 $SPACING_S;
    text-transform: uppercase;
  }

  &__title {
    margin: 0 0 $SPACING_2XL;
  }

  &__row {
    position: relative;

    &:not(:last-child) {
      margin-bottom: ($SPACING_M + $SPACING_S);
    }

    &#{&}--4up {
      @include container;

      #{$parent}__blocks {
        display: grid;
        grid-column-gap: $SPACING_XS;
        grid-row-gap: ($SPACING_M + $SPACING_2XS);
        grid-template-columns: repeat(2, 1fr);
      }
    }

    &#{&}--2up {
      @include container;

      #{$parent}__blocks {
        display: grid;
        grid-row-gap: ($SPACING_M + $SPACING_2XS);
        grid-template-columns: 1fr;
      }

      #{$parent}__block-image {
        padding-top: 48%;
      }
    }
  }

  &__block {
    text-decoration: none;

    &:hover {
      #{$parent}__block-title {
        transform: translateY(-16px);
      }

      #{$parent}__block-image {
        &::before {
          opacity: 0.2;
        }
      }
    }
  }

  &__block-image {
    background-color: $COLOR_BACKGROUND_LIGHT;
    overflow: hidden;
    padding-top: 100%;
    position: relative;
    width: 100%;

    &::before {
      @include animation-overlay;
      background-color: $COLOR_BACKGROUND_DARK;
      content: '';
      display: block;
      height: 100%;
      left: 0;
      opacity: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 2;
    }

    .responsive-image {
      height: 100%;
      left: 50%;
      object-fit: cover;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
    }
  }

  &__block-title {
    @include animation-modal-slide;
    background-color: $COLOR_BACKGROUND_WHITE;
    color: $COLOR_TEXT_PRIMARY;
    margin: 0;
    padding: $SPACING_S 0;
    position: relative;
    text-align: center;
    z-index: 2;
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
    top: calc(50% - #{$SPACING_M});
    transform: translateY(-50%);
    width: 32px;
    z-index: 2;

    &#{&}--right {
      left: unset;
      right: $SPACING_M;
    }
  }

  @include mq($from: large) {
    &__row {
      &:not(:last-child) {
        margin-bottom: $SPACING_XL;
      }

      &#{&}--6up {
        @include container;

        #{$parent}__blocks {
          display: grid;
          grid-column-gap: $SPACING_M;
          grid-template-columns: repeat(6, 1fr);
        }
      }

      &#{&}--4up {
        #{$parent}__blocks {
          grid-column-gap: $SPACING_M;
          grid-template-columns: repeat(4, 1fr);
        }

        #{$parent}__block-image {
          padding-top: 100%;
        }
      }

      &#{&}--2up {
        #{$parent}__blocks {
          grid-column-gap: $SPACING_M;
          grid-template-columns: repeat(2, 1fr);
        }

        #{$parent}__block-image {
          padding-top: 46%;
        }
      }
    }

    &__block-title {
      padding: ($SPACING_M * 0.875) 0;
    }

    &__control {
      display: none;
    }
  }
}
</style>
