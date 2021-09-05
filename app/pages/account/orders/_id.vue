<template>
  <account class="template-order">
    <nuxt-link class="template-order__back" to="/account/orders">
      <icon-arrow-back /> Back to Orders
    </nuxt-link>

    <div class="template-order__header">
      <div class="template-order__heading">
        <h3 class="template-order__title">Order {{ order.orderNumber }}</h3>
        <p>Thanks for your order! Check out the details below.</p>
      </div>

      <div class="template-order__date">
        <p class="label">Order Date</p>
        <p class="body-2">{{ order.processedAt }}</p>
      </div>
    </div>

    <div class="template-order__section">
      <h3 class="template-order__section-title">Order Details</h3>

      <div class="template-order__summary">
        <div class="template-order__summary-column">
          <h4 class="template-order__summary-title">Shipping</h4>

          <div class="template-order__summary-attribute">
            <label>Shipping status</label>
            <p class="body-2">{{ order.fulfillmentStatus }}</p>
          </div>

          <div
            v-if="order.shippingAddress"
            class="template-order__summary-attribute"
          >
            <label>Shipping address</label>

            <p class="body-2">
              <span
                v-for="(line, index) in order.shippingAddress.formatted"
                :key="index"
              >
                {{ line }}<br />
              </span>
            </p>
          </div>
        </div>

        <div class="template-order__summary-column">
          <h4 class="template-order__summary-title">Billing</h4>

          <div
            class="template-order__summary-row template-order__summary-row--2up"
          >
            <div class="template-order__summary-attribute">
              <label>Payment status</label>
              <p class="body-2">{{ order.financialStatus }}</p>
            </div>
          </div>

          <div class="template-order__summary-row">
            <div class="template-order__summary-total">
              <p>Subtotal</p>
              <p>{{ order.subtotal }}</p>
            </div>

            <div class="template-order__summary-total">
              <p>Shipping (Standard Shipping)</p>
              <p>{{ order.shippingTotal }}</p>
            </div>

            <div class="template-order__summary-total">
              <p>Tax (VAT 20.0%)</p>
              <p>{{ order.taxTotal }}</p>
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
              <p>{{ order.total }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="template-order__section">
      <h3 class="template-order__section-title">Order Items</h3>

      <div class="template-order__item-grid">
        <div
          v-for="(lineItem, index) in order.lineItems"
          :key="index"
          class="template-order__item"
        >
          <div class="template-order__item-thumbnail">
            <img
              :src="lineItem.variant.image.transformedSrc"
              :alt="`${lineItem.variant.product.title} - ${lineItem.variant.title}`"
            />
          </div>

          <div class="template-order__item-details">
            <div class="template-order__item-row">
              <p class="body-2">{{ lineItem.variant.product.title }}</p>

              <p class="body-2">
                {{ lineItem.quantity }} x
                {{ lineItem.discountedTotalPrice }}
              </p>
            </div>

            <div class="template-order__item-row">
              <p class="body-2">{{ lineItem.variant.title }}</p>
            </div>

            <div v-if="lineItem.variant.sku" class="template-order__item-row">
              <p class="body-2">SKU: {{ lineItem.variant.sku }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </account>
</template>

<script>
import customerOrders from '@/graphql/shopify/queries/customerOrders.gql'

import Account from '~/components/Account'

import { decodeApiId } from '~/helpers/utils'
import { formatOrder } from '~/helpers/transform-graphql'

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
        order = formatOrder(findOrder.node)
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

  &__item-grid {
    border-top: 1px solid rgba($COLOR_BORDER_DARK, 0.25);
    column-gap: $SPACING_3XL;
    display: grid;
    grid-template-columns: 1fr;
    padding-top: $SPACING_M;
    row-gap: $SPACING_M;
  }

  &__item {
    display: grid;
    grid-template-columns: 92px 2fr;

    p {
      margin: 0;
    }
  }

  &__item-details {
    margin-left: $SPACING_XS;
  }

  &__item-thumbnail {
    height: 128px;
    overflow: hidden;
    width: 92px;

    img {
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
  }

  &__item-row {
    display: grid;
    grid-template-columns: 60% 40%;
    margin: $SPACING_3XS 0 $SPACING_XS 0;

    *:nth-child(2) {
      text-align: right;
    }
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

    &__item-grid {
      grid-template-columns: repeat(2, 1fr);
      padding-top: $SPACING_3XL;
    }

    &__item-details {
      margin-left: $SPACING_M;
    }

    &__item-row {
      &:first-child {
        margin-top: $SPACING_M;
      }
    }
  }
}
</style>
