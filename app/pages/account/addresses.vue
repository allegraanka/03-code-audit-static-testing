<template>
  <account class="template-addresses" :error="error">
    <div class="template-addresses__header">
      <h2>Your Addresses</h2>
    </div>

    <p v-if="hasNoAddresses">You don't have any saved addresses.</p>

    <div v-else class="template-addresses__grid">
      <div class="template-addresses__default">
        <div v-if="defaultAddress">
          <p class="template-addresses__label label">Default address</p>

          <p class="body-2">
            <span
              v-for="(line, index) in defaultAddress.formatted"
              :key="index"
            >
              {{ line }}<br />
            </span>
          </p>

          <div class="template-addresses__actions">
            <nuxt-link
              class="template-addresses__action"
              to="/account/addresses/edit"
            >
              Edit Address
            </nuxt-link>

            <nuxt-link
              class="template-addresses__action"
              to="/account/addresses/delete"
            >
              Delete Address
            </nuxt-link>
          </div>
        </div>

        <p v-else>You don't have a default address.</p>
      </div>

      <div v-if="addresses.length >= 1" class="template-addresses__additional">
        <p class="template-addresses__label label">Additional addresses</p>

        <div
          v-for="(address, index) in addresses"
          :key="index"
          class="template-addresses__address"
        >
          <p class="body-2">
            <span
              v-for="(line, lineIndex) in address.formatted"
              :key="lineIndex"
            >
              {{ line }}<br />
            </span>
          </p>

          <div class="template-addresses__actions">
            <nuxt-link
              class="template-addresses__action"
              to="/account/addresses/edit"
            >
              Edit Address
            </nuxt-link>

            <nuxt-link
              class="template-addresses__action"
              to="/account/addresses/delete"
            >
              Delete Address
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </account>
</template>

<script>
import customerAddresses from '@/graphql/shopify/queries/customerAddresses'

import Account from '~/components/Account'

export default {
  components: {
    Account
  },

  async asyncData({ app, store }) {
    let defaultAddress = null
    let addresses = []

    const { customer } = await app.$graphql.shopify.request(customerAddresses, {
      customerAccessToken: store.state.customer.accessToken
    })

    if (customer) {
      if (customer.defaultAddress) {
        defaultAddress = customer.defaultAddress
      }

      if (customer.addresses) {
        addresses = [...customer.addresses.edges.map(({ node }) => node)]

        if (customer.defaultAddress) {
          addresses = addresses.filter(({ id }) => id !== defaultAddress.id)
        }
      }
    }

    return {
      defaultAddress,
      addresses,
      error: !!!customer
    }
  },

  computed: {
    /**
     * Returns if the customer doesn't have any addresses.
     * @returns {boolean} - If the customer has any addresses.
     */
    hasNoAddresses() {
      return this.addresses.length === 0 && !this.defaultAddress
    }
  }
}
</script>

<style lang="scss">
.template-addresses {
  $parent: &;

  &__default {
    background-color: $COLOR_BACKGROUND_LIGHT;
    margin-bottom: $SPACING_XL;
    padding: $SPACING_L $SPACING_XL $SPACING_XL;
  }

  &__label {
    margin-bottom: 0.438rem;
  }

  &__additional {
    border: 1px solid rgba($COLOR_BORDER_DARK, 0.25);

    #{$parent}__label {
      padding: $SPACING_L $SPACING_XL 0 $SPACING_XL;
    }

    #{$parent}__address {
      padding: $SPACING_2XL $SPACING_XL $SPACING_2XL $SPACING_XL;

      &:first-of-type {
        padding-top: 0;
      }

      &:not(:last-of-type) {
        border-bottom: 1px solid rgba($COLOR_BORDER_DARK, 0.25);
      }
    }
  }

  &__action {
    color: $COLOR_TEXT_PRIMARY;
    font-size: ms(-1);
    margin-right: $SPACING_M;
    text-decoration: underline;
  }

  @include mq($from: large) {
    &__grid {
      align-items: flex-start;
      display: grid;
      gap: $SPACING_M;
      grid-template-columns: repeat(2, 1fr);
    }

    &__default {
      padding: $SPACING_3XL;
    }

    &__label {
      margin-bottom: 1.875rem;
    }
  }
}
</style>
