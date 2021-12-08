<template>
  <account class="template-account" :error="error">
    <div class="template-account__grid">
      <div class="template-account__card" :class="orderCardClasses">
        <h4 class="template-account__card-title">
          {{ $t('account.dashboard.orders.recent') }}
        </h4>

        <template v-if="order">
          <div class="template-account__card-attributes">
            <div
              v-for="(column, index) in Object.keys(orderColumns)"
              :key="index"
              class="template-account__card-attribute"
            >
              <label>{{ orderColumns[column] }}</label>
              <p>{{ order[column] }}</p>
            </div>
          </div>

          <nuxt-link to="/account/orders" class="template-account__card-link">
            {{ $t('account.dashboard.orders.viewAll') }}
          </nuxt-link>
        </template>

        <p v-else class="template-account__card-empty body-2">
          {{ $t('account.dashboard.orders.empty') }}
          <nuxt-link to="/">{{ $t('account.dashboard.orders.link') }}</nuxt-link
          >.
        </p>
      </div>

      <div class="template-account__card" :class="addressCardClasses">
        <h4 class="template-account__card-title">
          {{ $t('account.dashboard.addresses.title') }}
        </h4>

        <template v-if="address">
          <label class="template-account__card-label subtitle-2">
            {{ $t('account.dashboard.addresses.default') }}
          </label>

          <p class="body-2">
            <span v-for="(line, index) in address.formatted" :key="index">
              {{ line }}<br />
            </span>
          </p>

          <nuxt-link
            to="/account/addresses"
            class="template-account__card-link"
          >
            {{ $t('account.dashboard.addresses.viewAll') }}
          </nuxt-link>
        </template>

        <p v-else class="body-2">
          {{ $t('account.dashboard.addresses.empty') }}

          <nuxt-link to="/account/addresses">{{
            $t('account.dashboard.addresses.link')
          }}</nuxt-link
          >.
        </p>
      </div>

      <account-callout :content="$settings.account.cta" />
    </div>
  </account>
</template>

<script>
import customerDefaults from '@/graphql/shopify/queries/customerDefaults.gql'

import Account from '~/components/Account'
import AccountCallout from '~/components/AccountCallout'

import { formatOrder } from '~/helpers/transform-graphql'

export default {
  components: {
    Account,
    AccountCallout
  },

  async asyncData({ app, store }) {
    let order = null
    let address = null

    const { customer } = await app.$graphql.shopify.request(customerDefaults, {
      customerAccessToken: store.state.customer.accessToken
    })

    if (customer) {
      if (customer.orders.edges.length >= 1) {
        order = formatOrder(customer.orders.edges[0].node)
      }

      if (customer.defaultAddress) {
        address = customer.defaultAddress
      }
    }

    return {
      error: !customer,
      order,
      address
    }
  },

  computed: {
    /**
     * Returns an object of columns for orders.
     * @returns {object} - The order columns.
     */
    orderColumns() {
      return {
        orderNumber: this.$t('account.order.labels.orderNumber'),
        processedAt: this.$t('account.order.labels.processedAt'),
        total: this.$t('account.order.labels.total'),
        fulfillmentStatus: this.$t('account.order.labels.fulfillmentStatus')
      }
    },

    /**
     * Returns the dynamic classes for the order card.
     * @returns {object} - The dynamic classes.
     */
    orderCardClasses() {
      return {
        'template-account__card--empty': !this.order
      }
    },

    /**
     * Returns the dynamic classes for the address card.
     * @returns {object} - The dynamic classes.
     */
    addressCardClasses() {
      return {
        'template-account__card--empty': !this.address
      }
    }
  }
}
</script>

<style lang="scss">
.template-account {
  $parent: &;

  &__card {
    background-color: $COLOR_BACKGROUND_MID;
    padding: $SPACING_L $SPACING_M;

    &:not(:last-child) {
      margin-bottom: $SPACING_XL;
    }

    &#{&}--empty {
      align-self: flex-start;

      #{$parent}__card-title {
        margin-bottom: $SPACING_XS;
      }
    }

    .body-2 {
      color: $COLOR_TEXT_SECONDARY;
      margin-bottom: 0;
    }
  }

  &__card-title {
    margin-bottom: $SPACING_L;
    margin-top: 0;
  }

  &__card-attributes {
    display: grid;
    gap: $SPACING_L;
    grid-template-columns: repeat(2, 1fr);

    label {
      font-weight: $WEIGHT_MEDIUM;
      margin-bottom: $SPACING_2XS;
    }

    p {
      color: $COLOR_TEXT_SECONDARY;
      font-size: ms(-2);
    }
  }

  &__card-link {
    color: $COLOR_TEXT_SECONDARY;
    display: block;
    font-size: ms(-2);
    margin-top: $SPACING_L;
    text-decoration: underline;
  }

  &__card-label {
    margin-bottom: $SPACING_XS;
    text-transform: capitalize;
  }

  @include mq($from: large) {
    &__grid {
      display: grid;
      gap: $SPACING_2XL $SPACING_M;
      grid-template-columns: 3fr 2fr;
    }

    &__card {
      display: flex;
      flex-direction: column;
      padding: $SPACING_XL;

      &:not(:last-child) {
        margin-bottom: 0;
      }
    }

    &__card-empty {
      color: $COLOR_TEXT_SECONDARY;
      max-width: 70%;
    }

    &__card-attributes {
      gap: $SPACING_XL;

      label,
      p {
        font-size: ms(-1);
      }

      label {
        margin-bottom: $SPACING_XS;
      }
    }

    &__card-link {
      font-size: ms(-1);
      margin-top: $SPACING_XL;
    }
  }
}
</style>
