<template>
  <account class="template-order">
    <nuxt-link class="template-order__back" to="/account/orders">
      <icon-arrow-back /> Back to Orders
    </nuxt-link>

    <div class="template-order__header">
      <div class="template-order__heading">
        <h3 class="template-order__title">Order #{{ order.orderNumber }}</h3>
        <p>Thanks for your order! Check out the details below.</p>
      </div>

      <div class="template-order__date">
        <p class="label">Order Date</p>
        <p class="body-2">{{ order.processedAt }}</p>
      </div>
    </div>
  </account>
</template>

<script>
import customerOrders from '@/graphql/shopify/queries/customerOrders'

import Account from '~/components/Account'

import { decodeApiId } from '~/helpers/utils'

import IconArrowBack from '@/assets/icons/directional-arrow-backward.svg?inline'

export default {
  components: {
    Account,
    IconArrowBack
  },

  async asyncData({ app, error, params, store }) {
    let order = null

    const { customer } = await app.$graphql.shopify.request(customerOrders, {
      customerAccessToken: store.state.customer.accessToken
    })

    if (customer && customer.orders.edges.length >= 1) {
      const findOrder = customer.orders.edges.find(
        ({ node }) => decodeApiId(node.id) === Number(params.id)
      )

      if (findOrder) {
        order = findOrder.node
      }
    }

    if (!customer || !order) {
      error({
        statusCode: '404',
        message: "Order couldn't be found."
      })
    }

    return {
      order
    }
  }
}
</script>

<style lang="scss">
.template-order {
  &__back {
    align-items: center;
    display: flex;

    .icon {
      margin-right: 0.625rem;
    }
  }

  &__header {
    align-items: flex-end;
    display: flex;
    justify-content: space-between;
    margin-top: $SPACING_4XL;
  }

  &__title {
    margin-bottom: 0.313rem;
  }

  &__date {
    text-align: right;

    .label {
      margin-bottom: 0.813rem;
    }
  }
}
</style>
