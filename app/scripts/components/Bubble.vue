<template>
  <span class="bubble" :class="classes">
    <span class="bubble__slot">
      <slot />
    </span>
  </span>
</template>

<script>
export default {
  props: {
    wide: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    /**
     * Defines the classes for the container.
     * @returns {object} - The class object.
     */
    classes() {
      return {
        'bubble--wide': this.wide
      }
    }
  }
}
</script>

<style lang="scss">
.bubble {
  align-items: center;
  background-color: $COLOR_PRIMARY;
  border-radius: 8rem;
  color: $COLOR_TEXT_INVERSE;
  display: flex;
  font-size: 9.27px;
  font-weight: $WEIGHT_BOLD;
  height: 16px;
  justify-content: center;
  min-width: 16px;
  padding: $SPACING_2XS;

  &__slot {
    margin-top: -0.25px;
  }

  &#{&}--wide {
    padding: $SPACING_2XS $SPACING_XS;
  }

  @include mq($from: large) {
    font-size: ms(-2);
    height: 23px;
    padding: $SPACING_2XS 0.35rem;
    width: 23px;
  }
}
</style>
