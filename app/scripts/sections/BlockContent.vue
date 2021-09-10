<template>
  <section class="block-content">
    <div class="container">
      <div class="row">
        <div class="col xs12">
          <block-content :content="content" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BlockContent from '~/components/BlockContent'

export default {
  components: {
    BlockContent
  },

  props: {
    content: {
      type: Array,
      default: () => []
    }
  }
}
</script>
