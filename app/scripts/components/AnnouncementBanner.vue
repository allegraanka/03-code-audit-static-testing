<template>
  <div class="announcement-banner" :class="classes">
    <div class="announcement-banner__links">
      <announcement-banner-link
        v-for="(link, index) in leftLinks"
        :key="index"
        :title="link.title"
        :link="link.link"
        :icon="link.icon"
      />
    </div>

    <div class="announcement-banner__carousel">
      <button
        class="announcement-banner__control"
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
            class="announcement-banner__item subtitle-1 swiper-slide"
            :class="getItemClasses(item)"
          >
            {{ item.title }}
          </div>
        </div>
      </div>

      <button
        class="announcement-banner__control"
        @click="carousel && carousel.slideNext()"
      >
        <span class="visually-hidden">Go to next slide</span>
        <icon-chevron-right />
      </button>
    </div>

    <div class="announcement-banner__links announcement-banner__links--right">
      <announcement-banner-link
        v-for="(link, index) in rightLinks"
        :key="index"
        :title="link.title"
        :link="link.link"
        :icon="link.icon"
      />
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'

import IconChevronLeft from '@/assets/icons/directional-chevron-left.svg?inline'
import IconChevronRight from '@/assets/icons/directional-chevron-right.svg?inline'

import AnnouncementBannerLink from '~/components/AnnouncementBannerLink'

export default {
  components: {
    AnnouncementBannerLink,
    IconChevronLeft,
    IconChevronRight
  },

  props: {
    items: {
      type: Array,
      default: () => []
    },

    links: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      carousel: null
    }
  },

  computed: {
    /**
     * Returns the dynamic classes for the banner.
     * @returns {object} - The dynamic classes.
     */
    classes() {
      return {
        'announcement-banner--dark':
          this.activeItem && this.activeItem.styles?.backgroundColor === 'dark',
        'announcement-banner--light':
          this.activeItem &&
          this.activeItem.styles?.backgroundColor === 'light',
        'announcement-banner--white':
          this.activeItem &&
          this.activeItem.styles?.backgroundColor === 'white',
        'announcement-banner--text-dark':
          this.activeItem && this.activeItem.styles?.textColor === 'dark',
        'announcement-banner--no-carousel': this.items.length <= 1
      }
    },

    /**
     * Returns the active item object.
     * @returns {object} - The item object.
     */
    activeItem() {
      if (!this.carousel) {
        return null
      }

      return this.items[this.carousel.realIndex]
    },

    /**
     * Returns the links for the left.
     * @returns {Array} - The links.
     */
    leftLinks() {
      return this.links.length > 0 ? [this.links[0]] : []
    },

    /**
     * Returns the links for the right.
     * @returns {Array} - The links.
     */
    rightLinks() {
      return this.links.length > 1 ? this.links.slice(1) : []
    }
  },

  mounted() {
    if (this.items.length > 1) {
      this.constructCarousel()
    }
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
        observeParents: true,
        autoplay: {
          disableOnInteraction: false
        }
      })
    },

    /**
     * Returns the dynamic classes for an item.
     *
     * @param {object} item - The announcement item.
     * @returns {object} - The object of classes.
     */
    getItemClasses(item) {
      return {
        'announcement-banner__item--dark': item.styles?.textColor === 'dark'
      }
    }
  }
}
</script>

<style lang="scss">
@import '~swiper/css/swiper';

.announcement-banner {
  $parent: &;
  @include animation-text-link(background-color);
  align-items: center;
  background-color: $COLOR_PRIMARY;
  color: $COLOR_TEXT_INVERSE;
  display: flex;
  padding: $SPACING_2XS 0;
  width: 100%;

  &__links {
    align-items: center;
    display: none;
    gap: $SPACING_L;

    &#{&}--right {
      justify-content: flex-end;
    }
  }

  &__carousel {
    align-items: center;
    display: flex;
    margin: 0 auto;
    width: 100%;
  }

  &__item {
    @include animation-text-link;
    font-size: ms(-1);
    max-width: 100%;
    text-align: center;
    width: 100%;

    &#{&}--dark {
      color: $COLOR_TEXT_PRIMARY;
    }
  }

  &__control {
    @include animation-text-link;
    @include button-reset;
    align-items: center;
    display: flex;

    .icon {
      height: 20px;
      width: 20px;
    }
  }

  &#{&}--text-dark {
    color: $COLOR_TEXT_PRIMARY;
  }

  &#{&}--dark {
    background-color: $COLOR_BACKGROUND_DARK;
  }

  &#{&}--light {
    background-color: $COLOR_BACKGROUND_LIGHT;
  }

  &#{&}--white {
    background-color: $COLOR_BACKGROUND_WHITE;
  }

  &#{&}--no-carousel {
    #{$parent}__control {
      display: none;
    }
  }

  @include mq($from: large) {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    padding-left: $SPACING_M;
    padding-right: $SPACING_M;

    &__carousel {
      max-width: 650px;
    }

    &__item {
      font-size: ms(0);
    }

    &__links {
      display: flex;
    }
  }
}
</style>
