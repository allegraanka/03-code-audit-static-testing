<template>
  <div class="template-login">
    <div class="container">
      <div class="row">
        <div class="col xs12 m6 push-m3 l4 push-l4">
          <h1 class="template-login__title h3">Log In</h1>

          <form ref="form" class="template-login__form form">
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
            </div>

            <app-button
              ref="submit"
              block
              @click.native.prevent="handleLoginEvent"
            >
              Login
            </app-button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

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
      this.setLoadingState()

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

          this.setLoadingState(false)
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
.template-login {
  padding: 1.875rem 0;

  @include mq($from: medium) {
    padding: $LAYOUT_S 0;

    &__title {
      text-align: center;
    }
  }
}
</style>
