/**
 * @file Defines the logic for saving parts of the Vuex state in the browser.
 */

import createPersistedState from 'vuex-persistedstate'

const toPersist = [
  'cart',
  'checkout'
]

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'pavers-state',
  
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
  })
}
