<template>
  <account>
    <nuxt-link class="template-addresses-add__back" to="/account/addresses">
      <icon-arrow-back /> {{ $t('account.address.back') }}
    </nuxt-link>

    <h2 class="template-addresses-add__title h3">
      {{ $t('account.address.add') }}
    </h2>

    <address-fields
      :address="address"
      :default-address="defaultAddress"
      method="update"
    />
  </account>
</template>

<script>
import customerAddresses from '@/graphql/shopify/queries/customerAddresses.gql'

import Account from '~/components/Account'
import AddressFields from '~/components/AddressFields'

import IconArrowBack from '@/assets/icons/directional-arrow-backward.svg?inline'

import { decodeApiId } from '~/helpers/utils'

export default {
  components: {
    Account,
    AddressFields,
    IconArrowBack
  },

  async asyncData({ app, query, store, error }) {
    let address = null
    let defaultAddress = null

    const { customer } = await app.$graphql.shopify.request(customerAddresses, {
      customerAccessToken: store.state.customer.accessToken
    })

    if (customer) {
      if (customer.addresses.edges.length >= 1) {
        const findAddress = customer.addresses.edges.find(
          ({ node }) => decodeApiId(node.id) === Number(query.id)
        )

        if (findAddress) {
          address = findAddress.node
        }
      }

      if (customer.defaultAddress) {
        defaultAddress = customer.defaultAddress
      }
    }

    if (!customer || !address) {
      error({
        statusCode: '404',
        message: 'Address not found'
      })
    }

    return {
      address,
      defaultAddress
    }
  }
}
</script>
