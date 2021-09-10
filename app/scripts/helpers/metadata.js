/**
 * @file Helpers for handling metadata.
 */

/**
 * Returns the head object for a page.
 *
 * @param {object} metadata - The metadata object.
 * @param {string} fallbackTitle - Fallback if title doesn't exist in `metadata`.
 * @returns {object} - The vue-meta object.
 */
export const getHead = (metadata, fallbackTitle) => {
  const head = {}

  if (!metadata) {
    return head
  }

  if (metadata.title) {
    head.title = metadata.title
  } else if (fallbackTitle) {
    head.title = fallbackTitle
  }

  if (metadata.description) {
    head.meta = [
      {
        hid: 'description',
        name: 'description',
        content: metadata.description
      }
    ]
  }

  return head
}
