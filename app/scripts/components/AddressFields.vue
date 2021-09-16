<template>
  <form ref="form" class="address-fields" @submit.prevent="handleSubmitEvent">
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

    <div class="form-group">
      <div
        v-for="(field, index) in fields"
        :key="`field-${index}`"
        class="form-group__field"
      >
        <label class="form-group__label subtitle-2" :for="field.name">
          {{ field.label }}
          <template v-if="field.required">*</template>
        </label>

        <select
          v-if="field.type === 'select'"
          :id="field.name"
          v-model="input[field.name]"
          :required="field.required"
        >
          <option
            v-for="(option, optionIndex) in field.options"
            :key="`field-${field}-${optionIndex}`"
            :value="option.code"
          >
            {{ option.name }}
          </option>
        </select>

        <input
          v-else
          :id="field.name"
          v-model="input[field.name]"
          :type="field.type"
          :placeholder="field.label"
          :required="field.required"
        />
      </div>
    </div>

    <div class="address-fields__actions">
      <app-button>{{ submitLabel }}</app-button>

      <app-button
        v-if="method === 'update' && !isDefault"
        variant="secondary"
        button-type="button"
        :disabled="disabled"
        @click.native.prevent="handleSetDefault"
      >
        Set as default address
      </app-button>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex'

import customerAddressCreate from '@/graphql/shopify/mutations/customerAddressCreate.gql'
import customerAddressUpdate from '@/graphql/shopify/mutations/customerAddressUpdate.gql'
import customerDefaultAddressUpdate from '@/graphql/shopify/mutations/customerDefaultAddressUpdate.gql'

import AppButton from '~/components/AppButton'

import fetchCountries from '~/helpers/fetch-countries'

const fields = [
  {
    id: 'FirstName',
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    required: true
  },
  {
    id: 'LastName',
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    required: true
  },
  {
    id: 'Address1',
    name: 'address1',
    label: 'Address 1',
    type: 'text',
    required: true
  },
  {
    id: 'Address2',
    name: 'address2',
    label: 'Address 2',
    type: 'text',
    required: true
  },
  {
    id: 'City',
    name: 'city',
    label: 'City',
    type: 'text',
    required: true
  },
  {
    id: 'Country',
    name: 'country',
    label: 'Country',
    type: 'select',
    options: [],
    required: true
  },
  {
    id: 'Zip',
    name: 'zip',
    label: 'Postal / Zip Code',
    type: 'text',
    required: true
  },
  {
    id: 'Phone',
    name: 'phone',
    label: 'Phone',
    type: 'tel'
  }
]

export default {
  components: {
    AppButton
  },

  props: {
    method: {
      type: String,
      default: 'add'
    },

    address: {
      type: Object,
      default: null
    },

    defaultAddress: {
      type: Object,
      default: null
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      countries: [],
      message: null
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
     * Constructs the input object.
     * - Prepopulates if `address` exists.
     *
     * @returns {object} - The address fields.
     */
    input() {
      return fields.reduce(
        (accumulator, current) => ({
          ...accumulator,
          [current.name]: (this.address && this.address[current.name]) || ''
        }),
        {}
      )
    },

    /**
     * Returns the form fields.
     * @returns {Array} - The fields.
     */
    fields() {
      return fields.map((field) => {
        if (field.name === 'country') {
          const { options, ...rest } = field

          return {
            options: this.countries,
            ...rest
          }
        }

        return field
      })
    },

    /**
     * Returns the label for the submit button.
     * @returns {string} - The button label.
     */
    submitLabel() {
      if (this.method === 'update') {
        return 'Update address'
      }

      return 'Add new address'
    },

    /**
     * Returns the GraphQL mutation to use.
     * @returns {Function} - The GraphQL mutation.
     */
    mutation() {
      if (this.method === 'update') {
        return customerAddressUpdate
      }

      return customerAddressCreate
    },

    /**
     * Returns the variables for the mutation.
     * @returns {object} - The mutation variables.
     */
    variables() {
      const variables = {
        customerAccessToken: this.accessToken,
        address: this.input
      }

      if (this.method === 'update' && this.address && this.address.id) {
        variables.id = this.address.id
      }

      return variables
    },

    /**
     * Returns if the current address is the default.
     * @returns {boolean} - The default state.
     */
    isDefault() {
      if (!this.defaultAddress || !this.address || !this.address.id) {
        return false
      }

      return this.defaultAddress.id === this.address.id
    }
  },

  watch: {
    /**
     * When the message is set, stop the loading state.
     */
    message() {
      this.setLoadingState(false)
    }
  },

  async mounted() {
    const countries = await fetchCountries()

    if (countries) {
      this.countries = countries
    }
  },

  methods: {
    /**
     * Handles the submit label.
     */
    handleSubmitEvent() {
      const formIsValid = this.$refs.form.checkValidity()

      if (this.disabled) {
        return
      }

      this.setLoadingState()

      if (!formIsValid) {
        this.message = {
          type: 'error',
          content: 'Please complete all required fields.'
        }
        return
      }

      this.$graphql.shopify
        .request(this.mutation, this.variables)
        .then(() => {
          this.$router.push('/account/addresses')
        })
        .catch(this.handleError)
    },

    /**
     * Handles the default address set event.
     */
    handleSetDefault() {
      if (!this.address || !this.address.id) {
        throw Error(
          'Address identifier is required to set the default address.'
        )
      }

      this.setLoadingState()

      this.$graphql.shopify
        .request(customerDefaultAddressUpdate, {
          customerAccessToken: this.accessToken,
          addressId: this.address.id
        })
        .then(() => {
          this.$router.push('/account/addresses')
        })
        .catch(this.handleError)
    },

    /**
     * Sets the form loading state.
     * @param {boolean} state - The loading state.
     */
    setLoadingState(state = true) {
      this.$refs.form.elements.forEach((element) => {
        element.disabled = state
      })
    },

    /**
     * Handles the error response.
     * @param {object} error - The error response.
     */
    handleError(error) {
      if (!error) {
        return
      }

      this.message = {
        type: 'error',
        content: error.response
          ? error.response.errors.map((error) => error.message)
          : "Something wen't wrong, please try again."
      }
    }
  }
}
</script>

<style lang="scss">
.address-fields {
  &__actions {
    .button {
      display: inline;
      margin-right: $SPACING_S;
    }
  }

  @include mq($from: large) {
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
</style>
