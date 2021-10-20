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
      const matches = item.variantId === payload.variantId

      if (matches) {
        /**
         * If both have siblings, compare them.
         * - For context, `sibling` is an object with `handle` and `variant`.
         */
        if (payload.sibling) {
          if (!item.sibling) {
            return false
          }

          return payload.sibling.handle === item.sibling.handle
        }

        /**
         * If both have metafields, compare them.
         * - For context, `metafields` is an array of objects.
         */
        if (payload.metafields) {
          if (!item.metafields) {
            return false
          }

          return item.metafields.join('') === payload.metafields.join('')
        }

        return true
      }

      return false
    })

    if (exists) {
      state.items[state.items.indexOf(exists)].quantity = exists.quantity + 1
      return
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
   * Adds a product object to a line item.
   * - Updates the timestamp.
   *
   * @param {object} state - The local state.
   * @param {object} payload - The payload.
   * @param {number} payload.cartItemId - The cart item ID.
   * @param {object} payload.product - The product object.
   */
  ADD_PRODUCT_TO_ITEM(state, { cartItemId, product }) {
    const exists = state.items.find((item) => item.cartItemId === cartItemId)
    const indexOf = state.items.indexOf(exists)

    if (exists) {
      state.items[indexOf].product = product
      state.items[indexOf].timestamp = Date.now()
    }
  },

  /**
   * Updates the quantity of a line item.
   *
   * @param {object} state - The local state.
   * @param {object} payload - The payload.
   * @param {number} payload.cartItemId - The cart item ID.
   * @param {object} payload.quantity - The item quantity to set.
   */
  SET_ITEM_QUANTITY(state, { cartItemId, quantity }) {
    const exists = state.items.find((item) => item.cartItemId === cartItemId)
    const indexOf = state.items.indexOf(exists)

    if (exists) {
      state.items[indexOf].quantity = quantity
    }
  },

  /**
   * Adds a sibling object to a line item.
   *
   * @param {object} state - The local state.
   * @param {object} payload - The payload.
   * @param {number} payload.cartItemId - The cart item ID.
   * @param {object} payload.sibling - The sibling object.
   */
  ADD_SIBLING_TO_ITEM(state, { cartItemId, sibling }) {
    const exists = state.items.find((item) => item.cartItemId === cartItemId)
    const indexOf = state.items.indexOf(exists)

    if (exists) {
      state.items[indexOf].sibling = sibling
    }
  },

  /**
   * Removes the sibling from an item.
   *
   * @param {object} state - The local state.
   * @param {number} cartItemId - The cart item ID.
   */
  REMOVE_SIBLING_FROM_ITEM(state, cartItemId) {
    state.items = state.items.map((item) => {
      const lineItem = Object.assign({}, item)

      if (lineItem.sibling && lineItem.cartItemId === cartItemId) {
        delete lineItem.sibling
      }

      return lineItem
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
      dispatch(
        'drawers/openDrawer',
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
   * Removes all items from the cart.
   *
   * @param {object} context - The module context.
   * @param {Function} context.commit - The commit method.
   */
  removeAllItems({ commit }) {
    commit('REMOVE_ALL_ITEMS')
  },

  /**
   * Adds a product object to a line item.
   *
   * @param {object} context - The context.
   * @param {Function} context.commit - The commit method.
   * @param {object} payload - The payload, id and product.
   */
  addProductToItem({ commit }, payload) {
    commit('ADD_PRODUCT_TO_ITEM', payload)
  },

  /**
   * Updates the quantity of a line item.
   *
   * @param {object} context - The context.
   * @param {Function} context.commit - The commit method.
   * @param {object} payload - The payload, id and quantity.
   * @param {number} payload.cartItemId - The unique cart item identifier.
   * @param {number} payload.quantity - The line item quantity to set.
   */
  setItemQuantity({ commit }, { cartItemId, quantity }) {
    if (quantity <= 0) {
      commit('REMOVE_ITEM', cartItemId)
      return
    }

    commit('SET_ITEM_QUANTITY', { cartItemId, quantity })
  },

  /**
   * Adds a sibling object to a line item.
   *
   * @param {object} context - The context.
   * @param {Function} context.commit - The commit method.
   * @param {object} payload - The payload, id and sibling.
   */
  addSiblingToItem({ commit }, payload) {
    commit('ADD_SIBLING_TO_ITEM', payload)
  },

  /**
   * Removes the sibling object from a line item.
   *
   * @param {object} context - The context.
   * @param {Function} context.commit - The commit method.
   * @param {object} payload - The payload, cart item ID.
   */
  removeSiblingFromItem({ commit }, payload) {
    commit('REMOVE_SIBLING_FROM_ITEM', payload)
  }
}

export const getters = {
  /**
   * Returns the number of items in the cart.
   *
   * @param {object} state - The module state.
   * @returns {number} - The number of items in the cart.
   */
  itemCount(state) {
    return state.items.reduce(
      (accumulator, current) => (accumulator += current.quantity),
      0
    )
  },

  /**
   * Calculates the subtotal of all the line items.
   * @param {object} state - The module state.
   * @returns {number} - The raw subtotal.
   */
  subtotal(state) {
    return state.items.reduce((accumulator, current) => {
      let supplementary = 0
      const variant = current.product.variants.find(
        (item) => item.id === current.variantId
      )

      if (current.sibling) {
        supplementary += Number(current.sibling.variants[0].price)
      }

      if (variant) {
        return (accumulator +=
          (Number(variant.price) + supplementary) * current.quantity)
      }
    }, 0)
  }
}
