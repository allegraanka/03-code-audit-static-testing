<template>
  <drawer class="product-details-drawer" :namespace="namespace">
    <template #body>
      <h3 v-if="title" class="product-details-drawer__title">{{ title }}</h3>

      <div v-if="content" class="body-1" v-html="content" />
      <slot />
    </template>

    <template #footer>
      <div class="product-details-drawer__footer">
        <app-button
          label="Back to product page"
          block
          @click.native="closeDrawer(namespace)"
        />
      </div>
    </template>
  </drawer>
</template>

<script>
import { mapActions } from 'vuex'

import AppButton from '~/components/AppButton'
import Drawer from '~/components/Drawer'

export default {
  components: {
    AppButton,
    Drawer
  },

  props: {
    title: {
      type: String,
      default: null
    },

    namespace: {
      type: String,
      required: true
    },

    content: {
      type: String,
      default: null
    }
  },

  methods: {
    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      closeDrawer: 'drawers/closeDrawer'
    })
  }
}
</script>

<style lang="scss">
.product-details-drawer {
  color: $COLOR_TEXT_SECONDARY;

  &__title {
    color: $COLOR_TEXT_PRIMARY;
  }

  &__footer {
    padding: $SPACING_L $SPACING_M;
  }

  @include mq($from: large) {
    &__footer {
      padding: $SPACING_3XL;
    }
  }
}
</style>
