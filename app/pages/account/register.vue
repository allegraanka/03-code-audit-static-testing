<template>
  <div class="template-register">
    <div class="container">
      <div class="row">
        <div class="col xs12 m6 push-m3 l4 push-l4">
          <h1 class="template-register__title h3">Create Account</h1>

          <form ref="form" class="template-register__form form">
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

            <app-button
              ref="submit"
              block
              @click.native.prevent="handleRegisterEvent"
            >
              Register
            </app-button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
          type: 'text'
        },
        {
          key: 'lastName',
          id: 'LastName',
          label: 'Last name',
          type: 'text'
        },
        {
          key: 'email',
          id: 'EmailAddress',
          label: 'Email address',
          type: 'email'
        },
        {
          key: 'password',
          id: 'Password',
          label: 'Password',
          type: 'password'
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

  computed: {
    /**
     * Returns if the form is valid for submission.
     * @returns {boolean} - The valid state.
     */
    inputIsValid() {
      let count = 0
      const required = Object.keys(this.variables.input).filter(
        (input) => typeof this.variables.input[input] === 'string'
      )

      required.forEach((key) => {
        if (
          typeof this.variables.input[key] === 'string' &&
          this.variables.input[key] !== ''
        ) {
          count++
        }
      })

      return count === required.length
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
     * Handles the register form submit event.
     */
    handleRegisterEvent() {
      this.setLoadingState()

      if (!this.inputIsValid) {
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

          console.log('Account created, logging in...')
        })
        .catch(({ response }) => {
          this.message = {
            type: 'error',
            content: response.errors.map((error) => error.message)
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
.template-register {
  padding: 1.875rem 0;

  @include mq($from: medium) {
    padding: $LAYOUT_S 0;

    &__title {
      text-align: center;
    }
  }
}
</style>
