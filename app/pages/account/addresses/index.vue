<template>
  <account class="template-addresses" :error="error">
    <div class="template-addresses__header">
      <h2 class="template-addresses__title h3">
        {{ $t('account.addresses.title') }}
      </h2>

      <app-button url="/account/addresses/add" class="template-addresses__add">
        {{ $t('account.addresses.add') }}
      </app-button>
    </div>

    <p v-if="error" class="template-addresses__error">{{ error }}</p>

    <p v-if="hasNoAddresses">{{ $t('account.addresses.empty') }}</p>

    <div v-else class="template-addresses__grid">
      <div class="template-addresses__default">
        <div v-if="defaultAddress">
          <p class="template-addresses__label subtitle-2">
            {{ $t('account.addresses.default') }}
          </p>

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
              {{ $t('account.address.edit') }}
            </nuxt-link>

            <button
              class="template-addresses__action"
              @click="() => handleAddressDelete(defaultAddress.id)"
            >
              {{ $t('account.address.delete') }}
            </button>
          </div>
        </div>

        <p v-else>{{ $t('account.addresses.noDefault') }}</p>
      </div>

      <div v-if="addresses.length >= 1" class="template-addresses__additional">
        <p class="template-addresses__label subtitle-2">
          {{ $t('account.addresses.additional') }}
        </p>

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
              {{ $t('account.address.edit') }}
            </nuxt-link>

            <button
              class="template-addresses__action"
              @click="() => handleAddressDelete(address.id)"
            >
              {{ $t('account.address.delete') }}
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
      error: !customer,
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
        throw Error(this.$t('account.address.errors.addressDeleteById'))
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
            : this.$t('errors.messages.default')
        })
    }
  }
}
</script>

<style lang="scss">
.template-addresses {
  $parent: &;

  &__header {
    display: flex;
    flex-flow: column;
    padding: $SPACING_M 0 $SPACING_L;

    .button {
      width: 100%;
    }
  }

  &__title {
    margin-bottom: $SPACING_L;
    margin-top: 0;
  }

  &__default,
  &__additional {
    background-color: $COLOR_BACKGROUND_MID;
    padding: $SPACING_L $SPACING_M;
  }

  &__default {
    margin-bottom: $SPACING_M;
  }

  &__label {
    margin-bottom: $SPACING_XS;
  }

  &__additional {
    #{$parent}__address:not(:last-child) {
      border-bottom: 1px solid $COLOR_BORDER_DARK;
      margin-bottom: $SPACING_L;
      padding-bottom: $SPACING_L;
    }
  }

  &__actions {
    display: flex;
  }

  &__action {
    @include button-reset;
    color: $COLOR_TEXT_SECONDARY;
    font-size: ms(-2);
    margin-right: $SPACING_M;
    text-decoration: underline;
  }

  .body-2 {
    color: $COLOR_TEXT_SECONDARY;
  }

  @include mq($from: large) {
    &__header {
      align-items: center;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-top: 0;

      .button {
        width: auto;
      }
    }

    &__title {
      margin: 0;
    }

    &__default,
    &__additional {
      padding: $SPACING_L;
    }

    &__additional {
      #{$parent}__address:not(:last-child) {
        margin-bottom: $SPACING_XL;
        padding-bottom: $SPACING_XL;
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

    &__label {
      margin-bottom: $SPACING_M;
    }

    &__action {
      font-size: ms(-1);
    }
  }
}
</style>
