<template>
  <component
    :is="element"
    class="button"
    :class="classes"
    :to="to"
    :href="href"
  >
    <span v-if="label" v-text="label" />
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    label: {
      type: [Boolean, String],
      default: false
    },

    url: {
      type: [Boolean, String],
      default: false
    },

    type: {
      type: String,
      default: 'primary'
    },

    outlined: {
      type: Boolean,
      default: false
    },

    block: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    /**
     * Returns the dynamic element for the component.
     * @returns {string} - The tag name.
     */
    element() {
      if (this.url) {
        if (/(mailto:|tel:|http(s):)/g.test(this.url)) {
          return 'a'
        }

        return 'nuxt-link'
      }

      return 'button'
    },

    /**
     * Returns the dynamic classes.
     * @returns {object} - The class object.
     */
    classes() {
      return {
        'button--block': this.block,
        'button--primary': this.type === 'primary',
        'button--secondary': this.type === 'secondary',
        'button--light': this.type === 'light'
      }
    },

    /**
     * Returns the link value.
     * @returns {string|boolean} - The href state.
     */
    href() {
      return this.element === 'a' ? this.url : false
    },

    /**
     * Returns the `to` value.
     * @returns {string|boolean} - The href state.
     */
    to() {
      return this.element === 'nuxt-link' ? this.url : false
    }
  }
}
</script>

<style lang="scss">
.button {
  @include animation-text-link(background-color);
  @include button-reset;
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: ms(-2);
  font-weight: $WEIGHT_BOLD;
  justify-content: center;
  min-height: 40px;
  padding: $SPACING_S $SPACING_L;
  text-transform: uppercase;

  &#{&}--primary {
    background-color: $COLOR_BUTTON;
    color: $COLOR_TEXT_INVERSE;

    &:not(:disabled):hover {
      background-color: $COLOR_BUTTON_HOVER;
    }
  }

  &#{&}--block {
    width: 100%;
  }

  &:disabled {
    background-color: rgba($COLOR_BORDER_LIGHT, 0.25);
    color: $COLOR_TEXT_LIGHT;

    &:hover {
      cursor: not-allowed;
    }
  }

  @include mq($from: large) {
    font-size: ms(-1);
    min-height: 48px;
    padding: $SPACING_S $SPACING_XL;
  }
}
</style>
