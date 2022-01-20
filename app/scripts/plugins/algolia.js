/**
 * @file Configures and injects the Algolia InstantSearch library.
 */

import Vue from 'vue'
import InstantSearch from 'vue-instantsearch'
import get from 'lodash.get'
import set from 'lodash.set'

import { snakeCase } from '~/helpers/utils'

Vue.use(InstantSearch)

export const prefix = 'shopify_pavers_products'
const isList = ['refinementList']
const join = '|'

/**
 * Defines the Algolia-recognizable names for filter types.
 * - Used to map filters to an Algolia object.
 */
const names = {
  refinementList: ['swatches', 'grid'],
  range: ['range']
}

/**
 * Creates a custom router based on vue-router.
 *
 * @param {object} router - The app-level router (usually this.$router).
 * @param {Array} attributes - A group of visual attributes used to build out filters.
 * @returns {object} - A custom router, passed to Algolia.
 */
export const router = (router, attributes) => ({
  /**
   * Returns the Algolia-readable name based on an attribute type.
   *
   * @param {string} type - The attribute type.
   * @returns {string} - The Algolia-readable name for routing.
   */
  getNameByType(type) {
    let found = null

    Object.keys(names).forEach((name) => {
      if (names[name].includes(type)) {
        found = name
      }
    })

    return found || 'refinementList'
  },

  /**
   * Creates an object of facets and their path in the Algolia routing object.
   * - Uses attributes passed from Sanity, maps them out.
   *
   * @returns {object} - The facets and their object path.
   */
  facets() {
    return attributes.reduce((accumulator, current) => {
      const key = snakeCase(current.title)
      const name = this.getNameByType(current.type)

      accumulator[key] = `${name}['${current.name}']`

      return accumulator
    }, {})
  },

  /**
   * Takes a facet value from the URL and turns it into an Algolia-readable value.
   *
   * @param {string} value - The raw value from the URL.
   * @param {boolean} list - If the value is a list.
   * @returns {string} - The parsed value.
   */
  parseValue(value, list = false) {
    return list ? value.split(join) : value
  },

  /**
   * Transforms a facet value into a URL-friendly value.
   *
   * @param {*} value - The facet value.
   * @returns {string} - The URL-friendly value.
   */
  transformValue(value) {
    return Array.isArray(value) ? value.join(join) : value
  },

  /**
   * Converts the URL parameters into an Algolia-readable object.
   * - The output will be used to apply the correct filters on load.
   *
   * @returns {string} - The query string from the route.
   */
  read() {
    const parsed = {}
    const query = router.currentRoute.query
    const facets = this.facets()

    Object.keys(query).forEach((key) => {
      if (key === 'sort_by') {
        set(parsed, 'sortBy', `${prefix}_${query[key]}`)
      }

      if (!facets[key]) {
        return
      }

      set(
        parsed,
        facets[key],
        this.parseValue(
          query[key],
          isList.some((item) => facets[key].includes(item))
        )
      )
    })

    return {
      [prefix]: parsed
    }
  },

  /**
   * Pushes the query to the router.
   * - Maps the Algolia object to custom URL parameters.
   * - If there is no change from the current query, do nothing.
   *
   * @param {string} query - The query string to write.
   */
  write(query) {
    const toPush = {}
    const facets = this.facets()
    const index = query[prefix]

    if (index.sortBy) {
      /**
       * Strips out the index name.
       * - Sort options are replica indices, with the primary name at the start.
       * - I.e. primary_index_name_price_asc turns into price_asc.
       */
      toPush.sort_by = index.sortBy.replace(`${prefix}_`, '')
    }

    Object.keys(facets).forEach((key) => {
      const value = get(index, facets[key])

      if (value) {
        toPush[key] = this.transformValue(value)
      }
    })

    if (this.createURL(toPush) === this.createURL(this.read())) {
      return
    }

    router.push({
      query: toPush
    })
  },

  /**
   * Creates a full URL based on a query string.
   *
   * @param {string} query - The query string.
   * @returns {string} - The transformed URL.
   */
  createURL(query) {
    const parameters = {}

    Object.keys(query).forEach((key) => {
      parameters[key] = this.transformValue(query[key])
    })

    const { href } = router.resolve({
      query: parameters
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
