<template>
  <nav class="app-nav">
    <template v-for="(item, index) in items">
      <nuxt-link
        v-if="item.link"
        :key="index"
        :to="item.link"
        class="app-nav__link body-1"
        :class="{
          'app-nav__link--highlight': item.highlight
        }"
      >
        {{ item.name }}
      </nuxt-link>

      <span
        v-else
        :key="index"
        class="app-nav__link body-1"
        :class="{
          'app-nav__link--highlight': item.highlight
        }"
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
  }
}
</script>

<style lang="scss">
.app-nav {
  &__link {
    color: $COLOR_TEXT_PRIMARY;
    margin: 0;
    padding: $SPACING_M 0;

    &.body-1 {
      margin: 0;
    }

    &#{&}--highlight {
      color: $COLOR_SUPPORT_ERROR;
    }
  }

  @include mq($from: large) {
    &__link {
      margin-right: $SPACING_L;
    }
  }
}
</style>
