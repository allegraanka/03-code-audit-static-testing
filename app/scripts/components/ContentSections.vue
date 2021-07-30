<template>
  <div class="content-sections">
    <section
      v-for="(section, index) in sections"
      :key="`section-${index}`"
    >
      <component
        :is="section.component"
        v-bind="section.fields"
      />
    </section>
  </div>
</template>

<script>
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
      return this.sections.map((section, index) => {
        const fields = {}
        const name = capitalize(section.__typename)

        Object.keys(this.sections)[index].forEach((item) => {
          fields[item] = section[item]
        })

        return {
          component: () => import(`~/components/${name}.vue`),
          type: section.__typename,
          fields
        }
      })
    }
  }
}
</script>
