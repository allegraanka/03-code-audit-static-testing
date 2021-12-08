<template>
  <account class="template-orders" :error="error">
    <h3 class="template-orders__title">{{ $t('account.orders.title') }}</h3>

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
  &__title {
    margin: $SPACING_XL 0 $SPACING_M;
  }

  &__view-link {
    color: $COLOR_TEXT_PRIMARY;
    font-size: ms(-2);
    text-decoration: underline;
  }

  @include mq($until: medium) {
    &__table {
      thead {
        display: none;
      }

      tr {
        border-top: 1px solid $COLOR_BORDER_LIGHT;
        display: grid;
        gap: $SPACING_L;
        grid-template-columns: repeat(2, 1fr);
        padding: $SPACING_L 0;
      }

      td {
        border-bottom: none;
        color: $COLOR_TEXT_SECONDARY;
        margin: 0;
        padding: 0;

        a {
          color: $COLOR_TEXT_SECONDARY;
        }

        &::before {
          color: $COLOR_TEXT_PRIMARY;
          content: attr(data-label);
          display: block;
          font-size: ms(-2);
          font-weight: $WEIGHT_MEDIUM;
          margin-bottom: $SPACING_2XS;
        }

        &:last-child {
          grid-column: 1 / 3;
        }
      }
    }
  }

  @include mq($from: medium) {
    &__table {
      th.label {
        font-size: ms(-1);
        font-weight: $WEIGHT_MEDIUM;
        padding: 0 0 $SPACING_M;
      }

      tr td {
        color: $COLOR_TEXT_SECONDARY;
      }

      td a {
        color: $COLOR_TEXT_SECONDARY;
        font-size: ms(-1);
      }
    }
  }

  @include mq($from: large) {
    &__title {
      margin: 0 0 $SPACING_3XL;
    }

    &__table {
      td:last-child {
        text-align: right;
      }
    }
  }
}
</style>
