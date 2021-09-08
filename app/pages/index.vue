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
    let page = null

    await app.$nacelle
      .pageByHandle('/')
      .then((response) => (page = response))
      .catch((error) => void error)

    return {
      page
    }
  },

  head() {
    return {
      ...getHead(this.page && this.page.fields.metadata),
      titleTemplate: false
    }
  }
}
</script>
