/**
 * @file Injects a Nacelle client and helpers into the Nuxt.js context.
 */

import Nacelle from '@nacelle/client-js-sdk'

/**
 * Instance globals.
 */
const settings = {
  collections: {
    itemsPerPage: 24,
    initialPage: 1
  }
}

export default ({ $config }, inject) =>
  inject('nacelle', {

    /**
     * Creates a new Nacelle client.
     * - https://docs.getnacelle.com/api-reference/client-js-sdk.html
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
     * @param {number} page - The page to fetch.
     * @returns {Promise} - The collection object.
     */
    collectionByHandle(handle, page = settings.collections.initialPage) {
      return new Promise(async (resolve, reject) => {
        const { itemsPerPage } = settings.collections
        const collection = await this.client.data.collection({ handle })

        if (!collection) {
          reject('Collection couldn\'t be found.')
        }

        await this.collectionProductsByHandle(handle, page)
          .then((products) => {
            resolve({
              ...collection,
              products: {
                items: products,
                pages:
                  Math.ceil(
                    collection.productLists[0].handles.length
                      / itemsPerPage
                  )
              }
            })
          })
      })
    },

    /**
     * Fetches the products of a collection.
     * 
     * @param {string} handle - The collection handle.
     * @param {number} page - The page number.
     * @returns {Promise} - Resolves with product and page data.
     */
    collectionProductsByHandle(handle, page = settings.collections.initialPage) {
      const { itemsPerPage } = settings.collections

      return new Promise((resolve, reject) => {
        this.client.data.collectionPage({
          handle,
          itemsPerPage: itemsPerPage * page,
          index: page === 1 ? 0 : itemsPerPage * (page - 1),
          paginate: true
        })
          .then((products) => {
            resolve(products)
          })
          .catch(() => {
            reject(`
              Products couldn\'t be found for this collection.
            `)
          })
      })
    },

    /**
     * Fetches a page by it's handle.
     * 
     * @param {string} handle - The page handle.
     * @returns {Promise} - The page object.
     */
    pageByHandle(handle) {
      return this.client.data.page({
        handle
      })
    },

    /**
     * Fetches content by it's handle.
     * 
     * @param {string} handle - The content handle.
     * @param {string} type - The content type.
     * @returns {Promise} - The page object.
     */
    contentByHandle(handle, type) {
      return this.client.data.content({
        handle,
        type
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
