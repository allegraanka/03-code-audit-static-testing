<template>
  <div class="quantity-selector">
    <button class="quantity-selector__control" @click.prevent="decrease">
      -
      <span class="visually-hidden">Reduce quantity by 1</span>
    </button>

    <input
      v-model="quantity"
      class="quantity-selector__input"
      type="number"
      :max="maximum"
      :min="minimum"
    />

    <button class="quantity-selector__control" @click.prevent="increase">
      +
      <span class="visually-hidden">Increase quantity by 1</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    },

    maximum: {
      type: [Boolean, Number],
      default: false
    },

    minimum: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {
      quantity: this.value
    }
  },

  watch: {
    /**
     * Watches for changes to the local quantity value.
     * - Emits the value to the parent.
     * @param {number} value - The latest value.
     */
    quantity(value) {
      this.$emit('input', value)
    }
  },

  methods: {
    /**
     * Increases the local quantity by 1.
     * - Returns if the maximum has been hit.
     */
    increase() {
      if (this.maximum && this.quantity === this.maximum) {
        return
      }

      this.quantity++
    },

    /**
     * Decreases the local quantity by 1.
     * - Returns if the minimum has been hit.
     */
    decrease() {
      if (this.minimum && this.quantity === this.minimum) {
        return
      }

      this.quantity--
    }
  }
}
</script>

<style lang="scss">
.quantity-selector {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  &__input {
    text-align: center;
  }
}
</style>
