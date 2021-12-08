<template>
  <div class="accordion-item" :class="{ 'is-active': isActive }">
    <button
      ref="control"
      class="accordion-item__control"
      aria-expanded="false"
      @click="$emit('accordion-control-click')"
    >
      <h3 class="accordion-item__label h4">{{ label }}</h3>
      <component
        :is="iconComponent"
        v-if="iconComponent"
        :class="`accordion-item__icon accordion-item__icon--${icon}`"
      />
    </button>

    <div class="accordion-item__content">
      <slot />
    </div>
  </div>
</template>

<script>
import Caret from '@/assets/icons/directional-caret-down.svg?inline'
import Chevron from '@/assets/icons/directional-chevron-right.svg?inline'

export default {
  components: {
    Chevron,
    Caret
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
    },
    icon: {
      type: [String, Boolean],
      default: false
    }
  },

  computed: {
    /**
     * Returns matching icon component name
     * @returns {string} - The icon component name
     */
    iconComponent() {
      if (!this.icon) {
        return
      }

      const registeredComponent = Object.keys(this.$options.components).find(
        (key) => key.toLowerCase() === this.icon
      )
      return registeredComponent
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

    #{$parent}__icon--chevron {
      transform: rotateZ(90deg);
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
