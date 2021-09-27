<template>
  <div class="item-add-on" :class="classes">
    <div class="item-add-on__top">
      <div class="item-add-on__checkbox">
        <div class="checkbox__container">
          <input id="ItemAddOn" type="checkbox" class="checkbox__input" />

          <label for="ItemAddOn" class="checkbox__label">
            Protect my shoes with IMBOX Shoe Care for £3.99
          </label>
        </div>
      </div>

      <button class="item-add-on__toggle" @click.prevent="toggleContent">
        <icon-help class="item-add-on__help-icon" />
        <icon-close class="item-add-on__close-icon" />
      </button>
    </div>

    <div class="item-add-on__content body-2">Content</div>
  </div>
</template>

<script>
import IconClose from '@/assets/icons/misc-close.svg?inline'
import IconHelp from '@/assets/icons/misc-help.svg?inline'

export default {
  components: {
    IconClose,
    IconHelp
  },

  data() {
    return {
      expanded: false
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
    display: none;
    padding: 0 1.25rem $SPACING_M $SPACING_M;

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
    .checkbox__label {
      &::before {
        top: 10%;
      }

      &::after {
        top: 20%;
      }
    }
  }
}
</style>
