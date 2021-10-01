<template>
  <account class="template-orders" :error="error">
    <h3>{{ $t('account.orders.title') }}</h3>

    <table v-if="orders.length >= 1" class="template-orders__table">
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
              {{ $t('account.orders.viewOrder') }}
            </nuxt-link>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else class="body-2">
      {{ $t('account.orders.empty') }}
    </p>
  </account>
</template>

<script>
import customerOrders from '@/graphql/shopify/queries/customerOrders.gql'

import Account from '~/components/Account'

import { formatOrder } from '~/helpers/transform-graphql'

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
      orders = [...customer.orders.edges.map(({ node }) => formatOrder(node))]
    }

    return {
      orders,
      error: !customer
    }
  },

  computed: {
    /**
     * Returns an object of columns for orders.
     * @returns {object} - The order columns.
     */
    columns() {
      return {
        orderNumber: this.$t('account.order.labels.orderNumber'),
        processedAt: this.$t('account.order.labels.processedAt'),
        total: this.$t('account.order.labels.total'),
        financialStatus: this.$t('account.order.labels.financialStatus'),
        fulfillmentStatus: this.$t('account.order.labels.fulfillmentStatus')
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
