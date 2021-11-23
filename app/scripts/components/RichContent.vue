<template>
  <div v-if="isString" v-html="sanitizedContent" />
  <block-content v-else :blocks="content" :serializers="serializers" />
</template>

<script>
import AppLink from '~/components/AppLink'
import YouTube from '~/components/YouTube'

export default {
  props: {
    content: {
      type: [Array, String],
      default: () => []
    }
  },

  data() {
    return {
      serializers: {
        marks: {
          link: AppLink
        },

        types: {
          youTubeEmbed: YouTube
        }
      }
    }
  },

  computed: {
    /**
     * Returns if the content is a string.
     * @returns {boolean} - If the content is a string.
     */
    isString() {
      return typeof this.content === 'string'
    },

    /**
     * Santizes and returns the content.
     * @returns {string} - The sanitized content.
     */
    sanitizedContent() {
      return this.isString && this.content
    }
  }
}
</script>
