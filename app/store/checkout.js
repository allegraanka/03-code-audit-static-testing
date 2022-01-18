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
    const cartItems = this.state.cart.items.reduce((accumulator, current) => {
      accumulator.push({
        cartItemId: String(current.cartItemId),
        variantId: current.variantId,
        quantity: current.quantity,
        metafields: current.metafields || []
      })

      if (current.sibling) {
        accumulator.push({
          cartItemId: String(new Date().getTime()),
          variantId: current.sibling.variants[0].id,
          quantity: current.quantity
        })
      }

      return accumulator
    }, [])

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
   * @param {object} context.state - The state object.
   */
  validateCheckout({ commit, dispatch, getters, state }) {
    const reset = () => {
      dispatch('cart/removeAllItems', {}, { root: true })
      commit('SET_CHECKOUT')
    }

    if (getters.checkoutExists) {
      dispatch('processCheckout', state.checkout.id).then(({ completed }) => {
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
      const parameters = []
      const previewId =
        this.$cookies.get('preview_theme_id') || this.$config.CHECKOUT_THEME_ID
      const checkoutUpgradePreview = this.$cookies.get(
        'preview_checkout_version'
      )

      if (previewId) {
        parameters.push(`preview_theme_id=${previewId}`)
      }

      if (checkoutUpgradePreview) {
        parameters.push(`preview_checkout_version=${checkoutUpgradePreview}`)
      }

      window.location.href = `${url}&${parameters.join('&')}`
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
