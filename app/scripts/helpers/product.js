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
  if (!product) {
    return []
  }

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

  if (!colorOption) {
    return images
  }

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
  let rrp = null
  let price = product.price || 0
  let compareAt = product.compare_at_price || 0

  if (!product.metafields && product.meta) {
    rrp = product.meta.product?.rrp
  }

  if (product.metafields && !product.meta && !rrp) {
    rrp = context.$nacelle.helpers.findMetafield(
      product.metafields,
      'product.rrp'
    )
  }

  if (product.variants) {
    price = Number(product.variants[0].price)
    compareAt = Number(product.variants[0].compareAtPrice)
  }

  return {
    price,
    compareAt,
    rrp: rrp && Number(Number(rrp) / 100)
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

/**
 * Finds a variant which matches the selected options.
 *
 * @param {Array} variants - The product variants to search.
 * @param {object} selectedOptions - The selected options.
 * @returns {object} - The selected variant.
 */
export const getSelectedVariant = (variants, selectedOptions) =>
  variants.find((variant) => {
    let matchCount = 0

    variant.selectedOptions.forEach((option) => {
      const value = selectedOptions[option.name]

      if (value && value === option.value) {
        matchCount++
      }
    })

    return matchCount === variant.selectedOptions.length
  })

/**
 * Finds and returns the SKU to use to query reviews.
 *
 * @param {object} product - The product object.
 * @param {object} [selectedVariant] - The active variant.
 * @returns {string} - The SKU to use for reviews.
 */
export const getReviewsSku = (product, selectedVariant) => {
  let skuList = null

  if (!product.metafields && product.meta) {
    skuList = product.meta.product?.skulist
  }

  if (!skuList && product.metafields) {
    skuList = product.metafields.find(
      (metafield) =>
        `${metafield.namespace}.${metafield.key}` === 'product.skulist'
    )
  }

  if (skuList) {
    return skuList.value || skuList
  }

  if (selectedVariant) {
    return selectedVariant.sku
  }

  return (
    product.variants && product.variants.length >= 1 && product.variants[0].sku
  )
}
