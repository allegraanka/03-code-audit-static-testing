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
        <p class="body-2">{{ formatDate(order.processedAt) }}</p>
      </div>
    </div>

    <div class="template-order__section">
      <h3 class="template-order__section-title">Order Details</h3>

      <div class="template-order__summary">
        <div class="template-order__summary-column">
          <h4 class="template-order__summary-title">Shipping</h4>

          <div class="template-order__summary-attribute">
            <label>Shipping status</label>
            <p class="body-2">Unfulfilled</p>
          </div>

          <div class="template-order__summary-attribute">
            <label>Shipping address</label>
            <p class="body-2">Address</p>
          </div>
        </div>

        <div class="template-order__summary-column">
          <h4 class="template-order__summary-title">Billing</h4>

          <div
            class="template-order__summary-row template-order__summary-row--2up"
          >
            <div class="template-order__summary-attribute">
              <label>Shipping status</label>
              <p class="body-2">Unfulfilled</p>
            </div>

            <div class="template-order__summary-attribute">
              <label>Shipping address</label>
              <p class="body-2">Address</p>
            </div>
          </div>

          <div class="template-order__summary-row">
            <div class="template-order__summary-total">
              <p>Subtotal</p>
              <p>£176.00</p>
            </div>

            <div class="template-order__summary-total">
              <p>Shipping (Standard Shipping)</p>
              <p>£10.00</p>
            </div>

            <div class="template-order__summary-total">
              <p>Tax (VAT 20.0%)</p>
              <p>£44.00</p>
            </div>
          </div>

          <div class="template-order__summary-row">
            <div
              class="
                template-order__summary-total
                template-order__summary-total--strong
              "
            >
              <p>Total</p>
              <p>£220.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </account>
</template>

<script>
import customerOrders from '@/graphql/shopify/queries/customerOrders'

import Account from '~/components/Account'

import { decodeApiId, formatDate } from '~/helpers/utils'

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
  },

  methods: {
    formatDate
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
    margin-top: $SPACING_4XL;
  }

  &__title {
    margin-bottom: 0.313rem;
  }

  &__date {
    margin-top: $SPACING_2XL;

    .label {
      margin-bottom: 0.438rem;
    }
  }

  &__summary {
    background-color: $COLOR_BACKGROUND_LIGHT;
  }

  &__summary-column {
    padding: $SPACING_XL;

    &:not(:last-child) {
      border-bottom: 1px solid rgba($COLOR_BORDER_DARK, 0.25);
    }
  }

  &__summary-row {
    border-bottom: 1px solid rgba($COLOR_BORDER_DARK, 0.25);
    padding: $SPACING_XL 0;

    &:last-of-type {
      border-bottom: none;
      padding-bottom: 0;
    }

    &:first-of-type {
      padding-top: 0;
    }
  }

  &__summary-title {
    margin-bottom: $SPACING_XS;
  }

  &__summary-attribute {
    &:not(:last-of-type) {
      padding-bottom: $SPACING_M;
    }
  }

  &__summary-total {
    display: flex;
    justify-content: space-between;

    p {
      margin: 0 0 $SPACING_2XS;
    }

    &--strong {
      font-weight: $WEIGHT_MEDIUM;
    }
  }

  &__section {
    margin: $SPACING_2XL 0;
  }

  @include mq($from: large) {
    &__header {
      align-items: flex-end;
      display: flex;
      justify-content: space-between;
    }

    &__date {
      text-align: right;

      .label {
        margin-bottom: 0.813rem;
      }
    }

    &__summary {
      display: grid;
      grid-template-columns: 0.8fr 2.2fr;
      padding: $SPACING_3XL;
    }

    &__summary-column {
      padding: 0 $SPACING_3XL;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        padding-right: 0;
      }

      &:not(:last-child) {
        border-bottom: 0;
        border-right: 1px solid rgba($COLOR_BORDER_DARK, 0.25);
      }
    }

    &__summary-row {
      &--2up {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }
    }

    &__section {
      margin: $SPACING_5XL 0;
    }
  }
}
</style>
