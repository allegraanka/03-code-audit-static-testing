<template functional>
  <div class="highlight-list">
    <div
      v-for="(item, index) in props.items"
      :key="item._key ? item._key : `highlight-${index}`"
      class="highlight-list__item"
    >
      <span class="highlight-list__icon">
        <icon-tick />
      </span>

      <rich-content class="body-1" :content="item.content" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import IconTick from '@/assets/icons/misc-tick.svg?inline'
import RichContent from '~/components/RichContent'

Vue.component('IconTick', IconTick)
Vue.component('RichContent', RichContent)

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
.highlight-list {
  color: $COLOR_TEXT_SECONDARY;

  &__item {
    align-items: center;
    display: flex;
    margin-bottom: $SPACING_M;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__icon {
    align-items: center;
    background-color: $COLOR_SECONDARY;
    border-radius: 50%;
    display: flex;
    height: 24px;
    justify-content: center;
    margin-right: $SPACING_M;
    width: 24px;

    .icon {
      height: 11.25px;
      width: 11.25px;
    }
  }
}
</style>
