/**
 * @file Handles the route changes for all pages.
 */

/**
 * Exports a middleware handler.
 *
 * @param {object} context - The app context.
 * @param {object} context.store - The Vuex store.
 */
export default function ({ store }) {
  store.dispatch('drawers/closeAllDrawers')
}
