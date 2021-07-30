<template>
  <div class="page-index">
    <h1>{{ page.title }}</h1>

    <content-sections
      :sections="page.sections"
    />
  </div>
</template>

<script>
import ContentSections from '~/components/ContentSections'

export default {
  components: {
    ContentSections
  },

  async asyncData({ app, error }) {
    const page = await app.$nacelle.pageByHandle('/')

    if (!page) {
      return error({
        statusCode: 404,
        message: 'Page not found.'
      })
    }

    return {
      page
    }
  }
}
</script>
