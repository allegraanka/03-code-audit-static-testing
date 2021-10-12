<template>
  <section class="hero-banner">
    <div ref="carousel" class="hero-banner__carousel">
      <div class="swiper-wrapper">
        <div
          v-for="slide in slides"
          :key="slide._key"
          class="hero-banner__slide swiper-slide"
          :class="{
            'hero-banner__slide--sale': slide.style === 'sale',
            'hero-banner__slide--no-content': !slideHasContent(slide)
          }"
        >
          <div
            class="hero-banner__image"
            :class="{
              'hero-banner__image--4-5': slide.imageRatio === '4:5',
              'hero-banner__image--9-16': slide.imageRatio === '9:16',
              'hero-banner__image--has-padding': slide.imagePadding
            }"
          >
            <component
              :is="getSlideImageComponent(slide)"
              :href="slide.imageLink"
              class="hero-banner__image-link"
            >
              <responsive-image
                v-if="slide.image"
                :src="slide.image.asset.url"
                :alt="slide.title"
              />
            </component>
          </div>

          <div
            v-if="slideHasContent(slide)"
            class="hero-banner__content-container"
          >
            <div class="hero-banner__content">
              <p v-if="slide.subtitle" class="hero-banner__subtitle">
                {{ slide.subtitle }}
              </p>

              <h3 v-if="slide.title" class="hero-banner__title h1">
                {{ slide.title }}
              </h3>

              <div v-if="slide.body" class="hero-banner__body large-body">
                {{ slide.body }}
              </div>

              <div v-if="slide.callToActions" class="hero-banner__actions">
                <div class="hero-banner__actions-group">
                  <app-button
                    v-for="action in slide.callToActions"
                    :key="action._key"
                    :label="action.label"
                    :url="action.link"
                    :variant="
                      slide.style === 'sale'
                        ? 'light'
                        : action.style || 'primary'
                    "
                  />
                </div>
              </div>

              <div v-if="slide.buttonGroup" class="hero-banner__buttons">
                <span
                  v-if="slide.buttonGroup.title"
                  class="body-2 hero-banner__buttons-title"
                >
                  {{ slide.buttonGroup.title }}
                </span>

                <div
                  v-if="slide.buttonGroup.buttons"
                  class="hero-banner__buttons-group"
                >
                  <app-link
                    v-for="button in slide.buttonGroup.buttons"
                    :key="button._key"
                    class="hero-banner__button"
                    :href="button.link"
                  >
                    {{ button.label }}
                  </app-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="hero-banner__pagination">
      <button
        class="hero-banner__control"
        type="button"
        @click="carousel && carousel.slidePrev()"
      >
        <span class="visually-hidden">
          {{ $t('sections.heroBanner.goToPrevious') }}
        </span>

        <icon-chevron-left />
      </button>

      <div class="hero-banner__dots">
        <button
          v-for="(slide, index) in slides"
          :key="slide._key"
          class="hero-banner__dot"
          :class="{
            'hero-banner__dot--active': realIndex === index
          }"
          type="button"
          @click="carousel && carousel.slideTo(index + 1)"
        >
          <span class="visually-hidden">
            {{
              $tc('sections.heroBanner.goToSlide', 1, { position: index + 1 })
            }}
          </span>
        </button>
      </div>

      <button
        class="hero-banner__control"
        type="button"
        @click="carousel && carousel.slideNext()"
      >
        <span class="visually-hidden">
          {{ $t('sections.heroBanner.goToNext') }}
        </span>

        <icon-chevron-right />
      </button>
    </div>
  </section>
</template>

<script>
import Swiper from 'swiper'

import AppButton from '~/components/AppButton'
import AppLink from '~/components/AppLink'
import ResponsiveImage from '~/components/ResponsiveImage'

import IconChevronLeft from '@/assets/icons/directional-chevron-left.svg?inline'
import IconChevronRight from '@/assets/icons/directional-chevron-right.svg?inline'

export default {
  components: {
    AppButton,
    AppLink,
    IconChevronLeft,
    IconChevronRight,
    ResponsiveImage
  },

  props: {
    slides: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      realIndex: 0
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
      this.carousel = new Swiper(this.$refs.carousel, {
        autoHeight: true,
        slidesPerView: 1,
        observer: true,
        observeParents: true,
        loop: true,
        on: {
          realIndexChange: () => {
            this.realIndex = this.carousel.realIndex
          }
        }
      })
    },

    /**
     * Returns true if the given slide has content.
     *
     * @param {object} slide - The slide object.
     * @returns {boolean} - The content state.
     */
    slideHasContent(slide) {
      return (
        slide.body || slide.buttonGroup || slide.callToActions || slide.title
      )
    },

    /**
     * Returns the component name for a slide image.
     *
     * @param {object} slide - The slide object.
     * @returns {string} - The component.
     */
    getSlideImageComponent(slide) {
      return slide.imageLink ? 'app-link' : 'div'
    }
  }
}
</script>

<style lang="scss">
@import '~swiper/css/swiper';

