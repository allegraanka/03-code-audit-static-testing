<template>
  <div class="youtube">
    <iframe
      v-if="loaded"
      :src="`https://www.youtube.com/embed/${videoId}?autoplay=true`"
      height="360"
      width="640"
      frameborder="0"
      loading="lazy"
    />

    <div
      v-else
      class="youtube__thumbnail lazyload"
      :data-bg="`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`"
      @click="loaded = true"
    />
  </div>
</template>

<script>
export default {
  props: {
    videoId: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      loaded: false
    }
  }
}
</script>

<style lang="scss">
.youtube {
  &__thumbnail {
    background-position: center center;
    background-size: cover;
    cursor: pointer;
    display: block;
    max-width: 720px;
    position: relative;

    &::after {
      content: '';
      display: block;
      padding-bottom: calc(100% / (16 / 9));
    }

    &::before {
      /* stylelint-disable-next-line */
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 48"><path fill="%23f00" fill-opacity="0.8" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"></path><path d="M 45,24 27,14 27,34" fill="%23fff"></path></svg>');
      content: 'Play';
      display: block;
      filter: grayscale(100%);
      font-size: 0;
      height: 48px;
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      transition: filter $TIMING_MICRO cubic-bezier(0, 0, 0.2, 1);
      width: 68px;
    }

    &:hover {
      &::before {
        filter: none;
      }
    }
  }
}
</style>
