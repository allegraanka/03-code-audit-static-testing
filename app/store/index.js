/**
 * @file The top-level Vuex store enabled by default.
 */

export const state = () => ({
  windowOverlay: {
    open: false
  }
})

export const mutations = {

  /**
   * Sets the Window Overlay active state.
   * 
   * @param {object} state - The local state.
   * @param {boolean} open - The desired state.
   */
  SET_WINDOW_OVERLAY_OPEN_STATE(state, open) {
    state.windowOverlay.open = open
  }
}

export const actions = {

  /**
   * Handles the server start.
   * 
   * @param {object} context - The store context.
   * @param {Function} context.dispatch - The dispatch method.
   */
  async nuxtServerInit({ dispatch }) {
    await dispatch('navigation/setLists')
    await dispatch('checkout/validateCheckout')
    await dispatch('settings/setSettings')
  },

  /**
   * Opens the window overlay.
   * 
   * @param {object} context - The store context.
   * @param {Function} context.commit - The commit method.
   */
  openWindowOverlay({ commit }) {
    commit('SET_WINDOW_OVERLAY_OPEN_STATE', true)
  },

  /**
   * Hides the window overlay.
   * 
   * @param {object} context - The store context.
   * @param {Function} context.commit - The commit method.
   * @param {Function} context.dispatch - The dispatch method.
   */
  closeWindowOverlay({ commit, dispatch }) {
    commit('SET_WINDOW_OVERLAY_OPEN_STATE', false)

    /**
     * Close any overlays.
     */
    dispatch('drawers/closeActiveDrawer')
  }
}

export const getters = {

  /**
   * Returns the active state of the Window Overlay.
   * 
   * @param {object} state - The local state.
   * @returns {boolean} - The overlay state.
   */
  windowOverlayOpen(state) {
    return state.windowOverlay.open
  }
}
