/**
 * @file Holds a local cart which will eventually push to Shopify.
 */

export const state = () => ({
  items: []
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
    }, 250)
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
  }
}
