<template>
  <account class="template-orders" :error="error">
    <h3>Your Orders</h3>

    <table class="template-orders__table">
      <thead>
        <tr>
          <th v-for="(column, index) in columns" :key="index" class="label">
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
            class="body-2"
            :data-label="columns[column]"
          >
            {{ order[column] }}
          </td>

          <td>
            <nuxt-link
              :to="`/account/orders/${order.handle}`"
              class="template-orders__view-link"
            >
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

<style lang="scss">
.template-orders {
  &__table {
    margin-top: $SPACING_3XL;
  }

  &__view-link {
    color: $COLOR_TEXT_PRIMARY;
    font-size: ms(-2);
    text-decoration: underline;
  }

  @include mq($until: medium) {
    &__table {
      margin-top: $SPACING_L;

      thead {
        display: none;
      }

      tr {
        border-bottom: 1px solid rgba($COLOR_BORDER_DARK, 0.25);
        display: grid;
        gap: 1.375rem;
        grid-template-columns: repeat(2, 1fr);
        padding: $SPACING_L 0;

        &:first-child {
          border-top: 1px solid rgba($COLOR_BORDER_DARK, 0.25);
        }
      }

      td {
        border-bottom: none;
        margin: 0;
        padding: 0;

        &::before {
          content: attr(data-label);
          display: block;
          font-size: ms(-2);
          font-weight: $WEIGHT_BOOK;
          margin-bottom: $SPACING_2XS;
          text-transform: uppercase;
        }
      }
    }
  }

  @include mq($from: large) {
    &__table {
      td:last-child {
        text-align: right;
      }
    }
  }
}
</style>
