<template>
  <block-content :blocks="content" :serializers="serializers" />
</template>

<script>
import AppLink from '~/components/AppLink'

export default {
  props: {
    content: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      serializers: {
        marks: {
          link: AppLink
        }
      }
    }
  }
}
</script>
