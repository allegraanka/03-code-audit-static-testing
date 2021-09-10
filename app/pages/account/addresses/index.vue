<template>
  <account class="template-addresses" :error="error">
    <div class="template-addresses__header">
      <app-button url="/account/addresses/add" class="template-addresses__add">
        Add new address
      </app-button>

      <h2>Your Addresses</h2>
    </div>

    <p v-if="error" class="template-addresses__error">{{ error }}</p>

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
              :to="`/account/addresses/edit?id=${defaultAddress.handle}`"
            >
              Edit Address
            </nuxt-link>

            <button
              class="template-addresses__action"
              @click="() => handleAddressDelete(defaultAddress.id)"
            >
              Delete Address
            </button>
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
              :to="`/account/addresses/edit?id=${address.handle}`"
            >
              Edit Address
            </nuxt-link>

            <button
              class="template-addresses__action"
              @click="() => handleAddressDelete(address.id)"
            >
              Delete Address
            </button>
          </div>
        </div>
      </div>
    </div>
  </account>
</template>

<script>
import { mapState } from 'vuex'

import customerAddresses from '@/graphql/shopify/queries/customerAddresses.gql'
import customerAddressDelete from '@/graphql/shopify/mutations/customerAddressDelete.gql'

import Account from '~/components/Account'
import AppButton from '~/components/AppButton'

import { decodeApiId } from '~/helpers/utils'
import { formatAddress } from '~/helpers/transform-graphql'

export default {
  components: {
    Account,
    AppButton
  },

  async asyncData({ app, store }) {
    let defaultAddress = null
    let addresses = []

    const { customer } = await app.$graphql.shopify.request(customerAddresses, {
      customerAccessToken: store.state.customer.accessToken
    })

    if (customer) {
      if (customer.defaultAddress) {
        defaultAddress = formatAddress(customer.defaultAddress)
      }

      if (customer.addresses) {
        addresses = [
          ...customer.addresses.edges.map(({ node }) => formatAddress(node))
        ]

        if (customer.defaultAddress) {
          addresses = addresses.filter(({ id }) => id !== defaultAddress.id)
        }
      }
    }

    return {
      defaultAddress,
      addresses,
      error: !!!customer,
      error: null
    }
  },

  computed: {
    /**
     * Maps the Vuex state.
     */
    ...mapState({
      accessToken: ({ customer }) => customer.accessToken
    }),

    /**
     * Returns if the customer doesn't have any addresses.
     * @returns {boolean} - If the customer has any addresses.
     */
    hasNoAddresses() {
      return this.addresses.length === 0 && !this.defaultAddress
    }
  },

  methods: {
    /**
     * Handles the address delete event.
     * @param {string} id - The address identifier to delete.
     */
    handleAddressDelete(id) {
      if (!id) {
        throw Error('The address identifier must be provided to delete it.')
      }

      this.$graphql.shopify
        .request(customerAddressDelete, {
          id,
          customerAccessToken: this.accessToken
        })
        .then(() => {
          this.$nuxt.refresh()
        })
        .catch((error) => {
          this.error = error.response
            ? error.response.errors.map((error) => error.message)
            : "Something wen't wrong, please try again."
        })
    }
  }
}
</script>

<style lang="scss">
.template-addresses {
  $parent: &;

  &__header {
    margin-bottom: $SPACING_3XL;

    .button {
      width: 100%;
    }
  }

  &__add {
    margin-bottom: $SPACING_L;
  }

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
    @include button-reset;
    color: $COLOR_TEXT_PRIMARY;
    font-size: ms(-1);
    margin-right: $SPACING_M;
    text-decoration: underline;
  }

  @include mq($from: large) {
    &__header {
      align-items: center;
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;

      h2 {
        margin: 0;
      }

      .button {
        width: auto;
      }
    }

    &__add {
      margin-bottom: 0;
    }

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
