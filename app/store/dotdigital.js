/**
 * @file Vuex Module - Dotdigital API Store
 *
 * - Coordinates Dotdigital API Access
 * - Current previous API Status held in state.status
 */

export const state = () => ({
  /** @type {'IDLE'|'PENDING'|'SUCCESS'|'FAILURE'} */
  status: 'IDLE',
  /** @type {string} */
  errorMessage: ''
})

export const mutations = {
  /**
   * Sets Idle Status
   *
   * @param {object} state - The local state
   */
  DOTDIGITAL_IDLE(state) {
    state.status = 'IDLE'
    state.errorMessage = ''
  },

  /**
   * Sets Pending Status
   *
   * @param {object} state - The local state.
   */
  DOTDIGITAL_PENDING(state) {
    state.status = 'PENDING'
    state.errorMessage = ''
  },

  /**
   * Sets Success Status
   *
   * @param {object} state - The local state.
   */
  DOTDIGITAL_SUCCESS(state) {
    state.status = 'SUCCESS'
    state.errorMessage = ''
  },

  /**
   * Sets Failure Status
   *
   * @param {object} state - The local state.
   * @param {string} errorMessage - The access token, required.
   */
  DOTDIGITAL_FAILURE(state, errorMessage) {
    state.status = 'FAILURE'
    state.errorMessage = errorMessage
  }
}

export const actions = {
  /**
   * Sign up customer to newsletter
   *
   * @param {object} context - The context.
   * @param {Function} context.commit - The dispatch method.
   * @param {object} context.state - The state object.
   * @param {string} email - The login input fields.
   * @returns {import('../server-middleware/dotdigital').DotdigitalAddContactToAddressBookResponse} - The login request.
   */
  newsLetterSignup({ commit, state }, email) {
    if (state.dotdigital === 'PENDING')
      return {
        type: 'ApplicationError',
        status: 429,
        body: {
          message: 'Error: API_BUSY'
        }
      }

    if (!email) {
      const message = 'Error: NO_EMAIL_PROVIDED'

      commit('DOTDIGITAL_FAILURE', message)

      return {
        type: 'ApplicationError',
        status: 400,
        body: {
          message
        }
      }
    }

    commit('DOTDIGITAL_PENDING')

    fetch(`/dotdigital/email-newsletter`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    }).then((response) => {
      response.json().then((jsonResponse) => {
        if (response.ok) {
          if (jsonResponse.type !== 'Success') {
            commit('DOTDIGITAL_FAILURE', jsonResponse.body.message)
          } else {
            this.$cookies.set('newsletter_signup', true, {
              expires: new Date(8640000000000000)
            })
            commit('DOTDIGITAL_SUCCESS')
          }
          return jsonResponse
        }
      })
    })
  }
}
