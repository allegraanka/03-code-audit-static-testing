<template>
  <div v-if="page" class="page-index">
    <h1>{{ page.title }}</h1>

    <content-sections :sections="page.sections" />
  </div>
</template>

<script>
import ContentSections from '~/components/ContentSections'

export default {
  components: {
    ContentSections
  },

  async asyncData({ app }) {
    let page = {}
    const response = await app.$nacelle.pageByHandle('/').catch(console.error)

    if (response) {
      page = response
    }

    return {
      page
    }
  }
}
</script>
