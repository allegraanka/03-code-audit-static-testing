<template>
  <div class="content-sections">
    <template v-for="(section, index) in transformedSections">
      <component
        :is="section.component"
        :key="`section-${index}`"
        class="content-sections__section"
        v-bind="section.fields"
      />
    </template>
  </div>
</template>

<script>
import { pascalCase } from '~/helpers/utils'

export default {
  props: {
    sections: {
      type: Array,
      default: () => []
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
  }
}
</script>

<style lang="scss">
.content-sections {
  &__section {
    margin: $SPACING_3XL 0;
  }

  @include mq($from: large) {
    &__section {
      margin: $LAYOUT_XL 0;
    }
  }
}
</style>
