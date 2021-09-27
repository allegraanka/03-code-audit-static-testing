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
 * @returns {object} - The options.
 */
export const getDefaultOptions = (product) =>
  getProductOptions(product).reduce(
    (accumulator, option) => ({
      ...accumulator,
      [option.name]: option.values[0]
    }),
    {}
  )
