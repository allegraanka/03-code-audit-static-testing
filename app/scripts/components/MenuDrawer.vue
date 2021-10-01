<template>
  <drawer namespace="menu-drawer" left-align :force-open="forceOpen">
    {{ $t('menu.title') }}
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
