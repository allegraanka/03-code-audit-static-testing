<template>
  <section class="hero-banner">
    <div v-swiper:carousel="carouselSettings" class="hero-banner__carousel">
      <div class="swiper-wrapper">
        <div
          v-for="slide in slides"
          :key="slide._key"
          class="hero-banner__slide swiper-slide"
          :class="{
            'hero-banner__slide--sale': slide.style === 'sale'
          }"
        >
          <div
            class="hero-banner__image"
            :class="{
              'hero-banner__image--16-9': slide.imageRatio === '16:9',
              'hero-banner__image--4-5': slide.imageRatio === '4:5',
              'hero-banner__image--9-16': slide.imageRatio === '9:16'
            }"
          >
            <responsive-image
              v-if="slide.image"
              :src="slide.image.asset.url"
              :alt="slide.title"
            />
          </div>

          <div class="hero-banner__content">
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
                  :variant="action.style || 'primary'"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { directive } from 'vue-awesome-swiper'

import AppButton from '~/components/AppButton'
import ResponsiveImage from '~/components/ResponsiveImage'

export default {
  components: {
    AppButton,
    ResponsiveImage
  },

  directives: {
    swiper: directive
  },

  props: {
    slides: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      carouselSettings: {
        slidesPerView: 1,
        observer: true,
        observeParents: true
      }
    }
  }
}
</script>

<style lang="scss">
@import '~swiper/css/swiper';

.hero-banner {
  &__carousel {
    overflow: hidden;
  }

  &__slide {
    background-color: $COLOR_BACKGROUND_MID;

    &#{&}--sale {
      background-color: $COLOR_SALE;
    }
  }

  &__image {
    .responsive-image {
      display: block;
    }

    &#{&}--16-9,
    &#{&}--4-5,
    &#{&}--9-16 {
      overflow: hidden;
      position: relative;

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

    &#{&}--16-9 {
      padding-top: 75%;
    }

    &#{&}--4-5 {
      padding-top: 125%;
    }

    &#{&}--9-16 {
      padding-top: 177777778%;
    }
  }

  &__content {
    padding: $SPACING_XL $SPACING_M $SPACING_2XL $SPACING_M;
    text-align: center;
  }

  &__title,
  &__title.h1 {
    margin: 0 0 0.625rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__body {
    color: $COLOR_TEXT_SECONDARY;
    margin: 0 0 0.625rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__actions {
    margin: 1.375rem 0;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__actions-group {
    @include gap($SPACING_M);
    display: flex;
    justify-content: center;
  }
}
</style>
