<template>
  <account class="template-addresses" :error="error">
    <div class="template-addresses__header">
      <h2>Your Addresses</h2>
    </div>

    <p v-if="hasNoAddresses">You don't have any saved addresses.</p>

    <div v-else class="template-addresses__grid">
      <div class="template-addresses__default">
        <div v-if="defaultAddress">
          <p class="label">Default address</p>

          <span v-for="(line, index) in defaultAddress.formatted" :key="index">
            {{ line }}<br />
          </span>
        </div>

        <p v-else>You don't have a default address.</p>
      </div>

      <div v-if="addresses.length >= 1">
        <p class="label">Additional addresses</p>

        <div v-for="(address, index) in addresses" :key="index">
          <span v-for="(line, lineIndex) in address.formatted" :key="lineIndex">
            {{ line }}<br />
          </span>
        </div>
      </div>
    </div>
  </account>
</template>

<script>
import customerAddresses from '@/graphql/shopify/queries/customerAddresses'

import Account from '~/components/Account'

export default {
  components: {
    Account
  },

  async asyncData({ app, store }) {
    let defaultAddress = null
    let addresses = []

    const { customer } = await app.$graphql.shopify.request(customerAddresses, {
      customerAccessToken: store.state.customer.accessToken
    })

    if (customer) {
      if (customer.defaultAddress) {
        defaultAddress = customer.defaultAddress
      }

      if (customer.addresses) {
        addresses = [...customer.addresses.edges.map(({ node }) => node)]

        if (customer.defaultAddress) {
          addresses = addresses.filter(({ id }) => id !== defaultAddress.id)
        }
      }
    }

    return {
      defaultAddress,
      addresses,
      error: !!!customer
    }
  },

  computed: {
    /**
     * Returns if the customer doesn't have any addresses.
     * @returns {boolean} - If the customer has any addresses.
     */
    hasNoAddresses() {
      return this.addresses.length === 0 && !this.defaultAddress
    }
  }
}
</script>

<style lang="scss">
.template-addresses {
  @include mq($from: large) {
    &__grid {
      display: grid;
      gap: $SPACING_M;
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
