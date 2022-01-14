<template>
  <div class="content-sections">
    <template v-for="(section, index) in transformedSections">
      <lazy-hydrate
        :key="`section-${index}`"
        :when-visible="!loadWhenIdle(section)"
        :when-idle="loadWhenIdle(section)"
      >
        <component
          :is="section.component"
          class="content-sections__section"
          v-bind="section.fields"
        />
      </lazy-hydrate>
    </template>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'

import { pascalCase } from '~/helpers/utils'

export default {
  components: {
    LazyHydrate
  },

  props: {
    sections: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      whenIdle: ['productCarousel']
    }
  },

  computed: {
    /**
     * Returns the transformed sections.
     *
     * @returns {Array} - The sections array.
     */
    transformedSections() {
      return this.sections
        .filter((section) => section._type)
        .map((section, index) => {
          const fields = {}
          const system = ['cmsSyncSource']
          const type = section._type
          const name = pascalCase(type)

          Object.keys(this.sections[index]).forEach((item) => {
            if (item.startsWith('_') || system.includes(item)) {
              return
            }

            fields[item] = section[item]
          })

          return {
            component: () => import(`~/sections/${name}.vue`),
            type,
            fields
          }
        })
    }
  },

  methods: {
    /**
     * Returns if the given section should load when idle.
     *
     * @param {object} section - The section object.
     * @returns {boolean} - The load when idle state.
     */
    loadWhenIdle(section) {
      return this.whenIdle.includes(section.type)
    }
  }
}
</script>

<style lang="scss">
.content-sections {
  &__section {
    margin: $SPACING_3XL 0;

    &:last-of-type {
      &.image-with-text,
      &.hero-banner,
      &.image-banner,
      &.embed-block {
        margin-bottom: 0;
      }
    }

    &:first-of-type {
      margin-top: 0;
    }
  }

  @include mq($from: large) {
    &__section {
      margin: $LAYOUT_XL 0;
    }
  }
}
</style>
