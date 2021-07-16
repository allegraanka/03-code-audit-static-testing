<template>
  <div class="template-collection">
    {{ collection.title }}
  </div>
</template>

<script>
import { collectionByHandle } from '~/helpers/data-fetching'

export default {
  async asyncData(context) {
    return {
      collection:
        await collectionByHandle(context)
    }
  }
}
</script>
