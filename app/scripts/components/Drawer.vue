<template>
  <div
    ref="drawer"
    class="drawer"
    :class="classes"
    :tabindex="tabIndex"
    @keyup.esc="close"
  >
    <button
      v-if="!hideHeader"
      ref="header"
      class="drawer__header"
      @click.prevent="close"
    >
      <icon-close />
      <span class="body-1" v-text="closeLabel" />
    </button>

    <div ref="body" class="drawer__body">
      <slot />
      <slot name="body" />
    </div>

    <div class="drawer__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'
import { createFocusTrap } from 'focus-trap'

import IconClose from '@/assets/icons/misc-close.svg?inline'

export default {
  components: {
    IconClose
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
      return this.namespace || `drawer-${this._uid}`
    },

    /**
     * Returns if the drawer is active.
     * - Based on the `drawers` Vuex module.
     * - Can be forced open with `forceOpen`.
     *
     * @returns {boolean} - The active state.
     */
    isActive() {
      return this.forceOpen ? true : this.activeDrawer === this.drawerNamespace
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
      } else {
        this.releaseFocus()
        enableBodyScroll(this.$refs.body)
      }
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
  background-color: $COLOR_BACKGROUND_WHITE;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 600px;
  position: fixed;
  right: 0;
  top: 0;
  transform: translateX(100%);
  width: 100%;
  z-index: 12;

  &__header {
    @include button-reset;
    align-items: center;
    background-color: $COLOR_PRIMARY;
    color: $COLOR_TEXT_INVERSE;
    cursor: pointer;
    display: flex;
    padding: $SPACING_S $SPACING_M;
    text-align: left;
    width: 100%;

    .body-1 {
      font-size: ms(0);
    }

    .icon {
      margin-right: 0.625rem;
    }
  }

  &__body {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: $SPACING_L $SPACING_M;
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

  @include mq($from: large) {
    &__header {
      padding: $SPACING_S $SPACING_L;
    }

    &__body {
      padding: $SPACING_3XL;
    }
  }
}
</style>
