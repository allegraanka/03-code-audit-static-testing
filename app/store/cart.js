/**
 * @file Holds a local cart which will eventually push to Shopify.
 */

export const state = () => ({
  items: [],
  checkout: null
})

export const mutations = {

  /**
   * Adds a new item to the items state.
   * - If exists then quantity is adjusted.
   * 
   * @param {object} state - The module state.
   * @param {object} payload - The line item payload.
   */
  ADD_ITEM(state, payload) {
    const exists = state.items.find((item) => {
      return item.cartItemId === payload.cartItemId ||
        item.variantId === payload.variantId
    })

    if (exists) {
      state.items[state.items.indexOf(exists)].quantity = exists.quantity + 1;
      return;
    }

    state.items.push(payload)
  },

  /**
   * Removes an item from the items array.
   * 
   * @param {object} state - The module state.
   * @param {number} cartItemId - The identifier of the item to remove.
   */
  REMOVE_ITEM(state, cartItemId) {
    state.items = state.items.filter((item) => {
      return item.cartItemId !== cartItemId
    })
  },

  /**
   * Removes all line items from the cart.
   * @param {object} state - The local state.
   */
  REMOVE_ALL_ITEMS(state) {
    state.items = []
  },

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
   * Adds an item to the local cart.
   * - Item must be in Nacelle's checkout method format + `handle`, see below.
   * - https://docs.getnacelle.com/api-reference/client-js-sdk.html#methods-2
   * 
   * @param {object} context - The module context.
   * @param {Function} context.commit - The commit method.
   * @param {Function} context.dispatch - The dispatch method.
   * @param {object} payload - The item payload.
   */
  addItem({ commit, dispatch }, payload) {
    const required = ['handle', 'variant']

    required.forEach((item) => {
      if (!payload[item]) {
        throw Error(`Line items must specify \`${item}\``)
      }
    })

    if (!payload.quantity) {
      payload.quantity = 1
    }

    if (!payload.cartItemId) {
      payload.cartItemId = new Date().getTime()
    }

    commit('ADD_ITEM', {
      ...payload,
      variantId: payload.variant,
      timestamp: Date.now()
    })

    /**
     * Open the cart drawer when item added.
     */
    setTimeout(() => {
      dispatch('drawers/openDrawer',
        { namespace: 'cart-drawer' },
        { root: true }
      )
    }, 100)
  },

  /**
   * Removes an item from the cart.
   * 
   * @param {object} context - The module context.
   * @param {Function} context.commit - The commit method.
   * @param {number} cartItemId - The cart item identifier to remove.
   */
  removeItem({ commit }, cartItemId) {
    if (!cartItemId) {
      throw Error('Please provide a cart item identifier.')
    }

    commit('REMOVE_ITEM', cartItemId)
  },

  /**
   * Creates a new checkout with the current line items.
   * - Commits the checkout object for later use.
   * - Also returns a Promise for instant use outside of getters.
   * 
   * @param {object} context - The Vuex state.
   * @param {Function} context.commit - The commit method.
   * @param {object} context.getters - The getters object.
   * @param {string} checkoutId - Optional checkout ID, updates an existing checkout.
   * @returns {Promise} - The checkout process method.
   */
  processCheckout({ commit, getters }, checkoutId = '') {
    const cartItems = getters.items.map(({ cartItemId, variantId, quantity }) => ({
      cartItemId: String(cartItemId),
      variantId,
      quantity
    }))

    return new Promise((resolve, reject) => {
      this.$nacelle.client.checkout.process({ cartItems, checkoutId })
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
    if (getters.checkoutExists) {
      if (getters.checkout.completed) {
        commit('REMOVE_ALL_ITEMS')
        commit('SET_CHECKOUT')
        return
      }

      dispatch('processCheckout', getters.checkout.id)
        .then(({ completed }) => {
          if (completed) {
            commit('REMOVE_ALL_ITEMS')
            commit('SET_CHECKOUT')
          }
        })
    }
  },

  /**
   * Sends the customer to the remote checkout, if is on browser.
   * - Processes the checkout if it doesn't exist.
   * 
   * @param {object} context - The module context.
   * @param {Function} context.dispatch - The dispatch method.
   * @param {object} context.getters - The getters.
   */
  goToCheckout({ dispatch, getters }) {
    if (!process.browser) {
      return
    }

    if (getters.checkoutExists) {
      window.location.href = getters.checkout.url
      return
    }

    dispatch('processCheckout')
      .then(({ url }) => {
        window.location.href = url
      })
  }
}

export const getters = {

  /**
   * Returns the local cart items.
   * 
   * @param {object} state - The module state.
   * @returns {Array} - The line items.
   */
  items(state) {
    return state.items
  },

  /**
   * Returns the number of items in the cart.
   * 
   * @param {object} state - The module state.
   * @returns {number} - The number of items in the cart.
   */
  itemCount(state) {
    return state.items.reduce(
      (accumulator, current) => accumulator += current.quantity,
      0
    )
  },

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
