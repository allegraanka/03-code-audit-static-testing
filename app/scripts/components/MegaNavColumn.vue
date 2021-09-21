<template>
  <div class="mega-nav-column" :class="classes">
    <p v-if="title" class="mega-nav-column__title label">{{ title }}</p>

    <div v-if="items.length > 0" class="mega-nav-column__list">
      <component
        :is="item.link ? 'nuxt-link' : 'span'"
        v-for="(item, itemIndex) in items"
        :key="`column-${itemIndex}`"
        :to="item.link"
        class="mega-nav-column__link body-2"
      >
        {{ item.name }}
      </component>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },

    items: {
      type: Array,
      default: () => []
    },

    grid: {
      type: Boolean,
      default: false
    },

    wide: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    /**
     * Returns the dyanmic classes for the column.
     * @returns {object} - The classes.
     */
    classes() {
      return {
        'mega-nav-column--grid': this.grid,
        'mega-nav-column--wide': this.wide
      }
    }
  }
}
</script>

<style lang="scss">
.mega-nav-column {
  $parent: &;

  &__title {
    color: $COLOR_TEXT_LIGHT;
    margin-bottom: $SPACING_XS;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: $SPACING_XS;
  }

  &__link {
    display: block;
    margin: 0;
    text-decoration: none;

    &.body-2 {
      margin: inherit;
      text-decoration: inherit;
    }
  }

  &#{&}--grid {
    #{$parent}__list {
      display: flex;
      flex-flow: row wrap;
      gap: $SPACING_S;
      max-width: 222px;
    }

    #{$parent}__link {
      background-color: $COLOR_BACKGROUND_WHITE;
      border: 1px solid $COLOR_BORDER_LIGHT;
      min-width: 66px;
      padding: $SPACING_2XS $SPACING_S;
      text-align: center;
    }
  }

  &#{&}--wide {
    #{$parent}__list {
      grid-template-columns: repeat(5, 1fr);
      max-width: 100%;
    }
  }
}
</style>
