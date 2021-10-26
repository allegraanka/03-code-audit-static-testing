<template>
  <div class="drawer" :class="classes" @keyup.esc="close">
    <div class="drawer__background" @click.prevent="close" />

    <div ref="drawer" class="drawer__overlay" :tabindex="tabIndex">
      <button
        v-if="!hideHeader"
        ref="header"
        class="drawer__header"
        @click.prevent="close"
      >
        <icon-close />
        <span class="body-1" v-text="closeLabel || $t('drawer.close')" />
      </button>

      <div ref="body" class="drawer__body">
        <slot />
        <slot name="body" />
      </div>

      <div class="drawer__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
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
      default: ''
    },

    hideHeader: {
      type: Boolean,
      default: false
    }
  },

  computed: {
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
      return this.forceOpen ? true : this.drawerObject && this.drawerObject.open
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
      this.setTabIndex()

      if (value) {
        this.createFocusTrap()
        this.trapFocus()
        this.revealImages()

        disableBodyScroll(this.$refs.body)
        return
      }

      this.releaseFocus()
      enableBodyScroll(this.$refs.body)
    }
  },

  mounted() {
    this.registerDrawer(this.drawerNamespace)
    this.setTabIndex()

    if (!this.isActive) {
      this.constructImages()
    }
  },

  updated() {
    this.setTabIndex()

    if (!this.isActive) {
      this.constructImages()
    }
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
    },

    /**
     * Updates the tabindex for focusable elements.
     * @param {number} tabindex - The index to set.
     */
    setTabIndex(tabindex) {
      let toSet = tabindex

      if (!toSet) {
        toSet = this.isActive ? 0 : -1
      }

      const focusable = [
        '[tabindex]',
        '[draggable]',
        'a[href]',
        'area',
        'button:enabled',
        'input:not([type=hidden]):enabled',
        'object',
        'select:enabled',
        'textarea:enabled'
      ]

      if (this.$refs.drawer) {
        this.$refs.drawer
          .querySelectorAll(focusable.join(', '))
          .forEach((element) => {
            element.setAttribute('tabindex', toSet)
          })
      }
    },

    /**
     * Removes the `lazyload` class from all images.
     * - Won't remove if the drawer is already active.
     */
    constructImages() {
      this.$refs.drawer
        .querySelectorAll('.responsive-image')
        .forEach((image) => {
          image.classList.remove('lazyload')
        })
    },

    /**
     * Reveals all images in the drawer.
     * - Adds the `lazyload` class back to trigger lazysizes.
     */
    revealImages() {
      this.$refs.drawer
        .querySelectorAll('.responsive-image')
        .forEach((image) => {
          image.classList.add('lazyload')
        })
    }
  }
}
</script>

<style lang="scss">
.drawer {
  $parent: &;
  height: 100%;
  left: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 24;

  &__background {
    @include animation-overlay;
    background-color: rgba($COLOR_BACKGROUND_DARK, 0.2);
    cursor: pointer;
    height: 100%;
    left: 0;
    opacity: 0;
    position: fixed;
    top: 0;
    width: 100%;
  }

  &__overlay {
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
  }

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
      margin-right: ($SPACING_M * 0.625);
    }
  }

  &__body {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: $SPACING_L $SPACING_M;
  }

  &.is-active {
    pointer-events: auto;

    #{$parent}__background {
      opacity: 1;
    }

    #{$parent}__overlay {
      transform: translateX(0);
    }
  }

  &#{&}--left {
    #{$parent}__overlay {
      left: 0;
      right: unset;
      transform: translateX(-100%);
    }

    &.is-active {
      #{$parent}__overlay {
        transform: translateX(0);
      }
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
