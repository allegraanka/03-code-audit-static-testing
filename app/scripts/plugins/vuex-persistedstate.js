/**
 * @file Defines the logic for saving parts of the Vuex state in the browser.
 */

import createPersistedState from 'vuex-persistedstate'

const toPersist = ['cart', 'checkout']

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      /**
       * Update this value whenever this file is changed.
       * - This will make sure any users with existing saved states
       *   will be able to receive the updated settings.
       */
      key: 'pavers-state-1',

      reducer(state) {
        const reducer = Object.assign({}, state)

        Object.keys(state).forEach((key) => {
          if (!toPersist.includes(key)) {
            delete reducer[key]
          }
        })

        return reducer
      }
    })(store)

    store.dispatch('rehydrated')
  })
}
