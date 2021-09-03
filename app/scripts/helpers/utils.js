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
 * Formats a price input.
 *
 * @param {number} price - The price amount.
 * @returns {string} - The formatted price.
 */
export const formatPrice = (price) => {
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  })

  return formatter.format(price)
}
