<template>
  <div class="swatch-grid">
    <div class="swatch-grid__header">
      <p class="subtitle-1">{{ title }}</p>
      {{ selected }}
    </div>

    <div class="swatch-grid__grid">
      <div
        v-for="(item, index) in values"
        :key="`option-${transform(title)}-value-${index}`"
      >
        <input
          :id="`option-${transform(title)}-value-${index}`"
          v-model="selected"
          type="radio"
          :value="item"
        />

        <label :for="`option-${transform(title)}-value-${index}`">
          {{ item }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { transform } from '~/helpers/utils'

export default {
  props: {
    title: {
      type: String,
      default: 'Select an option'
    },

    values: {
      type: Array,
      default: () => []
    },

    value: {
      type: [Boolean, String],
      default: false
    }
  },

  data() {
    return {
      selected: this.value ? this.value : this.values[0]
    }
  },

  watch: {
    /**
     * Watches for changes to the local selected value.
     * - Emits the value to the parent.
     * @param {number} value - The latest value.
     */
    selected(value) {
      this.$emit('input', value)
    }
  },

  methods: {
    transform
  }
}
</script>
