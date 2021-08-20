/**
 * @file Defines the app settings for use globally.
 *
 * - Uses the Sanity singleton `settings`.
 * - Make sure the default state is aligned with the model used in the code.
 */

export const state = () => ({
  metadata: {
    description: null,
    title: 'Pavers'
  },

  announcement: {
    items: []
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
    Object.keys(settings).forEach((setting) => {
      state[setting] = settings[setting]
    })
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
