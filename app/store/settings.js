/**
 * @file Defines the app settings for use globally.
 */

export const state = () => ({
  settings: {
    metadata: {
      description: null,
      title: 'Pavers'
    }
  }
})

export const mutations = {

  /**
   * Sets the settings state.
   * 
   * @param {object} state - The module state.
   * @param {object} settings - The settings to add.
   */
  SET_SETTINGS(state, settings) {
    state.settings = settings
  }
}

export const actions = {

  /**
   * Fetches and sets the settings.
   * 
   * @param {object} context - The module context.
   * @param {Function} context.commit - The commit method.
   */
  async setSettings({ commit }) {
    const { fields } = await this.$nacelle.contentByHandle('settings')

    if (fields) {
      commit('SET_SETTINGS', fields)
    }
  }
}

export const getters = {

  /**
   * Returns the metadata for the app.
   * 
   * @param {object} state - The module state.
   * @param {object} state.settings - The settings object.
   * @returns {object} - The metadata object.
   */
  metadata({ settings }) {
    return settings.metadata
  }
}
