<template>
  <svg class="loader" x="0px" y="0px" viewBox="0 0 150 150" :style="styles">
    <circle class="loader__circle" cx="75" cy="75" r="60" />
  </svg>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 150
    },

    width: {
      type: Number,
      default: 150
    }
  },

  computed: {
    /**
     * Returns the dynamic styles.
     * @returns {object} - The inline styles.
     */
    styles() {
      return {
        height: `${this.height}px`,
        width: `${this.width}px`
      }
    }
  }
}
</script>

<style lang="scss">
.loader {
  animation: loader 2s linear infinite;
  transform: rotate(0);
  transform-origin: 50% 50%;
  width: 100px;

  &__circle {
    animation: loader-circle 3s $EASING_EASE_IN_OUT infinite;
    fill: transparent;
    stroke: currentColor;
    stroke-dasharray: 300;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    stroke-miterlimit: 5;
    stroke-width: 8;
  }
}

@keyframes loader {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes loader-circle {
  0% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: -600;
  }
}
</style>
