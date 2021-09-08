<template>
  <block-content :blocks="content" :serializers="serializers" />
</template>

<script>
import SanityLink from '~/components/SanityLink'

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
          link: SanityLink
        }
      }
    }
  }
}
</script>
