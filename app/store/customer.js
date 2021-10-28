/**
 * @file Store handling for customer logins.
 */

import customerAccessTokenCreate from '@/graphql/shopify/mutations/customerAccessTokenCreate.gql'
import customerAccessTokenDelete from '@/graphql/shopify/mutations/customerAccessTokenDelete.gql'

import { secured } from '@/middleware/customer'

import { isDateInPast } from '~/helpers/utils'

export const state = () => ({
  loggedIn: false,
  accessToken: null
})

export const mutations = {
  /**
   * Sets the logged in state.
   *
   * @param {object} state - The local state.
   * @param {string} accessToken - The access token, required.
   */
  SET_LOGGED_IN(state, accessToken) {
    state.loggedIn = true
    state.accessToken = accessToken
  },

  /**
   * Logs the customer out of the state.
   * @param {object} state - The local state.
   */
  SET_LOGGED_OUT(state) {
    state.loggedIn = false
    state.accessToken = null
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
      commit('SET_LOGGED_OUT')
      return
    }

    if (cookie.accessToken) {
      commit('SET_LOGGED_IN', cookie.accessToken)
    }
  },

  /**
   * Logs in the customer.
   * - Creates access token and sets state.
   *
   * @param {object} context - The context.
   * @param {Function} context.dispatch - The dispatch method.
   * @param {object} payload - The login input fields.
   * @returns {Promise} - The login request.
   */
  login({ dispatch }, payload) {
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

          dispatch(
            'setAccessToken',
            customerAccessTokenCreate.customerAccessToken
          )

          resolve(customerAccessTokenCreate)
        })
        .catch(reject)
    })
  },

  /**
   * Sets the customer access token.
   * @param {object} context - The store context.
   * @param {Function} context.commit - The commit method.
   * @param {object} accessToken - The access token object.
   */
  setAccessToken({ commit }, accessToken) {
    this.$cookies.set('customer', accessToken, {
      path: '/',
      expires: new Date(accessToken.expiresAt)
    })

    if (!accessToken.accessToken) {
      throw Error('An access token must be provided to log in.')
    }

    commit('SET_LOGGED_IN', accessToken.accessToken)
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
    const setState = () => commit('SET_LOGGED_OUT')

    if (secured.includes(this.$router.currentRoute.name)) {
      await this.$router.push({ name: 'index' }, setState)
    } else {
      setState()
    }

    if (cookie) {
      this.$cookies.remove('customer')
    }

    if (cookie && cookie.accessToken) {
      await this.$graphql.shopify.request(customerAccessTokenDelete, {
        customerAccessToken: cookie.accessToken
      })
    }
  }
}
