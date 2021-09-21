<template>
  <div class="announcement-banner" :class="classes">
    <div ref="carousel" class="announcement-banner__carousel swiper-container">
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
  </div>
</template>

<script>
import Swiper from 'swiper'

export default {
  props: {
    items: {
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
          this.activeItem && this.activeItem.styles?.backgroundColor === 'white'
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
      this.carousel = new Swiper(this.$refs.carousel, {
        slidesPerView: 1,
        loop: true,
        observer: true,
        observeParents: true,
        autoplay: true
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
  @include animation-text-link(background-color);
  align-items: center;
  background-color: $COLOR_PRIMARY;
  color: $COLOR_TEXT_INVERSE;
  display: flex;
  justify-content: center;
  padding: $SPACING_XS 0;
  width: 100%;

  &__item {
    @include animation-text-link;
    font-size: ms(-1);
    text-align: center;
    width: 100%;

    &#{&}--dark {
      color: $COLOR_TEXT_PRIMARY;
    }
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
}
</style>
