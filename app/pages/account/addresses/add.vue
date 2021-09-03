<template>
  <account>
    <nuxt-link class="template-addresses-add__back" to="/account/addresses">
      <icon-arrow-back /> Back to Addresses
    </nuxt-link>

    <h2 class="template-addresses-add__title">Add Address</h2>

    <div class="template-addresses-add__form">
      <app-button @click.native="handleAddressAdd">Add new address</app-button>
    </div>
  </account>
</template>

<script>
import Account from '~/components/Account'
import AppButton from '~/components/AppButton'

import IconArrowBack from '@/assets/icons/directional-arrow-backward.svg?inline'

export default {
  components: {
    Account,
    AppButton,
    IconArrowBack
  },

  methods: {
    /**
     * Handles the address add event.
     */
    handleAddressAdd() {
      // @todo handle address add mutation
    }
  }
}
</script>

<style lang="scss">
.template-addresses-add {
  &__back {
    align-items: center;
    display: flex;

    .icon {
      margin-right: 0.625rem;
    }
  }

  &__title {
    margin-top: $SPACING_4XL;
  }
}
</style>
