<template>
  <div class="current-refinements">
    <ais-current-refinements>
      <template #default="{ items }">
        <div class="current-refinements__items">
          <div
            v-for="item in mapRefinements(items)"
            :key="item.refinement.value"
            class="current-refinements__item"
          >
            {{ getRefinementLabel(item.refinement) }}

            <button
              class="current-refinements__remove"
              @click="item.attribute.refine(item.refinement)"
            >
              <span class="visually-hidden">
                {{
                  $tc('collection.removeRefinement', 1, {
                    label: item.refinement.label
                  })
                }}
              </span>

              <icon-close />
            </button>
          </div>
        </div>
      </template>
    </ais-current-refinements>
  </div>
</template>

<script>
import IconClose from '@/assets/icons/misc-close.svg?inline'

import { camelCase, titleCase } from '~/helpers/utils'

export default {
  components: {
    IconClose
  },

  methods: {
    /**
     * Takes the attributes with refinements and outputs as a custom object.
     * - Makes it easier to access the refinement outside of the attribute,
     *
     * @param {Array} attributes - The list of attributes.
     * @returns {Array} - The refinements, with their attribute alongside.
     */
    mapRefinements(attributes) {
      return attributes.reduce((accumulator, item) => {
        accumulator.push(
          ...item.refinements.map((refinement) => ({
            refinement,
            attribute: item
          }))
        )

        return accumulator
      }, [])
    },

    /**
     * Finds and returns the label for an attribute.
     *
     * @param {string} attribute - The attribute key.
     * @returns {string} - The transformed label.
     */
    getAttributeLabel(attribute) {
      const key = `collection.attributes.${camelCase(attribute)}`
      const exists = this.$te(key)

      if (!exists) {
        return titleCase(attribute)
      }

      return this.$t(key)
    },

    /**
     * Returns the formatted label for a refinement value.
     *
     * @param {object} refinement - The refinement object.
     * @param {string} refinement.attribute - The attribute key.
     * @param {string} refinement.label - The label for the refinement.
     * @returns {string} - The formatted label.
     */
    getRefinementLabel({ attribute, label }) {
      const toPrepend = ['options.size', 'price']
      const refinementLabel = titleCase(label)

      if (toPrepend.includes(attribute)) {
        return `${this.getAttributeLabel(attribute)} ${refinementLabel}`
      }

      return refinementLabel
    }
  }
}
</script>

<style lang="scss" scoped>
.current-refinements {
  &__item {
    align-items: center;
    background-color: $COLOR_BACKGROUND_LIGHT;
    border-radius: 20px;
    display: inline-flex;
    font-size: ms(-1);
    justify-content: center;
    margin: 0 $SPACING_XS $SPACING_XS 0;
    padding: ($SPACING_3XS + $SPACING_2XS) $SPACING_M;
  }

  &__remove {
    @include button-reset;
    align-items: center;
    color: $COLOR_PRIMARY;
    display: flex;
    justify-content: center;
    margin-left: ($SPACING_3XS + $SPACING_XS);
    margin-right: -$SPACING_2XS;

    .icon {
      height: 16px;
      width: 16px;
    }
  }
}
</style>
