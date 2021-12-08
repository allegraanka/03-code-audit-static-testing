<template>
  <account class="template-order">
    <nuxt-link class="template-order__back" to="/account/orders">
      <icon-arrow-back /> {{ $t('account.order.back') }}
    </nuxt-link>

    <div class="template-order__header">
      <div class="template-order__heading">
        <h3 class="template-order__title">
          {{ $t('account.order.title', 1, { number: order.orderNumber }) }}
        </h3>

        <p>{{ $t('account.order.body') }}</p>
      </div>

      <div class="template-order__date">
        <p class="label">{{ $t('account.order.date') }}</p>
        <p class="body-2">{{ order.processedAt }}</p>
      </div>
    </div>

    <div class="template-order__section">
      <h3 class="template-order__section-title h4">
        {{ $t('account.order.details') }}
      </h3>

      <div class="template-order__summary">
        <div class="template-order__summary-column">
          <h4 class="template-order__summary-title">
            {{ $t('account.order.shipping') }}
          </h4>

          <div class="template-order__summary-attribute">
            <label>{{ $t('account.order.labels.fulfillmentStatus') }}</label>
            <p class="body-2">{{ order.fulfillmentStatus }}</p>
          </div>

          <div
            v-if="order.shippingAddress"
            class="template-order__summary-attribute"
          >
            <label>{{ $t('account.order.labels.address') }}</label>

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
          <h4 class="template-order__summary-title">
            {{ $t('account.order.billing') }}
          </h4>

          <div
            class="template-order__summary-row template-order__summary-row--2up"
          >
            <div class="template-order__summary-attribute">
              <label>{{ $t('account.order.labels.financialStatus') }}</label>
              <p class="body-2">{{ order.financialStatus }}</p>
            </div>
          </div>

          <div class="template-order__summary-row">
            <div class="template-order__summary-total">
              <p>{{ $t('account.order.totals.subtotal') }}</p>
              <p>{{ order.subtotal }}</p>
            </div>

            <div class="template-order__summary-total">
              <p>{{ $t('account.order.totals.shipping') }}</p>
              <p>{{ order.shippingTotal }}</p>
            </div>

            <div class="template-order__summary-total">
              <p>{{ $t('account.order.totals.tax') }}</p>
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
              <p>{{ $t('account.order.totals.total') }}</p>
              <p>{{ order.total }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="template-order__section">
      <h3 class="template-order__section-title h4">
        {{ $t('account.order.items') }}
      </h3>

      <div class="template-order__item-grid">
        <div
          v-for="(lineItem, index) in order.lineItems"
          :key="index"
          class="template-order__item"
        >
          <div class="template-order__item-thumbnail">
            <img
              v-if="lineItem.variant"
              :src="lineItem.variant.image.transformedSrc"
              :alt="`${lineItem.variant.product.title} - ${lineItem.variant.title}`"
            />
          </div>

          <div class="template-order__item-details">
            <div class="template-order__item-row">
              <p
                v-if="lineItem.variant"
                class="template-order__item-row-title body-2"
              >
                {{ lineItem.variant.product.title }}
              </p>

              <p class="body-2">
                {{ lineItem.quantity }} x
                {{ lineItem.discountedTotalPrice }}
              </p>
            </div>

            <div v-if="lineItem.variant" class="template-order__item-row">
              <p class="body-2">{{ lineItem.variant.title }}</p>
            </div>

            <div
              v-if="lineItem.variant && lineItem.variant.sku"
              class="template-order__item-row"
            >
              <p class="body-2">
                {{ $t('account.order.sku') }}: {{ lineItem.variant.sku }}
              </p>
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
        message: 'Order not found'
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
    font-size: ms(-2);
    font-weight: $WEIGHT_MEDIUM;
    letter-spacing: $LETTER_SPACING_DISPLAY;
    padding-top: $SPACING_M;
    text-decoration: none;
    text-transform: uppercase;

    .icon {
      margin-right: $SPACING_S;
    }
  }

  &__title {
    margin: $SPACING_M + $SPACING_2XS 0 $SPACING_M;
  }

  &__heading {
    p {
      color: $COLOR_TEXT_SECONDARY;
    }
  }

  &__date {
    margin-top: $SPACING_L;

    .label {
      font-weight: $WEIGHT_MEDIUM;
      margin-bottom: $SPACING_XS;
    }

    .body-2 {
      color: $COLOR_TEXT_SECONDARY;
    }
  }

  &__summary {
    background-color: $COLOR_BACKGROUND_MID;
  }

  &__summary-column {
    padding: $SPACING_L $SPACING_M;
    position: relative;

    &:not(:last-child) {
      border-bottom: 1px solid $COLOR_BORDER_DARK;
    }
  }

  &__summary-row {
    border-bottom: 1px solid $COLOR_BORDER_DARK;
    padding: $SPACING_L 0;

    &:last-of-type {
      border-bottom: none;
      padding-bottom: 0;
    }

    &:first-of-type {
      padding-top: 0;
    }
  }

  &__summary-title {
    margin-bottom: $SPACING_L;
    margin-top: 0;
  }

  &__summary-attribute {
    &:not(:last-of-type) {
      padding-bottom: $SPACING_M;
    }

    label {
      font-weight: $WEIGHT_MEDIUM;
      margin-bottom: $SPACING_2XS;
    }

    p {
      color: $COLOR_TEXT_SECONDARY;
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
    margin: $SPACING_L 0 $SPACING_2XL;
  }

  &__section-title {
    margin-bottom: $SPACING_L;
    margin-top: 0;
  }

  &__item-grid {
    border-top: 1px solid $COLOR_BORDER_LIGHT;
    column-gap: $SPACING_3XL;
    display: grid;
    grid-template-columns: 1fr;
    padding-top: $SPACING_L;
    row-gap: $SPACING_L;
  }

  &__item {
    display: grid;
    grid-template-columns: 76px 2fr;

    p {
      margin: 0;
    }
  }

  &__item-details {
    margin-left: $SPACING_L;
  }

  &__item-thumbnail {
    border: 1px solid $COLOR_BORDER_LIGHT;
    height: 76px;
    overflow: hidden;
    width: 76px;

    img {
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
  }

  &__item-row {
    p {
      margin-bottom: $SPACING_XS;

      &:last-child {
        margin-bottom: $SPACING_XS;
      }

      &:not(.template-order__item-row-title) {
        color: $COLOR_TEXT_SECONDARY;
      }
    }
  }

  &__item-row-title {
    font-weight: $WEIGHT_MEDIUM;
  }

  @include mq($from: large) {
    &__back {
      font-size: ms(-1);
    }

    &__title {
      margin-top: $SPACING_L + $SPACING_2XS;
    }

    &__header {
      align-items: flex-end;
      display: flex;
      justify-content: space-between;
    }

    &__date {
      text-align: right;

      .label {
        font-size: ms(-1);
        margin-bottom: $SPACING_XS;
      }
    }

    &__summary {
      display: grid;
      grid-template-columns: 0.8fr 2.2fr;
      padding: $SPACING_XL;
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
        border-right: 1px solid $COLOR_BORDER_DARK;
      }
    }

    &__summary-attribute {
      &:not(:last-of-type) {
        padding-bottom: $SPACING_3XL;
      }

      label {
        margin-bottom: $SPACING_S;
      }

      label,
      p {
        font-size: ms(-1);
      }
    }

    &__summary-total {
      &:not(:last-of-type) {
        margin-bottom: $SPACING_XS;
      }
    }

    &__summary-row {
      &--2up {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }
    }

    &__section {
      margin: $SPACING_XL 0 $LAYOUT_XL;
    }

    &__item {
      grid-template-columns: 96px 2fr;
    }

    &__item-grid {
      grid-template-columns: repeat(2, 1fr);
      padding-top: $SPACING_XL;
    }

    &__item-thumbnail {
      height: 96px;
      width: 96px;
    }
  }
}
</style>