.hero-banner {
  $parent: &;
  position: relative;

  &__carousel {
    overflow: hidden;
  }

  &__slide {
    background-color: $COLOR_BACKGROUND_MID;
    padding-bottom: $LAYOUT_XL;

    &#{&}--sale {
      background-color: $COLOR_SALE;
      color: $COLOR_TEXT_INVERSE;

      #{$parent}__body,
      #{$parent}__buttons-title {
        color: inherit;
      }

      #{$parent}__title {
        font-size: ms(4);
      }
    }

    &#{&}--no-content {
      padding-bottom: 0;

      #{$parent}__image--has-padding {
        border: 0;
      }
    }
  }

  &__image {
    max-height: 650px;
    overflow: hidden;
    padding-top: 75%;
    pointer-events: none;
    position: relative;

    .responsive-image {
      display: block;
      height: 100%;
      left: 50%;
      object-fit: cover;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
    }

    &#{&}--4-5 {
      padding-top: 125%;
    }

    &#{&}--9-16 {
      padding-top: 177777778%;
    }

    &#{&}--has-padding {
      border-left: $SPACING_M solid transparent;
      border-right: $SPACING_M solid transparent;
      border-top: $SPACING_M solid transparent;
      padding-top: 60%;
    }
  }

  &__image-link {
    display: inline;
    pointer-events: auto;
  }

  &__content {
    $gutter_width: calc(#{$SPACING_L} - 1px);
    padding: $SPACING_XL $gutter_width 0 $gutter_width;
  }

  &__subtitle {
    margin-bottom: $SPACING_XS;
    text-align: center;
    text-transform: uppercase;
  }

  &__title,
  &__title.h1 {
    margin: 0 0 0.625rem;
    text-align: center;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__body {
    color: $COLOR_TEXT_SECONDARY;
    margin: 0 0 0.625rem;
    text-align: center;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__actions {
    margin: 1.375rem 0 $SPACING_L;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__actions-group {
    @include gap($SPACING_M);
    display: flex;
    justify-content: center;

    .button {
      width: 100%;
    }
  }

  &__buttons-title,
  &__buttons-title.body-2 {
    align-items: center;
    color: $COLOR_TEXT_SECONDARY;
    display: flex;
    font-size: ms(-2);
    justify-content: center;
    margin-bottom: $SPACING_S;
    padding: 0 $SPACING_3XS;
    text-transform: uppercase;
    white-space: nowrap;
    width: 100%;

    &::before,
    &::after {
      background-color: $COLOR_BORDER_DARK;
      content: '';
      display: block;
      height: 1px;
      margin: 0 $SPACING_S;
      width: 100%;
    }

    &::before {
      margin-left: 0;
    }

    &::after {
      margin-right: 0;
    }
  }

  &__buttons-group {
    @include gap(0.438rem);
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }

  &__button {
    background-color: $COLOR_BACKGROUND_WHITE;
    border: 1px solid $COLOR_BORDER_LIGHT;
    color: $COLOR_TEXT_PRIMARY;
    display: block;
    flex-grow: 1;
    font-size: ms(-1);
    min-width: 57px;
    padding: $SPACING_2XS $SPACING_M;
    text-align: center;
    text-decoration: none;
  }

  &__pagination {
    bottom: 0;
    display: flex;
    justify-content: space-between;
    left: 0;
    padding: $SPACING_XL $SPACING_M;
    position: absolute;
    width: 100%;
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
    width: 32px;
  }

  &__dots {
    @include gap($SPACING_XS);
    margin: 0 $SPACING_L;
  }

  &__dot {
    @include button-reset;
    background-color: rgba($COLOR_BACKGROUND_WHITE, 0.5);
    border-radius: 50%;
    height: 12px;
    width: 12px;

    &#{&}--active {
      background-color: $COLOR_BACKGROUND_WHITE;
    }
  }

  @include mq($from: large) {
    /**
     * Fixes for equal height slides.
     */
    .swiper-wrapper {
      display: flex;
      /* stylelint-disable-next-line */
      height: auto !important;
    }

    .swiper-slide {
      align-self: stretch;
      /* stylelint-disable-next-line */
      height: auto !important;
    }

    &__slide {
      padding-bottom: $LAYOUT_2XL;

      &#{&}--no-content {
        #{$parent}__image {
          position: static;
          transform: none;
          width: 100%;
        }
      }

      &#{&}--sale {
        #{$parent}__title {
          font-size: ms(6);
        }
      }
    }

    &__image {
      height: 100%;
      /* stylelint-disable-next-line */
      padding-top: 0 !important;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 54%;

      .responsive-image {
        position: static;
        transform: none;
      }

      &#{&}--has-padding {
        @include container;
        border: 0;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        width: 100%;

        .responsive-image {
          border-bottom: $SPACING_XL solid transparent;
          border-top: $SPACING_XL solid transparent;
          float: right;
          max-width: 54%;
        }
      }
    }

    &__content-container {
      @include container;
    }

    &__content {
      max-width: 350px;
      padding: calc(8rem - 1px) 0 0;
    }

    &__subtitle {
      margin-bottom: $SPACING_S;
      margin-top: -$SPACING_S;
      text-align: left;
    }

    &__title,
    &__title.h1 {
      font-size: ms(5);
      margin: 0 0 $SPACING_M;
      text-align: left;
    }

    &__body {
      max-width: 408px;
      text-align: left;
    }

    &__actions {
      margin: $SPACING_XL 0;
    }

    &__actions-group {
      justify-content: flex-start;

      .button {
        width: auto;
      }
    }

    &__buttons {
      display: inline-block;
    }

    &__buttons-title,
    &__buttons-title.body-2 {
      font-size: ms(-1);
      padding: 0;

      &::before {
        display: none;
      }

      &::after {
        margin-left: 1.125rem;
        margin-right: 0;
      }
    }

    &__buttons-group {
      justify-content: flex-start;
    }

    &__button {
      min-width: 74px;
    }

    &__pagination {
      @include container;
      justify-content: flex-start;
      left: 50%;
      margin: $LAYOUT_M auto;
      transform: translateX(-50%);
    }

    &__control {
      height: 40px;
      width: 40px;
    }
  }

  @include mq($from: wide) {
    &__content {
      max-width: 448px;
    }
  }
}
</style>
