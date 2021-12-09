<template>
  <ais-refinement-list
    class="filter-list"
    :attribute="name"
    :sort-by="['count:desc', 'name:asc']"
    :class="{
      'filter-list--as-swatches': layout === 'swatches',
      'filter-list--as-grid': layout === 'grid'
    }"
  >
    <template #default="{ canRefine, items, refine }">
      <p v-if="!canRefine" class="filter-list__empty body-2">
        {{ $t('collection.noFacetValues') }}
      </p>

      <div
        class="filter-list__container"
        :class="{ 'filter-list__container--hidden': !canRefine }"
      >
        <div v-for="item in items" :key="item.value" class="filter-list__item">
          <div class="checkbox__container">
            <input
              :id="transform(item.value)"
              type="checkbox"
              class="checkbox__input"
              :checked="item.isRefined"
              @change.prevent="refine(item.value)"
            />

            <label :for="transform(item.value)" class="checkbox__label">
              <template v-if="layout === 'swatches'">
                <span
                  class="filter-list__swatch"
                  :class="{
                    'filter-list__swatch--lift':
                      getSwatch(item.value) && getSwatch(item.value).lift
                  }"
                  :style="{
                    backgroundColor:
                      getSwatch(item.value) && getSwatch(item.value).hex
                  }"
                />
              </template>

              {{ titleCase(item.label) }}
            </label>
          </div>
        </div>
      </div>
    </template>
  </ais-refinement-list>
</template>

<script>
import { titleCase, transform } from '~/helpers/utils'

import swatches from '@/assets/data/swatches.json'

export default {
  props: {
    name: {
      type: String,
      required: true
    },

    layout: {
      type: [Boolean, String],
      default: 'list',

      validator(value) {
        return (
          typeof value === 'boolean' ||
          ['list', 'swatches', 'grid'].indexOf(value) !== -1
        )
      }
    }
  },

  methods: {
    titleCase,
    transform,

    /**
     * Finds a swatch object by name.
     *
     * @param {string} name - The name of the swatch.
     * @returns {object} - The swatch object.
     */
    getSwatch(name) {
      return swatches.find((item) => item.name === name)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-list {
  $parent: &;

  &__empty,
  &__empty.body-2 {
    color: $COLOR_TEXT_LIGHT;
    margin-bottom: 0;
  }

  &__container {
    &#{&}--hidden {
      display: none;
    }
  }

  &__item {
    &:not(:last-child) {
      margin-bottom: $SPACING_M;
    }

    .checkbox__label {
      font-size: ms(-1);
      padding-left: ($SPACING_XL + $SPACING_2XS);
    }
  }

  &__swatch {
    background-color: $COLOR_BACKGROUND_LIGHT;
    border-radius: 50%;
    display: inline-block;
    height: 20px;
    left: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;

    &::before {
      border: 4px solid $COLOR_BACKGROUND_WHITE;
      border-radius: 50%;
      content: '';
      display: none;
      height: 12px;
      left: 0;
      outline: 1px solid $COLOR_BACKGROUND_DARK;
      position: absolute;
      top: 0;
      width: 12px;
    }

    &#{&}--lift {
      box-shadow: inset 0 0 0 1px $COLOR_BORDER_LIGHT;

      &::before {
        box-shadow: inset 0 0 0 1px $COLOR_BORDER_LIGHT;
      }
    }
  }

  &#{&}--as-swatches {
    .checkbox__label::before,
    .checkbox__label::after {
      display: none;
    }

    .checkbox__input:checked + .checkbox__label {
      #{$parent}__swatch::before {
        display: block;
      }
    }
  }

  &#{&}--as-grid {
    .checkbox__label::before,
    .checkbox__label::after {
      display: none;
    }

    .checkbox__label {
      align-items: center;
      border: 1px solid $COLOR_BORDER_DARK;
      display: flex;
      font-size: ms(-1);
      justify-content: center;
      min-height: 30px;
      padding: 0 $SPACING_XS;
      width: 100%;
    }

    .checkbox__input:checked + .checkbox__label {
      background-color: $COLOR_PRIMARY;
      border-color: $COLOR_PRIMARY;
      color: $COLOR_TEXT_INVERSE;
    }

    #{$parent}__container {
      @include gap($SPACING_2XS);
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @include mq($from: small, $until: large) {
    &#{&}--as-grid {
      #{$parent}__container {
        grid-template-columns: repeat(6, 1fr);
        max-width: 70%;
      }
    }
  }

  @include mq($from: large) {
    &__item {
      &:not(:last-child) {
        margin-bottom: ($SPACING_XS + $SPACING_3XS);
      }

      .checkbox__label {
        font-size: ms(0);
        padding-left: $SPACING_XL;
      }
    }
  }
}
</style>
