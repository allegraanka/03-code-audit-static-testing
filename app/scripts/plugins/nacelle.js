/**
 * @file Injects a Nacelle client and helpers into the Nuxt.js context.
 */

import Nacelle from '@nacelle/client-js-sdk'

export default ({ $config }, inject) =>
  inject('nacelle', {

    /**
     * Creates a new Nacelle client.
     */
    client: new Nacelle({
      id: $config.NACELLE_SPACE,
      token: $config.NACELLE_TOKEN,
      nacelleEndpoint: 'https://hailfrequency.com/v3/graphql',
      useStatic: false
    }),

    /**
     * Fetches a collection by it's handle.
     * 
     * @param {string} handle - The collection handle.
     * @returns {Promise} - The collection object.
     */
    collectionByHandle(handle) {
      return new Promise(async (resolve, reject) => {
        const collection = await this.client.data.collection({ handle })
        const products = await this.collectionProducts(handle)

        if (!collection) {
          reject('Collection couldn\'t be found.')
        }

        resolve({
          ...collection,
          products
        })
      })
    },

    /**
     * Fetches the products of a collection.
     * 
     * @param {string} handle - The collection handle.
     * @param {number} page - The page number.
     * @returns {Promise} - The collection page.
     */
    collectionProducts(handle, page = 1) {
      const index = page === 1 ? 0 : (24 * page) - 1;

      return this.client.data.collectionPage({
        handle,
        itemsPerPage: 24,
        paginate: true,
        index
      })
    },

    /**
     * Fetches a page by it's handle.
     * 
     * @param {string} handle - The page handle.
     * @returns {Promise} - The page object.
     */
    pageByHandle(handle) {
      return this.client.data.content({
        handle,
        type: 'page'
      })
    },

    /**
     * Fetches a product by it's handle.
     * 
     * @param {string} handle - The product handle.
     * @returns {Promise} - The product object.
     */
    productByHandle(handle) {
      return this.client.data.product({
        handle
      })
    },
  })
