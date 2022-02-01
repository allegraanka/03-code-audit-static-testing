/**
 * @file Various helper functions.
 */

import atob from 'atob'

/**
 * Transforms text into standard kebab casing.
 *
 * @param {string} string - The string to convert.
 * @returns {string} - The transformed string.
 */
export const transform = (string) => {
  return string
    .split('')
    .map((letter) => {
      if (/[A-Z]/.test(letter)) {
        return ` ${letter.toLowerCase()}`
      }

      return letter
    })
    .join('')
    .trim()
    .replace(/[_\s]+/g, '-')
}

/**
 * Converts any string into Pascal Case.
 *
 * @param {string} string - The string to transform.
 * @returns {string} - The transformed string.
 */
export const pascalCase = (string) => {
  return transform(string)
    .split('-')
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join('')
}

/**
 * Converts a string to title case.
 * - https://en.wikipedia.org/wiki/Letter_case#Title_case
 *
 * @param {string} string - The string to convert.
 * @returns {string} - The formatted string.
 */
export const titleCase = (string) => {
  return transform(string)
    .split('-')
    .map((word) => {
      return `${word.charAt(0).toUpperCase()}${word.slice(1)}`
    })
    .join(' ')
}

/**
 * Converts a string to camel case.
 * - https://en.wikipedia.org/wiki/CamelCase
 *
 * @param {string} string - The string to convert.
 * @returns {string} - The transformed string.
 */
export const camelCase = (string) => {
  const words = string.match(
    /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g
  )

  if (!words) {
    return string
  }

  return words
    .map((word) => transform(word))
    .map((word, index) =>
      index ? `${word.charAt(0).toUpperCase()}${word.slice(1)}` : word
    )
    .join('')
}

/**
 * Converts a string into snake case.
 * - https://en.wikipedia.org/wiki/Snake_case
 *
 * @param {string} string - The string to convert.
 * @returns {string} - The transformed string.
 */
export const snakeCase = (string) => transform(string).replace('-', '_')

/**
 * Checks if a given date is in the past.
 *
 * @param {Date} date - The date to check.
 * @param {Date} now - The current date.
 * @returns {boolean} - If the date is in the past.
 */
export const isDateInPast = (date, now = new Date()) =>
  date.getTime() <= now.getTime()

/**
 * Decodes admin API IDs into Liquid format IDs.
 *
 * @param {string} id - Encoded string.
 * @returns {number|null} - The decoded identifier.
 */
export const decodeApiId = (id) => {
  if (!id) {
    return null
  }

  return Number(atob(id).split('/').pop().split('?')[0])
}

/**
 * Check if a facet has filter options.
 * - Checks if the disjunctiveFacets object of facets from the Algolia current
 *   results state contains any facets options for the current facetName.
 * - Algolia `results` object can be accessed using slot props inside certain
 *   Algolia Vue Instant Search components.
 * @param {string} facetName - The facet name to check.
 * @param {object} results - The Algolia current results state.
 * @returns {boolean} - Whether the facet should display or not.
 */
export const facetHasOptions = (facetName, results) => {
  const { disjunctiveFacets } = results
  if (!disjunctiveFacets) {
    return false
  }

  const facet = disjunctiveFacets.find(({ name }) => name === facetName)

  if (!facet) {
    return false
  }

  return Object.keys(facet.data).length > 0
}

/**
 * Formats a date consistently.
 *
 * @param {string} input - The date input.
 * @returns {string} - The formatted date.
 */
export const formatDate = (input) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  if (!input) {
    return null
  }

  const parsed = new Date(input)
  const date = parsed.getDate()
  const month = months[parsed.getMonth()]
  const year = parsed.getFullYear()

  return `${month} ${date}, ${year}`
}

/**
 * Checks if product should display the additional discount message
 * - Note: products in the PLP seem to not return tags with colons.
 * @param {object} product - The product object.
 * @param {object} $settings - The App settings, determines if active feature
 * @returns {boolean} - Should the product display messaging
 */
export const hasAdditionalDiscount = (product, $settings) => {
  const enabled = $settings.product?.discountNotification?.enabled
  let tagsArray = []

  /* Early return if feature is disabled */
  if (!enabled) {
    return false
  }

  const suitableTags = $settings.product?.discountNotification.suitableTags

  if (suitableTags) {
    tagsArray = suitableTags.split(',')
  }

  return product.tags.some((tag) => suitableTags.includes(tag))
}

/**
 * Manipulates the price to display with additional discount.
 *
 * @param {number} price - The price amount.
 * @param {object} product - The product, used to determine if suitable
 * @param {object} $settings - The app settings.
 * @returns {number} - The price, with visual discount.
 */
export const manipulatePriceForDiscount = (price, product, $settings) => {
  const enabled = hasAdditionalDiscount(product, $settings)

  if (!enabled) {
    return price
  }

  const discountPercentage =
    $settings.product?.discountNotification.discountPercentage || 0

  return price - (price / 100) * discountPercentage
}

/**
 * Formats a price input.
 *
 * @param {number} price - The price amount.
 * @param {string} currency - The currency code.
 * @param {string} locale - The locale name.
 * @returns {string} - The formatted price.
 */
export const formatPrice = (price, currency = 'GBP', locale = 'en-GB') => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  })

  return formatter.format(Number(price))
}

/**
 * Checks if an element is within viewport and visible boundary.
 *
 * @param {HTMLElement} viewport - Viewport container.
 * @param {HTMLElement} element - Element to check.
 * @returns {boolean} - The viewport state.
 */
export const isElementInViewport = (viewport, element) => {
  const viewPortBounding = viewport.getBoundingClientRect()
  const elementBounding = element.getBoundingClientRect()

  const viewPortPosition = viewPortBounding.left + viewPortBounding.width
  const elementPortPosition = elementBounding.left + elementBounding.width

  const isElementBoundLeft = () =>
    Math.ceil(elementBounding.left) >= viewPortBounding.left
  const isElementBoundRight = () => viewPortPosition >= elementPortPosition

  return isElementBoundLeft() && isElementBoundRight()
}
