<template>
  <div class="window-overlay" :class="classes" @click="close" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    /**
     * Maps the Vuex getters.
     */
    ...mapGetters({
      isOverlayOpen: 'windowOverlayOpen'
    }),

    /**
     * Sets the dynamic classes.
     * @returns {object} - The classes object.
     */
    classes() {
      return {
        'is-active': this.isOverlayOpen
      }
    }
  },

  methods: {
    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      close: 'closeWindowOverlay'
    })
  }
}
</script>

<style lang="scss">
.window-overlay {
  @include animation-overlay;
  background-color: rgba($COLOR_BACKGROUND_DARK, 0.2);
  cursor: pointer;
  height: 100%;
  left: 0;
  opacity: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 100%;

  &.is-active {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
