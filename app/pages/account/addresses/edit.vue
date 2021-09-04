<template>
  <account>
    <nuxt-link class="template-addresses-add__back" to="/account/addresses">
      <icon-arrow-back /> Back to Addresses
    </nuxt-link>

    <h2 class="template-addresses-add__title">Edit Address</h2>

    <address-fields :address="address" method="update" />
  </account>
</template>

<script>
import customerAddresses from '@/graphql/shopify/queries/customerAddresses'

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

  async asyncData({ app, query, store }) {
    let address = null

    const { customer } = await app.$graphql.shopify.request(customerAddresses, {
      customerAccessToken: store.state.customer.accessToken
    })

    if (customer && customer.addresses.edges.length >= 1) {
      const findAddress = customer.addresses.edges.find(
        ({ node }) => decodeApiId(node.id) === Number(query.id)
      )

      if (findAddress) {
        address = findAddress.node
      }
    }

    if (!customer || !address) {
      error({
        statusCode: '404',
        message: "Address couldn't be found."
      })
    }

    return {
      address
    }
  }
}
</script>
