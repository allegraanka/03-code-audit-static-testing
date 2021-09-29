<template>
  <div class="accordion-item" :class="{ 'is-active': isActive }">
    <button
      ref="control"
      class="accordion-item__control"
      aria-expanded="false"
      @click="$emit('accordion-control-click')"
    >
      <h3 class="accordion-item__label h4">{{ label }}</h3>
      <caret-down class="accordion-item__icon" />
    </button>

    <div class="accordion-item__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    CaretDown: () => import('@/assets/icons/directional-caret-down.svg?inline')
  },

  props: {
    id: {
      required: true,
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.accordion-item {
  $parent: &;

  &.is-active {
    #{$parent}__content {
      display: block;
    }

    #{$parent}__icon {
      transform: rotateZ(180deg);
    }
  }

  &__control {
    @include button-reset;
    align-items: center;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    padding: $SPACING_M 0;
    width: 100%;
  }

  &__icon {
    pointer-events: none;
  }

  &__label {
    color: $COLOR_PRIMARY;
    margin: 0;
    pointer-events: none;
  }

  &__content {
    display: none;
    padding: $SPACING_XS 0 $SPACING_M 0;
  }
}
</style>
