<template>
  <div class="announcement-banner">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="announcement-banner__item"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
.announcement-banner {
  align-items: center;
  background-color: $COLOR_BACKGROUND_DARK;
  color: $COLOR_TEXT_INVERSE;
  display: flex;
  justify-content: center;
  padding: $SPACING_XS 0;
  width: 100%;

  &__item {
    font-size: ms(-1);
    margin: 0 $SPACING_XL;
    text-align: center;
  }

  @include mq($until: large) {
    &__item {
      &:not(:first-child) {
        @include visually-hidden;
      }
    }
  }
}
</style>
