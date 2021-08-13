<template>
  <drawer namespace="cart-drawer">
    <line-item
      v-for="(item, index) in items"
      :key="index"
      :item="item"
    />
  </drawer>
</template>

<script>
import { mapGetters } from 'vuex'

import Drawer from '~/components/Drawer'
import LineItem from '~/components/LineItem'

export default {
  components: {
    Drawer,
    LineItem
  },

  computed: {

    /**
     * Maps the Vuex getters.
     */
    ...mapGetters({
      items: 'cart/items'
    })
  }
}
</script>
