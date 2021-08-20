<template>
  <drawer namespace="menu-drawer" left-align :force-open="forceOpen">
    Menu
  </drawer>
</template>

<script>
import Drawer from '~/components/Drawer'

export default {
  components: {
    Drawer
  },

  props: {
    forceOpen: {
      type: Boolean,
      default: false
    }
  }
}
</script>
