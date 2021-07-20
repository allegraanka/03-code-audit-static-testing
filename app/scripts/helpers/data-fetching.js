/**
 * @file Helper functions for handling data fetching.
 */

const errorDefaults = {
  statusCode: '404',
  message: 'Something went wrong'
}

/**
 * Fetches the collection by handle.
 *
 * @param {object} context - The app context.
 * @param {object} context.app - The app instance.
 * @param {Function} context.error - The error handler.
 * @param {object} context.params - The request parameters.
 * @returns {object} - The collection object.
 */
export const collectionByHandle = async ({ app, error, params }) => {
  let allProducts = []
 
  const collection = await app.$nacelle.data.collection({
    handle: params.handle
  })

  if (!collection) {
    return error(errorDefaults)
  }

  if (collection.productLists[0]) {
    allProducts = await app.$nacelle.data.products({
      handles: collection.productLists[0].handles
    })
  }

  return {
    ...collection,
    allProducts
  }
}

/**
 * Fetches the product by handle.
 * 
 * @param {object} context - The app context.
 * @param {object} context.app - The app instance.
 * @param {Function} context.error - The error handler.
 * @param {object} context.params - The request parameters.
 * @returns {object} - The product object.
 */
export const productByHandle = async ({ app, error, params }) => {
  const product = await app.$nacelle.data.product({
    handle: params.handle
  })

  if (!product) {
    return error(errorDefaults)
  }

  return product
}

/**
 * Fetches the page by handle.
 * 
 * @param {object} context - The app context.
 * @param {object} context.app - The app instance.
 * @param {Function} context.error - The error handler.
 * @param {object} context.params - The request parameters.
 * @returns {object} - The page object.
 */
export const pageByHandle = async ({ app, error, params }) => {
  const page = await app.$nacelle.data.content({
    handle: params.handle,
    type: 'page'
  })

  if (!page) {
    return error(errorDefaults)
  }

  return page
}
