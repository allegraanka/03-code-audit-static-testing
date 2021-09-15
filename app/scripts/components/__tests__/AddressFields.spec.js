/**
 * @file Defines tests for the quantity selector.
 */

import { shallowMount } from '@vue/test-utils'

import AddressFields from '@/scripts/components/AddressFields'

/**
 * Test globals.
 */
const elements = {
  wrapper: null,
  fields: []
}

const fields = {
  firstName: 'John',
  lastName: 'Smith',
  address1: '123 The Street',
  address2: 'Village',
  city: 'London',
  country: 'GB',
  zip: 'EC1 8BC',
  phone: '02036967828'
}

describe('Address fields component', () => {
  /**
   * Set up tests.
   */
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            data: {
              countries: []
            }
          })
      })
    )

    elements.wrapper = shallowMount(AddressFields)

    Object.keys(fields).forEach((field) => {
      elements.fields[field] = elements.wrapper.find(`#${field}`)
    })
  })

  /**
   * Run all tests on the component.
   */
  it('mounts', () => {
    expect(elements.wrapper).toBeDefined()
  })

  it('accepts input in all fields', () => {
    elements.fields.forEach((field) => {
      field.value = fields[field.id]

      expect(field.value).toBe(fields[field.id])
    })
  })
})
