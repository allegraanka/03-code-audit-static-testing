/**
 * @file Injects a Nacelle client and helpers into the Nuxt.js context.
 */

import Nacelle from '@nacelle/client-js-sdk'
import { createSanityPreviewConnector } from '@nacelle/sanity-preview-connector'

/**
 * Instance globals.
 */
const settings = {
  collections: {
    itemsPerPage: 24,
    initialPage: 1
  }
}

export default ({ $config }, inject) => {

  /**
   * Set up the Nacelle client.
   * - If preview mode is enabled, use the preview connector.
   */
  const client = new Nacelle({
    id: $config.NACELLE_SPACE,
    token: $config.NACELLE_TOKEN,
    nacelleEndpoint: 'https://hailfrequency.com/v3/graphql',
    useStatic: false
  })

  /**
   * If preview mode is enabled, set up a preview.
   * - Connects with Sanity directly for draft pages.
   */
  if ($config.IS_PREVIEW) {
    const previewConnector = createSanityPreviewConnector(client, {
      sanityConfig: {
        projectId: $config.SANITY_PROJECT_ID,
        dataset: $config.SANITY_DATASET,
        token: $config.SANITY_TOKEN
      }
    })

    client.data.update({
      connector: previewConnector
    })
  }

  inject('nacelle', {

    /**
     * Creates a new Nacelle client.
     */
    client,

    /**
     * Fetches a collection by it's handle.
     * 
     * @param {string} handle - The collection handle.
     * @param {number} itemsPerPage - The items to return per page.
     * @param {number} initialPage - The initial page number.
     * @returns {Promise} - The collection object.
     */
    collectionByHandle(
      handle,
      itemsPerPage = settings.collections.itemsPerPage,
      initialPage = settings.collections.initialPage
    ) {
      return new Promise(async (resolve, reject) => {
        const collection = await this.client.data.collection({ handle })
        const products = await this.collectionProducts(handle, initialPage, itemsPerPage)

        if (!collection || !products) {
          reject('Collection couldn\'t be found.')
        }

        /**
         * Calculates the number of pages.
         */
        const pages = Math.ceil(
          collection.productLists[0].handles.length /
            itemsPerPage
        )

        resolve({
          ...collection,
          products,
          initialPage,
          pages
        })
      })
    },

    /**
     * Fetches the products of a collection.
     * 
     * @param {string} handle - The collection handle.
     * @param {number} page - The page number.
     * @param {number} itemsPerPage - The items to fetch per page.
     * @returns {Promise} - The collection page.
     */
    collectionProducts(
      handle,
      page = settings.collections.initialPage,
      itemsPerPage = settings.collections.itemsPerPage
    ) {
      const index = page === 1 ? 0 : itemsPerPage * (page - 1)

      return this.client.data.collectionPage({
        handle,
        itemsPerPage,
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
}
