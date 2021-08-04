/**
 * @file Various helper functions.
 */

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
    .map(word =>
      word.slice(0, 1).toUpperCase() + word.slice(1)
    )
    .join('')
}
