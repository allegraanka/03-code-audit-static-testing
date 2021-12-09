<template>
  <div class="filter-drawer-attribute">
    <div class="filter-drawer-attribute__header">
      <button class="filter-drawer-attribute__close" @click="$emit('close')">
        <icon-arrow-backward />
        {{ $t('collection.backToFilters') }}
      </button>

      <span v-if="title" class="filter-drawer-attribute__title">
        {{ title }}
      </span>
    </div>

    <div class="filter-drawer-attribute__body">
      <attribute :name="name" :type="type" />
    </div>
  </div>
</template>

<script>
import Attribute from '~/components/algolia/Attribute'

import IconArrowBackward from '@/assets/icons/directional-arrow-backward.svg?inline'

export default {
  components: {
    Attribute,
    IconArrowBackward
  },

  props: {
    title: {
      type: String,
      default: ''
    },

    type: {
      type: String,
      default: ''
    },

    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-drawer-attribute {
  background-color: $COLOR_BACKGROUND_WHITE;
  padding: 0 $SPACING_M;

  &__header {
    align-items: center;
    border-bottom: 1px solid $COLOR_BORDER_LIGHT;
    display: flex;
    /* stylelint-disable-next-line */
    padding: ($SPACING_M + $SPACING_2XS) $SPACING_XS ($SPACING_M + $SPACING_2XS)
      $SPACING_2XS;
  }

  &__close {
    @include button-reset;
    align-items: center;
    color: $COLOR_PRIMARY;
    display: flex;
    justify-content: center;

    .icon {
      margin-right: ($SPACING_XS + $SPACING_3XS);
    }
  }

  &__title {
    color: $COLOR_TEXT_SECONDARY;
    margin-left: auto;
  }

  &__body {
    margin: $SPACING_L 0;
  }
}
</style>
