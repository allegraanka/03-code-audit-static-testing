/**
 * @file Handles the route changes for customers.
 */

/**
 * Exports a middleware handler.
 *
 * @param {object} context - The app context.
 * @param {object} context.store - The Vuex store.
 * @param {object} context.route - The visiting route.
 * @param {Function} context.redirect - The router redirect method.
 */
export default function ({ store, route, redirect }) {
  const secured = ['account', 'account-orders', 'account-addresses']

  if (secured.includes(route.name) && !store.state.customer.loggedIn) {
    redirect('/login')
  }
}
