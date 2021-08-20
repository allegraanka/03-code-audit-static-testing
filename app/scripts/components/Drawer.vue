<template>
  <div
    ref="drawer"
    class="drawer"
    :class="classes"
    :tabindex="tabIndex"
    @keyup.esc="close"
  >
    <button v-if="!hideHeader" class="drawer__header" @click.prevent="close">
      <span class="body-2" v-text="closeLabel" />
    </button>

    <div ref="body" class="drawer__body">
      <slot />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'
import { createFocusTrap } from 'focus-trap'

export default {
  props: {
    namespace: {
      type: [Boolean, String],
      default: false
    },

    leftAlign: {
      type: Boolean,
      default: false
    },

    forceOpen: {
      type: Boolean,
      default: false
    },

    closeLabel: {
      type: String,
      default: 'Close'
    },

    hideHeader: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    /**
     * Maps the Vuex getters.
     */
    ...mapGetters({
      activeDrawer: 'drawers/activeDrawer'
    }),

    /**
     * Maps the Vuex state.
     */
    ...mapState({
      allDrawers: ({ drawers }) => drawers.drawers
    }),

    /**
     * Returns the dynamic classes.
     * @returns {object} - The object of classes.
     */
    classes() {
      return {
        'drawer--left': this.leftAlign,
        'is-active': this.isActive
      }
    },

    /**
     * Returns the final namespace for the drawer.
     * - If a custom namespace doesn't exist, we generate a unique one.
     *
     * @returns {string} - The namespace.
     */
    drawerNamespace() {
      return this.namespace ? this.namespace : `drawer-${this._uid}`
    },

    /**
     * Returns if the drawer is active.
     * - Based on the `drawers` Vuex module.
     * - Can be forced open with `forceOpen`.
     *
     * @returns {boolean} - The active state.
     */
    isActive() {
      if (this.forceOpen) {
        return true
      }

      return this.activeDrawer && this.activeDrawer === this.drawerNamespace
    },

    /**
     * Returns the tabindex for the drawer.
     * @returns {number} - The tabindex value.
     */
    tabIndex() {
      return this.isActive ? 0 : -1
    },

    /**
     * Returns the drawer object from the state.
     * @returns {object} - The drawer instance.
     */
    drawerObject() {
      return this.allDrawers.find((drawer) => {
        return drawer.namespace === this.drawerNamespace
      })
    }
  },

  watch: {
    /**
     * Watches for changes to the active state.
     * @param {boolean} value - The current value.
     */
    isActive(value) {
      if (value) {
        this.createFocusTrap()
        this.trapFocus()

        disableBodyScroll(this.$refs.body)
        return
      }

      this.releaseFocus()
      enableBodyScroll(this.$refs.body)
    }
  },

  mounted() {
    this.registerDrawer(this.drawerNamespace)
  },

  methods: {
    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      closeDrawer: 'drawers/closeDrawer',
      registerDrawer: 'drawers/registerDrawer'
    }),

    /**
     * Closes the current drawer.
     */
    close() {
      if (this.isActive) {
        this.closeDrawer(this.drawerNamespace)
      }
    },

    /**
     * Creates the focus trap.
     * - When opening, pass `returnFocusToBody` if the toggle
     *   won't be visible when this drawer is closed.
     */
    createFocusTrap() {
      const options = {
        allowOutsideClick: true,
        escapeDeactivates: false
      }

      if (this.drawerObject) {
        if (this.drawerObject.returnFocusToBody) {
          options.setReturnFocus = () => document.body
        }
      }

      this.focusTrap = createFocusTrap(this.$refs.drawer, options)
    },

    /**
     * Traps focus in the drawer.
     */
    trapFocus() {
      if (this.focusTrap) {
        this.focusTrap.activate()
      }
    },

    /**
     * Releases focus from the drawer.
     */
    releaseFocus() {
      if (this.focusTrap) {
        this.focusTrap.deactivate()
      }
    }
  }
}
</script>

<style lang="scss">
.drawer {
  @include animation-drawer-slide;
  background-color: $COLOR_BACKGROUND_LIGHT;
  height: 100%;
  max-width: 400px;
  position: fixed;
  right: 0;
  top: 0;
  transform: translateX(100%);
  width: 100%;
  z-index: 12;

  &__header {
    @include button-reset;
    background-color: $COLOR_BACKGROUND_LIGHT;
    cursor: pointer;
    padding: $SPACING_S $SPACING_L;
    text-align: left;
    width: 100%;
  }

  &.is-active {
    transform: translateX(0);
  }

  &#{&}--left {
    left: 0;
    right: unset;
    transform: translateX(-100%);

    &.is-active {
      transform: translateX(0);
    }
  }
}
</style>
