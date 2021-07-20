<template>
  <div class="template-page">
    <h1>{{ page.title }}</h1>
  </div>
</template>

<script>
import { pageByHandle } from '~/helpers/data-fetching'

export default {
  async asyncData(context) {
    return {
      page:
        await pageByHandle(context)
    }
  }
}
</script>
