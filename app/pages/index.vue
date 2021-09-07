<template>
  <div v-if="page" class="page-index">
    <content-sections :sections="page.sections" />
  </div>
</template>

<script>
import ContentSections from '~/components/ContentSections'

import { getHead } from '~/helpers/metadata'

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
  },

  head() {
    return {
      ...getHead(this.page.fields.metadata),
      titleTemplate: false
    }
  }
}
</script>
