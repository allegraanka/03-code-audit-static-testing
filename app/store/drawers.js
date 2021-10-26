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
    const exists = state.drawers.find(
      (drawer) => drawer.namespace === namespace
    )

    if (exists) {
      return
    }

    state.drawers.push({
      namespace,
      open: false,
      returnFocusToBody: false
    })
  },

  /**
   * Opens a drawer if it exists.
   *
   * @param {object} state - The local state.
   * @param {object} payload - The payload.
   * @param {string} payload.namespace - The drawer namespace.
   * @param {boolean} payload.returnFocusToBody - Determines if focus should return to the body.
   * @param {Array} payload.persist - An array of namespaces of drawers to keep open.
   */
  OPEN_DRAWER(state, { namespace, returnFocusToBody = false, persist = [] }) {
    const exists = state.drawers.find(
      (drawer) => drawer.namespace === namespace
    )

    if (!exists) {
      throw Error(`Drawer ${namespace} doesn\'t exist.`)
    }

    state.drawers.forEach((drawer) => {
      const shouldPersist = persist.includes(drawer.namespace)

      if (drawer !== exists) {
        if (!shouldPersist) {
          drawer.open = false
        }
      }
    })

    exists.open = true
    exists.returnFocusToBody = returnFocusToBody
  },

  /**
   * Closes a drawer if it exists.
   *
   * @param {object} state - The local state.
   * @param {string} namespace - The drawer namespace.
   */
  CLOSE_DRAWER(state, namespace) {
    const exists = state.drawers.find(
      (drawer) => drawer.namespace === namespace
    )

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
   * @param {object} payload - The payload.
   * @param {string} payload.namespace - The drawer namespace.
   * @param {boolean} payload.returnFocusToBody - Determines if focus should return to the body.
   * @param {Array} payload.persist - An array of namespaces of drawers to keep open.
   */
  openDrawer(
    { commit },
    { namespace, returnFocusToBody = false, persist = [] }
  ) {
    if (!namespace) {
      throw Error('A namespace must be specified to open a drawer.')
    }

    commit('OPEN_DRAWER', { namespace, returnFocusToBody, persist })
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
   * @param {object} context.state - The local state.
   * @param {string} namespace - The drawer namespace.
   */
  toggleDrawer({ dispatch, state }, { namespace, returnFocusToBody = false }) {
    const exists = state.drawers.find(
      (drawer) => drawer.namespace === namespace
    )

    if (!exists) {
      throw Error(`Drawer ${namespace} doesn\'t exist.`)
    }

    if (!exists.open) {
      dispatch('openDrawer', { namespace, returnFocusToBody })
      return
    }

    dispatch('closeDrawer', namespace)
  },

  /**
   * Closes all registered drawers.
   *
   * @param {object} context - The state context.
   * @param {Function} context.dispatch - The dispatch method.
   * @param {object} context.state - The local state.
   */
  closeAllDrawers({ dispatch, state }) {
    state.drawers.forEach(({ namespace }) => dispatch('closeDrawer', namespace))
  }
}
