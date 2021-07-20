<template>
  <div class="template-page">
    <h1>{{ page.title }}</h1>
  </div>
</template>

<script>
export default {
  async asyncData({ app, error, params }) {
    const page = await app.$nacelle.pageByHandle(
      params.handle
    )

    if (!page) {
      return error({
        statusCode: 404,
        message: 'Page not found'
      })
    }

    return {
      page
    }
  }
}
</script>
