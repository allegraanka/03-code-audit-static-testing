<template functional>
  <div
    class="mega-nav-column"
    :class="{
      'mega-nav-column--grid': props.grid,
      'mega-nav-column--wide': props.wide
    }"
  >
    <p
      v-if="props.title"
      class="mega-nav-column__title"
      :class="props.wide ? 'body-2' : 'label'"
    >
      {{ props.title }}
    </p>

    <div v-if="props.items.length > 0" class="mega-nav-column__list">
      <component
        :is="item.link ? 'nuxt-link' : 'span'"
        v-for="(item, itemIndex) in props.items"
        :key="`column-${itemIndex}`"
        :to="item.link"
        class="mega-nav-column__link body-2"
      >
        {{ item.title }}
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
  }
}
</script>

<style lang="scss">
.mega-nav-column {
  $parent: &;

  &__title {
    color: $COLOR_TEXT_LIGHT;
    margin-bottom: $SPACING_XS;
    text-transform: uppercase;

    &.body-2 {
      color: $COLOR_TEXT_PRIMARY;
      margin-bottom: $SPACING_S;
    }
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
