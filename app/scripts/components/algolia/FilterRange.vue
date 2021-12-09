<template>
  <ais-range-input class="filter-range" :attribute="name">
    <template #default="{ canRefine, currentRefinement, refine, range }">
      <div
        class="filter-range__container"
        :class="{ 'filter-range__container--hidden': !canRefine }"
      >
        <div class="filter-range__inputs">
          <input
            class="filter-range__input"
            type="number"
            :value="currentRefinement.min || range.min"
            :min="range.min"
            :max="currentRefinement.max || range.max"
            name="min"
            @change="($event) => handleInput($event, currentRefinement, range)"
          />

          <input
            class="filter-range__input"
            type="number"
            :value="currentRefinement.max || range.max"
            :min="currentRefinement.min || range.min"
            :max="range.max"
            name="max"
            @change="($event) => handleInput($event, currentRefinement, range)"
          />
        </div>

        <slider
          ref="slider"
          :value="toValue(currentRefinement, range)"
          :contained="true"
          :min="range.min"
          :max="range.max"
          :marks="getMarks(range)"
          @change="($event) => handleChange($event, refine)"
        />
      </div>
    </template>
  </ais-range-input>
</template>

<script>
import Slider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'

import 'vue-slider-component/dist-css/vue-slider-component.css'

export default {
  components: {
    Slider
  },

  props: {
    name: {
      type: String,
      required: true
    }
  },

  methods: {
    /**
     * Returns an array of marks for the range slider.
     * - Calculates an equal step so there's around 5 marks.
     *
     * @param {object} range - The range points.
     * @param {number} range.min - The bottom end of the range.
     * @param {number} range.max - The top end of the range.
     * @returns {Array} - The mark points.
     */
    getMarks({ min, max }) {
      const marks = []
      const step = Math.ceil(max / 5)

      for (let i = min; i <= max; i += step) {
        marks.push(i)
      }

      /**
       * Prepends the minimum as the first mark if the lowest mark:
       * - is more than the minimum AND
       * - the difference is more than or equal to the step (halved)
       */
      if (marks[0] > min && marks[0] - min >= Math.ceil(step / 2)) {
        marks.unshift(min)
      }

      /**
       * Appends the maximum as the last mark if the highest mark:
       * - is less than the maximum AND
       * - the difference is more than or equal to the step (halved)
       */
      if (
        marks[marks.length - 1] < max &&
        max - marks[marks.length - 1] >= Math.ceil(step / 2)
      ) {
        marks.push(max)
      }

      return marks
    },

    /**
     * Transforms given values to the initial range state.
     *
     * @param {object} value - The current values.
     * @param {object} range - The static range.
     * @returns {Array} - An array of min and max values.
     */
    toValue(value, range) {
      return [value.min || range.min, value.max || range.max]
    },

    /**
     * Handles the range value change event.
     *
     * @param {Array} event - The event payload.
     * @param {Function} refine - The refine method from Algolia.
     */
    handleChange(event, refine) {
      refine({
        min: event[0],
        max: event[1]
      })
    },

    /**
     * Handles the input of the number fields.
     * - Determines the type of input.
     * - Updates the range component with checks.
     *
     * @param {object} event - The event object.
     * @param {object} current - The currently filtered values.
     * @param {object} range - The min and max for the options.
     */
    handleInput(event, current, range) {
      const type = event.target.name
      const value = Number(event.target.value)
      const max = current.max || range.max
      const min = current.min || range.min

      if (type === 'min') {
        if (value < range.min) {
          return
        }

        this.$refs.slider.setValue([value, max])
        return
      }

      if (value > range.max) {
        return
      }

      this.$refs.slider.setValue([min, value])
    }
  }
}
</script>

<style lang="scss">
.filter-range {
  &__container {
    &#{&}--hidden {
      display: none;
    }
  }

  &__inputs {
    display: flex;
    gap: ($SPACING_M + $SPACING_2XS);
    justify-content: space-between;
    position: relative;

    &::before {
      background-color: $COLOR_BORDER_DARK;
      content: '';
      display: block;
      height: 1px;
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 6px;
    }
  }

  &__input {
    appearance: textfield;
    background-color: $COLOR_BACKGROUND_WHITE;
    border: 1px solid $COLOR_BORDER_DARK;
    border-radius: 0;
    font-size: ms(-1);
    height: 40px;
    min-width: 0;
    padding: $SPACING_S;
  }

  .vue-slider {
    margin: $SPACING_L 0 $SPACING_XL;
  }

  .vue-slider-rail {
    background-color: rgba($COLOR_PRIMARY, 0.2);
    border-radius: 0;
    height: 3px;
  }

  .vue-slider-process {
    background-color: $COLOR_PRIMARY;
  }

  .vue-slider-dot-handle {
    background-color: $COLOR_BACKGROUND_WHITE;
    border: 2px solid $COLOR_PRIMARY;
    border-radius: 50%;
    box-shadow: none;
    height: 19px;
    margin-top: -2px;
    outline: 2px solid $COLOR_BACKGROUND_WHITE;
    width: 19px;
  }

  .vue-slider-mark {
    &:first-child,
    &:last-child {
      .vue-slider-mark-step {
        display: none;
      }
    }

    &:first-child {
      .vue-slider-mark-label {
        transform: none;
      }
    }

    &:last-child {
      .vue-slider-mark-label {
        transform: translateX(-100%);
      }
    }
  }

  .vue-slider-mark-step {
    background-color: rgba($COLOR_PRIMARY, 0.3);
    border-radius: 0;
    height: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
  }

  .vue-slider-mark-label {
    color: $COLOR_TEXT_SECONDARY;
    font-size: ms(-1);
    margin-top: ($SPACING_M + $SPACING_2XS);
  }

  .vue-slider-dot-tooltip {
    display: none;
  }
}
</style>
