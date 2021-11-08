<template>
  <div class="accordion" :class="classes">
    <slot
      :handleClick="(id) => handleControlEvent(id)"
      :activeItems="activeItems"
    />
  </div>
</template>

<script>
export default {
  props: {
    defaultState: {
      type: String,
      default: 'collapseAll'
    },
    singleOpen: {
      type: Boolean,
      default: true
    },
    hasDesktopColumns: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      activeItems: []
    }
  },

  computed: {
    /**
     * Returns the mapped items.
     * @returns {Array}
     */
    items() {
      return this.$children.map((child) => child.id)
    },

    /**
     * Returns the container classes.
     * @returns {object}
     */
    classes() {
      return {
        'accordion--desktop-columns': this.hasDesktopColumns
      }
    }
  },

  mounted() {
    this.setDefaultState()
  },

  methods: {
    /**
     * Handles the control event.
     * - Updates the active identifier.
     * @param {string} - The item identifier.
     * @param id
     */
    handleControlEvent(id) {
      this.activeItems.indexOf(id) >= 0
        ? this.collapseItem(id)
        : this.expandItem(id)
    },

    /**
     * Sets the default state.
     * - Handles the defaultState prop value.
     */
    setDefaultState() {
      const initialItem = this.items[0]

      switch (this.defaultState) {
        case 'expandAll':
          this.expandAllItems()
          break

        case 'expandInitial':
          this.expandItem(initialItem)
          this.collapseOtherItems(initialItem)
          break

        default:
          this.collapseAllItems()
      }
    },

    /**
     * Collapses an item.
     * @param {string} id - The item to collapse.
     */
    collapseItem(id) {
      const index = this.activeItems.indexOf(id)
      this.activeItems.splice(index, 1)
    },

    /**
     * Collapses all items.
     */
    collapseAllItems() {
      this.activeItems = []
    },

    /**
     * Expands all items.
     */
    expandAllItems() {
      this.activeItems = []
      this.activeItems.push(...this.items)
    },

    /**
     * Expands a given item.
     * @param {string} id - The item identifier.
     */
    expandItem(id) {
      if (this.singleOpen) {
        this.collapseOtherItems(id)
      }

      this.activeItems.push(id)
    },

    /**
     * Collapses all other items than the given.
     * @param {string} id - The item to keep open.
     */
    collapseOtherItems(id) {
      this.activeItems = this.activeItems.filter((item) => item === id)
    }
  }
}
</script>

<style lang="scss">
.accordion {
  width: 100%;

  @include mq($from: large) {
    &#{&}--desktop-columns {
      display: grid;
      grid-template-columns: repeat(3, 1fr);

      .accordion-item {
        &__control {
          cursor: auto;
          padding-top: 0;
          pointer-events: none;
        }

        &__content {
          display: block;
          padding-bottom: 0;
        }

        &__icon {
          display: none;
        }
      }
    }
  }
}
</style>
