<template>
  <fieldset class="swatch-grid">
    <div class="swatch-grid__header">
      <legend class="swatch-grid__title subtitle-1">{{ title }}</legend>

      <p v-if="status" class="swatch-grid__status subtitle-1">{{ status }}</p>
      <p v-if="showSelection" class="swatch-grid__selection">{{ selected }}</p>

      <button
        v-if="linkLabel"
        class="swatch-grid__link body-2"
        type="button"
        @click="linkHandler"
      >
        {{ linkLabel }}
      </button>
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
          :disabled="item.disabled"
          :value="item.value"
        />

        <label
          class="swatch-grid__label body-1"
          :class="{ 'swatch-grid__label--image': images[index] }"
          :for="`option-${transform(title)}-value-${index}`"
        >
          <responsive-image
            v-if="images[index]"
            :alt="item.value"
            :src="images[index]"
            :max-height="60"
            :max-width="60"
            source="shopify"
          />

          <template v-else>
            {{ item.value }}
          </template>
        </label>
      </div>
    </div>
  </fieldset>
</template>

<script>
import { transform } from '~/helpers/utils'

import ResponsiveImage from '~/components/ResponsiveImage'

export default {
  components: {
    ResponsiveImage
  },

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
    },

    status: {
      type: String,
      default: null
    },

    linkLabel: {
      type: String,
      default: null
    },

    linkHandler: {
      type: Function,
      default: () => {}
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
    margin: 0 0 0 $SPACING_XS;
  }

  &__status {
    color: $COLOR_SUPPORT_WARNING;
    margin: 0 0 0 $SPACING_XS;
  }

  &__link,
  &__link.body-2 {
    @include button-reset;
    font-size: ms(-1);
    margin-left: auto;
    text-decoration: underline;
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

      &:disabled + #{$parent}__label {
        /* prettier-ignore */
        background: linear-gradient(to top left, rgba($COLOR_BORDER_LIGHT, 0) 0, rgba($COLOR_BORDER_LIGHT, 0) calc(50% - 0.8px), rgba($COLOR_BORDER_LIGHT, 1) 50%, rgba($COLOR_BORDER_LIGHT, 0) calc(50% + 0.8px), rgba($COLOR_BORDER_LIGHT, 0) 100%);
        background-color: $COLOR_BACKGROUND_LIGHT;
        color: $COLOR_TEXT_LIGHT;
        cursor: not-allowed;
        overflow: hidden;
        position: relative;
      }
    }

    #{$parent}__label {
      align-items: center;
      border: 1px solid $COLOR_BORDER_LIGHT;
      cursor: pointer;
      display: flex;
      justify-content: center;
      min-height: 40px;
      min-width: 60px;
      overflow: hidden;
      padding: $SPACING_XS $SPACING_M;

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

  @include mq($from: large) {
    &__header {
      margin-bottom: calc(#{$SPACING_2XS} + 1px);
    }

    &__link,
    &__link.body-2 {
      font-size: ms(0);
    }

    &__label--image {
      margin-top: $SPACING_2XS;
    }
  }
}
</style>
