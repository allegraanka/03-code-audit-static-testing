<template>
  <nav class="app-nav">
    <template v-for="(item, index) in items">
      <nuxt-link
        v-if="item.link"
        :key="index"
        :to="item.link"
        class="app-nav__item body-1"
        :class="getItemClasses(item)"
      >
        {{ item.name }}
      </nuxt-link>

      <span
        v-else
        :key="index"
        class="app-nav__item body-1"
        :class="getItemClasses(item)"
      >
        {{ item.name }}
      </span>
    </template>
  </nav>
</template>

<script>
export default {
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
    }
  }
}
</script>

<style lang="scss">
.app-nav {
  display: flex;
  justify-content: center;

  &__item {
    color: $COLOR_TEXT_PRIMARY;
    cursor: pointer;
    margin: 0;
    padding: $SPACING_M $SPACING_L;
    position: relative;
    text-decoration: none;
    z-index: 0;

    &.body-1 {
      margin: 0;
    }

    &#{&}--highlight {
      color: $COLOR_SUPPORT_ERROR;
    }

    &::before {
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
