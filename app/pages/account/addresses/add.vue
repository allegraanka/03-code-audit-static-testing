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

      <app-button>Add new address</app-button>
    </form>
  </account>
</template>

<script>
import customerAddressCreate from '@/graphql/shopify/mutations/customerAddressCreate'

import Account from '~/components/Account'
import AppButton from '~/components/AppButton'

import IconArrowBack from '@/assets/icons/directional-arrow-backward.svg?inline'

import fetchCountries from '~/helpers/fetch-countries'

export default {
  components: {
    Account,
    AppButton,
    IconArrowBack
  },

  async asyncData() {
    const countries = await fetchCountries()

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
        options: countries,
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

    return {
      fields,

      input: fields.reduce(
        (accumulator, current) => ({
          ...accumulator,
          [current.name]: ''
        }),
        {}
      )
    }
  },

  data() {
    return {
      message: null
    }
  },

  methods: {
    /**
     * Handles the address add event.
     */
    handleAddressAdd() {
      const formIsValid = this.$refs.form.checkValidity()

      if (!formIsValid) {
        this.message = {
          type: 'error',
          content: 'Please complete all required fields.'
        }
        return
      }
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
