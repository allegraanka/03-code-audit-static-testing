<template>
  <form
    class="app-header-search"
    :class="{ 'app-header-search--has-query': search !== '' }"
    @submit.prevent="$emit('submit') && $refs.input.blur()"
  >
    <button
      class="app-header-search__button app-header-search__button--clear"
      type="button"
      @click="clearSearch"
    >
      <icon-close />

      <span class="visually-hidden">
        {{ $t('header.search.clear') }}
      </span>
    </button>

    <span class="app-header-search__button app-header-search__button--search">
      <icon-search />
    </span>

    <input
      ref="input"
      v-model="search"
      type="search"
      :placeholder="$t('header.search.placeholder')"
      @keyup="onKeyUp"
      @focus="$emit('focus')"
    />

    <button class="app-header-search__button app-header-search__button--submit">
      <icon-arrow-forward />
    </button>
  </form>
</template>

<script>
import IconArrowForward from '@/assets/icons/directional-arrow-forward.svg?inline'
import IconClose from '@/assets/icons/misc-close.svg?inline'
import IconSearch from '@/assets/icons/misc-search.svg?inline'

export default {
  components: {
    IconArrowForward,
    IconClose,
    IconSearch
  },

  props: {
    value: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      focused: false,
      search: ''
    }
  },

  watch: {
    /**
     * Watches for changes to the local search value.
     * - Emits the value to the parent.
     * @param {number} value - The latest value.
     */
    search(value) {
      this.$emit('input', value)
    },

    /**
     * Watches for changes to the prop.
     * - Handles the case where multiple instances share the same remote state value.
     *
     * @param {string} value - The current value of the prop.
     */
    value(value) {
      if (value !== this.search) {
        this.search = value
      }
    }
  },

  methods: {
    /**
     * Handles the keyup event on the input.
     * @param {object} event - The event payload.
     */
    onKeyUp(event) {
      this.$emit('focus', event)
    },

    /**
     * Clears the search field.
     */
    clearSearch() {
      this.search = ''
      this.$emit('cleared')
    }
  }
}
</script>

<style lang="scss">
.app-header-search {
  $parent: &;
  align-items: center;
  background-color: $COLOR_BACKGROUND_MID;
  display: flex;
  position: relative;

  &__button {
    @include button-reset;
    color: $COLOR_PRIMARY;
    left: $SPACING_M;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    .icon {
      display: block;
    }

    &#{&}--clear {
      display: none;
    }

    &#{&}--submit {
      display: none;
      left: unset;
      right: $SPACING_XS + $SPACING_3XS;
    }
  }

  /* prettier-ignore */
  input[type=search] {
    @extend %caption;
    background-color: transparent;
    border: 0;
    font-size: ms(0);
    max-height: 44px;
    padding: $SPACING_M $SPACING_L $SPACING_M $SPACING_3XL;

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      -webkit-appearance: none;
    }

    &::placeholder {
      color: $COLOR_TEXT_SECONDARY;
      font-size: ms(-2);
    }
  }

  &#{&}--has-query {
    #{$parent}__button--submit {
      display: block;
    }

    @include mq($until: large) {
      #{$parent}__button--search {
        display: none;
      }

      #{$parent}__button--clear {
        display: block;
      }
    }
  }

  @include mq($from: large) {
    align-items: center;
    display: flex;

    &__button {
      left: $SPACING_S;

      &#{&}--submit {
        right: $SPACING_S;
      }
    }

    /* prettier-ignore */
    input[type=search] {
      border: 1px solid $COLOR_BORDER_LIGHT;
      font-size: ms(-1);
      max-height: 48px;
      padding-left: $SPACING_XL + $SPACING_S;

      &:focus-visible {
        border-color: $COLOR_PRIMARY;
        outline: none;
      }

      &::placeholder {
        font-size: ms(-1);
      }
    }
  }
}
</style>
