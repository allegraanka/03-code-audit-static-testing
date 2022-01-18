<template>
  <section :id="id" class="sign-up-form">
    <div class="container">
      <div class="row">
        <div class="col xs12 l6 offset-l3">
          <h3 v-if="title" class="sign-up-form__title">
            {{ title }}
          </h3>

          <p v-if="text" class="sign-up-form__text body-2">
            {{ text }}
          </p>

          <div v-if="successMessage">
            <p class="body-1">
              {{ successMessage }}
            </p>
          </div>

          <form v-else @submit.prevent="submitForm">
            <p v-if="errorMessage" class="sign-up-form__error body-1">
              {{ errorMessage }}
            </p>

            <div class="sign-up-form__grid">
              <input
                v-model="form.firstname"
                class="sign-up-form__input"
                type="text"
                name="firstname"
                :placeholder="$t('sections.signUpForm.placeholders.firstName')"
              />

              <input
                v-model="form.surname"
                class="sign-up-form__input"
                type="text"
                name="surname"
                :placeholder="$t('sections.signUpForm.placeholders.lastName')"
              />

              <input
                v-model="form.address1"
                class="sign-up-form__input sign-up-form__input--large"
                type="text"
                name="address1"
                :placeholder="$t('sections.signUpForm.placeholders.address1')"
              />

              <input
                v-model="form.address2"
                class="sign-up-form__input sign-up-form__input--large"
                type="text"
                name="address2"
                :placeholder="$t('sections.signUpForm.placeholders.address2')"
              />

              <input
                v-model="form.city"
                class="sign-up-form__input sign-up-form__input--large"
                type="text"
                name="city"
                :placeholder="$t('sections.signUpForm.placeholders.city')"
              />

              <input
                v-model="form.country"
                class="sign-up-form__input"
                type="text"
                name="city"
                :placeholder="$t('sections.signUpForm.placeholders.country')"
              />

              <input
                v-model="form.postcode"
                class="sign-up-form__input"
                type="text"
                name="postcode"
                :placeholder="$t('sections.signUpForm.placeholders.postcode')"
              />
            </div>

            <div class="checkbox__container">
              <input
                id="thirdParty"
                v-model="form.thirdpartyoptin"
                type="checkbox"
                name="thirdpartyoptin"
                class="checkbox__input"
              />

              <label
                class="checkbox__label sign-up-form__checkbox-label"
                for="thirdParty"
              >
                {{ offersCheckboxLabel }}
              </label>
            </div>

            <div class="checkbox__container">
              <input
                id="subscribe"
                v-model="form.subscribe"
                type="checkbox"
                name="subscribe"
                class="checkbox__input"
              />

              <label
                class="checkbox__label sign-up-form__checkbox-label"
                for="subscribe"
              >
                {{ subscribeCheckboxLabel }}
              </label>
            </div>

            <app-button
              class="sign-up-form__submit"
              :label="$t('sections.signUpForm.submit')"
              type="submit"
              :disabled="loading"
            />
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppButton from '~/components/AppButton'

export default {
  components: {
    AppButton
  },

  props: {
    title: {
      type: String,
      default: ''
    },

    text: {
      type: String,
      default: ''
    },

    offersCheckboxLabel: {
      type: String,
      default: ''
    },

    subscribeCheckboxLabel: {
      type: String,
      default: ''
    },

    id: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      loading: false,
      errorMessage: '',
      successMessage: '',

      form: {
        firstname: '',
        surname: '',
        address1: '',
        address2: '',
        city: '',
        postcode: '',
        country: '',
        source: 'pvstest',
        thirdpartyoptin: false,
        subscribe: false
      }
    }
  },

  methods: {
    /**
     * Handles the sign up form submission.
     */
    submitForm() {
      this.loading = true

      this.$axios
        .$post(
          `https://d2eb188kx61o0e.cloudfront.net/subscribe.ashx`,
          this.form
        )
        .then(({ result, message }) => {
          this.loading = false

          if (!result) {
            this.errorMessage = message
            return
          }

          this.successMessage = message
        })
        .catch((error) => {
          console.error(error)

          this.loading = false
          this.errorMessage = this.$t('errors.messages.default')
        })
    }
  }
}
</script>

<style lang="scss">
.sign-up-form {
  &__grid {
    display: grid;
    grid-gap: $SPACING_M;
    margin-bottom: $SPACING_M;
  }

  &__error {
    color: $COLOR_SUPPORT_ERROR;
  }

  &__title {
    margin-top: 0;
  }

  &__checkbox-label {
    color: $COLOR_TEXT_SECONDARY;
    font-size: ms(-2);
    padding-bottom: $SPACING_2XS;
    padding-left: $SPACING_XL;

    &::before {
      height: 16px;
      width: 16px;
    }
  }

  &__submit {
    margin-top: $SPACING_S;
    width: 100%;
  }

  @include mq($from: large) {
    &__grid {
      grid-gap: $SPACING_S $SPACING_M;
      grid-template-columns: repeat(2, 1fr);
    }

    &__title {
      font-size: ms(5);
      text-align: center;
    }

    &__text {
      margin-bottom: $SPACING_XL;
      text-align: center;
    }

    &__input {
      &#{&}--large {
        grid-column: 1 / 3;
      }
    }

    &__submit {
      margin: $SPACING_XL auto 0;
      width: auto;
    }
  }
}
</style>
