<template>
  <drawer class="email-popup" namespace="email-popup" as-modal>
    <div class="email-popup__flex">
      <div class="email-popup__content">
        <div class="email-popup__inner">
          <transition name="fade" mode="out-in">
            <div v-if="status !== 'SUCCESS'" key="form">
              <h3
                v-once
                class="email-popup__heading"
                v-text="$t('newsletterSignup.title')"
              />

              <p
                v-once
                class="body-2"
                v-text="settingsNewsletter.signUpMessage"
              />

              <form @submit.prevent="handleFormSubmit">
                <fieldset
                  key="success"
                  class="form-group"
                  :disabled="status === 'PENDING'"
                >
                  <div class="form-group__field">
                    <label
                      class="visually-hidden"
                      for="email"
                      v-text="$t('newsletterSignup.label')"
                    />

                    <input
                      id="email"
                      ref="email"
                      v-model="email"
                      type="email"
                      :placeholder="$t('newsletterSignup.placeholder')"
                      required
                      :aria-invalid="errors.includes('email')"
                      :aria-describedby="
                        errors.includes('email') && 'email-error'
                      "
                      @focus="errors = []"
                      @blur="validateEmail"
                    />

                    <p
                      v-if="errors.includes('email')"
                      id="email-error"
                      class="
                        email-popup__error
                        body-2
                        form__message form__message--error
                      "
                      v-text="$t('newsletterSignup.errors.email')"
                    />
                  </div>

                  <button
                    type="submit"
                    class="email-popup__button button"
                    :disabled="errors.length > 0"
                    v-text="$t('newsletterSignup.signUp')"
                  />
                </fieldset>

                <p
                  v-if="status === 'FAILURE'"
                  class="
                    email-popup__error
                    body-2
                    form__message form__message--error
                  "
                  role="alert"
                  v-text="$t('newsletterSignup.errors.form')"
                />
              </form>
            </div>
            <div v-else>
              <h3
                v-once
                class="email-popup__heading"
                v-text="$t('newsletterSignup.success.title')"
              />
              <p class="body-2" v-text="settingsNewsletter.successMessage" />
              <button
                type="submit"
                class="email-popup__button button"
                @click="closeDrawer(namespace)"
                v-text="$t('newsletterSignup.success.button')"
              />
            </div>
          </transition>
        </div>
      </div>
      <div class="email-popup__image-block">
        <img
          class="email-popup__image"
          :src="settingsNewsletter.image.url"
          :alt="settingsNewsletter.image.altText"
        />
      </div>
    </div>
  </drawer>
</template>

<script>
import Drawer from '~/components/Drawer'
import { mapActions, mapState } from 'vuex'

/**
 * Valid Email Address Regex
 */
const validEmail = new RegExp(
  "([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])"
)

export default {
  components: {
    Drawer
  },

  props: {
    settingsNewsletter: {
      type: Object,
      default: () => ({
        image: {
          url: '',
          altText: ''
        },
        signUpMessage: '',
        successMessage: ''
      })
    }
  },

  data() {
    return {
      namespace: 'email-popup',
      email: '',
      /** @type {string[]} */
      errors: [],
      /** @type {Function | null} */
      unsubscribe: null
    }
  },

  computed: {
    /**
     * Maps the Vuex state.
     */
    ...mapState({
      status: ({ dotdigital }) => dotdigital.status
    })
  },

  mounted() {
    /**
     * Immediately open modal on mount
     */
    this.openDrawer({ namespace: this.namespace })

    /**
     * Subscribe to store actions
     *
     * - Matches on close of email modal action
     * - Get and set's 'newsletter_signup' cookie
     * - Sets unsubscribe function for umount
     */
    this.unsubscribe = this.$store.subscribeAction({
      before: (action) => {
        if (
          action.type === 'drawers/closeDrawer' &&
          action.payload === 'email-popup'
        ) {
          const newsletterSignup = this.$cookies.get('newsletter_signup')
          if (newsletterSignup === undefined) {
            this.$cookies.set('newsletter_signup', false, {
              expires: new Date(8640000000000000)
            })
          }
        }
      }
    })

    /**
     * Focus email input on mount
     */
    this.$nextTick(() => {
      if (this.$refs.email) {
        this.$refs.email.focus()
      }
    })
  },

  beforeDestroy() {
    this.unsubscribe()
  },

  methods: {
    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      openDrawer: 'drawers/openDrawer',
      closeDrawer: 'drawers/closeDrawer',
      newsLetterSignup: 'dotdigital/newsLetterSignup'
    }),

    /**
     * Handle form submission
     * @returns {void}
     */
    handleFormSubmit() {
      this.newsLetterSignup(this.email)
    },

    /**
     * Validate email
     * - Uses supplied regex parameter
     * - Pushes to error array if failed
     * @returns {void}
     */
    validateEmail() {
      if (this.email) {
        if (validEmail.test(this.email)) {
          const index = this.errors.indexOf('email')
          if (index > -1) {
            this.errors.splice(index, 1)
          }
        } else {
          this.errors.push('email')
        }
      }
    }
  }
}
</script>

<style lang="scss">
.email-popup {
  &__flex {
    display: flex;
    flex-wrap: wrap;
  }

  &__image-block {
    display: none;
    overflow: hidden;
  }

  &__image {
    height: 100%;
    max-width: initial;
    object-fit: cover;
    object-position: center;
    width: 100%;
  }

  &__inner {
    padding: $SPACING_L;
  }

  &__heading {
    color: $COLOR_PRIMARY;
    margin-top: 0;
  }

  &__error {
    margin-top: $SPACING_M;
  }

  &__button {
    width: 100%;
  }

  /**
   * Draw overrides
   */
  &.drawer {
    .drawer__body {
      overflow: hidden;
      padding: 0;
      text-align: left;
    }
  }

  /**
   * Media queries.
   */
  @include mq($from: large) {
    &__flex {
      align-items: stretch;
      flex-direction: row-reverse;
      height: 546px;
    }

    &__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 50%;
    }

    &__inner {
      padding: $SPACING_3XL;
    }

    &__image-block {
      display: block;
      width: 50%;
    }
  }
}
</style>
