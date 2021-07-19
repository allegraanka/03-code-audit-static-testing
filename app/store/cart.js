/**
 * Store: Cart
 * ------------------------------------------------------------------------------
 * Holds a local cart which will eventually push to Shopify.
 *
 * - Does not reflect the checkout instance.
 * - Should hold minimal information about a line item.
 *
 */
export const state = () => ({
  items: []
})

export const mutations = {

  /**
   * Adds a new item to the items state.
   * - If exists then quantity is adjusted.
   * @param {Object} state - The module state.
   * @param {Object} payload - The line item payload.
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
   * @param {Object} state - The module state.
   * @param {Number} cartItemId - The identifier of the item to remove.
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
   * - Item must be in Nacelle's checkout method format, see below.
   * - https://docs.getnacelle.com/api-reference/client-js-sdk.html#methods-2
   * @param {Object} param0 - The module context.
   * @param {Object} payload - The item payload.
   */
  addItem({ commit }, payload) {
    const required = ['cartItemId', 'variantId', 'handle']

    required.forEach((item) => {
      if (!payload[item]) {
        throw Error(`Line items must specify \`${item}\``)
      }
    })

    if (!payload.quantity) {
      payload.quantity = 1
    }

    commit('ADD_ITEM', payload)
  },

  /**
   * Removes an item from the cart.
   * @param {Object} param0 - The module context.
   * @param {Number} cartItemId - The cart item identifier to remove.
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
   * @param {Object} state - The module state.
   * @returns {Array}
   */
  items(state) {
    return state.items
  },

  /**
   * Returns the number of items in the cart.
   * @param {Object} state - The module state.
   * @returns {Number}
   */
  itemCount(state) {
    return state.items.reduce(
      (accumulator, current) => accumulator += current.quantity,
      0
    )
  }
}
