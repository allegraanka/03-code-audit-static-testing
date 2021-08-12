<template>
  <focus-trap
    ref="focusTrap"
    :active="isActive"
    :initial-focus="() => $refs.drawer"
    @deactivate="close"
  >
    <div
      ref="drawer"
      class="drawer"
      :class="classes"
      :tabindex="tabIndex"
    >
      <button
        v-if="!hideHeader"
        class="drawer__header"
        @click.prevent="close"
      >
        <span
          class="body-2"
          v-text="closeLabel"
        />
      </button>

      <div
        ref="body"
        class="drawer__body"
      >
        <slot />
      </div>
    </div>
  </focus-trap>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'
import { FocusTrap } from 'focus-trap-vue'

export default {
  components: {
    FocusTrap
  },

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
      activeDrawer: 'drawers/activeDrawer',
      isOverlayOpen: 'windowOverlayOpen'
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
    }
  },

  watch: {

    /**
     * Watches for changes to the active state.
     */
    isActive() {
      this.handleActiveState()
    },

    /**
     * Watches for the window overlay close event.
     * @param {boolean} value - The current state.
     */
    isOverlayOpen(value) {
      if (this.isActive && !value) {
        this.close()
      }
    }
  },

  mounted() {
    this.registerDrawer(this.drawerNamespace)
    this.handleActiveState()
  },

  methods: {

    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      closeDrawer: 'drawers/closeDrawer',
      closeWindowOverlay: 'closeWindowOverlay',
      registerDrawer: 'drawers/registerDrawer',
      openWindowOverlay: 'openWindowOverlay'
    }),

    /**
     * Closes the current drawer.
     */
    close() {
      this.closeDrawer(this.drawerNamespace)
    },

    /**
     * Handles the active state.
     * - Locks body scroll if active.
     */
    handleActiveState() {
      if (this.isActive) {
        this.trapFocus()
        this.openWindowOverlay()

        disableBodyScroll(this.$refs.body)
        return
      }

      this.releaseFocus()
      this.closeWindowOverlay()

      enableBodyScroll(this.$refs.body)
    },

    trapFocus() {
      this.$refs.focusTrap.activate()
    },

    releaseFocus() {
      this.$refs.focusTrap.deactivate()
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
  }
}
</style>
