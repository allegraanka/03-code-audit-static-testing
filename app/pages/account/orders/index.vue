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
          <th>
            <nuxt-link :to="`/account/orders/${order.handle}`">
              View Order
            </nuxt-link>
          </th>
        </tr>
      </tbody>
    </table>
  </account>
</template>

<script>
import customerOrders from '@/graphql/shopify/queries/customerOrders'

import Account from '~/components/Account'

import { decodeApiId } from '~/helpers/utils'

export default {
  components: {
    Account
  },

  async asyncData({ app, store }) {
    let orders = []

    const { customer } = await app.$graphql.shopify.request(customerOrders, {
      customerAccessToken: store.state.customer.accessToken
    })

    if (customer && customer.orders) {
      orders = [
        ...customer.orders.edges.map(({ node }) => {
          return {
            handle: decodeApiId(node.id),
            ...node
          }
        })
      ]
    }

    return {
      orders,
      error: !!!customer
    }
  }
}
</script>
