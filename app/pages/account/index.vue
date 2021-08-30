<template>
  <account class="template-account">
    <template v-if="error">
      We couldn't fetch your account details at this moment. Please
      <span class="text-link" @click="$nuxt.refresh">try again</span>.
    </template>

    <template v-else>
      <div class="template-account__card-grid">
        <div class="template-account__card">
          <div v-if="order" class="order-card">
            <h4>Recent order</h4>
            {{ order.orderNumber }}
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
    </template>
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
    const accessToken = store.state.customer.accessToken

    if (!accessToken) {
      store.dispatch('customer/logout')
      return
    }

    const customer = await app.$graphql.shopify.request(customerDefaults, {
      customerAccessToken: accessToken
    })

    return {
      error: customer ? false : true,

      order:
        customer.customer.orders.edges.length >= 1
          ? customer.customer.orders.edges[0].node
          : null,

      address:
        customer.customer.addresses.edges.length >= 1
          ? customer.customer.addresses.edges[0].node
          : null
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
