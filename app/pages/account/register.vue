<template>
  <div class="template-register">
    <div class="template-register__col template-register__col--image">
      <responsive-image
        v-if="
          $settings.account &&
          $settings.account.image &&
          $settings.account.image.asset.url
        "
        class="template-error__image"
        :src="$settings.account.image.asset.url"
        :alt="$settings.account.altText"
        :max-height="850"
      />
    </div>

    <div class="template-register__col template-register__col--form">
      <div class="template-register__inner">
        <h1 class="template-register__title h2">
          {{ $t('account.register.title') }}
        </h1>

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
              v-for="field in fields"
              :key="`field-${field.id}`"
              class="form-group__field template-register__form-field"
            >
              <label
                class="form-group__label template-register__label"
                :for="field.id"
              >
                {{ field.label }}*
              </label>

              <input
                :id="field.id"
                v-model="variables.input[field.key]"
                class="template-register__input"
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

              <label
                for="AcceptsMarketing"
                class="checkbox__label template-register__checkbox-label"
              >
                {{ $t('account.register.labels.acceptsMarketing') }}
              </label>
            </div>
          </div>

          <app-button block>{{ $t('account.register.submit') }}</app-button>

          <div class="template-register__redirect caption">
            {{ $t('account.register.prompt') }}

            <nuxt-link to="/account/login">
              {{ $t('account.register.back') }}
            </nuxt-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import customerCreate from '@/graphql/shopify/mutations/customerCreate.gql'

import AppButton from '~/components/AppButton'
import ResponsiveImage from '~/components/ResponsiveImage'

export default {
  components: {
    AppButton,
    ResponsiveImage
  },

  data() {
    return {
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
     * Returns the fields to map into a form.
     * @returns {Array} - The field objects.
     */
    fields() {
      return [
        {
          key: 'firstName',
          id: 'FirstName',
          label: this.$t('forms.labels.firstName'),
          type: 'text',
          required: true
        },
        {
          key: 'lastName',
          id: 'LastName',
          label: this.$t('forms.labels.lastName'),
          type: 'text',
          required: true
        },
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
          content: this.$t('account.register.errors.invalid')
        }
        return
      }

      this.$graphql.shopify
        .request(customerCreate, this.variables)
        .then(({ customerCreate }) => {
          if (!customerCreate.customer) {
            this.message = {
              type: 'error',
              content: this.$t('account.register.errors.exists')
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
              : this.$t('errors.messages.default')
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
            content: this.$t('account.login.errors.fail')
          }
        })
    }
  }
}
</script>

<style lang="scss">
.template-register {
  padding: $SPACING_XL $GUTTER_WIDTH $SPACING_2XL;

  &__title {
    margin-bottom: $SPACING_M;
    margin-top: 0;
  }

  &__col {
    &#{&}--image {
      display: none;

      .responsive-image {
        display: flex;
      }
    }
  }

  &__redirect {
    margin-top: $SPACING_XS;
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
    &[type=text],
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

  &__checkbox-label {
    &.checkbox__label {
      color: $COLOR_TEXT_SECONDARY;
      font-weight: $WEIGHT_BOOK;
      padding-left: $SPACING_L + $SPACING_2XS;
    }
  }

  @include mq($from: large) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 0;

    &__title {
      margin-bottom: $SPACING_2XL;
      text-align: center;
    }

    &__col {
      &#{&}--form {
        display: flex;
        justify-content: center;
        padding: $LAYOUT_XL 0;
      }

      &#{&}--image {
        display: block;
      }
    }

    &__redirect {
      margin-top: $SPACING_M;
      text-align: center;
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
      &[type=text],
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
