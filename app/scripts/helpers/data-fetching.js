const errorDefaults = {
  statusCode: '404',
  message: 'Something went wrong'
}

/**
 * Fetches the collection by handle.
 * @param {Object} context - The app context.
 * @returns {Object}
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
 * @param {Object} context - The app context.
 * @returns {Object}
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
