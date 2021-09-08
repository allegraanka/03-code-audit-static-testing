<template>
  <a v-if="isExternal" :href="href">
    <slot />
  </a>

  <nuxt-link v-else :to="href" :target="newtab ? '_target' : false">
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: ''
    },
    newtab: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    /**
     * Returns if the link is external.
     * @returns {boolean} - The external boolean.
     */
    isExternal() {
      return /(mailto:|tel:|http:|https:)/g.test(this.href)
    }
  }
}
</script>
