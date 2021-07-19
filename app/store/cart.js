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

    commit('ADD_ITEM', payload)
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
