/**
 * @file Holds navigation based state.
 */

export const state = () => ({
  lists: []
})

export const mutations = {
  /**
   * Adds a new list to the lists array.
   *
   * @param {object} state - The module state.
   * @param {object} list - The list payload.
   */
  ADD_LIST(state, list) {
    const exists = state.lists.find(({ handle }) => handle === list.handle)

    if (exists) {
      return
    }

    state.lists = [...state.lists, list]
  }
}

export const actions = {
  /**
   * Validates and adds a new list to the state.
   *
   * @param {object} context - The module context.
   * @param {Function} context.commit - The commit method.
   * @param {object} list - The list payload.
   */
  addList({ commit }, list) {
    const required = ['handle', 'links']

    required.forEach((item) => {
      if (!list[item]) {
        throw Error(`Lists must specify \`${item}\``)
      }
    })

    commit('ADD_LIST', list)
  },

  /**
   * Fetches and sets the Nacelle link lists.
   * @param {object} context - The module context.
   * @param {Function} context.dispatch - The dispatch method.
   */
  async setLists({ dispatch }) {
    const { linklists } = await this.$nacelle.client.data.space()

    if (linklists) {
      linklists.forEach((list) => {
        dispatch('addList', list)
      })
    }
  }
}
