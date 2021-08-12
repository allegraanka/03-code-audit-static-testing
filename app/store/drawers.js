/**
 * @file Handles drawer states globally.
 * 
 * - Each drawer should be registered with `registerDrawer`.
 * - Only one drawer can be active at one time.
 */

export const state = () => ({
  drawers: []
})

export const mutations = {

  /**
   * Commits a drawer to the state.
   * 
   * @param {object} state - The local state.
   * @param {string} namespace - The drawer namespace.
   */
  REGISTER_DRAWER(state, namespace) {
    const exists = state.drawers.find((drawer) => drawer.namespace === namespace)

    if (exists) {
      return
    }

    state.drawers.push({
      namespace,
      open: false
    })
  },

  /**
   * Opens a drawer if it exists.
   * 
   * @param {object} state - The local state.
   * @param {string} namespace - The drawer namespace.
   */
  OPEN_DRAWER(state, namespace) {
    const exists = state.drawers.find((drawer) => drawer.namespace === namespace)

    if (!exists) {
      throw Error(`Drawer ${namespace} doesn\'t exist.`)
    }

    state.drawers.forEach((drawer) => {
      if (drawer !== exists) {
        drawer.open = false
      }
    })

    exists.open = true
  },

  /**
   * Closes a drawer if it exists.
   * 
   * @param {object} state - The local state.
   * @param {string} namespace - The drawer namespace.
   */
  CLOSE_DRAWER(state, namespace) {
    const exists = state.drawers.find((drawer) => drawer.namespace === namespace)

    if (!exists) {
      throw Error(`Drawer ${namespace} doesn\'t exist.`)
    }

    exists.open = false
  }
}

export const actions = {
  
  /**
   * Registers a new drawer.
   * 
   * @param {object} context - The state context.
   * @param {Function} context.commit - The commit method.
   * @param {string} namespace - The drawer namespace.
   */
  registerDrawer({ commit }, namespace) {
    if (!namespace) {
      throw Error('Drawers must specify a namespace.')
    }

    commit('REGISTER_DRAWER', namespace)
  },

  /**
   * Requests a drawer to be opened.
   * 
   * @param {object} context - The state context.
   * @param {Function} context.commit - The commit method.
   * @param {string} namespace - The drawer namespace.
   */
  openDrawer({ commit }, namespace) {
    if (!namespace) {
      throw Error('A namespace must be specified to open a drawer.')
    }

    commit('OPEN_DRAWER', namespace)
  },

  /**
   * Requests a drawer to be closed.
   * 
   * @param {object} context - The state context.
   * @param {Function} context.commit - The commit method.
   * @param {string} namespace - The drawer namespace.
   */
  closeDrawer({ commit }, namespace) {
    if (!namespace) {
      throw Error('A namespace must be specified to close a drawer.')
    }

    commit('CLOSE_DRAWER', namespace)
  },

  /**
   * Toggles the open state of a drawer.
   * 
   * @param {object} context - The state context.
   * @param {Function} context.dispatch - The dispatch method.
   * @param {object} context.getters - The local state getters.
   * @param {string} namespace - The drawer namespace.
   */
  toggleDrawer({ dispatch, getters }, namespace) {
    const exists = getters.allDrawers.find((drawer) => drawer.namespace === namespace)

    if (!exists) {
      throw Error(`Drawer ${namespace} doesn\'t exist.`)
    }

    if (!exists.open) {
      dispatch('openDrawer', namespace)
      return
    }

    dispatch('closeDrawer', namespace)
  }
}

export const getters = {

  /**
   * Returns the active drawer.
   * - Only one drawer can be active at one time.
   * 
   * @param {object} state - The local state.
   * @returns {string} - The active drawer namespace.
   */
  activeDrawer(state) {
    return state.drawers.find(({ open }) => open)?.namespace
  },

  /**
   * Returns all drawers registered.
   * 
   * @param {object} state - The local state.
   * @returns {Array} - The drawers array.
   */
  allDrawers(state) {
    return state.drawers
  }
}
