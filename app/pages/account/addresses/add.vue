<template>
  <account>
    <nuxt-link class="template-addresses-add__back" to="/account/addresses">
      <icon-arrow-back /> {{ $t('account.address.back') }}
    </nuxt-link>

    <h2 class="template-addresses-add__title">
      {{ $t('account.address.add') }}
    </h2>

    <address-fields />
  </account>
</template>

<script>
import Account from '~/components/Account'
import AddressFields from '~/components/AddressFields'

import IconArrowBack from '@/assets/icons/directional-arrow-backward.svg?inline'

export default {
  components: {
    Account,
    AddressFields,
    IconArrowBack
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
    margin-top: $SPACING_2XL;
  }
}
</style>
