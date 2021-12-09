<template>
  <filter-range v-if="type === 'range'" :name="name" />

  <filter-list
    v-else
    :name="name"
    :layout="['swatches', 'grid'].includes(type) && type"
  />
</template>

<script>
import FilterList from '~/components/algolia/FilterList'
import FilterRange from '~/components/algolia/FilterRange'

export default {
  components: {
    FilterList,
    FilterRange
  },

  props: {
    type: {
      type: String,
      default: ''
    },

    name: {
      type: String,
      required: true
    }
  }
}
</script>
