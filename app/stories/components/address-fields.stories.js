/**
 * @file Defines the story for the address fields component.
 */

import AddressFields from '~/components/AddressFields'

export default {
  title: 'Components/Address Fields',
  component: AddressFields,

  parameters: {
    layout: 'fullscreen'
  }
}

/**
 * Returns the base story with example slot.
 * @returns {object} - The base story.
 */
export const Base = () => ({
  components: {
    AddressFields
  },

  template: `
    <div class="container" style="margin-top: 6rem;">
      <div class="row">
        <div class="col xs12 l8 push-l2">
          <address-fields />
        </div>
      </div>
    </div>
  `
})

export const Update = () => ({
  components: {
    AddressFields
  },

  data() {
    return {
      address: {
        id: '000',
        firstName: 'Jane',
        lastName: 'Doe',
        address1: '123 The Road',
        address2: 'A Village',
        city: 'London',
        country: 'GB',
        zip: 'ABC DEF'
      }
    }
  },

  template: `
    <div class="container" style="margin-top: 6rem;">
      <div class="row">
        <div class="col xs12 l8 push-l2">
          <address-fields method="update" :address="address" disabled />
        </div>
      </div>
    </div>
  `
})
