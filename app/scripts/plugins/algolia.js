/**
 * @file Configures and injects the Algolia InstantSearch library.
 */

import Vue from 'vue'
import InstantSearch from 'vue-instantsearch'

Vue.use(InstantSearch)

/**
 * Creates a custom router based on vue-router.
 *
 * @param {object} router - The app-level router (usually this.$router).
 * @returns {object} - A custom router, passed to Algolia.
 */
export const router = (router) => ({
  /**
   * A helper for accessing the query string.
   * @returns {string} - The query string from the route.
   */
  read() {
    return router.currentRoute.query
  },

  /**
   * Pushes the query to the router.
   * - If there is no change from the current query, do nothing.
   *
   * @param {string} query - The query string to write.
   */
  write(query) {
    if (this.createURL(query) === this.createURL(this.read())) {
      return
    }

    router.push({
      query
    })
  },

  /**
   * Creates a full URL based on a query string.
   *
   * @param {string} query - The query string.
   * @returns {string} - The transformed URL.
   */
  createURL(query) {
    const { href } = router.resolve({
      query
    })

    return href
  },

  /**
   * Handles an update to the route.
   * - If on client-side, listen for `popstate` events.
   * - Runs the callback on `popstate` events, passing the state.
   *
   * @param {Function} callback - The callback function.
   */
  onUpdate(callback) {
    if (typeof window === 'undefined') {
      return
    }

    this.removeAfterEach = router.afterEach(() => callback(this.read()))

    this.onPopState = ({ state }) => {
      if (!state) {
        callback(this.read())
        return
      }

      callback(state)
    }

    window.addEventListener('popstate', this.onPopState)
  },

  /**
   * Handles the router disposal/destroy event.
   * - If on client-side, remove event listeners.
   */
  dispose() {
    if (typeof window === 'undefined') {
      return
    }

    if (this.onPopState) {
      window.removeEventListener('popstate', this.onPopState)
    }

    if (this.removeAfterEach) {
      this.removeAfterEach()
    }
  }
})
