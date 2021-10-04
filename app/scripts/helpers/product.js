/**
 * @file Product-base helper functions.
 */

/**
 * Returns the options with values from the product.
 *
 * @param {object} product - The product object.
 * @returns {Array} - The options array.
 */
export const getProductOptions = (product) => {
  const options = {}

  product.variants.forEach((variant) => {
    variant.selectedOptions.forEach(({ name, value }) => {
      if (options[name]) {
        if (!options[name].values.includes(value)) {
          options[name].values.push(value)
        }

        return
      }

      options[name] = {
        name,
        values: [value]
      }
    })
  })

  return Object.values(options)
}

/**
 * Returns the default selection for a product.
 *
 * @param {object} product - The product object.
 * @param {object} options - Optional options fallback.
 * @returns {object} - The options.
 */
export const getDefaultOptions = (product, options) =>
  (product ? getProductOptions(product) : options).reduce(
    (accumulator, option) => ({
      ...accumulator,
      [option.name]: option.values[0]
    }),
    {}
  )

/**
 * Filters a product's tags for siblings, then fetches them.
 *
 * @param {object} product - The product.
 * @param {object} context - The Nuxt server-side context.
 * @returns {Promise} - The siblings promise.
 */
export const fetchProductSiblings = (product, context) =>
  new Promise(async (resolve) => {
    const handles = product.tags
      .filter((tag) => tag.includes('sibling: '))
      .map((tag) => tag.replace('sibling: ', ''))

    if (handles.length === 0) {
      resolve([])
    }

    await context.$nacelle.client.data
      .products({ handles })
      .then(resolve)
      .catch((error) => void error)
  })
