<template>
  <div class="item-add-on" :class="classes">
    <div class="item-add-on__top">
      <div class="item-add-on__checkbox">
        <div class="checkbox__container">
          <input
            :id="`${namespace}-ItemAddOn`"
            v-model="checked"
            type="checkbox"
            class="checkbox__input"
            :disabled="!product"
          />

          <label
            v-if="label || (checked && labelAdded)"
            :for="`${namespace}-ItemAddOn`"
            class="checkbox__label checkbox__label--centered"
          >
            {{ checked ? labelAdded : label }}

            <span v-if="checked" class="item-add-on__added">
              {{ $t('product.addOn.added') }}
            </span>
          </label>
        </div>
      </div>

      <button class="item-add-on__toggle" @click.prevent="toggleContent">
        <span class="visually-hidden">
          {{
            expanded
              ? $t('product.addOn.hideContent')
              : $t('product.addOn.showContent')
          }}
        </span>

        <icon-help class="item-add-on__help-icon" />
        <icon-close class="item-add-on__close-icon" />
      </button>
    </div>

    <div class="item-add-on__content body-2">
      <rich-content v-if="Array.isArray(content)" :content="content" />

      <template v-else>
        {{ content }}
      </template>
    </div>
  </div>
</template>

<script>
import RichContent from '~/components/RichContent'

import IconClose from '@/assets/icons/misc-close.svg?inline'
import IconHelp from '@/assets/icons/misc-help.svg?inline'

export default {
  components: {
    RichContent,
    IconClose,
    IconHelp
  },

  props: {
    namespace: {
      type: String,
      default: 'item'
    },

    label: {
      type: String,
      default: ''
    },

    labelAdded: {
      type: String,
      default: ''
    },

    content: {
      type: [Array, String],
      default: null
    },

    small: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      expanded: false,
      checked: false,
      product: false
    }
  },

  computed: {
    /**
     * Returns the dynamic classes.
     * @returns {object} - The dynamic classes.
     */
    classes() {
      return {
        'item-add-on--expanded': this.expanded,
        'item-add-on--small': this.small
      }
    }
  },

  watch: {
    /**
     * Watches for changes to the checked state.
     */
    checked() {
      if (this.checked) {
        this.$emit('select', this.product)
        return
      }

      this.$emit('select')
    },

    /**
     * Watches for changes to the product object.
     * - Sometimes the product is delayed, so it's emitted if checked.
     * @param {object|null} value - The current product value.
     */
    product(value) {
      if (value && this.checked) {
        this.$emit('select', this.product)
      }
    }
  },

  mounted() {
    if (
      this.$settings.product.itemAddOn &&
      this.$settings.product.itemAddOn.handle
    ) {
      this.fetchProduct()
    }
  },

  methods: {
    /**
     * Toggles the content.
     */
    toggleContent() {
      this.expanded = !this.expanded
    },

    /**
     * Fetches the add-on product and sets the local state.
     */
    async fetchProduct() {
      const product = await this.$nacelle.productByHandle(
        this.$settings.product.itemAddOn.handle
      )

      if (product) {
        this.product = product
      }
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
    padding: $SPACING_M ($SPACING_M + $SPACING_2XS) $SPACING_M $SPACING_M;
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
    /* stylelint-disable-next-line */
    padding: 0 ($SPACING_M + $SPACING_2XS) ($SPACING_M + $SPACING_2XS)
      $SPACING_M;

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
      margin-bottom: ($SPACING_M * 0.875);
      width: 100%;
    }
  }

  &__checkbox {
    padding-right: 20%;
  }

  &__added {
    color: $COLOR_SUPPORT_SUCCESS;
    display: block;
  }

  .checkbox__label {
    padding-left: $SPACING_XL;

    &::before,
    &::after {
      height: 16px;
      width: 16px;
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

  &#{&}--small {
    #{$parent}__top {
      padding-bottom: $SPACING_S;
      padding-top: $SPACING_S;
    }

    .checkbox__label {
      max-width: 210px;
    }
  }

  @include mq($from: large) {
    &__top {
      padding: $SPACING_L $SPACING_M;
    }

    &__content {
      padding: 0 $SPACING_M $SPACING_L;
    }
  }
}
</style>
