<template>
  <account>
    <nuxt-link class="template-addresses-add__back" to="/account/addresses">
      <icon-arrow-back /> {{ $t('account.address.back') }}
    </nuxt-link>

    <h2 class="template-addresses-add__title h3">
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
    font-size: ms(-2);
    font-weight: $WEIGHT_MEDIUM;
    letter-spacing: $LETTER_SPACING_DISPLAY;
    padding-top: $SPACING_M;
    text-decoration: none;
    text-transform: uppercase;

    .icon {
      margin-right: $SPACING_S;
    }
  }

  &__title {
    margin: $SPACING_M + $SPACING_2XS 0 $SPACING_L;
  }

  @include mq($from: large) {
    &__back {
      font-size: ms(-1);
    }

    &__title {
      margin: $SPACING_L + $SPACING_2XS 0 $SPACING_XL;
    }
  }
}
</style>
