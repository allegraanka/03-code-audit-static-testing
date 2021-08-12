<template>
  <div
    class="drawer"
    :class="classes"
  >
    <slot />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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
      registerDrawer: 'drawers/registerDrawer'
    })
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
