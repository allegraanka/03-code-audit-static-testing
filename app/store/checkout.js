/**
 * @file Holds information about a checkout instance.
 */

export const state = () => ({
  checkout: null
})

export const mutations = {
  /**
   * Sets the checkout object.
   *
   * @param {object} state - The module state.
   * @param {object} checkout - The checkout object.
   */
  SET_CHECKOUT(state, checkout = null) {
    state.checkout = checkout
  }
}

export const actions = {
  /**
   * Creates a new checkout with the current line items.
   * - Commits the checkout object for later use.
   * - Also returns a Promise for instant use outside of getters.
   *
   * @param {object} context - The Vuex state.
   * @param {Function} context.commit - The commit method.
   * @param {string} checkoutId - Optional checkout ID, updates an existing checkout.
   * @returns {Promise} - The checkout process method.
   */
  processCheckout({ commit }, checkoutId = '') {
    const cartItems = this.getters['cart/items'].map((item) => ({
      cartItemId: String(item.cartItemId),
      variantId: item.variantId,
      quantity: item.quantity
    }))

    return new Promise((resolve, reject) => {
      this.$nacelle.client.checkout
        .process({ cartItems, checkoutId })
        .then((response) => {
          commit('SET_CHECKOUT', response)
          resolve(response)
        })
        .catch(reject)
    })
  },

  /**
   * If a checkout exists + completed, reset the cart.
   *
   * @param {object} context - The module context.
   * @param {Function} context.commit - The commit method.
   * @param {Function} context.dispatch - The dispatch method.
   * @param {object} context.getters - The state getters.
   */
  validateCheckout({ commit, dispatch, getters }) {
    const reset = () => {
      dispatch('cart/removeAllItems', {}, { root: true })
      commit('SET_CHECKOUT')
    }

    if (getters.checkoutExists) {
      dispatch('processCheckout', getters.checkout.id).then(({ completed }) => {
        if (completed) {
          reset()
        }
      })
    }
  },

  /**
   * Sends the customer to the remote checkout, if is on browser.
   * - Will always process checkout to have the latest line items.
   *
   * @param {object} context - The module context.
   * @param {Function} context.dispatch - The dispatch method.
   */
  goToCheckout({ dispatch }) {
    if (!process.browser) {
      return
    }

    dispatch('processCheckout').then(({ url }) => {
      window.location.href = url
    })
  }
}

export const getters = {
  /**
   * Returns if the checkout exists.
   *
   * @param {object} state - The module state.
   * @returns {boolean} - The existence of the checkout.
   */
  checkoutExists(state) {
    return state.checkout && state.checkout.id && state.checkout.url
  },

  /**
   * Returns the current checkout state.
   *
   * @param {object} state - The module state.
   * @returns {object|null} - The checkout instance.
   */
  checkout(state) {
    return state.checkout
  }
}
