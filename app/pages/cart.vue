<template>
  <div class="template-cart">
    <h1>{{ $t('cart.title') }}</h1>
    <app-button label="Go to checkout" @click.native="goToCheckout" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppButton from '~/components/AppButton'

export default {
  components: {
    AppButton
  },

  methods: {
    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      goToCheckout: 'checkout/goToCheckout'
    })
  }
}
</script>
