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
export const fetchProductSiblings = async (product, context) => {
  const handles = product.tags.reduce((accumulator, tag) => {
    if (tag.includes('sibling: ')) {
      accumulator.push(tag.replace('sibling: ', ''))
    }

    return accumulator
  }, [])

  if (handles.length === 0) {
    return []
  }

  try {
    return await context.$nacelle.client.data.products({ handles })
  } catch (error) {
    void error
  }
}

/**
 * Returns the product color swatches from a product.
 *
 * @param {object} product - The product object.
 * @returns {Array} - The swatch images.
 */
export const getProductSwatches = (product) => {
  const optionIsColor = (option) =>
    option.name.toLowerCase() === 'colour' ||
    option.name.toLowerCase() === 'color'
  const images = []
  const options = getProductOptions(product)
  const colorOption = options.find(optionIsColor)

  product.variants.forEach((variant) => {
    const color = variant.selectedOptions.find(
      ({ name }) => name === colorOption.name
    )?.value
    const exists = images.some((image) => image.color === color)

    if (color && variant.featuredMedia && !exists) {
      images.push({
        color,
        image: variant.featuredMedia.src,
        alt: variant.featuredMedia.alt || product.title
      })
    }
  })

  return images.map(({ alt, image }) => ({ alt, src: image }))
}

/**
 * Finds and returns the product title.
 *
 * @param {object} product - The product object.
 * @param {object} context - The Nuxt server-side context.
 * @returns {string} - The product title.
 */
export const getProductTitle = (product, context) =>
  context.$nacelle.helpers.findMetafield(
    product.metafields,
    'product.product_title'
  ) || product.title

/**
 * Returns the product pricing.
 *
 * @param {object} product - The product object.
 * @param {object} context - The Nuxt server-side context.
 * @returns {object} - The pricing variables.
 */
export const getProductPricing = (product, context) => {
  const rrp = context.$nacelle.helpers.findMetafield(
    product.metafields,
    'product.rrp'
  )
  const variant = product.variants[0]

  return {
    price: Number(variant.price),
    compareAt: Number(variant.compareAtPrice),
    rrp: rrp && Number(rrp / 100)
  }
}

/**
 * Finds and returns an array of product badges.
 *
 * @param {object} product - The product object.
 * @returns {Array} - The badge items.
 */
export const getProductBadges = (product) =>
  product.tags.reduce((accumulator, tag) => {
    if (tag.includes('badge: ')) {
      const value = tag.replace('badge: ', '')
      const src = value.split('[')[0]
      const alt = value.split('[')[1].replace(']', '')

      accumulator.push({
        src,
        alt
      })
    }

    return accumulator
  }, [])
