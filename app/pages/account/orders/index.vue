<template>
  <account class="template-orders" :error="error">
    <h3>Your Orders</h3>

    <table>
      <thead>
        <tr>
          <th v-for="(column, index) in columns" :key="index">
            {{ column }}
          </th>
          <th />
        </tr>
      </thead>

      <tbody>
        <tr v-for="(order, index) in orders" :key="index">
          <td
            v-for="(column, columnIndex) in Object.keys(columns)"
            :key="columnIndex"
          >
            {{ order[column] }}
          </td>

          <td>
            <nuxt-link :to="`/account/orders/${order.handle}`">
              View Order
            </nuxt-link>
          </td>
        </tr>
      </tbody>
    </table>
  </account>
</template>

<script>
import customerOrders from '@/graphql/shopify/queries/customerOrders'

import Account from '~/components/Account'

import { transformOrder } from '~/helpers/transform-graphql'

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
        ...customer.orders.edges.map(({ node }) => transformOrder(node))
      ]
    }

    return {
      orders,
      error: !!!customer
    }
  },

  data() {
    return {
      columns: {
        orderNumber: 'Order number',
        processedAt: 'Date',
        total: 'Amount',
        financialStatus: 'Payment status',
        fulfillmentStatus: 'Shipping status'
      }
    }
  }
}
</script>
