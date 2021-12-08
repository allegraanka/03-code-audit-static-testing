<template>
  <div v-if="breadcrumbs.length > 0" class="menu-drawer-breadcrumbs">
    <div
      v-for="(item, index) in breadcrumbs"
      :key="index"
      class="menu-drawer-breadcrumbs__item label"
    >
      <icon-caret-right
        v-if="index !== 0"
        class="menu-drawer-breadcrumbs__icon"
      />

      {{ item }}
    </div>
  </div>
</template>

<script>
import IconCaretRight from '@/assets/icons/directional-caret-right.svg?inline'

export default {
  components: {
    IconCaretRight
  },

  props: {
    breadcrumbs: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
.menu-drawer-breadcrumbs {
  align-items: center;
  border-bottom: 1px solid $COLOR_BORDER_LIGHT;
  color: $COLOR_TEXT_SECONDARY;
  display: flex;
  padding: $SPACING_L $SPACING_M;

  &__item {
    align-items: center;
    display: flex;
    line-height: $LINE_HEIGHT_CAPTION;
  }

  &__icon {
    margin: 0 $SPACING_2XS + $SPACING_3XS;
    width: auto;

    &.icon {
      height: 20px;
      width: 20px;
    }
  }
}
</style>
