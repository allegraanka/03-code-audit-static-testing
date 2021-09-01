<template>
  <account class="template-orders" :error="error">
    <h3>Your Orders</h3>

    <table>
      <thead>
        <tr>
          <th>Order no.</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Payment status</th>
          <th>Shipping status</th>
          <th />
        </tr>
      </thead>

      <tbody>
        <tr v-for="(order, index) in orders" :key="index">
          <th>{{ order.orderNumber }}</th>
          <th>{{ order.processedAt }}</th>
          <th>{{ order.totalPriceV2.amount }}</th>
          <th>{{ order.financialStatus }}</th>
          <th>{{ order.fulfillmentStatus }}</th>
          <th>View order</th>
        </tr>
      </tbody>
    </table>
  </account>
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
