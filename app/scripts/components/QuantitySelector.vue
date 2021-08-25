<template>
  <div class="quantity-selector">
    <button
      ref="decrease"
      class="quantity-selector__control"
      @click.prevent="decrease"
    >
      <svg
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.9335 8.66665H3.63086V7.33331H12.9335V8.66665Z"
          fill="black"
        />
      </svg>

      <span class="visually-hidden">Reduce quantity by 1</span>
    </button>

    <input
      ref="input"
      v-model="quantity"
      class="quantity-selector__input"
      type="number"
      :max="maximum"
      :min="minimum"
    />

    <button
      ref="increase"
      class="quantity-selector__control"
      @click.prevent="increase"
    >
      <svg
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.369 8.66665H9.3822V12.6666H8.05325V8.66665H4.06641V7.33331H8.05325V3.33331H9.3822V7.33331H13.369V8.66665Z"
          fill="black"
        />
      </svg>

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
  background-color: $COLOR_BACKGROUND_WHITE;
  border: 1px solid $COLOR_BORDER_DARK;
  display: grid;
  font-size: ms(-1);
  grid-template-columns: 30% 40% 30%;

  &__control {
    @include button-reset;
    align-items: center;
    border-right: 0.66px solid $COLOR_BORDER_DARK;
    cursor: pointer;
    display: flex;
    justify-content: center;

    &:last-child {
      border-left: 0.66px solid $COLOR_BORDER_DARK;
      border-right: 0;
    }
  }

  &__input {
    appearance: textfield;
    border: 0;
    height: 30px;
    min-width: 0;
    padding: 0;
    text-align: center;
  }

  @include mq($from: large) {
    font-size: ms(0);
  }
}
</style>
