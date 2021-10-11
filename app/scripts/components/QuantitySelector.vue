<template>
  <div class="quantity-selector">
    <button
      ref="decrease"
      class="quantity-selector__control"
      :disabled="minimum && quantity <= minimum"
      @click.prevent="decrease"
    >
      <icon-minus />

      <span class="visually-hidden">
        {{ $t('quantitySelector.decrease') }}
      </span>
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
      :disabled="maximum && quantity >= maximum"
      @click.prevent="increase"
    >
      <icon-plus />

      <span class="visually-hidden">
        {{ $t('quantitySelector.increase') }}
      </span>
    </button>
  </div>
</template>

<script>
import IconMinus from '@/assets/icons/misc-minus.svg?inline'
import IconPlus from '@/assets/icons/misc-plus.svg?inline'

export default {
  components: {
    IconMinus,
    IconPlus
  },

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
  border: 1px solid $COLOR_BORDER_LIGHT;
  border-radius: 24px;
  display: grid;
  font-size: ms(-1);
  grid-template-columns: 30% 40% 30%;
  overflow: hidden;

  &__control {
    @include button-reset;
    align-items: center;
    background-color: $COLOR_SECONDARY;
    border-radius: 50%;
    color: $COLOR_PRIMARY;
    cursor: pointer;
    display: flex;
    justify-content: center;
    width: 32px;
    z-index: 2;

    &:last-child {
      position: relative;
      right: 3px;
    }

    &:disabled {
      background-color: $COLOR_BACKGROUND_LIGHT;
      color: $COLOR_TEXT_LIGHT;
      cursor: not-allowed;
    }
  }

  &__input {
    appearance: textfield;
    border: 0;
    height: 32px;
    min-width: 0;
    padding: 0;
    text-align: center;
  }

  @include mq($from: large) {
    font-size: ms(0);
  }
}
</style>
