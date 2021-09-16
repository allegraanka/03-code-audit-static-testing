<template>
  <div class="template-login">
    <div class="container container--tight">
      <div class="row">
        <div class="col xs12 m6 push-m3">
          <h1 class="template-login__title h3">{{ title }}</h1>

          <form
            v-if="recover.show"
            class="template-login__form form"
            @submit.prevent="handleRecoverSubmit"
          >
            <div
              v-if="recover.message"
              class="form__message"
              :class="`form__message--${recover.message.type}`"
            >
              <template v-if="Array.isArray(recover.message.content)">
                <template v-for="content in recover.message.content">
                  {{ content }}
                </template>
              </template>

              <template v-else>
                {{ recover.message.content }}
              </template>
            </div>

            <div class="form-group">
              <div class="form-group__field">
                <label class="form-group__label" for="RecoverEmail">
                  Email
                </label>

                <input
                  id="RecoverEmail"
                  v-model="recover.input.email"
                  type="email"
                  placeholder="Email"
                  required
                />
              </div>
            </div>

            <app-button block>Submit</app-button>

            <button
              type="button"
              class="template-login__recover-toggle"
              @click.prevent="toggleRecover"
            >
              Cancel
            </button>
          </form>

          <form
            v-else
            ref="form"
            class="template-login__form form"
            @submit.prevent="handleLoginEvent"
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
            </div>

            <app-button block>Login</app-button>

            <button
              type="button"
              class="template-login__recover-toggle"
              @click.prevent="toggleRecover"
            >
              Forgotten your password?
            </button>
          </form>

          <div class="template-login__register-section">
            <h3>New Customers</h3>

            <p class="body-2">
              Create an account to expedite future checkouts, view and update
              your account details, track your order status and history.
            </p>

            <app-button url="/account/register">Create an account</app-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import customerRecover from '@/graphql/shopify/mutations/customerRecover.gql'

import AppButton from '~/components/AppButton'

export default {
  components: {
    AppButton
  },

  data() {
    return {
      fields: [
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
          email: '',
          password: ''
        }
      },

      message: null,

      recover: {
        show: false,
        message: null,
        input: {
          email: ''
        }
      }
    }
  },

  computed: {
    /**
     * Returns the dynamic page title.
     * @returns {string} - The title.
     */
    title() {
      return this.recover.show ? 'Reset your password' : 'Log in'
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
     * Handles the login form submit event.
     * - Redirects to the account dashboard.
     */
    handleLoginEvent() {
      const formIsValid = this.$refs.form.checkValidity()

      this.setLoadingState()

      if (!formIsValid) {
        this.message = {
          type: 'error',
          content: 'Please complete all required fields.'
        }
        return
      }

      this.login({
        email: this.variables.input.email,
        password: this.variables.input.password
      })
        .then(() => {
          this.$router.push({ name: 'account' })
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
      if (!this.$refs.form) {
        return
      }

      this.$refs.form.elements.forEach((element) => {
        element.disabled = state
      })
    },

    /**
     * Toggles the recover form state.
     */
    toggleRecover() {
      this.recover.show = !this.recover.show
    },

    /**
     * Handles the recover account form submit event.
     */
    handleRecoverSubmit() {
      this.$graphql.shopify
        .request(customerRecover, {
          email: this.recover.input.email
        })
        .then(() => {
          this.recover.message = {
            type: 'success',
            content: `An email has been sent to ${this.recover.input.email}`
          }

          this.resetRecoverForm()
        })
        .catch(() => {
          this.recover.message = {
            type: 'error',
            content: 'Something went wrong, please try again.'
          }
        })
    },

    /**
     * Resets the account recover form.
     */
    resetRecoverForm() {
      this.recover.input.email = ''
    }
  }
}
</script>

<style lang="scss">
.template-login {
  padding: 1.875rem 0;

  &__register-section {
    margin-top: $LAYOUT_XL;
  }

  &__recover-toggle {
    @include button-reset;
    cursor: pointer;
    font-size: ms(-1);
    margin-top: $SPACING_S;
    text-decoration: underline;
  }

  @include mq($from: medium) {
    padding: $LAYOUT_XL 0;
  }
}
</style>
