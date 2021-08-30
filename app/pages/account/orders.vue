<template>
  <account />
</template>

<script>
import customerOrders from '@/graphql/shopify/queries/customerOrders'

import Account from '~/components/Account'

export default {
  components: {
    Account
  },

  async asyncData({ app, store }) {
    const accessToken = store.state.customer.accessToken

    if (!accessToken) {
      store.dispatch('customer/logout')
      return
    }

    const customer = await app.$graphql.shopify.request(customerOrders, {
      customerAccessToken: accessToken
    })

    return {
      orders: customer.customer.orders.edges.map(({ node }) => node),
      error: customer ? false : true
    }
  }
}
</script>
