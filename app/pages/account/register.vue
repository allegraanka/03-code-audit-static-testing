<template>
  <div class="template-register">
    <div class="container container--tight">
      <div class="row">
        <div class="col xs12 m6 push-m3">
          <h1 class="template-register__title h3">Create Account</h1>

          <form
            ref="form"
            class="template-register__form form"
            @submit.prevent="handleRegisterEvent"
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
                <label class="form-group__label" :for="field.id">
                  {{ field.label }}
                </label>

                <input
                  :id="field.id"
                  v-model="variables.input[field.key]"
                  :type="field.type"
                  :placeholder="field.label"
                  :required="field.required"
                />
              </div>

              <div class="checkbox__container">
                <input
                  id="AcceptsMarketing"
                  v-model="variables.input.acceptsMarketing"
                  type="checkbox"
                  class="checkbox__input"
                />

                <label for="AcceptsMarketing" class="checkbox__label">
                  Sign up to latest news and offers and you could win £50 in our
                  monthly prize draws
                </label>
              </div>
            </div>

            <app-button block>Register</app-button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import customerCreate from '@/graphql/shopify/mutations/customerCreate.gql'

import AppButton from '~/components/AppButton'

export default {
  components: {
    AppButton
  },

  data() {
    return {
      fields: [
        {
          key: 'firstName',
          id: 'FirstName',
          label: 'First name',
          type: 'text',
          required: true
        },
        {
          key: 'lastName',
          id: 'LastName',
          label: 'Last name',
          type: 'text',
          required: true
        },
        {
          key: 'email',
          id: 'EmailAddress',
          label: 'Email address',
          type: 'email',
          required: true
        },
        {
          key: 'password',
          id: 'Password',
          label: 'Password',
          type: 'password',
          required: true
        }
      ],

      variables: {
        input: {
          acceptsMarketing: false,
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        }
      },

      message: null
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

  methods: {
    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      login: 'customer/login'
    }),

    /**
     * Handles the register form submit event.
     */
    handleRegisterEvent() {
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
        .request(customerCreate, this.variables)
        .then(({ customerCreate }) => {
          if (!customerCreate.customer) {
            this.message = {
              type: 'error',
              content:
                'This email address is already associated with an account.'
            }
            return
          }

          this.logCustomerIn()
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
    },

    /**
     * Handles logging in the customer.
     * - Uses register credentials, redirects to dashboard.
     */
    logCustomerIn() {
      this.login({
        email: this.variables.input.email,
        password: this.variables.input.password
      })
        .then(() => {
          this.$router.push({ name: 'account' })
        })
        .catch(() => {
          this.message = {
            type: 'error',
            content:
              'You couldn\'t be logged in, <nuxt-link to="/account/login">try again</nuxt-link>.'
          }
        })
    }
  }
}
</script>

<style lang="scss">
.template-register {
  padding: 1.875rem 0;

  @include mq($from: medium) {
    padding: $LAYOUT_S 0;
  }
}
</style>
