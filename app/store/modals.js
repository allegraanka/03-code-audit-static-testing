/**
 * @file Handles modal states globally.
 *
 * - Each modal should be registered with `registerModal`.
 * - Only one modal can be active at one time.
 */

export const state = () => ({
  modals: []
})

export const mutations = {
  /**
   * Commits a modal to the state.
   *
   * @param {object} state - The local state.
   * @param {string} namespace - The modal namespace.
   */
  REGISTER_MODAL(state, namespace) {
    const exists = state.modals.find((modal) => modal.namespace === namespace)

    if (exists) {
      return
    }

    state.modals.push({
      namespace,
      open: false,
      returnFocusToBody: false
    })
  },

  /**
   * Opens a modal if it exists.
   *
   * @param {object} state - The local state.
   * @param {string} namespace - The modal namespace.
   */
  OPEN_MODAL(state, { namespace, returnFocusToBody = false }) {
    const exists = state.modals.find((modal) => modal.namespace === namespace)

    if (!exists) {
      throw Error(`Modal ${namespace} doesn\'t exist.`)
    }

    state.modals.forEach((modal) => {
      if (modal !== exists) {
        modal.open = false
      }
    })

    exists.open = true
    exists.returnFocusToBody = returnFocusToBody
  },

  /**
   * Closes a modal if it exists.
   *
   * @param {object} state - The local state.
   * @param {string} namespace - The modal namespace.
   */
  CLOSE_MODAL(state, namespace) {
    const exists = state.modals.find((modal) => modal.namespace === namespace)

    if (!exists) {
      throw Error(`Modal ${namespace} doesn\'t exist.`)
    }

    exists.open = false
  }
}

export const actions = {
  /**
   * Registers a new modal.
   *
   * @param {object} context - The state context.
   * @param {Function} context.commit - The commit method.
   * @param {string} namespace - The modal namespace.
   */
  registerModal({ commit }, namespace) {
    if (!namespace) {
      throw Error('Modals must specify a namespace.')
    }

    commit('REGISTER_MODAL', namespace)
  },

  /**
   * Requests a modal to be opened.
   *
   * @param {object} context - The state context.
   * @param {Function} context.commit - The commit method.
   * @param {string} namespace - The modal namespace.
   */
  openModal({ commit }, { namespace, returnFocusToBody = false }) {
    if (!namespace) {
      throw Error('A namespace must be specified to open a modal.')
    }

    commit('OPEN_MODAL', { namespace, returnFocusToBody })
    commit('SET_WINDOW_OVERLAY_OPEN_STATE', true, { root: true })
  },

  /**
   * Requests a modal to be closed.
   *
   * @param {object} context - The state context.
   * @param {Function} context.commit - The commit method.
   * @param {string} namespace - The modal namespace.
   */
  closeModal({ commit }, namespace) {
    if (!namespace) {
      throw Error('A namespace must be specified to close a modal.')
    }

    commit('CLOSE_MODAL', namespace)
    commit('SET_WINDOW_OVERLAY_OPEN_STATE', false, { root: true })
  },

  /**
   * Toggles the open state of a modal.
   *
   * @param {object} context - The state context.
   * @param {Function} context.dispatch - The dispatch method.
   * @param {object} context.state - The local state.
   * @param {string} namespace - The modal namespace.
   */
  toggleModal({ dispatch, state }, { namespace, returnFocusToBody = false }) {
    const exists = state.modals.find((modal) => modal.namespace === namespace)

    if (!exists) {
      throw Error(`Modal ${namespace} doesn\'t exist.`)
    }

    if (!exists.open) {
      dispatch('openModal', { namespace, returnFocusToBody })
      return
    }

    dispatch('closeModal', namespace)
  },

  /**
   * Closes the active modal.
   *
   * @param {object} context - The state context.
   * @param {Function} context.dispatch - The dispatch method.
   * @param {object} context.getters - The local state getters.
   */
  closeActiveModal({ dispatch, getters }) {
    if (getters.activeModal) {
      dispatch('closeModal', getters.activeModal)
    }
  }
}

export const getters = {
  /**
   * Returns the active modal.
   * - Only one modal can be active at one time.
   *
   * @param {object} state - The local state.
   * @returns {string} - The active modal namespace.
   */
  activeModal(state) {
    return state.modals.find(({ open }) => open)?.namespace
  }
}
