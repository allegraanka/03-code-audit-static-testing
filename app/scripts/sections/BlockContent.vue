<template>
  <section class="block-content">
    <div class="container">
      <div class="row">
        <div class="col xs12">
          <rich-content :content="content" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import RichContent from '~/components/RichContent'

export default {
  components: {
    RichContent
  },

  props: {
    content: {
      type: Array,
      default: () => []
    }
  }
}
</script>
