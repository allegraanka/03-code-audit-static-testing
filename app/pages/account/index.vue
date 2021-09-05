<template>
  <account class="template-account" :error="error">
    <div class="template-account__grid">
      <div class="template-account__card" :class="orderCardClasses">
        <h4 class="template-account__card-title">Recent Order</h4>

        <template v-if="order">
          <div class="template-account__card-attributes">
            <div
              v-for="(column, index) in Object.keys(columns)"
              :key="index"
              class="template-account__card-attribute"
            >
              <label>{{ columns[column] }}</label>
              <p>{{ order[column] }}</p>
            </div>
          </div>

          <nuxt-link to="/account/orders" class="template-account__card-link">
            View All Orders
          </nuxt-link>
        </template>

        <p v-else class="template-account__card-empty body-2">
          You haven't made any orders using this account.
          <nuxt-link to="/">Start shopping</nuxt-link>.
        </p>
      </div>

      <div class="template-account__card" :class="addressCardClasses">
        <h4 class="template-account__card-title">Address Book</h4>

        <template v-if="address">
          <label class="template-account__card-label">Default Address</label>

          <p class="body-2">
            <span v-for="(line, index) in address.formatted" :key="index">
              {{ line }}<br />
            </span>
          </p>

          <nuxt-link
            to="/account/addresses"
            class="template-account__card-link"
          >
            View All Addresses
          </nuxt-link>
        </template>

        <p v-else class="body-2">
          You don't have any saved addresses.
          <nuxt-link to="/account/addresses">Add a saved address</nuxt-link>.
        </p>
      </div>
    </div>
  </account>
</template>

<script>
import customerDefaults from '@/graphql/shopify/queries/customerDefaults.gql'

import Account from '~/components/Account'

import { formatOrder } from '~/helpers/transform-graphql'

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
        order = formatOrder(customer.orders.edges[0].node)
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
  },

  data() {
    return {
      columns: {
        orderNumber: 'Order number',
        processedAt: 'Date',
        total: 'Amount',
        fulfillmentStatus: 'Shipping status'
      }
    }
  },

  computed: {
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
    background-color: $COLOR_BACKGROUND_LIGHT;
    padding: $SPACING_XL $SPACING_M;

    &:not(:last-child) {
      margin-bottom: $SPACING_XL;
    }

    &#{&}--empty {
      align-self: flex-start;

      #{$parent}__card-title {
        margin-bottom: $SPACING_XS;
      }
    }
  }

  &__card-title {
    margin-bottom: 1.375rem;
  }

  &__card-attributes {
    display: grid;
    gap: 1.375rem;
    grid-template-columns: repeat(2, 1fr);
  }

  &__card-link {
    color: $COLOR_TEXT_PRIMARY;
    display: block;
    font-size: ms(-2);
    padding-top: $SPACING_2XL;
    text-decoration: underline;
  }

  &__card-label {
    margin-bottom: $SPACING_S;
  }

  @include mq($from: large) {
    &__grid {
      display: grid;
      gap: $SPACING_M;
      grid-template-columns: 3fr 2fr;
    }

    &__card {
      display: flex;
      flex-direction: column;
      padding: 1.875rem $SPACING_3XL;

      &:not(:last-child) {
        margin-bottom: 0;
      }
    }

    &__card-empty {
      color: $COLOR_TEXT_SECONDARY;
      max-width: 70%;
    }

    &__card-link {
      margin-top: auto;
    }
  }
}
</style>
