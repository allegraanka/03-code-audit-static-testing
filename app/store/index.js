/**
 * @file The top-level Vuex store enabled by default.
 */

import { pascalCase } from '~/helpers/utils'

export const state = () => ({
  settings: {},
  windowOverlay: {
    open: false
  }
})

export const mutations = {
  /**
   * Updates the specified settings object.
   *
   * @param {object} state - The local state.
   * @param {object} settings - The payload.
   */
  SET_SETTINGS(state, settings) {
    state.settings = settings
  },

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
    await dispatch('setSettings')
    await dispatch('customer/validateCustomer')
  },

  /**
   * Events to run when the state has rehydrated.
   * - This will be emitted on the client side only.
   *
   * @param {object} context - The store context.
   * @param {Function} context.dispatch - The dispatch method.
   */
  async rehydrated({ dispatch }) {
    await dispatch('checkout/validateCheckout')
  },

  /**
   * Fetches and sets the app settings.
   *
   * @param {object} context - The state context.
   * @param {Function} context.commit - The commit method.
   */
  async setSettings({ commit }) {
    const settings = {}
    const modules = ['header', 'footer', 'social', 'seo', 'product']

    for (let index = 0; index < modules.length; index++) {
      await this.$nacelle
        .contentByHandle(
          `settings-${modules[index]}`,
          `settings${pascalCase(modules[index])}`
        )
        .then(({ fields }) => {
          settings[modules[index]] = fields
        })
    }

    commit('SET_SETTINGS', settings)
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
