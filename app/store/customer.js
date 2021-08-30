/**
 * @file Store handling for customer logins.
 */

import customerAccessTokenCreate from '@/graphql/shopify/mutations/customerAccessTokenCreate'
import customerAccessTokenDelete from '@/graphql/shopify/mutations/customerAccessTokenDelete'

import { secured } from '@/middleware/customer'

import { isDateInPast } from '~/helpers/utils'

export const state = () => ({
  loggedIn: false
})

export const mutations = {
  /**
   * Sets the logged in state.
   *
   * @param {object} state - The local state.
   * @param {boolean} loggedIn - The desired state.
   */
  SET_LOGGED_IN(state, loggedIn = true) {
    state.loggedIn = loggedIn
  }
}

export const actions = {
  /**
   * Checks if the cookie exists, and is in date.
   * - If matches, then the customer is logged in.
   * - Else, customer is logged out.
   *
   * @param {object} context - The store context.
   * @param {Function} context.commit - The commit method.
   */
  validateCustomer({ commit }) {
    const cookie = this.$cookies.get('customer')
    const expiry = new Date(cookie?.expiresAt)

    if (!cookie || isDateInPast(expiry)) {
      commit('SET_LOGGED_IN', false)
      return
    }

    commit('SET_LOGGED_IN')
  },

  /**
   * Logs in the customer.
   * - Creates access token and sets state.
   *
   * @param {object} context - The context.
   * @param {Function} context.commit - The commit method.
   * @param {object} payload - The login input fields.
   * @returns {Promise} - The login request.
   */
  login({ commit }, payload) {
    const required = ['email', 'password']

    required.forEach((item) => {
      if (!payload[item]) {
        throw Error(`Login requests must specify \`${item}\``)
      }
    })

    return new Promise((resolve, reject) => {
      this.$graphql.shopify
        .request(customerAccessTokenCreate, {
          input: {
            email: payload.email,
            password: payload.password
          }
        })
        .then(({ customerAccessTokenCreate }) => {
          if (
            customerAccessTokenCreate.customerUserErrors &&
            customerAccessTokenCreate.customerUserErrors.length > 0
          ) {
            reject({
              response: {
                errors: [{ message: 'Incorrect email or password.' }]
              }
            })
          }

          /**
           * Set browser cookie.
           */
          const cookie = customerAccessTokenCreate.customerAccessToken

          this.$cookies.set('customer', cookie, {
            path: '/',
            expires: new Date(cookie.expiresAt)
          })

          commit('SET_LOGGED_IN')
          resolve(customerAccessTokenCreate)
        })
        .catch(reject)
    })
  },

  /**
   * Logs the customer out.
   * - If on a secured route, pushes to the homepage.
   * - Removes the cookie and invalidates the access token.
   *
   * @param {object} context - The store context.
   * @param {Function} context.commit - The commit method.
   */
  async logout({ commit }) {
    const cookie = this.$cookies.get('customer')
    const setState = () => commit('SET_LOGGED_IN', false)

    if (secured.includes(this.$router.currentRoute.name)) {
      await this.$router.push({ name: 'index' }, setState)
    } else {
      setState()
    }

    if (cookie) {
      this.$cookies.remove('customer')
    }

    if (cookie && cookie.accessToken) {
      this.$graphql.shopify.request(customerAccessTokenDelete, {
        customerAccessToken: cookie.accessToken
      })
    }
  }
}
