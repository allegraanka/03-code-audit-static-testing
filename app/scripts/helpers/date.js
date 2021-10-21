/**
 * @file Helpers for formatting and handling dates.
 */

/**
 * The words to use for days.
 */
export const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

/**
 * The words to use for months.
 */
export const months = [
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

/**
 * Returns a date with it's ordinal.
 *
 * @param {number} date - The date of the month.
 * @returns {string} - The date with its ordinal.
 */
export const dateWithOrdinal = (date) =>
  date +
  (date > 0
    ? ['th', 'st', 'nd', 'rd'][
        (date > 3 && date < 21) || date % 10 > 3 ? 0 : date % 10
      ]
    : '')

/**
 * Adds a day to a date instance and returns a new instance.
 *
 * @param {Date} date - A date instance.
 * @returns {Date} - The modified instance.
 */
export const addDay = (date) => {
  const toModify = new Date(date)

  toModify.setDate(toModify.getDate() + 1)

  return toModify
}
