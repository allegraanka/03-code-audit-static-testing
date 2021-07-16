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
  const collection = await app.$nacelle.data.collection({
    handle: params.handle
  })

  if (!collection) {
    return error(errorDefaults)
  }

  return collection
}
