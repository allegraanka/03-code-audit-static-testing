<template>
  <div class="item-add-on" :class="classes">
    <div class="item-add-on__top">
      <div class="item-add-on__checkbox">
        <div class="checkbox__container">
          <input
            id="ItemAddOn"
            v-model="checked"
            type="checkbox"
            class="checkbox__input"
          />

          <label v-if="label" for="ItemAddOn" class="checkbox__label">
            {{ label }}
          </label>
        </div>
      </div>

      <button class="item-add-on__toggle" @click.prevent="toggleContent">
        <icon-help class="item-add-on__help-icon" />
        <icon-close class="item-add-on__close-icon" />
      </button>
    </div>

    <div class="item-add-on__content body-2">
      <block-content v-if="Array.isArray(content)" :content="content" />

      <template v-else>
        {{ content }}
      </template>
    </div>
  </div>
</template>

<script>
import BlockContent from '~/components/BlockContent'

import IconClose from '@/assets/icons/misc-close.svg?inline'
import IconHelp from '@/assets/icons/misc-help.svg?inline'

export default {
  components: {
    BlockContent,
    IconClose,
    IconHelp
  },

  props: {
    label: {
      type: String,
      default: null
    },

    content: {
      type: [Array, String],
      default: null
    },

    value: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      expanded: false,
      checked: this.value
    }
  },

  computed: {
    /**
     * Returns the dynamic classes.
     * @returns {object} - The dynamic classes.
     */
    classes() {
      return {
        'item-add-on--expanded': this.expanded
      }
    }
  },

  watch: {
    /**
     * Watches for changes to the checked state.
     * @param {boolean} value - The checked value.
     */
    checked(value) {
      this.$emit('input', value)
    }
  },

  methods: {
    /**
     * Toggles the content.
     */
    toggleContent() {
      this.expanded = !this.expanded
    }
  }
}
</script>

<style lang="scss">
.item-add-on {
  $parent: &;
  background-color: $COLOR_BACKGROUND_MID;

  &__top {
    align-items: center;
    display: flex;
    padding: $SPACING_M 1.25rem $SPACING_M $SPACING_M;
  }

  &__toggle {
    @include button-reset;
    align-items: center;
    background-color: $COLOR_PRIMARY;
    border-radius: 50%;
    color: $COLOR_TEXT_INVERSE;
    display: flex;
    flex: 0 0 20px;
    height: 20px;
    justify-content: center;
    margin-left: auto;
    position: relative;
    width: 20px;

    #{$parent}__close-icon {
      display: none;
      height: 16px;
      width: 16px;
    }
  }

  &__content {
    color: $COLOR_TEXT_PRIMARY;
    display: none;
    padding: 0 1.25rem 1.25rem $SPACING_M;

    * {
      color: inherit;
      font-size: inherit;
    }

    ul {
      padding-left: $SPACING_M * 1.2;
    }

    &::before {
      background-color: $COLOR_BORDER_DARK;
      content: '';
      display: block;
      height: 1px;
      margin-bottom: 0.875rem;
      width: 100%;
    }
  }

  &__checkbox {
    padding-right: 20%;
  }

  .checkbox__label {
    padding-left: $SPACING_XL;

    &::before,
    &::after {
      height: 16px;
      width: 16px;
    }

    &::after {
      top: 36%;
    }

    &::before {
      top: 24%;
    }
  }

  &#{&}--expanded {
    #{$parent}__toggle {
      #{$parent}__help-icon {
        display: none;
      }

      #{$parent}__close-icon {
        display: block;
      }
    }

    #{$parent}__content {
      display: block;
    }
  }

  @include mq($from: large) {
    &__top {
      padding: $SPACING_L $SPACING_M;
    }

    &__content {
      padding: 0 $SPACING_M $SPACING_L;
    }

    .checkbox__label {
      &::before {
        top: 10%;
      }

      &::after {
        top: 26%;
      }
    }
  }
}
</style>
