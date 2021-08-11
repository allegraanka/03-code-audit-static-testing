<template>
  <div
    class="drawer"
    :class="classes"
  />
</template>

<script>
export default {
  props: {
    leftAlign: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    
    /**
     * Returns the dynamic classes.
     * @returns {object} - The object of classes.
     */
    classes() {
      return {
        'drawer--left': this.leftAlign
      }
    }
  }
}
</script>

<style lang="scss">
.drawer {
  background-color: $COLOR_BACKGROUND_LIGHT;
  height: 100%;
  max-width: 400px;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;

  &#{&}--left {
    left: 0;
    right: unset;
  }
}
</style>
