<template>
  <fieldset class="swatch-grid">
    <div class="swatch-grid__header">
      <legend class="swatch-grid__title subtitle-1">{{ title }}</legend>
      <p v-if="showSelection" class="swatch-grid__selection">{{ selected }}</p>
    </div>

    <div class="swatch-grid__grid">
      <div
        v-for="(item, index) in values"
        :key="`option-${transform(title)}-value-${index}`"
        class="swatch-grid__item"
      >
        <input
          :id="`option-${transform(title)}-value-${index}`"
          v-model="selected"
          :name="transform(title)"
          class="swatch-grid__input"
          type="radio"
          :value="item"
        />

        <label
          class="swatch-grid__label body-1"
          :class="{ 'swatch-grid__label--image': images[index] }"
          :for="`option-${transform(title)}-value-${index}`"
        >
          <img v-if="images[index]" :alt="item" :src="images[index]" />

          <template v-else>
            {{ item }}
          </template>
        </label>
      </div>
    </div>
  </fieldset>
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
    },

    images: {
      type: Array,
      default: () => []
    },

    showSelection: {
      type: Boolean,
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

<style lang="scss">
.swatch-grid {
  $parent: &;
  border: 0;
  padding: 0;

  &__header {
    display: flex;
    margin-bottom: $SPACING_S;
  }

  &__selection {
    color: $COLOR_TEXT_SECONDARY;
    margin-left: $SPACING_XS;
  }

  &__title {
    text-transform: none;
  }

  &__grid {
    display: flex;
    flex-wrap: wrap;
    gap: $SPACING_XS;
  }

  &__item {
    #{$parent}__input {
      @include visually-hidden;

      &:checked + #{$parent}__label {
        border-color: $COLOR_TEXT_PRIMARY;
      }
    }

    #{$parent}__label {
      border: 1px solid $COLOR_BORDER_LIGHT;
      cursor: pointer;
      min-width: 60px;
      overflow: hidden;
      padding: $SPACING_S $SPACING_M;
      text-align: center;

      img {
        height: 100%;
        object-fit: cover;
        object-position: top;
        width: 100%;
      }

      &--image {
        height: 59px;
        padding: 0;
        width: 59px;
      }
    }
  }
}
</style>
