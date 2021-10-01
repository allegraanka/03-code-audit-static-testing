<template>
  <div class="template-reset">
    <div class="container container--tight">
      <div class="row">
        <div class="col xs12 m6 push-m3">
          <h1 class="h3">{{ $t('account.reset.title') }}</h1>

          <form class="form" @submit.prevent="handleFormSubmit">
            <div class="form-group">
              <div class="form-group__field">
                <label class="form-group__label" for="Password">
                  {{ $t('forms.labels.password') }}
                </label>

                <input
                  id="Password"
                  v-model="input.password"
                  type="password"
                  :placeholder="$t('forms.labels.password')"
                  required
                />
              </div>
            </div>

            <app-button>{{ $t('account.reset.submit') }}</app-button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import customerResetByUrl from '@/graphql/shopify/mutations/customerResetByUrl.gql'

import AppButton from '~/components/AppButton'

export default {
  components: {
    AppButton
  },

  asyncData({ app, query, error }) {
    if (!query.url) {
      error({
        statusCode: 404,
        message: app.$t('account.reset.errors.noUrlParam')
      })
    }

    return {
      url: query.url
    }
  },

  data() {
    return {
      input: {
        password: ''
      }
    }
  },

  methods: {
    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      setAccessToken: 'customer/setAccessToken'
    }),

    /**
     * Handles the reset form submission.
     */
    handleFormSubmit() {
      this.$graphql.shopify
        .request(customerResetByUrl, {
          resetUrl: this.url,
          password: this.input.password
        })
        .then(({ customerResetByUrl }) => {
          if (!customerResetByUrl.customerAccessToken) {
            this.$router.push('/account/login')
            return
          }

          this.setAccessToken(customerResetByUrl.customerAccessToken)
          this.$router.push('/account')
        })
    }
  }
}
</script>

<style lang="scss">
.template-reset {
  padding: 1.875rem 0;

  @include mq($from: medium) {
    padding: $LAYOUT_XL 0;
  }
}
</style>
