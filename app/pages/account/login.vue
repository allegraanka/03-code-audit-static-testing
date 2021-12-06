<template>
  <div class="template-login">
    <div class="template-login__col">
      <div class="template-login__inner">
        <h1 class="template-login__title h2">{{ title }}</h1>

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
            <div class="form-group__field template-login__form-field">
              <label
                class="template-login__label form-group__label"
                for="RecoverEmail"
              >
                {{ $t('forms.labels.email') }}*
              </label>

              <input
                id="RecoverEmail"
                v-model="recover.input.email"
                class="template-login__input"
                type="email"
                :placeholder="$t('forms.labels.email')"
                required
              />
            </div>
          </div>

          <app-button block>{{ $t('account.recover.submit') }}</app-button>

          <button
            type="button"
            class="template-login__recover-toggle"
            @click.prevent="toggleRecover"
          >
            {{ $t('account.recover.cancel') }}
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
              class="form-group__field template-login__form-field"
            >
              <label
                class="template-login__label form-group__label"
                :for="field.id"
              >
                {{ field.label }}*
              </label>

              <input
                :id="field.id"
                v-model="variables.input[field.key]"
                class="template-login__input"
                :type="field.type"
                :placeholder="field.label"
                :required="field.required"
              />
            </div>
          </div>

          <app-button block>{{ $t('account.login.submit') }}</app-button>

          <button
            type="button"
            class="template-login__recover-toggle"
            @click.prevent="toggleRecover"
          >
            {{ $t('account.login.recover') }}
          </button>
        </form>
      </div>
    </div>

    <div class="template-login__col template-login__col--register">
      <div class="template-login__inner">
        <h2 class="template-login__subtitle">
          {{ $t('account.login.register.title') }}
        </h2>

        <p class="body-2">
          {{ $t('account.login.register.body') }}
        </p>

        <app-button url="/account/register" variant="outlined">
          {{ $t('account.login.register.link') }}
        </app-button>
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
     * Returns the fields to map into a form.
     * @returns {Array} - The field objects.
     */
    fields() {
      return [
        {
          key: 'email',
          id: 'EmailAddress',
          label: this.$t('forms.labels.email'),
          type: 'email',
          required: true
        },
        {
          key: 'password',
          id: 'Password',
          label: this.$t('forms.labels.password'),
          type: 'password',
          required: true
        }
      ]
    },

    /**
     * Returns the dynamic page title.
     * @returns {string} - The title.
     */
    title() {
      return this.recover.show
        ? this.$t('account.recover.title')
        : this.$t('account.login.title')
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
          content: this.$t('account.login.errors.invalid')
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
              : this.$t('errors.messages.default')
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
            content: this.$tc('account.recover.success', 1, {
              email: this.recover.input.email
            })
          }

          this.resetRecoverForm()
        })
        .catch(() => {
          this.recover.message = {
            type: 'error',
            content: this.$t('errors.messages.default')
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
  padding: $SPACING_XL $GUTTER_WIDTH 0 $GUTTER_WIDTH;

  &__title,
  &__subtitle {
    margin-bottom: $SPACING_M;
    margin-top: 0;
  }

  &__col {
    &#{&}--register {
      margin-top: $SPACING_L;
      padding: $SPACING_XL 0 $SPACING_2XL;
      position: relative;

      &::before {
        background-color: $COLOR_BACKGROUND_MID;
        bottom: 0;
        content: '';
        left: -$GUTTER_WIDTH;
        position: absolute;
        right: -$GUTTER_WIDTH;
        top: 0;
        z-index: -1;
      }
    }
  }

  &__recover-toggle {
    @include button-reset;
    cursor: pointer;
    display: block;
    font-size: ms(-2);
    margin-top: $SPACING_M;
    text-decoration: underline;
  }

  &__label {
    &.form-group__label {
      font-size: ms(-2);
      font-weight: $WEIGHT_BOOK;
      letter-spacing: $LETTER_SPACING_SUBTITLE;
      margin-bottom: $SPACING_XS;
      text-transform: none;
    }
  }

  &__input {
    // prettier-ignore
    &[type=email],
    &[type=password] {
      font-size: ms(-2);
    }
  }

  &__form-field {
    &.form-group__field:not(:last-child) {
      margin-bottom: $SPACING_M;
    }
  }

  .row {
    margin-bottom: 0;
  }

  @include mq($from: large) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 0;

    &__title {
      margin-bottom: $SPACING_2XL;
    }

    &__subtitle {
      margin-bottom: $SPACING_L;
    }

    &__col {
      display: flex;
      justify-content: center;
      padding: $LAYOUT_XL 0;

      &#{&}--register {
        margin-top: 0;
        padding: $LAYOUT_XL 0;
        position: relative;

        &::before {
          left: 0;
          right: 0;
        }
      }
    }

    &__recover-toggle {
      margin-left: auto;
      margin-right: auto;
    }

    &__inner {
      max-width: 432px;
      width: 100%;
    }

    &__label {
      &.form-group__label {
        font-size: ms(-1);
        margin-bottom: $SPACING_S;
      }
    }

    &__input {
      // prettier-ignore
      &[type=email],
      &[type=password] {
        font-size: ms(-1);
      }
    }

    &__form-field {
      &.form-group__field:not(:last-child) {
        margin-bottom: $SPACING_L;
      }
    }
  }
}
</style>
