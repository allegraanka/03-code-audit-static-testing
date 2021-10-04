<template>
  <component
    :is="element"
    class="button"
    :class="classes"
    :to="to"
    :href="href"
    :type="buttonType"
  >
    <span v-if="label" class="button__label" v-text="label" />
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

    variant: {
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
    },

    buttonType: {
      type: String,
      default: null
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
        'button--secondary': this.variant === 'secondary',
        'button--outlined': this.variant === 'outlined',
        'button--light': this.variant === 'light'
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
  @include button-reset;
  align-items: center;
  background-color: $COLOR_BUTTON;
  border: 1px solid $COLOR_BUTTON;
  color: $COLOR_TEXT_INVERSE;
  cursor: pointer;
  display: flex;
  font-size: ms(-1);
  font-weight: $WEIGHT_MEDIUM;
  justify-content: center;
  letter-spacing: $LETTER_SPACING_DISPLAY;
  line-height: $LINE_HEIGHT_META;
  min-height: 46px;
  padding: $SPACING_S $SPACING_2XL;
  text-transform: uppercase;
  transition: all 0.15s $EASING_EASE_OUT;

  &__label {
    margin-top: 1px;
  }

  &:not(:disabled):hover {
    background-color: transparent;
    color: $COLOR_BUTTON;
  }

  &#{&}--secondary {
    background-color: $COLOR_LIGHT_BLUE;
    border-color: $COLOR_LIGHT_BLUE;

    &:hover {
      background-color: $COLOR_PRIMARY;
      border-color: $COLOR_PRIMARY;
      color: $COLOR_TEXT_INVERSE;
    }
  }

  &#{&}--outlined {
    background-color: transparent;
    color: $COLOR_BUTTON;

    &:hover {
      background-color: $COLOR_BUTTON;
      color: $COLOR_TEXT_INVERSE;
    }
  }

  &#{&}--light {
    background-color: $COLOR_BACKGROUND_MID;
    border-color: $COLOR_BACKGROUND_MID;
    color: $COLOR_TEXT_PRIMARY;

    &:hover {
      background-color: $COLOR_BUTTON;
      border-color: $COLOR_BUTTON;
      color: $COLOR_TEXT_INVERSE;
    }
  }

  &#{&}--block {
    width: 100%;
  }

  &:disabled {
    background-color: $COLOR_BACKGROUND_MID;
    border-color: $COLOR_BACKGROUND_MID;
    color: $COLOR_TEXT_LIGHT;

    &:hover {
      cursor: not-allowed;
    }
  }

  @include mq($from: large) {
    font-size: ms(0);
    min-height: 52px;
    padding: $SPACING_S $SPACING_3XL;
  }
}
</style>
