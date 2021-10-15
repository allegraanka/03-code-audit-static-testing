/**
 * @file Test for date-based helper functions.
 */

import { dateWithOrdinal, addDay } from '~/helpers/date'

describe('Format the date of the month with an ordinal', () => {
  it('appends "st" if the date ends in 1', () => {
    expect(dateWithOrdinal(1)).toEqual('1st')
    expect(dateWithOrdinal(21)).toEqual('21st')
    expect(dateWithOrdinal(31)).toEqual('31st')
  })

  it('appends "nd" if the date ends in 2', () => {
    expect(dateWithOrdinal(2)).toEqual('2nd')
    expect(dateWithOrdinal(22)).toEqual('22nd')
  })

  it('appends "rd" if the date ends in 3', () => {
    expect(dateWithOrdinal(3)).toEqual('3rd')
    expect(dateWithOrdinal(23)).toEqual('23rd')
  })

  it('appends "th" if the date ends in any number except 1, 2 or 3', () => {
    expect(dateWithOrdinal(4)).toEqual('4th')
    expect(dateWithOrdinal(29)).toEqual('29th')
  })

  it('returns 0 if the date is 0', () => {
    expect(dateWithOrdinal(0)).toEqual('0')
  })
})

describe('Add a day to the given date and return a new date', () => {
  const toTest = new Date('1/1/1970')
  const toExpect = new Date('1/2/1970').getTime()

  it('returns a date 1 day on from the given date', () => {
    expect(addDay(toTest).getTime()).toEqual(toExpect)
  })
})
