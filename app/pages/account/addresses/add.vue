<template>
  <account>
    <nuxt-link class="template-addresses-add__back" to="/account/addresses">
      <icon-arrow-back /> Back to Addresses
    </nuxt-link>

    <h2 class="template-addresses-add__title">Add Address</h2>

    <form
      ref="form"
      class="template-addresses-add__form form"
      @submit.prevent="handleAddressAdd"
    >
      <div
        v-if="message"
        class="form__message"
        :class="`form__message--${message.type}`"
      >
        <template v-if="Array.isArray(message.content)">
          <template v-for="content in message.content">
            {{ content }}
          </template>
        </template>

        <template v-else>
          {{ message.content }}
        </template>
      </div>

      <address-fields v-model="input.address" />

      <app-button>Add new address</app-button>
    </form>
  </account>
</template>

<script>
import { mapState } from 'vuex'

import customerAddressCreate from '@/graphql/shopify/mutations/customerAddressCreate'

import Account from '~/components/Account'
import AddressFields from '~/components/AddressFields'
import AppButton from '~/components/AppButton'

import IconArrowBack from '@/assets/icons/directional-arrow-backward.svg?inline'

export default {
  components: {
    Account,
    AddressFields,
    AppButton,
    IconArrowBack
  },

  data() {
    return {
      message: null,
      input: {
        address: {}
      }
    }
  },

  computed: {
    /**
     * Maps the Vuex state.
     */
    ...mapState({
      accessToken: ({ customer }) => customer.accessToken
    })
  },

  watch: {
    /**
     * When the message is set, stop the loading state.
     */
    message() {
      this.setLoadingState(false)
    }
  },

  methods: {
    /**
     * Handles the address add event.
     */
    handleAddressAdd() {
      const formIsValid = this.$refs.form.checkValidity()

      this.setLoadingState()

      if (!formIsValid) {
        this.message = {
          type: 'error',
          content: 'Please complete all required fields.'
        }
        return
      }

      this.$graphql.shopify
        .request(customerAddressCreate, {
          customerAccessToken: this.accessToken,
          address: this.input.address
        })
        .then(() => {
          this.$router.push('/account/addresses')
        })
        .catch((error) => {
          this.message = {
            type: 'error',
            content: error.response
              ? error.response.errors.map((error) => error.message)
              : "Something wen't wrong, please try again."
          }
        })
    },

    /**
     * Sets the form loading state.
     * @param {boolean} state - The loading state.
     */
    setLoadingState(state = true) {
      this.$refs.form.elements.forEach((element) => {
        element.disabled = state
      })
    }
  }
}
</script>

<style lang="scss">
.template-addresses-add {
  &__back {
    align-items: center;
    display: flex;

    .icon {
      margin-right: 0.625rem;
    }
  }

  &__title {
    margin-top: $SPACING_4XL;
  }

  @include mq($from: large) {
    &__form {
      .form-group {
        align-items: flex-start;
        column-gap: $SPACING_M;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }

      .form-group__label {
        font-weight: $WEIGHT_MEDIUM;
        text-transform: none;
      }
    }
  }
}
</style>
