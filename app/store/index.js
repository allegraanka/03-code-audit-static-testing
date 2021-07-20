/**
 * @file The top-level Vuex store enabled by default.
 */

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('navigation/setLists')
  }
}
