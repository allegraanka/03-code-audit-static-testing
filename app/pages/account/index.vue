<template>
  <account class="template-account" :error="error">
    <div class="template-account__card-grid">
      <div class="template-account__card">
        <div v-if="order" class="order-card">
          <h4>Recent order</h4>

          Order no.: {{ order.orderNumber }}<br />
          Shipping status: {{ order.fulfillmentStatus }}<br />
          Date: {{ order.processedAt }}<br />
          Amount: {{ order.totalPriceV2.amount }}<br />

          <br />
          <nuxt-link to="/account/orders">View all orders</nuxt-link>
        </div>

        <p v-else>You haven't placed any orders yet.</p>
      </div>

      <div class="template-account__card">
        <div v-if="address" class="address-card">
          <h4>Address book</h4>

          <span v-for="(line, index) in address.formatted" :key="index">
            {{ line }}<br />
          </span>

          <br />
          <nuxt-link to="/account/addresses">View all addresses</nuxt-link>
        </div>

        <p v-else>You haven't added any saved addresses yet.</p>
      </div>
    </div>
  </account>
</template>

<script>
import customerDefaults from '@/graphql/shopify/queries/customerDefaults'

import Account from '~/components/Account'

export default {
  components: {
    Account
  },

  async asyncData({ app, store }) {
    let order = null
    let address = null

    const { customer } = await app.$graphql.shopify.request(customerDefaults, {
      customerAccessToken: store.state.customer.accessToken
    })

    if (customer) {
      if (customer.orders.edges.length >= 1) {
        order = customer.orders.edges[0].node
      }

      if (customer.defaultAddress) {
        address = customer.defaultAddress
      }
    }

    return {
      error: !!!customer,
      order,
      address
    }
  }
}
</script>

<style lang="scss">
.template-account {
  @include mq($from: large) {
    &__card-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
    }
  }
}
</style>
