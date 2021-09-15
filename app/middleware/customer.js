/**
 * @file Handles the route changes for customers.
 */

/**
 * Returns the secured routes.
 */
export const secured = ['account', 'account-orders', 'account-addresses']

/**
 * Exports a middleware handler.
 *
 * @param {object} context - The app context.
 * @param {object} context.store - The Vuex store.
 * @param {object} context.route - The visiting route.
 * @param {Function} context.redirect - The router redirect method.
 */
export default function ({ store, route, redirect }) {
  if (secured.includes(route.name)) {
    if (!store.state.customer.loggedIn) {
      redirect('/account/login')
      return
    }

    if (!store.state.customer.accessToken) {
      store.dispatch('customer/logout')
    }
  }
}
