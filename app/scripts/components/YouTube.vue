<template functional>
  <you-tube :video-id="props.videoId" />
</template>

<script>
import Vue from 'vue'
import { Youtube as YouTube } from 'vue-youtube'

Vue.component('YouTube', YouTube)

export default {
  props: {
    videoId: {
      type: String,
      default: ''
    }
  }
}
</script>
