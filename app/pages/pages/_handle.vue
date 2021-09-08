<template>
  <div class="template-page">
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

  async asyncData({ app, error, params }) {
    const page = await app.$nacelle.pageByHandle(params.handle).catch(() => {
      error({
        statusCode: 404,
        message: 'Page not found'
      })
    })

    return {
      page
    }
  },

  head() {
    return getHead(this.page.fields.metadata, this.page.title)
  }
}
</script>
