<template>
  <nav class="app-nav">
    <template v-for="(item, index) in items">
      <div
        :key="index"
        class="app-nav__item-container"
        :class="getItemContainerClasses(item)"
      >
        <component
          :is="item.link ? 'nuxt-link' : 'span'"
          :to="item.link"
          class="app-nav__item body-1"
          :class="getItemClasses(item)"
        >
          {{ item.name }}
        </component>

        <mega-nav
          v-if="item.children && item.children.length > 0"
          :banner="item.promotionalBanner"
          :columns="item.children"
        />
      </div>
    </template>
  </nav>
</template>

<script>
import MegaNav from '~/components/MegaNav'

export default {
  components: {
    MegaNav
  },

  props: {
    items: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    /**
     * Returns the dynamic classes for a nav item.
     *
     * @param {object} item -The navigation item.
     * @returns {object} - The classes.
     */
    getItemClasses(item) {
      return {
        'app-nav__item--highlight': item.highlight,
        'app-nav__item--has-children': item.children && item.children.length > 0
      }
    },

    /**
     * Returns the dynamic classes for a nav item container.
     *
     * @param {object} item -The navigation item.
     * @returns {object} - The classes.
     */
    getItemContainerClasses(item) {
      return {
        'app-nav__item-container--has-children':
          item.children && item.children.length > 0
      }
    }
  }
}
</script>

<style lang="scss">
.app-nav {
  $parent: &;
  display: flex;
  justify-content: center;

  &__item-container {
    &#{&}--has-children {
      .mega-nav {
        @include animation-overlay;
        opacity: 0;
        pointer-events: none;
      }

      &:hover {
        #{$parent}__item {
          &::before {
            opacity: 1;
          }
        }

        .mega-nav {
          opacity: 1;
          pointer-events: auto;
        }
      }
    }
  }

  &__item {
    color: $COLOR_TEXT_PRIMARY;
    cursor: pointer;
    display: block;
    margin: 0;
    padding: $SPACING_M $SPACING_L;
    position: relative;
    /* stylelint-disable-next-line */
    text-decoration: none !important;
    z-index: 0;

    &.body-1 {
      margin: 0;
    }

    &#{&}--highlight {
      color: $COLOR_SUPPORT_ERROR;
    }

    &::before {
      @include animation-overlay;
      background-color: $COLOR_BACKGROUND_MID;
      content: '';
      display: block;
      height: calc(100% + 2px);
      left: 0;
      opacity: 0;
      position: absolute;
      top: -1px;
      width: 100%;
      z-index: -1;
    }

    &:hover {
      &:not(.app-nav__item--highlight) {
        color: inherit;
      }

      &::before {
        opacity: 1;
      }
    }
  }

  a {
    text-decoration: none;
  }

  @include mq($from: large) {
    &__item {
      margin-right: $SPACING_L;
    }
  }
}
</style>
